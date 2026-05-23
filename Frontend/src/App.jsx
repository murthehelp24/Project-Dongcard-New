import React, { useEffect } from 'react'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import useThemeStore from './stores/themeStore'

function App() {
  const theme = useThemeStore(state => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <ToastContainer position="top-center"/>
      <AppRouter />
    </>
  )
}

export default App