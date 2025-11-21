import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    country: "United States",
    rating: 5,
    text: "I traveled from California for dental implants and couldn't be happier! The quality exceeded my expectations and I saved over $15,000. The staff made me feel like family.",
  },
  {
    name: "Michael Chen",
    country: "Australia",
    rating: 5,
    text: "Amazing experience from start to finish. Got a complete smile makeover with veneers. The results are stunning and the attention to detail was incredible. Highly recommend!",
  },
  {
    name: "Emma Williams",
    country: "United Kingdom",
    rating: 5,
    text: "Best decision I ever made! Combined my dental treatment with a vacation. The clinic is ultra-modern and the dentists are highly skilled. Worth every penny.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            What Our Patients Say
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Join thousands of satisfied patients from around the world
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-foreground leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
