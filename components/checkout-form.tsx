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
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const required = ["name", "email", "phone"]
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
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
              <CreditCard className="h-5 w-5" />
              طريقة الدفع
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Only cash payment method */}
            <div className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg">
              <RadioGroupItem value="cash" id="cash" checked readOnly />
              <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                <Banknote className="h-4 w-4" />
                الدفع نقداً عند الاستلام
                <Badge variant="secondary" className="mr-auto">
                  الطريقة الوحيدة
                </Badge>
              </Label>
            </div>
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
                    <span className="font-medium">{(item.price * item.quantity).toFixed(0)} دج</span>
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المجموع الفرعي:</span>
                <span>{summary.totalPrice.toFixed(0)} دج</span>
              </div>
              {summary.savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>التوفير:</span>
                  <span>-{summary.savings.toFixed(0)} دج</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>الضريبة (15%):</span>
                <span>{(summary.totalPrice * 0.15).toFixed(0)} دج</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>المجموع النهائي:</span>
                <span className="text-primary">{(summary.finalTotal + summary.totalPrice * 0.15).toFixed(0)} دج</span>
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
