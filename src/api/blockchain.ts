import { api } from '../lib/api'
import { BlockchainLog, TransactionVerification, PaginatedResponse, PaginationParams, BlockchainLogFilters } from '../types'

export const blockchainApi = {
  getBlockchainLogs: async (params?: PaginationParams & BlockchainLogFilters): Promise<BlockchainLog[]> => {
    const response = await api.get<BlockchainLog[]>('/blockchain/logs/', { params })
    return response.data
  },

  verifyTransaction: async (txHash: string): Promise<TransactionVerification> => {
    const response = await api.get<TransactionVerification>(`/blockchain/verify/${txHash}/`)
    return response.data
  },
}