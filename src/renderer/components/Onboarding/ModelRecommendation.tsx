import React, { useEffect, useState } from 'react'
import { fetchModels } from '../../hooks/useBackend'
import type { HardwareInfo, ModelInfo } from '../../../shared/types'

interface Props {
  hardware: HardwareInfo | null
  onNext: (model: string, models: ModelInfo[]) => void
}

export default function ModelRecommendation({ hardware, onNext }: Props) {
  const [models, setModels] = useState<ModelInfo[]>([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchModels()
      .then((m) => {
        setModels(m)
        const recommended = hardware?.recommended_model || m[0]?.name || ''
        setSelected(recommended)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [hardware])

  const formatSize = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
    return `${mb} MB`
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm">Loading available models...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Choose a Model</h2>
        <p className="text-zinc-400 text-sm">
          {hardware?.recommended_model
            ? `We recommend "${hardware.recommended_model}" based on your hardware.`
            : 'Select the model you want to use for transcription.'}
        </p>
      </div>

      <div className="w-full space-y-2">
        {models.map((model) => {
          const isRecommended = model.name === hardware?.recommended_model
          const isSelected = model.name === selected
          return (
            <button
              key={model.name}
              onClick={() => setSelected(model.name)}
              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-150 text-left
                ${isSelected
                  ? 'bg-zinc-800 border-zinc-600'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? 'border-zinc-300' : 'border-zinc-600'}`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-zinc-300" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{model.name}</span>
                    {isRecommended && (
                      <span className="text-[10px] font-medium bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded">
                        Recommended
                      </span>
                    )}
                    {model.downloaded && (
                      <span className="text-[10px] font-medium bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded">
                        Downloaded
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{model.description}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500 shrink-0 ml-3">
                {formatSize(model.size_mb)}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onNext(selected, models)}
        disabled={!selected}
        className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium
                   hover:bg-white active:scale-[0.98] transition-all duration-150
                   disabled:opacity-40 disabled:pointer-events-none"
      >
        {models.find((m) => m.name === selected)?.downloaded
          ? 'Continue'
          : 'Download Selected Model'}
      </button>
    </div>
  )
}
