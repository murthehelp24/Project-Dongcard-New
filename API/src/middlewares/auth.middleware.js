import jwt from 'jsonwebtoken';
import createError from 'http-errors'
import { findUserById } from '../services/auth.service.js';


export async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw createError(401, 'ไม่มีสิทธิในการเข้าถึง')
    }

    const token = authorization.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserById(payload.id)
    // console.log(user)
    if (!user) throw createError(401, 'ไม่พบผู้ใช้นี้')

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}


export function adminCheck(req, res, next) {
  const { role } = req.user
  if (role !== 'ADMIN') {
    return next(createError(401, 'เฉพาะผู้ดูแลระบบเท่านั้นที่เข้าถึงได้'))
  }
  next()
}