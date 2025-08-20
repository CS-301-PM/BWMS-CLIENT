import { useQuery } from '@tanstack/react-query'
import { blockchainApi } from '../api/blockchain'
import { PaginationParams, BlockchainLogFilters } from '../types'

export const useBlockchainLogs = (params?: PaginationParams & BlockchainLogFilters) => {
  return useQuery({
    queryKey: ['blockchainLogs', params],
    queryFn: () => blockchainApi.getBlockchainLogs(params),
  })
}

export const useVerifyTransaction = (txHash: string) => {
  return useQuery({
    queryKey: ['transactionVerification', txHash],
    queryFn: () => blockchainApi.verifyTransaction(txHash),
    enabled: !!txHash,
  })
}