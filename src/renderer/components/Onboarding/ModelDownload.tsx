import React, { useEffect, useState, useRef } from 'react'
import { downloadModel } from '../../hooks/useBackend'

interface Props {
  model: string
  onNext: () => void
}

export default function ModelDownload({ model, onNext }: Props) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let cancelled = false

    const start = async () => {
      try {
        const cleanup = await downloadModel(model, (p, status) => {
          if (cancelled) return
          setProgress(p)
          if (status === 'done' || p >= 100) setDone(true)
        })
        cleanupRef.current = cleanup
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Download failed')
        }
      }
    }

    start()

    return () => {
      cancelled = true
      cleanupRef.current?.()
    }
  }, [model])

  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-zinc-300">Download failed</p>
          <p className="text-zinc-500 text-xs">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">
          {done ? 'Download Complete' : 'Downloading Model'}
        </h2>
        <p className="text-zinc-400 text-sm">
          {done ? `${model} is ready to use` : `Downloading ${model}...`}
        </p>
      </div>

      <div className="w-full space-y-3">
        {/* Progress bar */}
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-zinc-300 rounded-full transition-all duration-300 ${
              !done ? 'progress-active' : ''
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{Math.round(progress)}%</span>
          {done && <span>Complete</span>}
        </div>
      </div>

      {done && (
        <button
          onClick={onNext}
          className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium
                     hover:bg-white active:scale-[0.98] transition-all duration-150"
        >
          Continue
        </button>
      )}
    </div>
  )
}
