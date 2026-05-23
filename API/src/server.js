import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 8000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, ()=>{
    console.log(`Server Start : http://localhost:${PORT}`)
  })
}

export default app