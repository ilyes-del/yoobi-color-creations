import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="اسم المستخدم" className="border rounded px-4 py-2" />
          <input type="password" placeholder="كلمة المرور" className="border rounded px-4 py-2" />
          <Button type="submit" className="w-full">دخول</Button>
        </form>
      </div>
    </div>
  )
}
