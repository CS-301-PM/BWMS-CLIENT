"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
	Check,
	X,
	FileText,
	Truck,
	Shield,
	Hash,
	Clock,
	User,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { Delivery, BlockchainLog } from "../../types";

export function ReceiptManagement() {
	const [deliveries, setDeliveries] = useState<Delivery[]>([]);
	const [blockchainLogs, setBlockchainLogs] = useState<BlockchainLog[]>([]);
	const [isProcessing, setIsProcessing] = useState<string | null>(null);

	const mockDeliveries: Delivery[] = [
		{
			id: "1",
			serialNumber: "DEL-001",
			itemName: "Office Supplies",
			value: 250.0,
			unit: "pcs",
			weight: 5.2,
			supplierId: "SUP-001",
			supplierName: "ABC Supplies Co.",
			deliveryId: "DLV-2024-001",
			receiptId: "RCP-2024-001",
			status: "Pending",
			deliveredAt: "2024-01-15T10:30:00Z",
		},
		{
			id: "2",
			serialNumber: "DEL-002",
			itemName: "Cleaning Materials",
			value: 180.5,
			unit: "liters",
			weight: 12.8,
			supplierId: "SUP-002",
			supplierName: "CleanPro Ltd.",
			deliveryId: "DLV-2024-002",
			receiptId: "RCP-2024-002",
			status: "Received",
			deliveredAt: "2024-01-16T09:15:00Z",
			confirmedAt: "2024-01-16T14:20:00Z",
		},
		{
			id: "3",
			serialNumber: "DEL-003",
			itemName: "Computer Equipment",
			value: 1200.0,
			unit: "units",
			weight: 8.5,
			supplierId: "SUP-003",
			supplierName: "TechWorld Inc.",
			deliveryId: "DLV-2024-003",
			receiptId: "RCP-2024-003",
			status: "Declined",
			deliveredAt: "2024-01-17T11:45:00Z",
			confirmedAt: "2024-01-17T16:30:00Z",
		},
		{
			id: "4",
			serialNumber: "DEL-004",
			itemName: "Safety Equipment",
			value: 450.0,
			unit: "sets",
			weight: 15.3,
			supplierId: "SUP-001",
			supplierName: "ABC Supplies Co.",
			deliveryId: "DLV-2024-004",
			receiptId: "RCP-2024-004",
			status: "Confirmed",
			deliveredAt: "2024-01-18T14:20:00Z",
			confirmedAt: "2024-01-18T15:45:00Z",
		},
	];

	const mockBlockchainLogs: BlockchainLog[] = [
		{
			id: "1",
			serialNumber: "DEL-002",
			itemName: "Cleaning Materials",
			timeApplied: "2024-01-16T14:20:00Z",
			hash: "0x1a2b3c4d5e6f7890abcdef1234567890",
			action: "Confirmed",
			user: "Warehouse Manager",
			userId: "mgr-001",
			transactionId: "tx-blockchain-001",
		},
		{
			id: "2",
			serialNumber: "DEL-003",
			itemName: "Computer Equipment",
			timeApplied: "2024-01-17T16:30:00Z",
			hash: "0x2b3c4d5e6f7890abcdef1234567890ab",
			action: "Declined",
			user: "Quality Inspector",
			userId: "qc-001",
			transactionId: "tx-blockchain-002",
		},
		{
			id: "3",
			serialNumber: "DEL-004",
			itemName: "Safety Equipment",
			timeApplied: "2024-01-18T15:45:00Z",
			hash: "0x3c4d5e6f7890abcdef1234567890abcd",
			action: "Confirmed",
			user: "Warehouse Manager",
			userId: "mgr-001",
			transactionId: "tx-blockchain-003",
		},
	];

	useEffect(() => {
		fetchDeliveries();
		fetchBlockchainLogs();
	}, []);

	const fetchDeliveries = async () => {
		try {
			// const response = await fetch('/api/deliveries')
			// const data: ApiResponse<Delivery[]> = await response.json()
			// if (data.success) {
			//   setDeliveries(data.data)
			// }
			console.log("[v0] Fetching deliveries from API");
			setDeliveries(mockDeliveries);
		} catch (error) {
			console.error("[v0] Error fetching deliveries:", error);
		}
	};

	const fetchBlockchainLogs = async () => {
		try {
			// const response = await fetch('/api/blockchain/delivery-logs')
			// const data: ApiResponse<BlockchainLog[]> = await response.json()
			// if (data.success) {
			//   setBlockchainLogs(data.data)
			// }
			console.log("[v0] Fetching blockchain logs from API");
			setBlockchainLogs(mockBlockchainLogs);
		} catch (error) {
			console.error("[v0] Error fetching blockchain logs:", error);
		}
	};

	const generateBlockchainHash = () => {
		const timestamp = Date.now();
		const random = Math.random().toString(36).substring(2, 15);
		return `0x${timestamp.toString(16)}${random}`;
	};

	const logToBlockchain = async (
		delivery: Delivery,
		action: "Confirmed" | "Declined"
	) => {
		try {
			const blockchainData: Partial<BlockchainLog> = {
				serialNumber: delivery.serialNumber,
				itemName: delivery.itemName,
				timeApplied: new Date().toISOString(),
				hash: generateBlockchainHash(),
				action: action,
				user: "Current User", // Replace with actual user name
				userId: "current-user-id", // Replace with actual user ID
				transactionId: `tx-blockchain-${Date.now()}`,
			};

			// const response = await fetch('/api/blockchain/log', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(blockchainData),
			// })

			console.log("[v0] Logging to blockchain:", blockchainData);

			const { id, ...restBlockchainData } = blockchainData as BlockchainLog;
			const newLog: BlockchainLog = {
				id: Date.now().toString(),
				...restBlockchainData,
			};

			setBlockchainLogs((prev) => [newLog, ...prev]);
			return newLog;
		} catch (error) {
			console.error("[v0] Error logging to blockchain:", error);
			throw error;
		}
	};

	const handleConfirmDelivery = async (delivery: Delivery) => {
		setIsProcessing(delivery.id);

		try {
			// Update delivery status
			const updatedDelivery: Delivery = {
				...delivery,
				status: "Confirmed",
				confirmedAt: new Date().toISOString(),
			};

			// const response = await fetch(`/api/deliveries/${delivery.id}/confirm`, {
			//   method: 'PATCH',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ confirmedAt: updatedDelivery.confirmedAt }),
			// })

			console.log("[v0] Confirming delivery:", delivery.id);

			// Log to blockchain
			await logToBlockchain(delivery, "Confirmed");

			// Update local state
			setDeliveries((prev) =>
				prev.map((d) => (d.id === delivery.id ? updatedDelivery : d))
			);
		} catch (error) {
			console.error("[v0] Error confirming delivery:", error);
		} finally {
			setIsProcessing(null);
		}
	};

	const handleDeclineDelivery = async (delivery: Delivery) => {
		setIsProcessing(delivery.id);

		try {
			// Update delivery status
			const updatedDelivery: Delivery = {
				...delivery,
				status: "Declined",
				confirmedAt: new Date().toISOString(),
			};

			// const response = await fetch(`/api/deliveries/${delivery.id}/decline`, {
			//   method: 'PATCH',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ confirmedAt: updatedDelivery.confirmedAt }),
			// })

			console.log("[v0] Declining delivery:", delivery.id);

			// Log to blockchain
			await logToBlockchain(delivery, "Declined");

			// Update local state
			setDeliveries((prev) =>
				prev.map((d) => (d.id === delivery.id ? updatedDelivery : d))
			);
		} catch (error) {
			console.error("[v0] Error declining delivery:", error);
		} finally {
			setIsProcessing(null);
		}
	};

	const getStatusBadge = (status: Delivery["status"]) => {
		switch (status) {
			case "Confirmed":
				return (
					<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
						Confirmed
					</Badge>
				);
			case "Received":
				return (
					<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
						Received
					</Badge>
				);
			case "Declined":
				return (
					<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
						Declined
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

	const getActionBadge = (action: BlockchainLog["action"]) => {
		switch (action) {
			case "Confirmed":
				return (
					<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
						Confirmed
					</Badge>
				);
			case "Declined":
				return (
					<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
						Declined
					</Badge>
				);
			case "Delivered":
				return (
					<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
						Delivered
					</Badge>
				);
			default:
				return <Badge variant="secondary">{action}</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<FileText className="w-6 h-6" />
				<h2 className="text-2xl font-bold">Receipt Management</h2>
			</div>

			<Tabs defaultValue="deliveries" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="deliveries" className="flex items-center gap-2">
						<Truck className="w-4 h-4" />
						Confirm Deliveries
					</TabsTrigger>
					<TabsTrigger value="blockchain" className="flex items-center gap-2">
						<Shield className="w-4 h-4" />
						Blockchain Log
					</TabsTrigger>
				</TabsList>

				<TabsContent value="deliveries" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Truck className="w-5 h-5" />
								Confirm Deliveries
							</CardTitle>
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
										<TableHead>Supplier</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Confirmation</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{deliveries.map((delivery) => (
										<TableRow key={delivery.id}>
											<TableCell className="font-medium">
												{delivery.serialNumber}
											</TableCell>
											<TableCell>{delivery.itemName}</TableCell>
											<TableCell>${delivery.value.toFixed(2)}</TableCell>
											<TableCell>{delivery.unit}</TableCell>
											<TableCell>{delivery.weight} kg</TableCell>
											<TableCell>{delivery.supplierName}</TableCell>
											<TableCell>{getStatusBadge(delivery.status)}</TableCell>
											<TableCell>
												{delivery.status === "Pending" ? (
													<div className="flex items-center gap-2">
														<AlertDialog>
															<AlertDialogTrigger asChild>
																<Button
																	size="sm"
																	variant="outline"
																	className="text-green-600 hover:text-green-700 bg-transparent"
																	disabled={isProcessing === delivery.id}
																>
																	<Check className="w-4 h-4" />
																</Button>
															</AlertDialogTrigger>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>
																		Confirm Delivery
																	</AlertDialogTitle>
																	<AlertDialogDescription>
																		Are you sure you want to confirm the
																		delivery of "{delivery.itemName}"? This
																		action will be logged to the blockchain and
																		cannot be undone.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Cancel</AlertDialogCancel>
																	<AlertDialogAction
																		onClick={() =>
																			handleConfirmDelivery(delivery)
																		}
																	>
																		Confirm
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														</AlertDialog>

														<AlertDialog>
															<AlertDialogTrigger asChild>
																<Button
																	size="sm"
																	variant="outline"
																	className="text-red-600 hover:text-red-700 bg-transparent"
																	disabled={isProcessing === delivery.id}
																>
																	<X className="w-4 h-4" />
																</Button>
															</AlertDialogTrigger>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>
																		Decline Delivery
																	</AlertDialogTitle>
																	<AlertDialogDescription>
																		Are you sure you want to decline the
																		delivery of "{delivery.itemName}"? This
																		action will be logged to the blockchain and
																		cannot be undone.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>Cancel</AlertDialogCancel>
																	<AlertDialogAction
																		onClick={() =>
																			handleDeclineDelivery(delivery)
																		}
																	>
																		Decline
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														</AlertDialog>
													</div>
												) : (
													<div className="flex items-center gap-2 text-sm text-muted-foreground">
														<Clock className="w-4 h-4" />
														{delivery.confirmedAt &&
															new Date(
																delivery.confirmedAt
															).toLocaleDateString()}
													</div>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="blockchain" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5" />
								Blockchain Transaction Log
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Serial #</TableHead>
										<TableHead>Item Name</TableHead>
										<TableHead>Time Applied</TableHead>
										<TableHead>Hash</TableHead>
										<TableHead>Action</TableHead>
										<TableHead>User</TableHead>
										<TableHead>Transaction ID</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{blockchainLogs.map((log) => (
										<TableRow key={log.id}>
											<TableCell className="font-medium">
												{log.serialNumber}
											</TableCell>
											<TableCell>{log.itemName}</TableCell>
											<TableCell>
												{new Date(log.timeApplied).toLocaleString()}
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<Hash className="w-4 h-4 text-muted-foreground" />
													<code className="text-xs font-mono bg-muted px-2 py-1 rounded">
														{log.hash.substring(0, 16)}...
													</code>
												</div>
											</TableCell>
											<TableCell>{getActionBadge(log.action)}</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<User className="w-4 h-4 text-muted-foreground" />
													{log.user}
												</div>
											</TableCell>
											<TableCell>
												<code className="text-xs font-mono bg-muted px-2 py-1 rounded">
													{log.transactionId}
												</code>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Blockchain Integration Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="flex items-center gap-3 p-4 border rounded-lg">
									<div className="w-3 h-3 bg-green-500 rounded-full" />
									<div>
										<p className="font-medium">Blockchain Network</p>
										<p className="text-sm text-muted-foreground">Connected</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-4 border rounded-lg">
									<div className="w-3 h-3 bg-green-500 rounded-full" />
									<div>
										<p className="font-medium">Smart Contract</p>
										<p className="text-sm text-muted-foreground">Active</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-4 border rounded-lg">
									<div className="w-3 h-3 bg-blue-500 rounded-full" />
									<div>
										<p className="font-medium">Gas Price</p>
										<p className="text-sm text-muted-foreground">12 Gwei</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
