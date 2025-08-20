import React from 'react'
import { useSupplierDeliveries } from '../../hooks/useDeliveries'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Truck, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const SupplierDashboard: React.FC = () => {
  const { data: myDeliveries } = useSupplierDeliveries({ page_size: 10 })

  const statusCounts = {
    pending: myDeliveries?.results?.filter(d => d.status === 'PENDING').length || 0,
    verified: myDeliveries?.results?.filter(d => d.status === 'VERIFIED').length || 0,
    rejected: myDeliveries?.results?.filter(d => d.status === 'REJECTED').length || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h2>
        <Button asChild>
          <Link to="/deliveries/new">
            <Truck className="h-4 w-4 mr-2" />
            New Delivery
          </Link>
        </Button>
      </div>

      {/* Delivery Status Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.verified}</div>
            <p className="text-xs text-muted-foreground">Completed deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.rejected}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* My Recent Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            My Recent Deliveries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myDeliveries?.results?.length === 0 ? (
            <p className="text-muted-foreground">No deliveries yet</p>
          ) : (
            <div className="space-y-3">
              {myDeliveries?.results?.slice(0, 5).map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <p className="font-medium">Delivery #{delivery.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.items.length} items • {delivery.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(delivery.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/deliveries">View</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button variant="link" className="mt-4 p-0" asChild>
            <Link to="/deliveries">View all my deliveries</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SupplierDashboard