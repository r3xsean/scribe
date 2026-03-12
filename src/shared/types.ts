export interface HardwareInfo {
  gpu_name: string | null
  vram_mb: number
  ram_mb: number
  cuda_available: boolean
  recommended_model: string
  recommended_compute: string
  recommended_device: string
}

export interface ModelInfo {
  name: string
  size_mb: number
  downloaded: boolean
  description: string
}

export interface TranscriptionJob {
  id: string
  url: string
  title: string | null
  status: 'pending' | 'downloading' | 'transcribing' | 'done' | 'error'
  progress: number
  transcript: string | null
  error: string | null
}

export interface TranscribeRequest {
  url: string
  model: string
  language?: string
}
