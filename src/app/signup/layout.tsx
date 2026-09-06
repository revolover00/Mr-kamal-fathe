import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد",
  description: "أنشئ حسابك في منصة كمال فتحي للفيزياء وابدأ رحلة التفوق.",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
