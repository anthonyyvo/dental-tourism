export function TeamSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Our Expert Dental Team
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Meet the internationally trained specialists dedicated to transforming your smile
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-muted shadow-lg">
            <img src="/images/team-bs-01.jpg" alt="Eden Dental Clinic Doctors" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/0" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-foreground md:text-2xl">Senior Dental Specialists</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Our doctors are trained internationally with expertise in implants, veneers, and cosmetic dentistry
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-muted shadow-lg">
            <img src="/images/team01.jpg" alt="Eden Dental Clinic Full Team" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/0" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-foreground md:text-2xl">Complete Care Team</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Our full staff ensures personalized attention and support throughout your dental journey
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-card p-6 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">25+</p>
            <p className="mt-2 text-sm text-muted-foreground">Dental Experts</p>
          </div>
          <div className="rounded-xl bg-card p-6 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">15+</p>
            <p className="mt-2 text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="rounded-xl bg-card p-6 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">10+</p>
            <p className="mt-2 text-sm text-muted-foreground">Specialists</p>
          </div>
          <div className="rounded-xl bg-card p-6 text-center shadow-md">
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="mt-2 text-sm text-muted-foreground">Patient Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}
