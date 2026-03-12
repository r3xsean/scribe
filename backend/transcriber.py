"""Transcription job management.

Always downloads audio via yt-dlp and transcribes with faster-whisper
(no caption/subtitle fallback).
"""

from __future__ import annotations

import json
import os
import shutil
import tempfile
import uuid
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field
from enum import Enum
from typing import Any

import yt_dlp
from faster_whisper import WhisperModel

from models import get_model_path, load_config


class JobStatus(str, Enum):
    PENDING = "pending"
    DOWNLOADING = "downloading"
    TRANSCRIBING = "transcribing"
    DONE = "done"
    ERROR = "error"


@dataclass
class TranscriptionJob:
    id: str
    url: str
    model_name: str
    language: str | None = None
    status: JobStatus = JobStatus.PENDING
    progress: float = 0.0
    transcript: str | None = None
    error: str | None = None
    title: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "url": self.url,
            "model": self.model_name,
            "language": self.language,
            "status": self.status.value,
            "progress": self.progress,
            "transcript": self.transcript,
            "error": self.error,
            "title": self.title,
        }


class TranscriptionManager:
    """Manages transcription jobs with a single-worker thread pool."""

    def __init__(self) -> None:
        self._executor = ThreadPoolExecutor(max_workers=1)
        self._jobs: dict[str, TranscriptionJob] = {}

    def submit(self, url: str, model_name: str, language: str | None = None) -> TranscriptionJob:
        job_id = uuid.uuid4().hex[:12]
        job = TranscriptionJob(id=job_id, url=url, model_name=model_name, language=language)
        self._jobs[job_id] = job
        self._executor.submit(self._run, job)
        return job

    def get_job(self, job_id: str) -> TranscriptionJob | None:
        return self._jobs.get(job_id)

    # ---- internal ----

    def _run(self, job: TranscriptionJob) -> None:
        audio_dir: str | None = None
        try:
            # --- download audio ---
            job.status = JobStatus.DOWNLOADING
            job.progress = 0.0
            audio_dir = tempfile.mkdtemp()

            ydl_opts: dict[str, Any] = {
                "format": "bestaudio/best",
                "outtmpl": os.path.join(audio_dir, "audio.%(ext)s"),
                "postprocessors": [
                    {
                        "key": "FFmpegExtractAudio",
                        "preferredcodec": "wav",
                        "preferredquality": "0",
                    }
                ],
                "quiet": True,
                "noprogress": True,
                "no_warnings": True,
                "cookiesfrombrowser": ("firefox",),
            }
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(job.url, download=True)
                if info and info.get("title"):
                    job.title = info["title"]

            audio_path = os.path.join(audio_dir, "audio.wav")
            if not os.path.exists(audio_path):
                raise FileNotFoundError("Audio download failed – WAV file not found.")

            # --- transcribe ---
            job.status = JobStatus.TRANSCRIBING
            job.progress = 0.0

            model_path = get_model_path(job.model_name)
            if not model_path:
                raise RuntimeError(
                    f"Model '{job.model_name}' is not downloaded. "
                    "Please download it first via the /models/download endpoint."
                )

            # Determine device / compute type from config or auto-detect
            cfg = load_config()
            cuda_available = cfg.get("cuda_available", False)
            if cuda_available:
                device = "cuda"
                compute_type = "float16"
            else:
                device = "cpu"
                compute_type = "int8"

            model = WhisperModel(model_path, device=device, compute_type=compute_type, local_files_only=True)

            language = job.language  # None → auto-detect
            segments_gen, info = model.transcribe(
                audio_path,
                language=language,
                beam_size=5,
            )

            duration = info.duration if info.duration and info.duration > 0 else None

            seg_texts: list[str] = []
            for seg in segments_gen:
                text = seg.text.strip()
                if text:
                    seg_texts.append(text)
                # update progress based on segment end time vs duration
                if duration:
                    pct = min(seg.end / duration * 100, 99.0)
                    job.progress = round(pct, 1)

            # group into paragraphs (5 segments each)
            paragraphs: list[str] = []
            for i in range(0, len(seg_texts), 5):
                paragraphs.append(" ".join(seg_texts[i : i + 5]))

            job.transcript = "\n\n".join(paragraphs)
            job.status = JobStatus.DONE
            job.progress = 100.0

        except Exception as exc:
            job.status = JobStatus.ERROR
            job.error = str(exc)

        finally:
            # cleanup temp audio
            if audio_dir and os.path.isdir(audio_dir):
                shutil.rmtree(audio_dir, ignore_errors=True)
