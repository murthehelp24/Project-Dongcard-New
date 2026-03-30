
import { create } from "zustand"
import { getAllCard, getCardById } from "../api/mainApi"

const useCardStore = create((set, get) => ({
  cards: [],
  currentCard: null,
  filteredCards: [],
  filters: { rarity: [], color: [] },
  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().applyFilters() // ทุกครั้งที่พิมพ์ ให้กรองใหม่ทันที
  },

  setFilters: (newFilters) => {
    set({ filters: newFilters })
    get().applyFilters() // ทุกครั้งที่ set filter ให้ทำการกรองทันที
  },

  applyFilters: () => {
    const { cards, filters, searchQuery } = get()
    let tempCards = [...cards]

    // กรองด้วยชื่อ (Search)
    if (searchQuery) {
      tempCards = tempCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filters.rarity.length > 0) {
      tempCards = tempCards.filter(card => filters.rarity.includes(card.rarity))
    }
    if (filters.color.length > 0) {
      tempCards = tempCards.filter(card => filters.color.includes(card.color))
    }

    set({ filteredCards: tempCards })
  },

  getAllCard: async () => {
    const resp = await getAllCard()
    const allCards = resp.data.cards;
    set({ cards: allCards, filteredCards: allCards, searchQuery: '' })
    return resp
  },
  getCardById: async (id) => {
    const resp = await getCardById(id)
    set({ currentCard: resp.data.card })
    return resp
  }
}))

export default useCardStore