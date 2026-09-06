"use client";

import { useRef, useState } from "react";
import type { CourseRow } from "@/db/schema";
import CourseCard from "./CourseCard";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

const STAGE_FILTERS = ["الكل", "الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"];

export default function CoursesSection({ courses }: { courses: CourseRow[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState("الكل");

  const scrollByAmount = (dir: 1 | -1) => {
    if (!trackRef.current) return;
    // In RTL, scroll direction
    trackRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const filteredCourses = courses.filter((c) => {
    if (activeStage === "الكل") return true;
    if (activeStage === "الصف الأول الثانوي") return c.id === 1 || c.id === 2 || c.id === 3;
    if (activeStage === "الصف الثاني الثانوي") return c.id === 1 || c.id === 4;
    return true;
  });

  return (
    <section id="courses" className="bg-white py-16 dark:bg-[#191b21]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-black leading-snug text-ink md:text-4xl dark:text-white">
            كورساتنا المتاحة للعام الدراسي 2026/2027
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs font-semibold text-zinc-500 md:text-sm">
            شروحات مبسطة، حل نماذج الوزارة، وكويزات بعد كل محاضرة بإشراف مباشر من أ/ كمال فتحي.
          </p>
        </div>

        {/* Stage Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {STAGE_FILTERS.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setActiveStage(stage)}
              className={`rounded-xl px-4 py-2 text-xs font-extrabold transition cursor-pointer ${
                activeStage === stage
                  ? "bg-brand text-white shadow-[0_8px_20px_-6px_rgba(242,41,18,0.6)]"
                  : "border border-zinc-200 bg-paper text-ink hover:bg-zinc-200 dark:border-zinc-700 dark:bg-ink-2 dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-zinc-300 bg-paper p-10 text-center text-sm font-bold text-zinc-500 dark:border-zinc-600 dark:bg-white/5">
          بنجهز كورسات هذه المرحلة حالياً.. تابعنا قريباً!
        </div>
      ) : (
        <div className="relative mx-auto mt-10 max-w-6xl">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="الكورسات التالية"
            className="absolute start-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-[0_10px_25px_-8px_rgba(23,24,28,0.4)] transition hover:scale-110 hover:bg-brand hover:text-white md:-start-3 dark:bg-ink-2 cursor-pointer"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="الكورسات السابقة"
            className="absolute end-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-[0_10px_25px_-8px_rgba(23,24,28,0.4)] transition hover:scale-110 hover:bg-brand hover:text-white md:-end-3 dark:bg-ink-2 cursor-pointer"
          >
            <Chevron dir="right" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-4 pb-4 pt-2 md:px-10"
          >
            {filteredCourses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
