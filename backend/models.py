"""Model management: list / download / delete / recommend."""

from __future__ import annotations

import json
import os
import shutil
from pathlib import Path
from typing import Any

MODEL_INFO: dict[str, dict] = {
    "tiny": {"size_mb": 75, "description": "Fastest, lowest quality. Good for quick drafts."},
    "base": {"size_mb": 148, "description": "Fast with decent accuracy. Good for low-end hardware."},
    "small": {"size_mb": 488, "description": "Good balance of speed and accuracy."},
    "medium": {"size_mb": 1500, "description": "High accuracy, slower processing."},
    "large-v3-turbo": {"size_mb": 1600, "description": "Best accuracy with optimized speed. Recommended for GPU."},
}

_APPDATA = os.environ.get("APPDATA", os.path.expanduser("~"))
BASE_DIR = Path(_APPDATA) / "transcription"
MODELS_DIR = BASE_DIR / "models"
CONFIG_PATH = BASE_DIR / "config.json"


def _ensure_dirs() -> None:
    MODELS_DIR.mkdir(parents=True, exist_ok=True)


def _model_dir(name: str) -> Path:
    return MODELS_DIR / name


# ---- config helpers ----

def load_config() -> dict:
    if CONFIG_PATH.exists():
        with open(CONFIG_PATH, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_config(cfg: dict) -> None:
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)


# ---- public API ----

def list_models() -> list[dict]:
    """Return list of models with download status."""
    _ensure_dirs()
    result = []
    for name, info in MODEL_INFO.items():
        model_path = _model_dir(name)
        downloaded = model_path.exists() and any(model_path.iterdir())
        entry = {
            "name": name,
            "description": info["description"],
            "size_mb": info["size_mb"],
            "downloaded": downloaded,
        }
        if downloaded:
            # compute actual size on disk
            total = sum(f.stat().st_size for f in model_path.rglob("*") if f.is_file())
            entry["disk_mb"] = round(total / (1024 * 1024), 1)
        result.append(entry)
    return result


# ---- download state (shared between start + progress endpoints) ----

_download_state: dict[str, dict] = {}
# e.g. {"large-v3-turbo": {"status": "downloading", "progress": 0, "error": None}}

_REPO_MAP = {
    "tiny": "Systran/faster-whisper-tiny",
    "base": "Systran/faster-whisper-base",
    "small": "Systran/faster-whisper-small",
    "medium": "Systran/faster-whisper-medium",
    "large-v3-turbo": "deepdml/faster-whisper-large-v3-turbo-ct2",
}


def start_model_download(name: str) -> dict:
    """Kick off a model download in a background thread. Returns immediately."""
    import threading

    if name not in MODEL_INFO:
        return {"error": f"Unknown model: {name}"}
    if name in _download_state and _download_state[name]["status"] == "downloading":
        return {"status": "already_downloading"}

    _ensure_dirs()
    dest = _model_dir(name)
    _download_state[name] = {"status": "downloading", "progress": 0, "error": None}

    def _do_download():
        try:
            from huggingface_hub import snapshot_download
            import warnings

            repo_id = _REPO_MAP[name]
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                snapshot_download(repo_id, local_dir=str(dest))
            _download_state[name] = {"status": "done", "progress": 100, "error": None}
        except Exception as exc:
            _download_state[name] = {"status": "error", "progress": 0, "error": str(exc)}

    thread = threading.Thread(target=_do_download, daemon=True)
    thread.start()
    return {"status": "downloading"}


def get_download_progress(name: str) -> dict:
    """Check download progress by measuring bytes on disk."""
    state = _download_state.get(name)
    if not state:
        return {"status": "idle", "progress": 0}

    # If already done or errored, return final state
    if state["status"] in ("done", "error"):
        return state

    # Estimate progress from disk usage
    dest = _model_dir(name)
    expected_mb = MODEL_INFO.get(name, {}).get("size_mb", 1)
    if dest.exists():
        try:
            current_bytes = sum(f.stat().st_size for f in dest.rglob("*") if f.is_file())
            current_mb = current_bytes / (1024 * 1024)
            pct = min(current_mb / expected_mb * 100, 99) if expected_mb > 0 else 0
            return {"status": "downloading", "progress": round(pct, 1), "error": None}
        except OSError:
            pass

    return {"status": "downloading", "progress": 0, "error": None}


def delete_model(name: str) -> bool:
    """Delete a downloaded model. Returns True if it existed."""
    model_path = _model_dir(name)
    if model_path.exists():
        shutil.rmtree(model_path)
        return True
    return False


def get_model_path(name: str) -> str | None:
    """Return path to a downloaded model, or None if not present."""
    model_path = _model_dir(name)
    if model_path.exists() and any(model_path.iterdir()):
        return str(model_path)
    return None


def recommend_model(hardware: dict) -> str:
    """Recommend a model name based on detected hardware."""
    cuda = hardware.get("cuda_available", False)
    vram = hardware.get("vram_mb", 0)
    ram = hardware.get("ram_mb", 0)

    if cuda:
        if vram >= 6000:
            return "large-v3-turbo"
        if vram >= 3000:
            return "small"
        return "base"
    else:
        if ram >= 8000:
            return "small"
        if ram >= 4000:
            return "base"
        return "tiny"
