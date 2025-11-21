"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Building2, Microscope, MonitorCheck, Shield, Sparkles, Users, ChevronLeft, ChevronRight } from "lucide-react"

const facilities = [
  {
    id: 1,
    title: "Advanced Treatment Rooms",
    description:
      "State-of-the-art treatment rooms equipped with the latest dental technology and comfortable seating for patient relaxation.",
    image: "/modern-dental-treatment-room-with-advanced-equipme.jpg",
    icon: Building2,
    features: ["Ergonomic Dental Chairs", "LED Lighting", "Entertainment Systems"],
  },
  {
    id: 2,
    title: "3D Imaging & Diagnostics",
    description:
      "Cutting-edge CBCT and 3D imaging technology for precise diagnosis and treatment planning with minimal radiation exposure.",
    image: "/dental-3d-imaging-equipment-cbct-scanner.jpg",
    icon: MonitorCheck,
    features: ["CBCT Scanner", "Digital X-rays", "Intraoral Cameras"],
  },
  {
    id: 3,
    title: "Sterile Surgical Suite",
    description:
      "Hospital-grade sterilization facility ensuring the highest standards of infection control and patient safety.",
    image: "/sterile-dental-surgery-room-with-medical-equipment.jpg",
    icon: Shield,
    features: ["HEPA Filtration", "Autoclave Systems", "UV Sterilization"],
  },
  {
    id: 4,
    title: "In-House Laboratory",
    description:
      "On-site dental laboratory with CAD/CAM technology for same-day crowns, veneers, and custom prosthetics.",
    image: "/dental-laboratory-with-cad-cam-technology.jpg",
    icon: Microscope,
    features: ["CAD/CAM Milling", "Digital Impressions", "Custom Fabrication"],
  },
  {
    id: 5,
    title: "Comfortable Waiting Area",
    description:
      "Relaxing reception area with complimentary refreshments, Wi-Fi, and entertainment to make your visit pleasant.",
    image: "/modern-comfortable-dental-clinic-waiting-room.jpg",
    icon: Users,
    features: ["Free Wi-Fi", "Refreshments", "Comfortable Seating"],
  },
  {
    id: 6,
    title: "Recovery & Consultation Rooms",
    description:
      "Private consultation and recovery rooms where patients can rest comfortably and discuss treatment plans with doctors.",
    image: "/private-dental-consultation-room-modern-design.jpg",
    icon: Sparkles,
    features: ["Private Rooms", "Climate Control", "Post-Op Care"],
  },
]

export function FacilitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facilities.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000)
  }

  const currentFacility = facilities[currentIndex]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Our Facilities</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">World-Class Dental Facilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience comfort and care in our modern, fully-equipped clinic designed with international standards
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={currentFacility.image || "/placeholder.svg"}
                  alt={currentFacility.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Navigation Arrows */}
                <Button
                  onClick={goToPrev}
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  onClick={goToNext}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <currentFacility.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{currentFacility.title}</h3>
                  </div>
                  <p className="text-white/90 mb-4 leading-relaxed max-w-3xl">{currentFacility.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentFacility.features.map((feature, idx) => (
                      <Badge key={idx} className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {facilities.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to facility ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Preview for Desktop */}
          <div className="hidden md:grid grid-cols-6 gap-3 mt-8">
            {facilities.map((facility, index) => (
              <button
                key={facility.id}
                onClick={() => goToSlide(index)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                  index === currentIndex ? "ring-2 ring-primary scale-110 shadow-lg" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={facility.image || "/placeholder.svg"} alt={facility.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-1 left-1">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <facility.icon className="w-3 h-3 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Key Features Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-xs md:text-sm text-muted-foreground">Sterilization Standard</p>
          </Card>
          <Card className="p-4 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">ISO</div>
            <p className="text-xs md:text-sm text-muted-foreground">Certified Facility</p>
          </Card>
          <Card className="p-4 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-xs md:text-sm text-muted-foreground">Emergency Support</p>
          </Card>
          <Card className="p-4 md:p-6 text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">5★</div>
            <p className="text-xs md:text-sm text-muted-foreground">Patient Rating</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
