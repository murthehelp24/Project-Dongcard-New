import createError from "http-errors"
import { addWishlist, getWishByUser, removeWishlist } from "../services/wishlist.service.js"


export async function getMyWishlist(req, res, next) {
  try {
    const items = await getWishByUser(req.user.id)
    res.json({ items })
  } catch (error) {
    next(error)
  }
}

export async function addCardWishlist(req, res, next) {
  try {
    const { cardId } = req.body
    const item = await addWishlist(req.user.id, cardId)
    res.json({
      message: 'เพิ่มลงรายการโปรดแล้ว',
      item
    })
  } catch (error) {
    if (error.code === 'P2002') {
      throw createError(400, 'การ์ดนี้อยู่ในรายการโปรดอยู่แล้ว')
    }
    next(error)
  }
}


export async function deleteWishlist(req, res, next) {
  try {
    const { id } = req.params
    await removeWishlist(req.user.id, id)
    res.json({ message: 'ลบออกจากรายการโปรดแล้ว' })
  } catch (error) {
    next(error)
  }
}