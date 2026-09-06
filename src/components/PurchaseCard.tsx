"use client";

import { useState } from "react";
import Image from "next/image";
import type { CourseRow } from "@/db/schema";
import EnrollModal from "./modals/EnrollModal";

const BASE_WEEKS = ["الأسبوع الأول", "الأسبوع الثاني", "الأسبوع الثالث", "الأسبوع الرابع"];
const EXTRA_WEEKS = ["الأسبوع الخامس", "الأسبوع السادس"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-leaf" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.4l-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z" />
    </svg>
  );
}

export default function PurchaseCard({ course }: { course: CourseRow }) {
  const [more, setMore] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const weeks = more ? [...BASE_WEEKS, ...EXTRA_WEEKS] : BASE_WEEKS;

  return (
    <aside className="rounded-xl border border-black/5 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(23,24,28,0.3)] dark:border-white/10 dark:bg-ink-2">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-64">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 92vw, 380px"
          className="object-cover object-top"
        />
        {course.tint && (
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `linear-gradient(to top, ${course.tint} 0%, rgba(0,0,0,0) 55%)`,
            }}
          />
        )}
      </div>

      <p className="mt-5 text-3xl font-black text-brand">
        {course.free ? "مجاني" : `${course.price}.00`}
        {!course.free && <span className="ms-1 text-sm font-extrabold">جنيه</span>}
      </p>

      <p className="mt-5 text-sm font-extrabold text-ink dark:text-white">الدروس المتاحة:</p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        {weeks.map((w) => (
          <span key={w} className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-300">
            <CheckIcon />
            {w}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setMore((v) => !v)}
        className="mt-4 text-xs font-extrabold text-leaf transition hover:underline"
      >
        {more ? "عرض أقل" : "عرض المزيد من الأسابيع (+2)"}
      </button>

      <button
        type="button"
        onClick={() => setShowEnroll(true)}
        className="mt-5 block w-full rounded-lg bg-brand py-3 text-center text-sm font-extrabold text-white shadow-[0_14px_28px_-12px_rgba(242,41,18,0.7)] transition hover:bg-brand-deep cursor-pointer"
      >
        {course.free ? "ادخل للكورس المجاني !" : "اشترك الآن بكارت السنتر أو المحفظة !"}
      </button>

      <div className="mt-3 text-center">
        <p className="text-[11px] font-bold text-zinc-400">
          🔒 تفعيل فوري ومتابعة دورية مع أ/ كمال فتحي
        </p>
      </div>

      {showEnroll && (
        <EnrollModal
          course={course}
          onClose={() => setShowEnroll(false)}
        />
      )}
    </aside>
  );
}
