export function Gallery() {
  const images = [
    {
      url: "/modern-dental-clinic.png",
      alt: "Modern clinic interior",
    },
    {
      url: "/dental-implant-before-and-after-smile-transformati.jpg",
      alt: "Dental implant results",
    },
    {
      url: "/professional-dentist-examining-patient-with-digita.jpg",
      alt: "Professional dental care",
    },
    {
      url: "/porcelain-veneers-smile-transformation-closeup.jpg",
      alt: "Veneer transformation",
    },
    {
      url: "/happy-patient-smiling-after-dental-treatment.jpg",
      alt: "Happy patient",
    },
    {
      url: "/dental-team-in-modern-clinic-vietnam.jpg",
      alt: "Our dental team",
    },
  ]

  return (
    <section id="gallery" className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            See the Difference
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Real transformations from our clinic and world-class facilities
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
