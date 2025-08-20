"use client"

import {
  Settings,
  Users,
  ShoppingCart,
  BarChart3,
  HelpCircle,
  User,
  LayoutDashboard,
  FileText,
  Package,
  Receipt,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activePage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "requests", label: "Request Management", icon: FileText },
    { id: "stock", label: "Stock Management", icon: Package },
    { id: "receipts", label: "Receipt Management", icon: Receipt },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "admin", label: "Admin Panel", icon: Users },
    { id: "procurement", label: "Procurement", icon: ShoppingCart },
    { id: "reporting", label: "Reporting & Analytics", icon: BarChart3 },
    { id: "support", label: "Support/Help", icon: HelpCircle },
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground">Admin</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activePage === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
