import { Store, Twitter, Instagram, Linkedin } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About & Logo */}
          <div className="flex flex-col items-center text-center md:items-start md:text-right">
            <a href="/" className="mb-4 flex items-center gap-2">
              <Store className="h-7 w-7" />
              <span className="text-xl font-bold">ویترین استور</span>
            </a>
            <p className="text-sm text-muted-foreground">
              ویترین استور یک فروشگاه اینترنتی مدرن است که تلاش می‌کند
              بهترین تجربه خرید آنلاین را با تنوع بالای کالا، قیمت مناسب و
              پشتیبانی حرفه‌ای برای شما فراهم کند.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="mb-4 font-bold">لینک‌های مهم</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  درباره ویترین استور
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
                  همکاری با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold">تماس با ما</h4>
            <address className="space-y-2 not-italic text-muted-foreground">
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
              <p>ایمیل: support@vitrin-store.com</p>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 font-bold">ما را در شبکه‌های اجتماعی دنبال کنید</h4>
            <div className="flex items-center justify-center gap-4 md:justify-start">
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
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ویترین استور – استفاده از مطالب فقط
            برای مقاصد غیرتجاری و با ذکر منبع مجاز است.
          </p>
        </div>
      </div>
    </footer>
  );
}

