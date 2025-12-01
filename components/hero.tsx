import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5">
                <span className="text-sm font-medium text-primary">World-Class Dental Care in Vietnam</span>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Smile at Eden Dental
              </h1>
              <p className="text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
                Experience premium dental tourism in the heart of Vietnam - Ho Chi Minh City. Save up to 70% on world-class dental
                treatments with our internationally trained specialists.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-foreground">Member of the American Dental Association - ADA standard clinic</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-foreground">ISO-certified clinic with cutting-edge technology</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-foreground">International dentists with 10+ years experience - fluent in English</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-foreground">Lifetime warranty on dental implants</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#contact">
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#services">View Services</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <img
                src="/images/team-bs-01.jpg"
                alt="Eden Dental Clinic Professional Team"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-card p-6 shadow-lg md:-bottom-8 md:-right-8">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
