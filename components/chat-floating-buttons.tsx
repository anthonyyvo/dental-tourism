"use client"

import Image from "next/image"
import { MessengerFloatingButton } from "@/components/messenger-floating-button"
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button"

const WHATSAPP_PHONE = "84909979042"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}`
const MESSENGER_LINK = "https://m.me/901053259982588"

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
      <div className="fixed bottom-12 right-6 z-40 hidden flex-col gap-3 md:flex">
        <WhatsAppFloatingButton />
        <MessengerFloatingButton />
      </div>
    </>
  )
}
