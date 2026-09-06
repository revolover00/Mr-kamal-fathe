"use client";

import { useState } from "react";
import type { CourseRow } from "@/db/schema";

interface EnrollModalProps {
  course: CourseRow | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EnrollModal({ course, onClose, onSuccess }: EnrollModalProps) {
  const [method, setMethod] = useState<"card" | "wallet" | "free">("card");
  const [cardCode, setCardCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) return null;

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setBusy(true);

    try {
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          paymentMethod: course.free ? "free" : method,
          cardCode: method === "card" ? cardCode : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatusMsg({ type: "error", text: data.error ?? "حصل خطأ أثناء تفعيل الاشتراك" });
        return;
      }

      setStatusMsg({ type: "success", text: data.message ?? "تم تفعيل اشتراك الكورس بنجاح!" });
      setEnrolled(true);
      if (onSuccess) onSuccess();
    } catch {
      setStatusMsg({ type: "error", text: "تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-ink-2 p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white"
          aria-label="إغلاق"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="inline-block rounded-md bg-brand/20 px-3 py-1 text-xs font-black text-brand">
            {course.free ? "اشتراك مجاني" : `${course.price ?? 150} ج.م`}
          </span>
          <h3 className="mt-3 text-lg font-black">{course.title}</h3>
          <p className="mt-1 text-xs text-zinc-400">
            {course.free
              ? "هذا الكورس متاح مجاناً لكافة طلاب الثانوية العامة"
              : "اختر طريقة الاشتراك المناسبة لك لبدء مشاهدة الحصص فوراً"}
          </p>
        </div>

        {enrolled ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-2xl text-white">
              ✔
            </div>
            <p className="text-sm font-extrabold text-leaf">{statusMsg?.text}</p>
            <div className="flex flex-col gap-2">
              <a
                href={`/course/${course.id}`}
                className="w-full rounded-xl bg-brand py-3 text-center text-xs font-black text-white shadow-lg transition hover:bg-brand-deep"
              >
                الانتقال للدروس ومشاهدة الشرح 🚀
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-zinc-700 py-2.5 text-xs font-bold text-zinc-300 hover:bg-white/5"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEnroll} className="mt-6 space-y-4">
            {!course.free && (
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`rounded-lg py-2 text-xs font-extrabold transition ${
                    method === "card" ? "bg-brand text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  كارت شحن السنتر 💳
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("wallet")}
                  className={`rounded-lg py-2 text-xs font-extrabold transition ${
                    method === "wallet" ? "bg-brand text-white shadow" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  رصيد المحفظة 💰
                </button>
              </div>
            )}

            {!course.free && method === "card" && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300">
                  أدخل كود كارت الشحن من السنتر أو الموزع:
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value)}
                  placeholder="مثال: KF-CARD-150 أو KF-FREE-2026"
                  className="w-full rounded-xl border border-zinc-700 bg-white/5 p-3 text-center font-mono text-sm font-bold uppercase tracking-wider text-white outline-none focus:border-brand"
                  required
                />
                <p className="text-[11px] text-zinc-400">
                  💡 يمكنك تجربة الأكواد التجريبية: <span className="font-mono text-leaf">KF-FREE-2026</span> أو <span className="font-mono text-leaf">KF-CARD-150</span>
                </p>
              </div>
            )}

            {!course.free && method === "wallet" && (
              <div className="rounded-xl border border-zinc-700 bg-white/5 p-4 text-center">
                <p className="text-xs text-zinc-300">سيتم خصم قيمة الكورس ({course.price} ج.م) من رصيد محفظتك على المنصة.</p>
                <p className="mt-2 text-[11px] text-zinc-400">
                  لو رصيدك مش كافي، اشحن محفظتك بكود كارت شحن أولاً من صفحة المحفظة.
                </p>
              </div>
            )}

            {statusMsg && (
              <p
                className={`rounded-lg p-2.5 text-center text-xs font-extrabold ${
                  statusMsg.type === "success"
                    ? "bg-leaf/20 text-leaf"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {statusMsg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-leaf py-3 text-sm font-black text-white shadow-lg transition hover:bg-leaf-deep disabled:opacity-60"
            >
              {busy
                ? "جاري تفعيل الكورس..."
                : course.free
                ? "تفعيل الكورس المجاني الآن مجاناً 🎁"
                : "تأكيد الاشتراك وتفعيل الحصص ✅"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
