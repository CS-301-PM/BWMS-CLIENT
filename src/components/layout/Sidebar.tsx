import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { cn } from '../../lib/utils'
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Truck,
  BarChart3,
  Move3D,
  Warehouse
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'MANAGER', 'CENTRAL_STAFF', 'DEPT_STAFF', 'SUPPLIER']
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Package,
    roles: ['ADMIN', 'MANAGER', 'CENTRAL_STAFF']
  },
  {
    title: 'Requests',
    href: '/requests',
    icon: ClipboardList,
    roles: ['ADMIN', 'MANAGER', 'CENTRAL_STAFF', 'DEPT_STAFF']
  },
  {
    title: 'Movements',
    href: '/movements',
    icon: Move3D,
    roles: ['ADMIN', 'MANAGER', 'CENTRAL_STAFF']
  },
  {
    title: 'Deliveries',
    href: '/deliveries',
    icon: Truck,
    roles: ['ADMIN', 'MANAGER', 'SUPPLIER']
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['ADMIN', 'MANAGER']
  }
]

const Sidebar: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user?.user_type || '')
  )

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <Warehouse className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold">Central Stores</span>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className={cn(
                    'mr-3 h-5 w-5',
                    isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                  )} />
                  {item.title}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar