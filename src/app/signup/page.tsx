"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";

const STAGES = ["أولى ثانوي", "تانية ثانوي", "تالتة ثانوي"];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [createdCode, setCreatedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("كلمة السر والتأكيد مش متطابقين");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password, stage }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "حصلت مشكلة، حاول تاني");
        return;
      }
      setCreatedCode(data.code);
    } catch {
      setError("حصلت مشكلة في الاتصال، حاول تاني");
    } finally {
      setBusy(false);
    }
  };

  const copyCode = () => {
    if (!createdCode) return;
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex min-h-dvh items-center bg-paper px-4 py-10 dark:bg-[#141519]">
      <div className="mx-auto grid w-full max-w-6xl items-stretch gap-6 md:grid-cols-2">
        {/* form panel (right in RTL) */}
        <div className="flex flex-col items-center rounded-2xl bg-paper-2 p-8 md:p-10 dark:bg-ink-2">
          <Logo size="lg" />

          {createdCode ? (
            <div className="mt-8 flex w-full flex-col items-center gap-4 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf/15 text-leaf">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <h1 className="text-xl font-black text-ink dark:text-white">
                تم إنشاء حسابك بنجاح!
              </h1>
              <p className="text-xs font-semibold leading-6 text-zinc-500">
                ده كود الطالب الخاص بيك، احتفظ بيه علشان تقدر تسجل دخولك بيه في أي وقت:
              </p>
              
              <div className="flex items-center gap-2">
                <p dir="ltr" className="rounded-xl border-2 border-dashed border-leaf bg-leaf/5 px-6 py-2.5 text-xl font-mono font-black tracking-widest text-leaf">
                  {createdCode}
                </p>
                <button
                  type="button"
                  onClick={copyCode}
                  className="rounded-xl border border-leaf bg-leaf/10 px-3 py-3 text-xs font-black text-leaf transition hover:bg-leaf hover:text-white cursor-pointer"
                  title="نسخ الكود"
                >
                  {copied ? "تم النسخ ✔" : "نسخ 📋"}
                </button>
              </div>

              <div className="mt-4 flex w-full flex-col gap-2.5">
                <Link
                  href="/dashboard"
                  className="w-full rounded-xl bg-leaf py-3 text-center text-sm font-black text-white shadow-lg transition hover:bg-leaf-deep"
                >
                  الدخول للوحة التحكم والمذاكرة فوراً 🚀
                </Link>
                <Link
                  href="/login"
                  className="w-full rounded-xl border border-zinc-700 py-2.5 text-center text-xs font-bold text-zinc-400 hover:text-white"
                >
                  تسجيل الدخول يدوياً
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="mt-6 text-xl font-black text-ink md:text-2xl dark:text-white">
                يلا نبدأ رحلة التفوق في الفيزياء!
              </h1>
              <p className="mt-3 text-center text-xs font-semibold leading-6 text-zinc-500">
                املأ بياناتك بالأسفل وهتقدر تدخل على كل الكورسات والمحتوى التعليمي.
              </p>

              <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم الكامل للطالب"
                  required
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="رقم الهاتف (010XXXXXXXX)"
                  inputMode="numeric"
                  required
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  required
                  className={`w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition focus:border-leaf dark:border-zinc-500 dark:text-white ${
                    stage ? "" : "text-zinc-500"
                  }`}
                >
                  <option value="" disabled>
                    المرحلة الدراسية
                  </option>
                  {STAGES.map((s) => (
                    <option key={s} value={s} className="dark:bg-ink">
                      {s}
                    </option>
                  ))}
                </select>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة السر (6 أحرف أو أرقام على الأقل)"
                  required
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="تأكيد كلمة السر"
                  required
                  className="w-full border-b border-zinc-400 bg-transparent py-3 text-sm font-bold outline-none transition placeholder:font-semibold placeholder:text-zinc-500 focus:border-leaf dark:border-zinc-500 dark:text-white"
                />

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
                  {busy ? "ثواني بنجهز حسابك.." : "إنشاء الحساب الآن 🚀"}
                </button>
              </form>

              <p className="mt-8 text-xs font-bold text-zinc-600 dark:text-zinc-300">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="font-extrabold text-brand hover:underline">
                  سجل دخولك من هنا !
                </Link>
              </p>
            </>
          )}
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
    </div>
  );
}
