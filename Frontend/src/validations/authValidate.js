import { z } from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const registerSchema = z.object({
  username: z.string().min(3, "Username ต้องมีอย่างน้อย 3 ตัวอักษร"),
  email: z.string().min(3, "Email ต้องมีอย่างน้อย 3 ตัวอักษร")
    .refine(value => emailRegex.test(value), { message: 'กรุณากรอกอีเมลให้ถูกต้อง' }),
  password: z.string().min(6, "Password ต้องมีอย่างน้อย 6 ตัวอักษร")
})

export const loginSchema = z.object({
  email: z.string().min(3, "Email ต้องมีอย่างน้อย 3 ตัวอักษร")
    .refine(value => emailRegex.test(value), { message: 'กรุณากรอกอีเมลให้ถูกต้อง' }),
  password: z.string().min(6, "Password ต้องมีอย่างน้อย 6 ตัวอักษร")
})