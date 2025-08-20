"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Settings, Edit, Trash2, Eye, UserPlus } from "lucide-react"

export function AdminPanel() {
  // Mock data for users
  const users = [
    { empId: "EMP001", name: "John Doe", dob: "1990-05-15", email: "john.doe@company.com", role: "Manager" },
    { empId: "EMP002", name: "Jane Smith", dob: "1988-12-03", email: "jane.smith@company.com", role: "Staff" },
    {
      empId: "EMP003",
      name: "Mike Johnson",
      dob: "1992-08-20",
      email: "mike.johnson@company.com",
      role: "Department Staff",
    },
  ]

  // Mock data for permissions
  const permissions = [
    { empId: "EMP001", serialNo: "SN001", itemName: "Stock Management", action: "Approve", consent: "Approved" },
    { empId: "EMP002", serialNo: "SN002", itemName: "Inventory Update", action: "Pending", consent: "Pending" },
    { empId: "EMP003", serialNo: "SN003", itemName: "Report Generation", action: "Decline", consent: "Declined" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      {/* Manage Users */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Manage Users
          </CardTitle>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emp.ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>DoB</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.empId}>
                  <TableCell className="font-medium">{user.empId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.dob}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">See All</Button>
          </div>
        </CardContent>
      </Card>

      {/* Manage Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emp.ID</TableHead>
                <TableHead>Serial #</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Consent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{permission.empId}</TableCell>
                  <TableCell>{permission.serialNo}</TableCell>
                  <TableCell>{permission.itemName}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        permission.consent === "Approved"
                          ? "bg-green-100 text-green-800"
                          : permission.consent === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {permission.consent}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button variant="outline">See All</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
