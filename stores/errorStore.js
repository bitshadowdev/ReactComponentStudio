import { create } from 'zustand'

export const useErrorStore = create((set) => ({
  errors: "",
  setErrors: () => set((errors) => ({errors: errors})),
}))