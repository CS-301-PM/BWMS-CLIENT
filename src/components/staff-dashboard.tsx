"use client";

import type React from "react";

import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Package,
	Plus,
	Eye,
	MapPin,
	AlertTriangle,
	CheckCircle,
	FileText,
	Clock,
	LogOut,
	Settings,
} from "lucide-react";

type StaffPage = "dashboard" | "stock" | "requests" | "reports" | "profile";

// Mock data for demonstration
const mockStockItems = [
	{
		id: "1",
		serialNo: "ST001",
		name: "Office Chair",
		value: 150,
		unit: "pcs",
		weight: 12,
		location: "A1-01",
		status: "available",
	},
	{
		id: "2",
		serialNo: "ST002",
		name: "Desk Lamp",
		value: 45,
		unit: "pcs",
		weight: 2,
		location: "B2-03",
		status: "available",
	},
	{
		id: "3",
		serialNo: "ST003",
		name: "Printer Paper",
		value: 25,
		unit: "box",
		weight: 5,
		location: "C1-05",
		status: "low",
	},
];

const mockRequests = [
	{
		id: "1",
		serialNo: "REQ001",
		itemName: "Office Chair",
		quantity: 2,
		unit: "pcs",
		status: "approved",
		requestDate: "2024-01-15",
		department: "HR",
	},
	{
		id: "2",
		serialNo: "REQ002",
		itemName: "Desk Lamp",
		quantity: 5,
		unit: "pcs",
		status: "pending",
		requestDate: "2024-01-16",
		department: "IT",
	},
	{
		id: "3",
		serialNo: "REQ003",
		itemName: "Printer Paper",
		quantity: 10,
		unit: "box",
		status: "rejected",
		requestDate: "2024-01-14",
		department: "Finance",
	},
];

