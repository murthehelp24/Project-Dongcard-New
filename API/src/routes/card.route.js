import express from 'express'
import { addCard, deleteCard, editCard, getAllCard, getCardById } from '../controllers/card.controller.js'
import { adminCheck, authenticate } from '../middlewares/auth.middleware.js'


const router = express.Router()

router.get('/', getAllCard)
router.get('/:id', getCardById)

//admin
router.post('/', authenticate, adminCheck, addCard)
router.put('/:id', authenticate, adminCheck, editCard)
router.delete('/:id', authenticate, adminCheck, deleteCard)

export default router