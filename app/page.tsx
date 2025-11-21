import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { WhyVietnam } from "@/components/why-vietnam"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { TeamSection } from "@/components/team-section"
import { DoctorsSection } from "@/components/doctors-section"
import { PricingSection } from "@/components/pricing-section"
import { BeforeAfterSection } from "@/components/before-after-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PromotionPopup } from "@/components/promotion-popup"
import { FacilitiesSection } from "@/components/facilities-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyVietnam />
        <TeamSection />
        <DoctorsSection />
        <FacilitiesSection />
        <PricingSection />
        <Process />
        <BeforeAfterSection />
        <Gallery />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <PromotionPopup />
    </div>
  )
}