export function StaffDashboard() {
	const { user, logout } = useAuth();
	const [activePage, setActivePage] = useState<StaffPage>("dashboard");
	const [newStockItem, setNewStockItem] = useState({
		serialNo: "",
		name: "",
		value: "",
		unit: "",
		weight: "",
		location: "",
	});
	const [newRequest, setNewRequest] = useState({
		itemName: "",
		quantity: "",
		unit: "",
		justification: "",
	});

	const isCentralStaff = user?.role === "staff-central";
	const isDepartmentStaff = user?.role === "staff-department";

	const getUserInitials = () => {
		if (!user) return "U";
		return (
			`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
			"U"
		);
	};

	const getRoleDisplay = () => {
		if (!user) return "Staff";
		return isCentralStaff ? "Central Store Staff" : "Department Staff";
	};

	const handleAddStock = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("[v0] Adding new stock item:", newStockItem);
		// API call would go here
		setNewStockItem({
			serialNo: "",
			name: "",
			value: "",
			unit: "",
			weight: "",
			location: "",
		});
	};

	const handleSubmitRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("[v0] Submitting new request:", newRequest);
		// API call would go here
		setNewRequest({ itemName: "", quantity: "", unit: "", justification: "" });
	};

	const renderDashboard = () => (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{isCentralStaff ? "Total Stock Items" : "My Requests"}
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isCentralStaff ? "1,234" : "12"}
						</div>
						<p className="text-xs text-muted-foreground">
							{isCentralStaff ? "+5% from last month" : "3 pending approval"}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{isCentralStaff ? "Pending Requests" : "Approved Requests"}
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isCentralStaff ? "23" : "8"}
						</div>
						<p className="text-xs text-muted-foreground">
							{isCentralStaff ? "Awaiting processing" : "Ready for collection"}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{isCentralStaff ? "Low Stock Alerts" : "Request Status"}
						</CardTitle>
						<AlertTriangle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isCentralStaff ? "7" : "Active"}
						</div>
						<p className="text-xs text-muted-foreground">
							{isCentralStaff
								? "Items need restocking"
								: "All systems operational"}
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						{isCentralStaff ? "Recent Stock Activities" : "Recent Requests"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Serial #</TableHead>
								<TableHead>Item Name</TableHead>
								<TableHead>
									{isCentralStaff ? "Location" : "Quantity"}
								</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{(isCentralStaff ? mockStockItems : mockRequests)
								.slice(0, 5)
								.map((item) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">
											{item.serialNo}
										</TableCell>
										<TableCell>
											{"name" in item ? item.name : item.itemName}
										</TableCell>
										<TableCell>
											{isCentralStaff
												? "location" in item
													? item.location
													: ""
												: "quantity" in item
												? `${item.quantity} ${item.unit || "pcs"}`
												: ""}
										</TableCell>
										<TableCell>
											<Badge
												variant={
													item.status === "approved" ||
													item.status === "available"
														? "default"
														: item.status === "pending" || item.status === "low"
														? "secondary"
														: "destructive"
												}
											>
												{item.status}
											</Badge>
										</TableCell>
										<TableCell>
											{"requestDate" in item ? item.requestDate : ""}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);

	const renderStockManagement = () => (
		<div className="space-y-6">
			{isCentralStaff && (
				<Card>
					<CardHeader>
						<CardTitle>Add New Stock Item</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleAddStock} className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="serialNo">Serial Number</Label>
								<Input
									id="serialNo"
									value={newStockItem.serialNo}
									onChange={(e) =>
										setNewStockItem({
											...newStockItem,
											serialNo: e.target.value,
										})
									}
									placeholder="ST001"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="name">Item Name</Label>
								<Input
									id="name"
									value={newStockItem.name}
									onChange={(e) =>
										setNewStockItem({ ...newStockItem, name: e.target.value })
									}
									placeholder="Office Chair"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="value">Value</Label>
								<Input
									id="value"
									type="number"
									value={newStockItem.value}
									onChange={(e) =>
										setNewStockItem({ ...newStockItem, value: e.target.value })
									}
									placeholder="150"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="unit">Unit</Label>
								<Input
									id="unit"
									value={newStockItem.unit}
									onChange={(e) =>
										setNewStockItem({ ...newStockItem, unit: e.target.value })
									}
									placeholder="pcs"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="weight">Weight</Label>
								<Input
									id="weight"
									type="number"
									value={newStockItem.weight}
									onChange={(e) =>
										setNewStockItem({ ...newStockItem, weight: e.target.value })
									}
									placeholder="12"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input
									id="location"
									value={newStockItem.location}
									onChange={(e) =>
										setNewStockItem({
											...newStockItem,
											location: e.target.value,
										})
									}
									placeholder="A1-01"
									required
								/>
							</div>
							<div className="col-span-2">
								<Button type="submit" className="w-full">
									<Plus className="mr-2 h-4 w-4" />
									Add Stock Item
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Stock Items</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Serial #</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Value</TableHead>
								<TableHead>Unit</TableHead>
								<TableHead>Weight</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Status</TableHead>
								{isCentralStaff && <TableHead>Actions</TableHead>}
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockStockItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium">{item.serialNo}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>${item.value}</TableCell>
									<TableCell>{item.unit}</TableCell>
									<TableCell>{item.weight}kg</TableCell>
									<TableCell>{item.location}</TableCell>
									<TableCell>
										<Badge
											variant={
												item.status === "available" ? "default" : "secondary"
											}
										>
											{item.status}
										</Badge>
									</TableCell>
									{isCentralStaff && (
										<TableCell>
											<div className="flex gap-2">
												<Button size="sm" variant="outline">
													<MapPin className="h-4 w-4" />
												</Button>
												<Button size="sm" variant="outline">
													<AlertTriangle className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);

	const renderRequests = () => (
		<div className="space-y-6">
			{isDepartmentStaff && (
				<Card>
					<CardHeader>
						<CardTitle>Submit New Request</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmitRequest} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="itemName">Item Name</Label>
									<Input
										id="itemName"
										value={newRequest.itemName}
										onChange={(e) =>
											setNewRequest({ ...newRequest, itemName: e.target.value })
										}
										placeholder="Office Chair"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="quantity">Quantity</Label>
									<Input
										id="quantity"
										type="number"
										value={newRequest.quantity}
										onChange={(e) =>
											setNewRequest({ ...newRequest, quantity: e.target.value })
										}
										placeholder="2"
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="unit">Unit</Label>
								<Select
									value={newRequest.unit}
									onValueChange={(value) =>
										setNewRequest({ ...newRequest, unit: value })
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select unit" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pcs">Pieces</SelectItem>
										<SelectItem value="box">Box</SelectItem>
										<SelectItem value="kg">Kilograms</SelectItem>
										<SelectItem value="ltr">Liters</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="justification">Justification</Label>
								<Input
									id="justification"
									value={newRequest.justification}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											justification: e.target.value,
										})
									}
									placeholder="Required for new employee workstation"
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								<FileText className="mr-2 h-4 w-4" />
								Submit Request
							</Button>
						</form>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>
						{isCentralStaff ? "Process Requests" : "My Requests"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Request #</TableHead>
								<TableHead>Item Name</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date</TableHead>
								{isCentralStaff && <TableHead>Actions</TableHead>}
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockRequests.map((request) => (
								<TableRow key={request.id}>
									<TableCell className="font-medium">
										{request.serialNo}
									</TableCell>
									<TableCell>{request.itemName}</TableCell>
									<TableCell>{request.quantity}</TableCell>
									<TableCell>{request.department}</TableCell>
									<TableCell>
										<Badge
											variant={
												request.status === "approved"
													? "default"
													: request.status === "pending"
													? "secondary"
													: "destructive"
											}
										>
											{request.status}
										</Badge>
									</TableCell>
									<TableCell>{request.requestDate}</TableCell>
									{isCentralStaff && (
										<TableCell>
											<div className="flex gap-2">
												<Button size="sm" variant="outline">
													<CheckCircle className="h-4 w-4" />
												</Button>
												<Button size="sm" variant="outline">
													<Eye className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);

	const renderActivePage = () => {
		switch (activePage) {
			case "dashboard":
				return renderDashboard();
			case "stock":
				return renderStockManagement();
			case "requests":
				return renderRequests();
			default:
				return renderDashboard();
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b bg-card px-6 py-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold text-foreground">
							CENTRAL STORES
						</h1>
						<p className="text-sm text-muted-foreground">
							Management System - {getRoleDisplay()}
						</p>
					</div>

					<div className="flex items-center gap-4">
						{user && (
							<>
								<div className="text-right">
									<p className="text-sm font-medium">
										{user.firstName} {user.lastName}
									</p>
									<p className="text-xs text-muted-foreground">
										{getRoleDisplay()}
									</p>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="relative h-10 w-10 rounded-full"
										>
											<Avatar className="h-10 w-10">
												<AvatarFallback className="bg-primary text-primary-foreground">
													{getUserInitials()}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="end" forceMount>
										<div className="flex items-center justify-start gap-2 p-2">
											<div className="flex flex-col space-y-1 leading-none">
												<p className="font-medium">
													{user.firstName} {user.lastName}
												</p>
												<p className="w-[200px] truncate text-sm text-muted-foreground">
													{user.email}
												</p>
											</div>
										</div>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => setActivePage("profile")}>
											<Settings className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={logout} className="text-red-600">
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
						)}
					</div>
				</div>
			</header>

			<div className="flex">
				<nav className="w-64 border-r bg-card p-4">
					<div className="space-y-2">
						<Button
							variant={activePage === "dashboard" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("dashboard")}
						>
							<Package className="mr-2 h-4 w-4" />
							Dashboard
						</Button>
						<Button
							variant={activePage === "stock" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("stock")}
						>
							<Eye className="mr-2 h-4 w-4" />
							{isCentralStaff ? "Manage Stock" : "View Stock"}
						</Button>
						<Button
							variant={activePage === "requests" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("requests")}
						>
							<FileText className="mr-2 h-4 w-4" />
							{isCentralStaff ? "Process Requests" : "My Requests"}
						</Button>
					</div>
				</nav>

				<main className="flex-1 p-6">{renderActivePage()}</main>
			</div>
		</div>
	);
}
