"use client"

import Image from "next/image"

const WHATSAPP_PHONE = "84909979042"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}`

export function WhatsAppFloatingButton() {
  return (
    <div className="whatsapp-btn-wrapper relative size-14 shrink-0">
      <span className="whatsapp-ring" aria-hidden />
      <span className="whatsapp-ring" aria-hidden />
      <span className="whatsapp-ring" aria-hidden />
      <a
        href={WHATSAPP_LINK}
        id="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn-animate relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat với chúng tôi qua WhatsApp"
      >
        <Image
          src="/whatsapp-svgrepo-com.svg"
          alt="WhatsApp"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </a>
    </div>
  )
}
