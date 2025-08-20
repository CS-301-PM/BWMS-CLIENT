"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	LayoutDashboard,
	AlertCircle,
	CheckCircle,
	Clock,
	Bell,
	BarChart3,
	PieChart,
	Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import type {
	DashboardStats,
	StockRequest,
	BlockchainLog,
	Notification,
	ContractStage,
} from "../../types";

export function DashboardHome() {
	const [stats] = useState<DashboardStats>({
		approved: 8345,
		declined: 1234,
		inProcess: 543,
		totalUsers: 156,
		totalStockItems: 2847,
		pendingRequests: 23,
		contractsExpiring: 12,
	});

	const [quickStats] = useState<StockRequest[]>([
		{
			id: "1",
			serialNumber: "REQ-001",
			itemName: "Office Supplies",
			value: 250.0,
			status: "Approved",
			requestedBy: "dept-001",
			requestedByName: "John Doe",
			department: "IT",
			unit: "pcs",
			weight: 5.2,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: "2",
			serialNumber: "REQ-002",
			itemName: "Cleaning Materials",
			value: 180.5,
			status: "Declined",
			requestedBy: "dept-002",
			requestedByName: "Jane Smith",
			department: "Maintenance",
			unit: "liters",
			weight: 12.8,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: "3",
			serialNumber: "REQ-003",
			itemName: "Computer Equipment",
			value: 1200.0,
			status: "In Process",
			requestedBy: "dept-003",
			requestedByName: "Mike Johnson",
			department: "HR",
			unit: "units",
			weight: 8.5,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	]);

	const [notifications] = useState<Notification[]>([
		{
			id: "1",
			title: "New Stock Request",
			message: "REQ-004 submitted by Finance Department",
			type: "info",
			read: false,
			createdAt: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Low Stock Alert",
			message: "Office paper running low (5 units remaining)",
			type: "warning",
			read: false,
			createdAt: new Date().toISOString(),
		},
		{
			id: "3",
			title: "Delivery Confirmed",
			message: "DEL-123 from Supplier ABC confirmed",
			type: "success",
			read: true,
			createdAt: new Date().toISOString(),
		},
	]);

	const [blockchainLogs] = useState<BlockchainLog[]>([
		{
			id: "1",
			serialNumber: "BLK-001",
			itemName: "Office Supplies",
			timeApplied: new Date().toISOString(),
			hash: "0x1a2b3c4d5e6f...",
			action: "Approved",
			user: "Admin User",
			userId: "admin-001",
			transactionId: "tx-001",
		},
		{
			id: "2",
			serialNumber: "BLK-002",
			itemName: "Cleaning Materials",
			timeApplied: new Date().toISOString(),
			hash: "0x2b3c4d5e6f7a...",
			action: "Declined",
			user: "Manager User",
			userId: "mgr-001",
			transactionId: "tx-002",
		},
	]);

	const [contractStages] = useState<ContractStage[]>([
		{ stage: "Approved", count: 8345, percentage: 65 },
		{ stage: "Declined", count: 1234, percentage: 10 },
		{ stage: "In Process", count: 543, percentage: 15 },
		{ stage: "Informed", count: 1278, percentage: 10 },
	]);

	const fetchDashboardStats = async () => {
		try {
			// Replace with actual API call
			// const response = await fetch('/api/dashboard/stats')
			// const data = await response.json()
			// setStats(data)
			console.log("[v0] Fetching dashboard stats from API");
		} catch (error) {
			console.error("[v0] Error fetching dashboard stats:", error);
		}
	};

	const fetchQuickStats = async () => {
		try {
			// Replace with actual API call
			// const response = await fetch('/api/requests/recent')
			// const data = await response.json()
			// setQuickStats(data)
			console.log("[v0] Fetching quick stats from API");
		} catch (error) {
			console.error("[v0] Error fetching quick stats:", error);
		}
	};

	const fetchNotifications = async () => {
		try {
			// Replace with actual API call
			// const response = await fetch('/api/notifications')
			// const data = await response.json()
			// setNotifications(data)
			console.log("[v0] Fetching notifications from API");
		} catch (error) {
			console.error("[v0] Error fetching notifications:", error);
		}
	};

	const fetchBlockchainLogs = async () => {
		try {
			// Replace with actual API call
			// const response = await fetch('/api/blockchain/logs')
			// const data = await response.json()
			// setBlockchainLogs(data)
			console.log("[v0] Fetching blockchain logs from API");
		} catch (error) {
			console.error("[v0] Error fetching blockchain logs:", error);
		}
	};

	useEffect(() => {
		fetchDashboardStats();
		fetchQuickStats();
		fetchNotifications();
		fetchBlockchainLogs();
	}, []);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "Approved":
				return (
					<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
						Approved
					</Badge>
				);
			case "Declined":
				return (
					<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
						Declined
					</Badge>
				);
			case "In Process":
				return (
					<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
						In Process
					</Badge>
				);
			case "Pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
						Pending
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<LayoutDashboard className="w-6 h-6" />
				<h2 className="text-2xl font-bold">Dashboard</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Approved
								</p>
								<p className="text-3xl font-bold text-green-600">
									{stats.approved.toLocaleString()}
								</p>
							</div>
							<CheckCircle className="w-8 h-8 text-green-600" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Declined
								</p>
								<p className="text-3xl font-bold text-red-600">
									{stats.declined.toLocaleString()}
								</p>
							</div>
							<AlertCircle className="w-8 h-8 text-red-600" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									In Process
								</p>
								<p className="text-3xl font-bold text-blue-600">
									{stats.inProcess.toLocaleString()}
								</p>
							</div>
							<Clock className="w-8 h-8 text-blue-600" />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="w-5 h-5" />
							Contract by Stages
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{contractStages.map((stage) => (
								<div key={stage.stage} className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>{stage.stage}</span>
										<span>{stage.count.toLocaleString()}</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className={`h-2 rounded-full ${
												stage.stage === "Approved"
													? "bg-green-500"
													: stage.stage === "Declined"
													? "bg-red-500"
													: stage.stage === "In Process"
													? "bg-blue-500"
													: "bg-yellow-500"
											}`}
											style={{ width: `${stage.percentage}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<PieChart className="w-5 h-5" />
							Contract Expiring
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center h-48">
							<div className="relative">
								<div className="w-32 h-32 rounded-full border-8 border-red-200 border-t-red-500 animate-pulse" />
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center">
										<p className="text-2xl font-bold text-red-600">
											{stats.contractsExpiring}
										</p>
										<p className="text-xs text-muted-foreground">Expiring</p>
									</div>
								</div>
							</div>
						</div>
						<div className="text-center mt-4">
							<Button variant="outline" size="sm">
								<Filter className="w-4 h-4 mr-2" />
								Export
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Quick Stats (View)</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Serial #</TableHead>
									<TableHead>Item Name</TableHead>
									<TableHead>Value</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{quickStats.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											{item.serialNumber}
										</TableCell>
										<TableCell>{item.itemName}</TableCell>
										<TableCell>${item.value.toFixed(2)}</TableCell>
										<TableCell>{getStatusBadge(item.status)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bell className="w-5 h-5" />
							Notifications
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{notifications.map((notification) => (
								<div
									key={notification.id}
									className="flex items-start gap-3 p-3 rounded-lg border"
								>
									<div
										className={`w-2 h-2 rounded-full mt-2 ${
											notification.type === "success"
												? "bg-green-500"
												: notification.type === "warning"
												? "bg-yellow-500"
												: notification.type === "error"
												? "bg-red-500"
												: "bg-blue-500"
										}`}
									/>
									<div className="flex-1">
										<p className="text-sm font-medium">{notification.title}</p>
										<p className="text-xs text-muted-foreground">
											{notification.message}
										</p>
									</div>
									{!notification.read && (
										<div className="w-2 h-2 bg-blue-500 rounded-full" />
									)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Blockchain/Ledger Log</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Serial #</TableHead>
								<TableHead>Item Name</TableHead>
								<TableHead>Time Applied</TableHead>
								<TableHead>Hash</TableHead>
								<TableHead>Action</TableHead>
								<TableHead>User</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{blockchainLogs.map((log) => (
								<TableRow key={log.id}>
									<TableCell className="font-medium">
										{log.serialNumber}
									</TableCell>
									<TableCell>{log.itemName}</TableCell>
									<TableCell>
										{new Date(log.timeApplied).toLocaleString()}
									</TableCell>
									<TableCell className="font-mono text-xs">
										{log.hash}
									</TableCell>
									<TableCell>{getStatusBadge(log.action)}</TableCell>
									<TableCell>{log.user}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
