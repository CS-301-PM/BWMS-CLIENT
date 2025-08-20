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
import { Textarea } from "@/components/ui/textarea";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Truck,
	Package,
	FileText,
	Clock,
	CheckCircle,
	AlertCircle,
	LogOut,
	Settings,
	Plus,
} from "lucide-react";

type SupplierPage = "dashboard" | "submit" | "track" | "history";

// Mock data for demonstration
const mockDeliveries = [
	{
		id: "1",
		deliveryId: "DEL001",
		itemName: "Office Chairs",
		quantity: 50,
		unit: "pcs",
		deliveryDate: "2024-01-15",
		status: "delivered",
		receiptId: "RCP001",
		notes: "All items in good condition",
	},
	{
		id: "2",
		deliveryId: "DEL002",
		itemName: "Desk Lamps",
		quantity: 25,
		unit: "pcs",
		deliveryDate: "2024-01-16",
		status: "pending",
		receiptId: "RCP002",
		notes: "Awaiting quality check",
	},
	{
		id: "3",
		deliveryId: "DEL003",
		itemName: "Printer Paper",
		quantity: 100,
		unit: "box",
		deliveryDate: "2024-01-14",
		status: "confirmed",
		receiptId: "RCP003",
		notes: "Received and stored",
	},
	{
		id: "4",
		deliveryId: "DEL004",
		itemName: "Computer Monitors",
		quantity: 15,
		unit: "pcs",
		deliveryDate: "2024-01-13",
		status: "rejected",
		receiptId: "RCP004",
		notes: "Quality issues - returned",
	},
];

