import React from 'react'
import { useDashboardStats } from '../../hooks/useDashboard'
import { useStockRequests } from '../../hooks/useRequests'
import { useStockItems } from '../../hooks/useInventory'
import StatsCards from './StatsCards'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { 
  Package, 
  ClipboardList, 
  Users,
  BarChart3,
  Plus
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: requests } = useStockRequests({ page_size: 5, status: 'PENDING' })
  const { data: lowStockItems } = useStockItems({ page_size: 5 })

  if (statsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex space-x-2">
          <Button asChild>
            <Link to="/inventory/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Link>
          </Button>
        </div>
      </div>

      {stats && <StatsCards stats={stats} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requests?.results?.length === 0 ? (
              <p className="text-muted-foreground">No pending requests</p>
            ) : (
              <div className="space-y-3">
                {requests?.results?.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <p className="font-medium">{request.item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.quantity} units • {request.department}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/requests">Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button variant="link" className="mt-4 p-0" asChild>
              <Link to="/requests">View all requests</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems?.results?.length === 0 ? (
              <p className="text-muted-foreground">All items are well stocked</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems?.results?.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} units • {item.location}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/inventory">Restock</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button variant="link" className="mt-4 p-0" asChild>
              <Link to="/inventory">View all items</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard