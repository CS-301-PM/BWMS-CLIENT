import { api } from '../lib/api'
import { StockRequest, CreateStockRequest, UpdateStockRequest, PaginatedResponse, PaginationParams, StockRequestFilters } from '../types'

export const requestsApi = {
  getStockRequests: async (params?: PaginationParams & StockRequestFilters): Promise<PaginatedResponse<StockRequest>> => {
    const response = await api.get<PaginatedResponse<StockRequest>>('/stock-requests/', { params })
    return response.data
  },

  createDepartmentRequest: async (data: CreateStockRequest): Promise<StockRequest> => {
    const response = await api.post<StockRequest>('/department-requests/', data)
    return response.data
  },

  getStockRequest: async (id: number): Promise<StockRequest> => {
    const response = await api.get<StockRequest>(`/stock-requests/${id}/`)
    return response.data
  },

  updateStockRequest: async (id: number, data: UpdateStockRequest): Promise<StockRequest> => {
    const response = await api.patch<StockRequest>(`/stock-requests/${id}/`, data)
    return response.data
  },

  deleteStockRequest: async (id: number): Promise<void> => {
    await api.delete(`/stock-requests/${id}/`)
  },
}