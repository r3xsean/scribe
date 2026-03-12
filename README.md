# Scribe

Desktop app for transcribing YouTube and TikTok videos using local Whisper models. Fast, private, completely offline transcription.

## Features

- Paste YouTube or TikTok URLs and get transcripts
- Runs entirely on your machine — no cloud APIs, no data leaves your computer
- GPU-accelerated with CUDA (falls back to CPU automatically)
- Onboarding wizard detects your hardware and recommends the right model
- Batch transcription — queue multiple videos at once
- Copy transcripts to clipboard with one click

## Download

Grab the latest `.exe` installer from [Releases](https://github.com/r3xsean/scribe/releases).

## Development

### Prerequisites

- Node.js 18+
- Python 3.11+
- ffmpeg on PATH

### Setup

```bash
npm install
pip install -r backend/requirements.txt
```

### Run

```bash
npm run dev
```

### Build installer

```bash
# 1. Build the Python backend into a standalone exe
python scripts/build-backend.py

# 2. Build and package the Electron app
node scripts/package.js
```

The installer will be in `release/`.

## Architecture

Electron frontend (React + TypeScript) communicates with a Python backend (FastAPI) over localhost HTTP. The backend handles audio download (yt-dlp) and transcription (faster-whisper). In production, the Python backend is bundled as a standalone `.exe` via PyInstaller — no Python installation required for end users.

## Tech Stack

- **Frontend**: Electron, React 19, TypeScript, Tailwind CSS, Zustand
- **Backend**: Python, FastAPI, faster-whisper, yt-dlp
- **Build**: electron-vite, electron-builder, PyInstaller
