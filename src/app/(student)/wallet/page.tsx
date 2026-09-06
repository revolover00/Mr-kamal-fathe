"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportModal from "@/components/modals/SupportModal";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  title: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
}

export default function WalletPage() {
  const [balance, setBalance] = useState(350);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TX-901",
      type: "credit",
      title: "شحن كارت سنتر (الفرسان - المنصورة)",
      amount: 150,
      date: "2026-09-02",
      status: "completed",
    },
    {
      id: "TX-844",
      type: "debit",
      title: "شراء كورس الباب الأول: القياس الفيزيائي",
      amount: 120,
      date: "2026-08-28",
      status: "completed",
    },
    {
      id: "TX-712",
      type: "credit",
      title: "مكافأة التفوق في كويز الأسبوع الأول",
      amount: 50,
      date: "2026-08-25",
      status: "completed",
    },
  ]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setBalance(data.user.walletBalance ?? 350);
        }
      })
      .catch(() => {});
  }, []);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/wallet/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setBalance(data.newBalance);
        setMessage({
          type: "success",
          text: `تم شحن ${data.addedAmount} جنيه بنجاح! رصيدك الحالي: ${data.newBalance} ج.م`,
        });
        setTransactions((prev) => [
          {
            id: `TX-${Math.floor(100 + Math.random() * 900)}`,
            type: "credit",
            title: `شحن كود كارت (${code.toUpperCase()})`,
            amount: data.addedAmount,
            date: new Date().toISOString().split("T")[0],
            status: "completed",
          },
          ...prev,
        ]);
        setCode("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "كود الكارت غير صحيح أو تم استخدامه مسبقاً",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "تعذر الاتصال بالخادم، يرجى المحاولة مرة أخرى",
      });
    } finally {
      setLoading(false);
    }
  };

  const outlets = [
    { city: "القاهرة (مدينة نصر)", place: "مكتبة المتفوقين - أمام سنتر الأكاديمية", phone: "01011111111" },
    { city: "الجيزة (الدقي)", place: "مكتبة العباقرة - شارع التحرير", phone: "01022222222" },
    { city: "الإسكندرية (سموحة)", place: "سنتر الفيروز - ميدان فيكتور عمانويل", phone: "01033333333" },
    { city: "الدقهلية (المنصورة)", place: "مكتبة دار العلوم - أمام بوابة الجامعة", phone: "01044444444" },
    { city: "أسيوط (المدينة)", place: "سنتر النور - شارع المحطة", phone: "01055555555" },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black md:text-3xl">المحفظة الإلكترونية وشحن الكروت</h1>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              تابع رصيدك، اشحن كروت السنتر، واستمتع بالاشتراك الفوري في كافة الكورسات
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-700 transition hover:bg-paper dark:border-zinc-700 dark:bg-ink-2 dark:text-zinc-200"
          >
            ← العودة للوحة الطالب
          </Link>
        </div>

        {/* Balance & Top-up Card Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Current Balance Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-6 text-white shadow-xl">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-white/80">رصيدك المتاح حالياً</span>
                <div className="mt-2 text-4xl font-black">{balance}.00 <span className="text-lg">جنيه</span></div>
              </div>
              <div className="mt-6 border-t border-white/20 pt-4 text-xs font-semibold text-white/90">
                🔒 محفظة مؤمنة بالكامل - يمكنك استخدامها في أي كورس أو مذكرة
              </div>
            </div>
            {/* Background Pattern */}
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-white/10 blur-xl" />
          </div>

          {/* Paper Card Scratch Input */}
          <div className="col-span-2 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
            <h2 className="text-lg font-black">شحن كارت السنتر المطبوع 💳</h2>
            <p className="mt-1 text-xs text-zinc-500">
              اخدش الطبقة الفضية على كارت السنتر واكتب الكود المكون من حروف وأرقام بالأسفل:
            </p>

            <form onSubmit={handleRedeem} className="mt-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  dir="ltr"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="KF-CARD-150"
                  className="flex-1 rounded-xl border border-zinc-300 bg-paper px-4 py-3 text-center text-sm font-mono font-bold uppercase text-ink outline-none transition focus:border-brand dark:border-zinc-700 dark:bg-black/30 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={loading || !code.trim()}
                  className="rounded-xl bg-leaf px-6 py-3 text-xs font-black text-white shadow-md transition hover:bg-leaf-deep disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "جاري التحقق والشحن..." : "شحن الكارت الآن ⚡"}
                </button>
              </div>

              {/* Sample cards hint */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                <span>💡 كروت تجريبية صالحة للشحن:</span>
                <button
                  type="button"
                  onClick={() => setCode("KF-CARD-150")}
                  className="rounded-md bg-paper px-2 py-0.5 font-mono font-bold text-leaf hover:bg-zinc-200 dark:bg-white/5 cursor-pointer"
                >
                  KF-CARD-150 (+150 ج.م)
                </button>
                <button
                  type="button"
                  onClick={() => setCode("KF-CARD-250")}
                  className="rounded-md bg-paper px-2 py-0.5 font-mono font-bold text-leaf hover:bg-zinc-200 dark:bg-white/5 cursor-pointer"
                >
                  KF-CARD-250 (+250 ج.م)
                </button>
              </div>

              {message && (
                <div
                  className={`rounded-xl p-3 text-center text-xs font-black ${
                    message.type === "success"
                      ? "bg-leaf/10 text-leaf border border-leaf/30"
                      : "bg-brand/10 text-brand border border-brand/30"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Transactions History */}
        <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">سجل المعاملات والشحن</h2>
            <span className="text-xs font-bold text-zinc-400">آخر المعاملات المسجلة</span>
          </div>

          <div className="mt-4 divide-y divide-zinc-100 dark:divide-white/5">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black ${
                      tx.type === "credit"
                        ? "bg-leaf/10 text-leaf"
                        : "bg-brand/10 text-brand"
                    }`}
                  >
                    {tx.type === "credit" ? "＋" : "－"}
                  </span>
                  <div>
                    <div className="text-xs font-black">{tx.title}</div>
                    <div className="text-[10px] text-zinc-400">
                      {tx.id} • {tx.date}
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <div
                    className={`text-sm font-black ${
                      tx.type === "credit" ? "text-leaf" : "text-brand"
                    }`}
                  >
                    {tx.type === "credit" ? `+${tx.amount}` : `-${tx.amount}`} ج.م
                  </div>
                  <span className="text-[10px] text-leaf font-bold">مكتمل بنجاح ✔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outlets & Bookstores */}
        <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-ink-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">منافذ بيع كروت ومذكرات السنتر 🏬</h2>
              <p className="mt-1 text-xs text-zinc-500">
                يمكنك شراء الكروت والمذكرات الأصلية من الفروع والمكتبات المعتمدة الآتية:
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSupport(true)}
              className="rounded-xl border border-brand bg-brand/10 px-4 py-2 text-xs font-bold text-brand hover:bg-brand hover:text-white cursor-pointer"
            >
              إبلاغ عن مشكلة في كارت 🛟
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outlets.map((o) => (
              <div
                key={o.city}
                className="rounded-2xl border border-zinc-200 bg-paper p-4 text-xs dark:border-zinc-800 dark:bg-white/5"
              >
                <div className="font-black text-brand">{o.city}</div>
                <div className="mt-1 font-bold text-zinc-700 dark:text-zinc-200">{o.place}</div>
                <div className="mt-2 text-[11px] font-mono text-zinc-400">هاتف: {o.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
    </div>
  );
}
