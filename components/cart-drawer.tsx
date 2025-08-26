"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, Package } from "lucide-react"
import { useCart } from "./cart-provider"
import { useState } from "react"
import { CheckoutForm } from "./checkout-form"

export function CartDrawer() {
  const { items, summary, isLoading, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)

  const handleQuantityChange = async (cartItemId: string, newQuantity: number) => {
    try {
      await updateQuantity(cartItemId, newQuantity)
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId)
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setIsCheckout(false); }}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {summary.totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {summary.totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            سلة التسوق ({summary.totalItems} منتج)
          </SheetTitle>
        </SheetHeader>
        {isCheckout ? (
          <div className="py-4">
            <CheckoutForm onOrderComplete={() => { setIsCheckout(false); setIsOpen(false); }} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">سلة التسوق فارغة</h3>
            <p className="text-muted-foreground mb-4">أضف بعض المنتجات لتبدأ التسوق</p>
            <Button onClick={() => setIsOpen(false)}>تصفح المنتجات</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">من {item.brand}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 bg-transparent"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isLoading || item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">{item.price} ريال</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {item.originalPrice} ريال
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          المجموع: {(item.price * item.quantity).toFixed(0)} ريال
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Cart Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>المجموع الفرعي:</span>
                <span>{summary.totalPrice.toFixed(0)} ريال</span>
              </div>
              {summary.savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>التوفير:</span>
                  <span>-{summary.savings.toFixed(0)} ريال</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>الشحن:</span>
                <span>{summary.shippingCost === 0 ? "مجاني" : `${summary.shippingCost} ريال`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>المجموع النهائي:</span>
                <span className="text-primary">{summary.finalTotal.toFixed(0)} ريال</span>
              </div>
              {summary.shippingCost === 0 && summary.totalPrice < 100 && (
                <p className="text-xs text-muted-foreground">
                  أضف {(100 - summary.totalPrice).toFixed(0)} ريال أخرى للحصول على شحن مجاني
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 mt-4">
              <Button className="w-full" size="lg" disabled={isLoading} onClick={() => setIsCheckout(true)}>
                إتمام الطلب
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsOpen(false)}>
                  متابعة التسوق
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleClearCart}
                  disabled={isLoading}
                >
                  إفراغ السلة
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
