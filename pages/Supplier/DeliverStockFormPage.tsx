"use client";

import type React from "react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../src/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../../src/components/ui/input";
import { Textarea } from "../../src/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/ui/select";
import { Plus, Send, Package, Upload } from "lucide-react";

interface DeliveryRecord {
	itemName: string;
	quantity: number;
	unit: string;
	deliveryDate: string;
	trackingNumber: string;
	recipientName: string;
	deliveryLocation: string;
	notes: string;
	value: number;
	invoiceNumber: string;
	batchNumber?: string;
	expiryDate?: string;
	specialInstructions?: string;
}

const DeliverStockFormPage: React.FC = () => {
	const [deliveryRecord, setDeliveryRecord] = useState<DeliveryRecord>({
		itemName: "",
		quantity: 0,
		unit: "",
		deliveryDate: "",
		trackingNumber: "",
		recipientName: "",
		deliveryLocation: "",
		notes: "",
		value: 0,
		invoiceNumber: "",
		batchNumber: "",
		expiryDate: "",
		specialInstructions: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

	const handleSubmitDelivery = async () => {
		setIsSubmitting(true);
		try {
			// Generate delivery ID
			const deliveryId = `DEL-${new Date().getFullYear()}-${String(
				Date.now()
			).slice(-6)}`;

			const deliveryData = {
				...deliveryRecord,
				deliveryId,
				submittedDate: new Date(),
				status: "pending",
				supplierName: "Current Supplier", // This would come from auth context
				attachments: attachedFiles.map((file) => file.name),
			};

			console.log("[v0] Submitting delivery record:", deliveryData);

			// API call to submit delivery record
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

			// Log to blockchain
			const blockchainLog = {
				action: "Delivery Submitted",
				itemName: deliveryRecord.itemName,
				user: "supplier001",
				timestamp: new Date(),
				transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
			};
			console.log("[v0] Blockchain log:", blockchainLog);

			// Reset form
			setDeliveryRecord({
				itemName: "",
				quantity: 0,
				unit: "",
				deliveryDate: "",
				trackingNumber: "",
				recipientName: "",
				deliveryLocation: "",
				notes: "",
				value: 0,
				invoiceNumber: "",
				batchNumber: "",
				expiryDate: "",
				specialInstructions: "",
			});
			setAttachedFiles([]);

			console.log("[v0] Delivery record submitted successfully:", deliveryId);
		} catch (error) {
			console.error("[v0] Error submitting delivery record:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		setAttachedFiles([...attachedFiles, ...files]);
	};

	const removeFile = (index: number) => {
		setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
	};

	const isFormValid = () => {
		return (
			deliveryRecord.itemName.trim() !== "" &&
			deliveryRecord.quantity > 0 &&
			deliveryRecord.unit.trim() !== "" &&
			deliveryRecord.deliveryDate !== "" &&
			deliveryRecord.trackingNumber.trim() !== "" &&
			deliveryRecord.recipientName.trim() !== "" &&
			deliveryRecord.deliveryLocation.trim() !== "" &&
			deliveryRecord.value > 0 &&
			deliveryRecord.invoiceNumber.trim() !== ""
		);
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Package className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">
						Submit Delivery Record
					</h1>
				</div>
			</div>

			{/* Delivery Form */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Plus className="h-5 w-5" />
						<span>Delivery Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Item Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Item Details
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Item Name *
								</label>
								<Input
									placeholder="e.g., Office Supplies - A4 Paper"
									value={deliveryRecord.itemName}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											itemName: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Invoice Number *
								</label>
								<Input
									placeholder="INV-2024-001"
									value={deliveryRecord.invoiceNumber}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											invoiceNumber: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Quantity *
								</label>
								<Input
									type="number"
									min="1"
									placeholder="0"
									value={deliveryRecord.quantity || ""}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											quantity: Number.parseInt(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">Unit *</label>
								<Select
									value={deliveryRecord.unit}
									onValueChange={(value) =>
										setDeliveryRecord({ ...deliveryRecord, unit: value })
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
									Total Value ($) *
								</label>
								<Input
									type="number"
									min="0"
									step="0.01"
									placeholder="0.00"
									value={deliveryRecord.value || ""}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											value: Number.parseFloat(e.target.value) || 0,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Batch Number
								</label>
								<Input
									placeholder="Optional"
									value={deliveryRecord.batchNumber || ""}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											batchNumber: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Delivery Date *
								</label>
								<Input
									type="date"
									value={deliveryRecord.deliveryDate}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											deliveryDate: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Expiry Date (if applicable)
								</label>
								<Input
									type="date"
									value={deliveryRecord.expiryDate || ""}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											expiryDate: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					{/* Delivery Details */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Delivery Details
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Tracking Number *
								</label>
								<Input
									placeholder="TRK123456789"
									value={deliveryRecord.trackingNumber}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											trackingNumber: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label className="text-sm font-medium mb-2 block">
									Recipient Name *
								</label>
								<Input
									placeholder="Name of person who received the delivery"
									value={deliveryRecord.recipientName}
									onChange={(e) =>
										setDeliveryRecord({
											...deliveryRecord,
											recipientName: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Delivery Location *
							</label>
							<Select
								value={deliveryRecord.deliveryLocation}
								onValueChange={(value) =>
									setDeliveryRecord({
										...deliveryRecord,
										deliveryLocation: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select delivery location" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Warehouse A - Main Entrance">
										Warehouse A - Main Entrance
									</SelectItem>
									<SelectItem value="Warehouse B - Loading Dock">
										Warehouse B - Loading Dock
									</SelectItem>
									<SelectItem value="Receiving Dock - Central">
										Receiving Dock - Central
									</SelectItem>
									<SelectItem value="Storage Room - Medical">
										Storage Room - Medical
									</SelectItem>
									<SelectItem value="IT Storage - Building C">
										IT Storage - Building C
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Special Instructions
							</label>
							<Textarea
								placeholder="Any special handling instructions or requirements..."
								value={deliveryRecord.specialInstructions || ""}
								onChange={(e) =>
									setDeliveryRecord({
										...deliveryRecord,
										specialInstructions: e.target.value,
									})
								}
								rows={2}
							/>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Delivery Notes
							</label>
							<Textarea
								placeholder="Additional notes about the delivery..."
								value={deliveryRecord.notes}
								onChange={(e) =>
									setDeliveryRecord({
										...deliveryRecord,
										notes: e.target.value,
									})
								}
								rows={3}
							/>
						</div>
					</div>

					{/* File Attachments */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
						<div>
							<label className="text-sm font-medium mb-2 block">
								Upload Documents
							</label>
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
								<Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
								<div className="text-sm text-gray-600 mb-2">
									Upload delivery receipts, photos, or other supporting
									documents
								</div>
								<input
									type="file"
									multiple
									accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
									onChange={handleFileUpload}
									className="hidden"
									id="file-upload"
								/>
								<Button
									variant="outline"
									onClick={() =>
										document.getElementById("file-upload")?.click()
									}
								>
									Choose Files
								</Button>
							</div>
							{attachedFiles.length > 0 && (
								<div className="mt-4">
									<div className="text-sm font-medium mb-2">
										Attached Files:
									</div>
									<div className="space-y-2">
										{attachedFiles.map((file, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-2 bg-gray-50 rounded"
											>
												<span className="text-sm">{file.name}</span>
												<Button
													size="sm"
													variant="outline"
													onClick={() => removeFile(index)}
												>
													Remove
												</Button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end space-x-4">
						<Button
							variant="outline"
							onClick={() => {
								setDeliveryRecord({
									itemName: "",
									quantity: 0,
									unit: "",
									deliveryDate: "",
									trackingNumber: "",
									recipientName: "",
									deliveryLocation: "",
									notes: "",
									value: 0,
									invoiceNumber: "",
									batchNumber: "",
									expiryDate: "",
									specialInstructions: "",
								});
								setAttachedFiles([]);
							}}
						>
							Clear Form
						</Button>
						<Button
							onClick={handleSubmitDelivery}
							disabled={!isFormValid() || isSubmitting}
							className="bg-blue-600 hover:bg-blue-700"
						>
							<Send className="h-4 w-4 mr-2" />
							{isSubmitting ? "Submitting..." : "Submit Delivery Record"}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Submission Guidelines */}
			<Card>
				<CardHeader>
					<CardTitle>Delivery Submission Guidelines</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 text-sm text-gray-600">
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Accurate Information:</strong> Ensure all delivery
								details are correct and match your records.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Timely Submission:</strong> Submit delivery records
								within 24 hours of delivery completion.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Supporting Documents:</strong> Include delivery
								receipts, photos, and any relevant documentation.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Quality Assurance:</strong> Report any damage or quality
								issues in the delivery notes.
							</div>
						</div>
						<div className="flex items-start space-x-2">
							<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
							<div>
								<strong>Tracking Updates:</strong> Keep tracking information
								current for better delivery visibility.
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default DeliverStockFormPage;
