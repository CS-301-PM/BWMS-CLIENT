"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/ui/select";
import {
  Package,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useStockContext } from "../../hooks/useStockContext";
import { StockItem } from "../../reducers/StockReducer";

const StockOverview: React.FC = () => {
  const {
    state,
    getApprovedStocks,
    getDeclinedStocks,
    getPendingStocks,
    getStocks,
    updateStock,
    deleteStock,
    // addStock,
  } = useStockContext();
  const { stocks } = state;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        getStocks();
        getApprovedStocks();
        getDeclinedStocks();
        getPendingStocks();
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredItems = stocks.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.level === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUpdateStock = async () => {
    if (!selectedItem) return;

    try {
      // Ensure update goes through context API
      await updateStock({
        ...selectedItem,
        totalValue: selectedItem.quantity * selectedItem.unitValue,
        lastUpdated: new Date(),
        status: getStockStatus(
          selectedItem.quantity,
          selectedItem.reorderLevel
        ),
      });

      // Close dialog
      setIsEditDialogOpen(false);
      setSelectedItem(null);

      // Log to blockchain
    } catch (error) {
      console.error("[v0] Error updating stock:", error);
    }
  };

  const handleDeleteStock = async (itemId: string) => {
    try {
      const itemToDelete = stocks.find((item) => item.id === itemId);
      await deleteStock(itemId);
      // Log to blockchain
    } catch (error) {
      console.error("[v0] Error deleting stock:", error);
    }
  };

  const getStockStatus = (
    quantity: number,
    reorderLevel: number
  ): StockItem["level"] => {
    if (quantity === 0) return "out-of-stock";
    if (quantity <= reorderLevel) return "low-stock";
    return "in-stock";
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      "in-stock": "bg-green-100 text-green-800",
      "low-stock": "bg-yellow-100 text-yellow-800",
      "out-of-stock": "bg-red-100 text-red-800",
      damaged: "bg-orange-100 text-orange-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in-stock":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "low-stock":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "out-of-stock":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "damaged":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const categories = Array.from(new Set(stocks.map((item) => item.category)));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Stocks management
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stocks.length}
              </div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stockItems.filter((item) => item.status === "in-stock").length}
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  stockItems.filter((item) => item.status === "low-stock")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Low Stock</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                $
                {stockItems
                  .reduce((sum, item) => sum + item.totalValue, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search stock items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Serial #</th>
                  <th className="text-left p-3">Item Name</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Quantity</th>
                  <th className="text-left p-3">Unit Value</th>
                  <th className="text-left p-3">Total Value</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">
                      {item.serialNumber}
                    </td>
                    <td className="p-3">{item.itemName}</td>
                    <td className="p-3 text-sm text-gray-600">
                      {item.category}
                    </td>
                    <td className="p-3">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="p-3">${item?.unitValue?.toFixed(2)}</td>
                    <td className="p-3 font-semibold">
                      ${item.totalValue?.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm">{item.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusBadgeColor(item.level ?? "")}>
                        {getStatusIcon(item.level ?? "")}
                        <span className="ml-1 capitalize">
                          {item.level?.replace("-", " ")}
                        </span>
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStock(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
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

      {/* Edit Stock Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Stock Item</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Item Name
                </label>
                <Input
                  value={selectedItem.itemName}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      itemName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    value={selectedItem.quantity}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        quantity: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Unit</label>
                  <Input
                    value={selectedItem.unit}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Unit Value ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={selectedItem.unitValue}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      unitValue: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Location
                </label>
                <Input
                  value={selectedItem.location}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Reorder Level
                  </label>
                  <Input
                    type="number"
                    value={selectedItem.reorderLevel}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        reorderLevel: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Max Level
                  </label>
                  <Input
                    type="number"
                    value={selectedItem.maxLevel}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        maxLevel: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateStock}>Update Stock</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockOverview;
