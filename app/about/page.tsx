"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">من نحن</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg text-muted-foreground">
          <p>
            مرحباً بكم في SchoolSpark! نحن متجر جزائري متخصص في توفير جميع اللوازم المدرسية عالية الجودة بأسعار مناسبة.
            هدفنا هو تسهيل تجربة التسوق للطلاب وأولياء الأمور، ودعم التعليم في المجتمع من خلال توفير منتجات موثوقة.
          </p>
          <p>
            كل عملية شراء تساهم في دعم طالب محتاج. نسعى دائماً للتميز في الخدمة وتقديم أفضل المنتجات.
          </p>
          <p>
            شكراً لثقتكم بنا!
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
