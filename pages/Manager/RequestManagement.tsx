"use client";

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
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Search, Filter } from "lucide-react";

const requests = [
	{
		id: "REQ001",
		department: "IT Department",
		item: "Laptops",
		quantity: 5,
		value: "$12,500",
		status: "Pending",
		priority: "High",
		requestDate: "2024-01-15",
		requester: "John Doe",
	},
	{
		id: "REQ002",
		department: "HR Department",
		item: "Office Chairs",
		quantity: 10,
		value: "$2,500",
		status: "Approved",
		priority: "Medium",
		requestDate: "2024-01-14",
		requester: "Jane Smith",
	},
	{
		id: "REQ003",
		department: "Finance",
		item: "Printer Paper",
		quantity: 50,
		value: "$450",
		status: "Rejected",
		priority: "Low",
		requestDate: "2024-01-13",
		requester: "Bob Johnson",
	},
];

export default function RequestManagement() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("All");

	const filteredRequests = requests.filter(
		(request) =>
			request.item.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedStatus === "All" || request.status === selectedStatus)
	);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Approved":
				return "bg-green-100 text-green-800";
			case "Rejected":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "High":
				return "bg-red-100 text-red-800";
			case "Medium":
				return "bg-yellow-100 text-yellow-800";
			case "Low":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Request Management</h1>
				<Button size="sm">Generate Report</Button>
			</div>

			<Tabs defaultValue="all" className="space-y-4">
				<TabsList>
					<TabsTrigger value="all">All Requests</TabsTrigger>
					<TabsTrigger value="pending">Pending</TabsTrigger>
					<TabsTrigger value="approved">Approved</TabsTrigger>
					<TabsTrigger value="rejected">Rejected</TabsTrigger>
				</TabsList>

				{/* Search and Filter */}
				<Card>
					<CardContent className="p-4">
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search requests..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>
							<div className="flex gap-2">
								<select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
									className="px-3 py-2 border rounded-md"
								>
									<option value="All">All Status</option>
									<option value="Pending">Pending</option>
									<option value="Approved">Approved</option>
									<option value="Rejected">Rejected</option>
								</select>
								<Button variant="outline" size="sm">
									<Filter className="h-4 w-4 mr-2" />
									Filter
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<TabsContent value="all" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>All Requests ({filteredRequests.length})</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b">
											<th className="text-left p-3">Request ID</th>
											<th className="text-left p-3">Department</th>
											<th className="text-left p-3">Item</th>
											<th className="text-left p-3">Quantity</th>
											<th className="text-left p-3">Value</th>
											<th className="text-left p-3">Priority</th>
											<th className="text-left p-3">Status</th>
											<th className="text-left p-3">Requester</th>
											<th className="text-left p-3">Date</th>
											<th className="text-left p-3">Actions</th>
										</tr>
									</thead>
									<tbody>
										{filteredRequests.map((request) => (
											<tr
												key={request.id}
												className="border-b hover:bg-muted/50"
											>
												<td className="p-3 font-medium">{request.id}</td>
												<td className="p-3">{request.department}</td>
												<td className="p-3">{request.item}</td>
												<td className="p-3">{request.quantity}</td>
												<td className="p-3">{request.value}</td>
												<td className="p-3">
													<Badge className={getPriorityColor(request.priority)}>
														{request.priority}
													</Badge>
												</td>
												<td className="p-3">
													<Badge className={getStatusColor(request.status)}>
														{request.status}
													</Badge>
												</td>
												<td className="p-3">{request.requester}</td>
												<td className="p-3 text-sm text-muted-foreground">
													{request.requestDate}
												</td>
												<td className="p-3">
													<div className="flex space-x-1">
														<Button variant="ghost" size="sm">
															<Eye className="h-4 w-4" />
														</Button>
														{request.status === "Pending" && (
															<>
																<Button
																	variant="ghost"
																	size="sm"
																	className="text-green-600 hover:text-green-700"
																>
																	<CheckCircle className="h-4 w-4" />
																</Button>
																<Button
																	variant="ghost"
																	size="sm"
																	className="text-red-600 hover:text-red-700"
																>
																	<XCircle className="h-4 w-4" />
																</Button>
															</>
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
				</TabsContent>

				<TabsContent value="pending">
					<Card>
						<CardHeader>
							<CardTitle>Pending Requests</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{filteredRequests
									.filter((r) => r.status === "Pending")
									.map((request) => (
										<div
											key={request.id}
											className="flex items-center justify-between p-4 border rounded-lg"
										>
											<div className="flex-1">
												<div className="font-medium">{request.item}</div>
												<div className="text-sm text-muted-foreground">
													{request.department} • Qty: {request.quantity} •{" "}
													{request.value}
												</div>
												<div className="text-xs text-muted-foreground">
													Requested by {request.requester} on{" "}
													{request.requestDate}
												</div>
											</div>
											<div className="flex items-center space-x-2">
												<Badge className={getPriorityColor(request.priority)}>
													{request.priority}
												</Badge>
												<div className="flex space-x-1">
													<Button
														size="sm"
														className="text-green-600 hover:text-green-700"
													>
														<CheckCircle className="h-4 w-4 mr-1" />
														Approve
													</Button>
													<Button
														size="sm"
														variant="outline"
														className="text-red-600 hover:text-red-700 bg-transparent"
													>
														<XCircle className="h-4 w-4 mr-1" />
														Reject
													</Button>
												</div>
											</div>
										</div>
									))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
