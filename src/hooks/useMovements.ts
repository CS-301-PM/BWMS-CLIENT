import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { movementsApi } from '../api/movements'
import { PaginationParams, CreateStockMovement, CreateDamageReport } from '../types'
import { useToast } from './use-toast'

export const useStockMovements = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['stockMovements', params],
    queryFn: () => movementsApi.getStockMovements(params),
    keepPreviousData: true,
  })
}

export const useCreateStockMovement = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: movementsApi.createStockMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockMovements'] })
      queryClient.invalidateQueries({ queryKey: ['stockItems'] }) // Stock levels change
      toast({
        title: 'Success',
        description: 'Stock movement recorded successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to record movement',
        variant: 'destructive',
      })
    },
  })
}

export const useCreateDamageReport = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: movementsApi.createDamageReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] }) // Stock levels change
      toast({
        title: 'Success',
        description: 'Damage reported successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to report damage',
        variant: 'destructive',
      })
    },
  })
}