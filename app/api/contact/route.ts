import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// ==============================
// TYPES
// ==============================

interface ContactRequestBody {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

// ==============================
// VALIDATION
// ==============================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateBody(body: unknown): body is ContactRequestBody {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_REGEX.test(b.email) &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    (b.lastName === undefined || typeof b.lastName === "string") &&
    (b.message === undefined || typeof b.message === "string")
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
        { success: false, message: "Thiếu thông tin bắt buộc: Họ tên, Email, Số điện thoại." },
        { status: 400 }
      )
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const notifyEmail = process.env.PROMOTION_NOTIFY_EMAIL

    if (!smtpUser || !smtpPass || !notifyEmail) {
      console.error("[Contact API] Missing SMTP env vars: SMTP_USER, SMTP_PASS, PROMOTION_NOTIFY_EMAIL")
      return NextResponse.json(
        { success: false, message: "Chưa cấu hình email. Vui lòng liên hệ quản trị viên." },
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

    const fullName = `${body.firstName.trim()} ${body.lastName?.trim() || ""}`.trim()
    const timestamp = new Date().toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "medium",
    })

    const subject = `[Contact] Đăng ký tư vấn - ${fullName}`
    const html = `
      <h2>Đăng ký tư vấn từ Contact Form</h2>
      <p><strong>Họ tên:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${body.email.trim()}</p>
      <p><strong>Số điện thoại:</strong> ${body.phone.trim()}</p>
      <p><strong>Tin nhắn:</strong> ${body.message?.trim() || "(Không có)"}</p>
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
    console.error("[Contact API] Send email error:", error)
    return NextResponse.json(
      { success: false, message: "Không thể gửi email. Vui lòng kiểm tra cấu hình SMTP và thử lại." },
      { status: 500 }
    )
  }
}
