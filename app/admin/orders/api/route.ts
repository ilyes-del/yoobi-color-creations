import { type NextRequest, NextResponse } from "next/server"

// Mock orders data
const orders = [
  {
    id: "#12345",
    customerName: "أحمد محمد علي",
    customerEmail: "ahmed@example.com",
    customerPhone: "+966501234567",
    items: [
      { name: "حقيبة مدرسية فاخرة", quantity: 1, price: 149 },
      { name: "دفاتر ملاحظات مجموعة 5 قطع", quantity: 2, price: 25 },
    ],
    totalAmount: 199,
    status: "pending",
    paymentStatus: "paid",
    shippingAddress: "الرياض، حي النرجس، شارع الملك فهد",
    orderDate: "2024-01-20T10:30:00Z",
    estimatedDelivery: "2024-01-25",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "#12344",
    customerName: "فاطمة سالم",
    customerEmail: "fatima@example.com",
    customerPhone: "+966507654321",
    items: [
      { name: "طقم أدوات هندسية كامل", quantity: 1, price: 45 },
      { name: "أقلام ملونة 24 لون", quantity: 1, price: 35 },
    ],
    totalAmount: 89,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "جدة، حي الزهراء، شارع الأمير سلطان",
    orderDate: "2024-01-19T14:15:00Z",
    estimatedDelivery: "2024-01-24",
    createdAt: "2024-01-19T14:15:00Z",
    updatedAt: "2024-01-19T14:15:00Z",
  },
  {
    id: "#12343",
    customerName: "محمد أحمد",
    customerEmail: "mohammed@example.com",
    customerPhone: "+966512345678",
    items: [
      { name: "حقيبة مدرسية فاخرة", quantity: 2, price: 149 },
      { name: "مقلمة مدرسية بسحاب", quantity: 3, price: 18 },
    ],
    totalAmount: 352,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "الدمام، حي الفيصلية، شارع الخليج",
    orderDate: "2024-01-18T09:45:00Z",
    estimatedDelivery: "2024-01-23",
    createdAt: "2024-01-18T09:45:00Z",
    updatedAt: "2024-01-18T09:45:00Z",
  },
]

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const paymentStatus = searchParams.get("paymentStatus")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredOrders = orders

    if (search) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName.toLowerCase().includes(search.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (status && status !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    if (paymentStatus && paymentStatus !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.paymentStatus === paymentStatus)
    }

    // Sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      totalRevenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.totalAmount, 0),
    }

    return NextResponse.json({
      success: true,
      data: paginatedOrders,
      stats,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        pages: Math.ceil(filteredOrders.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, paymentStatus, estimatedDelivery } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 })
    }

    const orderIndex = orders.findIndex((order) => order.id === id)

    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    // Validate status transitions
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid order status" }, { status: 400 })
    }

    const validPaymentStatuses = ["pending", "paid", "failed", "refunded"]
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json({ success: false, error: "Invalid payment status" }, { status: 400 })
    }

    // Update order
    const updatedOrder = {
      ...orders[orderIndex],
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(estimatedDelivery && { estimatedDelivery }),
      updatedAt: new Date().toISOString(),
    }

    orders[orderIndex] = updatedOrder

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: "Order updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}

// GET - Fetch single order by ID
export async function GET_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = orders.find((o) => o.id === params.id)

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 })
  }
}
