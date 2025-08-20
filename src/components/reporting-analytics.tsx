"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { BarChart3, PieChart, Download, FileText } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"

export function ReportingAnalytics() {
  // Mock data for reports
  const reports = [
    {
      serialNo: "RPT001",
      itemName: "Office Supplies Request",
      timeApproved: "2024-01-15 10:30",
      hash: "0x1a2b3c4d...",
      status: "Approved",
      fade: "Export",
    },
    {
      serialNo: "RPT002",
      itemName: "Equipment Purchase",
      timeApproved: "2024-01-15 11:45",
      hash: "0x5e6f7g8h...",
      status: "Pending",
      fade: "Export",
    },
    {
      serialNo: "RPT003",
      itemName: "Maintenance Supplies",
      timeApproved: "2024-01-15 14:20",
      hash: "0x9i0j1k2l...",
      status: "Declined",
      fade: "Export",
    },
  ]

  // Mock data for bar chart
  const barChartData = [
    { name: "Approved", value: 45 },
    { name: "Declined", value: 12 },
    { name: "Pending", value: 28 },
    { name: "Informed", value: 35 },
  ]

  // Mock data for pie chart
  const pieChartData = [
    { name: "Completed", value: 65, color: "#22c55e" },
    { name: "In Progress", value: 25, color: "#f59e0b" },
    { name: "Delayed", value: 10, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Reporting & Analytics</h2>
      </div>

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial #</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Time Approved</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.serialNo}>
                  <TableCell className="font-medium">{report.serialNo}</TableCell>
                  <TableCell>{report.itemName}</TableCell>
                  <TableCell>{report.timeApproved}</TableCell>
                  <TableCell className="font-mono text-xs">{report.hash}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        report.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                      <Download className="w-3 h-3" />
                      Export
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">See All</Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="space-y-4">
              <h4 className="font-medium">Request Status Overview</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="space-y-4">
              <h4 className="font-medium">Contract Performance</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Tooltip />
                    <RechartsPieChart data={pieChartData} cx="50%" cy="50%" outerRadius={80}>
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Analytics Controls */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="serialNo" className="text-sm font-medium">
                Serial #:
              </label>
              <Input id="serialNo" placeholder="Enter serial number" className="w-48" />
            </div>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline">See All</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
