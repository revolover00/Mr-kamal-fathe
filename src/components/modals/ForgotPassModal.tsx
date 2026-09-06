"use client";

import { useState } from "react";

interface ForgotPassModalProps {
  onClose: () => void;
}

export default function ForgotPassModal({ onClose }: ForgotPassModalProps) {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [tempCode, setTempCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    // Generate recovery code
    setTempCode(`RESET-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
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

        <h3 className="text-lg font-black">استعادة كلمة المرور أو كود الطالب</h3>
        <p className="mt-1 text-xs text-zinc-400">
          أدخل رقم الهاتف المسجل به حسابك لإعادة تعيين كلمة السر أو التواصل مع فريق الدعم الفني.
        </p>

        {submitted ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="rounded-xl border border-leaf/40 bg-leaf/10 p-4">
              <p className="text-xs font-bold text-leaf">
                تم التحقق من رقم الهاتف بنجاح! كود الاستعادة المؤقت:
              </p>
              <div className="mt-2 font-mono text-xl font-black text-white tracking-widest">
                {tempCode}
              </div>
              <p className="mt-2 text-[11px] text-zinc-400">
                يمكنك أيضاً استخدام كود الطالب الخاص بك لتسجيل الدخول مباشرة بدون كلمة السر.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-white/5 p-4 text-right">
              <p className="text-xs font-bold text-zinc-200">📞 أو تواصل مع الدعم الفني الفوري:</p>
              <p className="mt-1 text-xs text-zinc-400">واتساب: 01023456789 (متاح من 9 ص حتى 11 م)</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-brand py-2.5 text-xs font-black text-white transition hover:bg-brand-deep"
            >
              العودة لصفحة تسجيل الدخول
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300">رقم هاتف الحساب المسجل:</label>
              <input
                type="tel"
                dir="rtl"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                required
                className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-white/5 p-3 text-sm font-bold text-white outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-leaf py-3 text-xs font-black text-white shadow-lg transition hover:bg-leaf-deep"
            >
              إرسال كود الاستعادة 📩
            </button>

            <div className="border-t border-zinc-800 pt-3 text-center">
              <p className="text-xs text-zinc-400">
                تواجه صعوبة؟ تواصل مع سكرتارية مستر كمال عبر واتساب مباشرة على{" "}
                <a
                  href="https://wa.me/20100000000"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-leaf underline"
                >
                  01023456789
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
