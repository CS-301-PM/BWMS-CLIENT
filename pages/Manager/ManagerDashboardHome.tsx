import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Badge } from "../../src/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  AlertTriangle,
} from "lucide-react";
// import { useOverviewContext } from "../../hooks/useOverviewContext";
import { useStockContext } from "../../hooks/useStockContext";

// const recentActivities = [
//   {
//     action: "Approved request REQ005",
//     user: "Manager",
//     timestamp: "2 hours ago",
//   },
//   {
//     action: "Rejected request REQ004",
//     user: "Manager",
//     timestamp: "4 hours ago",
//   },
//   {
//     action: "New stock added: Office Supplies",
//     user: "Staff",
//     timestamp: "6 hours ago",
//   },
// ];

export default function ManagerDashboardHome() {
  const { state } = useStockContext();
  const { approved, declined, pending, stocks } = state;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pending.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approved.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stocks.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {declined.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pending.map((request: any) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{request.item}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.department} • Qty: {request.quantity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {request.requestDate}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        request.priority === "High"
                          ? "destructive"
                          : request.priority === "Medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {request.priority}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700 bg-transparent"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
