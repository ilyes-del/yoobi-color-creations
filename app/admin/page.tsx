import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Eye, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231 ريال</div>
            <p className="text-xs text-muted-foreground">+20.1% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+19% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">العملاء النشطين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 منذ الساعة الماضية</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>الطلبات الأخيرة</CardTitle>
            <CardDescription>آخر الطلبات المستلمة اليوم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#12345",
                  customer: "أحمد محمد",
                  amount: "150 ريال",
                  status: "pending",
                  time: "منذ 5 دقائق",
                },
                {
                  id: "#12344",
                  customer: "فاطمة علي",
                  amount: "89 ريال",
                  status: "completed",
                  time: "منذ 15 دقيقة",
                },
                {
                  id: "#12343",
                  customer: "محمد سالم",
                  amount: "245 ريال",
                  status: "processing",
                  time: "منذ 30 دقيقة",
                },
                {
                  id: "#12342",
                  customer: "نورا أحمد",
                  amount: "67 ريال",
                  status: "completed",
                  time: "منذ ساعة",
                },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {order.status === "completed"
                        ? "مكتمل"
                        : order.status === "processing"
                          ? "قيد المعالجة"
                          : "في الانتظار"}
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
            <CardDescription>نظرة عامة على الأداء</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">طلبات مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">طلبات في الانتظار</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">زيارات اليوم</p>
                  <p className="text-2xl font-bold text-blue-600">2,456</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">معدل التحويل</p>
                  <p className="text-2xl font-bold text-primary">3.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
