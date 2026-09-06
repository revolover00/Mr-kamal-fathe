import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "كمال فتحي للفيزياء | منصتك الأولى لتعلم وفهم الفيزياء",
    template: "%s | كمال فتحي للفيزياء",
  },
  description:
    "منصة الأستاذ كمال فتحي لتعلم وفهم الفيزياء بأسلوب بسيط وممتع لطلاب الثانوية العامة والأزهر.",
  themeColor: "#f22912",
  openGraph: {
    title: "كمال فتحي للفيزياء",
    description:
      "منصتك الأولى لتعلم وفهم الفيزياء بأسلوب بسيط وممتع لطلاب الثانوية العامة والأزهر.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('kf-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
