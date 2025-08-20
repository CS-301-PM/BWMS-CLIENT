"use client";

import { Button } from "../../src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import {
  Plus,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from "lucide-react";

type WarehouseStaffPage =
  | "dashboard"
  | "add-stock"
  | "move-stock"
  | "requests"
  | "alerts";

interface WarehouseDashboardProps {
  onNavigate?: (page: WarehouseStaffPage) => void;
}

const WarehouseDashboard = ({ onNavigate }: WarehouseDashboardProps) => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            CBU Central Stores Management
          </h1>
          <p className="text-muted-foreground">Warehouse Staff Dashboard</p>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" onClick={() => onNavigate?.("add-stock")}>
            <Plus className="h-5 w-5 mr-2" />
            Add Stock
          </Button>
          <Button variant="outline" onClick={() => onNavigate?.("move-stock")}>
            <ArrowRight className="h-5 w-5 mr-2" />
            Move Stock
          </Button>
          <Button variant="outline" onClick={() => onNavigate?.("alerts")}>
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Damage
          </Button>
          <Button variant="outline" onClick={() => onNavigate?.("requests")}>
            <CheckCircle className="h-5 w-5 mr-2" />
            Process Requests
          </Button>
        </CardContent>
      </Card>

      {/* Example Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Items" value={1247} icon={<Plus />} />
        <StatCard title="Low Stock" value={23} icon={<AlertTriangle />} />
        <StatCard title="Damaged" value={5} icon={<AlertTriangle />} />
        <StatCard
          title="Pending Requests"
          value={12}
          icon={<AlertTriangle />}
        />
        <StatCard title="Completed Today" value={8} icon={<CheckCircle />} />
        <StatCard title="Locations" value={15} icon={<MapPin />} />
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon}
    </CardContent>
  </Card>
);

export default WarehouseDashboard;
