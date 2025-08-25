import { type NextRequest, NextResponse } from "next/server"

// Mock users data
const users = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    role: "customer",
    status: "active",
    totalOrders: 12,
    totalSpent: 2340,
    lastLogin: "2024-01-20T10:30:00Z",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-06-15T00:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    name: "فاطمة سالم",
    email: "fatima@example.com",
    phone: "+966507654321",
    role: "customer",
    status: "active",
    totalOrders: 8,
    totalSpent: 1560,
    lastLogin: "2024-01-19T14:15:00Z",
    joinDate: "2023-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-08-22T00:00:00Z",
    updatedAt: "2024-01-19T14:15:00Z",
  },
  {
    id: 3,
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "+966512345678",
    role: "admin",
    status: "active",
    totalOrders: 0,
    totalSpent: 0,
    lastLogin: "2024-01-20T09:45:00Z",
    joinDate: "2023-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2024-01-20T09:45:00Z",
  },
]

// GET - Fetch all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredUsers = users

    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.phone.includes(search),
      )
    }

    if (role && role !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.role === role)
    }

    if (status && status !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.status === status)
    }

    // Sort by join date (newest first)
    filteredUsers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      customers: users.filter((u) => u.role === "customer").length,
      admins: users.filter((u) => u.role === "admin").length,
      totalSpent: users.reduce((sum, u) => sum + u.totalSpent, 0),
    }

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      stats,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        pages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, role } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "User name is required" }, { status: 400 })
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Check if user with same email exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User with this email already exists" }, { status: 400 })
    }

    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      role: role || "customer",
      status: "active" as const,
      totalOrders: 0,
      totalSpent: 0,
      lastLogin: new Date().toISOString(),
      joinDate: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "User created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, phone, role, status } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Check if another user with same email exists
    if (email) {
      const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.id !== id)

      if (existingUser) {
        return NextResponse.json({ success: false, error: "User with this email already exists" }, { status: 400 })
      }
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...(name && { name: name.trim() }),
      ...(email && { email: email.trim().toLowerCase() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(role && { role }),
      ...(status && { status }),
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const userIndex = users.findIndex((user) => user.id === Number.parseInt(id))

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Check if user has orders (in real app, you'd check the orders table)
    const user = users[userIndex]
    if (user.totalOrders > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete user with existing orders. Deactivate instead." },
        { status: 400 },
      )
    }

    users.splice(userIndex, 1)

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
