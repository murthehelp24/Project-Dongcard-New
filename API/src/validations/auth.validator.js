import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    username : z.string().min(3, 'Username ต้องมี 3 ตัวขึ้นไป'),
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    password : z.string().min(6, 'Password ต้องมี 6 ตัวขึ้นไป')
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('อีเมลไม่ถูกต้อง'),
    password : z.string().min(6, 'Password ต้องมี 6 ตัวขึ้นไป')
  })
})