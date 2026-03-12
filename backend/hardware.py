"""GPU / RAM detection utilities."""

import psutil


def detect_hardware() -> dict:
    """Return dict with gpu_name, vram_mb, ram_mb, cuda_available."""
    gpu_name: str | None = None
    vram_mb: int = 0
    cuda_available: bool = False

    # --- GPU info via nvidia-ml-py (pynvml) ---
    try:
        from pynvml import (  # noqa: F401  — nvidia-ml-py provides the pynvml namespace
            nvmlInit,
            nvmlDeviceGetHandleByIndex,
            nvmlDeviceGetName,
            nvmlDeviceGetMemoryInfo,
            nvmlShutdown,
        )
        import warnings
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", FutureWarning)
            nvmlInit()
            handle = nvmlDeviceGetHandleByIndex(0)
            gpu_name = nvmlDeviceGetName(handle)
            if isinstance(gpu_name, bytes):
                gpu_name = gpu_name.decode()
            mem_info = nvmlDeviceGetMemoryInfo(handle)
            vram_mb = mem_info.total // (1024 * 1024)
            nvmlShutdown()
    except Exception:
        gpu_name = None
        vram_mb = 0

    # --- CUDA availability via ctranslate2 ---
    try:
        import ctranslate2

        supported = ctranslate2.get_supported_compute_types("cuda")
        cuda_available = len(supported) > 0
    except Exception:
        cuda_available = False

    # --- System RAM ---
    ram_mb = psutil.virtual_memory().total // (1024 * 1024)

    return {
        "gpu_name": gpu_name,
        "vram_mb": vram_mb,
        "ram_mb": ram_mb,
        "cuda_available": cuda_available,
    }
