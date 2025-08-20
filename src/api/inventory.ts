import { api } from '../lib/api'
import { StockItem, PaginatedResponse, PaginationParams } from '../types'

export const inventoryApi = {
  getStockItems: async (params?: PaginationParams & { search?: string; location?: string }): Promise<PaginatedResponse<StockItem>> => {
    const response = await api.get<PaginatedResponse<StockItem>>('/stock-items/', { params })
    return response.data
  },

  createStockItem: async (data: Omit<StockItem, 'id' | 'last_updated'>): Promise<StockItem> => {
    const response = await api.post<StockItem>('/stock-items/', data)
    return response.data
  },

  getStockItem: async (id: number): Promise<StockItem> => {
    const response = await api.get<StockItem>(`/stock-items/${id}/`)
    return response.data
  },

  updateStockItem: async (id: number, data: Partial<StockItem>): Promise<StockItem> => {
    const response = await api.put<StockItem>(`/stock-items/${id}/`, data)
    return response.data
  },

  deleteStockItem: async (id: number): Promise<void> => {
    await api.delete(`/stock-items/${id}/`)
  },
}