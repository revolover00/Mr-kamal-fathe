import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("kf_session")?.value;
  const userId = verifySession(token);

  if (!userId) {
    return NextResponse.json({ ok: false, error: "يجب تسجيل الدخول للاشتراك في الكورس" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as null | {
    courseId?: number;
    paymentMethod?: "free" | "wallet" | "code";
    cardCode?: string;
  };

  const courseId = Number(body?.courseId);
  if (!courseId) {
    return NextResponse.json({ ok: false, error: "كود الكورس غير صالح" }, { status: 400 });
  }

  const user = store.findUserById(userId);
  if (!user) {
    return NextResponse.json({ ok: false, error: "المستخدم غير موجود" }, { status: 404 });
  }

  const courses = store.getCourses();
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return NextResponse.json({ ok: false, error: "الكورس غير موجود" }, { status: 404 });
  }

  // If already enrolled
  if (user.enrolledCourseIds.includes(courseId)) {
    return NextResponse.json({ ok: true, message: "أنت مشترك بالفعل في هذا الكورس" });
  }

  if (course.free || body?.paymentMethod === "free") {
    store.enrollCourse(userId, courseId);
    return NextResponse.json({ ok: true, message: "تم تفعيل الكورس المجاني بنجاح!" });
  }

  if (body?.paymentMethod === "code" && body.cardCode) {
    const redeemRes = store.redeemCode(userId, body.cardCode);
    if (!redeemRes.ok) {
      return NextResponse.json({ ok: false, error: redeemRes.error }, { status: 400 });
    }
    // Now check if user has enough balance
    const coursePrice = course.price ?? 0;
    if (user.walletBalance < coursePrice) {
      return NextResponse.json({
        ok: false,
        error: `تم شحن ${redeemRes.amount} ج.م ولكن رصيدك (${user.walletBalance} ج.م) لا يكفي سعر الكورس (${coursePrice} ج.م)`,
      });
    }
    user.walletBalance -= coursePrice;
    store.enrollCourse(userId, courseId);
    return NextResponse.json({ ok: true, message: "تم شحن الكارت وتفعيل الاشتراك في الكورس بنجاح!" });
  }

  // Pay with wallet
  const coursePrice = course.price ?? 0;
  if (user.walletBalance < coursePrice) {
    return NextResponse.json({
      ok: false,
      error: `رصيد المحفظة الحالي (${user.walletBalance} ج.م) غير كافٍ. سعر الكورس (${coursePrice} ج.م). يمكنك شحن كارت سنتر أولاً.`,
      needsTopup: true,
    });
  }

  user.walletBalance -= coursePrice;
  store.enrollCourse(userId, courseId);
  return NextResponse.json({
    ok: true,
    message: "تم خصم قيمة الكورس وتفعيل الاشتراك بنجاح!",
    remainingBalance: user.walletBalance,
  });
}
