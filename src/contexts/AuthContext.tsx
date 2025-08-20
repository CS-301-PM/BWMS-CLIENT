import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '../types'
import { setAuthToken, clearAuthToken } from '../lib/api'
import { useToast } from '../hooks/use-toast'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Token exists, but we need to validate it by fetching user data
      // This will be handled by the useCurrentUser hook
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    toast({
      title: 'Login successful',
      description: `Welcome back, ${userData.username}!`,
    })
  }

  const logout = () => {
    clearAuthToken()
    setUser(null)
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    })
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}