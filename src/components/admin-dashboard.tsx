"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { Sidebar } from "@/components/sidebar";
import { DashboardHome } from "@/components/dashboard-home";
import { SettingsPage } from "@/components/settings-page";
import { AdminPanel } from "@/components/admin-panel";
import { ProcurementModule } from "@/components/procurement-module";
import { ReportingAnalytics } from "@/components/reporting-analytics";
import { SupportHelp } from "@/components/support-help";
import { RequestManagement } from "@/components/request-management";
import { ItemStockManagement } from "@/components/item-stock-management";
import { ReceiptManagement } from "@/components/receipt-management";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Shield } from "lucide-react";

type ActivePage =
	| "dashboard"
	| "settings"
	| "admin"
	| "procurement"
	| "reporting"
	| "support"
	| "requests"
	| "stock"
	| "receipts";

export function AdminDashboard() {
	const [activePage, setActivePage] = useState<ActivePage>("dashboard");
	const { user, logout } = useAuth();

	const renderActivePage = () => {
		switch (activePage) {
			case "dashboard":
				return <DashboardHome />;
			case "settings":
				return <SettingsPage />;
			case "admin":
				return <AdminPanel />;
			case "procurement":
				return <ProcurementModule />;
			case "reporting":
				return <ReportingAnalytics />;
			case "support":
				return <SupportHelp />;
			case "requests":
				return <RequestManagement />;
			case "stock":
				return <ItemStockManagement />;
			case "receipts":
				return <ReceiptManagement />;
			default:
				return <DashboardHome />;
		}
	};

	const getUserInitials = () => {
		if (!user) return "U";
		return (
			`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
			"U"
		);
	};

	const getRoleDisplay = () => {
		if (!user) return "User";
		switch (user.role) {
			case "admin":
				return "Administrator";
			case "manager":
				return "Manager";
			default:
				return "User";
		}
	};

	return (
		<div className="flex h-screen bg-background">
			<Sidebar activePage={activePage} onPageChange={setActivePage} />
			<main className="flex-1 overflow-auto">
				<header className="border-b bg-card px-6 py-4">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-semibold text-foreground">
								CENTRAL STORES
							</h1>
							<p className="text-sm text-muted-foreground">
								Management System - {getRoleDisplay()} Portal
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
										<DropdownMenuContent
											className="w-56"
											align="end"
											forceMount
										>
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
											<DropdownMenuItem
												onClick={() => setActivePage("settings")}
											>
												<Settings className="mr-2 h-4 w-4" />
												<span>Settings</span>
											</DropdownMenuItem>
											{(user.role === "admin" || user.role === "manager") && (
												<DropdownMenuItem
													onClick={() => setActivePage("admin")}
												>
													<Shield className="mr-2 h-4 w-4" />
													<span>Admin Panel</span>
												</DropdownMenuItem>
											)}
											<DropdownMenuSeparator />
											<DropdownMenuItem
												onClick={logout}
												className="text-red-600"
											>
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
				<div className="p-6">{renderActivePage()}</div>
			</main>
		</div>
	);
}
