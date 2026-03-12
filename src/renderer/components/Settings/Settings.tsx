import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/store'
import { fetchHardware, fetchModels, downloadModel, deleteModel } from '../../hooks/useBackend'
import type { HardwareInfo, ModelInfo } from '../../../shared/types'

interface Props {
  onClose: () => void
}

export default function Settings({ onClose }: Props) {
  const selectedModel = useAppStore((s) => s.selectedModel)
  const setSelectedModel = useAppStore((s) => s.setSelectedModel)
  const selectedLanguage = useAppStore((s) => s.selectedLanguage)
  const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage)

  const [hardware, setHardware] = useState<HardwareInfo | null>(null)
  const [models, setModels] = useState<ModelInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadingModel, setDownloadingModel] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [deletingModel, setDeletingModel] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchHardware(), fetchModels()])
      .then(([hw, m]) => {
        setHardware(hw)
        setModels(m)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleDownload = async (name: string) => {
    setDownloadingModel(name)
    setDownloadProgress(0)
    try {
      await downloadModel(name, (p, status) => {
        setDownloadProgress(p)
        if (status === 'done' || p >= 100) {
          setDownloadingModel(null)
          setModels((prev) =>
            prev.map((m) => (m.name === name ? { ...m, downloaded: true } : m))
          )
        }
      })
    } catch {
      setDownloadingModel(null)
    }
  }

  const handleDelete = async (name: string) => {
    setDeletingModel(name)
    try {
      await deleteModel(name)
      setModels((prev) =>
        prev.map((m) => (m.name === name ? { ...m, downloaded: false } : m))
      )
      if (selectedModel === name) {
        const firstDownloaded = models.find((m) => m.name !== name && m.downloaded)
        if (firstDownloaded) setSelectedModel(firstDownloaded.name)
      }
    } catch {
      // ignore
    }
    setDeletingModel(null)
  }

  const formatMb = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
    return `${mb} MB`
  }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-xl animate-modal">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50">
          <h2 className="text-base font-semibold tracking-tight">Settings</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400
                       hover:bg-zinc-800 hover:text-zinc-200 active:scale-[0.95] transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-60px)] p-5 space-y-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-zinc-700 border-t-accent-400 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Default Language */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Default Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-zinc-850 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm
                             focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25
                             hover:border-zinc-700 transition-all duration-150 appearance-none cursor-pointer"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hardware Info */}
              {hardware && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Hardware
                  </label>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-2.5 bg-zinc-850 rounded-lg text-xs">
                      <span className="text-zinc-400">GPU</span>
                      <span className="text-zinc-200">{hardware.gpu_name || 'None'}</span>
                    </div>
                    {hardware.vram_mb > 0 && (
                      <div className="flex items-center justify-between p-2.5 bg-zinc-850 rounded-lg text-xs">
                        <span className="text-zinc-400">VRAM</span>
                        <span className="text-zinc-200">{formatMb(hardware.vram_mb)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-2.5 bg-zinc-850 rounded-lg text-xs">
                      <span className="text-zinc-400">System RAM</span>
                      <span className="text-zinc-200">{formatMb(hardware.ram_mb)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-zinc-850 rounded-lg text-xs">
                      <span className="text-zinc-400">CUDA</span>
                      <span className={hardware.cuda_available ? 'text-green-400' : 'text-red-400'}>
                        {hardware.cuda_available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Models */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Models
                </label>
                <div className="space-y-1.5">
                  {models.map((model) => {
                    const isSelected = model.name === selectedModel
                    const isDownloading = downloadingModel === model.name
                    const isDeleting = deletingModel === model.name

                    return (
                      <div
                        key={model.name}
                        className={`p-3 rounded-lg border transition-all duration-150 ${
                          isSelected
                            ? 'bg-zinc-850 border-accent-500/30 ring-1 ring-accent-500/10'
                            : 'bg-zinc-850/50 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{model.name}</span>
                            <span className="text-[10px] text-zinc-500">{formatMb(model.size_mb)}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {model.downloaded ? (
                              <>
                                {!isSelected && (
                                  <button
                                    onClick={() => setSelectedModel(model.name)}
                                    className="text-[10px] px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600
                                               active:scale-[0.97] transition-all duration-150"
                                  >
                                    Use
                                  </button>
                                )}
                                {isSelected && (
                                  <span className="text-[10px] text-accent-300 px-2 py-1">Active</span>
                                )}
                                <button
                                  onClick={() => handleDelete(model.name)}
                                  disabled={isDeleting}
                                  className="text-[10px] px-2 py-1 rounded text-red-400 hover:bg-red-500/10
                                             active:scale-[0.97] transition-all duration-150
                                             disabled:opacity-40"
                                >
                                  {isDeleting ? '...' : 'Delete'}
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleDownload(model.name)}
                                disabled={isDownloading}
                                className="text-[10px] px-2 py-1 rounded bg-accent-500/10 text-accent-300
                                           hover:bg-accent-500/20 active:scale-[0.97] transition-all duration-150
                                           disabled:opacity-40"
                              >
                                {isDownloading ? `${Math.round(downloadProgress)}%` : 'Download'}
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] text-zinc-500 mt-1">{model.description}</p>

                        {isDownloading && (
                          <div className="relative mt-2 w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent-400 rounded-full transition-all duration-300"
                              style={{ width: `${downloadProgress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
