import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sendLeadToCrm, CRM_LEAD_SOURCE } from "@/lib/crm"
import { getNotifyEmailList, EMAIL_REGEX } from "@/lib/notify-emails"

// ==============================
// TYPES
// ==============================

interface ContactRequestBody {
  firstName: string
  lastName?: string
  email: string
  phone: string
  message?: string
  pageUrl?: string
}

// ==============================
// VALIDATION
// ==============================

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
    (b.message === undefined || typeof b.message === "string") &&
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
        { success: false, message: "Thiếu thông tin bắt buộc: Họ tên, Email, Số điện thoại." },
        { status: 400 }
      )
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const notifyEmails = getNotifyEmailList()

    if (!smtpUser || !smtpPass || notifyEmails.length === 0) {
      console.error(
        "[Contact API] Missing/invalid SMTP env: SMTP_USER, SMTP_PASS, PROMOTION_NOTIFY_EMAIL (một hoặc nhiều email hợp lệ)"
      )
      return NextResponse.json(
        { success: false, message: "Chưa cấu hình email. Vui lòng liên hệ quản trị viên." },
        { status: 500 }
      )
    }

    const firstName = body.firstName.trim()
    const lastName = body.lastName?.trim() || ""
    const fullName = `${firstName} ${lastName}`.trim()
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

    const subject = `[Contact] Đăng ký tư vấn - ${fullName}`
    const html = `
      <h2>Đăng ký tư vấn từ Contact Form</h2>
      <p><strong>Họ tên:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${body.email.trim()}</p>
      <p><strong>Số điện thoại:</strong> ${body.phone.trim()}</p>
      <p><strong>Tin nhắn:</strong> ${body.message?.trim() || "(Không có)"}</p>
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
      fullName,
      firstName,
      lastName: lastName || undefined,
      email: body.email.trim(),
      phone: body.phone.trim(),
      source: CRM_LEAD_SOURCE,
      notes: body.message?.trim() || "",
      page_url: pageUrl,
    })
    if (!crm.ok) {
      console.error("[Contact API] CRM sync:", crm.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Contact API] Send email error:", error)
    return NextResponse.json(
      { success: false, message: "Không thể gửi email. Vui lòng kiểm tra cấu hình SMTP và thử lại." },
      { status: 500 }
    )
  }
}
