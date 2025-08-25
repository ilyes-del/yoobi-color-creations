"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Package, Eye, Star, TrendingUp } from "lucide-react"

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "حقيبة مدرسية فاخرة",
    description: "حقيبة مدرسية عالية الجودة مع جيوب متعددة",
    price: 149,
    originalPrice: 199,
    category: "حقائب مدرسية",
    categoryId: 1,
    stock: 25,
    status: "active",
    rating: 4.9,
    reviews: 125,
    image: "/premium-school-backpack.png",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "طقم أدوات هندسية كامل",
    description: "طقم شامل يحتوي على مسطرة وبرجل ومنقلة",
    price: 45,
    originalPrice: 65,
    category: "أدوات هندسية",
    categoryId: 4,
    stock: 50,
    status: "active",
    rating: 4.8,
    reviews: 89,
    image: "/geometry-tools-set-compass-ruler.png",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "دفاتر ملاحظات مجموعة 5 قطع",
    description: "مجموعة دفاتر ملاحظات بألوان زاهية",
    price: 25,
    originalPrice: 35,
    category: "دفاتر وكراسات",
    categoryId: 3,
    stock: 100,
    status: "active",
    rating: 4.9,
    reviews: 210,
    image: "/colorful-school-notebooks-set.png",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    name: "أقلام ملونة 24 لون",
    description: "مجموعة أقلام ملونة عالية الجودة",
    price: 35,
    originalPrice: 45,
    category: "أدوات كتابة",
    categoryId: 2,
    stock: 0,
    status: "out_of_stock",
    rating: 4.7,
    reviews: 156,
    image: "/colored-pencils-set.png",
    createdAt: "2024-01-08",
  },
  {
    id: 5,
    name: "مقلمة مدرسية بسحاب",
    description: "مقلمة عملية بتصميم جذاب",
    price: 18,
    originalPrice: 25,
    category: "حقائب مدرسية",
    categoryId: 1,
    stock: 75,
    status: "inactive",
    rating: 4.5,
    reviews: 67,
    image: "/school-pencil-case.png",
    createdAt: "2024-01-05",
  },
]

const categories = [
  { id: 1, name: "حقائب مدرسية" },
  { id: 2, name: "أدوات كتابة" },
  { id: 3, name: "دفاتر وكراسات" },
  { id: 4, name: "أدوات هندسية" },
  { id: 5, name: "لوازم فنية" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    stock: "",
    image: "",
  })

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.categoryId.toString() === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddProduct = () => {
    if (newProduct.name.trim() && newProduct.price && newProduct.categoryId) {
      const category = categories.find((cat) => cat.id.toString() === newProduct.categoryId)
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice
          ? Number.parseFloat(newProduct.originalPrice)
          : Number.parseFloat(newProduct.price),
        category: category?.name || "",
        categoryId: Number.parseInt(newProduct.categoryId),
        stock: Number.parseInt(newProduct.stock) || 0,
        status: "active" as const,
        rating: 0,
        reviews: 0,
        image: newProduct.image || "/school-supplies-flatlay.png",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        categoryId: "",
        stock: "",
        image: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      categoryId: product.categoryId.toString(),
      stock: product.stock.toString(),
      image: product.image,
    })
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name.trim() && newProduct.price && newProduct.categoryId) {
      const category = categories.find((cat) => cat.id.toString() === newProduct.categoryId)
      setProducts(
        products.map((prod) =>
          prod.id === editingProduct.id
            ? {
                ...prod,
                name: newProduct.name,
                description: newProduct.description,
                price: Number.parseFloat(newProduct.price),
                originalPrice: newProduct.originalPrice
                  ? Number.parseFloat(newProduct.originalPrice)
                  : Number.parseFloat(newProduct.price),
                category: category?.name || "",
                categoryId: Number.parseInt(newProduct.categoryId),
                stock: Number.parseInt(newProduct.stock) || 0,
                image: newProduct.image || prod.image,
              }
            : prod,
        ),
      )
      setEditingProduct(null)
      setNewProduct({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        categoryId: "",
        stock: "",
        image: "",
      })
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((prod) => prod.id !== id))
  }

  const toggleProductStatus = (id: number) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === id) {
          let newStatus = prod.status
          if (prod.status === "active") {
            newStatus = "inactive"
          } else if (prod.status === "inactive") {
            newStatus = "active"
          }
          return { ...prod, status: newStatus }
        }
        return prod
      }),
    )
  }

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge className="bg-red-100 text-red-800">نفد المخزون</Badge>
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
          <p className="text-muted-foreground">إدارة وتعديل منتجات المتجر</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة منتج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة منتج جديد</DialogTitle>
              <DialogDescription>أضف منتج جديد إلى المتجر</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">اسم المنتج</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="أدخل اسم المنتج"
                  />
                </div>
                <div>
                  <Label htmlFor="category">الفئة</Label>
                  <Select
                    value={newProduct.categoryId}
                    onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="price">السعر</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">السعر الأصلي</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stock">المخزون</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="image">رابط الصورة</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="أدخل وصف المنتج"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddProduct}>إضافة المنتج</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {products.filter((p) => p.status === "active").length} منتج نشط
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">نفد المخزون</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{products.filter((p) => p.stock === 0).length}</div>
            <p className="text-xs text-muted-foreground">منتج نفد مخزونه</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط التقييم</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">من 5 نجوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المخزون</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
            <p className="text-xs text-muted-foreground">قطعة في المخزون</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المنتجات</CardTitle>
          <CardDescription>إدارة وتعديل منتجات المتجر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الفئات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="out_of_stock">نفد المخزون</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>الفئة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المخزون</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">{product.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{product.price} ريال</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice} ريال</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                      className={
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {product.stock} قطعة
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          عرض
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                          {product.status === "active" ? "إلغاء التفعيل" : "تفعيل"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
            <DialogDescription>تعديل بيانات المنتج المحدد</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">اسم المنتج</Label>
                <Input
                  id="edit-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">الفئة</Label>
                <Select
                  value={newProduct.categoryId}
                  onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="edit-price">السعر</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-originalPrice">السعر الأصلي</Label>
                  <Input
                    id="edit-originalPrice"
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-stock">المخزون</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="edit-image">رابط الصورة</Label>
                <Input
                  id="edit-image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">الوصف</Label>
                <Textarea
                  id="edit-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="أدخل وصف المنتج"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateProduct}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
