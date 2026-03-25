import { prisma } from "../lib/prisma.js";


export async function getWishByUser(userId) {
  return await prisma.wishlist.findMany({
    where: { userId: Number(userId) },
    include: {
      card: true
    }
  })
}


export async function addWishlist(userId, cardId) {
  return await prisma.wishlist.create({
    data: {
      userId: Number(userId),
      cardId
    }
  })
}

export async function removeWishlist(userId, cardId) {
  return await prisma.wishlist.delete({
    where: {
      userId_cardId: {
        userId: Number(userId),
        cardId: cardId
      }
    }
  })
}