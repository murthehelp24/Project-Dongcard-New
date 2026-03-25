import { prisma } from "../lib/prisma.js";


export function findAllCard() {
  return prisma.card.findMany()
}

export function findCardById(cardId) {
  return prisma.card.findUnique({
    where: { id: cardId }
  })
}

export function createCard(data) {
  return prisma.card.create({ data })
}

export function updateCard(cardId, data) {
  return prisma.card.update({
    where: { id: cardId },
    data: {
      name: data.name,
      rarity: data.rarity,
      color: data.color,
      price: data.price,
      stock: data.stock
    }
  })
}

export function removeCard(cardId) {
  return prisma.card.delete({
    where: { id: cardId }
  })
}