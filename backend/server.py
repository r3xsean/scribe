"""FastAPI server for the transcription desktop app."""

from __future__ import annotations

import asyncio
import json
import os
import socket
import sys
from contextlib import asynccontextmanager
from pathlib import Path

# ---------------------------------------------------------------------------
# Configure CUDA DLL paths early (before any ctranslate2 / torch import)
# ---------------------------------------------------------------------------
_cuda_dir = Path(os.environ.get("APPDATA", "")) / "transcription" / "cuda"
if _cuda_dir.is_dir():
    for sub in _cuda_dir.iterdir():
        bin_path = sub / "bin" if sub.is_dir() else None
        if bin_path and bin_path.is_dir():
            os.add_dll_directory(str(bin_path))
            os.environ["PATH"] = str(bin_path) + os.pathsep + os.environ.get("PATH", "")

# Also check pip-installed nvidia packages (same pattern as transcript.py)
_site_packages = Path(sys.executable).parent / "Lib" / "site-packages" / "nvidia"
if _site_packages.is_dir():
    for lib_dir in _site_packages.iterdir():
        bin_path = lib_dir / "bin"
        if bin_path.is_dir():
            os.add_dll_directory(str(bin_path))
            os.environ["PATH"] = str(bin_path) + os.pathsep + os.environ.get("PATH", "")

# ---------------------------------------------------------------------------

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from hardware import detect_hardware
from models import (
    delete_model,
    get_download_progress,
    list_models,
    load_config,
    recommend_model,
    save_config,
    start_model_download,
)
from transcriber import TranscriptionManager


def _find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


manager = TranscriptionManager()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: detect hardware and cache cuda_available in config
    hw = detect_hardware()
    cfg = load_config()
    cfg["cuda_available"] = hw["cuda_available"]
    save_config(cfg)
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- endpoints ----


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/hardware")
async def hardware():
    hw = detect_hardware()
    rec = recommend_model(hw)
    cuda = hw.get("cuda_available", False)
    return {
        **hw,
        "recommended_model": rec,
        "recommended_compute": "float16" if cuda else "int8",
        "recommended_device": "cuda" if cuda else "cpu",
    }


@app.get("/models")
async def models():
    return list_models()


@app.post("/models/download")
async def models_download(request: Request):
    body = await request.json()
    name = body.get("name", "")
    result = start_model_download(name)
    if "error" in result:
        return JSONResponse(status_code=400, content=result)
    return result


@app.get("/models/download/{name}/progress")
async def models_download_progress(name: str):
    return get_download_progress(name)


@app.delete("/models/{name}")
async def models_delete(name: str):
    deleted = delete_model(name)
    if deleted:
        return {"status": "deleted", "model": name}
    return JSONResponse(status_code=404, content={"error": f"Model '{name}' not found"})


@app.post("/transcribe")
async def transcribe_start(request: Request):
    body = await request.json()
    url = body.get("url", "")
    model_name = body.get("model", "base")
    language = body.get("language")  # None → auto-detect

    if not url:
        return JSONResponse(status_code=400, content={"error": "url is required"})

    job = manager.submit(url, model_name, language)
    return {"id": job.id}


@app.get("/transcribe/{job_id}/sse")
async def transcribe_sse(job_id: str):
    job = manager.get_job(job_id)
    if not job:
        return JSONResponse(status_code=404, content={"error": "Job not found"})

    async def event_stream():
        while True:
            data = json.dumps(job.to_dict())
            yield f"data: {data}\n\n"
            if job.status in ("done", "error"):
                break
            await asyncio.sleep(0.5)

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.get("/transcribe/{job_id}")
async def transcribe_result(job_id: str):
    job = manager.get_job(job_id)
    if not job:
        return JSONResponse(status_code=404, content={"error": "Job not found"})
    return job.to_dict()


# ---- main ----

if __name__ == "__main__":
    import uvicorn

    port = _find_free_port()
    # Print port for Electron to read
    print(f"PORT:{port}", flush=True)
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="warning")
