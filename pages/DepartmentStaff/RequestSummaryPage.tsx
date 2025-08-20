"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, Send, FileText } from "lucide-react";

interface NewRequest {
	itemName: string;
	quantity: number;
	unit: string;
	priority: "low" | "medium" | "high" | "urgent";
	reason: string;
	justification: string;
	estimatedValue: number;
	urgencyDate?: string;
}

const RequestSummaryPage: React.FC = () => {
	const [newRequest, setNewRequest] = useState<NewRequest>({
		itemName: "",
		quantity: 0,
		unit: "",
		priority: "medium",
		reason: "",
		justification: "",
		estimatedValue: 0,
		urgencyDate: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmitRequest = async () => {
		setIsSubmitting(true);
		try {
			// Generate request ID
			const requestId = `REQ-${new Date().getFullYear()}-${String(
				Date.now()
			).slice(-6)}`;

			const requestData = {
				...newRequest,
				requestId,
				requestDate: new Date(),
				status: "pending",
				requestedBy: "Department Staff", // This would come from auth context
				department: "Current Department", // This would come from auth context
			};

			console.log("[v0] Submitting new request:", requestData);

			// API call to submit request
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

			// Reset form
			setNewRequest({
				itemName: "",
				quantity: 0,
				unit: "",
				priority: "medium",
				reason: "",
				justification: "",
				estimatedValue: 0,
				urgencyDate: "",
			});

			console.log("[v0] Request submitted successfully:", requestId);
		} catch (error) {
			console.error("[v0] Error submitting request:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = () => {
		return (
			newRequest.itemName.trim() !== "" &&
			newRequest.quantity > 0 &&
			newRequest.unit.trim() !== "" &&
			newRequest.reason.trim() !== "" &&
			newRequest.justification.trim() !== "" &&
			newRequest.estimatedValue > 0
		);
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Plus className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Submit New Request
					</h1>
				</div>
			</div>

			{/* Request Form */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<FileText className="h-5 w-5" />
						<span>Request Details</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Item Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Item Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Item Name *
								</label>
								<Input
									placeholder="e.g., Office Supplies - A4 Paper"
									value={newRequest.itemName}
									onChange={(e) =>
										setNewRequest({ ...newRequest, itemName: e.target.value })
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Priority *
								</label>
								<Select
									value={newRequest.priority}
									onValueChange={(value) =>
										setNewRequest({
											...newRequest,
											priority: value as NewRequest["priority"],
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
										<SelectItem value="urgent">Urgent</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Quantity *
								</label>
								<Input
									type="number"
									min="1"
									placeholder="0"
									value={newRequest.quantity || ""}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											quantity: Number.parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">Unit *</label>
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
										<SelectItem value="pieces">Pieces</SelectItem>
										<SelectItem value="units">Units</SelectItem>
										<SelectItem value="reams">Reams</SelectItem>
										<SelectItem value="boxes">Boxes</SelectItem>
										<SelectItem value="packs">Packs</SelectItem>
										<SelectItem value="sets">Sets</SelectItem>
										<SelectItem value="kg">Kilograms</SelectItem>
										<SelectItem value="liters">Liters</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Estimated Value ($) *
								</label>
								<Input
									type="number"
									min="0"
									step="0.01"
									placeholder="0.00"
									value={newRequest.estimatedValue || ""}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											estimatedValue: Number.parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
						</div>

						{newRequest.priority === "urgent" && (
							<div>
								<label className="text-sm font-medium mb-2 block">
									Required By Date
								</label>
								<Input
									type="date"
									value={newRequest.urgencyDate || ""}
									onChange={(e) =>
										setNewRequest({
											...newRequest,
											urgencyDate: e.target.value,
										})
									}
								/>
							</div>
						)}
					</div>

					{/* Request Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Request Details
						</h3>
						<div>
							<label className="text-sm font-medium mb-2 block">
								Reason for Request *
							</label>
							<Input
								placeholder="Brief reason for this request"
								value={newRequest.reason}
								onChange={(e) =>
									setNewRequest({ ...newRequest, reason: e.target.value })
								}
							/>
						</div>
						<div>
							<label className="text-sm font-medium mb-2 block">
								Justification *
							</label>
							<Textarea
								placeholder="Provide detailed justification for this request, including how it will be used and why it's necessary..."
								value={newRequest.justification}
								onChange={(e) =>
									setNewRequest({
										...newRequest,
										justification: e.target.value,
									})
								}
								rows={4}
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end space-x-4">
						<Button
							variant="outline"
							onClick={() =>
								setNewRequest({
									itemName: "",
									quantity: 0,
									unit: "",
									priority: "medium",
									reason: "",
									justification: "",
									estimatedValue: 0,
									urgencyDate: "",
								})
							}
						>
							Clear Form
						</Button>
						<Button
							onClick={handleSubmitRequest}
							disabled={!isFormValid() || isSubmitting}
							className="bg-blue-600 hover:bg-blue-700"
						>
							<Send className="h-4 w-4 mr-2" />
							{isSubmitting ? "Submitting..." : "Submit Request"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Request Guidelines */}
			<Card>
				<CardHeader>
					<CardTitle>Request Guidelines</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 text-sm text-gray-600">
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Be Specific:</strong> Provide detailed item names and
								specifications to avoid confusion.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Justify Your Request:</strong> Explain why the items are
								needed and how they will be used.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Set Appropriate Priority:</strong> Use "Urgent" only for
								critical needs that cannot wait.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Accurate Estimates:</strong> Provide realistic quantity
								and value estimates for budget planning.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Processing Time:</strong> Allow 2-3 business days for
								request review and approval.
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RequestSummaryPage;
