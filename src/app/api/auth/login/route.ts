import { NextRequest, NextResponse } from "next/server";
import { signSession, verifyPassword } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as null | {
    method?: string;
    phone?: string;
    password?: string;
    code?: string;
    demoRole?: "student" | "admin";
  };

  if (!body) {
    return NextResponse.json({ ok: false, error: "بيانات غير صالحة" }, { status: 400 });
  }

  // Support 1-click Demo Login for testing
  if (body.demoRole === "admin") {
    const admin = store.findUserById(2);
    if (admin) {
      const res = NextResponse.json({ ok: true, name: admin.name, role: admin.role });
      res.cookies.set("kf_session", signSession(admin.id), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
  } else if (body.demoRole === "student") {
    const student = store.findUserById(1);
    if (student) {
      const res = NextResponse.json({ ok: true, name: student.name, role: student.role });
      res.cookies.set("kf_session", signSession(student.id), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
  }

  const method = body.method === "code" ? "code" : "phone";

  let user;
  if (method === "code") {
    const code = (body.code ?? "").trim().toUpperCase();
    if (!code) {
      return NextResponse.json({ ok: false, error: "اكتب الكود الخاص بك" }, { status: 422 });
    }

    user = store.findUserByCode(code);
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "الكود ده مش مسجل عندنا، تأكد منه وحاول تاني (أو استخدم الدخول السريع)" },
        { status: 404 }
      );
    }
  } else {
    const phone = (body.phone ?? "").trim();
    const password = body.password ?? "";
    if (!phone || !password) {
      return NextResponse.json({ ok: false, error: "اكتب رقم الهاتف وكلمة السر" }, { status: 422 });
    }

    user = store.findUserByPhone(phone);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { ok: false, error: "رقم الهاتف أو كلمة السر غير صحيحة، حاول مجدداً" },
        { status: 401 }
      );
    }
  }

  const res = NextResponse.json({ ok: true, name: user.name, role: user.role });
  res.cookies.set("kf_session", signSession(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
