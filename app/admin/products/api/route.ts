import { type NextRequest, NextResponse } from "next/server"

// Mock products data
const products = [
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
    updatedAt: "2024-01-15",
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
    updatedAt: "2024-01-12",
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
    updatedAt: "2024-01-10",
  },
]

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredProducts = products

    if (search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.categoryId.toString() === category)
    }

    if (status && status !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.status === status)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, originalPrice, categoryId, stock, image } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Product name is required" }, { status: 400 })
    }

    if (!price || price <= 0) {
      return NextResponse.json({ success: false, error: "Valid price is required" }, { status: 400 })
    }

    if (!categoryId) {
      return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 })
    }

    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: name.trim(),
      description: description?.trim() || "",
      price: Number.parseFloat(price),
      originalPrice: originalPrice ? Number.parseFloat(originalPrice) : Number.parseFloat(price),
      categoryId: Number.parseInt(categoryId),
      category: "Unknown", // This would be fetched from categories table in real app
      stock: stock ? Number.parseInt(stock) : 0,
      status: "active" as const,
      rating: 0,
      reviews: 0,
      image: image || "/school-supplies-flatlay.png",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    products.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, price, originalPrice, categoryId, stock, status, image } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const productIndex = products.findIndex((prod) => prod.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(price && { price: Number.parseFloat(price) }),
      ...(originalPrice && { originalPrice: Number.parseFloat(originalPrice) }),
      ...(categoryId && { categoryId: Number.parseInt(categoryId) }),
      ...(stock !== undefined && { stock: Number.parseInt(stock) }),
      ...(status && { status }),
      ...(image && { image }),
      updatedAt: new Date().toISOString().split("T")[0],
    }

    products[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const productIndex = products.findIndex((prod) => prod.id === Number.parseInt(id))

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    products.splice(productIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
