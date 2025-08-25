import { type NextRequest, NextResponse } from "next/server"

// Mock orders data - same as in orders/route.ts
const orders: Order[] = []

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

// GET - Get specific order
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = orders.find((o) => o.id === params.id || o.orderNumber === params.id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status, paymentStatus, notes } = await request.json()

    const orderIndex = orders.findIndex((o) => o.id === params.id || o.orderNumber === params.id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order
    if (status) {
      orders[orderIndex].status = status
    }
    if (paymentStatus) {
      orders[orderIndex].paymentStatus = paymentStatus
    }
    if (notes !== undefined) {
      orders[orderIndex].notes = notes
    }

    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      message: "Order updated successfully",
      order: orders[orderIndex],
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

// DELETE - Cancel order
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderIndex = orders.findIndex((o) => o.id === params.id || o.orderNumber === params.id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if order can be cancelled
    const order = orders[orderIndex]
    if (order.status === "shipped" || order.status === "delivered") {
      return NextResponse.json({ error: "Cannot cancel shipped or delivered orders" }, { status: 400 })
    }

    // Update status to cancelled
    orders[orderIndex].status = "cancelled"
    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      message: "Order cancelled successfully",
      order: orders[orderIndex],
    })
  } catch (error) {
    console.error("Error cancelling order:", error)
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 })
  }
}
