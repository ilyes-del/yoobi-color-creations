"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  LogOut,
  ShoppingBag,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { AdminAuthGuard } from "@/components/admin-auth-guard"

const sidebarItems = [
  {
    title: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "الفئات",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "المنتجات",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "الطلبات",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "المستخدمين",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "التقارير",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
]

function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">SchoolSpark</span>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-background">
        {/* Mobile sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-40 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Desktop sidebar */}
        <div className="hidden md:fixed md:inset-y-0 md:right-0 md:z-50 md:w-64 md:overflow-y-auto md:bg-card md:border-l">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="md:pr-64">
          {/* Top bar */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <h1 className="text-xl font-semibold text-foreground">لوحة الإدارة</h1>
              </div>
              <div className="flex flex-1 justify-end">
                <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}
