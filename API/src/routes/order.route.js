import express from 'express'
import { addOrder, adminGetAllOrder, adminUpdateStatus, getMyOrders, getOrderDetail, notifyPayment, } from '../controllers/order.controller.js'
import { adminCheck, authenticate } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'


const router = express.Router()
// admin แก้ไข status 
router.patch('/:id/status', authenticate, adminCheck, adminUpdateStatus)
router.get('/admin/all', authenticate, adminCheck, adminGetAllOrder)

router.post('/', authenticate, addOrder)
router.get('/', authenticate, getMyOrders)
router.get('/:id', authenticate, getOrderDetail)
router.patch('/:id/payment', authenticate, upload.single('paymentSlip'), notifyPayment)


export default router 