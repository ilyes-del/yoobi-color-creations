import { NextResponse } from "next/server"

const categories = [
  {
    id: "bags",
    name: "حقائب",
    nameEn: "Bags",
    description: "حقائب مدرسية وحقائب الظهر",
    descriptionEn: "School bags and backpacks",
    image: "/category-bags.png",
    productCount: 25,
    featured: true,
  },
  {
    id: "notebooks",
    name: "دفاتر",
    nameEn: "Notebooks",
    description: "دفاتر وكراسات بأحجام مختلفة",
    descriptionEn: "Notebooks and exercise books in various sizes",
    image: "/category-notebooks.png",
    productCount: 45,
    featured: true,
  },
  {
    id: "pens",
    name: "أقلام",
    nameEn: "Pens & Pencils",
    description: "أقلام رصاص وحبر وألوان",
    descriptionEn: "Pencils, pens, and colored pencils",
    image: "/category-pens.png",
    productCount: 60,
    featured: true,
  },
  {
    id: "tools",
    name: "أدوات",
    nameEn: "Tools",
    description: "أدوات هندسية ومدرسية",
    descriptionEn: "Geometry and school tools",
    image: "/category-tools.png",
    productCount: 30,
    featured: false,
  },
  {
    id: "art",
    name: "فنون",
    nameEn: "Art Supplies",
    description: "أدوات الرسم والفنون",
    descriptionEn: "Drawing and art supplies",
    image: "/category-art.png",
    productCount: 35,
    featured: false,
  },
  {
    id: "electronics",
    name: "إلكترونيات",
    nameEn: "Electronics",
    description: "آلات حاسبة وأجهزة إلكترونية",
    descriptionEn: "Calculators and electronic devices",
    image: "/category-electronics.png",
    productCount: 15,
    featured: false,
  },
  {
    id: "organization",
    name: "تنظيم",
    nameEn: "Organization",
    description: "ملفات وأدوات التنظيم",
    descriptionEn: "Files and organization tools",
    image: "/category-organization.png",
    productCount: 20,
    featured: false,
  },
  {
    id: "lunch",
    name: "وجبات",
    nameEn: "Lunch Supplies",
    description: "علب طعام وزجاجات مياه",
    descriptionEn: "Lunch boxes and water bottles",
    image: "/category-lunch.png",
    productCount: 18,
    featured: false,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      categories,
      featuredCategories: categories.filter((cat) => cat.featured),
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
