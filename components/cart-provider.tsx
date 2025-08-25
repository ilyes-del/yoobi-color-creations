"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

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

interface CartSummary {
  totalItems: number
  totalPrice: number
  originalTotalPrice: number
  savings: number
  shippingCost: number
  finalTotal: number
}

interface CartContextType {
  items: CartItem[]
  summary: CartSummary
  isLoading: boolean
  addToCart: (productId: number, quantity?: number) => Promise<void>
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>
  removeFromCart: (cartItemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [summary, setSummary] = useState<CartSummary>({
    totalItems: 0,
    totalPrice: 0,
    originalTotalPrice: 0,
    savings: 0,
    shippingCost: 0,
    finalTotal: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const refreshCart = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        setItems(data.items || [])
        setSummary(data.summary || summary)
      }
    } catch (error) {
      console.error("Error refreshing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (response.ok) {
        await refreshCart()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to add to cart")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId, quantity }),
      })

      if (response.ok) {
        await refreshCart()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to update cart")
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (cartItemId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/cart?itemId=${cartItemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await refreshCart()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to remove from cart")
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/cart?clearAll=true", {
        method: "DELETE",
      })

      if (response.ok) {
        await refreshCart()
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to clear cart")
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Load cart on mount
  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
