"""Build the Python backend into a standalone executable using PyInstaller."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT / "backend"
SPEC_FILE = BACKEND_DIR / "build.spec"
DIST_DIR = BACKEND_DIR / "dist"


def main():
    print("Building backend with PyInstaller...")
    print(f"  Spec file: {SPEC_FILE}")
    print(f"  Output:    {DIST_DIR / 'server'}")

    cmd = [
        sys.executable,
        "-m",
        "PyInstaller",
        str(SPEC_FILE),
        "--distpath",
        str(DIST_DIR),
        "--workpath",
        str(BACKEND_DIR / "build"),
        "--noconfirm",
        "--clean",
    ]

    result = subprocess.run(cmd, cwd=str(BACKEND_DIR))
    if result.returncode != 0:
        print("PyInstaller build failed!", file=sys.stderr)
        sys.exit(1)

    print(f"\nBackend built successfully: {DIST_DIR / 'server'}")


if __name__ == "__main__":
    main()
