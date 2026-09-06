"use client";

interface TermsModalProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-zinc-700 bg-ink-2 p-6 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white"
          aria-label="إغلاق"
        >
          ✕
        </button>

        <h3 className="text-lg font-black">الشروط والأحكام وسياسة الاستخدام</h3>
        <p className="mt-1 text-xs text-zinc-400">
          منصة الأستاذ كمال فتحي لتدريس الفيزياء لطلاب الثانوية العامة
        </p>

        <div className="mt-4 flex-1 space-y-4 overflow-y-auto text-xs leading-6 text-zinc-300">
          <div className="rounded-xl border border-zinc-800 bg-white/5 p-3.5">
            <h4 className="font-bold text-leaf">1. حماية المحتوى والملكية الفكرية</h4>
            <p className="mt-1">
              جميع الفيديوهات والشروحات والملازم واختبارات المنصة محمية بحقوق الطبع والنشر. يُحظر تماماً
              تسجيل الشاشة أو إعادة نشر الفيديوهات. يتم طباعة علامة مائية ديناميكية بكود الطالب ورقم
              هاتفه طوال مدة المشاهدة.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-white/5 p-3.5">
            <h4 className="font-bold text-leaf">2. سياسة الجهاز الواحد (Single Device)</h4>
            <p className="mt-1">
              يُسمح بتسجيل الدخول للحساب من جهاز واحد فقط لكل طالب. في حالة محاولة فتح الحساب من جهاز
              آخر دون إذن، يتم قفل الحساب تلقائياً ويلزم التواصل مع الدعم الفني لإعادة التعيين.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-white/5 p-3.5">
            <h4 className="font-bold text-leaf">3. سياسة كروت الشحن والاسترداد</h4>
            <p className="mt-1">
              كروت شحن السنتر صالحة للاستخدام مرة واحدة فقط، ولا يمكن تحويل الرصيد بعد تفعيل الكورس.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-white/5 p-3.5">
            <h4 className="font-bold text-leaf">4. الالتزام الدراسي</h4>
            <p className="mt-1">
              يتعين على الطالب حل الكويزات الدورية وأداء الواجبات المحددة للحصول على تقييمات الامتياز
              ودخول السحب على جوائز أوائل الدفعة.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-brand py-2.5 text-xs font-black text-white transition hover:bg-brand-deep"
        >
          أوافق على الشروط والأحكام
        </button>
      </div>
    </div>
  );
}
