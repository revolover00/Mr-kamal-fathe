"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import TermsModal from "./modals/TermsModal";
import SupportModal from "./modals/SupportModal";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877f2" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="#e1306c" stroke="none" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.8A4.8 4.8 0 0 1 15.4 3h-3v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.8a5.7 5.7 0 1 0 4.9 5.6V9.9a7.7 7.7 0 0 0 4.1 1.2v-3a4.7 4.7 0 0 1-3.2-2.3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ff0000" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "فيسبوك (الصفحة الرسمية)", url: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "انستجرام (@kamalfathy)", url: "https://instagram.com", icon: <InstagramIcon /> },
  { label: "تيك توك (كبسولات فيزياء)", url: "https://tiktok.com", icon: <TiktokIcon /> },
  { label: "يوتيوب (قناة الشروحات)", url: "https://youtube.com", icon: <YoutubeIcon /> },
];

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <footer className="border-t border-black/5 bg-paper px-6 py-12 dark:border-white/10 dark:bg-[#141519]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-3 md:gap-10">
        <div className="col-span-2 flex flex-col items-center gap-4 text-center md:col-span-1 md:items-start md:text-start">
          <Logo size="lg" />
          <p className="text-xs font-extrabold text-ink dark:text-white">
            جميع الحقوق محفوظة © 2026 كمال فتحي للفيزياء
          </p>
          <p dir="ltr" className="text-right text-[10px] font-semibold text-zinc-500">
            {'>Developed by="Kamal Fathy Team" andPowered=true<'}
          </p>
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-[11px] font-bold text-brand underline underline-offset-4 cursor-pointer hover:text-brand-deep"
          >
            الشروط والأحكام وسياسة الخصوصية
          </button>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-brand">روابط سريعة</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/" className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowSupport(true)}
                className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300 cursor-pointer"
              >
                المساعدة والدعم الفني 🛟
              </button>
            </li>
            <li>
              <Link href="/wallet" className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300">
                شحن كروت السنتر والمحفظة 💳
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300">
                أوائل الجمهورية ولوحة الشرف 🏆
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300">
                إنشاء حساب جديد
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300">
                تسجيل الدخول
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-brand">قنوات السوشيال ميديا</h4>
          <ul className="space-y-2.5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-zinc-600 transition hover:text-brand dark:text-zinc-300"
                >
                  {s.icon}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
    </footer>
  );
}
