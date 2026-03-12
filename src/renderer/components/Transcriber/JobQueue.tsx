import React from 'react'
import { useAppStore } from '../../store/store'
import type { TranscriptionJob } from '../../../shared/types'

const STATUS_STYLES: Record<TranscriptionJob['status'], { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-zinc-700/30', text: 'text-zinc-400', label: 'Pending' },
  downloading: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Downloading' },
  transcribing: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Transcribing' },
  done: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Done' },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'Error' },
}

const PROGRESS_COLORS: Record<TranscriptionJob['status'], string> = {
  pending: 'bg-zinc-600',
  downloading: 'bg-blue-400',
  transcribing: 'bg-amber-400',
  done: 'bg-green-400',
  error: 'bg-red-400',
}


export default function JobQueue() {
  const jobs = useAppStore((s) => s.jobs)
  const selectedJobId = useAppStore((s) => s.selectedJobId)
  const setSelectedJobId = useAppStore((s) => s.setSelectedJobId)
  const removeJob = useAppStore((s) => s.removeJob)

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
        <svg className="w-10 h-10 text-zinc-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-zinc-500 text-sm">No transcription jobs yet</p>
        <p className="text-zinc-600 text-xs mt-1">Paste URLs above to get started</p>
      </div>
    )
  }

  return (
    <div className="p-2 space-y-1">
      {jobs.map((job) => {
        const status = STATUS_STYLES[job.status]
        const isActive = job.status === 'downloading' || job.status === 'transcribing'
        const isSelected = job.id === selectedJobId

        return (
          <div
            key={job.id}
            onClick={() => {
              if (job.status === 'done') setSelectedJobId(job.id)
            }}
            className={`group relative p-3 rounded-lg transition-all duration-150 ${
              isSelected
                ? 'bg-zinc-800 border border-zinc-700'
                : 'bg-zinc-900/50 border border-transparent hover:bg-zinc-900 hover:border-zinc-800'
            } ${job.status === 'done' ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeJob(job.id)
              }}
              className="absolute top-2 right-2 w-5 h-5 rounded flex items-center justify-center
                         opacity-0 group-hover:opacity-100 hover:bg-zinc-700 transition-all text-zinc-500 hover:text-zinc-300"
              title="Remove"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title or URL */}
            <p className="text-xs text-zinc-300 pr-6 leading-snug">
              {job.title || job.url}
            </p>

            {/* Status + progress */}
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${status.bg} ${status.text}`}>
                {status.label}
              </span>

              {job.error && (
                <span className="text-[10px] text-red-400/70 truncate flex-1">
                  {job.error}
                </span>
              )}
            </div>

            {/* Progress bar for active jobs */}
            {isActive && (
              <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${PROGRESS_COLORS[job.status]} ${
                    job.progress < 100 ? 'progress-active' : ''
                  }`}
                  style={{ width: `${Math.min(job.progress, 100)}%` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
