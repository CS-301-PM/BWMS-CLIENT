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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import {
	Truck,
	Search,
	CheckCircle,
	Clock,
	AlertCircle,
	Package,
} from "lucide-react";

interface Delivery {
	id: string;
	deliveryId: string;
	supplierName: string;
	itemName: string;
	quantity: number;
	unit: string;
	deliveryDate: Date;
	expectedDate: Date;
	status: "pending" | "in-transit" | "delivered" | "delayed" | "cancelled";
	trackingNumber: string;
	receivedBy?: string;
	notes?: string;
	value: number;
}

const DeliveryOversight: React.FC = () => {
	const [deliveries, setDeliveries] = useState<Delivery[]>([
		{
			id: "1",
			deliveryId: "DEL-2024-001",
			supplierName: "Office Depot",
			itemName: "Office Supplies - A4 Paper",
			quantity: 100,
			unit: "reams",
			deliveryDate: new Date("2024-03-15"),
			expectedDate: new Date("2024-03-15"),
			status: "delivered",
			trackingNumber: "OD123456789",
			receivedBy: "John Smith",
			notes: "Delivered in good condition",
			value: 250.0,
		},
		{
			id: "2",
			deliveryId: "DEL-2024-002",
			supplierName: "Tech Solutions",
			itemName: "Computer Equipment - Laptops",
			quantity: 10,
			unit: "units",
			deliveryDate: new Date("2024-03-16"),
			expectedDate: new Date("2024-03-16"),
			status: "in-transit",
			trackingNumber: "TS987654321",
			value: 15000.0,
		},
		{
			id: "3",
			deliveryId: "DEL-2024-003",
			supplierName: "MedSupply Co",
			itemName: "Medical Supplies - First Aid Kits",
			quantity: 50,
			unit: "kits",
			deliveryDate: new Date("2024-03-18"),
			expectedDate: new Date("2024-03-17"),
			status: "delayed",
			trackingNumber: "MS456789123",
			notes: "Delayed due to weather conditions",
			value: 1000.0,
		},
		{
			id: "4",
			deliveryId: "DEL-2024-004",
			supplierName: "Furniture Plus",
			itemName: "Furniture - Office Chairs",
			quantity: 20,
			unit: "units",
			deliveryDate: new Date("2024-03-20"),
			expectedDate: new Date("2024-03-20"),
			status: "pending",
			trackingNumber: "FP789123456",
			value: 3000.0,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [selectedSupplier, setSelectedSupplier] = useState<string>("all");

	const filteredDeliveries = deliveries.filter((delivery) => {
		const matchesSearch =
			delivery.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			delivery.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			delivery.deliveryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			selectedStatus === "all" || delivery.status === selectedStatus;
		const matchesSupplier =
			selectedSupplier === "all" || delivery.supplierName === selectedSupplier;
		return matchesSearch && matchesStatus && matchesSupplier;
	});

	const handleUpdateDeliveryStatus = async (
		deliveryId: string,
		newStatus: Delivery["status"]
	) => {
		try {
			const updatedDeliveries = deliveries.map((delivery) =>
				delivery.id === deliveryId
					? {
							...delivery,
							status: newStatus,
							...(newStatus === "delivered" && {
								receivedBy: "Manager",
								deliveryDate: new Date(),
							}),
					  }
					: delivery
			);
			setDeliveries(updatedDeliveries);
			console.log("[v0] Delivery status updated:", deliveryId, newStatus);

			// Log to blockchain
			const blockchainLog = {
				action: "Delivery Status Updated",
				itemName: deliveries.find((d) => d.id === deliveryId)?.itemName,
				user: "manager001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
			};
			console.log("[v0] Blockchain log:", blockchainLog);
		} catch (error) {
			console.error("[v0] Error updating delivery status:", error);
		}
	};

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			pending: "bg-gray-100 text-gray-800",
			"in-transit": "bg-blue-100 text-blue-800",
			delivered: "bg-green-100 text-green-800",
			delayed: "bg-yellow-100 text-yellow-800",
			cancelled: "bg-red-100 text-red-800",
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
			case "cancelled":
				return <AlertCircle className="h-4 w-4 text-red-600" />;
			case "pending":
				return <Clock className="h-4 w-4 text-gray-600" />;
			default:
				return <Package className="h-4 w-4 text-gray-600" />;
		}
	};

	const suppliers = Array.from(
		new Set(deliveries.map((delivery) => delivery.supplierName))
	);

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Truck className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Delivery Oversight
					</h1>
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
							<div className="text-sm text-gray-600">Total Deliveries</div>
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
							<div className="text-2xl font-bold text-yellow-600">
								{deliveries.filter((d) => d.status === "delayed").length}
							</div>
							<div className="text-sm text-gray-600">Delayed</div>
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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
								<SelectItem value="cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={selectedSupplier}
							onValueChange={setSelectedSupplier}
						>
							<SelectTrigger>
								<SelectValue placeholder="Filter by supplier" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Suppliers</SelectItem>
								{suppliers.map((supplier) => (
									<SelectItem key={supplier} value={supplier}>
										{supplier}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Deliveries Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Deliveries ({filteredDeliveries.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Delivery ID</th>
									<th className="text-left p-3">Supplier</th>
									<th className="text-left p-3">Item Name</th>
									<th className="text-left p-3">Quantity</th>
									<th className="text-left p-3">Expected Date</th>
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
										<td className="p-3">{delivery.supplierName}</td>
										<td className="p-3">{delivery.itemName}</td>
										<td className="p-3">
											{delivery.quantity} {delivery.unit}
										</td>
										<td className="p-3 text-sm">
											{delivery.expectedDate.toLocaleDateString()}
										</td>
										<td className="p-3 text-sm">
											{delivery.status === "delivered"
												? delivery.deliveryDate.toLocaleDateString()
												: "-"}
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
											<div className="flex items-center space-x-2">
												{delivery.status === "in-transit" && (
													<Button
														size="sm"
														className="bg-green-600 hover:bg-green-700 text-white"
														onClick={() =>
															handleUpdateDeliveryStatus(
																delivery.id,
																"delivered"
															)
														}
													>
														<CheckCircle className="h-3 w-3 mr-1" />
														Confirm
													</Button>
												)}
												{delivery.status === "pending" && (
													<Button
														size="sm"
														className="bg-blue-600 hover:bg-blue-700 text-white"
														onClick={() =>
															handleUpdateDeliveryStatus(
																delivery.id,
																"in-transit"
															)
														}
													>
														<Truck className="h-3 w-3 mr-1" />
														Ship
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
		</div>
	);
};

export default DeliveryOversight;
