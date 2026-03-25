import useUserStore from "../stores/userStore";
import axios from 'axios'


export const mainApi = axios.create({
  baseURL: 'http://localhost:8888/api',
  headers: {
    'Content-Type': 'application/json'
  }
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

export const createOrder = (body) => mainApi.post('/orders', body)
export const getAllOrder = () => mainApi.get('/orders')