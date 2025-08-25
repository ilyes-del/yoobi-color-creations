import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartDrawer } from "@/components/cart-drawer"

const products = [
  { id: 1, name: "حقيبة مدرسية فاخرة" },
  { id: 2, name: "طقم أدوات هندسية كامل" },
  { id: 3, name: "دفاتر ملاحظات مجموعة 5 قطع" },
]

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const handleChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
    setSuggestions(
      value ? products.filter((p) => p.name.includes(value)) : []
    )
  }

  const handleAddToCart = (product: any) => {
    // Add to cart logic here
    alert(`تمت إضافة ${product.name} إلى السلة!`)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="ابحث عن منتج..."
        value={query}
        onChange={handleChange}
        className="pr-10"
      />
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-card border rounded shadow-lg z-10">
          {suggestions.map((product) => (
            <div key={product.id} className="flex items-center justify-between px-4 py-2 hover:bg-muted cursor-pointer">
              <span>{product.name}</span>
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                أضف للسلة
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
