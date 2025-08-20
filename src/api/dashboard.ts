import { api } from '../lib/api'
import { DashboardStats } from '../types'

export const dashboardApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/')
    return response.data
  },
}