import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("kf_session")?.value;
  const userId = verifySession(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as null | { code?: string };
  const rawCode = body?.code?.trim();

  if (!rawCode) {
    return NextResponse.json({ ok: false, error: "من فضلك اكتب كود كارت الشحن" }, { status: 422 });
  }

  const result = store.redeemCode(userId, rawCode);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const user = store.findUserById(userId);
  return NextResponse.json({
    ok: true,
    addedAmount: result.amount,
    newBalance: user?.walletBalance ?? 0,
  });
}
