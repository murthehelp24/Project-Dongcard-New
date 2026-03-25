
import bcrypt from 'bcrypt'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail, findUserByUsername } from '../services/auth.service.js'

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body

    // เช็ค username , email ว่ามีหรือยัง
    const checkUsername = await findUserByUsername(username)
    if (checkUsername) throw createError(409, 'ชื่อผู้ใช้งานนี้มีผู้ใช้แล้ว')

    const checkEmail = await findUserByEmail(email)
    if (checkEmail) throw createError(409, 'อีเมล์นี้ถูกใช้งานไปแล้ว')

    // hashPassword
    const hashPassword = await bcrypt.hash(password, 5)

    // สร้าง user ใหม่
    const newUser = await createUser({
      username,
      email,
      password: hashPassword
    })
    // console.log(newUser)
    res.status(201).json({
      message: 'ลงทะเบียนเรียบร้อยแล้ว',
      user: {
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    next(error)
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    // ตรวจสอบ email , password ว่าตรงไหม
    const user = await findUserByEmail(email)
    if (!user) throw createError(401, 'อีเมลไม่ถูกต้อง')

    const isMath = await bcrypt.compare(password, user.password)
    if (!isMath) throw createError(401, 'รหัสผ่านไม่ถูกต้อง')

    const payload = { id: user.id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '14d'
    })
    // console.log(token)
    res.status(201).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
}