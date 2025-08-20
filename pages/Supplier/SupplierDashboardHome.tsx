"use client";

import type React from "react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Truck,
	Package,
	Clock,
	CheckCircle,
	AlertCircle,
	Plus,
} from "lucide-react";

interface DeliverySummary {
	total: number;
	pending: number;
	inTransit: number;
	delivered: number;
	delayed: number;
}

interface RecentDelivery {
	id: string;
	deliveryId: string;
	itemName: string;
	quantity: number;
	unit: string;
	deliveryDate: Date;
	status: "pending" | "in-transit" | "delivered" | "delayed";
	trackingNumber: string;
	value: number;
}

interface PurchaseOrder {
	id: string;
	itemName: string;
	quantity: number;
	unit: string;
	requiredDate: string;
	urgency: "low" | "medium" | "high";
	status: "new" | "acknowledged" | "completed";
	estimatedValue: number;
}

const SupplierDashboardHome: React.FC = () => {
	const [summary] = useState<DeliverySummary>({
		total: 12,
		pending: 2,
		inTransit: 4,
		delivered: 6,
		delayed: 0,
	});

	const [purchaseOrders] = useState<PurchaseOrder[]>([
		{
			id: "PO-2024-001",
			itemName: "A4 Paper - White",
			quantity: 100,
			unit: "reams",
			requiredDate: "2024-03-25",
			urgency: "medium",
			status: "new",
			estimatedValue: 250,
		},
		{
			id: "PO-2024-002",
			itemName: "Wireless Mouse",
			quantity: 25,
			unit: "units",
			requiredDate: "2024-03-20",
			urgency: "high",
			status: "acknowledged",
			estimatedValue: 750,
		},
	]);

	const [recentDeliveries] = useState<RecentDelivery[]>([
		{
			id: "1",
			deliveryId: "DEL-2024-001",
			itemName: "Office Supplies - A4 Paper",
			quantity: 100,
			unit: "reams",
			deliveryDate: new Date("2024-03-15"),
			status: "delivered",
			trackingNumber: "TRK123456789",
			value: 250.0,
		},
		{
			id: "2",
			deliveryId: "DEL-2024-002",
			itemName: "Computer Equipment - Laptops",
			quantity: 10,
			unit: "units",
			deliveryDate: new Date("2024-03-16"),
			status: "in-transit",
			trackingNumber: "TRK987654321",
			value: 15000.0,
		},
	]);

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			pending: "bg-gray-100 text-gray-800",
			"in-transit": "bg-blue-100 text-blue-800",
			delivered: "bg-green-100 text-green-800",
			delayed: "bg-yellow-100 text-yellow-800",
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
			case "pending":
				return <Clock className="h-4 w-4 text-gray-600" />;
			default:
				return <Package className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center space-x-2">
					<Truck className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
						Supplier Dashboard
					</h1>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
					<Plus className="h-4 w-4 mr-2" />
					Submit Delivery
				</Button>
			</div>

			{/* Summary Cards - Simplified */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{summary.total}
							</div>
							<div className="text-sm text-gray-600">Total</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-600">
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
								{summary.inTransit}
							</div>
							<div className="text-sm text-gray-600">In Transit</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{summary.delivered}
							</div>
							<div className="text-sm text-gray-600">Delivered</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Purchase Orders Received</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{purchaseOrders.map((order) => (
							<div
								key={order.id}
								className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
							>
								<div>
									<div className="font-semibold">{order.itemName}</div>
									<div className="text-sm text-gray-600">
										{order.quantity} {order.unit} • Required:{" "}
										{order.requiredDate}
									</div>
									<div className="text-xs text-gray-500">
										Order: {order.id} • Value: ${order.estimatedValue}
									</div>
								</div>
								<div className="flex items-center space-x-2 mt-2 sm:mt-0">
									<Badge
										className={
											order.urgency === "high"
												? "bg-red-100 text-red-800"
												: "bg-yellow-100 text-yellow-800"
										}
									>
										{order.urgency.toUpperCase()}
									</Badge>
									<Badge
										className={
											order.status === "new"
												? "bg-blue-100 text-blue-800"
												: "bg-green-100 text-green-800"
										}
									>
										{order.status.toUpperCase()}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Recent Deliveries - Simplified */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Deliveries</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{recentDeliveries.map((delivery) => (
							<div
								key={delivery.id}
								className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg"
							>
								<div className="flex items-center space-x-3">
									<div className="flex-shrink-0">
										{getStatusIcon(delivery.status)}
									</div>
									<div>
										<div className="font-medium">{delivery.itemName}</div>
										<div className="text-sm text-gray-600">
											{delivery.quantity} {delivery.unit} •{" "}
											{delivery.deliveryId}
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-2 mt-2 sm:mt-0">
									<div className="text-right">
										<div className="font-semibold">
											${delivery.value.toLocaleString()}
										</div>
										<Badge className={getStatusBadgeColor(delivery.status)}>
											{delivery.status.replace("-", " ").toUpperCase()}
										</Badge>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SupplierDashboardHome;
