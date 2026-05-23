import express from 'express'
import { getStats } from '../controllers/admin.controller.js'
import { adminCheck, authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/stats', authenticate, adminCheck, getStats)

export default router
