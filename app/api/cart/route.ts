import { type NextRequest, NextResponse } from "next/server"

// Mock cart data - in real app this would be stored in database/session
let cartItems: CartItem[] = []

interface CartItem {
  id: string
  productId: number
  name: string
  nameEn: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  inStock: boolean
  maxQuantity: number
}

// Mock product data for cart operations
const products = [
  {
    id: 1,
    name: "حقيبة مدرسية فاخرة",
    nameEn: "Premium School Backpack",
    brand: "سكول باك",
    price: 149,
    originalPrice: 199,
    image: "/premium-school-backpack.png",
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: 2,
    name: "طقم أدوات هندسية كامل",
    nameEn: "Complete Geometry Tools Set",
    brand: "ماث تولز",
    price: 45,
    originalPrice: 65,
    image: "/geometry-tools-set-compass-ruler.png",
    inStock: true,
    stockQuantity: 75,
  },
  {
    id: 3,
    name: "دفاتر ملاحظات مجموعة 5 قطع",
    nameEn: "Notebooks Set 5 Pieces",
    brand: "نوت بوك برو",
    price: 25,
    originalPrice: 35,
    image: "/colorful-school-notebooks-set.png",
    inStock: true,
    stockQuantity: 100,
  },
  {
    id: 4,
    name: "أقلام رصاص مجموعة 12 قلم",
    nameEn: "Pencils Set 12 Pieces",
    brand: "رايت رايت",
    price: 18,
    originalPrice: 25,
    image: "/pencils-set-12-pieces-wooden.png",
    inStock: true,
    stockQuantity: 200,
  },
]

// GET - Get cart items
export async function GET() {
  try {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const originalTotalPrice = cartItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0,
    )
    const savings = originalTotalPrice - totalPrice

    return NextResponse.json({
      items: cartItems,
      summary: {
        totalItems,
        totalPrice,
        originalTotalPrice,
        savings,
        shippingCost: totalPrice > 100 ? 0 : 15, // Free shipping over 100 SAR
        finalTotal: totalPrice + (totalPrice > 100 ? 0 : 15),
      },
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const product = products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (!product.inStock) {
      return NextResponse.json({ error: "Product is out of stock" }, { status: 400 })
    }

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.productId === productId)

    if (existingItemIndex >= 0) {
      // Update quantity
      const newQuantity = cartItems[existingItemIndex].quantity + quantity
      if (newQuantity > product.stockQuantity) {
        return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
      }
      cartItems[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      if (quantity > product.stockQuantity) {
        return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
      }

      const cartItem: CartItem = {
        id: `cart_${Date.now()}_${productId}`,
        productId: product.id,
        name: product.name,
        nameEn: product.nameEn,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity,
        inStock: product.inStock,
        maxQuantity: product.stockQuantity,
      }

      cartItems.push(cartItem)
    }

    return NextResponse.json({ message: "Item added to cart successfully" })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const { cartItemId, quantity } = await request.json()

    if (!cartItemId || quantity === undefined) {
      return NextResponse.json({ error: "Cart item ID and quantity are required" }, { status: 400 })
    }

    const itemIndex = cartItems.findIndex((item) => item.id === cartItemId)
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cartItems.splice(itemIndex, 1)
      return NextResponse.json({ message: "Item removed from cart" })
    }

    if (quantity > cartItems[itemIndex].maxQuantity) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 })
    }

    cartItems[itemIndex].quantity = quantity
    return NextResponse.json({ message: "Cart updated successfully" })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// DELETE - Remove item from cart or clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cartItemId = searchParams.get("itemId")
    const clearAll = searchParams.get("clearAll") === "true"

    if (clearAll) {
      cartItems = []
      return NextResponse.json({ message: "Cart cleared successfully" })
    }

    if (!cartItemId) {
      return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 })
    }

    const itemIndex = cartItems.findIndex((item) => item.id === cartItemId)
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    cartItems.splice(itemIndex, 1)
    return NextResponse.json({ message: "Item removed from cart successfully" })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 })
  }
}
