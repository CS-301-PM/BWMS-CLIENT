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
	Truck,
	Clock,
	CheckCircle,
	AlertCircle,
	Package,
} from "lucide-react";

interface DeliveryTracking {
	id: string;
	deliveryId: string;
	itemName: string;
	quantity: number;
	unit: string;
	submittedDate: Date;
	deliveryDate: Date;
	status: "pending" | "in-transit" | "delivered" | "delayed" | "rejected";
	trackingNumber: string;
	recipientName: string;
	deliveryLocation: string;
	value: number;
	feedback?: string;
	rejectionReason?: string;
	confirmationDate?: Date;
}

const IssueFeedbackPanelPage: React.FC = () => {
	const [deliveries, setDeliveries] = useState<DeliveryTracking[]>([
		{
			id: "1",
			deliveryId: "DEL-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 100,
			unit: "reams",
			submittedDate: new Date("2024-03-14"),
			deliveryDate: new Date("2024-03-15"),
			status: "delivered",
			trackingNumber: "TRK123456789",
			recipientName: "John Smith",
			deliveryLocation: "Warehouse A - Main Entrance",
			value: 250.0,
			feedback: "Delivery completed successfully. All items in good condition.",
			confirmationDate: new Date("2024-03-15"),
		},
		{
			id: "2",
			deliveryId: "DEL-2024-002",
			itemName: "Computer Equipment - Laptops",
			quantity: 10,
			unit: "units",
			submittedDate: new Date("2024-03-15"),
			deliveryDate: new Date("2024-03-16"),
			status: "in-transit",
			trackingNumber: "TRK987654321",
			recipientName: "Sarah Johnson",
			deliveryLocation: "IT Storage - Building C",
			value: 15000.0,
		},
		{
			id: "3",
			deliveryId: "DEL-2024-003",
			itemName: "Medical Supplies - First Aid Kits",
			quantity: 50,
			unit: "kits",
			submittedDate: new Date("2024-03-16"),
			deliveryDate: new Date("2024-03-18"),
			status: "delayed",
			trackingNumber: "TRK456789123",
			recipientName: "Dr. Michael Brown",
			deliveryLocation: "Storage Room - Medical",
			value: 1000.0,
			feedback:
				"Delivery delayed due to weather conditions. Expected arrival tomorrow.",
		},
		{
			id: "4",
			deliveryId: "DEL-2024-004",
			itemName: "Furniture - Office Chairs",
			quantity: 20,
			unit: "units",
			submittedDate: new Date("2024-03-17"),
			deliveryDate: new Date("2024-03-20"),
			status: "pending",
			trackingNumber: "TRK789123456",
			recipientName: "Mike Wilson",
			deliveryLocation: "Warehouse B - Loading Dock",
			value: 3000.0,
		},
		{
			id: "5",
			deliveryId: "DEL-2024-005",
			itemName: "Cleaning Supplies",
			quantity: 30,
			unit: "units",
			submittedDate: new Date("2024-03-18"),
			deliveryDate: new Date("2024-03-19"),
			status: "rejected",
			trackingNumber: "TRK321654987",
			recipientName: "Lisa Anderson",
			deliveryLocation: "Warehouse A - Main Entrance",
			value: 150.0,
			rejectionReason:
				"Items did not match the specifications in the purchase order.",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [selectedDelivery, setSelectedDelivery] =
		useState<DeliveryTracking | null>(null);
	const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

	const filteredDeliveries = deliveries.filter((delivery) => {
		const matchesSearch =
			delivery.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			delivery.deliveryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			delivery.trackingNumber
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			delivery.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			selectedStatus === "all" || delivery.status === selectedStatus;
		return matchesSearch && matchesStatus;
	});

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			pending: "bg-gray-100 text-gray-800",
			"in-transit": "bg-blue-100 text-blue-800",
			delivered: "bg-green-100 text-green-800",
			delayed: "bg-yellow-100 text-yellow-800",
			rejected: "bg-red-100 text-red-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "delivered":
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case "in-transit":
				return <Truck className="h-4 w-4 text-blue-600" />;
			case "delayed":
				return <AlertCircle className="h-4 w-4 text-yellow-600" />;
			case "rejected":
				return <AlertCircle className="h-4 w-4 text-red-600" />;
			case "pending":
				return <Clock className="h-4 w-4 text-gray-600" />;
			default:
				return <Package className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Truck className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">Track Deliveries</h1>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{deliveries.length}
							</div>
							<div className="text-sm text-gray-600">Total Submitted</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-600">
								{deliveries.filter((d) => d.status === "pending").length}
							</div>
							<div className="text-sm text-gray-600">Pending</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{deliveries.filter((d) => d.status === "in-transit").length}
							</div>
							<div className="text-sm text-gray-600">In Transit</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{deliveries.filter((d) => d.status === "delivered").length}
							</div>
							<div className="text-sm text-gray-600">Delivered</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">
								$
								{deliveries
									.reduce((sum, d) => sum + d.value, 0)
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search deliveries..."
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
								<SelectItem value="in-transit">In Transit</SelectItem>
								<SelectItem value="delivered">Delivered</SelectItem>
								<SelectItem value="delayed">Delayed</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Deliveries Table */}
			<Card>
				<CardHeader>
					<CardTitle>
						Submitted Deliveries ({filteredDeliveries.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Delivery ID</th>
									<th className="text-left p-3">Item Name</th>
									<th className="text-left p-3">Quantity</th>
									<th className="text-left p-3">Tracking Number</th>
									<th className="text-left p-3">Recipient</th>
									<th className="text-left p-3">Delivery Date</th>
									<th className="text-left p-3">Status</th>
									<th className="text-left p-3">Value</th>
									<th className="text-left p-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredDeliveries.map((delivery) => (
									<tr key={delivery.id} className="border-b hover:bg-gray-50">
										<td className="p-3 font-mono text-sm">
											{delivery.deliveryId}
										</td>
										<td className="p-3">{delivery.itemName}</td>
										<td className="p-3">
											{delivery.quantity} {delivery.unit}
										</td>
										<td className="p-3 font-mono text-sm">
											{delivery.trackingNumber}
										</td>
										<td className="p-3">{delivery.recipientName}</td>
										<td className="p-3 text-sm">
											{delivery.deliveryDate.toLocaleDateString()}
										</td>
										<td className="p-3">
											<Badge className={getStatusBadgeColor(delivery.status)}>
												{getStatusIcon(delivery.status)}
												<span className="ml-1 capitalize">
													{delivery.status.replace("-", " ")}
												</span>
											</Badge>
										</td>
										<td className="p-3 font-semibold">
											${delivery.value.toLocaleString()}
										</td>
										<td className="p-3">
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													setSelectedDelivery(delivery);
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

			{/* View Delivery Dialog */}
			<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Delivery Tracking Details</DialogTitle>
					</DialogHeader>
					{selectedDelivery && (
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Delivery ID
									</label>
									<div className="font-mono">{selectedDelivery.deliveryId}</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Status
									</label>
									<div>
										<Badge
											className={getStatusBadgeColor(selectedDelivery.status)}
										>
											{getStatusIcon(selectedDelivery.status)}
											<span className="ml-1 capitalize">
												{selectedDelivery.status.replace("-", " ")}
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
										{selectedDelivery.itemName}
									</div>
									<div className="text-sm text-gray-600">
										Quantity: {selectedDelivery.quantity}{" "}
										{selectedDelivery.unit} | Value: $
										{selectedDelivery.value.toLocaleString()}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Tracking Number
									</label>
									<div className="font-mono">
										{selectedDelivery.trackingNumber}
									</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Recipient
									</label>
									<div>{selectedDelivery.recipientName}</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="text-sm font-medium text-gray-600">
										Submitted Date
									</label>
									<div>
										{selectedDelivery.submittedDate.toLocaleDateString()}
									</div>
								</div>
								<div>
									<label className="text-sm font-medium text-gray-600">
										Delivery Date
									</label>
									<div>
										{selectedDelivery.deliveryDate.toLocaleDateString()}
									</div>
								</div>
							</div>

							<div>
								<label className="text-sm font-medium text-gray-600">
									Delivery Location
								</label>
								<div>{selectedDelivery.deliveryLocation}</div>
							</div>

							{selectedDelivery.feedback && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Feedback
									</label>
									<div className="mt-1 p-3 bg-blue-50 rounded-lg text-sm">
										{selectedDelivery.feedback}
									</div>
								</div>
							)}

							{selectedDelivery.rejectionReason && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Rejection Reason
									</label>
									<div className="mt-1 p-3 bg-red-50 rounded-lg text-sm">
										{selectedDelivery.rejectionReason}
									</div>
								</div>
							)}

							{selectedDelivery.confirmationDate && (
								<div>
									<label className="text-sm font-medium text-gray-600">
										Confirmation Date
									</label>
									<div>
										{selectedDelivery.confirmationDate.toLocaleDateString()}
									</div>
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

export default IssueFeedbackPanelPage;
