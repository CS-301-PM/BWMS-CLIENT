import { useQuery } from '@tanstack/react-query'
import { inventoryApi } from '../api/endpoints'

export const useBlockchainTransactions = (filters?: {
  operationType?: string
  status?: string
  limit?: number
}) => {
  return useQuery({
    queryKey: ['blockchainTransactions', filters],
    queryFn: () => 
      inventoryApi.getBlockchainLogs(filters).then(res => res.data),
    refetchInterval: 15000, // Refetch every 15 seconds
  })
}

export const useTransactionStats = () => {
  return useQuery({
    queryKey: ['blockchainStats'],
    queryFn: () => 
      inventoryApi.getBlockchainStats().then(res => res.data),
  })
}