import { type NextRequest, NextResponse } from "next/server"

// Mock product data for search
const products = [
  {
    id: 1,
    name: "حقيبة مدرسية فاخرة",
    nameEn: "Premium School Backpack",
    brand: "سكول باك",
    brandEn: "SchoolPack",
    price: 149,
    originalPrice: 199,
    category: "bags",
    categoryAr: "حقائب",
    description: "حقيبة مدرسية عالية الجودة مع جيوب متعددة ومقاومة للماء",
    descriptionEn: "High-quality school backpack with multiple pockets and water-resistant material",
    image: "/premium-school-backpack.png",
    rating: 4.9,
    reviewCount: 125,
    inStock: true,
    tags: ["حقائب", "مدرسية", "فاخرة", "مقاومة للماء"],
    tagsEn: ["bags", "school", "premium", "waterproof"],
  },
  {
    id: 2,
    name: "طقم أدوات هندسية كامل",
    nameEn: "Complete Geometry Tools Set",
    brand: "ماث تولز",
    brandEn: "MathTools",
    price: 45,
    originalPrice: 65,
    category: "tools",
    categoryAr: "أدوات",
    description: "طقم كامل من الأدوات الهندسية عالية الدقة للطلاب",
    descriptionEn: "Complete set of high-precision geometry tools for students",
    image: "/geometry-tools-set-compass-ruler.png",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    tags: ["أدوات", "هندسة", "رياضيات", "برجل"],
    tagsEn: ["tools", "geometry", "math", "compass"],
  },
  {
    id: 3,
    name: "دفاتر ملاحظات مجموعة 5 قطع",
    nameEn: "Notebooks Set 5 Pieces",
    brand: "نوت بوك برو",
    brandEn: "NotebookPro",
    price: 25,
    originalPrice: 35,
    category: "notebooks",
    categoryAr: "دفاتر",
    description: "مجموعة من 5 دفاتر ملاحظات بألوان مختلفة وجودة عالية",
    descriptionEn: "Set of 5 high-quality notebooks in different colors",
    image: "/colorful-school-notebooks-set.png",
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    tags: ["دفاتر", "ملاحظات", "ملونة", "جودة عالية"],
    tagsEn: ["notebooks", "notes", "colorful", "high-quality"],
  },
  {
    id: 4,
    name: "أقلام رصاص مجموعة 12 قلم",
    nameEn: "Pencils Set 12 Pieces",
    brand: "رايت رايت",
    brandEn: "WriteRight",
    price: 18,
    originalPrice: 25,
    category: "pens",
    categoryAr: "أقلام",
    description: "مجموعة من 12 قلم رصاص عالي الجودة بدرجات مختلفة",
    descriptionEn: "Set of 12 high-quality pencils with different grades",
    image: "/pencils-set-12-pieces-wooden.png",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    tags: ["أقلام", "رصاص", "كتابة", "خشبي"],
    tagsEn: ["pencils", "writing", "wooden", "grades"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""
    const category = searchParams.get("category")
    const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "999999")
    const inStockOnly = searchParams.get("inStock") === "true"
    const sortBy = searchParams.get("sortBy") || "relevance"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    if (!query && !category) {
      return NextResponse.json({
        results: [],
        suggestions: ["حقائب", "دفاتر", "أقلام", "أدوات"],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalResults: 0,
        },
      })
    }

    let filteredProducts = [...products]

    // Text search
    if (query) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchFields = [
          product.name,
          product.nameEn,
          product.brand,
          product.brandEn,
          product.description,
          product.descriptionEn,
          product.categoryAr,
          ...product.tags,
          ...product.tagsEn,
        ]

        return searchFields.some((field) => field.toLowerCase().includes(query))
      })
    }

    // Category filter
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Price range filter
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)

    // Stock filter
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter((product) => product.inStock)
    }

    // Sorting
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price
        case "price_desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviewCount - a.reviewCount
        case "name":
          return a.name.localeCompare(b.name, "ar")
        case "relevance":
        default:
          // Simple relevance scoring based on query matches
          if (!query) return 0
          const aScore = [a.name, a.brand, ...a.tags].filter((field) => field.toLowerCase().includes(query)).length
          const bScore = [b.name, b.brand, ...b.tags].filter((field) => field.toLowerCase().includes(query)).length
          return bScore - aScore
      }
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedResults = filteredProducts.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredProducts.length / limit)

    // Generate search suggestions
    const suggestions = []
    if (query) {
      const relatedTags = new Set<string>()
      filteredProducts.forEach((product) => {
        product.tags.forEach((tag) => {
          if (tag.includes(query) || query.includes(tag)) {
            relatedTags.add(tag)
          }
        })
      })
      suggestions.push(...Array.from(relatedTags).slice(0, 5))
    }

    return NextResponse.json({
      results: paginatedResults,
      suggestions: suggestions.length > 0 ? suggestions : ["حقائب", "دفاتر", "أقلام", "أدوات"],
      filters: {
        categories: [...new Set(filteredProducts.map((p) => ({ id: p.category, name: p.categoryAr })))],
        priceRange: {
          min: Math.min(...filteredProducts.map((p) => p.price)),
          max: Math.max(...filteredProducts.map((p) => p.price)),
        },
        brands: [...new Set(filteredProducts.map((p) => p.brand))],
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: filteredProducts.length,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error performing search:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
