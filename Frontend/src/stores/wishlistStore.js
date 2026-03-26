import { create } from "zustand";
import { createWishlist, deleteWishlist, getAllWishlist } from "../api/mainApi";


const useWishlistStore = create((set, get) => ({
  wishlist: [],
  currentWishlist: null,
  createWishlist: async (cardId) => {
    const resp = await createWishlist({ cardId: cardId })
    get().getAllWishlist()
    return resp
  },
  deleteWishlist: async (id) => {
    const resp = await deleteWishlist(id)
    get().getAllWishlist()
    return resp
  },
  getAllWishlist: async () => {
    const resp = await getAllWishlist()
    set({ wishlist: resp.data.items })
  }
}))

export default useWishlistStore