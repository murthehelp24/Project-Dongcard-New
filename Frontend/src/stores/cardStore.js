
import { create } from "zustand"
import { getAllCard, getCardById } from "../api/mainApi"

const useCardStore = create((set, get) => ({
  cards: [],
  currentCard: null,
  getAllCard: async () => {
    const resp = await getAllCard()
    set({ cards: resp.data.cards })
    return resp
  },
getCardById: async (id) => {
  const resp = await getCardById(id)
  set({ currentCard: resp.data.card }) 
  return resp
}
}))

export default useCardStore