"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const offers = [
  {
    title: "خصم 20% على الحقائب المدرسية",
    description: "استفيدوا من خصم خاص على مجموعة مختارة من الحقائب المدرسية عالية الجودة.",
  },
  {
    title: "دفاتر مجانية مع كل طلبية فوق 3000 دج",
    description: "احصل على مجموعة دفاتر مجانية عند شراء منتجات بقيمة 3000 دج أو أكثر.",
  },
  {
    title: "شحن مجاني للطلبات فوق 10000 دج",
    description: "استفيدوا من الشحن المجاني عند شراء منتجات بقيمة 10000 دج أو أكثر.",
  },
]

export default function OffersPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">العروض</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {offers.map((offer, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-muted/10">
              <h3 className="font-bold text-xl mb-2 text-primary">{offer.title}</h3>
              <p className="text-muted-foreground text-lg">{offer.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
