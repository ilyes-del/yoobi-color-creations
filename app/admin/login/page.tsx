"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShoppingBag, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      // Mock authentication - in real app, this would be an API call
      if (email === "admin@schoolspark.com" && password === "admin123") {
        // Store auth token in localStorage (in real app, use secure storage)
        localStorage.setItem("adminToken", "mock-admin-token")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: 1,
            name: "مدير النظام",
            email: "admin@schoolspark.com",
            role: "admin",
          }),
        )

        router.push("/admin")
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-accent-blue/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-blue/10 rounded-full blur-xl"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-primary">SchoolSpark</span>
          </div>
          <CardTitle className="text-2xl">تسجيل دخول المدير</CardTitle>
          <CardDescription>أدخل بيانات الدخول للوصول إلى لوحة الإدارة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@schoolspark.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center mb-2">بيانات تجريبية:</p>
            <div className="text-xs space-y-1">
              <p>
                <strong>البريد:</strong> admin@schoolspark.com
              </p>
              <p>
                <strong>كلمة المرور:</strong> admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
