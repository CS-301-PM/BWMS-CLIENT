import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deliveriesApi } from '../api/deliveries'
import { PaginationParams, CreateSupplierDelivery } from '../types'
import { useToast } from './use-toast'

export const useSupplierDeliveries = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['supplierDeliveries', params],
    queryFn: () => deliveriesApi.getSupplierDeliveries(params),
    keepPreviousData: true,
  })
}

export const useCreateSupplierDelivery = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: deliveriesApi.createSupplierDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplierDeliveries'] })
      queryClient.invalidateQueries({ queryKey: ['stockItems'] }) // Stock levels change
      toast({
        title: 'Success',
        description: 'Delivery submitted successfully',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to submit delivery',
        variant: 'destructive',
      })
    },
  })
}

export const useVerifyDelivery = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: deliveriesApi.verifyDelivery,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['supplierDeliveries'] })
      queryClient.invalidateQueries({ queryKey: ['stockItems'] }) // Stock levels change
      toast({
        title: 'Success',
        description: `Delivery #${id} verified successfully`,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to verify delivery',
        variant: 'destructive',
      })
    },
  })
}