"use client";

import { v4 as uuidv4 } from "uuid";

import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";
import { useUserContext } from "../../hooks/UserContextHook";

import { Department, FetchedUser, UserRole } from "types/auth";

const UserManagement: React.FC = () => {
  const { users, getAllUsers, deleteUser, addUser, updateUser } =
    useUserContext();
  const [allUsers, setUsers] = useState<FetchedUser[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FetchedUser | null>(null);
  const [newUser, setNewUser] = useState<Partial<FetchedUser>>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "manager",
    employeeId: "343533",
    status: "active",
  });

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async () => {
    try {
      if (
        !newUser ||
        !newUser.firstName ||
        !newUser.lastName ||
        !newUser.email
      ) {
        console.warn("[v0] Cannot create user: missing required fields.");
        return;
      }
      const userWithId: FetchedUser = {
        id: uuidv4(),
        firstName: newUser.firstName!,
        lastName: newUser.lastName!,
        email: newUser.email!,
        employeeId: newUser.employeeId ?? "",
        role: (newUser.role ?? "staff-central") as UserRole,
        status: "active",
        department: (newUser.department ?? "") as Department | "",
      };

      await addUser(userWithId);
      setNewUser({});
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("[v0] Error creating user:", error);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    try {
      const updatedUsers = (users ?? []).map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setIsEditDialogOpen(false);
      await updateUser(selectedUser);
      setSelectedUser(null);
    } catch (error) {
      console.error("[v0] Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("[v0] Error deleting user:", error);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const updatedUsers = allUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "active"
                  ? "inactive"
                  : ("active" as FetchedUser["status"]),
            }
          : user
      );

      const updatedUser = updatedUsers.find((user) => user.id === userId);
      if (updatedUser) {
        await updateUser(updatedUser);
      }
      setUsers(updatedUsers);
    } catch (error) {
      console.error("[v0] Error toggling user status:", error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      "staff-central": "bg-green-100 text-green-800",
      "staff-department": "bg-yellow-100 text-yellow-800",
      supplier: "bg-purple-100 text-purple-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={newUser.firstName || ""}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={newUser.lastName || ""}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                />
              </div>
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Input
                placeholder="Employee ID"
                value={newUser.employeeId || ""}
                onChange={(e) =>
                  setNewUser({ ...newUser, employeeId: e.target.value })
                }
              />
              <Select
                value={newUser.role || "staff-central"}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value as UserRole })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="Staff_central_store">
                    Central Store Staff
                  </SelectItem>
                  <SelectItem value="staff_department">
                    Department Staff
                  </SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newUser.department || ""}
                onValueChange={(value) =>
                  setNewUser({
                    ...newUser,
                    department: value as Department | "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="registry">Registry</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="human-resources">
                    Human Resources
                  </SelectItem>
                  <SelectItem value="procurement">Procurement</SelectItem>
                  <SelectItem value="library">Library Services</SelectItem>
                  <SelectItem value="ict">ICT Department</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>Create User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff_central_store">
                  Central Store Staff
                </SelectItem>
                <SelectItem value="staff_department">
                  Department Staff
                </SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Emp.ID</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">{user.employeeId}</td>
                    <td className="p-3">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{user.email}</td>
                    <td className="p-3">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={getStatusBadgeColor(
                          user.status ?? "pending"
                        )}
                      >
                        {user.status ?? "pending"}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            user.id && handleToggleUserStatus(user.id)
                          }
                        >
                          {user?.status === "active" ? (
                            <UserX className="h-3 w-3" />
                          ) : (
                            <UserCheck className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => user.id && handleDeleteUser(user.id)}
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={selectedUser.firstName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={selectedUser.lastName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                placeholder="Email"
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <Select
                value={selectedUser.role}
                onValueChange={(value) =>
                  setSelectedUser({
                    ...selectedUser,
                    role: value as UserRole,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff_central_store">
                    Central Store Staff
                  </SelectItem>
                  <SelectItem value="staff_department">
                    Department Staff
                  </SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditUser}>Update User</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
