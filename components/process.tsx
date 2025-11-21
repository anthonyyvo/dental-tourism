import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Submit your dental X-rays and photos for a free initial assessment and treatment plan.",
  },
  {
    number: "02",
    title: "Travel Planning",
    description: "We help arrange your trip including accommodation recommendations and airport transfers.",
  },
  {
    number: "03",
    title: "Treatment Begins",
    description: "Receive world-class care from our experienced team in our state-of-the-art facility.",
  },
  {
    number: "04",
    title: "Enjoy Vietnam",
    description: "Recover while exploring beautiful destinations with our local tourism recommendations.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Your Journey to a Perfect Smile
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Simple, seamless process from consultation to your dream smile
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden border-2">
              <CardContent className="p-6">
                <div className="mb-4 text-6xl font-bold text-primary/10">{step.number}</div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-border lg:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
