import type { Metadata } from "next";
import { db } from "@/db";
import { courses } from "@/db/schema";
import type { CourseRow } from "@/db/schema";

export const metadata: Metadata = {
  title: "الرئيسية",
};
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import CoursesSection from "@/components/CoursesSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import { DEFAULT_COURSES } from "@/data/defaultCourses";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let courseRows: CourseRow[] = [];
  try {
    courseRows = await db.select().from(courses).orderBy(courses.orderIndex);
  } catch {
    courseRows = [];
  }

  if (courseRows.length === 0) {
    courseRows = DEFAULT_COURSES;
  }

  return (
    <main>
      <Hero />
      <WhySection />
      <CoursesSection courses={courseRows} />
      <FeaturesSection />
      <AboutSection />
    </main>
  );
}
