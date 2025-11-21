import { Facebook, Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">ED</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-foreground">Eden Dental</span>
                <span className="text-xs text-muted-foreground">Premium Care</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for world-class dental care in Vietnam. Transform your smile with confidence.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@edendental.vn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+842812345678"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  Dental Implants
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  Porcelain Veneers
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  Full Mouth Design
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  General Dentistry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#why-vietnam" className="transition-colors hover:text-primary">
                  Why Vietnam
                </a>
              </li>
              <li>
                <a href="#process" className="transition-colors hover:text-primary">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-primary">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition-colors hover:text-primary">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Nguyen Hue Boulevard</li>
              <li>District 1, Ho Chi Minh City</li>
              <li>Vietnam</li>
              <li className="pt-2">
                <a href="tel:+842812345678" className="transition-colors hover:text-primary">
                  +84 (28) 1234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@edendental.vn" className="transition-colors hover:text-primary">
                  info@edendental.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Eden Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
