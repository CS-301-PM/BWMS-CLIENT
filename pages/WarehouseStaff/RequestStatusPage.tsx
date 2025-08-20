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
import { Textarea } from "../../src/components/ui/textarea";
import { Search, Eye, CheckCircle, Clock, Package, MapPin } from "lucide-react";

interface ApprovedRequest {
	id: string;
	requestId: string;
	itemName: string;
	quantity: number;
	unit: string;
	requestedBy: string;
	department: string;
	approvedDate: Date;
	priority: "low" | "medium" | "high" | "urgent";
	status: "approved" | "in-preparation" | "ready-for-pickup" | "completed";
	currentLocation: string;
	availableStock: number;
	notes?: string;
	estimatedPreparationTime: number; // in hours
	assignedTo?: string;
}

const RequestStatusPage: React.FC = () => {
	const [requests, setRequests] = useState<ApprovedRequest[]>([
		{
			id: "1",
			requestId: "REQ-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 50,
			unit: "reams",
			requestedBy: "John Smith",
			department: "Administration",
			approvedDate: new Date("2024-03-15"),
			priority: "medium",
			status: "approved",
			currentLocation: "Warehouse A-1",
			availableStock: 150,
			estimatedPreparationTime: 2,
		},
		{
			id: "2",
			requestId: "REQ-2024-002",
			itemName: "Computer Equipment - Mouse",
			quantity: 10,
			unit: "units",
			requestedBy: "Sarah Johnson",
			department: "IT Department",
			approvedDate: new Date("2024-03-14"),
			priority: "low",
			status: "in-preparation",
			currentLocation: "IT Storage",
			availableStock: 25,
			estimatedPreparationTime: 1,
			assignedTo: "Warehouse Staff A",
		},
		{
			id: "3",
			requestId: "REQ-2024-003",
			itemName: "Medical Supplies - First Aid Kits",
			quantity: 15,
			unit: "kits",
			requestedBy: "Dr. Michael Brown",
			department: "Health & Safety",
			approvedDate: new Date("2024-03-13"),
			priority: "urgent",
			status: "ready-for-pickup",
			currentLocation: "Medical Storage",
			availableStock: 25,
			estimatedPreparationTime: 0.5,
			assignedTo: "Warehouse Staff B",
			notes: "Items prepared and ready for immediate pickup",
		},
		{
			id: "4",
			requestId: "REQ-2024-004",
			itemName: "Cleaning Supplies",
			quantity: 20,
			unit: "units",
			requestedBy: "Lisa Anderson",
			department: "Facilities",
			approvedDate: new Date("2024-03-12"),
			priority: "high",
			status: "completed",
			currentLocation: "Warehouse B-1",
			availableStock: 40,
			estimatedPreparationTime: 1,
			assignedTo: "Warehouse Staff C",
			notes: "Completed and delivered to department",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [selectedPriority, setSelectedPriority] = useState<string>("all");
	const [selectedRequest, setSelectedRequest] =
		useState<ApprovedRequest | null>(null);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
	const [processingNotes, setProcessingNotes] = useState("");

	const filteredRequests = requests.filter((request) => {
		const matchesSearch =
			request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			selectedStatus === "all" || request.status === selectedStatus;
		const matchesPriority =
			selectedPriority === "all" || request.priority === selectedPriority;
		return matchesSearch && matchesStatus && matchesPriority;
	});

	const handleUpdateStatus = async (
		requestId: string,
		newStatus: ApprovedRequest["status"]
	) => {
		try {
			const updatedRequests = requests.map((request) =>
				request.id === requestId
					? {
							...request,
							status: newStatus,
							assignedTo:
								newStatus === "in-preparation"
									? "Current Warehouse Staff"
									: request.assignedTo,
							notes: processingNotes || request.notes,
					  }
					: request
			);
			setRequests(updatedRequests);
			setProcessingNotes("");
			console.log("[v0] Request status updated:", requestId, newStatus);

			// Log to blockchain
			const blockchainLog = {
				action: "Request Processed",
				itemName: requests.find((r) => r.id === requestId)?.itemName,
				user: "warehouse001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
				details: {
					requestId: requests.find((r) => r.id === requestId)?.requestId,
					newStatus,
				},
			};
			console.log("[v0] Blockchain log:", blockchainLog);
		} catch (error) {
			console.error("[v0] Error updating request status:", error);
		}
	};

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			approved: "bg-blue-100 text-blue-800",
			"in-preparation": "bg-yellow-100 text-yellow-800",
			"ready-for-pickup": "bg-green-100 text-green-800",
			completed: "bg-gray-100 text-gray-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "approved":
				return <Clock className="h-4 w-4 text-blue-600" />;
			case "in-preparation":
				return <Package className="h-4 w-4 text-yellow-600" />;
			case "ready-for-pickup":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "completed":
				return <CheckCircle className="h-4 w-4 text-gray-600" />;
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
					<Package className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Process Approved Requests
					</h1>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{requests.filter((r) => r.status === "approved").length}
							</div>
							<div className="text-sm text-gray-600">Awaiting Processing</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-yellow-600">
								{requests.filter((r) => r.status === "in-preparation").length}
							</div>
							<div className="text-sm text-gray-600">In Preparation</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{requests.filter((r) => r.status === "ready-for-pickup").length}
							</div>
							<div className="text-sm text-gray-600">Ready for Pickup</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-600">
								{requests.filter((r) => r.status === "completed").length}
							</div>
							<div className="text-sm text-gray-600">Completed</div>
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
								<SelectItem value="approved">Approved</SelectItem>
								<SelectItem value="in-preparation">In Preparation</SelectItem>
								<SelectItem value="ready-for-pickup">
									Ready for Pickup
								</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
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
					<CardTitle>Approved Requests ({filteredRequests.length})</CardTitle>
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
									<th className="text-left p-3">Location</th>
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
													{request.status.replace("-", " ")}
												</span>
											</Badge>
										</td>
										<td className="p-3 text-sm">
											<div className="flex items-center space-x-1">
												<MapPin className="h-3 w-3 text-gray-400" />
												<span>{request.currentLocation}</span>
											</div>
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
												{request.status === "approved" && (
													<Button
														size="sm"
														className="bg-yellow-600 hover:bg-yellow-700 text-white"
														onClick={() =>
															handleUpdateStatus(request.id, "in-preparation")
														}
													>
														Start
													</Button>
												)}
												{request.status === "in-preparation" && (
													<Button
														size="sm"
														className="bg-green-600 hover:bg-green-700 text-white"
														onClick={() =>
															handleUpdateStatus(request.id, "ready-for-pickup")
														}
													>
														Ready
													</Button>
												)}
												{request.status === "ready-for-pickup" && (
													<Button
														size="sm"
														className="bg-gray-600 hover:bg-gray-700 text-white"
														onClick={() =>
															handleUpdateStatus(request.id, "completed")
														}
													>
														Complete
													</Button>
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
						<DialogTitle>Request Processing Details</DialogTitle>
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
												{selectedRequest.status.replace("-", " ")}
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
										Requested: {selectedRequest.quantity} {selectedRequest.unit}{" "}
										| Available: {selectedRequest.availableStock}{" "}
										{selectedRequest.unit}
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

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Current Location
									</label>
									<div className="flex items-center space-x-1">
										<MapPin className="h-4 w-4 text-gray-400" />
										<span>{selectedRequest.currentLocation}</span>
									</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Estimated Prep Time
									</label>
									<div>{selectedRequest.estimatedPreparationTime} hours</div>
								</div>
							</div>

							{selectedRequest.assignedTo && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Assigned To
									</label>
									<div>{selectedRequest.assignedTo}</div>
								</div>
							)}

							{selectedRequest.notes && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Notes
									</label>
									<div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
										{selectedRequest.notes}
									</div>
								</div>
							)}

							<div>
								<label className="text-sm font-medium text-gray-600">
									Processing Notes
								</label>
								<Textarea
									placeholder="Add notes about the processing status..."
									value={processingNotes}
									onChange={(e) => setProcessingNotes(e.target.value)}
									className="mt-1"
								/>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									onClick={() => setIsViewDialogOpen(false)}
								>
									Close
								</Button>
								{selectedRequest.status === "approved" && (
									<Button
										className="bg-yellow-600 hover:bg-yellow-700"
										onClick={() => {
											handleUpdateStatus(selectedRequest.id, "in-preparation");
											setIsViewDialogOpen(false);
										}}
									>
										Start Preparation
									</Button>
								)}
								{selectedRequest.status === "in-preparation" && (
									<Button
										className="bg-green-600 hover:bg-green-700"
										onClick={() => {
											handleUpdateStatus(
												selectedRequest.id,
												"ready-for-pickup"
											);
											setIsViewDialogOpen(false);
										}}
									>
										Mark Ready
									</Button>
								)}
								{selectedRequest.status === "ready-for-pickup" && (
									<Button
										className="bg-gray-600 hover:bg-gray-700"
										onClick={() => {
											handleUpdateStatus(selectedRequest.id, "completed");
											setIsViewDialogOpen(false);
										}}
									>
										Mark Completed
									</Button>
								)}
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RequestStatusPage;
