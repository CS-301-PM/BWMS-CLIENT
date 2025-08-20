import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { 
  Package, 
  ClipboardList, 
  TrendingUp, 
  AlertTriangle,
  Truck,
  BarChart3
} from 'lucide-react'
import { DashboardStats } from '../../types'

interface StatsCardsProps {
  stats: DashboardStats
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Items',
      value: stats.total_items.toString(),
      icon: Package,
      description: 'Unique inventory items',
      color: 'text-blue-600'
    },
    {
      title: 'Total Quantity',
      value: stats.total_quantity.toString(),
      icon: BarChart3,
      description: 'Total items in stock',
      color: 'text-green-600'
    },
    {
      title: 'Pending Requests',
      value: stats.pending_requests.toString(),
      icon: ClipboardList,
      description: 'Awaiting approval',
      color: 'text-yellow-600'
    },
    {
      title: 'Recent Movements',
      value: stats.recent_movements.toString(),
      icon: TrendingUp,
      description: 'Last 24 hours',
      color: 'text-purple-600'
    },
    {
      title: 'Damage Reports',
      value: stats.damage_reports.toString(),
      icon: AlertTriangle,
      description: 'Requiring attention',
      color: 'text-red-600'
    },
    {
      title: 'Approved Requests',
      value: stats.approved_requests.toString(),
      icon: Truck,
      description: 'This month',
      color: 'text-green-600'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsCards