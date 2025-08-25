"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Search, MoreHorizontal, Edit, Trash2, FolderOpen, Package } from "lucide-react"

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: "حقائب مدرسية",
    description: "حقائب مدرسية بأحجام وألوان متنوعة",
    productsCount: 45,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "أدوات كتابة",
    description: "أقلام وأقلام رصاص وأدوات كتابة متنوعة",
    productsCount: 128,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "دفاتر وكراسات",
    description: "دفاتر ملاحظات وكراسات بأشكال مختلفة",
    productsCount: 67,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: 4,
    name: "أدوات هندسية",
    description: "مساطر وبرجل وأدوات هندسية للطلاب",
    productsCount: 23,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    name: "لوازم فنية",
    description: "ألوان وفرش رسم ولوازم الأنشطة الفنية",
    productsCount: 89,
    status: "inactive",
    createdAt: "2024-01-03",
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: categories.length + 1,
        name: newCategory.name,
        description: newCategory.description,
        productsCount: 0,
        status: "active" as const,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setCategories([...categories, category])
      setNewCategory({ name: "", description: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
    })
  }

  const handleUpdateCategory = () => {
    if (editingCategory && newCategory.name.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategory.name, description: newCategory.description }
            : cat,
        ),
      )
      setEditingCategory(null)
      setNewCategory({ name: "", description: "" })
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const toggleCategoryStatus = (id: number) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, status: cat.status === "active" ? "inactive" : "active" } : cat,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الفئات</h1>
          <p className="text-muted-foreground">إدارة فئات المنتجات في المتجر</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة فئة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة فئة جديدة</DialogTitle>
              <DialogDescription>أضف فئة جديدة لتنظيم المنتجات في المتجر</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم الفئة</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="أدخل اسم الفئة"
                />
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="أدخل وصف الفئة"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddCategory}>إضافة الفئة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الفئات</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {categories.filter((c) => c.status === "active").length} فئة نشطة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.productsCount, 0)}</div>
            <p className="text-xs text-muted-foreground">في جميع الفئات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">أكثر الفئات منتجات</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(...categories.map((c) => c.productsCount))}</div>
            <p className="text-xs text-muted-foreground">
              {
                categories.find((c) => c.productsCount === Math.max(...categories.map((cat) => cat.productsCount)))
                  ?.name
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط المنتجات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(categories.reduce((sum, cat) => sum + cat.productsCount, 0) / categories.length)}
            </div>
            <p className="text-xs text-muted-foreground">منتج لكل فئة</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الفئات</CardTitle>
          <CardDescription>إدارة وتعديل فئات المنتجات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في الفئات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الفئة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>عدد المنتجات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.productsCount} منتج</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.status === "active" ? "default" : "secondary"}
                      className={
                        category.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {category.status === "active" ? "نشط" : "غير نشط"}
                    </Badge>
                  </TableCell>
                  <TableCell>{category.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleCategoryStatus(category.id)}>
                          {category.status === "active" ? "إلغاء التفعيل" : "تفعيل"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)} className="text-red-600">
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

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الفئة</DialogTitle>
            <DialogDescription>تعديل بيانات الفئة المحددة</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">اسم الفئة</Label>
              <Input
                id="edit-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="أدخل اسم الفئة"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">الوصف</Label>
              <Textarea
                id="edit-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="أدخل وصف الفئة"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCategory(null)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateCategory}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
