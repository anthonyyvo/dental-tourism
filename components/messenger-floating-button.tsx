"use client"

import Image from "next/image"

const MESSENGER_LINK = "https://m.me/901053259982588"

export function MessengerFloatingButton() {
  return (
    <div className="messenger-btn-wrapper relative size-14 shrink-0">
      {/* Vòng toả ra */}
      <span className="messenger-ring" aria-hidden />
      <span className="messenger-ring" aria-hidden />
      <span className="messenger-ring" aria-hidden />
      <a
        href={MESSENGER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="messenger-btn-animate relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#0866FF] shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#0866FF] focus:ring-offset-2"
        aria-label="Chat với chúng tôi qua Messenger"
      >
        <Image
          src="/logo-facebook.svg"
          alt="Messenger"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </a>
    </div>
  )
}
