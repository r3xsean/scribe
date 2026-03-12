import React from 'react'
import { useAppStore } from './store/store'
import { useBackendReady } from './hooks/useBackend'
import OnboardingWizard from './components/Onboarding/OnboardingWizard'
import MainView from './components/Transcriber/MainView'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-10 h-10 border-2 border-zinc-700 border-t-accent-400 rounded-full animate-spin" />
      <p className="text-zinc-400 text-sm">Starting backend...</p>
    </div>
  )
}

function BackendError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-8">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
        <span className="text-red-400 text-xl">!</span>
      </div>
      <p className="text-zinc-300 text-sm text-center">Failed to start backend</p>
      <p className="text-zinc-500 text-xs text-center max-w-md">{message}</p>
    </div>
  )
}

export default function App() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)
  const { ready, error } = useBackendReady()

  if (error) return <BackendError message={error} />
  if (!ready) return <LoadingSpinner />

  return onboardingComplete ? <MainView /> : <OnboardingWizard />
}
