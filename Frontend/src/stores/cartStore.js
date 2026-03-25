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