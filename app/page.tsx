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
    <div className="min-h-screen bg-background">
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Navigation for mobile */}
        <nav className="md:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-primary">SchoolSpark</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              {/* SearchBar for mobile */}
              <div className="w-full">
                <SearchBar />
              </div>
              <CartDrawer />
              <Button variant="outline" onClick={() => window.location.href = '/login'}>تسجيل الدخول</Button>
            </div>
          </div>
        </nav>

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
        </section>
        {/* ...existing code... */}
        {/* The rest of the page remains unchanged */}
      </div>
    </div>
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
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">لماذا SchoolSpark؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نقدم أفضل اللوازم المدرسية بجودة عالية وأسعار تنافسية مع التأثير الاجتماعي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center card-hover border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <CardTitle>منتجات متنوعة</CardTitle>
                <CardDescription>مجموعة شاملة من اللوازم المدرسية لجميع المراحل الدراسية</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-hover border-0 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <CardTitle>جودة عالية</CardTitle>
                <CardDescription>منتجات مختارة بعناية من أفضل الماركات العالمية والمحلية</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center card-hover border-0 bg-gradient-to-br from-accent-blue/5 to-accent-blue/10">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-blue/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>تأثير اجتماعي</CardTitle>
                <CardDescription>مع كل عملية شراء، ندعم طالباً محتاجاً بتوفير لوازمه المدرسية</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">المنتجات الأكثر مبيعاً</h2>
            <Button variant="outline" className="hover-lift bg-transparent">
              عرض الكل
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "حقيبة مدرسية فاخرة",
                brand: "سكول باك",
                rating: 4.9,
                reviews: 125,
                price: "149 ريال",
                originalPrice: "199 ريال",
                image: "/premium-school-backpack.png",
                badgeColor: "bg-gradient-to-r from-primary to-secondary",
                badge: "الأكثر مبيعاً",
              },
              {
                id: 2,
                title: "طقم أدوات هندسية كامل",
                brand: "ماث تولز",
                rating: 4.8,
                reviews: 89,
                price: "45 ريال",
                originalPrice: "65 ريال",
                image: "/geometry-tools-set-compass-ruler.png",
                badgeColor: "bg-gradient-to-r from-accent to-accent/80",
                badge: "خصم 30%",
              },
              {
                id: 3,
                title: "دفاتر ملاحظات مجموعة 5 قطع",
                brand: "نوت بوك برو",
                rating: 4.9,
                reviews: 210,
                price: "25 ريال",
                originalPrice: "35 ريال",
                image: "/colorful-school-notebooks-set.png",
                badgeColor: "bg-gradient-to-r from-accent-blue to-accent-blue/80",
                badge: "عرض خاص",
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden card-hover border-0 shadow-lg">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
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
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-accent-blue/5 relative overflow-hidden">
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
      </footer>
    </div>
  )
}
