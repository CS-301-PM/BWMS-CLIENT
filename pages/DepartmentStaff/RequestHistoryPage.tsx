"use client";

import type React from "react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { Badge } from "../../src/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../../src/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import {
	Search,
	Eye,
	FileText,
	Clock,
	CheckCircle,
	XCircle,
	Download,
} from "lucide-react";

interface StockRequest {
	id: string;
	requestId: string;
	itemName: string;
	quantity: number;
	unit: string;
	requestDate: Date;
	priority: "low" | "medium" | "high" | "urgent";
	status: "pending" | "approved" | "rejected" | "fulfilled";
	reason: string;
	estimatedValue: number;
	approvedBy?: string;
	approvedDate?: Date;
	rejectedBy?: string;
	rejectedDate?: Date;
	rejectionReason?: string;
	fulfilledDate?: Date;
	notes?: string;
}

const RequestHistoryPage: React.FC = () => {
	const [requests, setRequests] = useState<StockRequest[]>([
		{
			id: "1",
			requestId: "REQ-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 50,
			unit: "reams",
			requestDate: new Date("2024-03-15"),
			priority: "medium",
			status: "fulfilled",
			reason: "Monthly office supplies replenishment",
			estimatedValue: 125.0,
			approvedBy: "Manager Smith",
			approvedDate: new Date("2024-03-16"),
			fulfilledDate: new Date("2024-03-18"),
			notes: "Delivered to department storage room",
		},
		{
			id: "2",
			requestId: "REQ-2024-002",
			itemName: "Computer Equipment - Mouse",
			quantity: 10,
			unit: "units",
			requestDate: new Date("2024-03-14"),
			priority: "low",
			status: "approved",
			reason: "Replacement for faulty mice",
			estimatedValue: 200.0,
			approvedBy: "Manager Johnson",
			approvedDate: new Date("2024-03-15"),
		},
		{
			id: "3",
			requestId: "REQ-2024-003",
			itemName: "Stationery - Pens",
			quantity: 100,
			unit: "pieces",
			requestDate: new Date("2024-03-13"),
			priority: "medium",
			status: "fulfilled",
			reason: "Staff stationery needs",
			estimatedValue: 50.0,
			approvedBy: "Manager Smith",
			approvedDate: new Date("2024-03-14"),
			fulfilledDate: new Date("2024-03-16"),
		},
		{
			id: "4",
			requestId: "REQ-2024-004",
			itemName: "Printer Cartridges",
			quantity: 5,
			unit: "units",
			requestDate: new Date("2024-03-12"),
			priority: "high",
			status: "rejected",
			reason: "Printer maintenance required",
			estimatedValue: 300.0,
			rejectedBy: "Manager Johnson",
			rejectedDate: new Date("2024-03-13"),
			rejectionReason: "Budget constraints for this quarter",
		},
		{
			id: "5",
			requestId: "REQ-2024-005",
			itemName: "Cleaning Supplies",
			quantity: 20,
			unit: "units",
			requestDate: new Date("2024-03-11"),
			priority: "urgent",
			status: "pending",
			reason: "Health and safety compliance",
			estimatedValue: 150.0,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [selectedPriority, setSelectedPriority] = useState<string>("all");
	const [selectedRequest, setSelectedRequest] = useState<StockRequest | null>(
		null
	);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

	const filteredRequests = requests.filter((request) => {
		const matchesSearch =
			request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.reason.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			selectedStatus === "all" || request.status === selectedStatus;
		const matchesPriority =
			selectedPriority === "all" || request.priority === selectedPriority;
		return matchesSearch && matchesStatus && matchesPriority;
	});

	const handleExportHistory = () => {
		console.log("[v0] Exporting request history:", filteredRequests);
		// Implementation for exporting request history
	};

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
					<h1 className="text-3xl font-bold text-gray-900">Request History</h1>
				</div>
				<Button
					onClick={handleExportHistory}
					className="bg-blue-600 hover:bg-blue-700"
				>
					<Download className="h-4 w-4 mr-2" />
					Export History
				</Button>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{requests.length}
							</div>
							<div className="text-sm text-gray-600">Total Requests</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{requests.filter((r) => r.status === "fulfilled").length}
							</div>
							<div className="text-sm text-gray-600">Fulfilled</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-600">
								{requests.filter((r) => r.status === "pending").length}
							</div>
							<div className="text-sm text-gray-600">Pending</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">
								$
								{requests
									.reduce((sum, r) => sum + r.estimatedValue, 0)
									.toLocaleString()}
							</div>
							<div className="text-sm text-gray-600">Total Value</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="pt-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search requests..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={selectedStatus} onValueChange={setSelectedStatus}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
								<SelectItem value="fulfilled">Fulfilled</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={selectedPriority}
							onValueChange={setSelectedPriority}
						>
							<SelectTrigger>
								<SelectValue placeholder="Filter by priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Priorities</SelectItem>
								<SelectItem value="urgent">Urgent</SelectItem>
								<SelectItem value="high">High</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="low">Low</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Requests Table */}
			<Card>
				<CardHeader>
					<CardTitle>Request History ({filteredRequests.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Request ID</th>
									<th className="text-left p-3">Item Name</th>
									<th className="text-left p-3">Quantity</th>
									<th className="text-left p-3">Request Date</th>
									<th className="text-left p-3">Priority</th>
									<th className="text-left p-3">Status</th>
									<th className="text-left p-3">Value</th>
									<th className="text-left p-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredRequests.map((request) => (
									<tr key={request.id} className="border-b hover:bg-gray-50">
										<td className="p-3 font-mono text-sm">
											{request.requestId}
										</td>
										<td className="p-3">{request.itemName}</td>
										<td className="p-3">
											{request.quantity} {request.unit}
										</td>
										<td className="p-3 text-sm">
											{request.requestDate.toLocaleDateString()}
										</td>
										<td className="p-3">
											<Badge
												className={getPriorityBadgeColor(request.priority)}
											>
												{request.priority.toUpperCase()}
											</Badge>
										</td>
										<td className="p-3">
											<Badge className={getStatusBadgeColor(request.status)}>
												{getStatusIcon(request.status)}
												<span className="ml-1 capitalize">
													{request.status}
												</span>
											</Badge>
										</td>
										<td className="p-3 font-semibold">
											${request.estimatedValue.toLocaleString()}
										</td>
										<td className="p-3">
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													setSelectedRequest(request);
													setIsViewDialogOpen(true);
												}}
											>
												<Eye className="h-3 w-3" />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* View Request Dialog */}
			<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Request Details</DialogTitle>
					</DialogHeader>
					{selectedRequest && (
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Request ID
									</label>
									<div className="font-mono">{selectedRequest.requestId}</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Status
									</label>
									<div>
										<Badge
											className={getStatusBadgeColor(selectedRequest.status)}
										>
											{getStatusIcon(selectedRequest.status)}
											<span className="ml-1 capitalize">
												{selectedRequest.status}
											</span>
										</Badge>
									</div>
								</div>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-600">
									Item Details
								</label>
								<div className="mt-1">
									<div className="font-semibold">
										{selectedRequest.itemName}
									</div>
									<div className="text-sm text-gray-600">
										Quantity: {selectedRequest.quantity} {selectedRequest.unit}{" "}
										| Estimated Value: $
										{selectedRequest.estimatedValue.toLocaleString()}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Request Date
									</label>
									<div>{selectedRequest.requestDate.toLocaleDateString()}</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Priority
									</label>
									<div>
										<Badge
											className={getPriorityBadgeColor(
												selectedRequest.priority
											)}
										>
											{selectedRequest.priority.toUpperCase()}
										</Badge>
									</div>
								</div>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-600">
									Reason
								</label>
								<div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
									{selectedRequest.reason}
								</div>
							</div>

							{selectedRequest.status === "approved" &&
								selectedRequest.approvedBy && (
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-gray-600">
												Approved By
											</label>
											<div>{selectedRequest.approvedBy}</div>
										</div>
										<div>
											<label className="text-sm font-medium text-gray-600">
												Approved Date
											</label>
											<div>
												{selectedRequest.approvedDate?.toLocaleDateString()}
											</div>
										</div>
									</div>
								)}

							{selectedRequest.status === "rejected" &&
								selectedRequest.rejectedBy && (
									<div>
										<div className="grid grid-cols-2 gap-4 mb-2">
											<div>
												<label className="text-sm font-medium text-gray-600">
													Rejected By
												</label>
												<div>{selectedRequest.rejectedBy}</div>
											</div>
											<div>
												<label className="text-sm font-medium text-gray-600">
													Rejected Date
												</label>
												<div>
													{selectedRequest.rejectedDate?.toLocaleDateString()}
												</div>
											</div>
										</div>
										{selectedRequest.rejectionReason && (
											<div>
												<label className="text-sm font-medium text-gray-600">
													Rejection Reason
												</label>
												<div className="mt-1 p-3 bg-red-50 rounded-lg text-sm">
													{selectedRequest.rejectionReason}
												</div>
											</div>
										)}
									</div>
								)}

							{selectedRequest.status === "fulfilled" &&
								selectedRequest.fulfilledDate && (
									<div>
										<label className="text-sm font-medium text-gray-600">
											Fulfilled Date
										</label>
										<div>
											{selectedRequest.fulfilledDate.toLocaleDateString()}
										</div>
										{selectedRequest.notes && (
											<div className="mt-2">
												<label className="text-sm font-medium text-gray-600">
													Notes
												</label>
												<div className="mt-1 p-3 bg-green-50 rounded-lg text-sm">
													{selectedRequest.notes}
												</div>
											</div>
										)}
									</div>
								)}

							<div className="flex justify-end">
								<Button
									variant="outline"
									onClick={() => setIsViewDialogOpen(false)}
								>
									Close
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RequestHistoryPage;
