"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface RankedStudent {
  rank: number;
  name: string;
  governorate: string;
  stage: string;
  score: number;
  quizzesTaken: number;
  badge?: "gold" | "silver" | "bronze";
}

export default function LeaderboardPage() {
  const [stage, setStage] = useState("الصف الأول الثانوي");

  const students: RankedStudent[] = [
    { rank: 1, name: "مريم أحمد خليل", governorate: "الدقهلية (المنصورة)", stage: "الصف الأول الثانوي", score: 99.4, quizzesTaken: 12, badge: "gold" },
    { rank: 2, name: "عمر شريف الدسوقي", governorate: "القاهرة (مدينة نصر)", stage: "الصف الأول الثانوي", score: 98.8, quizzesTaken: 12, badge: "silver" },
    { rank: 3, name: "سارة محمد إبراهيم", governorate: "الإسكندرية (سموحة)", stage: "الصف الأول الثانوي", score: 98.2, quizzesTaken: 12, badge: "bronze" },
    { rank: 4, name: "يوسف حسام الدين", governorate: "الجيزة (الدقي)", stage: "الصف الأول الثانوي", score: 97.5, quizzesTaken: 11 },
    { rank: 5, name: "نورين وليد فتحي", governorate: "الغربية (طنطا)", stage: "الصف الأول الثانوي", score: 97.0, quizzesTaken: 11 },
    { rank: 6, name: "زياد طارق علام", governorate: "القليوبية (بنها)", stage: "الصف الأول الثانوي", score: 96.4, quizzesTaken: 10 },
    { rank: 7, name: "أحمد محمود كمال", governorate: "أسيوط (المدينة)", stage: "الصف الأول الثانوي", score: 95.8, quizzesTaken: 10 },
    { rank: 8, name: "شهد عادل سليم", governorate: "الشرقية (الزقازيق)", stage: "الصف الأول الثانوي", score: 95.2, quizzesTaken: 10 },
    { rank: 9, name: "كريم هاني عبد الله", governorate: "المنوفية (شبين الكوم)", stage: "الصف الأول الثانوي", score: 94.6, quizzesTaken: 9 },
    { rank: 10, name: "حنين سمير رضوان", governorate: "البحيرة (دمنهور)", stage: "الصف الأول الثانوي", score: 94.0, quizzesTaken: 9 },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Header Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black text-amber-500">
            <span>🏆</span>
            <span>لوحة الشرف وتكريم المتفوقين</span>
          </div>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">
            أوائل الجمهورية في الفيزياء 2026
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs font-semibold text-zinc-500 md:text-sm">
            الترتيب يتم تحديثه تلقائياً فور تصحيح كويزات وامتحانات كل أسبوع برعاية الأستاذ كمال فتحي.
          </p>
        </div>

        {/* Stage Filter */}
        <div className="mt-8 flex justify-center gap-2">
          {["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className={`rounded-2xl px-5 py-2.5 text-xs font-black transition cursor-pointer ${
                stage === s
                  ? "bg-brand text-white shadow-lg"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:bg-paper dark:border-zinc-700 dark:bg-ink-2 dark:text-zinc-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Top 3 Podium Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {/* 2nd Place */}
          <div className="order-2 flex flex-col items-center rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm md:order-1 dark:border-zinc-800 dark:bg-ink-2">
            <span className="text-3xl">🥈</span>
            <div className="mt-2 text-xs font-extrabold text-zinc-400">المركز الثاني</div>
            <h3 className="mt-1 text-base font-black">{students[1].name}</h3>
            <p className="text-[11px] text-zinc-500">{students[1].governorate}</p>
            <div className="mt-4 rounded-xl bg-paper px-4 py-2 text-sm font-black text-brand dark:bg-white/5">
              {students[1].score}%
            </div>
          </div>

          {/* 1st Place (Hero) */}
          <div className="order-1 flex flex-col items-center rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-500/15 via-white to-white p-7 text-center shadow-lg md:order-2 dark:from-amber-500/10 dark:via-ink-2 dark:to-ink-2">
            <span className="text-4xl">👑 🥇</span>
            <div className="mt-2 text-xs font-black text-amber-500">المركز الأول على الجمهورية</div>
            <h3 className="mt-1 text-lg font-black">{students[0].name}</h3>
            <p className="text-xs text-zinc-500">{students[0].governorate}</p>
            <div className="mt-4 rounded-2xl bg-amber-500 px-6 py-2.5 text-base font-black text-white shadow">
              {students[0].score}%
            </div>
            <span className="mt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              🎁 جائزة المركز الأول: اشتراك سنوي مجاني + درع التميز
            </span>
          </div>

          {/* 3rd Place */}
          <div className="order-3 flex flex-col items-center rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm md:order-3 dark:border-zinc-800 dark:bg-ink-2">
            <span className="text-3xl">🥉</span>
            <div className="mt-2 text-xs font-extrabold text-zinc-400">المركز الثالث</div>
            <h3 className="mt-1 text-base font-black">{students[2].name}</h3>
            <p className="text-[11px] text-zinc-500">{students[2].governorate}</p>
            <div className="mt-4 rounded-xl bg-paper px-4 py-2 text-sm font-black text-brand dark:bg-white/5">
              {students[2].score}%
            </div>
          </div>
        </div>

        {/* Current Student Position Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-between rounded-2xl border border-leaf/40 bg-leaf/10 p-4 text-leaf">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎖️</span>
            <div>
              <div className="text-xs font-black">ترتيبك الحالي في {stage}</div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-300">
                أنت في المركز <span className="font-bold text-leaf">#12</span> بمعدل <span className="font-bold text-leaf">92.5%</span>. حل كويز الأسبوع القادم لتصعد لأفضل 10!
              </div>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl bg-leaf px-4 py-2 text-xs font-black text-white shadow hover:bg-leaf-deep"
          >
            حل الكويزات الآن ✍️
          </Link>
        </div>

        {/* Full Table */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-ink-2">
          <div className="p-5">
            <h3 className="text-base font-black">قائمة العشرة الأوائل</h3>
            <p className="text-xs text-zinc-500">مبنية على نتائج الكويزات الدورية ونسبة الحضور</p>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-white/5">
            {students.map((s) => (
              <div key={s.rank} className="flex items-center justify-between px-6 py-4 transition hover:bg-paper/50 dark:hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-black ${
                      s.rank === 1
                        ? "bg-amber-500 text-white"
                        : s.rank === 2
                        ? "bg-zinc-300 text-zinc-800"
                        : s.rank === 3
                        ? "bg-amber-700 text-white"
                        : "bg-paper text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
                    }`}
                  >
                    #{s.rank}
                  </span>
                  <div>
                    <div className="text-xs font-black">{s.name}</div>
                    <div className="text-[10px] text-zinc-400">
                      {s.governorate} • {s.quizzesTaken} كويز مكتمل
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <span className="rounded-lg bg-leaf/10 px-3 py-1 text-xs font-black text-leaf">
                    {s.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
