import React from 'react'
import { useAppStore } from '../../store/store'
import type { HardwareInfo } from '../../../shared/types'

interface Props {
  hardware: HardwareInfo | null
  selectedModel: string
}

export default function Ready({ hardware, selectedModel }: Props) {
  const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete)
  const setSelectedModel = useAppStore((s) => s.setSelectedModel)
  const setComputeType = useAppStore((s) => s.setComputeType)
  const setDevice = useAppStore((s) => s.setDevice)

  const handleStart = () => {
    setSelectedModel(selectedModel)
    if (hardware) {
      setComputeType(hardware.recommended_compute)
      setDevice(hardware.recommended_device)
    }
    setOnboardingComplete(true)
  }

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">You're all set!</h2>
        <p className="text-zinc-400 text-sm">Everything is configured and ready to go.</p>
      </div>

      {/* Config summary */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
          <span className="text-xs text-zinc-500">Model</span>
          <span className="text-sm font-medium">{selectedModel}</span>
        </div>
        {hardware && (
          <>
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-xs text-zinc-500">Device</span>
              <span className="text-sm font-medium">
                {hardware.cuda_available ? 'GPU (CUDA)' : 'CPU'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-xs text-zinc-500">Compute Type</span>
              <span className="text-sm font-medium">{hardware.recommended_compute}</span>
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleStart}
        className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium
                   hover:bg-white active:scale-[0.98] transition-all duration-150"
      >
        Start Transcribing
      </button>
    </div>
  )
}
