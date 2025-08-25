"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("adminToken")
        const user = localStorage.getItem("adminUser")

        if (token && user) {
          const userData = JSON.parse(user)
          if (userData.role === "admin") {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
            router.push("/admin/login")
          }
        } else {
          setIsAuthenticated(false)
          router.push("/admin/login")
        }
      } catch (error) {
        setIsAuthenticated(false)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 animate-pulse">
              <ShoppingBag className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">جاري التحقق من صلاحية الدخول...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will redirect to login
  }

  return <>{children}</>
}
