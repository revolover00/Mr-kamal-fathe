import { NextRequest, NextResponse } from "next/server";
import { signSession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as null | {
    name?: string;
    phone?: string;
    password?: string;
    stage?: string;
  };

  if (!body) {
    return NextResponse.json({ ok: false, error: "بيانات غير صالحة" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const password = body.password ?? "";
  const stage = (body.stage ?? "").trim();

  if (name.length < 3) {
    return NextResponse.json({ ok: false, error: "اكتب اسمك الكامل بشكل صحيح (3 حروف على الأقل)" }, { status: 422 });
  }
  if (!/^01[0-9]{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "اكتب رقم هاتف مصري صحيح مكون من 11 رقم" }, { status: 422 });
  }
  if (password.length < 6) {
    return NextResponse.json({ ok: false, error: "كلمة السر لازم تكون 6 حروف أو أرقام على الأقل" }, { status: 422 });
  }
  if (!stage) {
    return NextResponse.json({ ok: false, error: "اختار مرحلتك الدراسية" }, { status: 422 });
  }

  const existing = store.findUserByPhone(phone);
  if (existing) {
    return NextResponse.json(
      { ok: false, error: "الرقم ده مسجل عندنا قبل كده، سجل دخول مباشرة" },
      { status: 409 }
    );
  }

  const newUser = store.createUser({
    name,
    phone,
    password,
    stage,
  });

  const res = NextResponse.json({ ok: true, code: newUser.accessCode, name: newUser.name });
  // Automatically log the student in on signup
  res.cookies.set("kf_session", signSession(newUser.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
