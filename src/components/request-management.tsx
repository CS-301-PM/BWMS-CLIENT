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
import { Edit, Eye, Search, Clock, FileText, Plus, Send } from "lucide-react";
import { useState, useEffect } from "react";
import type { StockRequest } from "../../types";

export function RequestManagement() {
	const [activeTab, setActiveTab] = useState("create");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [requests, setRequests] = useState<StockRequest[]>([]);
	const [formData, setFormData] = useState({
		serialNumber: "",
		itemName: "",
		value: "",
		unit: "",
		weight: "",
	});

	const mockRequests: StockRequest[] = [
		{
			id: "1",
			serialNumber: "REQ-001",
			itemName: "Office Supplies",
			value: 250.0,
			unit: "pcs",
			weight: 5.2,
			status: "Approved",
			requestedBy: "dept-001",
			requestedByName: "John Doe",
			department: "IT",
			createdAt: "2024-01-15T10:30:00Z",
			updatedAt: "2024-01-15T14:20:00Z",
			approvedBy: "mgr-001",
			approvedAt: "2024-01-15T14:20:00Z",
		},
		{
			id: "2",
			serialNumber: "REQ-002",
			itemName: "Cleaning Materials",
			value: 180.5,
			unit: "liters",
			weight: 12.8,
			status: "Pending",
			requestedBy: "dept-002",
			requestedByName: "Jane Smith",
			department: "Maintenance",
			createdAt: "2024-01-16T09:15:00Z",
			updatedAt: "2024-01-16T09:15:00Z",
		},
		{
			id: "3",
			serialNumber: "REQ-003",
			itemName: "Computer Equipment",
			value: 1200.0,
			unit: "units",
			weight: 8.5,
			status: "In Process",
			requestedBy: "dept-003",
			requestedByName: "Mike Johnson",
			department: "HR",
			createdAt: "2024-01-17T11:45:00Z",
			updatedAt: "2024-01-17T13:30:00Z",
		},
	];

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		try {
			// const response = await fetch('/api/requests')
			// const data: ApiResponse<StockRequest[]> = await response.json()
			// if (data.success) {
			//   setRequests(data.data)
			// }
			console.log("[v0] Fetching requests from API");
			setRequests(mockRequests);
		} catch (error) {
			console.error("[v0] Error fetching requests:", error);
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
		return `REQ-${timestamp}-${random}`;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const requestData: Partial<StockRequest> = {
				serialNumber: formData.serialNumber || generateSerialNumber(),
				itemName: formData.itemName,
				value: Number.parseFloat(formData.value),
				unit: formData.unit,
				weight: Number.parseFloat(formData.weight),
				status: "Pending",
				requestedBy: "current-user-id", // Replace with actual user ID
				requestedByName: "Current User", // Replace with actual user name
				department: "Current Department", // Replace with actual department
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			// const response = await fetch('/api/requests', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			//   body: JSON.stringify(requestData),
			// })
			// const result: ApiResponse<StockRequest> = await response.json()

			console.log("[v0] Submitting request:", requestData);

			// Mock success response
			const newRequest: StockRequest = {
				id: Date.now().toString(),
				serialNumber: requestData.serialNumber ?? generateSerialNumber(),
				itemName: requestData.itemName ?? "",
				value: requestData.value ?? 0,
				unit: requestData.unit ?? "",
				weight: requestData.weight ?? 0,
				status: requestData.status ?? "Pending",
				requestedBy: requestData.requestedBy ?? "current-user-id",
				requestedByName: requestData.requestedByName ?? "Current User",
				department: requestData.department ?? "Current Department",
				createdAt: requestData.createdAt ?? new Date().toISOString(),
				updatedAt: requestData.updatedAt ?? new Date().toISOString(),
				approvedBy: requestData.approvedBy,
				approvedAt: requestData.approvedAt,
			};
			// filepath: c:\Users\chita\Documents\central-stores-react\src\components\request-management.tsx

			setRequests((prev) => [newRequest, ...prev]);

			// Reset form
			setFormData({
				serialNumber: "",
				itemName: "",
				value: "",
				unit: "",
				weight: "",
			});

			// Switch to view tab to show the created request
			setActiveTab("view");
		} catch (error) {
			console.error("[v0] Error submitting request:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "Approved":
				return (
					<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
						Approved
					</Badge>
				);
			case "Declined":
				return (
					<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
						Declined
					</Badge>
				);
			case "In Process":
				return (
					<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
						In Process
					</Badge>
				);
			case "Pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
						Pending
					</Badge>
				);
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const trackRequest = async (serialNumber: string) => {
		try {
			// const response = await fetch(`/api/requests/track/${serialNumber}`)
			// const data: ApiResponse<StockRequest> = await response.json()
			console.log("[v0] Tracking request:", serialNumber);
		} catch (error) {
			console.error("[v0] Error tracking request:", error);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<FileText className="w-6 h-6" />
				<h2 className="text-2xl font-bold">Request Management</h2>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="create" className="flex items-center gap-2">
						<Edit className="w-4 h-4" />
						Create
					</TabsTrigger>
					<TabsTrigger value="view" className="flex items-center gap-2">
						<Eye className="w-4 h-4" />
						View
					</TabsTrigger>
					<TabsTrigger value="track" className="flex items-center gap-2">
						<Search className="w-4 h-4" />
						Track
					</TabsTrigger>
				</TabsList>

				<TabsContent value="create" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Plus className="w-5 h-5" />
								Create New Request
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="serialNumber">Serial #</Label>
										<Input
											id="serialNumber"
											placeholder="Auto-generated if empty"
											value={formData.serialNumber}
											onChange={(e) =>
												handleInputChange("serialNumber", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="itemName">Item Name *</Label>
										<Input
											id="itemName"
											placeholder="Enter item name"
											value={formData.itemName}
											onChange={(e) =>
												handleInputChange("itemName", e.target.value)
											}
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
											onChange={(e) =>
												handleInputChange("value", e.target.value)
											}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="unit">Unit *</Label>
										<Input
											id="unit"
											placeholder="e.g., pcs, kg, liters"
											value={formData.unit}
											onChange={(e) =>
												handleInputChange("unit", e.target.value)
											}
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
											onChange={(e) =>
												handleInputChange("weight", e.target.value)
											}
											required
										/>
									</div>
								</div>

								<div className="flex justify-end">
									<Button
										type="submit"
										disabled={isSubmitting}
										className="flex items-center gap-2"
									>
										<Send className="w-4 h-4" />
										{isSubmitting ? "Submitting..." : "Submit"}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="view" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>All Requests</CardTitle>
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
										<TableHead>Requested By</TableHead>
										<TableHead>Date</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{requests.map((request) => (
										<TableRow key={request.id}>
											<TableCell className="font-medium">
												{request.serialNumber}
											</TableCell>
											<TableCell>{request.itemName}</TableCell>
											<TableCell>${request.value.toFixed(2)}</TableCell>
											<TableCell>{request.unit}</TableCell>
											<TableCell>{request.weight} kg</TableCell>
											<TableCell>{getStatusBadge(request.status)}</TableCell>
											<TableCell>{request.requestedByName}</TableCell>
											<TableCell>
												{new Date(request.createdAt).toLocaleDateString()}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="track" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="w-5 h-5" />
								Track Request Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex gap-2">
									<Input
										placeholder="Enter serial number (e.g., REQ-001)"
										className="flex-1"
									/>
									<Button onClick={() => trackRequest("REQ-001")}>
										<Search className="w-4 h-4 mr-2" />
										Track
									</Button>
								</div>

								<div className="space-y-4">
									<h3 className="font-semibold">Recent Requests</h3>
									{requests.slice(0, 5).map((request) => (
										<div
											key={request.id}
											className="flex items-center justify-between p-4 border rounded-lg"
										>
											<div>
												<p className="font-medium">{request.serialNumber}</p>
												<p className="text-sm text-muted-foreground">
													{request.itemName}
												</p>
											</div>
											<div className="text-right">
												{getStatusBadge(request.status)}
												<p className="text-xs text-muted-foreground mt-1">
													{new Date(request.updatedAt).toLocaleDateString()}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
