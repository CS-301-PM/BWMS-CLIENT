import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth'
import { useAuth as useAuthContext } from '../contexts/AuthContext'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { login: contextLogin } = useAuthContext()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store token and update context
      localStorage.setItem('token', data.token)
      contextLogin(data.user)
      // Invalidate any existing user queries
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { logout: contextLogout } = useAuthContext()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Remove token and update context
      localStorage.removeItem('token')
      contextLogout()
      // Clear all queries
      queryClient.clear()
    },
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem('token'),
  })
}