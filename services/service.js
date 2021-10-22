import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  proxyHeaders: false,
  credentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
