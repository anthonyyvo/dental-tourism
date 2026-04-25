// ==============================
// TYPES
// ==============================

/** "Nguồn" trên CRM chỉ chấp nhận: website, facebook, zalo, instagram, other, null */
export const CRM_LEAD_SOURCE = "website" as const

export interface CrmInboundLead {
  fullName: string
  firstName?: string
  lastName?: string
  email: string
  phone: string
  source: typeof CRM_LEAD_SOURCE
  notes: string
  page_url: string
}

// ==============================
// GỬI LEAD TỚI CRM / SEND LEAD TO CRM
// ==============================

/**
 * Gửi POST tới CRM khi đã cấu hình CRM_API_URL + CRM_API_KEY.
 * Thất bại chỉ ghi log — caller quyết định impact lên response.
 */
export async function sendLeadToCrm(payload: CrmInboundLead): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.CRM_API_URL?.trim()
  const key = process.env.CRM_API_KEY?.trim()
  if (!url || !key) {
    console.warn("[CRM] Bỏ qua: thiếu CRM_API_URL hoặc CRM_API_KEY")
    return { ok: true }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[CRM] HTTP", res.status, text.slice(0, 500))
      return { ok: false, error: text || `HTTP ${res.status}` }
    }

    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown"
    console.error("[CRM] fetch error:", e)
    return { ok: false, error: message }
  }
}
