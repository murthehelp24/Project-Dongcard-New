import { create } from "zustand"
import { createOrder, getAllOrder } from "../api/mainApi"

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  createOrder: async (body) => {
    const resp = await createOrder(body)
    get().getAllOrder()
    return resp
  },
  getAllOrder: async () => {
    const resp = await getAllOrder()
    set({ orders: resp.data.orders })
    return resp
  }
}))

export default useOrderStore