import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboard'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardApi.getDashboardStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}