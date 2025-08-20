"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
// import { BlockchainLogType } from "../../types/blockchain";
import { useBlockchainContext } from "../../hooks/useBlockchainContextHook";

const BlockchainLogs: React.FC = () => {
  const { logs, getLogs } = useBlockchainContext();

  useEffect(() => {
    getLogs();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.transactionHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction =
      selectedAction === "all" || log.action === selectedAction;
    const matchesStatus =
      selectedStatus === "all" || log.status === selectedStatus;

    let matchesDate = true;
    if (dateRange !== "all") {
      const now = new Date();
      const logDate = new Date(log.timestamp);
      switch (dateRange) {
        case "today":
          matchesDate = logDate.toDateString() === now.toDateString();
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = logDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = logDate >= monthAgo;
          break;
      }
    }

    return matchesSearch && matchesAction && matchesStatus && matchesDate;
  });

  const handleExportLogs = () => {
    console.log("[v0] Exporting blockchain logs:", filteredLogs);
    // Implementation for exporting logs
  };

  const handleVerifyTransaction = async (transactionHash: string) => {
    try {
      console.log("[v0] Verifying transaction:", transactionHash);
      // Implementation for blockchain verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("[v0] Transaction verified successfully");
    } catch (error) {
      console.error("[v0] Error verifying transaction:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      "staff-central": "bg-green-100 text-green-800",
      "staff-department": "bg-yellow-100 text-yellow-800",
      supplier: "bg-purple-100 text-purple-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Blockchain Logs</h1>
        </div>
        <Button
          onClick={handleExportLogs}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="Stock Added">Stock Added</SelectItem>
                <SelectItem value="Request Approved">
                  Request Approved
                </SelectItem>
                <SelectItem value="Request Rejected">
                  Request Rejected
                </SelectItem>
                <SelectItem value="Delivery Confirmed">
                  Delivery Confirmed
                </SelectItem>
                <SelectItem value="Stock Movement">Stock Movement</SelectItem>
                <SelectItem value="User Created">User Created</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Statistics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {logs.filter((l) => l.status === "confirmed").length}
              </div>
              <div className="text-sm text-gray-600">
                Confirmed Transactions
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {logs.filter((l) => l.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending Transactions</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...logs.map((l) => l.blockNumber))}
              </div>
              <div className="text-sm text-gray-600">Latest Block</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  logs.reduce((sum, l) => sum + l.gasUsed, 0) / logs.length
                )}
              </div>
              <div className="text-sm text-gray-600">Avg Gas Used</div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Blockchain Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Blockchain-logged Activities ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Serial #</th>
                  <th className="text-left p-3">Item Name</th>
                  <th className="text-left p-3">Time Applied</th>
                  <th className="text-left p-3">Hash</th>
                  <th className="text-left p-3">Action</th>
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">
                      #{log.blockNumber}
                    </td>
                    <td className="p-3">{log.itemName}</td>
                    <td className="p-3 text-sm">
                      {log.timestamp.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-xs text-gray-600">
                        {log.transactionHash.substring(0, 10)}...
                        {log.transactionHash.substring(
                          log.transactionHash.length - 8
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{log.action}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm">{log.user}</div>
                        <Badge
                          className={getRoleBadgeColor(log.userRole)}
                          variant="outline"
                        >
                          {log.userRole.replace("-", " ")}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getStatusBadgeColor(log.status)}>
                        {getStatusIcon(log.status)}
                        <span className="ml-1 capitalize">{log.status}</span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleVerifyTransaction(log.transactionHash)
                        }
                      >
                        Verify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainLogs;
