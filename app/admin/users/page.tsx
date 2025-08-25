"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    role: "customer",
    status: "active",
    totalOrders: 12,
    totalSpent: 2340,
    lastLogin: "2024-01-20T10:30:00Z",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "فاطمة سالم",
    email: "fatima@example.com",
    phone: "+966507654321",
    role: "customer",
    status: "active",
    totalOrders: 8,
    totalSpent: 1560,
    lastLogin: "2024-01-19T14:15:00Z",
    joinDate: "2023-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "+966512345678",
    role: "admin",
    status: "active",
    totalOrders: 0,
    totalSpent: 0,
    lastLogin: "2024-01-20T09:45:00Z",
    joinDate: "2023-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "نورا عبدالله",
    email: "nora@example.com",
    phone: "+966598765432",
    role: "customer",
    status: "inactive",
    totalOrders: 3,
    totalSpent: 450,
    lastLogin: "2024-01-10T16:20:00Z",
    joinDate: "2023-11-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "خالد محمد",
    email: "khalid@example.com",
    phone: "+966523456789",
    role: "customer",
    status: "suspended",
    totalOrders: 15,
    totalSpent: 3200,
    lastLogin: "2024-01-15T11:10:00Z",
    joinDate: "2023-03-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role as "customer" | "admin",
        status: "active" as const,
        totalOrders: 0,
        totalSpent: 0,
        lastLogin: new Date().toISOString(),
        joinDate: new Date().toISOString().split("T")[0],
        avatar: "/placeholder.svg?height=40&width=40",
      }
      setUsers([...users, user])
      setNewUser({ name: "", email: "", phone: "", role: "customer" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
  }

  const handleUpdateUser = () => {
    if (editingUser && newUser.name.trim() && newUser.email.trim()) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role as "customer" | "admin",
              }
            : user,
        ),
      )
      setEditingUser(null)
      setNewUser({ name: "", email: "", phone: "", role: "customer" })
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const updateUserStatus = (id: number, newStatus: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "نشط", className: "bg-green-100 text-green-800" },
      inactive: { label: "غير نشط", className: "bg-gray-100 text-gray-800" },
      suspended: { label: "موقوف", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "مدير", className: "bg-blue-100 text-blue-800" },
      customer: { label: "عميل", className: "bg-purple-100 text-purple-800" },
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.customer
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatLastLogin = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    customers: users.filter((u) => u.role === "customer").length,
    admins: users.filter((u) => u.role === "admin").length,
    totalSpent: users.reduce((sum, u) => sum + u.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">إدارة حسابات العملاء والمديرين</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>أضف مستخدم جديد إلى النظام</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
              <div>
                <Label htmlFor="role">الدور</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">عميل</SelectItem>
                    <SelectItem value="admin">مدير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddUser}>إضافة المستخدم</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">{userStats.active} مستخدم نشط</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">العملاء</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.customers}</div>
            <p className="text-xs text-muted-foreground">عميل مسجل</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المديرين</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
            <p className="text-xs text-muted-foreground">مدير نظام</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإنفاق</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalSpent.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground">من جميع العملاء</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
          <CardDescription>إدارة حسابات المستخدمين والعملاء</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الأدوار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="customer">العملاء</SelectItem>
                <SelectItem value="admin">المديرين</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="suspended">موقوف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>معلومات الاتصال</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الطلبات</TableHead>
                <TableHead>الإنفاق</TableHead>
                <TableHead>آخر دخول</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">انضم في {formatDate(user.joinDate)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{user.totalOrders}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-primary">{user.totalSpent.toLocaleString()} ريال</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatLastLogin(user.lastLogin)}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "inactive")}>
                            إلغاء التفعيل
                          </DropdownMenuItem>
                        )}
                        {user.status === "inactive" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "active")}>
                            تفعيل الحساب
                          </DropdownMenuItem>
                        )}
                        {user.status !== "suspended" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "suspended")}>
                            إيقاف الحساب
                          </DropdownMenuItem>
                        )}
                        {user.status === "suspended" && (
                          <DropdownMenuItem onClick={() => updateUserStatus(user.id, "active")}>
                            إلغاء الإيقاف
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل المستخدم</DialogTitle>
            <DialogDescription>تعديل بيانات المستخدم المحدد</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">الاسم الكامل</Label>
              <Input
                id="edit-name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="أدخل الاسم الكامل"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">البريد الإلكتروني</Label>
              <Input
                id="edit-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">رقم الهاتف</Label>
              <Input
                id="edit-phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="أدخل رقم الهاتف"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">الدور</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">عميل</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateUser}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
