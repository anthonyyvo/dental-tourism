"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">ED</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-foreground">Eden Dental</span>
              <span className="text-xs text-muted-foreground">Premium Care</span>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#services" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Services
          </a>
          <a href="#why-vietnam" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Why Vietnam
          </a>
          <a href="#process" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Process
          </a>
          <a href="#gallery" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Gallery
          </a>
          <a href="#testimonials" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex">
            <a href="#contact">Book Consultation</a>
          </Button>
          <button className="flex md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <a
              href="#services"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#why-vietnam"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Vietnam
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button asChild className="mt-2">
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                Book Consultation
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
