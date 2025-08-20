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
import { Textarea } from "../../src/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import {
	CheckCircle,
	XCircle,
	Clock,
	Search,
	Eye,
	FileText,
} from "lucide-react";

interface StockRequest {
	id: string;
	requestId: string;
	itemName: string;
	quantity: number;
	unit: string;
	requestedBy: string;
	department: string;
	requestDate: Date;
	priority: "low" | "medium" | "high" | "urgent";
	status: "pending" | "approved" | "rejected";
	reason: string;
	estimatedValue: number;
	currentStock: number;
	justification: string;
}

const RequestApproval: React.FC = () => {
	const [requests, setRequests] = useState<StockRequest[]>([
		{
			id: "1",
			requestId: "REQ-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 100,
			unit: "reams",
			requestedBy: "John Smith",
			department: "Administration",
			requestDate: new Date("2024-03-15"),
			priority: "medium",
			status: "pending",
			reason: "Monthly office supplies replenishment",
			estimatedValue: 250.0,
			currentStock: 15,
			justification: "Current stock running low, needed for daily operations",
		},
		{
			id: "2",
			requestId: "REQ-2024-002",
			itemName: "Computer Equipment - Laptops",
			quantity: 5,
			unit: "units",
			requestedBy: "Sarah Johnson",
			department: "IT Department",
			requestDate: new Date("2024-03-14"),
			priority: "high",
			status: "pending",
			reason: "New employee onboarding",
			estimatedValue: 7500.0,
			currentStock: 2,
			justification:
				"5 new employees joining next week, current laptops insufficient",
		},
		{
			id: "3",
			requestId: "REQ-2024-003",
			itemName: "Medical Supplies - First Aid Kits",
			quantity: 20,
			unit: "kits",
			requestedBy: "Dr. Michael Brown",
			department: "Health & Safety",
			requestDate: new Date("2024-03-13"),
			priority: "urgent",
			status: "pending",
			reason: "Safety compliance requirement",
			estimatedValue: 400.0,
			currentStock: 3,
			justification:
				"Mandatory safety equipment for all departments as per regulations",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedPriority, setSelectedPriority] = useState<string>("all");
	const [selectedStatus, setSelectedStatus] = useState<string>("pending");
	const [selectedRequest, setSelectedRequest] = useState<StockRequest | null>(
		null
	);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [approvalComment, setApprovalComment] = useState("");

	const filteredRequests = requests.filter((request) => {
		const matchesSearch =
			request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestId.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesPriority =
			selectedPriority === "all" || request.priority === selectedPriority;
		const matchesStatus =
			selectedStatus === "all" || request.status === selectedStatus;
		return matchesSearch && matchesPriority && matchesStatus;
	});

	const handleApproveRequest = async (requestId: string) => {
		try {
			const updatedRequests = requests.map((request) =>
				request.id === requestId
					? {
							...request,
							status: "approved" as const,
							approvalComment,
							approvedDate: new Date(),
					  }
					: request
			);
			setRequests(updatedRequests);
			setApprovalComment("");
			console.log("[v0] Request approved:", requestId);

			// Log to blockchain
			const blockchainLog = {
				action: "Request Approved",
				itemName: requests.find((r) => r.id === requestId)?.itemName,
				user: "manager001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
			};
			console.log("[v0] Blockchain log:", blockchainLog);
		} catch (error) {
			console.error("[v0] Error approving request:", error);
		}
	};

	const handleRejectRequest = async (requestId: string) => {
		try {
			const updatedRequests = requests.map((request) =>
				request.id === requestId
					? {
							...request,
							status: "rejected" as const,
							rejectionComment: approvalComment,
							rejectedDate: new Date(),
					  }
					: request
			);
			setRequests(updatedRequests);
			setApprovalComment("");
			console.log("[v0] Request rejected:", requestId);

			// Log to blockchain
			const blockchainLog = {
				action: "Request Rejected",
				itemName: requests.find((r) => r.id === requestId)?.itemName,
				user: "manager001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
			};
			console.log("[v0] Blockchain log:", blockchainLog);
		} catch (error) {
			console.error("[v0] Error rejecting request:", error);
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

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			pending: "bg-yellow-100 text-yellow-800",
			approved: "bg-green-100 text-green-800",
			rejected: "bg-red-100 text-red-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "approved":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "rejected":
				return <XCircle className="h-4 w-4 text-red-600" />;
			case "pending":
				return <Clock className="h-4 w-4 text-yellow-600" />;
			default:
				return <Clock className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<FileText className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">Request Approval</h1>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-600">
								{requests.filter((r) => r.status === "pending").length}
							</div>
							<div className="text-sm text-gray-600">Pending Requests</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{requests.filter((r) => r.status === "approved").length}
							</div>
							<div className="text-sm text-gray-600">Approved Today</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-red-600">
								{requests.filter((r) => r.priority === "urgent").length}
							</div>
							<div className="text-sm text-gray-600">Urgent Requests</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
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
						<Select value={selectedStatus} onValueChange={setSelectedStatus}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Requests Table */}
			<Card>
				<CardHeader>
					<CardTitle>Stock Requests ({filteredRequests.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Request ID</th>
									<th className="text-left p-3">Item Name</th>
									<th className="text-left p-3">Quantity</th>
									<th className="text-left p-3">Requested By</th>
									<th className="text-left p-3">Department</th>
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
										<td className="p-3">{request.requestedBy}</td>
										<td className="p-3 text-sm text-gray-600">
											{request.department}
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
											<div className="flex items-center space-x-2">
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
												{request.status === "pending" && (
													<>
														<Button
															size="sm"
															className="bg-green-600 hover:bg-green-700 text-white"
															onClick={() => handleApproveRequest(request.id)}
														>
															<CheckCircle className="h-3 w-3" />
														</Button>
														<Button
															size="sm"
															className="bg-red-600 hover:bg-red-700 text-white"
															onClick={() => handleRejectRequest(request.id)}
														>
															<XCircle className="h-3 w-3" />
														</Button>
													</>
												)}
											</div>
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
										| Current Stock: {selectedRequest.currentStock} | Estimated
										Value: ${selectedRequest.estimatedValue.toLocaleString()}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Requested By
									</label>
									<div>{selectedRequest.requestedBy}</div>
									<div className="text-sm text-gray-600">
										{selectedRequest.department}
									</div>
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
									Justification
								</label>
								<div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
									{selectedRequest.justification}
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

							{selectedRequest.status === "pending" && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Approval Comment
									</label>
									<Textarea
										placeholder="Add your comment for approval/rejection..."
										value={approvalComment}
										onChange={(e) => setApprovalComment(e.target.value)}
										className="mt-1"
									/>
								</div>
							)}

							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									onClick={() => setIsViewDialogOpen(false)}
								>
									Close
								</Button>
								{selectedRequest.status === "pending" && (
									<>
										<Button
											className="bg-red-600 hover:bg-red-700"
											onClick={() => {
												handleRejectRequest(selectedRequest.id);
												setIsViewDialogOpen(false);
											}}
										>
											<XCircle className="h-4 w-4 mr-2" />
											Reject
										</Button>
										<Button
											className="bg-green-600 hover:bg-green-700"
											onClick={() => {
												handleApproveRequest(selectedRequest.id);
												setIsViewDialogOpen(false);
											}}
										>
											<CheckCircle className="h-4 w-4 mr-2" />
											Approve
										</Button>
									</>
								)}
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RequestApproval;
