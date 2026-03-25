import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { addCardWishlist, deleteWishlist, getMyWishlist } from '../controllers/wishlist.controller.js'

const router = express.Router()

router.get('/', authenticate, getMyWishlist)
router.post('/', authenticate, addCardWishlist)
router.delete('/:id', authenticate, deleteWishlist)

export default router 