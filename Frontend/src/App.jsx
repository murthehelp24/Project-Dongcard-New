import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer position="top-center"/>
      <AppRouter />
    </>
  )
}

export default App