import { api } from '../lib/api'
import { SupplierDelivery, CreateSupplierDelivery, PaginatedResponse, PaginationParams } from '../types'

export const deliveriesApi = {
  getSupplierDeliveries: async (params?: PaginationParams): Promise<PaginatedResponse<SupplierDelivery>> => {
    const response = await api.get<PaginatedResponse<SupplierDelivery>>('/supplier-deliveries/', { params })
    return response.data
  },

  createSupplierDelivery: async (data: CreateSupplierDelivery): Promise<SupplierDelivery> => {
    const response = await api.post<SupplierDelivery>('/supplier-deliveries/', data)
    return response.data
  },

  verifyDelivery: async (id: number): Promise<{ status: string; delivery_id: number; items_updated: number }> => {
    const response = await api.post(`/verify-delivery/${id}/`)
    return response.data
  },
}