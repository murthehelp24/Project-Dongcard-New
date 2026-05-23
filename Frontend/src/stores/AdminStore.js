import { create } from "zustand";
import { addCardByAdmin, deleteCardByAdmin, editCardByAdmin, editOrderAdmin, getAllCard, getAllOrderAdmin, getDashboardStats } from "../api/mainApi";


const useAdminStore = create((set, get) => ({
  admin: [],
  cards: [],
  dashboardStats: null,
  getAllOrderAdmin: async () => {
    const resp = await getAllOrderAdmin()
    set({ admin: resp.data.orders })
    return resp
  },
  editOrderAdmin: async (id, status) => {
    const resp = await editOrderAdmin(id, { status })
    get().getAllOrderAdmin()
    return resp
  },
  // cards
  fetchCards: async () => {
    const resp = await getAllCard()
    set({ cards: resp.data.cards })
    return resp
  },
  addCardByAdmin: async (data) => {
    const resp = await addCardByAdmin(data)
    get().fetchCards()
    return resp
  },
  editCardByAdmin: async (id, data) => {
    const resp = await editCardByAdmin(id, data)
    get().fetchCards()
    return resp
  },
  deleteCardByAdmin: async (id) => {
    const resp = await deleteCardByAdmin(id)
    get().fetchCards()
    return resp
  },
  fetchDashboardData: async () => {
    try {
      const resp = await getDashboardStats()
      set({ dashboardStats: resp.data })
      return resp
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    }
  }

}))


export default useAdminStore