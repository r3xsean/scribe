# -*- mode: python ; coding: utf-8 -*-
"""PyInstaller spec for the transcription backend server."""

import os
import sys
from PyInstaller.utils.hooks import collect_all

block_cipher = None

# Collect all files for ctranslate2 and faster_whisper
ct2_datas, ct2_binaries, ct2_hiddenimports = collect_all('ctranslate2')
fw_datas, fw_binaries, fw_hiddenimports = collect_all('faster_whisper')

# Exclude CUDA/nvidia libraries (downloaded separately during onboarding)
excluded_modules = [
    'nvidia',
    'nvidia.cublas',
    'nvidia.cuda_runtime',
    'nvidia.cudnn',
    'nvidia.cufft',
    'nvidia.curand',
    'nvidia.cusolver',
    'nvidia.cusparse',
    'nvidia.nccl',
    'nvidia.nvjitlink',
    'nvidia.nvtx',
]

a = Analysis(
    ['server.py'],
    pathex=[],
    binaries=ct2_binaries + fw_binaries,
    datas=ct2_datas + fw_datas,
    hiddenimports=[
        'uvicorn.logging',
        'uvicorn.loops',
        'uvicorn.loops.auto',
        'uvicorn.protocols',
        'uvicorn.protocols.http',
        'uvicorn.protocols.http.auto',
        'uvicorn.protocols.websockets',
        'uvicorn.protocols.websockets.auto',
        'uvicorn.lifespan',
        'uvicorn.lifespan.on',
        'pynvml',
        'psutil',
    ] + ct2_hiddenimports + fw_hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=excluded_modules,
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='server',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,  # Need console for stdout PORT: output
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='server',
)
