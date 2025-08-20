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
import { Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";
import { useOverviewContext } from "../../hooks/useOverviewContext";

const stockData = [
  {
    id: "STK001",
    name: "Office Chairs",
    category: "Furniture",
    quantity: 45,
    unit: "pieces",
    value: "$12,500",
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "STK002",
    name: "Laptops",
    category: "IT Equipment",
    quantity: 12,
    unit: "pieces",
    value: "$24,000",
    status: "Low Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "STK003",
    name: "Printer Paper",
    category: "Office Supplies",
    quantity: 200,
    unit: "reams",
    value: "$1,800",
    status: "In Stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "STK004",
    name: "Desk Lamps",
    category: "Furniture",
    quantity: 3,
    unit: "pieces",
    value: "$450",
    status: "Critical",
    lastUpdated: "2024-01-12",
  },
];

export default function AdminStockOverview() {
  const { approved, declined, inProcess, notifications, isLoading, error } =
    useOverviewContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStock = stockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Overview</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">Add New Stock</Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stock items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="All">All Categories</option>
                <option value="Furniture">Furniture</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Items ({filteredStock.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Stock ID</th>
                  <th className="text-left p-3">Item Name</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Quantity</th>
                  <th className="text-left p-3">Unit</th>
                  <th className="text-left p-3">Value</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Last Updated</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.unit}</td>
                    <td className="p-3">{item.value}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {item.lastUpdated}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
