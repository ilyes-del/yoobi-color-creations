import { type NextRequest, NextResponse } from "next/server"

// Mock categories data
const categories = [
  {
    id: 1,
    name: "حقائب مدرسية",
    description: "حقائب مدرسية بأحجام وألوان متنوعة",
    productsCount: 45,
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "أدوات كتابة",
    description: "أقلام وأقلام رصاص وأدوات كتابة متنوعة",
    productsCount: 128,
    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: 3,
    name: "دفاتر وكراسات",
    description: "دفاتر ملاحظات وكراسات بأشكال مختلفة",
    productsCount: 67,
    status: "active",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: 4,
    name: "أدوات هندسية",
    description: "مساطر وبرجل وأدوات هندسية للطلاب",
    productsCount: 23,
    status: "active",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
  {
    id: 5,
    name: "لوازم فنية",
    description: "ألوان وفرش رسم ولوازم الأنشطة الفنية",
    productsCount: 89,
    status: "inactive",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
]

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    let filteredCategories = categories

    if (search) {
      filteredCategories = filteredCategories.filter(
        (category) =>
          category.name.toLowerCase().includes(search.toLowerCase()) ||
          category.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status) {
      filteredCategories = filteredCategories.filter((category) => category.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredCategories,
      total: filteredCategories.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 })
    }

    // Check if category with same name exists
    const existingCategory = categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase())

    if (existingCategory) {
      return NextResponse.json({ success: false, error: "Category with this name already exists" }, { status: 400 })
    }

    const newCategory = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: name.trim(),
      description: description?.trim() || "",
      productsCount: 0,
      status: "active" as const,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    categories.push(newCategory)

    return NextResponse.json({
      success: true,
      data: newCategory,
      message: "Category created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 })
  }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, status } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 })
    }

    const categoryIndex = categories.findIndex((cat) => cat.id === id)

    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Check if another category with same name exists
    if (name) {
      const existingCategory = categories.find((cat) => cat.name.toLowerCase() === name.toLowerCase() && cat.id !== id)

      if (existingCategory) {
        return NextResponse.json({ success: false, error: "Category with this name already exists" }, { status: 400 })
      }
    }

    // Update category
    const updatedCategory = {
      ...categories[categoryIndex],
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(status && { status }),
      updatedAt: new Date().toISOString().split("T")[0],
    }

    categories[categoryIndex] = updatedCategory

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 })
    }

    const categoryIndex = categories.findIndex((cat) => cat.id === Number.parseInt(id))

    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Check if category has products
    const category = categories[categoryIndex]
    if (category.productsCount > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete category with products. Move products first." },
        { status: 400 },
      )
    }

    categories.splice(categoryIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 })
  }
}
