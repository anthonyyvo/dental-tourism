"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const RATE_LIMIT_COOLDOWN_MS = 5000
const RATE_LIMIT_MAX_SUBMITS = 3
const RATE_LIMIT_RESET_MS = 300000

export function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const lastSubmitTime = useRef<number>(0)
  const submitCount = useRef<number>(0)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeAfterSuccessRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const initialTimer = setTimeout(() => setIsOpen(true), 5000)
    const recurringTimer = setInterval(() => setIsOpen(true), 60000)
    return () => {
      clearTimeout(initialTimer)
      clearInterval(recurringTimer)
    }
  }, [isMounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime.current

    if (timeSinceLastSubmit < RATE_LIMIT_COOLDOWN_MS) {
      setSubmitStatus("error")
      setIsRateLimited(true)
      return
    }

    submitCount.current += 1
    if (submitCount.current > RATE_LIMIT_MAX_SUBMITS) {
      setSubmitStatus("error")
      setIsRateLimited(true)
      return
    }

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)
    resetTimeoutRef.current = setTimeout(() => {
      submitCount.current = 0
    }, RATE_LIMIT_RESET_MS)

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setIsRateLimited(false)
    lastSubmitTime.current = now

    try {
      const response = await fetch("/api/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      })

      const result = await response.json().catch(() => ({}))
      const message = (result as { message?: string }).message

      if (!response.ok) {
        throw new Error(message || "Không thể gửi. Vui lòng thử lại.")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "" })

      if (closeAfterSuccessRef.current) clearTimeout(closeAfterSuccessRef.current)
      closeAfterSuccessRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      console.error("[PromotionPopup] Submit error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (closeAfterSuccessRef.current) {
      clearTimeout(closeAfterSuccessRef.current)
    }
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
            <h2 className="text-3xl font-bold mb-2">Get 10% OFF Your First Visit!</h2>
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
              {submitStatus === "success" && (
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm với ưu đãi 10%.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                  {isRateLimited
                    ? "Vui lòng đợi vài giây trước khi gửi lại. Tối đa 3 lần trong 5 phút."
                    : "Có lỗi xảy ra. Vui lòng kiểm tra thông tin và thử lại."}
                </div>
              )}
              <Button
                id="promotion-btn"
                type="submit"
                disabled={isSubmitting || isRateLimited}
                className="w-full h-12 bg-[#70be4b] hover:bg-[#00aa55] text-white font-semibold text-lg transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Đang gửi..." : "Claim Your 10% Discount"}
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
                <span>Free 3D scans for tooth decay detection & full mouth X-ray</span>
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
