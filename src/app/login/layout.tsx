import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "سجل دخولك بحسابك أو بالكود الخاص بيك وكمّل مذاكرة الفيزياء.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
