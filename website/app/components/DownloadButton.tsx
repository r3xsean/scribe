"use client";

import { useEffect, useState } from "react";

const DOWNLOAD_URL =
  "https://github.com/r3xsean/scribe/releases/latest/download/Scribe.Setup.1.0.0.exe";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);
  return isMobile;
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
}

function MobileNotice() {
  return (
    <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
      <WindowsIcon className="w-5 h-5 text-zinc-500" />
      <div className="text-left">
        <p className="text-sm font-medium text-zinc-300">Windows only</p>
        <p className="text-xs text-zinc-500">
          Visit this page on your PC to download
        </p>
      </div>
    </div>
  );
}

function DesktopDownload({ variant }: { variant: "hero" | "cta" | "nav" }) {
  if (variant === "nav") {
    return (
      <a
        href={DOWNLOAD_URL}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium hover:bg-violet-500/20 transition-all"
      >
        <DownloadIcon className="w-3.5 h-3.5" />
        Download
      </a>
    );
  }

  return (
    <>
      <a
        href={DOWNLOAD_URL}
        className="group flex items-center gap-3 px-8 py-4 rounded-xl btn-shimmer text-white font-semibold text-base shadow-lg shadow-violet-500/10"
      >
        <DownloadIcon className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
        Download for Windows
      </a>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <WindowsIcon className="w-3 h-3" />
        <span>
          Windows 10+ &middot; ~400 MB{variant === "cta" && <> &middot; Free forever</>}
        </span>
      </div>
    </>
  );
}

export function DownloadButtonNav() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <DesktopDownload variant="nav" />;
}

export function DownloadButtonHero() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNotice /> : <DesktopDownload variant="hero" />;
}

export function DownloadButtonCTA() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNotice /> : <DesktopDownload variant="cta" />;
}
