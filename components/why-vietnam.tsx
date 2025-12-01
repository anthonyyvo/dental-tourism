import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Award, MapPin, Heart } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Save Up to 70%",
    description: "World-class dental care at a fraction of Western prices without compromising quality",
  },
  {
    icon: Award,
    title: "International Standards",
    description: "ISO-certified facilities using the latest technology and globally recognized protocols",
  },
  {
    icon: MapPin,
    title: "Beautiful Destination",
    description: "Combine your dental treatment with an unforgettable vacation in stunning Vietnam",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Dedicated English-speaking staff and comprehensive support throughout your journey",
  },
]

export function WhyVietnam() {
  return (
    <section id="why-vietnam" className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Why Choose Vietnam for Dental Care?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Experience exceptional dental tourism with unbeatable value, quality, and care
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="border-0 bg-card shadow-md transition-all hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
            <img src="/images/team01.jpg" alt="Eden Dental Clinic Full Team" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/0" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">Meet Our Expert Team</h3>
              <p className="mt-2 text-muted-foreground">Dedicated professionals committed to your smile</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">10+</p>
            <p className="mt-2 text-sm text-muted-foreground">Years of Excellence</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">98%</p>
            <p className="mt-2 text-sm text-muted-foreground">Patient Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">50+</p>
            <p className="mt-2 text-sm text-muted-foreground">Countries Served</p>
          </div>
        </div>
      </div>
    </section>
  )
}
