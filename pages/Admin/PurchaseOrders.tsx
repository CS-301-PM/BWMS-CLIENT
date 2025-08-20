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
import { Textarea } from "../../src/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import { Badge } from "../../src/components/ui/badge";
import { Plus, Send, Search, Eye, ShoppingCart } from "lucide-react";

interface PurchaseOrder {
	id: string;
	orderNumber: string;
	supplierName: string;
	supplierEmail: string;
	itemName: string;
	quantity: number;
	unit: string;
	urgency: "low" | "medium" | "high";
	requiredDate: string;
	notes: string;
	status: "draft" | "sent" | "acknowledged" | "delivered";
	createdDate: Date;
	estimatedValue: number;
}

const PurchaseOrders: React.FC = () => {
	const [orders, setOrders] = useState<PurchaseOrder[]>([
		{
			id: "1",
			orderNumber: "PO-2024-001",
			supplierName: "Office Supplies Co.",
			supplierEmail: "orders@officesupplies.com",
			itemName: "A4 Paper - White",
			quantity: 100,
			unit: "reams",
			urgency: "medium",
			requiredDate: "2024-03-25",
			notes: "Standard office paper for printing",
			status: "sent",
			createdDate: new Date("2024-03-15"),
			estimatedValue: 250,
		},
		{
			id: "2",
			orderNumber: "PO-2024-002",
			supplierName: "Tech Equipment Ltd.",
			supplierEmail: "sales@techequip.com",
			itemName: "Wireless Mouse",
			quantity: 25,
			unit: "units",
			urgency: "high",
			requiredDate: "2024-03-20",
			notes: "Ergonomic wireless mice for staff workstations",
			status: "acknowledged",
			createdDate: new Date("2024-03-14"),
			estimatedValue: 750,
		},
	]);

	const [showCreateForm, setShowCreateForm] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [newOrder, setNewOrder] = useState<Partial<PurchaseOrder>>({
		supplierName: "",
		supplierEmail: "",
		itemName: "",
		quantity: 0,
		unit: "",
		urgency: "medium",
		requiredDate: "",
		notes: "",
		estimatedValue: 0,
	});

	const handleCreateOrder = async () => {
		const orderNumber = `PO-${new Date().getFullYear()}-${String(
			orders.length + 1
		).padStart(3, "0")}`;

		const order: PurchaseOrder = {
			id: String(orders.length + 1),
			orderNumber,
			supplierName: newOrder.supplierName || "",
			supplierEmail: newOrder.supplierEmail || "",
			itemName: newOrder.itemName || "",
			quantity: newOrder.quantity || 0,
			unit: newOrder.unit || "",
			urgency: (newOrder.urgency as "low" | "medium" | "high") || "medium",
			requiredDate: newOrder.requiredDate || "",
			notes: newOrder.notes || "",
			status: "draft",
			createdDate: new Date(),
			estimatedValue: newOrder.estimatedValue || 0,
		};

		setOrders([...orders, order]);
		setNewOrder({
			supplierName: "",
			supplierEmail: "",
			itemName: "",
			quantity: 0,
			unit: "",
			urgency: "medium",
			requiredDate: "",
			notes: "",
			estimatedValue: 0,
		});
		setShowCreateForm(false);

		console.log("[v0] Purchase order created:", order);
	};

	const sendOrder = async (orderId: string) => {
		setOrders(
			orders.map((order) =>
				order.id === orderId ? { ...order, status: "sent" as const } : order
			)
		);

		console.log("[v0] Purchase order sent to supplier:", orderId);
	};

	const getUrgencyColor = (urgency: string) => {
		switch (urgency) {
			case "high":
				return "bg-red-100 text-red-800";
			case "medium":
				return "bg-yellow-100 text-yellow-800";
			case "low":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "draft":
				return "bg-gray-100 text-gray-800";
			case "sent":
				return "bg-blue-100 text-blue-800";
			case "acknowledged":
				return "bg-purple-100 text-purple-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const filteredOrders = orders.filter(
		(order) =>
			order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center space-x-2">
					<ShoppingCart className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
						Purchase Orders
					</h1>
				</div>
				<Button
					onClick={() => setShowCreateForm(true)}
					className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
				>
					<Plus className="h-4 w-4 mr-2" />
					Create Order
				</Button>
			</div>

			{/* Search */}
			<div className="flex items-center space-x-2">
				<Search className="h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search orders..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-md"
				/>
			</div>

			{/* Create Order Form */}
			{showCreateForm && (
				<Card>
					<CardHeader>
						<CardTitle>Create Purchase Order</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Supplier Name *
								</label>
								<Input
									placeholder="Supplier company name"
									value={newOrder.supplierName}
									onChange={(e) =>
										setNewOrder({ ...newOrder, supplierName: e.target.value })
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Supplier Email *
								</label>
								<Input
									type="email"
									placeholder="supplier@company.com"
									value={newOrder.supplierEmail}
									onChange={(e) =>
										setNewOrder({ ...newOrder, supplierEmail: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Item Name *
								</label>
								<Input
									placeholder="Item to be ordered"
									value={newOrder.itemName}
									onChange={(e) =>
										setNewOrder({ ...newOrder, itemName: e.target.value })
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Required Date *
								</label>
								<Input
									type="date"
									value={newOrder.requiredDate}
									onChange={(e) =>
										setNewOrder({ ...newOrder, requiredDate: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Quantity *
								</label>
								<Input
									type="number"
									min="1"
									value={newOrder.quantity || ""}
									onChange={(e) =>
										setNewOrder({
											...newOrder,
											quantity: Number.parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">Unit *</label>
								<Select
									value={newOrder.unit}
									onValueChange={(value) =>
										setNewOrder({ ...newOrder, unit: value })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Unit" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pieces">Pieces</SelectItem>
										<SelectItem value="units">Units</SelectItem>
										<SelectItem value="reams">Reams</SelectItem>
										<SelectItem value="boxes">Boxes</SelectItem>
										<SelectItem value="kg">Kilograms</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Urgency
								</label>
								<Select
									value={newOrder.urgency}
									onValueChange={(value) =>
										setNewOrder({
											...newOrder,
											urgency: value as "low" | "medium" | "high",
										})
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="low">Low</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="high">High</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Est. Value ($)
								</label>
								<Input
									type="number"
									min="0"
									step="0.01"
									value={newOrder.estimatedValue || ""}
									onChange={(e) =>
										setNewOrder({
											...newOrder,
											estimatedValue: Number.parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">Notes</label>
							<Textarea
								placeholder="Additional requirements or specifications..."
								value={newOrder.notes}
								onChange={(e) =>
									setNewOrder({ ...newOrder, notes: e.target.value })
								}
								rows={3}
							/>
						</div>

						<div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
							<Button
								variant="outline"
								onClick={() => setShowCreateForm(false)}
							>
								Cancel
							</Button>
							<Button
								onClick={handleCreateOrder}
								className="bg-blue-600 hover:bg-blue-700"
							>
								Create Order
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Orders List */}
			<div className="space-y-4">
				{filteredOrders.map((order) => (
					<Card key={order.id} className="hover:shadow-md transition-shadow">
						<CardContent className="p-4 md:p-6">
							<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
								<div className="space-y-2">
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="font-semibold text-lg">
											{order.orderNumber}
										</h3>
										<Badge className={getStatusColor(order.status)}>
											{order.status.toUpperCase()}
										</Badge>
										<Badge className={getUrgencyColor(order.urgency)}>
											{order.urgency.toUpperCase()}
										</Badge>
									</div>
									<div className="text-sm text-gray-600">
										<div>
											<strong>Supplier:</strong> {order.supplierName}
										</div>
										<div>
											<strong>Item:</strong> {order.itemName}
										</div>
										<div>
											<strong>Quantity:</strong> {order.quantity} {order.unit}
										</div>
										<div>
											<strong>Required:</strong>{" "}
											{new Date(order.requiredDate).toLocaleDateString()}
										</div>
										<div>
											<strong>Est. Value:</strong> $
											{order.estimatedValue.toLocaleString()}
										</div>
									</div>
								</div>
								<div className="flex flex-col sm:flex-row gap-2">
									<Button variant="outline" size="sm">
										<Eye className="h-4 w-4 mr-2" />
										View
									</Button>
									{order.status === "draft" && (
										<Button
											size="sm"
											onClick={() => sendOrder(order.id)}
											className="bg-blue-600 hover:bg-blue-700"
										>
											<Send className="h-4 w-4 mr-2" />
											Send
										</Button>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default PurchaseOrders;
