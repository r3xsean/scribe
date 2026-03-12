import React from 'react'

interface Props {
  onNext: () => void
}

export default function Welcome({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-8 animate-fade-in-up">
      {/* App icon */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/20 flex items-center justify-center shadow-lg glow-accent">
        <svg
          className="w-10 h-10 text-accent-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Scribe</h1>
        <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
          Transcribe YouTube and TikTok videos locally using AI.
          Fast, private, and completely offline.
        </p>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 bg-accent-500 text-white rounded-xl font-medium
                   hover:bg-accent-600 active:scale-[0.97] transition-all duration-150
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
                   focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
                   glow-accent"
      >
        Get Started
      </button>
    </div>
  )
}
