import { prisma } from '../lib/prisma.js'

export function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email }
  })
}

export function findUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username }
  })
}

export function createUser(data) {
  return prisma.user.create({ data })
}

export function findUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) }
  })
}