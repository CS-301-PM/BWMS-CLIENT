import React from 'react'
import { useDashboardStats } from '../../hooks/useDashboard'
import { useStockMovements } from '../../hooks/useMovements'
import StatsCards from './StatsCards'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Move3D, Package, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const CentralStaffDashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: recentMovements } = useStockMovements({ page_size: 5 })

  if (statsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Staff Dashboard</h2>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to="/movements">
              <Move3D className="h-4 w-4 mr-2" />
              Record Movement
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/damage">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Damage
            </Link>
          </Button>
        </div>
      </div>

      {stats && <StatsCards stats={stats} />}

      {/* Recent Movements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Move3D className="h-5 w-5 mr-2" />
            Recent Movements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentMovements?.results?.length === 0 ? (
            <p className="text-muted-foreground">No recent movements</p>
          ) : (
            <div className="space-y-3">
              {recentMovements?.results?.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <p className="font-medium">Item #{movement.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.quantity} units • {movement.to_location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      By {movement.moved_by} • {new Date(movement.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button variant="link" className="mt-4 p-0" asChild>
            <Link to="/movements">View all movements</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CentralStaffDashboard