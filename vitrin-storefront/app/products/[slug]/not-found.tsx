import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          محصول یافت نشد
        </h2>
        <p className="text-text-secondary mb-8">
          متأسفانه محصول مورد نظر شما یافت نشد.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/products">مشاهده همه محصولات</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
