"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { DEFAULT_COURSES } from "@/data/defaultCourses";

const STAGES = ["الكل", "الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"];

export default function CoursesCatalogPage() {
  const [stage, setStage] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = DEFAULT_COURSES.filter((c) => {
    const matchSearch = c.title.includes(search);
    if (!matchSearch) return false;
    if (stage === "الكل") return true;
    if (stage === "الصف الأول الثانوي") return c.id === 1 || c.id === 2 || c.id === 3;
    if (stage === "الصف الثاني الثانوي") return c.id === 1 || c.id === 4;
    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-black md:text-4xl">دليل الكورسات والمحاضرات 2026</h1>
          <p className="mx-auto mt-2 max-w-xl text-xs font-semibold text-zinc-500 md:text-sm">
            اختر مرحلتك الدراسية وتصفح أقوى شروحات الفيزياء وكويزات المتابعة الأسبوعية
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStage(s)}
                className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer ${
                  stage === s
                    ? "bg-brand text-white shadow-md"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-ink-2 dark:text-zinc-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن اسم كورس أو موضوع..."
            className="w-full sm:w-64 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-brand dark:border-zinc-700 dark:bg-ink-2 dark:text-white"
          />
        </div>

        {/* Courses Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((course) => (
            <div key={course.id} className="flex justify-center">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
