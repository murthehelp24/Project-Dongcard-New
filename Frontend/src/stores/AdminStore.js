import { create } from "zustand";
import { addCardByAdmin, deleteCardByAdmin, editCardByAdmin, editOrderAdmin, getAllCard, getAllOrderAdmin } from "../api/mainApi";


const useAdminStore = create((set, get) => ({
  admin: [],
  cards: [],
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
  }

}))


export default useAdminStore