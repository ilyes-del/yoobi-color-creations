"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Package, Star, ArrowLeft, Menu, Search, Heart } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import SearchBar from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex">
    </div>
            </h1 >
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              متجر شامل للوازم المدرسية عالية الجودة بأسعار مناسبة. كل عملية شراء تساهم في دعم طالب محتاج بالحصول على
              لوازمه المدرسية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover-lift"
                onClick={() => window.location.href = '/products'}
              >
                تسوق الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent border-2 border-primary hover:bg-primary hover:text-primary-foreground hover-lift"
              >
                عرض الفئات
              </Button>
            </div>
          </div >
        </section >
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r p-6 gap-6 sticky top-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-primary">SchoolSpark</span>
        </div>
        <nav className="flex flex-col gap-4">
          <a href="/" className="text-foreground hover:text-primary transition-colors">الرئيسية</a>
          <a href="/products" className="text-foreground hover:text-primary transition-colors">المنتجات</a>
          <a href="/categories" className="text-foreground hover:text-primary transition-colors">الفئات</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">العروض</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">من نحن</a>
        </nav>
        <div className="mt-8">
          return (
          <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r p-6 gap-6 sticky top-0">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-primary">SchoolSpark</span>
              </div>
              <nav className="flex flex-col gap-4">
                <a href="/" className="text-foreground hover:text-primary transition-colors">الرئيسية</a>
                <a href="/products" className="text-foreground hover:text-primary transition-colors">المنتجات</a>
                <a href="/categories" className="text-foreground hover:text-primary transition-colors">الفئات</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">العروض</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">من نحن</a>
              </nav>
              <div className="mt-8">
                {/* SearchBar in sidebar */}
                <div className="mb-4">
                  <SearchBar />
                </div>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/login'}>تسجيل الدخول</Button>
              </div>
            </aside>
            <div className="flex-1">
              {/* Main Content */}
              {/* Hero Section */}
              <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent-blue/20 rounded-full blur-xl"></div>
                </div>
                <div className="container mx-auto text-center relative">
                  <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 text-primary hover:from-primary/20 hover:to-accent/20 border-primary/20">
                    ✨ متجر اللوازم المدرسية الأول
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                    كل ما تحتاجه للمدرسة
                    <br />
                    في مكان واحد
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    متجر شامل للوازم المدرسية عالية الجودة بأسعار مناسبة. كل عملية شراء تساهم في دعم طالب محتاج بالحصول على
                    لوازمه المدرسية.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover-lift"
                      onClick={() => window.location.href = '/products'}
                    >
                      تسوق الآن
                      <ArrowLeft className="mr-2 h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 bg-transparent border-2 border-primary hover:bg-primary hover:text-primary-foreground hover-lift"
                    >
                      عرض الفئات
                    </Button>
                  </div>
                </div>
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${product.badgeColor} text-white border-0`}>{product.badge}</Badge>
              </div>
              <h3 className="font-semibold mb-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">من {product.brand}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} تقييم)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary text-lg">{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                </div>
                <AddToCartButton
                  productId={product.id}
                  productName={product.title}
                  size="sm"
                  className="hover-lift bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </CardContent>
          </Card>
            ))}
        </div>
    </div>
      </section >

    {/* Impact Section */ }
    < section className = "py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-accent-blue/5 relative overflow-hidden" >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary/10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent-blue/10 rounded-full"></div>
        </div>

        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">تأثيرنا في المجتمع</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            نؤمن بأن التعليم حق للجميع. لذلك مع كل عملية شراء، نوفر لوازم مدرسية لطالب محتاج
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 card-hover">
              <div className="text-4xl font-bold gradient-text mb-2">5,000+</div>
              <div className="text-muted-foreground">طالب مستفيد</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 card-hover">
              <div className="text-4xl font-bold text-accent mb-2">15,000+</div>
              <div className="text-muted-foreground">منتج متوفر</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 card-hover">
              <div className="text-4xl font-bold text-accent-blue mb-2">200+</div>
              <div className="text-muted-foreground">مدرسة شريكة</div>
            </div>
          </div>
        </div>
      </section >

    {/* Footer */ }
    < footer className = "bg-gradient-to-br from-card to-muted/30 py-12 px-4" >
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
              <a href="#" className="block text-muted-foreground hover:text-primary">
                المنتجات
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                الفئات
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                العروض
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                المساعدة
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">خدمة العملاء</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary">
                مركز المساعدة
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                اتصل بنا
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                سياسة الإرجاع
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary">
                الشحن والتوصيل
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">تابعنا</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <span className="sr-only">فيسبوك</span>📘
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">تويتر</span>🐦
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">إنستغرام</span>📷
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">واتساب</span>💬
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 SchoolSpark. جميع الحقوق محفوظة.</p>
        </div>
      </div>
      </footer >
    </div >
  )
}
