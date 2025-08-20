"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	FileText,
	Clock,
	CheckCircle,
	XCircle,
	Plus,
	TrendingUp,
} from "lucide-react";

interface RequestSummary {
	total: number;
	pending: number;
	approved: number;
	rejected: number;
	fulfilled: number;
}

interface RecentRequest {
	id: string;
	requestId: string;
	itemName: string;
	quantity: number;
	unit: string;
	status: "pending" | "approved" | "rejected" | "fulfilled";
	requestDate: Date;
	priority: "low" | "medium" | "high" | "urgent";
}

const DepartmentDashboard: React.FC = () => {
	const [summary] = useState<RequestSummary>({
		total: 15,
		pending: 3,
		approved: 8,
		rejected: 2,
		fulfilled: 2,
	});

	const [recentRequests] = useState<RecentRequest[]>([
		{
			id: "1",
			requestId: "REQ-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 50,
			unit: "reams",
			status: "approved",
			requestDate: new Date("2024-03-15"),
			priority: "medium",
		},
		{
			id: "2",
			requestId: "REQ-2024-002",
			itemName: "Computer Equipment - Mouse",
			quantity: 10,
			unit: "units",
			status: "pending",
			requestDate: new Date("2024-03-14"),
			priority: "low",
		},
		{
			id: "3",
			requestId: "REQ-2024-003",
			itemName: "Stationery - Pens",
			quantity: 100,
			unit: "pieces",
			status: "fulfilled",
			requestDate: new Date("2024-03-13"),
			priority: "medium",
		},
		{
			id: "4",
			requestId: "REQ-2024-004",
			itemName: "Printer Cartridges",
			quantity: 5,
			unit: "units",
			status: "rejected",
			requestDate: new Date("2024-03-12"),
			priority: "high",
		},
	]);

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			pending: "bg-yellow-100 text-yellow-800",
			approved: "bg-blue-100 text-blue-800",
			rejected: "bg-red-100 text-red-800",
			fulfilled: "bg-green-100 text-green-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "approved":
				return <CheckCircle className="h-4 w-4 text-blue-600" />;
			case "rejected":
				return <XCircle className="h-4 w-4 text-red-600" />;
			case "fulfilled":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "pending":
				return <Clock className="h-4 w-4 text-yellow-600" />;
			default:
				return <Clock className="h-4 w-4 text-gray-600" />;
		}
	};

	const getPriorityBadgeColor = (priority: string) => {
		const colors = {
			low: "bg-gray-100 text-gray-800",
			medium: "bg-blue-100 text-blue-800",
			high: "bg-orange-100 text-orange-800",
			urgent: "bg-red-100 text-red-800",
		};
		return (
			colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
		);
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<FileText className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Department Dashboard
					</h1>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700">
					<Plus className="h-4 w-4 mr-2" />
					New Request
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{summary.total}
							</div>
							<div className="text-sm text-gray-600">Total Requests</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-600">
								{summary.pending}
							</div>
							<div className="text-sm text-gray-600">Pending</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{summary.approved}
							</div>
							<div className="text-sm text-gray-600">Approved</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{summary.fulfilled}
							</div>
							<div className="text-sm text-gray-600">Fulfilled</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-red-600">
								{summary.rejected}
							</div>
							<div className="text-sm text-gray-600">Rejected</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
						>
							<Plus className="h-6 w-6" />
							<span>Submit New Request</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
						>
							<Clock className="h-6 w-6" />
							<span>View Pending Requests</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
						>
							<TrendingUp className="h-6 w-6" />
							<span>Track Request History</span>
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Recent Requests */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Requests</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentRequests.map((request) => (
							<div
								key={request.id}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
							>
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										{getStatusIcon(request.status)}
									</div>
									<div>
										<div className="font-semibold">{request.itemName}</div>
										<div className="text-sm text-gray-600">
											{request.quantity} {request.unit} • {request.requestId}
										</div>
										<div className="text-xs text-gray-500">
											{request.requestDate.toLocaleDateString()}
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Badge className={getPriorityBadgeColor(request.priority)}>
										{request.priority.toUpperCase()}
									</Badge>
									<Badge className={getStatusBadgeColor(request.status)}>
										{request.status.replace("-", " ").toUpperCase()}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Request Status Overview */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Request Status Distribution</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
									<span className="text-sm">Pending</span>
								</div>
								<div className="text-sm font-semibold">{summary.pending}</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									<span className="text-sm">Approved</span>
								</div>
								<div className="text-sm font-semibold">{summary.approved}</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span className="text-sm">Fulfilled</span>
								</div>
								<div className="text-sm font-semibold">{summary.fulfilled}</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-red-500 rounded-full"></div>
									<span className="text-sm">Rejected</span>
								</div>
								<div className="text-sm font-semibold">{summary.rejected}</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Monthly Request Trend</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-center py-8">
							<div className="text-3xl font-bold text-green-600">+23%</div>
							<div className="text-sm text-gray-600">
								Increase from last month
							</div>
							<div className="mt-4 text-xs text-gray-500">
								Your department has been more active in requesting supplies this
								month
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DepartmentDashboard;
