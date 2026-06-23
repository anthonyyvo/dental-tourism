"use client"

import Image from "next/image"
import { MessengerFloatingButton } from "@/components/messenger-floating-button"
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button"

const WHATSAPP_PHONE = "84909979042"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}`
const MESSENGER_LINK = "https://m.me/901053259982588"

// Desktop: Messenger cao hơn WhatsApp để tránh Eden CRM widget góc phải
const DESKTOP_WHATSAPP_BOTTOM = "bottom-[7.25rem]"
const DESKTOP_MESSENGER_BOTTOM = "bottom-[11.5rem]"

export function ChatFloatingButtons() {
  return (
    <>
      {/* Mobile: Bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
        aria-label="Liên hệ qua chat"
      >
        <div className="flex w-full items-center justify-around border-t border-border bg-background/95 px-4 pb-[env(safe-area-inset-bottom)] pt-3 backdrop-blur supports-backdrop-filter:bg-background/80">
          <a
            href={WHATSAPP_LINK}
            id="whatsapp-btn-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center gap-1 text-[#25D366] transition-opacity hover:opacity-80 active:opacity-70"
            aria-label="Chat qua WhatsApp"
          >
            <Image
              src="/whatsapp-svgrepo-com.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <a
            href={MESSENGER_LINK}
            id="messenger-btn-mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center gap-1 text-[#0866FF] transition-opacity hover:opacity-80 active:opacity-70"
            aria-label="Chat qua Messenger"
          >
            <Image
              src="/logo-facebook.svg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-xs font-medium">Messenger</span>
          </a>
        </div>
      </nav>

      {/* Desktop: Floating buttons */}
      <div
        className={`fixed ${DESKTOP_WHATSAPP_BOTTOM} right-6 z-40 hidden md:block`}
      >
        <WhatsAppFloatingButton />
      </div>
      <div
        className={`fixed ${DESKTOP_MESSENGER_BOTTOM} right-6 z-40 hidden md:block`}
      >
        <MessengerFloatingButton />
      </div>
    </>
  )
}
