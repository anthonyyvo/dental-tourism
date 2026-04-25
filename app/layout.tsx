import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eden Dental Clinic - Premium Dental Tourism in Vietnam",
  description:
    "Experience world-class dental care in Vietnam. Specializing in dental implants, veneers, and full mouth smile design at affordable prices.",
  generator: "Eden Dental Clinic",
  icons: {
    icon: [{ url: "/eden.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const widgetKey = process.env.NEXT_PUBLIC_WIDGET_KEY || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - vị trí cao nhất trong head */}
        <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-55K3CX3');`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17493940715"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17493940715');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) - ngay sau thẻ mở body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-55K3CX3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Analytics />
        {/* <Script id="custom-inline-script" strategy="afterInteractive">
          {`
!function(s,u,b,i,z){var o,t,r,y;s[i]||(s._sbzaccid=z,s[i]=function(){s[i].q.push(arguments)},s[i].q=[],s[i]("setAccount",z),r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){var n=t<=6?5:o(k,t-1)+o(k,t-3);return k!==t?n:n.toString(32)})(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],(y=function(k){var t,n;s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),n=u.getElementsByTagName(b)[0],t.async=1,t.src="https://"+r[k]+"/sbz/app.js?accid="+z,n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))})(0))}(window,document,"script","subiz", "acrwuznfnxprpjyakhof") `}
        </Script> */}

  {/* <Script 
  src="https://pub-fa91ea4be9bf4ee29711c84ecff9c83c.r2.dev/widget/loader.js"
  strategy="afterInteractive"
  data-key={widgetKey}
  data-endpoint={`${apiUrl}/api/webform/submit`}

/> */}

      </body>
    </html>
  );
}
