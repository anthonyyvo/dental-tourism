import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sendLeadToCrm, CRM_LEAD_SOURCE } from "@/lib/crm"
import { getNotifyEmailList, EMAIL_REGEX } from "@/lib/notify-emails"

// ==============================
// TYPES
// ==============================

interface PromotionRequestBody {
  name: string
  email: string
  phone: string
  pageUrl?: string
}

// ==============================
// VALIDATION
// ==============================

function validateBody(body: unknown): body is PromotionRequestBody {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_REGEX.test(b.email) &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    (b.pageUrl === undefined || typeof b.pageUrl === "string")
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
    const notifyEmails = getNotifyEmailList()

    if (!smtpUser || !smtpPass || notifyEmails.length === 0) {
      console.error(
        "[Promotion API] Missing/invalid SMTP: SMTP_USER, SMTP_PASS, PROMOTION_NOTIFY_EMAIL (một hoặc nhiều email hợp lệ)"
      )
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      )
    }

    const name = body.name.trim()
    const pageUrl = body.pageUrl?.trim() || ""

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

    const subject = `[Promotion] Lead mới - ${name}`
    const html = `
      <h2>Lead từ Promotion Popup - 10% OFF</h2>
      <p><strong>Tên:</strong> ${name}</p>
      <p><strong>Email:</strong> ${body.email.trim()}</p>
      <p><strong>Số điện thoại:</strong> ${body.phone.trim()}</p>
      <p><strong>Trang gửi:</strong> ${pageUrl || "(Không có)"}</p>
      <p><strong>Thời gian:</strong> ${timestamp}</p>
    `

    await transporter.sendMail({
      from: smtpUser,
      to: notifyEmails,
      subject,
      html,
    })

    const crm = await sendLeadToCrm({
      fullName: name,
      email: body.email.trim(),
      phone: body.phone.trim(),
      source: CRM_LEAD_SOURCE,
      notes: "Ưu đãi 10% - lead từ promotion popup",
      page_url: pageUrl,
    })
    if (!crm.ok) {
      console.error("[Promotion API] CRM sync:", crm.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Promotion API] Send email error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send notification" },
      { status: 500 }
    )
  }
}
