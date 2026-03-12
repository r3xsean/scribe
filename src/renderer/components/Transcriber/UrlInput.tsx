import React, { useState } from 'react'
import { useAppStore } from '../../store/store'
import { startTranscription, subscribeToJob } from '../../hooks/useBackend'

const LANGUAGES = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'hi', label: 'Hindi' },
]

export default function UrlInput() {
  const [urls, setUrls] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const selectedModel = useAppStore((s) => s.selectedModel)
  const selectedLanguage = useAppStore((s) => s.selectedLanguage)
  const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage)
  const addJob = useAppStore((s) => s.addJob)
  const updateJob = useAppStore((s) => s.updateJob)
  const setSelectedJobId = useAppStore((s) => s.setSelectedJobId)

  const handleSubmit = async () => {
    const lines = urls
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)

    if (lines.length === 0) return
    setSubmitting(true)

    for (const url of lines) {
      try {
        const result = await startTranscription(url, selectedModel, selectedLanguage)
        const job = {
          id: result.id,
          url,
          title: null as string | null,
          status: 'pending' as const,
          progress: 0,
          transcript: null,
          error: null,
        }
        addJob(job)

        // Select the first job automatically
        if (lines.indexOf(url) === 0) {
          setSelectedJobId(job.id)
        }

        // Subscribe to progress updates
        subscribeToJob(job.id, (update) => {
          updateJob(job.id, update)
        })
      } catch (err) {
        // Create a local error job
        const errorJob = {
          id: `error-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          url,
          status: 'error' as const,
          progress: 0,
          transcript: null,
          error: err instanceof Error ? err.message : 'Failed to start transcription',
        }
        addJob(errorJob)
      }
    }

    setUrls('')
    setSubmitting(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste video URLs here (one per line)&#10;&#10;Supports YouTube and TikTok"
        rows={4}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm
                   placeholder:text-zinc-600 resize-none
                   focus:outline-none focus:border-zinc-600 transition-colors"
      />

      <div className="flex items-center gap-2">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:border-zinc-600 transition-colors appearance-none cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={submitting || !urls.trim()}
          className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium
                     hover:bg-white active:scale-[0.98] transition-all duration-150
                     disabled:opacity-40 disabled:pointer-events-none shrink-0"
        >
          {submitting ? 'Starting...' : 'Transcribe'}
        </button>
      </div>
    </div>
  )
}
