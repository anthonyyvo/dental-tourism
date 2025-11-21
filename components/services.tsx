import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smile, Sparkles, Users, Stethoscope } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Dental Implants",
    description:
      "Premium titanium implants with lifetime warranty. State-of-the-art 3D imaging and precision placement for natural-looking, permanent teeth replacement.",
    features: ["Lifetime warranty", "98% success rate", "1-day procedure available"],
  },
  {
    icon: Sparkles,
    title: "Porcelain Veneers",
    description:
      "Ultra-thin, custom-crafted veneers for a Hollywood smile. Transform your teeth with natural-looking, stain-resistant porcelain.",
    features: ["Natural appearance", "10-year warranty", "Stain resistant"],
  },
  {
    icon: Smile,
    title: "Full Mouth Smile Design",
    description:
      "Complete smile transformation using advanced digital planning. Personalized treatment combining multiple procedures for your dream smile.",
    features: ["3D smile preview", "Comprehensive care", "Digital planning"],
  },
  {
    icon: Users,
    title: "General Dentistry",
    description:
      "Complete range of professional dental treatments including cleanings, whitening, crowns, bridges, and root canal therapy.",
    features: ["Preventive care", "Cosmetic treatments", "Restorative procedures"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Our Premium Services
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Comprehensive dental care with cutting-edge technology and internationally trained specialists
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
