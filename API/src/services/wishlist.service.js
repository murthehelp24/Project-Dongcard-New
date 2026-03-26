import { prisma } from "../lib/prisma.js";


export async function getWishByUser(userId) {
  return await prisma.wishlist.findMany({
    where: { userId: userId },
    include: {
      card: true
    }
  })
}


export async function addWishlist(userId, cardId) {
  return await prisma.wishlist.create({
    data: {
      userId: userId,
      cardId
    }
  })
}

export async function removeWishlist(userId, cardId) {
  return await prisma.wishlist.delete({
    where: {
      userId_cardId: {
        userId: userId,
        cardId: cardId
      }
    }
  })
}