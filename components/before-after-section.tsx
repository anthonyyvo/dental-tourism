"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

const beforeAfterCases = {
  implants: [
    {
      before: "/new/before-after/cus06b-implant.jpg",
      after: "/new/before-after/cus06a-implant.jpg",
      title: "Single Tooth Implant",
      description: "Complete restoration with natural-looking results",
    },
    {
      before: "/new/before-after/cus03b-implant.jpg",
      after: "/new/before-after/cus03a-implant.jpg",
      title: "All-on-4 Implants",
      description: "Full arch restoration for confident smiling",
    },
    {
      before: "/new/before-after/cus07b-implant.jpg",
      after: "/new/before-after/cus07a-implant.jpg",
      title: "One Day Implant",
      description: "Complete tooth replacement in a single visit - remove hopelessness teeth and restore function",
    },
  ],
  veneers: [
    {
            before: "/new/before-after/cus08b-smile.jpg",
      after: "/new/before-after/cus08a-smile.jpg",

      title: "Hollywood Smile",
      description: "Porcelain veneers for a stunning transformation",
    },
    {
     before: "/new/before-after/cus04b-smile.jpg",
      after: "/new/before-after/cus04a-smile.jpg",
      title: "Smile Makeover",
      description: "Natural-looking veneers for a beautiful smile",
    },
    {
      before: "/new/before-after/cus01b-smile-design.jpg",
      after: "/new/before-after/cus01a-smile-design.jpg",
      title: "Gap Closure",
      description: "Seamless veneer application for gap correction",
    },
  ],
  fullMouth: [
    {
      before: "/new/before-after/cus02b-smile-design.jpg",
      after: "/new/before-after/cus02a-smile-design.jpg",
      title: "Complete Reconstruction",
      description: "Full mouth rehabilitation with implants and crowns",
    },
    {
      before: "/new/before-after/cus09b-full.jpg",
      after: "/new/before-after/cus09a-full.jpg",
      title: "Full Mouth Restoration",
      description: "Comprehensive treatment for total smile renewal",
    },
  ],
  general: [
    // {
    //   before: "/placeholder.svg?height=400&width=400",
    //   after: "/placeholder.svg?height=400&width=400",
    //   title: "Orthodontic Treatment",
    //   description: "Teeth alignment for a perfect bite",
    // },
    {
      before: "/new/before-after/cus11b-general.jpg",
      after: "/new/before-after/cus11a-general.jpg",
      title: "Teeth Whitening",
      description: "Professional whitening for a brighter smile",
    },
    {
            before: "/new/before-after/cus10b-general.jpg",
      after: "/new/before-after/cus10a-general.jpg",
      title: "Composite Fillings",
      description: "Natural-looking tooth restoration",
    },
  ],
}

interface BeforeAfterCardProps {
  before: string
  after: string
  title: string
  description: string
}

function BeforeAfterCard({ before, after, title, description }: BeforeAfterCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const directionRef = useRef<1 | -1>(1) // 1 for right, -1 for left

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)

  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  // Auto-animate slider
  useEffect(() => {
    const animate = () => {
      if (!isDragging && !isHovering) {
        setSliderPosition((prev) => {
          let newPosition = prev + directionRef.current * 0.5
          
          // Reverse direction at boundaries
          if (newPosition >= 100) {
            directionRef.current = -1
            newPosition = 100
          } else if (newPosition <= 0) {
            directionRef.current = 1
            newPosition = 0
          }
          
          return newPosition
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, isHovering])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden bg-muted"
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* After image (full) */}
        <img
          src={after || "/placeholder.svg"}
          alt={`After ${title}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img
            src={before || "/placeholder.svg"}
            alt={`Before ${title}`}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider line and handle */}
        <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          Before
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
          After
        </div>

        {/* Instruction overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm text-white">Drag to compare</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-balance font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-pretty text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

export function BeforeAfterSection() {
  return (
    <section id="before-after" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Real Transformations
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            See the life-changing results our patients have achieved with our expert dental care
          </p>
        </div>

        <Tabs defaultValue="implants" className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-2xl grid-cols-2 gap-2 bg-muted p-2 md:grid-cols-4">
            <TabsTrigger value="implants" className="text-sm md:text-base">
              Implants
            </TabsTrigger>
            <TabsTrigger value="veneers" className="text-sm md:text-base">
              Veneers
            </TabsTrigger>
            <TabsTrigger value="fullMouth" className="text-sm md:text-base">
              Full Mouth
            </TabsTrigger>
            <TabsTrigger value="general" className="text-sm md:text-base">
              General
            </TabsTrigger>
          </TabsList>

          <TabsContent value="implants" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterCases.implants.map((case_, index) => (
                <BeforeAfterCard key={index} {...case_} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="veneers" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterCases.veneers.map((case_, index) => (
                <BeforeAfterCard key={index} {...case_} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fullMouth" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterCases.fullMouth.map((case_, index) => (
                <BeforeAfterCard key={index} {...case_} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="general" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beforeAfterCases.general.map((case_, index) => (
                <BeforeAfterCard key={index} {...case_} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All images are from real patient cases. Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  )
}
