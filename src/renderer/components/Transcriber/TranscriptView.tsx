import React, { useState } from 'react'
import { useAppStore } from '../../store/store'

export default function TranscriptView() {
  const selectedJobId = useAppStore((s) => s.selectedJobId)
  const jobs = useAppStore((s) => s.jobs)
  const [copied, setCopied] = useState(false)

  const selectedJob = jobs.find((j) => j.id === selectedJobId)

  if (!selectedJob || !selectedJob.transcript) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <svg className="w-12 h-12 text-zinc-800 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        <p className="text-zinc-500 text-sm">Select a completed job to view its transcript</p>
      </div>
    )
  }

  const handleCopy = () => {
    if (selectedJob.transcript) {
      window.api.copyToClipboard(selectedJob.transcript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-800/50 shrink-0">
        <div className="min-w-0">
          <p className="text-xs text-zinc-500 truncate">{selectedJob.title || selectedJob.url}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                     bg-zinc-800 border border-zinc-700 hover:bg-zinc-750 hover:border-zinc-600
                     active:scale-[0.97] transition-all duration-150 shrink-0 ml-4"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-prose select-text">
          <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
            {selectedJob.transcript}
          </p>
        </div>
      </div>
    </div>
  )
}
