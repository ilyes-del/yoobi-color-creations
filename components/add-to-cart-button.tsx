"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "./cart-provider"
import { useState } from "react"
import { toast } from "sonner"

interface AddToCartButtonProps {
  productId: number
  productName: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showQuantity?: boolean
  className?: string
}

export function AddToCartButton({
  productId,
  productName,
  variant = "default",
  size = "default",
  showQuantity = false,
  className,
}: AddToCartButtonProps) {
  const { items, addToCart, updateQuantity, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  // Find if product is already in cart
  const cartItem = items.find((item) => item.productId === productId)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      await addToCart(productId, 1)
      toast.success(`تم إضافة ${productName} إلى السلة`)
    } catch (error) {
      toast.error("فشل في إضافة المنتج إلى السلة")
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!cartItem) return

    try {
      setIsAdding(true)
      await updateQuantity(cartItem.id, newQuantity)
      if (newQuantity === 0) {
        toast.success(`تم حذف ${productName} من السلة`)
      } else {
        toast.success(`تم تحديث كمية ${productName}`)
      }
    } catch (error) {
      toast.error("فشل في تحديث الكمية")
      console.error("Error updating quantity:", error)
    } finally {
      setIsAdding(false)
    }
  }

  if (showQuantity && quantity > 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={isLoading || isAdding}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="min-w-[2rem] text-center font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={isLoading || isAdding || quantity >= (cartItem?.maxQuantity || 999)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isLoading || isAdding}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {quantity > 0 ? `في السلة (${quantity})` : "أضف للسلة"}
    </Button>
  )
}
