import { type NextRequest, NextResponse } from "next/server"

// Mock orders data - in real app this would be stored in database
const orders: Order[] = []
let orderIdCounter = 1000

interface Order {
  id: string
  orderNumber: string
  customerId?: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      district: string
      postalCode: string
      country: string
    }
  }
  items: OrderItem[]
  summary: {
    subtotal: number
    discount: number
    shippingCost: number
    tax: number
    total: number
  }
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "cash" | "card" | "bank_transfer"
  notes?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

interface OrderItem {
  productId: number
  name: string
  nameEn: string
  brand: string
  price: number
  quantity: number
  image: string
  total: number
}

// GET - Get orders (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredOrders = [...orders]

    // Filter by customer ID
    if (customerId) {
      filteredOrders = filteredOrders.filter((order) => order.customerId === customerId)
    }

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredOrders.length / limit)

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders: filteredOrders.length,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const {
      customerInfo,
      items,
      paymentMethod = "cash",
      notes,
    }: {
      customerInfo: Order["customerInfo"]
      items: {
        productId: number
        quantity: number
        price: number
        name: string
        nameEn: string
        brand: string
        image: string
      }[]
      paymentMethod?: Order["paymentMethod"]
      notes?: string
    } = orderData

    // Validation
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json({ error: "Customer information is required" }, { status: 400 })
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 })
    }

    // Calculate order summary
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = 0 // Could implement discount logic here
    const shippingCost = subtotal > 100 ? 0 : 15 // Free shipping over 100 SAR
    const tax = subtotal * 0.15 // 15% VAT
    const total = subtotal - discount + shippingCost + tax

    // Create order items
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      nameEn: item.nameEn,
      brand: item.brand,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      total: item.price * item.quantity,
    }))

    // Generate order
    const orderNumber = `SS${orderIdCounter.toString().padStart(6, "0")}`
    orderIdCounter++

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      customerInfo,
      items: orderItems,
      summary: {
        subtotal,
        discount,
        shippingCost,
        tax,
        total,
      },
      status: "pending",
      paymentStatus: paymentMethod === "cash" ? "pending" : "pending",
      paymentMethod,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    }

    orders.push(newOrder)

    return NextResponse.json({
      message: "Order created successfully",
      order: newOrder,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
