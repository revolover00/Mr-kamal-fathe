"use client";

import { useState } from "react";

interface SupportModalProps {
  onClose: () => void;
}

export default function SupportModal({ onClose }: SupportModalProps) {
  const [topic, setTopic] = useState("recharge");
  const [msg, setMsg] = useState("");
  const [ticketId, setTicketId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-700 bg-ink-2 p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white"
          aria-label="إغلاق"
        >
          ✕
        </button>

        <h3 className="text-xl font-black">مركز المساعدة والدعم الفني 🛟</h3>
        <p className="mt-1 text-xs text-zinc-400">
          فريق مساعدة منصة كمال فتحي متاح طوال أيام الأسبوع لمساعدتك في أي استفسار دراسي أو فني.
        </p>

        {ticketId !== null ? (
          <div className="mt-6 rounded-xl border border-leaf/40 bg-leaf/10 p-6 text-center">
            <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-leaf text-white">
              ✔
            </div>
            <h4 className="font-extrabold text-white">تم استلام طلب المساعدة بنجاح</h4>
            <p className="mt-1 text-xs text-zinc-300">
              رقم التذكرة: #{ticketId}. سيتواصل معك أحد المساعدين خلال أقل من 15 دقيقة.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-xl bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20"
            >
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-leaf/40 bg-leaf/10 p-3 transition hover:bg-leaf/20"
              >
                <span className="text-xl">💬</span>
                <div>
                  <div className="text-xs font-black text-leaf">محادثة واتساب سريعة</div>
                  <div className="text-[10px] text-zinc-400">رد فوري على مدار 24 ساعة</div>
                </div>
              </a>

              <a
                href="tel:01000000000"
                className="flex items-center gap-3 rounded-xl border border-brand/40 bg-brand/10 p-3 transition hover:bg-brand/20"
              >
                <span className="text-xl">📞</span>
                <div>
                  <div className="text-xs font-black text-brand">الاتصال المباشر</div>
                  <div className="text-[10px] text-zinc-400">01000000000</div>
                </div>
              </a>
            </div>

            {/* Direct Ticket Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3 rounded-xl border border-zinc-800 bg-white/5 p-4"
            >
              <h4 className="text-xs font-extrabold text-zinc-300">أو أرسل تذكرة دعم مباشرة:</h4>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400">نوع المشكلة:</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-black/40 p-2 text-xs text-white outline-none focus:border-brand"
                >
                  <option value="recharge">مشكلة في كارت الشحن أو المحفظة</option>
                  <option value="video">مشكلة في تشغيل الفيديو أو الحصة</option>
                  <option value="quiz">استفسار حول كويز أو امتحان</option>
                  <option value="physics_question">سؤال علمي لمستر كمال فتحي</option>
                  <option value="other">أمر آخر</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400">تفاصيل الرسالة:</label>
                <textarea
                  rows={3}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="اكتب استفسارك أو تفاصيل المشكلة هنا..."
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-black/40 p-2 text-xs text-white outline-none focus:border-brand"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-brand py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-brand-deep"
              >
                إرسال تذكرة الدعم 🚀
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
