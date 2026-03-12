import { useEffect, useState } from 'react'
import type { HardwareInfo, ModelInfo, TranscriptionJob } from '../../shared/types'

let cachedUrl: string | null = null

export function useBackendUrl() {
  const [url, setUrl] = useState<string | null>(cachedUrl)

  useEffect(() => {
    if (cachedUrl) {
      setUrl(cachedUrl)
      return
    }
    window.api.getBackendUrl().then((u) => {
      cachedUrl = u
      setUrl(u)
    })
  }, [])

  return url
}

async function getBaseUrl(): Promise<string> {
  if (cachedUrl) return cachedUrl
  const u = await window.api.getBackendUrl()
  cachedUrl = u
  return u
}

export async function fetchHardware(): Promise<HardwareInfo> {
  const base = await getBaseUrl()
  const res = await fetch(`${base}/hardware`)
  if (!res.ok) throw new Error(`Hardware scan failed: ${res.statusText}`)
  return res.json()
}

export async function fetchModels(): Promise<ModelInfo[]> {
  const base = await getBaseUrl()
  const res = await fetch(`${base}/models`)
  if (!res.ok) throw new Error(`Failed to fetch models: ${res.statusText}`)
  return res.json()
}

export async function startTranscription(
  url: string,
  model: string,
  language?: string
): Promise<{ id: string }> {
  const base = await getBaseUrl()
  const body: Record<string, string> = { url, model }
  if (language && language !== 'auto') body.language = language
  const res = await fetch(`${base}/transcribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Transcription failed: ${res.statusText}`)
  return res.json()
}

export function subscribeToJob(
  id: string,
  onProgress: (job: Partial<TranscriptionJob>) => void
): () => void {
  let cancelled = false
  let eventSource: EventSource | null = null

  getBaseUrl().then((base) => {
    if (cancelled) return
    eventSource = new EventSource(`${base}/transcribe/${id}/sse`)

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onProgress(data)
        if (data.status === 'done' || data.status === 'error') {
          eventSource?.close()
        }
      } catch {
        // ignore parse errors
      }
    }

    eventSource.onerror = () => {
      eventSource?.close()
    }
  })

  return () => {
    cancelled = true
    eventSource?.close()
  }
}

export async function downloadModel(
  name: string,
  onProgress: (progress: number, status?: string) => void
): Promise<() => void> {
  const base = await getBaseUrl()

  // POST kicks off the download
  const res = await fetch(`${base}/models/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) throw new Error(`Download failed: ${res.statusText}`)

  // Poll the progress endpoint every second
  let stopped = false
  const interval = setInterval(async () => {
    if (stopped) return
    try {
      const r = await fetch(`${base}/models/download/${encodeURIComponent(name)}/progress`)
      if (!r.ok) return
      const data = await r.json()
      onProgress(data.progress ?? 0, data.status)
      if (data.status === 'done' || data.status === 'error') {
        stopped = true
        clearInterval(interval)
      }
    } catch {
      // ignore fetch errors during polling
    }
  }, 1000)

  return () => {
    stopped = true
    clearInterval(interval)
  }
}

export async function deleteModel(name: string): Promise<void> {
  const base = await getBaseUrl()
  const res = await fetch(`${base}/models/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.statusText}`)
}

export function useBackendReady() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!window.api) {
      setError('Preload script not loaded. window.api is unavailable.')
      return
    }

    const handleReady = () => setReady(true)
    const handleError = (err: string) => setError(err)

    window.api.onBackendReady(handleReady)
    window.api.onBackendError(handleError)

    // Also try polling in case event already fired
    const poll = async () => {
      try {
        const base = await getBaseUrl()
        const res = await fetch(`${base}/health`, { signal: AbortSignal.timeout(2000) })
        if (res.ok) setReady(true)
      } catch {
        // not ready yet
      }
    }

    const interval = setInterval(poll, 1500)
    poll()

    return () => clearInterval(interval)
  }, [])

  return { ready, error }
}
