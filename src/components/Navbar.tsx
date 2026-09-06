"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

interface UserSession {
  id: number;
  name: string;
  phone: string;
  accessCode: string;
  stage: string;
  role: "student" | "admin";
  walletBalance: number;
}

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const frame = requestAnimationFrame(() => {
      setTheme(isDark ? "dark" : "light");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const setMode = (mode: "light" | "dark") => {
    setTheme(mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("kf-theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("kf-theme", "light");
      } catch {}
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  const handleQuickDemo = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoRole: "student" }),
    });
    const data = await res.json();
    if (data.ok) {
      window.location.href = "/dashboard";
    }
  };

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pb-3 pt-3">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-sm dark:bg-ink-2">
        {/* Navigation & Auth buttons (desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-leaf/10 px-3 py-1.5 text-xs font-black text-leaf transition hover:bg-leaf/20"
              >
                <span>لوحة الطالب</span>
                <span className="rounded bg-leaf px-1.5 py-0.5 text-[10px] text-white">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <Link
                href="/wallet"
                className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-600 dark:text-amber-400"
              >
                <span>💰 {user.walletBalance} ج.م</span>
              </Link>
              <Link
                href="/leaderboard"
                className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-zinc-600 hover:text-brand dark:text-zinc-300 dark:hover:text-white"
              >
                المتصدرين 🏆
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="rounded-lg bg-brand/15 px-2.5 py-1.5 text-xs font-black text-brand transition hover:bg-brand hover:text-white"
                >
                  لوحة الإدارة ⚙️
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-500 transition hover:bg-red-50 hover:text-brand dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-white/5 cursor-pointer"
              >
                خروج
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signup"
                className="rounded-lg bg-brand px-4 py-2 text-xs font-extrabold text-white transition hover:bg-brand-deep md:text-sm"
              >
                حساب جديد
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-brand bg-white px-4 py-2 text-xs font-extrabold text-brand transition hover:bg-red-50 md:text-sm dark:bg-transparent dark:hover:bg-white/10"
              >
                تسجيل الدخول
              </Link>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="rounded-lg bg-leaf/15 px-3 py-2 text-xs font-black text-leaf transition hover:bg-leaf hover:text-white cursor-pointer"
              >
                ⚡ دخول تجريبي فوري
              </button>
            </div>
          )}
        </div>

        {/* Links (desktop middle) */}
        <nav className="hidden items-center gap-4 text-xs font-extrabold text-zinc-700 lg:flex dark:text-zinc-200">
          <Link href="/" className="transition hover:text-brand">
            الرئيسية
          </Link>
          <Link href="/#courses" className="transition hover:text-brand">
            الكورسات المتاحة
          </Link>
          <Link href="/wallet" className="transition hover:text-brand">
            شحن الكروت
          </Link>
          <Link href="/leaderboard" className="transition hover:text-brand">
            أوائل المنصة
          </Link>
        </nav>

        {/* Theme toggle & Logo */}
        <div className="flex items-center gap-3">
          {/* Dual buttons for Light and Dark mode */}
          <div
            className="flex items-center rounded-full bg-paper p-1 dark:bg-white/10"
            role="group"
            aria-label="اختيار مظهر المنصة"
          >
            <button
              type="button"
              onClick={() => setMode("light")}
              title="الوضع الفاتح"
              aria-label="تفعيل الوضع الفاتح"
              aria-pressed={theme === "light"}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                theme === "light"
                  ? "bg-white text-brand shadow-sm font-extrabold"
                  : "text-zinc-500 hover:text-ink dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              <SunIcon />
              <span className="hidden sm:inline">فاتح</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("dark")}
              title="الوضع الداكن"
              aria-label="تفعيل الوضع الداكن"
              aria-pressed={theme === "dark"}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                theme === "dark"
                  ? "bg-ink text-white shadow-sm font-extrabold dark:bg-brand dark:text-white"
                  : "text-zinc-500 hover:text-ink dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              <MoonIcon />
              <span className="hidden sm:inline">داكن</span>
            </button>
          </div>

          <Link href="/" aria-label="الرئيسية">
            <Logo />
          </Link>
        </div>

        {/* 3-bars Hamburger button (mobile) */}
        <button
          type="button"
          id="mobile-menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة الرئيسية"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-paper text-ink transition hover:border-brand/40 hover:bg-brand/10 hover:text-brand md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 cursor-pointer"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {open && (
        <div className="md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            onClick={close}
            aria-hidden="true"
          />

          {/* Floating drawer menu */}
          <nav
            aria-label="القائمة المتنقلة"
            className="fixed inset-x-3 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-black/10 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-ink-2"
          >
            <div className="flex flex-col gap-3">
              {/* Theme switch in drawer */}
              <div className="flex items-center justify-between rounded-xl bg-paper p-3 dark:bg-white/5">
                <span className="text-xs font-black text-ink dark:text-white">
                  مظهر المنصة:
                </span>
                <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-xs dark:bg-ink">
                  <button
                    type="button"
                    onClick={() => setMode("light")}
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-black transition cursor-pointer ${
                      theme === "light"
                        ? "bg-brand text-white shadow-xs"
                        : "text-zinc-600 hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    <SunIcon />
                    <span>فاتح</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("dark")}
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-black transition cursor-pointer ${
                      theme === "dark"
                        ? "bg-brand text-white shadow-xs"
                        : "text-zinc-600 hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    <MoonIcon />
                    <span>داكن</span>
                  </button>
                </div>
              </div>

              {/* Links */}
              {user ? (
                <>
                  <div className="rounded-lg bg-leaf/10 p-3 text-center text-xs font-black text-leaf">
                    مرحباً بك، {user.name} ({user.walletBalance} ج.م)
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    لوحة تحكم الطالب 📚
                  </Link>
                  <Link
                    href="/wallet"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    المحفظة وشحن الكروت 💳
                  </Link>
                  <Link
                    href="/leaderboard"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    لوحة الشرف والمتصدرين 🏆
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={close}
                      className="rounded-lg bg-brand/10 px-3 py-2.5 text-sm font-extrabold text-brand transition hover:bg-brand/20"
                    >
                      لوحة تحكم الإدارة ⚙️
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      handleLogout();
                    }}
                    className="rounded-lg border border-red-500/30 px-3 py-2 text-center text-sm font-extrabold text-brand transition hover:bg-red-500/10 cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    الرئيسية
                  </Link>
                  <Link
                    href="/#courses"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    الكورسات المتاحة
                  </Link>
                  <Link
                    href="/wallet"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    شحن كارت السنتر والمحفظة
                  </Link>
                  <Link
                    href="/leaderboard"
                    onClick={close}
                    className="rounded-lg px-3 py-2.5 text-sm font-extrabold text-ink transition hover:bg-paper dark:text-white dark:hover:bg-white/5"
                  >
                    أوائل المنصة ولوحة الشرف
                  </Link>
                  <Link
                    href="/login"
                    onClick={close}
                    className="rounded-lg border-2 border-brand px-3 py-2.5 text-center text-sm font-extrabold text-brand transition hover:bg-red-50 dark:hover:bg-white/10"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/signup"
                    onClick={close}
                    className="rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-extrabold text-white transition hover:bg-brand-deep"
                  >
                    حساب جديد
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      handleQuickDemo();
                    }}
                    className="rounded-lg bg-leaf/20 px-3 py-2.5 text-center text-sm font-extrabold text-leaf transition hover:bg-leaf hover:text-white cursor-pointer"
                  >
                    ⚡ دخول تجريبي فوري
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
