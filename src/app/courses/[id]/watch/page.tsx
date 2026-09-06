"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function CourseWatchPage({ params }: WatchPageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ top: "20%", left: "30%" });
  const [recordingWarning, setRecordingWarning] = useState(false);

  useEffect(() => {
    // Dynamic floating watermark for security
    const interval = setInterval(() => {
      setWatermarkPos({
        top: `${Math.floor(15 + Math.random() * 65)}%`,
        left: `${Math.floor(15 + Math.random() * 65)}%`,
      });
    }, 4500);

    // Anti-screen-capture listener
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setRecordingWarning(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111216] text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href={`/course/${courseId}`}
            className="flex items-center gap-2 text-xs font-bold text-zinc-400 transition hover:text-white"
          >
            <span>←</span>
            <span>العودة لجدول محاضرات الكورس</span>
          </Link>
          <span className="rounded-full bg-leaf/20 px-3 py-1 text-xs font-black text-leaf">
            🔒 بث مشفر عالي الأمان (HD 1080p)
          </span>
        </div>

        {/* Video Player Box */}
        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
          {/* Dynamic Floating Watermark */}
          <div
            className="pointer-events-none absolute z-30 select-none font-mono text-xs font-black text-white/30 transition-all duration-1000"
            style={{ top: watermarkPos.top, left: watermarkPos.left }}
          >
            KF-100200 • 01000000001
          </div>

          {/* Video Placeholder / Native Video UI */}
          <div className="relative flex h-full w-full items-center justify-center bg-zinc-950">
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-brand text-3xl shadow-lg transition hover:scale-110 cursor-pointer">
                ▶
              </div>
              <h2 className="text-xl font-black">المحاضرة الأولى: صيغ الأبعاد وتطبيقاتها في الفيزياء</h2>
              <p className="mt-1 text-xs text-zinc-400">تقديم: الأستاذ كمال فتحي • مدة الشرح: 48 دقيقة</p>
            </div>
          </div>

          {/* Warning Overlay if tab unfocused */}
          {recordingWarning && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
              <span className="text-4xl">⚠️</span>
              <h3 className="mt-2 text-lg font-black text-brand">تنبيه حماية المحتوى</h3>
              <p className="mt-1 max-w-md text-xs text-zinc-300">
                تم إيقاف تشغيل الفيديو مؤقتاً لتغيير النافذة أو محاولة تسجيل الشاشة. الفيديوهات مشفرة ومحمية باسمك ورقم هاتفك.
              </p>
              <button
                type="button"
                onClick={() => setRecordingWarning(false)}
                className="mt-4 rounded-xl bg-brand px-6 py-2 text-xs font-black text-white hover:bg-brand-deep cursor-pointer"
              >
                متابعة المشاهدة الآن
              </button>
            </div>
          )}

          {/* Video Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 flex flex-wrap items-center justify-between bg-gradient-to-t from-black via-black/80 to-transparent p-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold hover:bg-white/30 cursor-pointer"
              >
                {playing ? "⏸ إيقاف" : "▶ تشغيل"}
              </button>
              <span className="text-xs font-mono text-zinc-400">14:20 / 48:00</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400">السرعة:</span>
              {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`rounded px-2 py-0.5 text-xs font-bold transition cursor-pointer ${
                    speed === s ? "bg-brand text-white" : "bg-white/10 text-zinc-300 hover:bg-white/20"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Actions & Attachments */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a
            href="#download-pdf"
            onClick={(e) => {
              e.preventDefault();
              alert("تم بدء تحميل ملخص الـ PDF بجودة عالية!");
            }}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-black transition hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <div>ملخص وقوانين المحاضرة (PDF)</div>
                <div className="text-[10px] text-zinc-400">حجم الملف: 3.4 ميجابايت</div>
              </div>
            </div>
            <span className="rounded bg-brand px-2.5 py-1 text-[11px] text-white">تحميل</span>
          </a>

          <Link
            href="/dashboard"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-black transition hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <div>
                <div>كويز المتابعة للمحاضرة</div>
                <div className="text-[10px] text-zinc-400">10 أسئلة لقياس الفهم</div>
              </div>
            </div>
            <span className="rounded bg-leaf px-2.5 py-1 text-[11px] text-white">بدء الكويز</span>
          </Link>

          <a
            href="https://wa.me/20100000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-black transition hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <div>اسأل مستر كمال في مسألة</div>
                <div className="text-[10px] text-zinc-400">رد فوري على الواتساب</div>
              </div>
            </div>
            <span className="rounded bg-zinc-700 px-2.5 py-1 text-[11px] text-white">تواصل</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
