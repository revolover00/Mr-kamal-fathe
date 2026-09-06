"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/Logo";
import ForgotPassModal from "@/components/modals/ForgotPassModal";

function LoginForm() {
  const params = useSearchParams();
  const justRegistered = params.get("new") === "1";

  const [method, setMethod] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, phone, password, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "حصلت مشكلة، تأكد من البيانات وحاول تاني");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("حصلت مشكلة في الاتصال، حاول تاني");
    } finally {
      setBusy(false);
    }
  };

  const handleQuickLogin = async (role: "student" | "admin") => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demoRole: role }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = role === "admin" ? "/admin/dashboard" : "/dashboard";
      } else {
        setError("تعذر الدخول التجريبي");
      }
    } catch {
      setError("حصلت مشكلة في الاتصال");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center bg-paper px-4 py-10 dark:bg-[#141519]">
      <div className="mx-auto grid w-full max-w-6xl items-stretch gap-6 md:grid-cols-2">
        {/* form panel (right in RTL) */}
        <div className="flex flex-col items-center rounded-2xl bg-paper-2 p-8 md:p-10 dark:bg-ink-2">
          <Logo size="lg" />
          <h1 className="mt-6 text-xl font-black text-ink md:text-2xl dark:text-white">
            أهلاً تاني! جاهز للمذاكرة؟
          </h1>
          <p className="mt-3 text-center text-xs font-semibold leading-6 text-zinc-500">
            سجل على حسابك بإدخال رقم الهاتف وكلمة المرور المسجل بهم من قبل.
          </p>

          {justRegistered && (
            <p className="mt-4 w-full rounded-lg bg-leaf/10 p-2.5 text-center text-xs font-extrabold text-leaf">
              تم إنشاء حسابك بنجاح! سجل دخولك دلوقتي وابدأ المذاكرة.
            </p>
          )}

          {/* Quick Demo Login Bar for Testing */}
          <div className="mt-6 w-full rounded-xl border border-leaf/30 bg-leaf/10 p-3">
            <p className="text-center text-[11px] font-black text-leaf">
              ⚡ تجربة سريعة بدون كتابة بيانات:
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student")}
                className="rounded-lg bg-leaf py-2 text-center text-xs font-extrabold text-white shadow transition hover:bg-leaf-deep"
              >
                دخول كطالب تجريبي 🎓
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="rounded-lg bg-brand py-2 text-center text-xs font-extrabold text-white shadow transition hover:bg-brand-deep"
              >
                دخول كمسؤول المنصة ⚙️
              </button>
            </div>
          </div>

          <div className="mt-6 flex w-full border-b border-zinc-300 dark:border-zinc-600">
            <button
              type="button"
              onClick={() => setMethod("phone")}
              className={`flex-1 pb-3 text-xs font-extrabold transition ${
                method === "phone"
                  ? "border-b-2 border-leaf text-leaf"
                  : "text-ink hover:text-leaf dark:text-zinc-300"
              }`}
            >
              تسجيل الدخول برقم الهاتف
            </button>
            <button
              type="button"
              onClick={() => setMethod("code")}
              className={`flex-1 pb-3 text-xs font-extrabold transition ${
                method === "code"
                  ? "border-b-2 border-leaf text-leaf"
                  : "text-ink hover:text-leaf dark:text-zinc-300"
              }`}
            >
              تسجيل الدخول بالكود
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-5">
            {method === "phone" ? (
              <>
                <input
                  dir="rtl"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="رقم الهاتف (010XXXXXXXX)"
                  inputMode="numeric"
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة السر"
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-zinc-600 dark:text-zinc-300">نسيت كلمة السر؟</span>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="font-extrabold text-brand underline underline-offset-4 cursor-pointer hover:text-brand-deep"
                  >
                    اضغط هنا للاستعادة 🔑
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <input
                  dir="ltr"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="KF-100200"
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-center text-sm font-mono font-bold uppercase outline-none transition placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <p className="text-[11px] text-zinc-500 text-center">
                  💡 الكود التجريبي: <span className="font-mono text-leaf font-bold">KF-100200</span>
                </p>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-brand/10 p-2.5 text-center text-xs font-extrabold text-brand">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 w-full rounded-lg bg-leaf py-3 text-sm font-extrabold text-white transition hover:bg-leaf-deep disabled:opacity-60 cursor-pointer"
            >
              {busy ? "ثواني بنسجل دخولك.." : "تسجيل الدخول"}
            </button>
          </form>

          <p className="mt-8 text-xs font-bold text-zinc-600 dark:text-zinc-300">
            لا يوجد لديك حساب؟{" "}
            <Link href="/signup" className="font-extrabold text-brand hover:underline">
              انشئ حسابك الآن !
            </Link>
          </p>
        </div>

        {/* promo panel (left in RTL) */}
        <div className="relative hidden min-h-[560px] overflow-hidden rounded-2xl md:block shadow-lg">
          <Image
            src="/images/uploads/kamal-studio.jpg"
            alt="الأستاذ كمال فتحي"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <span className="self-start rounded-full bg-brand/90 px-3.5 py-1 text-xs font-black text-white shadow-sm backdrop-blur-xs">
              منصة الأستاذ كمال فتحي ⚡
            </span>
            <p className="max-w-md text-xl font-extrabold leading-9 text-white drop-shadow-md">
              انضم الآن لأكبر مجتمع من أوائل الجمهورية وتعلم الفيزياء بأسلوب ممتع
              وفعّال مع أ/كمال فتحي.
            </p>
          </div>
        </div>
      </div>

      {showForgot && <ForgotPassModal onClose={() => setShowForgot(false)} />}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-paper dark:bg-[#141519]" />}>
      <LoginForm />
    </Suspense>
  );
}
