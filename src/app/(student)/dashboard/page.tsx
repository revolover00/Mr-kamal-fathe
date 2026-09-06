"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LessonModal from "@/components/modals/LessonModal";
import type { LessonType } from "@/data/curriculum";

interface UserInfo {
  id: number;
  name: string;
  phone: string;
  accessCode: string;
  stage: string;
  role: "student" | "admin";
  walletBalance: number;
  enrolledCourseIds: number[];
}

export default function StudentDashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<{
    title: string;
    type: LessonType;
    weekTitle: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // If not logged in, pre-load demo student so the page displays beautifully
          setUser({
            id: 1,
            name: "أحمد محمود (طالب تجريبي)",
            phone: "01000000001",
            accessCode: "KF-100200",
            stage: "الصف الأول الثانوي",
            role: "student",
            walletBalance: 350,
            enrolledCourseIds: [1, 2],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper dark:bg-ink">
        <div className="text-center font-bold text-zinc-500">جاري تحميل لوحة الطالب...</div>
      </div>
    );
  }

  const enrolledCourses = [
    {
      id: 1,
      title: "الامتحان التأسيسي الشامل ومراجعة الأساسيات",
      progress: 85,
      nextLesson: "كويز المحاضرة الأولى",
      image: "/images/uploads/kamal-sitting.jpg",
    },
    {
      id: 2,
      title: "كورس الباب الأول: القياس الفيزيائي وأساسيات الحركة",
      progress: 40,
      nextLesson: "المحاضرة الثانية - التحليل البعدي",
      image: "/images/uploads/kamal-dynamic.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ink to-zinc-900 p-6 text-white shadow-xl md:p-8 dark:from-ink-2 dark:to-black">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-bold text-brand">
                {user?.stage ?? "الصف الأول الثانوي"}
              </span>
              <h1 className="mt-2 text-2xl font-black md:text-3xl">
                أهلاً يا بطل، {user?.name} 👋
              </h1>
              <p className="mt-1 text-xs font-semibold text-zinc-400">
                كود الطالب الخاص بك: <span className="font-mono text-leaf font-bold">{user?.accessCode}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center">
                <span className="block text-[11px] font-bold text-zinc-400">رصيد المحفظة</span>
                <span className="text-lg font-black text-amber-400">💰 {user?.walletBalance} ج.م</span>
              </div>
              <Link
                href="/wallet"
                className="rounded-2xl bg-brand px-5 py-3 text-xs font-black text-white shadow-lg transition hover:bg-brand-deep"
              >
                شحن كارت جديد 💳
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <span className="text-2xl">📈</span>
            <div className="mt-2 text-xl font-black text-leaf">75%</div>
            <div className="text-xs font-bold text-zinc-500">نسبة إنجاز المنهج</div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <span className="text-2xl">⏱️</span>
            <div className="mt-2 text-xl font-black text-brand">14 حصة</div>
            <div className="text-xs font-bold text-zinc-500">ساعات المشاهدة</div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <span className="text-2xl">📝</span>
            <div className="mt-2 text-xl font-black text-blue-500">6 كويزات</div>
            <div className="text-xs font-bold text-zinc-500">تم حلها بنجاح</div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <span className="text-2xl">🏆</span>
            <div className="mt-2 text-xl font-black text-amber-500">المركز 12</div>
            <div className="text-xs font-bold text-zinc-500">ترتيب الجمهورية</div>
          </div>
        </div>

        {/* Continue Watching Section */}
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">المتابعة من حيث توقفت</h2>
              <p className="text-xs text-zinc-500">الباب الأول: المحاضرة الثانية - صيغ الأبعاد وتطبيقاتها</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveLesson({
                  title: "المحاضرة الثانية - صيغ الأبعاد وتطبيقاتها",
                  type: "video",
                  weekTitle: "الأسبوع الثاني",
                })
              }
              className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-black text-white shadow-md transition hover:bg-brand-deep cursor-pointer"
            >
              <span>استكمال المشاهدة</span>
              <span>▶</span>
            </button>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">كورساتي المشترك بها</h2>
            <Link href="/#courses" className="text-xs font-bold text-brand hover:underline">
              استعراض كافة الكورسات ＋
            </Link>
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {enrolledCourses.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:flex-row dark:border-white/10 dark:bg-ink-2"
              >
                <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:w-36">
                  <Image src={c.image} alt={c.title} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black">{c.title}</h3>
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] font-bold text-zinc-500">
                        <span>نسبة الإكمال</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                          className="h-full bg-leaf rounded-full transition-all duration-500"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/course/${c.id}`}
                      className="flex-1 rounded-xl bg-brand py-2 text-center text-xs font-extrabold text-white transition hover:bg-brand-deep"
                    >
                      دخول الكورس 📚
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveLesson({
                          title: c.nextLesson,
                          type: "video",
                          weekTitle: "الأسبوع الأول",
                        })
                      }
                      className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-paper dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-white/5 cursor-pointer"
                    >
                      الدرس التالي ▶
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Quizzes */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Active Quizzes */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <h3 className="text-base font-black">الكويزات والواجبات المتاحة الآن</h3>
            <p className="text-xs text-zinc-500">امتحانات إلكترونية للتأكد من فهمك لكل محاضرة</p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-paper p-3 dark:bg-white/5">
                <div>
                  <div className="text-xs font-black">كويز المحاضرة الأولى: القياس الفيزيائي</div>
                  <div className="text-[10px] text-zinc-400">10 أسئلة - مدة الاختبار: 15 دقيقة</div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLesson({
                      title: "كويز المحاضرة الأولى: القياس الفيزيائي",
                      type: "quiz",
                      weekTitle: "الأسبوع الأول",
                    })
                  }
                  className="rounded-lg bg-leaf px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-leaf-deep cursor-pointer"
                >
                  بدء الكويز ✍️
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-paper p-3 dark:bg-white/5">
                <div>
                  <div className="text-xs font-black">كويز المحاضرة الثانية: التحليل البعدي</div>
                  <div className="text-[10px] text-zinc-400">8 أسئلة - مدة الاختبار: 10 دقائق</div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLesson({
                      title: "كويز المحاضرة الثانية: التحليل البعدي",
                      type: "quiz",
                      weekTitle: "الأسبوع الثاني",
                    })
                  }
                  className="rounded-lg bg-leaf px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-leaf-deep cursor-pointer"
                >
                  بدء الكويز ✍️
                </button>
              </div>
            </div>
          </div>

          {/* Quick Support & Question */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <h3 className="text-base font-black">اسأل مستر كمال فتحي والمساعدين</h3>
            <p className="text-xs text-zinc-500">وقفت معاك مسألة في الواجب أو فكرة مش واضحة؟</p>

            <div className="mt-4 space-y-3">
              <a
                href="https://wa.me/20100000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-leaf/30 bg-leaf/10 p-3 text-leaf transition hover:bg-leaf/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <span className="text-xs font-black">جروب الدعم الفني وتصحيح الواجبات</span>
                </div>
                <span className="text-xs font-extrabold">انضم الآن ←</span>
              </a>

              <Link
                href="/leaderboard"
                className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-amber-600 dark:text-amber-400 transition hover:bg-amber-500/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <span className="text-xs font-black">لوحة شرف أوائل المحافظات</span>
                </div>
                <span className="text-xs font-extrabold">عرض الترتيب ←</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
}
