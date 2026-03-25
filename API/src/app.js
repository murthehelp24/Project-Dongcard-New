import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js'
import authRouter from './routes/auth.route.js'
import cardRouter from './routes/card.route.js'
import orderRouter from './routes/order.route.js'
import wishlistRouter from './routes/wishlist.route.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/cards', cardRouter)
app.use('/api/orders', orderRouter)
app.use('/api/wishlist', wishlistRouter)

app.use(errorMiddleware)
export default app