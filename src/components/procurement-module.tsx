"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Package, Shield } from "lucide-react"

export function ProcurementModule() {
  // Mock data for suppliers
  const suppliers = [
    {
      supplierId: "SUP001",
      supplierName: "ABC Supplies Ltd",
      deliveryId: "DEL001",
      itemReceipt: "REC001",
      status: "Received",
    },
    {
      supplierId: "SUP002",
      supplierName: "XYZ Materials Co",
      deliveryId: "DEL002",
      itemReceipt: "REC002",
      status: "Pending",
    },
    {
      supplierId: "SUP003",
      supplierName: "Global Distributors",
      deliveryId: "DEL003",
      itemReceipt: "REC003",
      status: "Received",
    },
  ]

  // Mock data for audit trail
  const auditTrail = [
    {
      serialNo: "AT001",
      itemName: "Office Supplies",
      timeApproved: "2024-01-15 10:30",
      hash: "0x1a2b3c...",
      action: "In Store",
      user: "John Doe",
    },
    {
      serialNo: "AT002",
      itemName: "Computer Equipment",
      timeApproved: "2024-01-15 11:45",
      hash: "0x4d5e6f...",
      action: "Out",
      user: "Jane Smith",
    },
    {
      serialNo: "AT003",
      itemName: "Cleaning Materials",
      timeApproved: "2024-01-15 14:20",
      hash: "0x7g8h9i...",
      action: "Expired",
      user: "Mike Johnson",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Procurement Module</h2>
      </div>

      {/* Supply Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Supply
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier ID</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Delivery ID</TableHead>
                <TableHead>Item Receipt</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.supplierId}>
                  <TableCell className="font-medium">{supplier.supplierId}</TableCell>
                  <TableCell>{supplier.supplierName}</TableCell>
                  <TableCell>{supplier.deliveryId}</TableCell>
                  <TableCell>{supplier.itemReceipt}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        supplier.status === "Received" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Trail / Blockchain Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Audit Trail (Blockchain Log)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-medium text-muted-foreground">Blockchain - logged activities</h4>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial #</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Time Approved</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditTrail.map((entry) => (
                <TableRow key={entry.serialNo}>
                  <TableCell className="font-medium">{entry.serialNo}</TableCell>
                  <TableCell>{entry.itemName}</TableCell>
                  <TableCell>{entry.timeApproved}</TableCell>
                  <TableCell className="font-mono text-xs">{entry.hash}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        entry.action === "In Store"
                          ? "bg-blue-100 text-blue-800"
                          : entry.action === "Out"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </TableCell>
                  <TableCell>{entry.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
