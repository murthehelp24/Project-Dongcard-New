import { create } from "zustand"
import { persist } from "zustand/middleware"


const useCartStore = create(persist((set, get) => ({
  cart: [],
  // เพิ่มการ์ดเข้าตะกล้า
  addToCart: (card) => {
    const currentCart = get().cart
    const listItem = currentCart.find((item) => item.id === card.id)
    if (listItem) {
      const updateCart = currentCart.map((item) =>
        item.id === card.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
      set({ cart: updateCart })
    } else {
      set({ cart: [...currentCart, { ...card, quantity: 1 }] })
    }
  },
  // ลบการ์ดออก
  cleanCart: () => set({ cart: [] }),

  removeFromCart: (cardId) => {
    const currentCart = get().cart
    const updateCart = currentCart.filter((item) => item.id !== cardId)
    set({ cart: updateCart })
  },

  updateQuantity: (cardId, delta) => {
    const currentCart = get().cart
    const updateCart = currentCart.map((item) => {
      if (item.id === cardId) {
        const newQuantity = (item.quantity || 1) + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
      }
      return item
    }).filter(Boolean)
    set({ cart: updateCart })
  },

  // ราคารวม
  totalPrice: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}),
  {
    name : 'cartStore'
  }
))

export default useCartStore