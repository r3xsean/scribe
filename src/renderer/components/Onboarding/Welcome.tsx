import React from 'react'

interface Props {
  onNext: () => void
}

export default function Welcome({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-8">
      {/* App icon */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center shadow-lg">
        <svg
          className="w-10 h-10 text-zinc-300"
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
        className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium
                   hover:bg-white active:scale-[0.98] transition-all duration-150
                   focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Get Started
      </button>
    </div>
  )
}
