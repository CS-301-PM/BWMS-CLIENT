import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, Package, Activity } from "lucide-react";
import { useBlockchainContext } from "../../hooks/useBlockchainContextHook";
import { useEffect } from "react";
import { useStockContext } from "../../hooks/useStockContext";

// const quickStatsData = [
//   {
//     serialNo: "CS001",
//     itemName: "Office Supplies",
//     value: "$2,500",
//     status: "Approved",
//   },
//   {
//     serialNo: "CS002",
//     itemName: "IT Equipment",
//     value: "$15,000",
//     status: "In Progress",
//   },
//   {
//     serialNo: "CS003",
//     itemName: "Furniture",
//     value: "$8,750",
//     status: "Declined",
//   },
// ];

// const notifications = [
//   "New stock request from Department A",
//   "Low inventory alert for Item #CS045",
//   "Delivery confirmation required",
//   "System maintenance scheduled",
// ];

// const blockchainLogs = [
//   { action: "Stock Added", user: "Admin", timestamp: "2024-01-15 10:30" },
//   {
//     action: "Request Approved",
//     user: "Manager",
//     timestamp: "2024-01-15 09:15",
//   },
//   {
//     action: "Delivery Confirmed",
//     user: "Supplier",
//     timestamp: "2024-01-15 08:45",
//   },
// ];

export default function AdminDashboardHome() {
  const { state } = useStockContext();
  const { approved, declined, pending } = state;
  const { logs, getLogs } = useBlockchainContext();

  useEffect(() => {
    getLogs();
  }, []);

  const contractStageData = [
    { name: "Approved", value: approved.length, color: "#22c55e" },
    { name: "Declined", value: declined.length, color: "#ef4444" },
    { name: "In Process", value: pending.length, color: "#f59e0b" },
    {
      name: "Informed",
      value: approved.length + pending.length,
      color: "#3b82f6",
    },
  ];

  const contractExpiringData = [
    { name: "Active", value: approved.length, color: "#22c55e" },
    { name: "Expiring Soon", value: pending.length, color: "#f59e0b" },
    { name: "Expired", value: declined.length, color: "#ef4444" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approved.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {declined.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Process</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pending.length}
            </div>
          </CardContent>
        </Card>
        {/* 
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{0}</div>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract by Stages Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Contract by Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={contractStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contract Expiring Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Contract Expiring</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={contractExpiringData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {contractExpiringData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notifications */}
        {/* <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-muted rounded"
                >
                  <Bell className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{String(notification)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blockchain/Ledger Log */}
        <Card>
          <CardHeader>
            <CardTitle>Blockchain/Ledger Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{log.action}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {log.user}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
