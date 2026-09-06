const REASONS = [
  { n: 1, t: "شرح بسيط ومفهوم" },
  { n: 2, t: "فيديوهات برسومات توضيحية" },
  { n: 3, t: "تمارين تفاعلية على الدروس" },
  { n: 4, t: "مراجعة كاملة في المذاكرة" },
  { n: 5, t: "اختبارات مستمرة" },
  { n: 6, t: "محتوى متكامل ومنظم" },
  { n: 7, t: "تحديث مستمر حسب المنهج" },
  { n: 8, t: "مجتمع طلابي ضخم" },
];

function Dots() {
  return (
    <svg
      viewBox="0 0 40 28"
      className="absolute end-4 top-4 h-6 w-8 text-black/45"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="20" cy="4" r="2.6" />
      <circle cx="34" cy="8" r="2.6" />
      <circle cx="10" cy="18" r="2.6" />
      <circle cx="26" cy="20" r="2.6" />
    </svg>
  );
}

export default function WhySection() {
  return (
    <section className="bg-paper px-4 py-16 dark:bg-[#141519]">
      <h2 className="mb-12 text-center text-3xl font-black text-ink md:text-4xl dark:text-white">
        ليه تشترك معانا؟
      </h2>
      <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
        {REASONS.map((r) => (
          <div
            key={r.n}
            className="relative flex min-h-[150px] flex-col justify-end rounded-md bg-brand p-5 shadow-[0_6px_0_0_var(--color-leaf)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_0_0_var(--color-leaf),0_20px_40px_-18px_rgba(242,41,18,0.5)]"
          >
            <span className="absolute start-4 top-2 text-3xl font-black text-white">
              {r.n}
            </span>
            <Dots />
            <p className="text-lg font-extrabold leading-8 text-white md:text-xl">
              {r.t}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