export function SupplierDashboard() {
	const { user, logout } = useAuth();
	const [activePage, setActivePage] = useState<SupplierPage>("dashboard");
	const [newDelivery, setNewDelivery] = useState({
		itemName: "",
		quantity: "",
		unit: "",
		deliveryDate: "",
		vehicleNumber: "",
		driverName: "",
		notes: "",
	});

	const getUserInitials = () => {
		if (!user) return "U";
		return (
			`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
			"U"
		);
	};

	const handleSubmitDelivery = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("[v0] Submitting new delivery:", newDelivery);
		// API call would go here
		setNewDelivery({
			itemName: "",
			quantity: "",
			unit: "",
			deliveryDate: "",
			vehicleNumber: "",
			driverName: "",
			notes: "",
		});
		// Show success message and redirect to track page
		setActivePage("track");
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "delivered":
			case "confirmed":
				return "default";
			case "pending":
				return "secondary";
			case "rejected":
				return "destructive";
			default:
				return "secondary";
		}
	};

	const renderDashboard = () => (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Deliveries
						</CardTitle>
						<Truck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">156</div>
						<p className="text-xs text-muted-foreground">
							+12% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Confirmation
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">8</div>
						<p className="text-xs text-muted-foreground">Awaiting processing</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Confirmed Deliveries
						</CardTitle>
						<CheckCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">142</div>
						<p className="text-xs text-muted-foreground">
							Successfully processed
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Rejected Items
						</CardTitle>
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">6</div>
						<p className="text-xs text-muted-foreground">Quality issues</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Deliveries</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Delivery ID</TableHead>
								<TableHead>Item Name</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Delivery Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Receipt ID</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockDeliveries.slice(0, 5).map((delivery) => (
								<TableRow key={delivery.id}>
									<TableCell className="font-medium">
										{delivery.deliveryId}
									</TableCell>
									<TableCell>{delivery.itemName}</TableCell>
									<TableCell>
										{delivery.quantity} {delivery.unit}
									</TableCell>
									<TableCell>{delivery.deliveryDate}</TableCell>
									<TableCell>
										<Badge variant={getStatusColor(delivery.status)}>
											{delivery.status}
										</Badge>
									</TableCell>
									<TableCell>{delivery.receiptId}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);

	const renderSubmitDelivery = () => (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Submit Delivery Record</CardTitle>
					<p className="text-sm text-muted-foreground">
						Enter the details of goods delivered to the central stores
					</p>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmitDelivery} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="itemName">Item Name *</Label>
								<Input
									id="itemName"
									value={newDelivery.itemName}
									onChange={(e) =>
										setNewDelivery({ ...newDelivery, itemName: e.target.value })
									}
									placeholder="Office Chairs"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="quantity">Quantity *</Label>
								<Input
									id="quantity"
									type="number"
									value={newDelivery.quantity}
									onChange={(e) =>
										setNewDelivery({ ...newDelivery, quantity: e.target.value })
									}
									placeholder="50"
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="unit">Unit *</Label>
								<Select
									value={newDelivery.unit}
									onValueChange={(value) =>
										setNewDelivery({ ...newDelivery, unit: value })
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
										<SelectItem value="set">Set</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="deliveryDate">Delivery Date *</Label>
								<Input
									id="deliveryDate"
									type="date"
									value={newDelivery.deliveryDate}
									onChange={(e) =>
										setNewDelivery({
											...newDelivery,
											deliveryDate: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="vehicleNumber">Vehicle Number</Label>
								<Input
									id="vehicleNumber"
									value={newDelivery.vehicleNumber}
									onChange={(e) =>
										setNewDelivery({
											...newDelivery,
											vehicleNumber: e.target.value,
										})
									}
									placeholder="ABC-1234"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="driverName">Driver Name</Label>
								<Input
									id="driverName"
									value={newDelivery.driverName}
									onChange={(e) =>
										setNewDelivery({
											...newDelivery,
											driverName: e.target.value,
										})
									}
									placeholder="John Doe"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="notes">Delivery Notes</Label>
							<Textarea
								id="notes"
								value={newDelivery.notes}
								onChange={(e) =>
									setNewDelivery({ ...newDelivery, notes: e.target.value })
								}
								placeholder="Additional notes about the delivery..."
								rows={3}
							/>
						</div>

						<Button type="submit" className="w-full">
							<Plus className="mr-2 h-4 w-4" />
							Submit Delivery Record
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);

	const renderTrackDeliveries = () => (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Track Submitted Deliveries</CardTitle>
					<p className="text-sm text-muted-foreground">
						Monitor the status of your submitted delivery records
					</p>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Delivery ID</TableHead>
								<TableHead>Item Name</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Delivery Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Receipt ID</TableHead>
								<TableHead>Notes</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockDeliveries.map((delivery) => (
								<TableRow key={delivery.id}>
									<TableCell className="font-medium">
										{delivery.deliveryId}
									</TableCell>
									<TableCell>{delivery.itemName}</TableCell>
									<TableCell>
										{delivery.quantity} {delivery.unit}
									</TableCell>
									<TableCell>{delivery.deliveryDate}</TableCell>
									<TableCell>
										<Badge variant={getStatusColor(delivery.status)}>
											{delivery.status}
										</Badge>
									</TableCell>
									<TableCell>{delivery.receiptId}</TableCell>
									<TableCell className="max-w-xs truncate">
										{delivery.notes}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);

	const renderDeliveryHistory = () => (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Delivery History</CardTitle>
					<p className="text-sm text-muted-foreground">
						Complete history of all your deliveries
					</p>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex gap-4">
							<Input placeholder="Search deliveries..." className="max-w-sm" />
							<Select defaultValue="all">
								<SelectTrigger className="w-40">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="delivered">Delivered</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="confirmed">Confirmed</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Delivery ID</TableHead>
									<TableHead>Item Name</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Delivery Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Receipt ID</TableHead>
									<TableHead>Notes</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{mockDeliveries.map((delivery) => (
									<TableRow key={delivery.id}>
										<TableCell className="font-medium">
											{delivery.deliveryId}
										</TableCell>
										<TableCell>{delivery.itemName}</TableCell>
										<TableCell>
											{delivery.quantity} {delivery.unit}
										</TableCell>
										<TableCell>{delivery.deliveryDate}</TableCell>
										<TableCell>
											<Badge variant={getStatusColor(delivery.status)}>
												{delivery.status}
											</Badge>
										</TableCell>
										<TableCell>{delivery.receiptId}</TableCell>
										<TableCell className="max-w-xs truncate">
											{delivery.notes}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);

	const renderActivePage = () => {
		switch (activePage) {
			case "dashboard":
				return renderDashboard();
			case "submit":
				return renderSubmitDelivery();
			case "track":
				return renderTrackDeliveries();
			case "history":
				return renderDeliveryHistory();
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
							Management System - Supplier Portal
						</p>
					</div>

					<div className="flex items-center gap-4">
						{user && (
							<>
								<div className="text-right">
									<p className="text-sm font-medium">
										{user.firstName} {user.lastName}
									</p>
									<p className="text-xs text-muted-foreground">Supplier</p>
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
										<DropdownMenuItem>
											<Settings className="mr-2 h-4 w-4" />
											<span>Profile Settings</span>
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
							variant={activePage === "submit" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("submit")}
						>
							<Plus className="mr-2 h-4 w-4" />
							Submit Delivery
						</Button>
						<Button
							variant={activePage === "track" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("track")}
						>
							<Truck className="mr-2 h-4 w-4" />
							Track Deliveries
						</Button>
						<Button
							variant={activePage === "history" ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => setActivePage("history")}
						>
							<FileText className="mr-2 h-4 w-4" />
							Delivery History
						</Button>
					</div>
				</nav>

				<main className="flex-1 p-6">{renderActivePage()}</main>
			</div>
		</div>
	);
}
