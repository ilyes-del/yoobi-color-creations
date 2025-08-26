import { NextResponse } from "next/server"

export async function GET() {
  // Static offers data
  const offers = [
    {
      title: "خصم 20% على الحقائب المدرسية",
      description: "استفيدوا من خصم خاص على مجموعة مختارة من الحقائب المدرسية عالية الجودة."
    },
    {
      title: "دفاتر مجانية مع كل طلبية فوق 3000 دج",
      description: "احصل على مجموعة دفاتر مجانية عند شراء منتجات بقيمة 3000 دج أو أكثر."
    },
    {
      title: "شحن مجاني للطلبات فوق 10000 دج",
      description: "استفيدوا من الشحن المجاني عند شراء منتجات بقيمة 10000 دج أو أكثر."
    }
  ]
  return NextResponse.json(offers)
}
