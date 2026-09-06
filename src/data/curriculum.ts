export type LessonType = "lecture" | "video" | "quiz" | "homework" | "solution";

export interface Lesson {
  title: string;
  type: LessonType;
}

export interface Week {
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

export const WEEKS: Week[] = [
  {
    title: "الأسبوع الأول",
    subtitle: "مقدمة عن الكميات الفيزيائية ووحدات القياس",
    lessons: [
      { title: "المحاضرة الأولى", type: "lecture" },
      { title: "المحاضرة الأولى - الباب الأول", type: "video" },
      { title: "مراجعة المحاضرة الأولى", type: "lecture" },
      { title: "كويز المحاضرة الأولى", type: "quiz" },
      { title: "واجب المحاضرة الأولى", type: "homework" },
      { title: "حل واجب المحاضرة الأولى - الباب الأول", type: "video" },
      { title: "حل واجب المحاضرة الأولى", type: "lecture" },
    ],
  },
  {
    title: "الأسبوع الثاني",
    subtitle: "التحليل البعدي وتحويلات الوحدات",
    lessons: [
      { title: "المحاضرة الثانية", type: "lecture" },
      { title: "المحاضرة الثانية - الباب الأول", type: "video" },
      { title: "كويز المحاضرة الثانية", type: "quiz" },
      { title: "واجب المحاضرة الثانية", type: "homework" },
      { title: "حل واجب المحاضرة الثانية", type: "video" },
    ],
  },
  {
    title: "الأسبوع الثالث",
    subtitle: "الحركة في خط مستقيم وتطبيقاتها",
    lessons: [
      { title: "المحاضرة الثالثة", type: "lecture" },
      { title: "المحاضرة الثالثة - الباب الثاني", type: "video" },
      { title: "مراجعة المحاضرة الثالثة", type: "lecture" },
      { title: "كويز المحاضرة الثالثة", type: "quiz" },
      { title: "واجب المحاضرة الثالثة", type: "homework" },
      { title: "حل واجب المحاضرة الثالثة", type: "video" },
    ],
  },
  {
    title: "الأسبوع الرابع",
    subtitle: "قوانين نيوتن وتطبيقات القوة",
    lessons: [
      { title: "المحاضرة الرابعة", type: "lecture" },
      { title: "المحاضرة الرابعة - الباب الثاني", type: "video" },
      { title: "كويز المحاضرة الرابعة", type: "quiz" },
      { title: "واجب المحاضرة الرابعة", type: "homework" },
      { title: "حل واجب المحاضرة الرابعة", type: "video" },
      { title: "اختبار شامل على الأسابيع الأربعة", type: "quiz" },
    ],
  },
];
