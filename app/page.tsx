"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, ArrowLeft, Menu, Heart, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import SearchBar from "@/components/search-bar"
import Link from "next/link"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
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

          {/* Right side (Search + Wishlist) */}
          <div className="flex items-center gap-4">
            {/* SearchBar always in header */}
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
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-64 bg-card h-full shadow-xl z-50 p-6 flex flex-col">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
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
              {/* Login only here */}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => (window.location.href = "/login")}
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-blue/20 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto text-center relative">
            <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 text-primary">
              ✨ متجر اللوازم المدرسية الأول
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              كل ما تحتاجه للمدرسة
              <br />
              في مكان واحد
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              متجر شامل للوازم المدرسية عالية الجودة بأسعار مناسبة. 
              كل عملية شراء تساهم في دعم طالب محتاج بالحصول على لوازمه المدرسية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={() => (window.location.href = "/products")}
              >
                تسوق الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 border-2 border-primary hover:bg-primary hover:text-primary-foreground"
              >
                عرض الفئات
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-accent-blue/5 relative overflow-hidden">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">تأثيرنا في المجتمع</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              نؤمن بأن التعليم حق للجميع. لذلك مع كل عملية شراء، نوفر لوازم مدرسية لطالب محتاج
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-4xl font-bold gradient-text mb-2">5,000+</div>
                <div className="text-muted-foreground">طالب مستفيد</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5">
                <div className="text-4xl font-bold text-accent mb-2">15,000+</div>
                <div className="text-muted-foreground">منتج متوفر</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-blue/5">
                <div className="text-4xl font-bold text-accent-blue mb-2">200+</div>
                <div className="text-muted-foreground">مدرسة شريكة</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-card to-muted/30 py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-xl text-primary">SchoolSpark</span>
                </div>
                <p className="text-muted-foreground mb-4">متجر اللوازم المدرسية الأول في المملكة</p>
                <div className="text-sm text-muted-foreground">انضم إلى عائلة SchoolSpark!</div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">روابط سريعة</h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-primary">المنتجات</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">الفئات</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">العروض</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">المساعدة</a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">خدمة العملاء</h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-primary">مركز المساعدة</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">اتصل بنا</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">سياسة الإرجاع</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary">الشحن والتوصيل</a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">تابعنا</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">📘</Button>
                  <Button variant="outline" size="icon">🐦</Button>
                  <Button variant="outline" size="icon">📷</Button>
                  <Button variant="outline" size="icon">💬</Button>
                </div>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2024 SchoolSpark. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
