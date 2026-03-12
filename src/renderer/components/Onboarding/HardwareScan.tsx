import React, { useEffect, useState } from 'react'
import { fetchHardware } from '../../hooks/useBackend'
import type { HardwareInfo } from '../../../shared/types'

interface Props {
  onNext: (hardware: HardwareInfo) => void
}

export default function HardwareScan({ onNext }: Props) {
  const [scanning, setScanning] = useState(true)
  const [hardware, setHardware] = useState<HardwareInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const scan = async () => {
      try {
        const hw = await fetchHardware()
        if (!cancelled) {
          // Add small delay for UX
          setTimeout(() => {
            if (!cancelled) {
              setHardware(hw)
              setScanning(false)
            }
          }, 800)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Scan failed')
          setScanning(false)
        }
      }
    }
    scan()
    return () => { cancelled = true }
  }, [])

  if (scanning) {
    return (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-zinc-600 pulse-ring" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Scanning Hardware</h2>
          <p className="text-zinc-400 text-sm">Detecting your GPU and system capabilities...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <p className="text-zinc-300">{error}</p>
        <button
          onClick={() => { setScanning(true); setError(null) }}
          className="px-6 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  const formatMb = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
    return `${mb} MB`
  }

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Hardware Detected</h2>
        <p className="text-zinc-400 text-sm">Here's what we found on your system</p>
      </div>

      <div className="w-full space-y-3">
        {/* GPU */}
        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">GPU</p>
              <p className="text-xs text-zinc-500">
                {hardware!.gpu_name || 'No GPU detected'}
              </p>
            </div>
          </div>
          {hardware!.vram_mb > 0 && (
            <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
              {formatMb(hardware!.vram_mb)} VRAM
            </span>
          )}
        </div>

        {/* CUDA */}
        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">CUDA Acceleration</p>
              <p className="text-xs text-zinc-500">
                {hardware!.cuda_available ? 'Available - GPU acceleration enabled' : 'Not available - will use CPU'}
              </p>
            </div>
          </div>
          <div className={`w-2.5 h-2.5 rounded-full ${hardware!.cuda_available ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>

        {/* RAM */}
        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">System RAM</p>
              <p className="text-xs text-zinc-500">{formatMb(hardware!.ram_mb)}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNext(hardware!)}
        className="px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium
                   hover:bg-white active:scale-[0.98] transition-all duration-150"
      >
        Continue
      </button>
    </div>
  )
}
