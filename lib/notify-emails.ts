// ==============================
// DANH SÁCH EMAIL THÔNG BÁO (PROMOTION_NOTIFY_EMAIL) / NOTIFY LIST
// ==============================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NOTIFY_EMAILS_SPLIT = /[,;]+/

export function getNotifyEmailList(): string[] {
  const raw = process.env.PROMOTION_NOTIFY_EMAIL
  if (!raw?.trim()) return []
  return raw
    .split(NOTIFY_EMAILS_SPLIT)
    .map((s) => s.trim())
    .filter((s) => EMAIL_REGEX.test(s))
}

export { EMAIL_REGEX }
