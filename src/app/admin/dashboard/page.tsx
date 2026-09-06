"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StudentRecord {
  id: number;
  name: string;
  phone: string;
  accessCode: string;
  stage: string;
  balance: number;
  active: boolean;
  deviceBound: boolean;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "cards" | "content">("overview");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: 1,
      name: "أحمد محمود كمال",
      phone: "01000000001",
      accessCode: "KF-100200",
      stage: "الصف الأول الثانوي",
      balance: 350,
      active: true,
      deviceBound: true,
    },
    {
      id: 2,
      name: "مريم أحمد خليل",
      phone: "01000000002",
      accessCode: "KF-100201",
      stage: "الصف الأول الثانوي",
      balance: 150,
      active: true,
      deviceBound: true,
    },
    {
      id: 3,
      name: "عمر شريف الدسوقي",
      phone: "01000000003",
      accessCode: "KF-100202",
      stage: "الصف الثاني الثانوي",
      balance: 200,
      active: true,
      deviceBound: false,
    },
    {
      id: 4,
      name: "سارة محمد إبراهيم",
      phone: "01000000004",
      accessCode: "KF-100203",
      stage: "الصف الثالث الثانوي",
      balance: 50,
      active: false,
      deviceBound: true,
    },
  ]);

  const [newCardAmount, setNewCardAmount] = useState(150);
  const [newCardBatch, setNewCardBatch] = useState<string[]>([]);
  const [topUpModal, setTopUpModal] = useState<{ student: StudentRecord; amount: number } | null>(null);

  const handleGenerateCards = () => {
    const generated: string[] = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      generated.push(`KF-${newCardAmount}-${randomNum}`);
    }
    setNewCardBatch(generated);
  };

  const handleToggleBlock = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleResetDevice = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, deviceBound: false } : s))
    );
  };

  const handleApplyTopUp = () => {
    if (!topUpModal) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === topUpModal.student.id
          ? { ...s, balance: s.balance + Number(topUpModal.amount) }
          : s
      )
    );
    setTopUpModal(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.includes(search) ||
      s.phone.includes(search) ||
      s.accessCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Admin Bar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-ink to-zinc-900 p-6 text-white shadow-xl dark:from-ink-2 dark:to-black">
          <div>
            <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-black text-brand">
              لوحة تحكم الإدارة والعمليات (ERP)
            </span>
            <h1 className="mt-2 text-2xl font-black md:text-3xl">
              إدارة منصة كمال فتحي للفيزياء ⚙️
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              صلاحيات كاملة لمتابعة الطلاب، كروت الشحن، المحتوى الدراسي، وربط الأجهزة
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            >
              عرض كطالب 🎓
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer ${
              activeTab === "overview"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-ink-2 dark:text-zinc-300"
            }`}
          >
            نظرة عامة وإحصائيات 📊
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("students")}
            className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer ${
              activeTab === "students"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-ink-2 dark:text-zinc-300"
            }`}
          >
            إدارة الطلاب ({students.length}) 👥
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cards")}
            className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer ${
              activeTab === "cards"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-ink-2 dark:text-zinc-300"
            }`}
          >
            توليد كروت السنتر (طباعة وQR) 💳
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`rounded-xl px-4 py-2 text-xs font-black transition cursor-pointer ${
              activeTab === "content"
                ? "bg-brand text-white shadow-md"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-ink-2 dark:text-zinc-300"
            }`}
          >
            المحتوى والدروس 📚
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-ink-2">
                <span className="text-2xl">👥</span>
                <div className="mt-2 text-2xl font-black text-ink dark:text-white">1,420</div>
                <div className="text-xs font-bold text-zinc-500">طالب نشط بالمنصة</div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-ink-2">
                <span className="text-2xl">💰</span>
                <div className="mt-2 text-2xl font-black text-leaf">84,500 ج.م</div>
                <div className="text-xs font-bold text-zinc-500">إجمالي شحن الكروت هذا الشهر</div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-ink-2">
                <span className="text-2xl">📝</span>
                <div className="mt-2 text-2xl font-black text-brand">93%</div>
                <div className="text-xs font-bold text-zinc-500">نسبة حضور الكويزات</div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-ink-2">
                <span className="text-2xl">🔒</span>
                <div className="mt-2 text-2xl font-black text-blue-500">0 اختراقات</div>
                <div className="text-xs font-bold text-zinc-500">حماية الفيديوهات والعلامة المائية</div>
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
              <h3 className="text-base font-black">تنبيهات العمليات العاجلة</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-amber-500/10 p-3 text-amber-700 dark:text-amber-300">
                  <div className="text-xs font-black">⚠️ 3 طلاب طلبوا فك ربط الجهاز بسبب تغيير الهاتف المحمول.</div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("students")}
                    className="rounded-lg bg-amber-500 px-3 py-1 text-[11px] font-bold text-white hover:bg-amber-600"
                  >
                    مراجعة الطلبات
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-leaf/10 p-3 text-leaf">
                  <div className="text-xs font-black">✔ تم تصحيح كويز الباب الأول تلقائياً لـ 350 طالباً.</div>
                  <Link
                    href="/leaderboard"
                    className="rounded-lg bg-leaf px-3 py-1 text-[11px] font-bold text-white hover:bg-leaf-deep"
                  >
                    عرض الأوائل
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Students Management */}
        {activeTab === "students" && (
          <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black">إدارة حسابات الطلاب</h3>
                <p className="text-xs text-zinc-500">البحث بالاسم أو رقم الهاتف أو كود الطالب</p>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث بالاسم أو الهاتف أو الكود..."
                className="w-72 rounded-xl border border-zinc-300 bg-paper px-3 py-2 text-xs font-bold outline-none focus:border-brand dark:border-zinc-700 dark:bg-black/30 dark:text-white"
              />
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 dark:border-zinc-800">
                    <th className="pb-3 font-bold">الطالب</th>
                    <th className="pb-3 font-bold">كود الدخول</th>
                    <th className="pb-3 font-bold">المرحلة</th>
                    <th className="pb-3 font-bold">رصيد المحفظة</th>
                    <th className="pb-3 font-bold">ربط الجهاز</th>
                    <th className="pb-3 font-bold">الحالة</th>
                    <th className="pb-3 font-bold">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="py-3">
                      <td className="py-3 font-black">
                        <div>{s.name}</div>
                        <div className="text-[10px] text-zinc-400">{s.phone}</div>
                      </td>
                      <td className="py-3 font-mono font-bold text-leaf">{s.accessCode}</td>
                      <td className="py-3 text-zinc-500">{s.stage}</td>
                      <td className="py-3 font-black">{s.balance} ج.م</td>
                      <td className="py-3">
                        {s.deviceBound ? (
                          <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-500">
                            جهاز مربوط 🔒
                          </span>
                        ) : (
                          <span className="rounded bg-zinc-200 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-white/10">
                            متاح الربط 🔓
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        {s.active ? (
                          <span className="rounded bg-leaf/15 px-2 py-0.5 text-[10px] font-bold text-leaf">
                            نشط ✔
                          </span>
                        ) : (
                          <span className="rounded bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                            محظور 🚫
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setTopUpModal({ student: s, amount: 100 })}
                            className="rounded-lg bg-leaf/10 px-2 py-1 text-[10px] font-bold text-leaf hover:bg-leaf hover:text-white"
                          >
                            + شحن رصيد
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResetDevice(s.id)}
                            className="rounded-lg bg-blue-500/10 px-2 py-1 text-[10px] font-bold text-blue-500 hover:bg-blue-500 hover:text-white"
                          >
                            فك الجهاز
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(s.id)}
                            className={`rounded-lg px-2 py-1 text-[10px] font-bold ${
                              s.active
                                ? "bg-red-500/10 text-brand hover:bg-brand hover:text-white"
                                : "bg-leaf/10 text-leaf hover:bg-leaf hover:text-white"
                            }`}
                          >
                            {s.active ? "حظر" : "إلغاء الحظر"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Card Batch Generator */}
        {activeTab === "cards" && (
          <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <h3 className="text-lg font-black">توليد كروت الشحن للمطابع والسناتر 💳</h3>
            <p className="mt-1 text-xs text-zinc-500">
              قم بإنشاء دفعات جديدة من الأكواد لتوزيعها مطبوعة في السناتر والمكتبات
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400">قيمة الكارت:</label>
                <select
                  value={newCardAmount}
                  onChange={(e) => setNewCardAmount(Number(e.target.value))}
                  className="mt-1 rounded-xl border border-zinc-300 bg-paper p-2.5 text-xs font-bold dark:border-zinc-700 dark:bg-black/30 dark:text-white"
                >
                  <option value={100}>100 جنيه</option>
                  <option value={120}>120 جنيه (سعر كورس)</option>
                  <option value={150}>150 جنيه</option>
                  <option value={200}>200 جنيه</option>
                  <option value={250}>250 جنيه</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateCards}
                className="mt-5 rounded-xl bg-brand px-6 py-2.5 text-xs font-black text-white shadow hover:bg-brand-deep cursor-pointer"
              >
                توليد دفعة جديدة (5 كروت) ⚡
              </button>
            </div>

            {newCardBatch.length > 0 && (
              <div className="mt-6 rounded-2xl border border-leaf/30 bg-leaf/10 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-leaf">
                    الأكواد المنشأة جاهزة للطباعة ({newCardAmount} ج.م لكل كارت):
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(newCardBatch.join("\n"));
                      alert("تم نسخ الأكواد للحافظة!");
                    }}
                    className="rounded-lg bg-leaf px-3 py-1 text-[11px] font-bold text-white hover:bg-leaf-deep"
                  >
                    نسخ الكل 📋
                  </button>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {newCardBatch.map((c) => (
                    <div
                      key={c}
                      className="rounded-xl border border-zinc-300 bg-white p-3 font-mono text-xs font-bold text-ink shadow-sm dark:border-zinc-700 dark:bg-ink dark:text-white"
                    >
                      <div className="text-[10px] text-zinc-400">منصة كمال فتحي للفيزياء</div>
                      <div className="mt-1 text-sm font-black text-leaf">{c}</div>
                      <div className="mt-1 text-[10px] text-zinc-500">القيمة: {newCardAmount} جنيه</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Content Management */}
        {activeTab === "content" && (
          <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black">إدارة الكورسات والمحاضرات</h3>
                <p className="text-xs text-zinc-500">رفع فيديوهات جديدة وملفات PDF وربط الكويزات</p>
              </div>
              <button
                type="button"
                onClick={() => alert("ميزة إضافة محاضرة جديدة: يمكنك رفع الروابط وملفات الـ PDF مباشرة!")}
                className="rounded-xl bg-brand px-4 py-2 text-xs font-black text-white shadow hover:bg-brand-deep cursor-pointer"
              >
                + إضافة محاضرة جديدة
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-paper p-4 dark:bg-white/5">
                <div>
                  <div className="text-xs font-black">الامتحان التأسيسي الشامل ومراجعة الأساسيات</div>
                  <div className="text-[10px] text-zinc-400">كورس مجاني • 4 أسابيع • 1,200 مشترك</div>
                </div>
                <span className="rounded bg-leaf/20 px-2.5 py-1 text-[11px] font-bold text-leaf">نشط ومنشور</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-paper p-4 dark:bg-white/5">
                <div>
                  <div className="text-xs font-black">كورس الباب الأول: القياس الفيزيائي وأساسيات الحركة</div>
                  <div className="text-[10px] text-zinc-400">120 جنيه • 4 أسابيع • 850 مشترك</div>
                </div>
                <span className="rounded bg-leaf/20 px-2.5 py-1 text-[11px] font-bold text-leaf">نشط ومنشور</span>
              </div>
            </div>
          </div>
        )}

        {/* Top-Up Balance Modal */}
        {topUpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-ink-2 p-6 text-white shadow-2xl">
              <h4 className="text-base font-black">شحن يدوي لمحفظة الطالب</h4>
              <p className="mt-1 text-xs text-zinc-400">{topUpModal.student.name}</p>

              <div className="mt-4">
                <label className="block text-xs font-bold text-zinc-300">المبلغ المراد إضافته (جنيه):</label>
                <input
                  type="number"
                  value={topUpModal.amount}
                  onChange={(e) =>
                    setTopUpModal({ ...topUpModal, amount: Number(e.target.value) })
                  }
                  className="mt-1 w-full rounded-xl border border-zinc-700 bg-black/40 p-2 text-sm font-bold text-white outline-none focus:border-leaf"
                />
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={handleApplyTopUp}
                  className="flex-1 rounded-xl bg-leaf py-2 text-xs font-black text-white hover:bg-leaf-deep cursor-pointer"
                >
                  تأكيد الشحن ✔
                </button>
                <button
                  type="button"
                  onClick={() => setTopUpModal(null)}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
