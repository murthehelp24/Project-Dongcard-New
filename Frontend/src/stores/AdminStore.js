import { create } from "zustand";
import { editOrderAdmin, getAllOrderAdmin } from "../api/mainApi";


const useAdminStore = create((set, get) => ({
  admin: [],
  getAllOrderAdmin: async () => {
    const resp = await getAllOrderAdmin()
    set({ admin: resp.data.orders })
  },
  editOrderAdmin: async (id, status) => {
    const resp = await editOrderAdmin(id, {status})
    get().getAllOrderAdmin()
  }

}))


export default useAdminStore