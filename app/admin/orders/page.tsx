"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Truck, CheckCircle, XCircle, Clock, ShoppingCart, DollarSign } from "lucide-react"

// Mock data for orders
const mockOrders = [
  {
    id: "#12345",
    customerName: "أحمد محمد علي",
    customerEmail: "ahmed@example.com",
    customerPhone: "+966501234567",
    items: [
      { name: "حقيبة مدرسية فاخرة", quantity: 1, price: 149 },
      { name: "دفاتر ملاحظات مجموعة 5 قطع", quantity: 2, price: 25 },
    ],
    totalAmount: 199,
    status: "pending",
    paymentStatus: "paid",
    shippingAddress: "الرياض، حي النرجس، شارع الملك فهد",
    orderDate: "2024-01-20T10:30:00Z",
    estimatedDelivery: "2024-01-25",
  },
  {
    id: "#12344",
    customerName: "فاطمة سالم",
    customerEmail: "fatima@example.com",
    customerPhone: "+966507654321",
    items: [
      { name: "طقم أدوات هندسية كامل", quantity: 1, price: 45 },
      { name: "أقلام ملونة 24 لون", quantity: 1, price: 35 },
    ],
    totalAmount: 89,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "جدة، حي الزهراء، شارع الأمير سلطان",
    orderDate: "2024-01-19T14:15:00Z",
    estimatedDelivery: "2024-01-24",
  },
  {
    id: "#12343",
    customerName: "محمد أحمد",
    customerEmail: "mohammed@example.com",
    customerPhone: "+966512345678",
    items: [
      { name: "حقيبة مدرسية فاخرة", quantity: 2, price: 149 },
      { name: "مقلمة مدرسية بسحاب", quantity: 3, price: 18 },
    ],
    totalAmount: 352,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "الدمام، حي الفيصلية، شارع الخليج",
    orderDate: "2024-01-18T09:45:00Z",
    estimatedDelivery: "2024-01-23",
  },
  {
    id: "#12342",
    customerName: "نورا عبدالله",
    customerEmail: "nora@example.com",
    customerPhone: "+966598765432",
    items: [{ name: "دفاتر ملاحظات مجموعة 5 قطع", quantity: 1, price: 25 }],
    totalAmount: 67,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: "مكة المكرمة، حي العزيزية، شارع إبراهيم الخليل",
    orderDate: "2024-01-17T16:20:00Z",
    estimatedDelivery: "2024-01-22",
  },
  {
    id: "#12341",
    customerName: "خالد محمد",
    customerEmail: "khalid@example.com",
    customerPhone: "+966523456789",
    items: [{ name: "أدوات هندسية", quantity: 1, price: 45 }],
    totalAmount: 45,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingAddress: "الطائف، حي الشفا، شارع الملك عبدالعزيز",
    orderDate: "2024-01-16T11:10:00Z",
    estimatedDelivery: null,
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "في الانتظار", className: "bg-yellow-100 text-yellow-800" },
      processing: { label: "قيد المعالجة", className: "bg-blue-100 text-blue-800" },
      shipped: { label: "تم الشحن", className: "bg-purple-100 text-purple-800" },
      delivered: { label: "تم التسليم", className: "bg-green-100 text-green-800" },
      cancelled: { label: "ملغي", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "مدفوع", className: "bg-green-100 text-green-800" },
      pending: { label: "في الانتظار", className: "bg-yellow-100 text-yellow-800" },
      failed: { label: "فشل", className: "bg-red-100 text-red-800" },
      refunded: { label: "مسترد", className: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.totalAmount, 0)

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
          <p className="text-muted-foreground">متابعة وإدارة طلبات العملاء</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.total}</div>
            <p className="text-xs text-muted-foreground">{orderStats.pending} طلب في الانتظار</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground">من الطلبات المدفوعة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد المعالجة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
            <p className="text-xs text-muted-foreground">طلب يحتاج معالجة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تم التسليم</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
            <p className="text-xs text-muted-foreground">طلب مكتمل</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلبات</CardTitle>
          <CardDescription>إدارة ومتابعة جميع طلبات العملاء</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في الطلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="processing">قيد المعالجة</SelectItem>
                <SelectItem value="shipped">تم الشحن</SelectItem>
                <SelectItem value="delivered">تم التسليم</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>حالة الطلب</TableHead>
                <TableHead>حالة الدفع</TableHead>
                <TableHead>تاريخ الطلب</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-primary">{order.totalAmount} ريال</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {order.status === "pending" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                            <Clock className="mr-2 h-4 w-4" />
                            بدء المعالجة
                          </DropdownMenuItem>
                        )}
                        {order.status === "processing" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                            <Truck className="mr-2 h-4 w-4" />
                            تم الشحن
                          </DropdownMenuItem>
                        )}
                        {order.status === "shipped" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            تم التسليم
                          </DropdownMenuItem>
                        )}
                        {(order.status === "pending" || order.status === "processing") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => updateOrderStatus(order.id, "cancelled")}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              إلغاء الطلب
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب {selectedOrder?.id}</DialogTitle>
            <DialogDescription>معلومات مفصلة عن الطلب والعميل</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">معلومات العميل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">الاسم</p>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-medium">{selectedOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                      <p className="font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">معلومات الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">حالة الطلب</p>
                      <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">حالة الدفع</p>
                      <div className="mt-1">{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الطلب</p>
                      <p className="font-medium">{formatDate(selectedOrder.orderDate)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipping Address */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">عنوان الشحن</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  {selectedOrder.estimatedDelivery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      التسليم المتوقع: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString("ar-SA")}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">المنتجات المطلوبة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{item.price * item.quantity} ريال</p>
                          <p className="text-sm text-muted-foreground">{item.price} ريال للقطعة</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">المجموع الكلي</p>
                        <p className="font-bold text-lg text-primary">{selectedOrder.totalAmount} ريال</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
