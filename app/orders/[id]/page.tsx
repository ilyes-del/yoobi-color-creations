import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, MapPin, Phone, Mail, CreditCard } from "lucide-react"
import Link from "next/link"

// This would normally fetch from API
async function getOrder(id: string) {
  // Mock order data - in real app this would come from API
  return {
    id: "order_123",
    orderNumber: "SS000001",
    status: "confirmed",
    paymentStatus: "pending",
    paymentMethod: "cash",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-18T10:30:00Z",
    customerInfo: {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "0501234567",
      address: {
        street: "شارع الملك فهد، حي النخيل",
        city: "الرياض",
        district: "النخيل",
        postalCode: "12345",
        country: "المملكة العربية السعودية",
      },
    },
    items: [
      {
        productId: 1,
        name: "حقيبة مدرسية فاخرة",
        brand: "سكول باك",
        price: 149,
        quantity: 1,
        image: "/premium-school-backpack.png",
        total: 149,
      },
      {
        productId: 2,
        name: "طقم أدوات هندسية كامل",
        brand: "ماث تولز",
        price: 45,
        quantity: 2,
        image: "/geometry-tools-set-compass-ruler.png",
        total: 90,
      },
    ],
    summary: {
      subtotal: 239,
      discount: 0,
      shippingCost: 0,
      tax: 35.85,
      total: 274.85,
    },
    notes: "يرجى التوصيل في المساء",
  }
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "في الانتظار"
      case "confirmed":
        return "مؤكد"
      case "processing":
        return "قيد التحضير"
      case "shipped":
        return "تم الشحن"
      case "delivered":
        return "تم التوصيل"
      case "cancelled":
        return "ملغي"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline">العودة للرئيسية</Button>
            </Link>
            <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 text-green-800">
            <CheckCircle className="h-8 w-8" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">تم إنشاء طلبك بنجاح!</h2>
              <p className="text-sm">رقم الطلب: {order.orderNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  حالة الطلب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                  <span className="text-sm text-muted-foreground">
                    تاريخ الطلب: {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>التوصيل المتوقع: {new Date(order.estimatedDelivery).toLocaleDateString("ar-SA")}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>المنتجات المطلوبة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">من {item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">الكمية: {item.quantity}</span>
                        <div className="text-right">
                          <div className="font-medium">{item.total} دج</div>
                          <div className="text-sm text-muted-foreground">{item.price} دج للقطعة</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  معلومات التوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.customerInfo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{order.customerInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{order.customerInfo.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <div>
                    <div>{order.customerInfo.address.street}</div>
                    <div>
                      {order.customerInfo.address.district}, {order.customerInfo.address.city}
                    </div>
                    <div>{order.customerInfo.address.country}</div>
                    {order.customerInfo.address.postalCode && (
                      <div>الرمز البريدي: {order.customerInfo.address.postalCode}</div>
                    )}
                  </div>
                </div>
                {order.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h5 className="font-medium mb-1">ملاحظات:</h5>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span>{order.summary.subtotal} دج</span>
                </div>
                {order.summary.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>الخصم:</span>
                    <span>-{order.summary.discount} دج</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>الشحن:</span>
                  <span>{order.summary.shippingCost === 0 ? "مجاني" : `${order.summary.shippingCost} دج`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الضريبة:</span>
                  <span>{order.summary.tax} دج</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>المجموع النهائي:</span>
                  <span className="text-primary">{order.summary.total} دج</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span>الدفع عند الاستلام</span>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                    {order.paymentStatus === "paid" ? "مدفوع" : "في الانتظار"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                تتبع الطلب
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                تحميل الفاتورة
              </Button>
              <Link href="/">
                <Button className="w-full">متابعة التسوق</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
