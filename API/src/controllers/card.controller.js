import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { createCard, findAllCard, findCardById, removeCard, updateCard } from '../services/card.service.js'

export async function getAllCard(req, res, next) {
  try {
    const cards = await findAllCard()
    res.json({ cards })
  } catch (error) {
    next(error)
  }
}

export async function getCardById(req, res, next) {
  try {
    const card = await findCardById(req.params.id)
    if (!card) throw createError(404, 'ไม่พบข้อมูลการ์ดใบนี้')
    res.json({ card })
  } catch (error) {
    next(error)
  }
}

export async function addCard(req, res, next) {
  try {
    const newCard = await createCard(req.body)
    res.json({
      message: 'เพิ่มการ์ดสำเร็จ',
      card: newCard
    })
  } catch (error) {
    next(error)
  }
}

export async function editCard(req, res, next) {
  try {
    const updatedCard = await updateCard(req.params.id, req.body)
    res.json({
      message: 'แก้ไขการ์ดสำเร็จ',
      card: updatedCard
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteCard(req, res, next) {
  try {
    const card = await removeCard(req.params.id)
    res.json({ message: 'ลบการ์ดออกจากระบบสำเร็จ', card })
  } catch (error) {
    if (error.code === 'P2003') {
      return next(createError(400, 'ไม่สามารถลบการ์ดได้ เนื่องจากการ์ดใบนี้มีการสั่งซื้อของลูกค้า'))
    }
    next(error)
  }
}