import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TranscriptionJob } from '../../shared/types'

interface AppState {
  // Onboarding
  onboardingComplete: boolean
  setOnboardingComplete: (complete: boolean) => void

  // Settings
  selectedModel: string
  setSelectedModel: (model: string) => void
  selectedLanguage: string
  setSelectedLanguage: (lang: string) => void
  computeType: string
  setComputeType: (type: string) => void
  device: string
  setDevice: (device: string) => void

  // Jobs
  jobs: TranscriptionJob[]
  addJob: (job: TranscriptionJob) => void
  updateJob: (id: string, updates: Partial<TranscriptionJob>) => void
  removeJob: (id: string) => void

  // Selected job for viewing
  selectedJobId: string | null
  setSelectedJobId: (id: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Onboarding
      onboardingComplete: false,
      setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),

      // Settings
      selectedModel: '',
      setSelectedModel: (model) => set({ selectedModel: model }),
      selectedLanguage: 'auto',
      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
      computeType: 'auto',
      setComputeType: (type) => set({ computeType: type }),
      device: 'auto',
      setDevice: (device) => set({ device: device }),

      // Jobs
      jobs: [],
      addJob: (job) => set((s) => ({ jobs: [...s.jobs, job] })),
      updateJob: (id, updates) =>
        set((s) => ({
          jobs: s.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
        })),
      removeJob: (id) =>
        set((s) => ({
          jobs: s.jobs.filter((j) => j.id !== id),
          selectedJobId: s.selectedJobId === id ? null : s.selectedJobId,
        })),

      // Selected job
      selectedJobId: null,
      setSelectedJobId: (id) => set({ selectedJobId: id }),
    }),
    {
      name: 'transcription-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        onboardingComplete: state.onboardingComplete,
        selectedModel: state.selectedModel,
        selectedLanguage: state.selectedLanguage,
        computeType: state.computeType,
        device: state.device,
      }),
    }
  )
)
