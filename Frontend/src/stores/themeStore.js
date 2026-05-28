import { create } from "zustand"
import { createJSONStorage, persist } from 'zustand/middleware'

const getSystemTheme = () => 
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const useThemeStore = create(persist((set) => ({
  theme: getSystemTheme(),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  setTheme: (theme) => set({ theme })
}), {
  name: 'theme-storage',
  storage: createJSONStorage(() => localStorage)
}))

export default useThemeStore
