import { type NextRequest, NextResponse } from "next/server"

// Mock product data - same as in products/route.ts
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
    images: ["/premium-school-backpack-front.png", "/premium-school-backpack-side.png", "/premium-school-backpack-open.png"],
    rating: 4.9,
    reviewCount: 125,
    inStock: true,
    stockQuantity: 50,
    tags: ["حقائب", "مدرسية", "فاخرة"],
    specifications: {
      material: "نايلون مقاوم للماء",
      dimensions: "45 × 30 × 15 سم",
      weight: "800 جرام",
      capacity: "25 لتر",
    },
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
    images: ["/geometry-tools-set-complete.png", "/compass-and-ruler-set.png", "/geometry-tools-in-case.png"],
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 75,
    tags: ["أدوات", "هندسة", "رياضيات"],
    specifications: {
      includes: "برجل، مسطرة، منقلة، مثلثات",
      material: "معدن وبلاستيك عالي الجودة",
      case: "علبة بلاستيكية محمولة",
    },
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
    images: ["/5-colorful-notebooks-stack.png", "/notebook-pages-quality-paper.png", "/notebooks-different-colors-spread.png"],
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockQuantity: 100,
    tags: ["دفاتر", "ملاحظات", "ملونة"],
    specifications: {
      pages: "100 صفحة لكل دفتر",
      paper: "ورق عالي الجودة 80 جرام",
      size: "A4",
      colors: "5 ألوان مختلفة",
    },
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
    images: ["/12-wooden-pencils-arranged.png", "/pencil-tips-different-grades.png", "/placeholder.svg?height=400&width=400"],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockQuantity: 200,
    tags: ["أقلام", "رصاص", "كتابة"],
    specifications: {
      quantity: "12 قلم",
      grades: "HB, 2B, 4B",
      material: "خشب طبيعي",
      eraser: "ممحاة في النهاية",
    },
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productId = Number.parseInt(params.id)
    const product = products.find((p) => p.id === productId)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get related products (same category, excluding current product)
    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    return NextResponse.json({
      product,
      relatedProducts,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
