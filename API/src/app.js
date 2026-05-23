import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js'
import authRouter from './routes/auth.route.js'
import cardRouter from './routes/card.route.js'
import orderRouter from './routes/order.route.js'
import wishlistRouter from './routes/wishlist.route.js'
import adminRouter from './routes/admin.route.js'
import cors from 'cors'

const app = express()

// ปรับปรุง CORS ให้รองรับการเรียกจากหน้าเว็บที่ Deploy บน Vercel
app.use(cors({
  origin: true, // อนุญาตทุก origin ที่เรียกมา (หรือระบุเป็น URL ของ Frontend คุณ)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Route สำหรับเช็คว่า API รันอยู่หรือไม่
app.get('/', (req, res) => res.json({ message: 'DongCard API is running...' }))

app.use('/api/auth', authRouter)
app.use('/api/cards', cardRouter)
app.use('/api/orders', orderRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/admin', adminRouter)

app.use(errorMiddleware)
export default app