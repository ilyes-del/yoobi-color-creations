"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, ArrowLeft, Menu, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import SearchBar from "@/components/search-bar"
import Link from "next/link"

const products = [
  {
    id: 1,
    title: "حقيبة مدرسية فاخرة",
    brand: "سكول باك",
    price: "149 ريال",
    image: "/premium-school-backpack.png",
  },
  {
    id: 2,
    title: "طقم أدوات هندسية كامل",
    brand: "ماث تولز",
    price: "45 ريال",
    image: "/geometry-tools-set-compass-ruler.png",
  },
  {
    id: 3,
    title: "دفاتر ملاحظات مجموعة 5 قطع",
    brand: "نوت بوك برو",
    price: "25 ريال",
    image: "/colorful-school-notebooks-set.png",
  },
]

export default function ProductsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">SchoolSpark</span>
            </div>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-primary">الرئيسية</Link>
            <Link href="/products" className="hover:text-primary">المنتجات</Link>
            <Link href="/categories" className="hover:text-primary">الفئات</Link>
            <Link href="#" className="hover:text-primary">العروض</Link>
            <Link href="#" className="hover:text-primary">من نحن</Link>
          </nav>
          {/* Right side (Search + Cart) */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>
            <CartDrawer />
          </div>
        </div>
        {/* Mobile Search below nav */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>
      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-64 bg-card h-full shadow-xl z-50 p-6 flex flex-col">
            <button className="absolute top-4 right-4" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
            <nav className="mt-12 flex flex-col gap-4">
              <Link href="/" className="hover:text-primary">الرئيسية</Link>
              <Link href="/products" className="hover:text-primary">المنتجات</Link>
              <Link href="/categories" className="hover:text-primary">الفئات</Link>
              <Link href="#" className="hover:text-primary">العروض</Link>
              <Link href="#" className="hover:text-primary">من نحن</Link>
            </nav>
            <div className="mt-6">
              <Button variant="outline" className="w-full mt-4" onClick={() => (window.location.href = "/login")}>تسجيل الدخول</Button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">جميع المنتجات</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-2">{product.title}</h2>
                  <p className="text-muted-foreground mb-2">{product.brand}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-primary text-xl">{product.price}</span>
                  <Button size="sm" className="bg-primary text-white">أضف للسلة</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
