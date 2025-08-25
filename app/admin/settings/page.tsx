"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Save, Store, Bell, Shield, Palette, Globe, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    name: "SchoolSpark",
    description: "متجر اللوازم المدرسية الأول في المملكة",
    email: "info@schoolspark.com",
    phone: "+966501234567",
    address: "الرياض، المملكة العربية السعودية",
    currency: "SAR",
    language: "ar",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newUsers: false,
    systemUpdates: true,
    emailNotifications: true,
    smsNotifications: false,
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات النظام</h1>
          <p className="text-muted-foreground">إدارة إعدادات المتجر والنظام</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">تم حفظ الإعدادات بنجاح!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store" className="gap-2">
            <Store className="h-4 w-4" />
            المتجر
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            المظهر
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معلومات المتجر</CardTitle>
              <CardDescription>إعدادات أساسية للمتجر ومعلومات الاتصال</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">اسم المتجر</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">البريد الإلكتروني</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeDescription">وصف المتجر</Label>
                <Textarea
                  id="storeDescription"
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storePhone">رقم الهاتف</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="storeCurrency">العملة</Label>
                  <Input
                    id="storeCurrency"
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeAddress">العنوان</Label>
                <Textarea
                  id="storeAddress"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تحكم في الإشعارات التي تريد استلامها</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">إشعارات النظام</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newOrders">الطلبات الجديدة</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند وصول طلب جديد</p>
                    </div>
                    <Switch
                      id="newOrders"
                      checked={notifications.newOrders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lowStock">نفاد المخزون</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند انخفاض المخزون</p>
                    </div>
                    <Switch
                      id="lowStock"
                      checked={notifications.lowStock}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newUsers">المستخدمين الجدد</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند تسجيل مستخدم جديد</p>
                    </div>
                    <Switch
                      id="newUsers"
                      checked={notifications.newUsers}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newUsers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemUpdates">تحديثات النظام</Label>
                      <p className="text-sm text-muted-foreground">إشعار عند توفر تحديثات</p>
                    </div>
                    <Switch
                      id="systemUpdates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">طرق الإشعار</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">البريد الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">استلام الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">الرسائل النصية</Label>
                      <p className="text-sm text-muted-foreground">استلام الإشعارات عبر الرسائل النصية</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>تحكم في إعدادات الأمان وحماية الحساب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">المصادقة الثنائية</Label>
                  <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية لحماية إضافية</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">انتهاء الجلسة (دقيقة)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">انتهاء كلمة المرور (يوم)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity({ ...security, passwordExpiry: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="loginAttempts">عدد محاولات تسجيل الدخول المسموحة</Label>
                <Input
                  id="loginAttempts"
                  type="number"
                  value={security.loginAttempts}
                  onChange={(e) => setSecurity({ ...security, loginAttempts: e.target.value })}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground mt-1">سيتم حظر الحساب مؤقتاً بعد تجاوز هذا العدد</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المظهر</CardTitle>
              <CardDescription>تخصيص مظهر لوحة الإدارة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>اللغة</Label>
                <p className="text-sm text-muted-foreground mb-2">اختر لغة واجهة لوحة الإدارة</p>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>العربية (افتراضي)</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label>المظهر</Label>
                <p className="text-sm text-muted-foreground mb-2">اختر مظهر لوحة الإدارة</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <div className="w-full h-20 bg-gradient-to-br from-background to-muted rounded mb-2"></div>
                    <p className="text-sm font-medium">المظهر الفاتح</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent opacity-50">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                    <p className="text-sm font-medium">المظهر الداكن (قريباً)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
