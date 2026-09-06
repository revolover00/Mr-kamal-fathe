import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("kf_session")?.value;
  const userId = verifySession(token);

  if (!userId) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  const user = store.findUserById(userId);
  if (!user) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      accessCode: user.accessCode,
      stage: user.stage,
      role: user.role,
      walletBalance: user.walletBalance,
      enrolledCourseIds: user.enrolledCourseIds,
    },
  });
}
