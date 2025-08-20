"use client";

import type React from "react";
import { useState } from "react";

interface StockItem {
	id: string;
	serialNumber: string;
	itemName: string;
	currentLocation: string;
	quantity: number;
	unit: string;
	condition: "good" | "fair" | "damaged" | "expired";
	lastInspected: Date;
}

interface DamageReport {
	itemId: string;
	itemName: string;
	damageType: string;
	severity: "minor" | "moderate" | "severe" | "total-loss";
	quantity: number;
	location: string;
	description: string;
	cause: string;
	actionRequired: string;
	reportedBy: string;
	photos: File[];
}

const StockAlertUpdatePage: React.FC = () => {
	const [stockItems] = useState<StockItem[]>([
		{
			id: "1",
			serialNumber: "STK-001",
			itemName: "Office Supplies - A4 Paper",
			currentLocation: "Warehouse A-1",
			quantity: 150,
			unit: "reams",
			condition: "good",
			lastInspected: new Date("2024-03-10"),
		},
		{
			id: "2",
			serialNumber: "STK-002",
			itemName: "Computer Equipment - Laptops",
			currentLocation: "IT Storage",
			quantity: 8,
			unit: "units",
			condition: "fair",
			lastInspected: new Date("2024-03-12"),
		},
		{
			id: "3",
			serialNumber: "STK-003",
			itemName: "Medical Supplies - First Aid Kits",
			currentLocation: "Medical Storage",
			quantity: 25,
			unit: "kits",
			condition: "good",
			lastInspected: new Date("2024-03-14"),
		},
		{
			id: "4",
			serialNumber: "STK-004",
			itemName: "Furniture - Office Chairs",
			currentLocation: "Warehouse B-2",
			quantity: 18,
			unit: "units",
			condition: "damaged",
			lastInspected: new Date("2024-03-13"),
		},
	]);

	// Removed unused selectedItem state
	const [damageReport, setDamageReport] = useState<DamageReport>({
		itemId: "",
		itemName: "",
		damageType: "",
		severity: "minor",
		quantity: 0,
		location: "",
		description: "",
		cause: "",
		actionRequired: "",
		reportedBy: "",
		photos: [],
	});
	const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredItems = stockItems.filter(
		(item) =>
			item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.currentLocation.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelectItem = (item: StockItem) => {
		setSelectedItem(item);
		setDamageReport({
			...damageReport,
			itemId: item.id,
			itemName: item.itemName,
			location: item.currentLocation,
		});
		setIsReportDialogOpen(true);
	};

	const handleSubmitReport = async () => {
		setIsSubmitting(true);
		try {
			console.log("[v0] Submitting damage report:", damageReport);
			// await api.submitDamageReport(damageReport)

			setIsReportDialogOpen(false);
			setDamageReport({
				itemId: "",
				itemName: "",
				damageType: "",
				severity: "minor",
				quantity: 0,
				location: "",
				description: "",
				cause: "",
				actionRequired: "",
				reportedBy: "",
				photos: [],
			});
		} catch (error) {
			console.error("[v0] Error submitting damage report:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const getConditionColor = (condition: string) => {
		switch (condition) {
			case "good":
				return "text-green-600 bg-green-50";
			case "fair":
				return "text-yellow-600 bg-yellow-50";
			case "damaged":
				return "text-red-600 bg-red-50";
			case "expired":
				return "text-gray-600 bg-gray-50";
			default:
				return "text-gray-600 bg-gray-50";
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">
					Stock Alert & Damage Reporting
				</h1>
			</div>

			{/* Search Bar */}
			<div className="flex gap-4">
				<input
					type="text"
					placeholder="Search by item name, serial number, or location..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			{/* Stock Items Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Item Details
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Location
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Quantity
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Condition
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredItems.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap">
									<div>
										<div className="text-sm font-medium text-gray-900">
											{item.itemName}
										</div>
										<div className="text-sm text-gray-500">
											{item.serialNumber}
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{item.currentLocation}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{item.quantity} {item.unit}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(
											item.condition
										)}`}
									>
										{item.condition}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										onClick={() => handleSelectItem(item)}
										className="text-red-600 hover:text-red-900 mr-4"
									>
										Report Damage
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Damage Report Dialog */}
			{isReportDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								Report Damage
							</h2>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Item Name
									</label>
									<input
										type="text"
										value={damageReport.itemName}
										disabled
										className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Damage Type
										</label>
										<input
											type="text"
											value={damageReport.damageType}
											onChange={(e) =>
												setDamageReport({
													...damageReport,
													damageType: e.target.value,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
											placeholder="e.g., Physical damage, Water damage"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Severity
										</label>
										<select
											value={damageReport.severity}
											onChange={(e) =>
												setDamageReport({
													...damageReport,
													severity: e.target.value as any,
												})
											}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
										>
											<option value="minor">Minor</option>
											<option value="moderate">Moderate</option>
											<option value="severe">Severe</option>
											<option value="total-loss">Total Loss</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Description
									</label>
									<textarea
										value={damageReport.description}
										onChange={(e) =>
											setDamageReport({
												...damageReport,
												description: e.target.value,
											})
										}
										rows={3}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
										placeholder="Describe the damage in detail..."
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Reported By
									</label>
									<input
										type="text"
										value={damageReport.reportedBy}
										onChange={(e) =>
											setDamageReport({
												...damageReport,
												reportedBy: e.target.value,
											})
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
										placeholder="Your name"
									/>
								</div>
							</div>

							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => setIsReportDialogOpen(false)}
									className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
								>
									Cancel
								</button>
								<button
									onClick={handleSubmitReport}
									disabled={isSubmitting}
									className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
								>
									{isSubmitting ? "Submitting..." : "Submit Report"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StockAlertUpdatePage;
