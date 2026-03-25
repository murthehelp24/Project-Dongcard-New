import { prisma } from "../lib/prisma.js";
import createError from 'http-errors'


// สร้าง Order พร้อมตัดสต็อก
export async function createOrder(userId, address, items) {
  return await prisma.$transaction(async (tx) => {
    let total = 0
    const orderItemData = []

    for (const item of items) {
      const card = await tx.card.findUnique({ where: { id: item.cardId } })

      if (!card) throw createError(`ไม่พบการ์ด ${item.cardId}`)
      if (card.stock < item.quantity) throw createError(`สินค้า ${card.name} ในสต็อกไม่พอ`)

      // ตัดสต็อก
      await tx.card.update({
        where: { id: item.cardId },
        data: { stock: { decrement: item.quantity } }
      })

      // คำนวณราคารวมของออเดอร์
      total += card.price * item.quantity
      orderItemData.push({
        cardId: item.cardId,
        quantity: item.quantity,
        soldPrice: card.price
      })
    }

    return await tx.order.create({
      data: {
        buyerId: userId,
        address,
        total,
        items: { create: orderItemData }
      },
      include: { items: true }
    })
  })
}

// ดูประวัติการซื้อของ User
export async function getUserOrders(userId) {
  return await prisma.order.findMany({
    where: { buyerId: userId },
    include: { items: { include: { card: true } } },
    orderBy: { createdAt: "desc" }
  })
}

// ดูรายละเอียด Order
export async function findOrderById(orderId) {
  return await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: { items: { include: { card: true } } }
  })
}

// อัปเดทจ่ายเงิน
export async function updatePayment(orderId, slipUrl) {
  return await prisma.order.update({
    where: { id: Number(orderId) },
    data: {
      paymentSlip: slipUrl,
      status: 'PAID'
    }
  })
}

// Admin อัปเดทสถานะ
export async function updateStatus(orderId, status) {
  return await prisma.order.update({
    where: { id: Number(orderId) },
    data: { status }
  })
}

// Admin ดูออเดอร์ทั้งหมด
export async function getAllOrders() {
  return await prisma.order.findMany({
    include: {
      buyer: {
        select: { username: true, email: true } // ดึงชื่ออีเมลคนซื้อมาด้วย
      },
      items: true
    },
    orderBy: { createdAt: "desc" }
  })
}






