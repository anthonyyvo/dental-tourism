"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

const doctors = [
  {
    name: "Dr. Vo Minh Hoai An",
    image: "/images/2-20-282-29.jpg",
    specialty: "Implantology - Periodontics & Prosthodontics ",
    qualifications: [
      "DDS - University of Medicine Ho Chi Minh City",
      "Master in Dental Implantology",
      "International Dental Implant Association Member",
      "Certificate in Oral Surgery, University of Marseille - France",
      "Implant training at New York University & Columbia University - USA"
    ],
    experience: "12+ years in dental implants and full mouth reconstruction",
  },
    {
    name: "Dr. Nguyen Thuy Phuong Uyen",
    image: "/images/3.jpg",
    specialty: "Orthodontics & Full Mouth Rehabilitation",
    qualifications: [
      "DDS - University of Medicine Ho Chi Minh City",
      "Advanced Training in Prosthodontics",
      "Invisalign Certified Provider",
      "Certificate in Orthodontics",
      "Vietnamese Orthodontic Association Board Member",
    ],
    experience: "12+ years in complex full mouth smile transformations & orthodontics & Invisalign",
  },
  {
    name: "Dr. Phan Thanh Phong",
    image: "/images/5.jpg",
    specialty: "Cosmetic Dentistry & Veneers",
    qualifications: [
      "DDS - University of Medicine Ho Chi Minh City",
      "Certificate in Dental Implantology",
      "Advanced Training in Aesthetic Dentistry",],
    experience: "5+ years specializing in porcelain veneers and smile design",
  },

  {
    name: "Dr. Le Thanh Son",
    image: "/images/4.jpg",
    specialty: "Implantology & Prosthodontics",
    qualifications: [
      "DDS - Ho Chi Minh City University of Medicine",
      "Certificate in Implantology",
      "Continuing Education in Modern Dental Techniques",
    ],
    experience: "10+ years in comprehensive dental care",
  },
  {
    name: "Dr. Le Thao Trang",
    image: "/images/6-1.jpg",
    specialty: "Orthodontics & Smile Alignment",
    qualifications: [
      "DDS - Can Tho University of Medicine and Pharmacy",
      "Master in Orthodontics",
      "Invisalign Certified Provider",
    ],
    experience: "5+ years in orthodontic treatment and invisible braces",
  },
  {
    name: "Dr. Phan Kim Vy",
    image: "/images/7.jpg",
    specialty: "Endodontic & Prosthodontic Dentistry",
    qualifications: [
      "DDS - University of Medicine Ho Chi Minh City",
      "Specialization in Endodontic Dentistry",
      "Certificate in Prosthodontics",
    ],
    experience: "8+ years providing gentle care for patients of all ages",
  },
]

export function DoctorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false) // Pause auto-play when user manually navigates
  }, [])

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying) return

    const timeout = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }, [isAutoPlaying, currentIndex])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            Expert Care Team
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">Meet Our Specialist Doctors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our internationally trained dental specialists bring world-class expertise and years of experience to ensure
            your perfect smile
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-8"
                style={{ transform: `translateX(-${currentIndex * (100 / 4 + 2)}%)` }}
              >
                {doctors.map((doctor, index) => (
                  <div key={index} className="w-1/4 flex-shrink-0">
                    <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">{doctor.specialty}</Badge>

                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">Qualifications</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {doctor.qualifications.map((qual, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{qual}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">Experience</h4>
                            <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/95 hover:bg-white shadow-xl z-10"
              onClick={() => {
                prevSlide()
                setIsAutoPlaying(false)
              }}
              aria-label="Previous doctor"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/95 hover:bg-white shadow-xl z-10"
              onClick={() => {
                nextSlide()
                setIsAutoPlaying(false)
              }}
              aria-label="Next doctor"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Desktop Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to doctor ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Carousel wrapper */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {doctors.map((doctor, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="overflow-hidden border-2 border-primary/30 shadow-lg max-w-md mx-auto">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                        <Badge className="mb-4 bg-secondary text-secondary-foreground">{doctor.specialty}</Badge>

                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">Qualifications</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {doctor.qualifications.map((qual, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{qual}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">Experience</h4>
                            <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/90 hover:bg-white shadow-lg z-10"
              onClick={() => {
                prevSlide()
                setIsAutoPlaying(false)
              }}
              aria-label="Previous doctor"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/90 hover:bg-white shadow-lg z-10"
              onClick={() => {
                nextSlide()
                setIsAutoPlaying(false)
              }}
              aria-label="Next doctor"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to doctor ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-balance">
            Our doctors are registered with the American Dental Association and maintain international standards
            of care and continue learning through advanced training programs worldwide.
          </p>
        </div>
      </div>
    </section>
  )
}
