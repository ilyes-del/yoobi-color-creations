"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-provider"
import { toast } from "sonner"
import { CreditCard, Banknote, Building2, Truck, MapPin, User } from "lucide-react"

interface CheckoutFormProps {
  onOrderComplete?: (orderId: string) => void
}

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { items, summary, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      district: "",
      postalCode: "",
      country: "المملكة العربية السعودية",
    },
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const validateForm = () => {
    const required = ["name", "email", "phone", "address.street", "address.city", "address.district"]
    for (const field of required) {
      if (field.startsWith("address.")) {
        const addressField = field.split(".")[1]
        if (!formData.address[addressField as keyof typeof formData.address]) {
          return false
        }
      } else if (!formData[field as keyof typeof formData]) {
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    if (items.length === 0) {
      toast.error("السلة فارغة")
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        customerInfo: formData,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          nameEn: item.nameEn,
          brand: item.brand,
          image: item.image,
        })),
        paymentMethod,
        notes: formData.notes,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success("تم إنشاء الطلب بنجاح!")
        await clearCart()
        onOrderComplete?.(result.order.id)
      } else {
        const error = await response.json()
        toast.error(error.error || "فشل في إنشاء الطلب")
      }
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("حدث خطأ أثناء إنشاء الطلب")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">السلة فارغة</h2>
        <p className="text-muted-foreground mb-6">أضف بعض المنتجات لتتمكن من إتمام الطلب</p>
        <Button>تصفح المنتجات</Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات العميل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">الاسم الكامل *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="05xxxxxxxx"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              عنوان التوصيل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">الشارع والحي *</Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) => handleInputChange("address.street", e.target.value)}
                placeholder="اسم الشارع والحي"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">المدينة *</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange("address.city", e.target.value)}
                  placeholder="الرياض"
                  required
                />
              </div>
              <div>
                <Label htmlFor="district">المنطقة *</Label>
                <Input
                  id="district"
                  value={formData.address.district}
                  onChange={(e) => handleInputChange("address.district", e.target.value)}
                  placeholder="المنطقة"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">الرمز البريدي</Label>
                <Input
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => handleInputChange("address.postalCode", e.target.value)}
                  placeholder="12345"
                />
              </div>
              <div>
                <Label htmlFor="country">الدولة</Label>
                <Input
                  id="country"
                  value={formData.address.country}
                  onChange={(e) => handleInputChange("address.country", e.target.value)}
                  disabled
                />
              </div>
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
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Banknote className="h-4 w-4" />
                  الدفع عند الاستلام
                  <Badge variant="secondary" className="mr-auto">
                    الأكثر شيوعاً
                  </Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg opacity-50">
                <RadioGroupItem value="card" id="card" disabled />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4" />
                  بطاقة ائتمان
                  <Badge variant="outline" className="mr-auto">
                    قريباً
                  </Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg opacity-50">
                <RadioGroupItem value="bank_transfer" id="bank_transfer" disabled />
                <Label htmlFor="bank_transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="h-4 w-4" />
                  تحويل بنكي
                  <Badge variant="outline" className="mr-auto">
                    قريباً
                  </Badge>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="أي ملاحظات خاصة بالطلب (اختياري)"
              rows={3}
            />
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>ملخص الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">من {item.brand}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">الكمية: {item.quantity}</span>
                    <span className="font-medium">{(item.price * item.quantity).toFixed(0)} ريال</span>
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المجموع الفرعي:</span>
                <span>{summary.totalPrice.toFixed(0)} ريال</span>
              </div>
              {summary.savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>التوفير:</span>
                  <span>-{summary.savings.toFixed(0)} ريال</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  الشحن:
                </span>
                <span>{summary.shippingCost === 0 ? "مجاني" : `${summary.shippingCost} ريال`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الضريبة (15%):</span>
                <span>{(summary.totalPrice * 0.15).toFixed(0)} ريال</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>المجموع النهائي:</span>
                <span className="text-primary">{(summary.finalTotal + summary.totalPrice * 0.15).toFixed(0)} ريال</span>
              </div>
            </div>

            {summary.shippingCost === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800 font-medium">🎉 تهانينا! حصلت على شحن مجاني</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "جاري إنشاء الطلب..." : "تأكيد الطلب"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>بالضغط على "تأكيد الطلب" فإنك توافق على</p>
          <div className="flex justify-center gap-4 mt-1">
            <a href="#" className="text-primary hover:underline">
              الشروط والأحكام
            </a>
            <a href="#" className="text-primary hover:underline">
              سياسة الخصوصية
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
