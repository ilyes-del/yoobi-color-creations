"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, Star, Calendar, Target } from "lucide-react"
import { useState } from "react"

// Mock analytics data
const salesData = [
  { month: "يناير", sales: 45231, orders: 234, customers: 156 },
  { month: "فبراير", sales: 52340, orders: 267, customers: 189 },
  { month: "مارس", sales: 48920, orders: 245, customers: 167 },
  { month: "أبريل", sales: 61250, orders: 312, customers: 203 },
  { month: "مايو", sales: 58430, orders: 289, customers: 198 },
  { month: "يونيو", sales: 67890, orders: 345, customers: 234 },
]

const categoryData = [
  { name: "حقائب مدرسية", value: 35, sales: 125430, color: "#FF6B35" },
  { name: "أدوات كتابة", value: 25, sales: 89650, color: "#F7931E" },
  { name: "دفاتر وكراسات", value: 20, sales: 67890, color: "#FFD23F" },
  { name: "أدوات هندسية", value: 12, sales: 45230, color: "#06FFA5" },
  { name: "لوازم فنية", value: 8, sales: 23450, color: "#4ECDC4" },
]

const topProducts = [
  { name: "حقيبة مدرسية فاخرة", sales: 234, revenue: 34860, growth: 12.5 },
  { name: "طقم أدوات هندسية", sales: 189, revenue: 8505, growth: 8.3 },
  { name: "دفاتر ملاحظات مجموعة", sales: 156, revenue: 3900, growth: -2.1 },
  { name: "أقلام ملونة 24 لون", sales: 134, revenue: 4690, growth: 15.7 },
  { name: "مقلمة مدرسية", sales: 98, revenue: 1764, growth: 5.2 },
]

const dailyVisitors = [
  { day: "السبت", visitors: 1234, conversions: 45 },
  { day: "الأحد", visitors: 1456, conversions: 52 },
  { day: "الاثنين", visitors: 1678, conversions: 61 },
  { day: "الثلاثاء", visitors: 1543, conversions: 48 },
  { day: "الأربعاء", visitors: 1789, conversions: 67 },
  { day: "الخميس", visitors: 1923, conversions: 73 },
  { day: "الجمعة", visitors: 1345, conversions: 41 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0)
  const avgOrderValue = totalRevenue / totalOrders

  const revenueGrowth = ((salesData[5].sales - salesData[0].sales) / salesData[0].sales) * 100
  const ordersGrowth = ((salesData[5].orders - salesData[0].orders) / salesData[0].orders) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التقارير والتحليلات</h1>
          <p className="text-muted-foreground">نظرة شاملة على أداء المتجر والمبيعات</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">آخر 7 أيام</SelectItem>
            <SelectItem value="30days">آخر 30 يوم</SelectItem>
            <SelectItem value="3months">آخر 3 أشهر</SelectItem>
            <SelectItem value="6months">آخر 6 أشهر</SelectItem>
            <SelectItem value="1year">آخر سنة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} دج</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{revenueGrowth.toFixed(1)}%</span>
              <span className="text-muted-foreground">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{ordersGrowth.toFixed(1)}%</span>
              <span className="text-muted-foreground">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">العملاء الجدد</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+18.2%</span>
              <span className="text-muted-foreground">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط قيمة الطلب</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOrderValue.toFixed(0)} دج</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-red-600" />
              <span className="text-red-600">-2.4%</span>
              <span className="text-muted-foreground">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="traffic">الزيارات</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>نمو الإيرادات الشهرية</CardTitle>
                <CardDescription>تطور المبيعات خلال الأشهر الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any) => [`${value.toLocaleString()} دج`, "المبيعات"]}
                      labelStyle={{ color: "#000" }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الطلبات والعملاء</CardTitle>
                <CardDescription>مقارنة بين عدد الطلبات والعملاء الجدد</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "#000" }} />
                    <Line type="monotone" dataKey="orders" stroke="#F7931E" strokeWidth={2} name="الطلبات" />
                    <Line type="monotone" dataKey="customers" stroke="#4ECDC4" strokeWidth={2} name="العملاء الجدد" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المبيعات حسب الفئة</CardTitle>
                <CardDescription>نسبة مساهمة كل فئة في إجمالي المبيعات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أداء الفئات</CardTitle>
                <CardDescription>إيرادات كل فئة بالتفصيل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.value}% من المبيعات</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{category.sales.toLocaleString()} دج</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أفضل المنتجات مبيعاً</CardTitle>
              <CardDescription>المنتجات الأكثر مبيعاً وإيراداً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} مبيعة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-primary">{product.revenue.toLocaleString()} دج</p>
                        <div className="flex items-center gap-1">
                          {product.growth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                          <span className={`text-xs ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>الزيارات اليومية</CardTitle>
                <CardDescription>عدد زوار الموقع خلال الأسبوع</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "#000" }} />
                    <Bar dataKey="visitors" fill="#FF6B35" name="الزوار" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معدل التحويل</CardTitle>
                <CardDescription>نسبة الزوار الذين قاموا بالشراء</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyVisitors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any, name: string) => [
                        name === "conversions" ? `${value} عملية شراء` : `${value} زائر`,
                        name === "conversions" ? "المشتريات" : "الزوار",
                      ]}
                      labelStyle={{ color: "#000" }}
                    />
                    <Line type="monotone" dataKey="visitors" stroke="#4ECDC4" strokeWidth={2} name="الزوار" />
                    <Line type="monotone" dataKey="conversions" stroke="#F7931E" strokeWidth={2} name="المشتريات" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الزيارات</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dailyVisitors.reduce((sum, day) => sum + day.visitors, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">معدل التحويل</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    (dailyVisitors.reduce((sum, day) => sum + day.conversions, 0) /
                      dailyVisitors.reduce((sum, day) => sum + day.visitors, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </div>
                <p className="text-xs text-muted-foreground">من الزوار</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط الزيارات</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(dailyVisitors.reduce((sum, day) => sum + day.visitors, 0) / dailyVisitors.length)}
                </div>
                <p className="text-xs text-muted-foreground">زائر يومياً</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">أفضل يوم</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dailyVisitors.reduce((max, day) => (day.visitors > max.visitors ? day : max)).day}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dailyVisitors.reduce((max, day) => (day.visitors > max.visitors ? day : max)).visitors} زائر
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
