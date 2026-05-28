import React, { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import useThemeStore from './stores/themeStore'

function App() {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  useEffect(() => {
    // 1. Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    
    // 2. Initial application of theme
    document.documentElement.setAttribute('data-theme', theme)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, setTheme])

  return (
    <>
      <ToastContainer position="top-center"/>
      <AppRouter />
    </>
  )
}

export default App