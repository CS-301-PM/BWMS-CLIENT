import React from 'react'
import { useStockRequests } from '../../hooks/useRequests'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const DepartmentStaffDashboard: React.FC = () => {
  const { data: myRequests } = useStockRequests({ page_size: 10 })

  const statusCounts = {
    pending: myRequests?.results?.filter(r => r.status === 'PENDING').length || 0,
    approved: myRequests?.results?.filter(r => r.status === 'APPROVED').length || 0,
    rejected: myRequests?.results?.filter(r => r.status === 'REJECTED').length || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Department Dashboard</h2>
        <Button asChild>
          <Link to="/requests/new">
            New Request
          </Link>
        </Button>
      </div>

      {/* Request Status Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.approved}</div>
            <p className="text-xs text-muted-foreground">Ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.rejected}</div>
            <p className="text-xs text-muted-foreground">Needs revision</p>
          </CardContent>
        </Card>
      </div>

      {/* My Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            My Recent Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myRequests?.results?.length === 0 ? (
            <p className="text-muted-foreground">No requests yet</p>
          ) : (
            <div className="space-y-3">
              {myRequests?.results?.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <p className="font-medium">{request.item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.quantity} units • {request.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/requests">View</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button variant="link" className="mt-4 p-0" asChild>
            <Link to="/requests">View all my requests</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DepartmentStaffDashboard