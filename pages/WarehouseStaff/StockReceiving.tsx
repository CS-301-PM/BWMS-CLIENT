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
import { Label } from "../../src/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import { Badge } from "../../src/components/ui/badge";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/ui/tabs";
import { Package, MapPin, CheckCircle, Plus, Scan } from "lucide-react";
import QRScanner from "../../src/components/qr-scanner";

interface ReceivedItem {
	id: string;
	qrCode?: string;
	itemName: string;
	serialNumber?: string;
	quantity: number;
	unit: string;
	category: string;
	location: string;
	receivedBy: string;
	timestamp: Date;
	deliveryId?: string;
	supplierName?: string;
	expiryDate?: string;
	batchNumber?: string;
}

interface ManualEntryForm {
	itemName: string;
	serialNumber: string;
	quantity: string;
	unit: string;
	category: string;
	supplierName: string;
	expiryDate: string;
	batchNumber: string;
}

const StockReceiving: React.FC = () => {
	const [receivedItems, setReceivedItems] = useState<ReceivedItem[]>([]);
	const [selectedLocation, setSelectedLocation] = useState("Warehouse A");

	const [manualForm, setManualForm] = useState<ManualEntryForm>({
		itemName: "",
		serialNumber: "",
		quantity: "",
		unit: "pieces",
		category: "",
		supplierName: "",
		expiryDate: "",
		batchNumber: "",
	});

	const handleItemScanned = (scannedItem: any) => {
		const newItem: ReceivedItem = {
			id: String(receivedItems.length + 1),
			qrCode: scannedItem.qrCode,
			itemName: scannedItem.itemName,
			quantity: scannedItem.quantity,
			unit: scannedItem.unit,
			category: scannedItem.category || "General",
			location: selectedLocation,
			receivedBy: "Current User",
			timestamp: new Date(),
			deliveryId: `DEL-${new Date().getFullYear()}-${String(
				receivedItems.length + 1
			).padStart(3, "0")}`,
			supplierName: scannedItem.supplierName || "Supplier Co.",
		};

		setReceivedItems([newItem, ...receivedItems]);

		console.log("[v0] Updating inventory:", {
			action: "Stock Added via QR",
			item: newItem,
			location: newItem.location,
			timestamp: new Date(),
		});
	};

	const handleManualSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!manualForm.itemName || !manualForm.quantity) {
			alert("Please fill in required fields (Item Name and Quantity)");
			return;
		}

		const newItem: ReceivedItem = {
			id: String(receivedItems.length + 1),
			itemName: manualForm.itemName,
			serialNumber: manualForm.serialNumber,
			quantity: Number.parseInt(manualForm.quantity),
			unit: manualForm.unit,
			category: manualForm.category || "General",
			location: selectedLocation,
			receivedBy: "Current User",
			timestamp: new Date(),
			deliveryId: `DEL-${new Date().getFullYear()}-${String(
				receivedItems.length + 1
			).padStart(3, "0")}`,
			supplierName: manualForm.supplierName || "Unknown Supplier",
			expiryDate: manualForm.expiryDate,
			batchNumber: manualForm.batchNumber,
		};

		setReceivedItems([newItem, ...receivedItems]);

		// Reset form
		setManualForm({
			itemName: "",
			serialNumber: "",
			quantity: "",
			unit: "pieces",
			category: "",
			supplierName: "",
			expiryDate: "",
			batchNumber: "",
		});

		console.log("[v0] Updating inventory:", {
			action: "Stock Added Manually",
			item: newItem,
			location: newItem.location,
			timestamp: new Date(),
		});

		alert("Stock item added successfully!");
	};

	return (
		<div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center space-x-2">
				<Package className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
				<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
					Stock Receiving
				</h1>
			</div>

			{/* Location Selection */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<MapPin className="h-5 w-5" />
						<span>Receiving Location</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Select value={selectedLocation} onValueChange={setSelectedLocation}>
						<SelectTrigger className="max-w-md">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Warehouse A">
								Warehouse A - Main Storage
							</SelectItem>
							<SelectItem value="Warehouse B">
								Warehouse B - Secondary Storage
							</SelectItem>
							<SelectItem value="Receiving Dock">
								Receiving Dock - Temporary
							</SelectItem>
							<SelectItem value="Cold Storage">
								Cold Storage - Temperature Controlled
							</SelectItem>
							<SelectItem value="Hazmat Storage">
								Hazmat Storage - Special Handling
							</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Add Stock Items</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="qr-scan" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger
								value="qr-scan"
								className="flex items-center space-x-2"
							>
								<Scan className="h-4 w-4" />
								<span>QR Scan</span>
							</TabsTrigger>
							<TabsTrigger
								value="manual"
								className="flex items-center space-x-2"
							>
								<Plus className="h-4 w-4" />
								<span>Manual Entry</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="qr-scan" className="mt-4">
							<QRScanner onItemScanned={handleItemScanned} />
						</TabsContent>

						<TabsContent value="manual" className="mt-4">
							<form onSubmit={handleManualSubmit} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="itemName">Item Name *</Label>
										<Input
											id="itemName"
											value={manualForm.itemName}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													itemName: e.target.value,
												})
											}
											placeholder="Enter item name"
											required
										/>
									</div>

									<div>
										<Label htmlFor="serialNumber">Serial Number</Label>
										<Input
											id="serialNumber"
											value={manualForm.serialNumber}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													serialNumber: e.target.value,
												})
											}
											placeholder="Enter serial number"
										/>
									</div>

									<div>
										<Label htmlFor="quantity">Quantity *</Label>
										<Input
											id="quantity"
											type="number"
											value={manualForm.quantity}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													quantity: e.target.value,
												})
											}
											placeholder="Enter quantity"
											required
										/>
									</div>

									<div>
										<Label htmlFor="unit">Unit</Label>
										<Select
											value={manualForm.unit}
											onValueChange={(value) =>
												setManualForm({ ...manualForm, unit: value })
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="pieces">Pieces</SelectItem>
												<SelectItem value="kg">Kilograms</SelectItem>
												<SelectItem value="liters">Liters</SelectItem>
												<SelectItem value="boxes">Boxes</SelectItem>
												<SelectItem value="meters">Meters</SelectItem>
												<SelectItem value="sets">Sets</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label htmlFor="category">Category</Label>
										<Input
											id="category"
											value={manualForm.category}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													category: e.target.value,
												})
											}
											placeholder="Enter category"
										/>
									</div>

									<div>
										<Label htmlFor="supplierName">Supplier Name</Label>
										<Input
											id="supplierName"
											value={manualForm.supplierName}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													supplierName: e.target.value,
												})
											}
											placeholder="Enter supplier name"
										/>
									</div>

									<div>
										<Label htmlFor="batchNumber">Batch Number</Label>
										<Input
											id="batchNumber"
											value={manualForm.batchNumber}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													batchNumber: e.target.value,
												})
											}
											placeholder="Enter batch number"
										/>
									</div>

									<div>
										<Label htmlFor="expiryDate">Expiry Date</Label>
										<Input
											id="expiryDate"
											type="date"
											value={manualForm.expiryDate}
											onChange={(e) =>
												setManualForm({
													...manualForm,
													expiryDate: e.target.value,
												})
											}
										/>
									</div>
								</div>

								<Button type="submit" className="w-full md:w-auto">
									<Plus className="h-4 w-4 mr-2" />
									Add Stock Item
								</Button>
							</form>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			{/* Received Items Today */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<CheckCircle className="h-5 w-5" />
							<span>Items Received Today</span>
						</div>
						<Badge className="bg-green-100 text-green-800">
							{receivedItems.length} Items
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent>
					{receivedItems.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
							<div>No items received yet today</div>
							<div className="text-sm">
								Scan QR codes or manually enter to start receiving stock
							</div>
						</div>
					) : (
						<div className="space-y-3">
							{receivedItems.map((item) => (
								<div
									key={item.id}
									className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-green-50"
								>
									<div className="flex items-center space-x-3">
										<CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
										<div>
											<div className="font-medium">{item.itemName}</div>
											<div className="text-sm text-gray-600">
												{item.quantity} {item.unit} • {item.location}
											</div>
											<div className="text-xs text-gray-500">
												{item.qrCode
													? `QR: ${item.qrCode}`
													: `Serial: ${item.serialNumber}`}{" "}
												• {item.timestamp.toLocaleTimeString()}
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-2 mt-2 sm:mt-0">
										<Badge className="bg-blue-100 text-blue-800">
											{item.deliveryId}
										</Badge>
										<MapPin className="h-4 w-4 text-gray-400" />
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{receivedItems.length}
							</div>
							<div className="text-sm text-gray-600">Today</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{receivedItems.reduce((sum, item) => sum + item.quantity, 0)}
							</div>
							<div className="text-sm text-gray-600">Total Units</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">
								{new Set(receivedItems.map((item) => item.location)).size}
							</div>
							<div className="text-sm text-gray-600">Locations</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-orange-600">
								{new Set(receivedItems.map((item) => item.supplierName)).size}
							</div>
							<div className="text-sm text-gray-600">Suppliers</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StockReceiving;
