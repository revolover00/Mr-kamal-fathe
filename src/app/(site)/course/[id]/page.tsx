import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { courses } from "@/db/schema";
import PurchaseCard from "@/components/PurchaseCard";
import LessonsPanel from "@/components/LessonsPanel";
import { DEFAULT_COURSES } from "@/data/defaultCourses";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let course;
  try {
    const rows = await db
      .select({ title: courses.title })
      .from(courses)
      .where(eq(courses.id, Number(id)))
      .limit(1);
    course = rows[0];
  } catch {
    // fallback
  }
  if (!course) {
    course = DEFAULT_COURSES.find((c) => c.id === Number(id));
  }
  if (!course) return { title: "الكورس غير موجود" };
  return {
    title: course.title,
    description: `تفاصيل ${course.title} مع الأستاذ كمال فتحي: الدروس والأسابيع والاشتراك.`,
  };
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let course;
  try {
    const rows = await db
      .select()
      .from(courses)
      .where(eq(courses.id, Number(id)))
      .limit(1);
    course = rows[0];
  } catch {
    // fallback
  }
  if (!course) {
    course = DEFAULT_COURSES.find((c) => c.id === Number(id));
  }
  if (!course) notFound();

  return (
    <main>
      {/* green banner */}
      <section className="px-3 pt-3">
        <div className="mx-auto max-w-[1200px] rounded-xl bg-gradient-to-l from-leaf-deep via-leaf to-leaf-deep px-6 py-10 text-white md:px-10 md:py-14">
          <Link
            href="/#courses"
            className="flex w-fit items-center gap-1.5 text-xs font-extrabold text-white/90 transition hover:text-white"
          >
            <BackIcon />
            العودة
          </Link>
          <h1 className="mt-6 max-w-3xl text-2xl font-black leading-snug md:text-4xl">
            {course.title}
          </h1>
          <p className="mt-4 text-xs font-bold text-white/85 md:text-sm">
            {course.noteLabel}
          </p>
        </div>
      </section>

      {/* content grid */}
      <section className="px-3 py-8">
        <div className="mx-auto grid max-w-[1200px] items-start gap-6 md:grid-cols-[1fr_400px]">
          <div className="order-2 space-y-6 md:order-1">
            <section className="rounded-xl border border-black/5 bg-white p-5 shadow-[0_18px_40px_-20px_rgba(23,24,28,0.3)] md:p-6 dark:border-white/10 dark:bg-ink-2">
              <h2 className="text-xl font-black text-ink md:text-2xl dark:text-white">
                عن الكورس
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-zinc-600 dark:text-zinc-300">
                كورس متكامل بشرح تفصيلي لمنهج الفيزياء بالأسلوب البسيط والممتع
                بتاع أ/كمال فتحي، بشرح مصور ورسومات توضيحية وتمارين تفاعلية بعد
                كل درس. {course.noteLabel}، والمتابعة مستمرة لحد ما تلم المنهج
                وتبقى لعبة في إيدك.
              </p>
            </section>
            <LessonsPanel />
          </div>

          <div className="order-1 md:order-2">
            <PurchaseCard course={course} />
          </div>
        </div>
      </section>
    </main>
  );
}
