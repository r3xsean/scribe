import {
  DownloadButtonNav,
  DownloadButtonHero,
  DownloadButtonCTA,
} from "./components/DownloadButton";

const GITHUB_URL = "https://github.com/r3xsean/scribe";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function QueueIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
      />
    </svg>
  );
}

function LanguageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
      />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "100% Private",
    description:
      "Everything runs on your machine. No cloud APIs, no accounts, no data ever leaves your computer.",
  },
  {
    icon: BoltIcon,
    title: "GPU Accelerated",
    description:
      "Automatic CUDA detection leverages your NVIDIA GPU for blazing fast transcription. Falls back to CPU seamlessly.",
  },
  {
    icon: CpuIcon,
    title: "Smart Setup",
    description:
      "Scans your hardware and recommends the optimal AI model. Works on any Windows PC, from laptops to desktops.",
  },
  {
    icon: QueueIcon,
    title: "Batch Processing",
    description:
      "Queue multiple videos at once. Paste a list of URLs and let Scribe work through them while you do other things.",
  },
  {
    icon: LanguageIcon,
    title: "99 Languages",
    description:
      "Powered by OpenAI's Whisper, supporting automatic language detection and transcription in 99 languages.",
  },
  {
    icon: ClipboardIcon,
    title: "One-Click Copy",
    description:
      "Copy any transcript to your clipboard instantly. Clean, formatted text ready to paste anywhere.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Install Scribe",
    description:
      "Download and run the installer. The onboarding wizard will detect your hardware and set everything up.",
  },
  {
    step: "02",
    title: "Paste Video URLs",
    description:
      "Copy any YouTube or TikTok URL into Scribe. Queue multiple videos at once for batch processing.",
  },
  {
    step: "03",
    title: "Get Your Transcript",
    description:
      "Scribe downloads the audio and transcribes it locally using AI. Copy the result with one click.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <span className="font-semibold text-sm tracking-tight">
              Scribe
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <DownloadButtonNav />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 sm:pt-44 sm:pb-32 glow overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Free &amp; open source
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-up animate-delay-100">
            <span className="text-gradient">Transcribe videos</span>
            <br />
            <span className="text-gradient-accent">offline, for free</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-delay-200">
            Scribe turns YouTube and TikTok videos into text using AI that runs
            entirely on your PC. No cloud, no accounts, no limits.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
            <DownloadButtonHero />
          </div>
        </div>

        {/* App mockup */}
        <div className="relative z-10 max-w-5xl mx-auto mt-20 px-6 animate-fade-up animate-delay-400">
          <div className="animate-float">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/50 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center px-4 h-10 bg-zinc-900/80 border-b border-zinc-800/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <span className="ml-4 text-xs text-zinc-500">Scribe</span>
              </div>
              {/* App content mockup */}
              <div className="flex h-[340px] sm:h-[400px]">
                {/* Sidebar */}
                <div className="w-[280px] border-r border-zinc-800/50 flex-col shrink-0 hidden sm:flex">
                  <div className="p-4 border-b border-zinc-800/50">
                    <div className="w-full h-20 rounded-lg bg-zinc-900 border border-zinc-800/50 flex items-center justify-center">
                      <span className="text-xs text-zinc-600">
                        Paste URLs here...
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 h-8 rounded-lg bg-zinc-900 border border-zinc-800/50" />
                      <div className="h-8 px-4 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center">
                        <span className="text-xs text-violet-300 font-medium">
                          Transcribe
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-3 space-y-2">
                    {[
                      {
                        title: "How to Build a Startup",
                        status: "Done",
                        color: "text-green-400 bg-green-500/10",
                      },
                      {
                        title: "React Server Components",
                        status: "Transcribing",
                        color: "text-amber-400 bg-amber-500/10",
                      },
                      {
                        title: "Machine Learning Basics",
                        status: "Pending",
                        color: "text-zinc-400 bg-zinc-700/30",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/30"
                      >
                        <p className="text-[11px] text-zinc-300 leading-snug">
                          {item.title}
                        </p>
                        <span
                          className={`inline-block mt-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded ${item.color}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main content */}
                <div className="flex-1 p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] text-zinc-500">
                      youtube.com/watch?v=...
                    </p>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 text-[10px] text-zinc-400">
                      Copy
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "In this talk, we'll explore the fundamentals of building a successful startup from the ground up. The most important thing to understand is that ideas alone don't create value...",
                      "What really matters is execution. The ability to take an idea and turn it into something real, something that people want to use every day. That's where the magic happens...",
                      "Let me walk you through the three key principles that every founder should internalize before writing their first line of code or making their first hire...",
                    ].map((text, i) => (
                      <p
                        key={i}
                        className="text-[11px] text-zinc-400 leading-relaxed"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
              Everything runs locally
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
              No cloud processing. No rate limits. No subscriptions. Just your
              PC and an AI model.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center mb-4 group-hover:bg-violet-500/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-semibold text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
              Three steps. That&apos;s it.
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              From URL to transcript in minutes.
            </p>
          </div>

          <div className="space-y-8">
            {STEPS.map((item) => (
              <div key={item.step} className="flex gap-6 items-start group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-violet-500/30 group-hover:bg-violet-500/5 transition-all duration-300">
                  <span className="text-sm font-bold text-zinc-500 group-hover:text-violet-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-zinc-100 text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System requirements */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
              System requirements
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              Scribe works on most Windows PCs. A GPU helps but isn&apos;t
              required.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/30">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
                Minimum
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  Windows 10 or later
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  4 GB RAM
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  2 GB free disk space
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  Any CPU (uses Whisper tiny/base)
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl border border-violet-500/20 bg-violet-500/5">
              <h3 className="text-xs font-medium text-violet-400 uppercase tracking-wider mb-4">
                Recommended
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  Windows 10 or later
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  8+ GB RAM
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  NVIDIA GPU with 6+ GB VRAM
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1 h-1 rounded-full bg-violet-400" />
                  Uses Whisper large-v3-turbo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
            Ready to transcribe?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-xl mx-auto">
            Download Scribe and start transcribing videos in minutes. Free
            forever, no strings attached.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <DownloadButtonCTA />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            Scribe
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              Releases
            </a>
            <a
              href={`${GITHUB_URL}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              Report a Bug
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
