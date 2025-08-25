import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "sonner"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "SchoolSpark - متجر اللوازم المدرسية",
  description: "متجر شامل للوازم المدرسية عالية الجودة بأسعار مناسبة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body className="font-sans">
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  )
}
