import createError from 'http-errors'
import { createOrder, findOrderById, getAllOrders, getUserOrders, updatePayment, updateStatus } from "../services/order.service.js"
import fs from 'fs/promises'

export async function addOrder(req, res, next) {
  try {
    const { address, items } = req.body
    const userId = req.user.id
    const order = await createOrder(userId, address, items)
    res.json({
      message: "สร้างออเดอร์สำเร็จ",
      order
    })
  } catch (error) {
    next(error)
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await getUserOrders(req.user.id)
    res.json({ orders })
  } catch (error) {
    next(error)
  }
}

export async function getOrderDetail(req, res, next) {
  try {
    const order = await findOrderById(req.params.id)
    if (!order) throw createError(404, 'ไม่พบออเดอร์นี้')

    // เช็คว่าเป็นเจ้าของหรือ admin
    if (req.user.role !== "ADMIN" && order.buyerId !== req.user.id) {
      // console.log(req.user.role)
      throw createError(403, 'ไม่มีสิทธ์เข้าถึง')
    }
    res.json({ order })
  } catch (error) {
    next(error)
  }
}

export async function notifyPayment(req, res, next) {
  try {
    // เอาออเดอร์มาเช็ค
    const order = await findOrderById(req.params.id)
    if (!order) throw createError(404, 'ไม่พบออเดอร์นี้')

    // เช็คว่าเป็นเจ้าของออเดอร์นี้ไหม
    if (order.buyerId !== req.user.id) throw createError(403, 'ไม่มีสิทธิ์แจ้งชำระเงินสำหรับออเดอร์นี้')

    // ตรวจสอบสลิป
    const slipUrl = req.file ? req.file.path : req.body.paymentSlip
    if (!slipUrl) throw createError(400, 'กรุณาแนบสลิป')

    // อัพเดทสถานะ
    const updatedOrder = await updatePayment(req.params.id, slipUrl)
    res.json({
      message: 'แจ้งโอนเงินสำเร็จ',
      order: updatedOrder
    })
  } catch (error) {
    // ถ้า error และมีไฟล์ถูกอัพโหลดมาแล้ว ให้สั่งลบทิ้ง
    if (req.file) {
      await fs.unlink(req.file.path).catch(err => console.error("ลบไฟล์ไม่สำเร็จ:", err))
    }
    next(error)
  }
}

export async function adminUpdateStatus(req, res, next) {
  try {
    const { status } = req.body
    const order = await updateStatus(req.params.id, status)
    res.json({
      message: `เปลี่ยนสถานะเป็น ${status} สำเร็จ`,
      order
    })
  } catch (error) {
    next(error)
  }
}

export async function adminGetAllOrder(req, res, next) {
  try {
    const orders = await getAllOrders()
    res.json({ orders })
  } catch (error) {
    next(error)
  }
}