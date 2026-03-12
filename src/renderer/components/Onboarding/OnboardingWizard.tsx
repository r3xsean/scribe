import React, { useState } from 'react'
import Welcome from './Welcome'
import HardwareScan from './HardwareScan'
import ModelRecommendation from './ModelRecommendation'
import ModelDownload from './ModelDownload'
import Ready from './Ready'
import type { HardwareInfo, ModelInfo } from '../../../shared/types'

const STEPS = ['welcome', 'hardware', 'model-select', 'model-download', 'ready'] as const
type Step = (typeof STEPS)[number]

export default function OnboardingWizard() {
  const [step, setStep] = useState<Step>('welcome')
  const [hardware, setHardware] = useState<HardwareInfo | null>(null)
  const [models, setModels] = useState<ModelInfo[]>([])
  const [selectedModel, setSelectedModel] = useState('')

  const next = () => {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Step indicators */}
      <div className="flex gap-2 mb-12">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              STEPS.indexOf(step) >= i
                ? 'bg-accent-400 scale-100'
                : 'bg-zinc-700 scale-75'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-lg" key={step}>
        {step === 'welcome' && <Welcome onNext={next} />}
        {step === 'hardware' && (
          <HardwareScan
            onNext={(hw) => {
              setHardware(hw)
              next()
            }}
          />
        )}
        {step === 'model-select' && (
          <ModelRecommendation
            hardware={hardware}
            onNext={(model, allModels) => {
              setSelectedModel(model)
              setModels(allModels)
              next()
            }}
          />
        )}
        {step === 'model-download' && (
          <ModelDownload model={selectedModel} onNext={next} />
        )}
        {step === 'ready' && (
          <Ready hardware={hardware} selectedModel={selectedModel} />
        )}
      </div>
    </div>
  )
}
