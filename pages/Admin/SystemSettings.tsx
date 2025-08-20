"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Clock, Shield, Database, Bell } from "lucide-react";

interface SystemSettings {
	timeZone: string;
	dateFormat: string;
	language: string;
	theme: string;
	notifications: {
		email: boolean;
		sms: boolean;
		push: boolean;
	};
	security: {
		sessionTimeout: number;
		passwordExpiry: number;
		twoFactorAuth: boolean;
	};
	backup: {
		autoBackup: boolean;
		backupFrequency: string;
		retentionDays: number;
	};
}

const SystemSettings: React.FC = () => {
	const [settings, setSettings] = useState<SystemSettings>({
		timeZone: "UTC+8",
		dateFormat: "DD/MM/YYYY",
		language: "English",
		theme: "Light",
		notifications: {
			email: true,
			sms: false,
			push: true,
		},
		security: {
			sessionTimeout: 30,
			passwordExpiry: 90,
			twoFactorAuth: false,
		},
		backup: {
			autoBackup: true,
			backupFrequency: "daily",
			retentionDays: 30,
		},
	});

	const [isSaving, setIsSaving] = useState(false);

	const handleSaveSettings = async () => {
		setIsSaving(true);
		try {
			// API call to save settings
			console.log("[v0] Saving system settings:", settings);
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			console.log("[v0] Settings saved successfully");
		} catch (error) {
			console.error("[v0] Error saving settings:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const updateSettings = (
		section: keyof SystemSettings,
		key: string,
		value: any
	) => {
		setSettings((prev) => ({
			...prev,
			[section]:
				typeof prev[section] === "object"
					? { ...prev[section], [key]: value }
					: value,
		}));
	};

	return (
		<div className="p-6 space-y-6 bg-gray-50 min-h-screen">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Settings className="h-8 w-8 text-blue-600" />
					<h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
				</div>
				<Button
					onClick={handleSaveSettings}
					disabled={isSaving}
					className="bg-blue-600 hover:bg-blue-700"
				>
					{isSaving ? "Saving..." : "Save Settings"}
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* General Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Clock className="h-5 w-5" />
							<span>General Settings</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium mb-2 block">
								Time Zone
							</label>
							<Select
								value={settings.timeZone}
								onValueChange={(value) => updateSettings("timeZone", "", value)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="UTC+8">UTC+8 (Asia/Singapore)</SelectItem>
									<SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
									<SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
									<SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Date Format
							</label>
							<Select
								value={settings.dateFormat}
								onValueChange={(value) =>
									updateSettings("dateFormat", "", value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
									<SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
									<SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">Language</label>
							<Select
								value={settings.language}
								onValueChange={(value) => updateSettings("language", "", value)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="English">English</SelectItem>
									<SelectItem value="Chinese">中文</SelectItem>
									<SelectItem value="Malay">Bahasa Melayu</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">Theme</label>
							<Select
								value={settings.theme}
								onValueChange={(value) => updateSettings("theme", "", value)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Light">Light</SelectItem>
									<SelectItem value="Dark">Dark</SelectItem>
									<SelectItem value="Auto">Auto</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Bell className="h-5 w-5" />
							<span>Notification Settings</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium">
									Email Notifications
								</label>
								<p className="text-xs text-gray-500">
									Receive notifications via email
								</p>
							</div>
							<Switch
								checked={settings.notifications.email}
								onCheckedChange={(checked) =>
									updateSettings("notifications", "email", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium">SMS Notifications</label>
								<p className="text-xs text-gray-500">
									Receive notifications via SMS
								</p>
							</div>
							<Switch
								checked={settings.notifications.sms}
								onCheckedChange={(checked) =>
									updateSettings("notifications", "sms", checked)
								}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium">
									Push Notifications
								</label>
								<p className="text-xs text-gray-500">
									Receive browser push notifications
								</p>
							</div>
							<Switch
								checked={settings.notifications.push}
								onCheckedChange={(checked) =>
									updateSettings("notifications", "push", checked)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Security Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Shield className="h-5 w-5" />
							<span>Security Settings</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium mb-2 block">
								Session Timeout (minutes)
							</label>
							<Input
								type="number"
								value={settings.security.sessionTimeout}
								onChange={(e) =>
									updateSettings(
										"security",
										"sessionTimeout",
										Number.parseInt(e.target.value)
									)
								}
								min="5"
								max="480"
							/>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Password Expiry (days)
							</label>
							<Input
								type="number"
								value={settings.security.passwordExpiry}
								onChange={(e) =>
									updateSettings(
										"security",
										"passwordExpiry",
										Number.parseInt(e.target.value)
									)
								}
								min="30"
								max="365"
							/>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium">
									Two-Factor Authentication
								</label>
								<p className="text-xs text-gray-500">
									Require 2FA for all users
								</p>
							</div>
							<Switch
								checked={settings.security.twoFactorAuth}
								onCheckedChange={(checked) =>
									updateSettings("security", "twoFactorAuth", checked)
								}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Backup Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Database className="h-5 w-5" />
							<span>Backup Settings</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<label className="text-sm font-medium">Auto Backup</label>
								<p className="text-xs text-gray-500">
									Automatically backup system data
								</p>
							</div>
							<Switch
								checked={settings.backup.autoBackup}
								onCheckedChange={(checked) =>
									updateSettings("backup", "autoBackup", checked)
								}
							/>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Backup Frequency
							</label>
							<Select
								value={settings.backup.backupFrequency}
								onValueChange={(value) =>
									updateSettings("backup", "backupFrequency", value)
								}
								disabled={!settings.backup.autoBackup}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hourly">Hourly</SelectItem>
									<SelectItem value="daily">Daily</SelectItem>
									<SelectItem value="weekly">Weekly</SelectItem>
									<SelectItem value="monthly">Monthly</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="text-sm font-medium mb-2 block">
								Retention Period (days)
							</label>
							<Input
								type="number"
								value={settings.backup.retentionDays}
								onChange={(e) =>
									updateSettings(
										"backup",
										"retentionDays",
										Number.parseInt(e.target.value)
									)
								}
								min="7"
								max="365"
								disabled={!settings.backup.autoBackup}
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Performance Settings */}
			<Card>
				<CardHeader>
					<CardTitle>Performance Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-4 border rounded-lg">
							<div className="text-2xl font-bold text-green-600">98.5%</div>
							<div className="text-sm text-gray-600">System Uptime</div>
						</div>
						<div className="text-center p-4 border rounded-lg">
							<div className="text-2xl font-bold text-blue-600">245ms</div>
							<div className="text-sm text-gray-600">Average Response Time</div>
						</div>
						<div className="text-center p-4 border rounded-lg">
							<div className="text-2xl font-bold text-purple-600">1,247</div>
							<div className="text-sm text-gray-600">Active Sessions</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SystemSettings;
