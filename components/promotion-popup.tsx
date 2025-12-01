"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    // Show popup after 5 seconds on initial load
    const initialTimer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    // Then show popup every 60 seconds
    const recurringTimer = setInterval(() => {
      setIsOpen(true)
    }, 60000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(recurringTimer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Promotion form submitted:", formData)
    // Handle form submission here
    setIsOpen(false)
    setFormData({ name: "", email: "", phone: "" })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isMounted || !isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-300" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg animate-in zoom-in-95 duration-300">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#70be4b] to-[#00aa55] text-white px-8 py-8 text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-3">
              Limited Time Offer
            </div>
            <h2 className="text-3xl font-bold mb-2">Get 20% OFF Your First Visit!</h2>
            <p className="text-white/90 text-lg">Transform your smile with world-class dental care in Vietnam</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full h-12 bg-[#70be4b] hover:bg-[#00aa55] text-white font-semibold text-lg transition-colors"
              >
                Claim Your 20% Discount
              </Button>

              <p className="text-xs text-center text-gray-500">
                By submitting, you agree to receive promotional emails from Eden Dental Clinic
              </p>
            </div>
          </form>

          {/* Benefits */}
          <div className="bg-gray-50 px-8 py-5 border-t">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#70be4b] font-bold">✓</span>
                <span>Free consultation with our specialists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#70be4b] font-bold">✓</span>
                <span>Personalized treatment plan included</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#70be4b] font-bold">✓</span>
                <span>Save 60-80% compared to Western countries</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
