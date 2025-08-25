"use client"

import { CheckoutForm } from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()

  const handleOrderComplete = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
              <span className="font-semibold">العودة للتسوق</span>
            </Link>
            <h1 className="text-2xl font-bold">إتمام الطلب</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CheckoutForm onOrderComplete={handleOrderComplete} />
      </main>
    </div>
  )
}
