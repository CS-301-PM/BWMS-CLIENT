import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inventoryApi } from '../api/inventory'
import { PaginationParams, StockItem } from '../types'
import { useToast } from './use-toast'

export const useStockItems = (params?: PaginationParams & { search?: string; location?: string }) => {
  return useQuery({
    queryKey: ['stockItems', params],
    queryFn: () => inventoryApi.getStockItems(params),
    keepPreviousData: true,
  })
}

export const useStockItem = (id: number) => {
  return useQuery({
    queryKey: ['stockItem', id],
    queryFn: () => inventoryApi.getStockItem(id),
    enabled: !!id,
  })
}

export const useCreateStockItem = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: inventoryApi.createStockItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] })
      toast({
        title: 'Success',
        description: 'Stock item created successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create stock item',
        variant: 'destructive',
      })
    },
  })
}

export const useUpdateStockItem = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StockItem> }) => inventoryApi.updateStockItem(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] })
      queryClient.invalidateQueries({ queryKey: ['stockItem', variables.id] })
      toast({
        title: 'Success',
        description: 'Stock item updated successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to update stock item',
        variant: 'destructive',
      })
    },
  })
}

export const useDeleteStockItem = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: inventoryApi.deleteStockItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stockItems'] })
      toast({
        title: 'Success',
        description: 'Stock item deleted successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to delete stock item',
        variant: 'destructive',
      })
    },
  })
}