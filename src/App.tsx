import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/toast/toaster'
import { queryClient } from './api/queryClient'
import { AuthProvider } from './contexts/AuthContext'
import { BlockchainProvider } from './contexts/BlockchainContext'
import { WebSocketProvider } from './contexts/WebSocketContext'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Requests from './pages/Requests'
import Movements from './pages/Movements'
import Deliveries from './pages/Deliveries'
import Analytics from './pages/Analytics'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'
import RoleGuard from './components/auth/RoleGuard'
import { UserType } from './types'

// Component to handle user fetching after login
const AuthenticatedLayout = () => {
  const { data: user, isLoading } = useCurrentUser()
  const { user: contextUser, login } = useAuth()

  // Sync user data with context
  React.useEffect(() => {
    if (user && !contextUser) {
      login(user)
    }
  }, [user, contextUser, login])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <Layout />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlockchainProvider>
          <WebSocketProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route
                      path="inventory"
                      element={
                        <RoleGuard allowedRoles={[UserType.ADMIN, UserType.CENTRAL_STAFF, UserType.MANAGER]}>
                          <Inventory />
                        </RoleGuard>
                      }
                    />
                    <Route
                      path="requests"
                      element={
                        <RoleGuard allowedRoles={[UserType.ADMIN, UserType.DEPT_STAFF, UserType.MANAGER, UserType.CENTRAL_STAFF]}>
                          <Requests />
                        </RoleGuard>
                      }
                    />
                    <Route
                      path="movements"
                      element={
                        <RoleGuard allowedRoles={[UserType.ADMIN, UserType.CENTRAL_STAFF, UserType.MANAGER]}>
                          <Movements />
                        </RoleGuard>
                      }
                    />
                    <Route
                      path="deliveries"
                      element={
                        <RoleGuard allowedRoles={[UserType.ADMIN, UserType.SUPPLIER, UserType.CENTRAL_STAFF]}>
                          <Deliveries />
                        </RoleGuard>
                      }
                    />
                    <Route
                      path="analytics"
                      element={
                        <RoleGuard allowedRoles={[UserType.ADMIN, UserType.MANAGER]}>
                          <Analytics />
                        </RoleGuard>
                      }
                    />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
            <Toaster />
          </WebSocketProvider>
        </BlockchainProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}


export default App