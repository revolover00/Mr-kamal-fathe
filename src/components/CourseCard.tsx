"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CourseRow } from "@/db/schema";
import EnrollModal from "./modals/EnrollModal";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7.5-4.7-10-9.3C.5 8 2.4 4.5 6 4.5c2.2 0 3.6 1.2 4.5 2.6.9-1.4 2.3-2.6 4.5-2.6 3.6 0 5.5 3.5 4 7.2C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}

export default function CourseCard({ course }: { course: CourseRow }) {
  const [liked, setLiked] = useState(false);
  const [more, setMore] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);

  return (
    <article className="group flex h-full w-[248px] shrink-0 snap-start flex-col gap-2.5 rounded-xl border border-black/5 bg-white p-3 shadow-[0_14px_30px_-18px_rgba(23,24,28,0.35)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-18px_rgba(242,41,18,0.4)] sm:w-[272px] dark:border-white/10 dark:bg-ink-2">
      <div className="relative h-44 overflow-hidden rounded-lg">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 92vw, 272px"
          className="object-cover object-top transition duration-700 group-hover:scale-110"
        />
        {course.tint && (
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background: `linear-gradient(to top, ${course.tint} 0%, rgba(0,0,0,0) 55%)`,
            }}
          />
        )}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="إضافة للمفضلة"
          className={`absolute end-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/95 shadow transition ${
            liked ? "text-brand" : "text-zinc-400 hover:text-brand"
          }`}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>

      <h3 className="min-h-10 text-sm font-extrabold leading-6 text-ink dark:text-white">
        {course.title}
      </h3>

      {course.free ? (
        <div className="space-y-1.5">
          <span className="inline-block rounded-md border border-brand px-2.5 py-0.5 text-[11px] font-extrabold text-brand">
            {course.badge ?? "كورس مجاني"}
          </span>
          <ul className="space-y-1 text-[11px] font-semibold text-zinc-500">
            <li className="flex items-center gap-1.5">
              <ClockIcon />
              {course.noteLabel}
            </li>
            <li className="flex items-center gap-1.5">
              <CalendarIcon />
              {course.startLabel}
            </li>
            <li>
              <button
                type="button"
                onClick={() => setMore((v) => !v)}
                className="flex items-center gap-1.5 font-bold text-zinc-500 underline-offset-4 transition hover:text-brand hover:underline cursor-pointer"
              >
                <InfoIcon />
                {course.detailLabel ?? "عرض باقي التفاصيل"}
              </button>
            </li>
          </ul>
          {more && (
            <p className="rounded-md bg-paper p-2 text-[11px] font-semibold leading-5 text-zinc-600 dark:bg-white/5 dark:text-zinc-300">
              الامتحان التأسيسي بيقيس مستواك في البداية عشان نحدد معاك خطة
              المذاكرة الصح، ومتاح لكل طلاب الصفوف الثانوية مجاناً.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-1.5">
          <p className="text-sm font-black text-brand">
            {course.price} <span className="text-[11px] font-extrabold">جنيه</span>
          </p>
          <ul className="space-y-1 text-[11px] font-semibold text-zinc-500">
            <li className="flex items-center gap-1.5">
              <CalendarIcon />
              {course.startLabel}
            </li>
            <li className="flex items-center gap-1.5">
              <ClockIcon />
              {course.noteLabel}
            </li>
          </ul>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-1">
        <Link
          href={`/course/${course.id}`}
          prefetch
          className="rounded-lg border border-brand py-2 text-center text-xs font-extrabold text-brand transition hover:bg-red-50 dark:hover:bg-white/10"
        >
          الدخول للكورس
        </Link>
        {!course.free ? (
          <button
            type="button"
            onClick={() => setShowEnroll(true)}
            className="rounded-lg bg-gradient-to-l from-brand to-[#ff6a3d] py-2 text-center text-xs font-extrabold text-white shadow-[0_10px_20px_-10px_rgba(242,41,18,0.7)] transition hover:brightness-110 cursor-pointer"
          >
            الاشتراك في الكورس !
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowEnroll(true)}
            className="rounded-lg bg-leaf py-2 text-center text-xs font-extrabold text-white shadow transition hover:bg-leaf-deep cursor-pointer"
          >
            تفعيل مجاناً !
          </button>
        )}
      </div>

      {showEnroll && (
        <EnrollModal
          course={course}
          onClose={() => setShowEnroll(false)}
        />
      )}
    </article>
  );
}
