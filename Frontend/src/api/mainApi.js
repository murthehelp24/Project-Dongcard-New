import useUserStore from "../stores/userStore";
import axios from 'axios'


export const mainApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
})

mainApi.interceptors.request.use(config => {
  const token = useUserStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiRegister = async (body) => {
  return await mainApi.post('/auth/register', body)
}

// user
export const getAllCard = () => mainApi.get('/cards')
export const getCardById = (id) => mainApi.get(`/cards/${id}`)

// order
export const createOrder = (body) => mainApi.post('/orders', body)
export const getAllOrder = () => mainApi.get('/orders')
export const getOrderById = (orderId) => mainApi.get(`/orders/${orderId}`)
export const notifyPayment = (orderId, data) => mainApi.patch(`/orders/${orderId}/payment`, data)

// wishlist
export const createWishlist = (body) => mainApi.post('/wishlist', body)
export const deleteWishlist = (id) => mainApi.delete(`/wishlist/${id}`)
export const getAllWishlist = () => mainApi.get('/wishlist')

// admin order
export const getAllOrderAdmin = () => mainApi.get('/orders/admin/all')
export const editOrderAdmin = (id, data) => mainApi.patch(`orders/${id}/status`, data)

// admin card
export const addCardByAdmin = (body) => mainApi.post('/cards', body)
export const editCardByAdmin = (id, data) => mainApi.put(`/cards/${id}`, data)
export const deleteCardByAdmin = (id) => mainApi.delete(`/cards/${id}`)

// admin dashboard
export const getDashboardStats = () => mainApi.get('/admin/stats')