import { Card, CardContent } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import Image from "next/image"

const BRANCHES = [
  {
    url: "https://share.google/fAIrLzVjZjB3a6iTr",
    label: "Eden Dental Clinic - District 1",
    image: "/eden01.png",
    rating: "5.0",
    reviews: "753",
  },
  {
    url: "https://share.google/v6zHkwHOrFiOs5vFG",
    label: "Eden Dental Clinic - District 7",
    image: "/eden02.png",
    rating: "5.0",
    reviews: "531",
  },
] as const

const testimonials = [
  {
    name: "Dustin Kemp",
    country: "United States",
    rating: 5,
    image: "/new/reviews/review01.png",
    text: "Maybe the best teeth cleaning I've ever had. The staff is extremely friendly and a few of them spoke really good English, and the cleaning was totally pain-free. They also gave us a few free gifts when we finish the cleaning, including a framed picture they snapped of us holding said gifts and smiling. The spotless 5-star review record of this place is definitely warranted.",
  },
  {
    name: "Pavlo",
    country: "Australia",
    rating: 5,
    image: "/new/reviews/review02.png",
    text: "This is the best clinic I’ve ever been to. They have the latest equipment. The staff speaks excellent English, and even if you have trouble understanding, don’t worry, they explain everything clearly through a translator, so you won’t be confused. I’ve had dental work of different levels of complexity done here, from fillings and a crown to wisdom tooth extractions. The quality of their work is outstanding - you can trust these guys!",
  },
  {
    name: "Milagros Aque",
    country: "United States",
    rating: 5,
    image: "/new/reviews/review03.png",
    text: "I got my smile back again because of Dr. An!!! Dr. An is a true expert in his field. I had a complex procedure done recently, and he explained everything so clearly and made me feel completely at ease. Even the staff is incredibly friendly and welcoming. I always feel at ease when come to his clinic. Over all results are fantastic, and I couldn't be happier! I would highly recommended them to everyone. 1 2 3 Smile 😃",
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
                <div className="mb-4 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.country}</p>
                  </div>
                </div>
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <p className="mb-8 text-center text-lg font-medium text-foreground">
            See our real 5-star reviews on Google
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {BRANCHES.map((branch) => (
              <Card key={branch.url} className="overflow-hidden border-2">
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  <Image
                    src={branch.image}
                    alt={branch.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="mb-2 font-semibold text-foreground">{branch.label}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">
                      {branch.rating} ({branch.reviews} reviews)
                    </span>
                  </div>
                  <a
                    href={branch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary/5 px-4 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Image
                      src="/google-color-svgrepo-com.svg"
                      alt="Google"
                      width={24}
                      height={24}
                    />
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
