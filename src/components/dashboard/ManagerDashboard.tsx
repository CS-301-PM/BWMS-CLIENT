import React from 'react'
import { useDashboardStats } from '../../hooks/useDashboard'
import { usePendingRequests } from '../../hooks/useRequests'
import { useApproveRequest } from '../../hooks/useRequests
import RequestCard from '../requests/RequestCard'
import StatsCards from './StatsCards'
import TransactionHistory from '../blockchain/TransactionHistory'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useStockRequests } from '../../hooks/useRequests'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import StatsCards from './StatsCards'
import { Button } from '../ui/button'
import { ClipboardList, AlertTriangle, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import TransactionVerifier from '../blockchain/TransactionVerifier'

const ManagerDashboard: React.FC = () => {
  const { data: pendingRequests, isLoading, error } = usePendingRequests()
  const approveRequest = useApproveRequest()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load pending requests. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
        <p className="text-muted-foreground">
          Review pending requests and monitor blockchain transactions
        </p>
      </div>

      <StatsCards />

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Pending Requests</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                {pendingRequests?.length || 0} requests awaiting your approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-4 border rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : pendingRequests?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending requests at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests?.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onApprove={() => approveRequest.mutate(request.id)}
                      onApproveLoading={approveRequest.isLoading}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionHistory />
            <TransactionVerifier />
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Approval Analytics</CardTitle>
              <CardDescription>
                Insights into request approval patterns and blockchain usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default ManagerDashboard