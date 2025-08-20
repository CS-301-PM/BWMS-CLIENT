import { api } from '../lib/api'
import { LoginCredentials, AuthResponse, User } from '../types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login/', credentials)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout/')
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/user/')
    return response.data
  },
}