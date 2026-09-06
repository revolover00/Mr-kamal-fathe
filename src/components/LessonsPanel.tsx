"use client";

import { useState } from "react";
import { WEEKS, type LessonType } from "@/data/curriculum";
import LessonModal from "./modals/LessonModal";

function LessonIcon({ type }: { type: LessonType }) {
  const common = "h-5 w-5 shrink-0";
  switch (type) {
    case "video":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-brand`} fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5-11-6.5z" />
        </svg>
      );
    case "quiz":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-amber-500`} fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm1.1-6.4c-.5.5-1 1-1 1.9h-2.2c0-1.7.9-2.6 1.6-3.2.5-.5.9-.9.9-1.5 0-.8-.6-1.3-1.4-1.3s-1.4.6-1.5 1.5H8.3c.1-2.1 1.6-3.5 3.7-3.5s3.6 1.3 3.6 3.1c0 1.3-.7 2.2-1.5 3z" />
        </svg>
      );
    case "homework":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-leaf`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-blue-500`} fill="currentColor" aria-hidden="true">
          <path d="M21 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14v-2H7V6h14V4zM3 6v14a4 4 0 0 0 4 4h14v-2H7a2 2 0 0 1-2-2V6H3z" />
        </svg>
      );
  }
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function LessonsPanel() {
  const [openWeek, setOpenWeek] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<{
    title: string;
    type: LessonType;
    weekTitle: string;
  } | null>(null);

  return (
    <section className="rounded-xl border border-black/5 bg-white p-5 shadow-[0_18px_40px_-20px_rgba(23,24,28,0.3)] md:p-6 dark:border-white/10 dark:bg-ink-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-ink md:text-3xl dark:text-white">الدروس والمحاضرات</h2>
        <span className="rounded-lg bg-leaf/10 px-3 py-1 text-xs font-bold text-leaf dark:bg-leaf/20">
          اضغط على أي درس للمشاهدة والحل فوراً
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {WEEKS.map((week, i) => {
          const open = openWeek === i;
          return (
            <div key={week.title}>
              <button
                type="button"
                onClick={() => setOpenWeek(open ? -1 : i)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-start transition ${
                  open
                    ? "bg-leaf text-white shadow-[0_12px_25px_-12px_rgba(35,164,85,0.8)]"
                    : "bg-paper text-ink hover:bg-paper-2 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                }`}
              >
                <span>
                  <span className="block text-sm font-extrabold">{week.title}</span>
                  <span
                    className={`mt-0.5 block text-[11px] font-bold ${
                      open ? "text-white/85" : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {week.subtitle} ({week.lessons.length} عناصر)
                  </span>
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    open ? "bg-white/20 text-white" : "bg-white text-ink shadow dark:bg-white/10 dark:text-white"
                  }`}
                >
                  <Chevron open={open} />
                </span>
              </button>

              {open && (
                <div className="mt-3 space-y-2.5">
                  {week.lessons.map((lesson) => (
                    <button
                      key={lesson.title}
                      type="button"
                      onClick={() =>
                        setSelectedLesson({
                          title: lesson.title,
                          type: lesson.type,
                          weekTitle: week.title,
                        })
                      }
                      className="group flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-paper-2 px-3.5 py-3 text-start transition hover:border-brand/40 hover:bg-white hover:shadow-sm dark:border-white/5 dark:bg-white/5 dark:hover:border-brand/40 dark:hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <LessonIcon type={lesson.type} />
                        <div>
                          <span className="text-xs font-black text-ink transition group-hover:text-brand dark:text-white dark:group-hover:text-brand">
                            {lesson.title}
                          </span>
                          <span className="mr-2 text-[10px] font-bold text-zinc-400">
                            {lesson.type === "quiz"
                              ? "اختبار إلكتروني (10 دقائق)"
                              : lesson.type === "homework"
                              ? "واجب منزلي وتدريبات"
                              : "فيديو عالي الجودة HD"}
                          </span>
                        </div>
                      </div>

                      <span className="rounded-lg bg-zinc-200/60 px-2.5 py-1 text-[10px] font-extrabold text-zinc-600 transition group-hover:bg-brand group-hover:text-white dark:bg-white/10 dark:text-zinc-300">
                        {lesson.type === "quiz" ? "ابدأ الاختبار" : "مشاهدة الآن ▶"}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Lesson Modal */}
      <LessonModal
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
      />
    </section>
  );
}
