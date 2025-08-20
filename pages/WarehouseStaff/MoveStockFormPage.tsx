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
import { Alert, AlertDescription } from "../../src/components/ui/alert";
import {
	MapPin,
	Send,
	Package,
	Search,
	CheckCircle,
	AlertCircle,
} from "lucide-react";

interface StockItem {
	id: string;
	serialNumber: string;
	itemName: string;
	currentLocation: string;
	quantity: number;
	unit: string;
	status: "available" | "reserved" | "damaged";
}

interface StockMovement {
	itemId: string;
	itemName: string;
	quantityToMove: number;
	fromLocation: string;
	toLocation: string;
	reason: string;
	notes: string;
	priority: "low" | "medium" | "high" | "urgent";
	requestedBy: string;
}

const MoveStockFormPage: React.FC = () => {
	const [availableStock] = useState<StockItem[]>([
		{
			id: "1",
			serialNumber: "STK-001",
			itemName: "Office Supplies - A4 Paper",
			currentLocation: "Warehouse A-1",
			quantity: 150,
			unit: "reams",
			status: "available",
		},
		{
			id: "2",
			serialNumber: "STK-002",
			itemName: "Computer Equipment - Laptops",
			currentLocation: "Warehouse A-2",
			quantity: 8,
			unit: "units",
			status: "available",
		},
		{
			id: "3",
			serialNumber: "STK-003",
			itemName: "Medical Supplies - First Aid Kits",
			currentLocation: "Medical Storage",
			quantity: 25,
			unit: "kits",
			status: "available",
		},
		{
			id: "4",
			serialNumber: "STK-004",
			itemName: "Furniture - Office Chairs",
			currentLocation: "Warehouse B-2",
			quantity: 20,
			unit: "units",
			status: "reserved",
		},
	]);

	const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
	const [movement, setMovement] = useState<StockMovement>({
		itemId: "",
		itemName: "",
		quantityToMove: 0,
		fromLocation: "",
		toLocation: "",
		reason: "",
		notes: "",
		priority: "medium",
		requestedBy: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
		movementId?: string;
	}>({ type: null, message: "" });

	const locations = [
		"Warehouse A-1",
		"Warehouse A-2",
		"Warehouse B-1",
		"Warehouse B-2",
		"IT Storage",
		"Medical Storage",
		"Receiving Dock A",
		"Receiving Dock B",
		"Dispatch Area",
		"Quality Control",
		"Damaged Goods Area",
		"Overflow Storage",
	];

	const filteredStock = availableStock.filter(
		(item) =>
			item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectItem = (item: StockItem) => {
		setSelectedItem(item);
		setMovement({
			...movement,
			itemId: item.id,
			itemName: item.itemName,
			fromLocation: item.currentLocation,
			quantityToMove: 0,
		});
	};

	const handleSubmitMovement = async () => {
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			const movementId = `MOV-${new Date().getFullYear()}-${String(
				Date.now()
			).slice(-6)}`;

			const movementData = {
				...movement,
				movementId,
				timestamp: new Date(),
				status: "pending",
				processedBy: "Warehouse Staff",
			};

			console.log("[v0] Submitting stock movement:", movementData);

			await new Promise((resolve) => setTimeout(resolve, 1000));

			const blockchainLog = {
				action: "Stock Movement",
				itemName: movement.itemName,
				user: "warehouse001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 16)}`,
				details: {
					from: movement.fromLocation,
					to: movement.toLocation,
					quantity: movement.quantityToMove,
				},
			};
			console.log("[v0] Blockchain log:", blockchainLog);

			setSubmitStatus({
				type: "success",
				message: `Stock movement completed successfully! ${movement.quantityToMove} ${selectedItem?.unit} of ${movement.itemName} moved from ${movement.fromLocation} to ${movement.toLocation}.`,
				movementId,
			});

			setMovement({
				itemId: "",
				itemName: "",
				quantityToMove: 0,
				fromLocation: "",
				toLocation: "",
				reason: "",
				notes: "",
				priority: "medium",
				requestedBy: "",
			});
			setSelectedItem(null);

			console.log("[v0] Stock movement submitted successfully:", movementId);

			setTimeout(() => {
				setSubmitStatus({ type: null, message: "" });
			}, 5000);
		} catch (error) {
			console.error("[v0] Error submitting stock movement:", error);
			setSubmitStatus({
				type: "error",
				message: "Failed to submit stock movement. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = () => {
		return (
			movement.itemId !== "" &&
			movement.quantityToMove > 0 &&
			movement.fromLocation !== "" &&
			movement.toLocation !== "" &&
			movement.fromLocation !== movement.toLocation &&
			movement.reason.trim() !== "" &&
			selectedItem &&
			movement.quantityToMove <= selectedItem.quantity
		);
	};

	const getStatusBadgeColor = (status: string) => {
		const colors = {
			available: "bg-green-100 text-green-800",
			reserved: "bg-yellow-100 text-yellow-800",
			damaged: "bg-red-100 text-red-800",
		};
		return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<MapPin className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">Move Stock</h1>
				</div>
			</div>

			{submitStatus.type && (
				<Alert
					className={
						submitStatus.type === "success"
							? "border-green-500 bg-green-50"
							: "border-red-500 bg-red-50"
					}
				>
					{submitStatus.type === "success" ? (
						<CheckCircle className="h-4 w-4 text-green-600" />
					) : (
						<AlertCircle className="h-4 w-4 text-red-600" />
					)}
					<AlertDescription
						className={
							submitStatus.type === "success"
								? "text-green-800"
								: "text-red-800"
						}
					>
						{submitStatus.message}
						{submitStatus.movementId && (
							<div className="mt-1 font-mono text-sm">
								Movement ID: {submitStatus.movementId}
							</div>
						)}
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Search className="h-5 w-5" />
							<span>Select Stock Item</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search stock items..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>

						<div className="space-y-2 max-h-96 overflow-y-auto">
							{filteredStock.map((item) => (
								<div
									key={item.id}
									className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
										selectedItem?.id === item.id
											? "border-blue-500 bg-blue-50"
											: ""
									}`}
									onClick={() => handleSelectItem(item)}
								>
									<div className="flex items-center justify-between">
										<div>
											<div className="font-semibold">{item.itemName}</div>
											<div className="text-sm text-gray-600">
												{item.serialNumber} • {item.currentLocation}
											</div>
											<div className="text-sm text-gray-600">
												Available: {item.quantity} {item.unit}
											</div>
										</div>
										<Badge className={getStatusBadgeColor(item.status)}>
											{item.status.toUpperCase()}
										</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Package className="h-5 w-5" />
							<span>Movement Details</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{selectedItem ? (
							<>
								<div>
									<label className="text-sm font-medium mb-2 block">
										Selected Item
									</label>
									<div className="p-3 bg-gray-50 rounded-lg">
										<div className="font-semibold">{selectedItem.itemName}</div>
										<div className="text-sm text-gray-600">
											{selectedItem.serialNumber} • Available:{" "}
											{selectedItem.quantity} {selectedItem.unit}
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium mb-2 block">
											From Location
										</label>
										<Input
											value={movement.fromLocation}
											disabled
											className="bg-gray-50"
										/>
									</div>
									<div>
										<label className="text-sm font-medium mb-2 block">
											To Location *
										</label>
										<Select
											value={movement.toLocation}
											onValueChange={(value) =>
												setMovement({ ...movement, toLocation: value })
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select destination" />
											</SelectTrigger>
											<SelectContent>
												{locations
													.filter(
														(location) => location !== movement.fromLocation
													)
													.map((location) => (
														<SelectItem key={location} value={location}>
															{location}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium mb-2 block">
											Quantity to Move *
										</label>
										<Input
											type="number"
											min="1"
											max={selectedItem.quantity}
											placeholder="0"
											value={movement.quantityToMove || ""}
											onChange={(e) =>
												setMovement({
													...movement,
													quantityToMove: Number.parseInt(e.target.value) || 0,
												})
											}
										/>
									</div>
									<div>
										<label className="text-sm font-medium mb-2 block">
											Priority
										</label>
										<Select
											value={movement.priority}
											onValueChange={(value) =>
												setMovement({ ...movement, priority: value as any })
											}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="low">Low</SelectItem>
												<SelectItem value="medium">Medium</SelectItem>
												<SelectItem value="high">High</SelectItem>
												<SelectItem value="urgent">Urgent</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div>
									<label className="text-sm font-medium mb-2 block">
										Reason for Movement *
									</label>
									<Select
										value={movement.reason}
										onValueChange={(value) =>
											setMovement({ ...movement, reason: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select reason" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Space Optimization">
												Space Optimization
											</SelectItem>
											<SelectItem value="Request Fulfillment">
												Request Fulfillment
											</SelectItem>
											<SelectItem value="Inventory Reorganization">
												Inventory Reorganization
											</SelectItem>
											<SelectItem value="Quality Control">
												Quality Control
											</SelectItem>
											<SelectItem value="Damage Prevention">
												Damage Prevention
											</SelectItem>
											<SelectItem value="Accessibility Improvement">
												Accessibility Improvement
											</SelectItem>
											<SelectItem value="Maintenance Required">
												Maintenance Required
											</SelectItem>
											<SelectItem value="Other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className="text-sm font-medium mb-2 block">
										Requested By
									</label>
									<Input
										placeholder="Name or department requesting the move"
										value={movement.requestedBy}
										onChange={(e) =>
											setMovement({ ...movement, requestedBy: e.target.value })
										}
									/>
								</div>

								<div>
									<label className="text-sm font-medium mb-2 block">
										Additional Notes
									</label>
									<Textarea
										placeholder="Any additional information about this movement..."
										value={movement.notes}
										onChange={(e) =>
											setMovement({ ...movement, notes: e.target.value })
										}
										rows={3}
									/>
								</div>

								<div className="flex justify-end space-x-4">
									<Button
										variant="outline"
										onClick={() => {
											setSelectedItem(null);
											setMovement({
												itemId: "",
												itemName: "",
												quantityToMove: 0,
												fromLocation: "",
												toLocation: "",
												reason: "",
												notes: "",
												priority: "medium",
												requestedBy: "",
											});
											setSubmitStatus({ type: null, message: "" });
										}}
									>
										Clear Selection
									</Button>
									<Button
										onClick={handleSubmitMovement}
										disabled={!isFormValid() || isSubmitting}
										className="bg-blue-600 hover:bg-blue-700"
									>
										<Send className="h-4 w-4 mr-2" />
										{isSubmitting
											? "Processing Movement..."
											: "Submit Movement"}
									</Button>
								</div>
							</>
						) : (
							<div className="text-center py-8 text-gray-500">
								<Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
								<div>
									Select a stock item from the left to begin the movement
									process
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Stock Movement Guidelines</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 text-sm text-gray-600">
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Verify Quantities:</strong> Always double-check the
								quantity before moving to avoid discrepancies.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Update Locations:</strong> Ensure the new location is
								updated immediately after the physical move.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Handle with Care:</strong> Follow proper handling
								procedures, especially for fragile or valuable items.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Document Everything:</strong> Record all movements for
								audit trail and inventory accuracy.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Priority Handling:</strong> Process urgent and
								high-priority movements first.
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default MoveStockFormPage;
