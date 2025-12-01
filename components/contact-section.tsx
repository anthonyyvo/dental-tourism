"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState, useRef } from "react"

// Declare subiz global type
declare global {
  interface Window {
    subiz?: (command: string, formId: string, data: Array<{ key: string; value: string }>) => void
  }
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isRateLimited, setIsRateLimited] = useState(false)
  const lastSubmitTime = useRef<number>(0)
  const submitCount = useRef<number>(0)
  const resetTimeoutRef = useRef<NodeJS.Timeout>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Rate limiting: Check time since last submit
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime.current
    
    // Prevent submission if less than 5 seconds since last submit
    if (timeSinceLastSubmit < 5000) {
      setSubmitStatus("error")
      setIsRateLimited(true)
      return
    }
    
    // Track submission count (max 3 per 5 minutes)
    submitCount.current += 1
    
    if (submitCount.current > 3) {
      setSubmitStatus("error")
      setIsRateLimited(true)
      return
    }
    
    // Reset counter after 5 minutes
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }
    resetTimeoutRef.current = setTimeout(() => {
      submitCount.current = 0
    }, 300000) // 5 minutes
    
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setIsRateLimited(false)
    lastSubmitTime.current = now

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      const currentPage = window.location.href

      // Basic validation
      if (!formData.firstName || !formData.email || !formData.phone) {
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setSubmitStatus("error")
        setIsSubmitting(false)
        return
      }

      // Send data to Subiz
      if (window.subiz) {
        window.subiz("submitForm", "cpsigilaccofaeomohlwl", [
          { key: "fullname", value: fullName },
          { key: "email", value: formData.email },
          { key: "phones", value: formData.phone },
          { key: "message", value: formData.message },
          { key: "location", value: currentPage },
        ])
      }

      setSubmitStatus("success")
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <section id="contact" className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Start Your Smile Journey Today
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Get a free consultation and personalized treatment plan
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Card className="border-2">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your dental needs..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                  />
                </div>
                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                    Thank you! Your consultation request has been sent successfully. We'll contact you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                    {isRateLimited
                      ? "Please wait a moment before submitting again. Maximum 3 submissions per 5 minutes."
                      : "Please check that all required fields are filled correctly and try again."}
                  </div>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || isRateLimited}>
                  {isSubmitting ? "Sending..." : "Send Free Consultation Request"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  <span className="text-red-500">*</span> Required fields
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-foreground">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">+84 909 979 042</p>
                    <p className="text-sm text-muted-foreground">+84 909 979 047</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:support@nhakhoaeden.vn" className="text-sm text-muted-foreground hover:text-primary">support@nhakhoaeden.vn</a>
                    <br/>
                    <a href="mailto:nhakhoaeden@gmail.com" className="text-sm text-muted-foreground hover:text-primary">nhakhoaeden@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">187 Dien Bien Phu, Tan Dinh Ward</p>
                    <p className="text-sm text-muted-foreground">District 1, Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location 2</p>
                    <p className="text-sm text-muted-foreground">171 Nguyen Thi Thap,Tan Phu Ward</p>
                    <p className="text-sm text-muted-foreground">District 7, Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-2 border-primary bg-primary/5">
              <CardContent className="p-6">
                <h4 className="mb-2 font-semibold text-foreground">Operating Hours</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Saturday: 8:00 AM - 7:30 PM</p>
                  <p>Sunday: 8:00 AM - 12:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
