import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// ==============================
// TYPES
// ==============================

interface PromotionRequestBody {
  name: string
  email: string
  phone: string
}

// ==============================
// VALIDATION
// ==============================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateBody(body: unknown): body is PromotionRequestBody {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_REGEX.test(b.email) &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0
  )
}

// ==============================
// API HANDLER
// ==============================

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!validateBody(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing required fields: name, email, phone" },
        { status: 400 }
      )
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const notifyEmail = process.env.PROMOTION_NOTIFY_EMAIL

    if (!smtpUser || !smtpPass || !notifyEmail) {
      console.error("[Promotion API] Missing SMTP env vars: SMTP_USER, SMTP_PASS, PROMOTION_NOTIFY_EMAIL")
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const timestamp = new Date().toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "medium",
    })

    const subject = `[Promotion] Lead mới - ${body.name.trim()}`
    const html = `
      <h2>Lead từ Promotion Popup - 20% OFF</h2>
      <p><strong>Tên:</strong> ${body.name.trim()}</p>
      <p><strong>Email:</strong> ${body.email.trim()}</p>
      <p><strong>Số điện thoại:</strong> ${body.phone.trim()}</p>
      <p><strong>Thời gian:</strong> ${timestamp}</p>
    `

    await transporter.sendMail({
      from: smtpUser,
      to: notifyEmail,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Promotion API] Send email error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send notification" },
      { status: 500 }
    )
  }
}
