import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AdminDashboard from '../components/dashboard/AdminDashboard'
import ManagerDashboard from '../components/dashboard/ManagerDashboard'
import CentralStaffDashboard from '../components/dashboard/CentralStaffDashboard'
import DepartmentStaffDashboard from '../components/dashboard/DepartmentStaffDashboard'
import SupplierDashboard from '../components/dashboard/SupplierDashboard'
import { useCurrentUser } from '../hooks/useAuth'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Dashboard: React.FC = () => {
  const { user: contextUser } = useAuth()
  const { data: user, isLoading } = useCurrentUser()

  // Use context user if available, otherwise use fetched user
  const currentUser = contextUser || user

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!currentUser) {
    return <div>Please log in to view the dashboard</div>
  }

  const renderDashboard = () => {
    switch (currentUser.user_type) {
      case 'ADMIN':
        return <AdminDashboard />
      case 'MANAGER':
        return <ManagerDashboard />
      case 'CENTRAL_STAFF':
        return <CentralStaffDashboard />
      case 'DEPT_STAFF':
        return <DepartmentStaffDashboard />
      case 'SUPPLIER':
        return <SupplierDashboard />
      default:
        return <div>No dashboard available for your role</div>
    }
  }

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  )
}

export default Dashboard