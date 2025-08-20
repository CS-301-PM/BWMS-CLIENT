"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Plus,
	Edit,
	Trash2,
	Check,
	X,
	Package,
	MapPin,
	Info,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { StockItem } from "../../types";

export function ItemStockManagement() {
	const [activeTab, setActiveTab] = useState("view");
	const [stockItems, setStockItems] = useState<StockItem[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingItem, setEditingItem] = useState<StockItem | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		serialNumber: "",
		itemName: "",
		value: "",
		unit: "",
		weight: "",
		status: "Available" as StockItem["status"],
		location: "",
		supplierId: "",
	});

	const mockStockItems: StockItem[] = [
		{
			id: "1",
			serialNumber: "STK-001",
			itemName: "Office Supplies",
			value: 250.0,
			unit: "pcs",
			weight: 5.2,
			status: "Available",
			location: "Warehouse A-1",
			supplierId: "SUP-001",
			createdAt: "2024-01-15T10:30:00Z",
			updatedAt: "2024-01-15T10:30:00Z",
		},
		{
			id: "2",
			serialNumber: "STK-002",
			itemName: "Cleaning Materials",
			value: 180.5,
			unit: "liters",
			weight: 12.8,
			status: "Reserved",
			location: "Warehouse B-2",
			supplierId: "SUP-002",
			createdAt: "2024-01-16T09:15:00Z",
			updatedAt: "2024-01-16T09:15:00Z",
		},
		{
			id: "3",
			serialNumber: "STK-003",
			itemName: "Computer Equipment",
			value: 1200.0,
			unit: "units",
			weight: 8.5,
			status: "Out of Stock",
			location: "Warehouse C-3",
			supplierId: "SUP-003",
			createdAt: "2024-01-17T11:45:00Z",
			updatedAt: "2024-01-17T11:45:00Z",
		},
		{
			id: "4",
			serialNumber: "STK-004",
			itemName: "Safety Equipment",
			value: 450.0,
			unit: "sets",
			weight: 15.3,
			status: "Damaged",
			location: "Warehouse D-4",
			supplierId: "SUP-001",
			createdAt: "2024-01-18T14:20:00Z",
			updatedAt: "2024-01-18T14:20:00Z",
		},
	];

	useEffect(() => {
		fetchStockItems();
	}, []);

	const fetchStockItems = async () => {
		try {
			// const response = await fetch('/api/stock-items')
			// const data: ApiResponse<StockItem[]> = await response.json()
			// if (data.success) {
			//   setStockItems(data.data)
			// }
			console.log("[v0] Fetching stock items from API");
			setStockItems(mockStockItems);
		} catch (error) {
			console.error("[v0] Error fetching stock items:", error);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const generateSerialNumber = () => {
		const timestamp = Date.now();
		const random = Math.floor(Math.random() * 1000);
		return `STK-${timestamp}-${random}`;
	};

	const resetForm = () => {
		setFormData({
			serialNumber: "",
			itemName: "",
			value: "",
			unit: "",
			weight: "",
			status: "Available",
			location: "",
			supplierId: "",
		});
		setEditingItem(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const itemData: Partial<StockItem> = {
				serialNumber: formData.serialNumber || generateSerialNumber(),
				itemName: formData.itemName,
				value: Number.parseFloat(formData.value),
				unit: formData.unit,
				weight: Number.parseFloat(formData.weight),
				status: formData.status,
				location: formData.location,
				supplierId: formData.supplierId,
				updatedAt: new Date().toISOString(),
			};

			if (editingItem) {
				// Update existing item
				// const response = await fetch(`/api/stock-items/${editingItem.id}`, {
				//   method: 'PUT',
				//   headers: { 'Content-Type': 'application/json' },
				//   body: JSON.stringify(itemData),
				// })
				console.log("[v0] Updating stock item:", itemData);

				setStockItems((prev) =>
					prev.map((item) =>
						item.id === editingItem.id ? { ...item, ...itemData } : item
					)
				);
				setIsEditDialogOpen(false);
			} else {
				// Create new item
				// const response = await fetch('/api/stock-items', {
				//   method: 'POST',
				//   headers: { 'Content-Type': 'application/json' },
				//   body: JSON.stringify({ ...itemData, createdAt: new Date().toISOString() }),
				// })
				console.log("[v0] Creating stock item:", itemData);

				const { id, createdAt, ...itemDataWithoutId } = itemData as StockItem;
				const newItem: StockItem = {
					id: Date.now().toString(),
					createdAt: new Date().toISOString(),
					...itemDataWithoutId,
				};

				setStockItems((prev) => [newItem, ...prev]);
				setActiveTab("view");
			}

			resetForm();
		} catch (error) {
			console.error("[v0] Error submitting stock item:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (item: StockItem) => {
		setEditingItem(item);
		setFormData({
			serialNumber: item.serialNumber,
			itemName: item.itemName,
			value: item.value.toString(),
			unit: item.unit,
			weight: item.weight.toString(),
			status: item.status,
			location: item.location || "",
			supplierId: item.supplierId || "",
		});
		setIsEditDialogOpen(true);
	};

	const handleDelete = async (id: string) => {
		try {
			// const response = await fetch(`/api/stock-items/${id}`, {
			//   method: 'DELETE',
			// })
			console.log("[v0] Deleting stock item:", id);

			setStockItems((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			console.error("[v0] Error deleting stock item:", error);
		}
	};

	const handleApprove = async (id: string) => {
		try {
			// const response = await fetch(`/api/stock-items/${id}/approve`, {
			//   method: 'PATCH',
			// })
			console.log("[v0] Approving stock item:", id);

			setStockItems((prev) =>
				prev.map((item) =>
					item.id === id
						? {
								...item,
								status: "Available",
								updatedAt: new Date().toISOString(),
						  }
						: item
				)
			);
		} catch (error) {
			console.error("[v0] Error approving stock item:", error);
		}
	};

	const handleDecline = async (id: string) => {
		try {
			// const response = await fetch(`/api/stock-items/${id}/decline`, {
			//   method: 'PATCH',
			// })
			console.log("[v0] Declining stock item:", id);

			setStockItems((prev) =>
				prev.map((item) =>
					item.id === id
						? {
								...item,
								status: "Damaged",
								updatedAt: new Date().toISOString(),
						  }
						: item
				)
			);
		} catch (error) {
			console.error("[v0] Error declining stock item:", error);
		}
	};

	const getStatusBadge = (status: StockItem["status"]) => {
		switch (status) {
			case "Available":
				return (
					<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
						Available
					</Badge>
				);
			case "Reserved":
				return (
					<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
						Reserved
					</Badge>
				);
			case "Out of Stock":
				return (
					<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
						Out of Stock
					</Badge>
				);
			case "Damaged":
				return (
					<Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
						Damaged
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const ItemForm = () => (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="serialNumber">Serial #</Label>
					<Input
						id="serialNumber"
						placeholder="Auto-generated if empty"
						value={formData.serialNumber}
						onChange={(e) => handleInputChange("serialNumber", e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="itemName">Item Name *</Label>
					<Input
						id="itemName"
						placeholder="Enter item name"
						value={formData.itemName}
						onChange={(e) => handleInputChange("itemName", e.target.value)}
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="value">Value *</Label>
					<Input
						id="value"
						type="number"
						step="0.01"
						placeholder="0.00"
						value={formData.value}
						onChange={(e) => handleInputChange("value", e.target.value)}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="unit">Unit *</Label>
					<Input
						id="unit"
						placeholder="e.g., pcs, kg, liters"
						value={formData.unit}
						onChange={(e) => handleInputChange("unit", e.target.value)}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="weight">Weight *</Label>
					<Input
						id="weight"
						type="number"
						step="0.1"
						placeholder="0.0"
						value={formData.weight}
						onChange={(e) => handleInputChange("weight", e.target.value)}
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-2">
					<Label htmlFor="status">Status</Label>
					<Select
						value={formData.status}
						onValueChange={(value) => handleInputChange("status", value)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Available">Available</SelectItem>
							<SelectItem value="Reserved">Reserved</SelectItem>
							<SelectItem value="Out of Stock">Out of Stock</SelectItem>
							<SelectItem value="Damaged">Damaged</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="location">Location</Label>
					<Input
						id="location"
						placeholder="e.g., Warehouse A-1"
						value={formData.location}
						onChange={(e) => handleInputChange("location", e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="supplierId">Supplier ID</Label>
					<Input
						id="supplierId"
						placeholder="e.g., SUP-001"
						value={formData.supplierId}
						onChange={(e) => handleInputChange("supplierId", e.target.value)}
					/>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				{editingItem && (
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							resetForm();
							setIsEditDialogOpen(false);
						}}
					>
						Cancel
					</Button>
				)}
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting
						? "Saving..."
						: editingItem
						? "Update Item"
						: "Add Item"}
				</Button>
			</div>
		</form>
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Package className="w-6 h-6" />
				<h2 className="text-2xl font-bold">Item/Stock Management</h2>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="add" className="flex items-center gap-2">
						<Plus className="w-4 h-4" />
						Add Item
					</TabsTrigger>
					<TabsTrigger value="view" className="flex items-center gap-2">
						<Info className="w-4 h-4" />
						View ItemList
					</TabsTrigger>
					<TabsTrigger value="manage" className="flex items-center gap-2">
						<MapPin className="w-4 h-4" />
						Manage
					</TabsTrigger>
				</TabsList>

				<TabsContent value="add" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Plus className="w-5 h-5" />
								Add New Stock Item
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ItemForm />
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="view" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Stock Items</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Serial #</TableHead>
										<TableHead>Item Name</TableHead>
										<TableHead>Value</TableHead>
										<TableHead>Unit</TableHead>
										<TableHead>Weight</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Location</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stockItems.map((item) => (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												{item.serialNumber}
											</TableCell>
											<TableCell>{item.itemName}</TableCell>
											<TableCell>${item.value.toFixed(2)}</TableCell>
											<TableCell>{item.unit}</TableCell>
											<TableCell>{item.weight} kg</TableCell>
											<TableCell>{getStatusBadge(item.status)}</TableCell>
											<TableCell>{item.location}</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() => handleEdit(item)}
													>
														<Edit className="w-4 h-4" />
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button size="sm" variant="outline">
																<Trash2 className="w-4 h-4" />
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Delete Stock Item
																</AlertDialogTitle>
																<AlertDialogDescription>
																	Are you sure you want to delete "
																	{item.itemName}"? This action cannot be
																	undone.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() => handleDelete(item.id)}
																>
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="manage" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Manage Stock Items</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Serial #</TableHead>
										<TableHead>Item Name</TableHead>
										<TableHead>Value</TableHead>
										<TableHead>Unit</TableHead>
										<TableHead>Weight</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{stockItems.map((item) => (
										<TableRow key={item.id}>
											<TableCell className="font-medium">
												{item.serialNumber}
											</TableCell>
											<TableCell>{item.itemName}</TableCell>
											<TableCell>${item.value.toFixed(2)}</TableCell>
											<TableCell>{item.unit}</TableCell>
											<TableCell>{item.weight} kg</TableCell>
											<TableCell>{getStatusBadge(item.status)}</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Button
														size="sm"
														variant="outline"
														className="text-green-600 hover:text-green-700 bg-transparent"
														onClick={() => handleApprove(item.id)}
														disabled={item.status === "Available"}
													>
														<Check className="w-4 h-4" />
														Approve
													</Button>
													<Button
														size="sm"
														variant="outline"
														className="text-red-600 hover:text-red-700 bg-transparent"
														onClick={() => handleDecline(item.id)}
														disabled={item.status === "Damaged"}
													>
														<X className="w-4 h-4" />
														Decline
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="max-w-4xl">
					<DialogHeader>
						<DialogTitle>Edit Stock Item</DialogTitle>
					</DialogHeader>
					<ItemForm />
				</DialogContent>
			</Dialog>
		</div>
	);
}
