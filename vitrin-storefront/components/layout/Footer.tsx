import { Store, Twitter, Instagram, Linkedin } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Store className="h-7 w-7" />
              <span className="text-xl font-bold">ویترین‌شاپ</span>
            </a>
            <p className="text-muted-foreground text-sm">
              ویترین‌شاپ یک فروشگاه اینترنتی نمونه است که برای طراحی رابط کاربری
              و تمرین توسعه فرانت‌اند استفاده می‌شود.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-bold mb-4">لینک‌های مهم</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  راهنمای خرید از فروشگاه
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  پیگیری سفارش
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">ارتباط با ما</h4>
            <address className="not-italic space-y-2 text-muted-foreground">
              <p>آدرس: تهران، خیابان نمونه، پلاک ۱۲</p>
              <p>
                تلفن پشتیبانی:{" "}
                <a
                  href="tel:+982112345678"
                  className="hover:text-foreground"
                >
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
              </p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h4>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} تمامی حقوق این قالب فروشگاهی برای شما
            محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

