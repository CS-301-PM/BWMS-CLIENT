import { api } from '../lib/api'
import { StockMovement, CreateStockMovement, DamageReport, CreateDamageReport, PaginatedResponse, PaginationParams } from '../types'

export const movementsApi = {
  getStockMovements: async (params?: PaginationParams): Promise<PaginatedResponse<StockMovement>> => {
    const response = await api.get<PaginatedResponse<StockMovement>>('/stock-movements/', { params })
    return response.data
  },

  createStockMovement: async (data: CreateStockMovement): Promise<StockMovement> => {
    const response = await api.post<StockMovement>('/stock-movements/', data)
    return response.data
  },

  createDamageReport: async (data: CreateDamageReport): Promise<DamageReport> => {
    const response = await api.post<DamageReport>('/damage-reports/', data)
    return response.data
  },
}