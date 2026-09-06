import Image from "next/image";

function BoardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#23a455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16v10H4z" />
      <path d="M12 14v3M8 21l4-4 4 4M8 8h5M8 11h8" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#f22912" aria-hidden="true">
      <path d="M22 12s0-4-1.5-5.5C19 5 12 5 12 5s-7 0-8.5 1.5C2 8 2 12 2 12s0 4 1.5 5.5C5 19 12 19 12 19s7 0 8.5-1.5C22 16 22 12 22 12z" />
      <path d="M10 9l5 3-5 3V9z" fill="#fff" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f22912" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

const FEATURES = [
  {
    img: "/images/uploads/kamal-dynamic.jpg",
    alt: "الأستاذ كمال فتحي يشرح الفيزياء",
    icon: <BoardIcon />,
    title: "تنظيم الدروس والوحدات",
    desc: "كورسات مقسمة لوحدات صغيرة علشان تقدر تذاكر بترتيب وتفضل متابع بسهولة.",
  },
  {
    img: "/images/uploads/kamal-jacket.jpg",
    alt: "الأستاذ كمال فتحي أثناء الشرح",
    icon: <PlayIcon />,
    title: "دروس بالفيديو والصور التوضيحية",
    desc: "شروحات مصورة مفصلة مع رسومات توضيحية وأسئلة شائعة يُجاب عنها.",
  },
  {
    img: "/images/uploads/kamal-studio.jpg",
    alt: "الأستاذ كمال فتحي مع تمارين الفيزياء",
    icon: <PencilIcon />,
    title: "تطبيقات وتمارين تفاعلية",
    desc: "تمارين تفاعلية بعد كل درس علشان تثبت المعلومة وتختبر نفسك.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white px-4 py-16 dark:bg-[#191b21]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:gap-8 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title}>
            <div className="group relative h-44 overflow-hidden rounded-xl sm:h-64 md:h-[340px]">
              <Image
                src={f.img}
                alt={f.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-top transition duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative mt-2 rounded-xl bg-paper-2 p-3 pt-7 text-center md:mt-4 md:p-5 md:pt-8 dark:bg-ink-2">
              <span className="absolute start-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-lg bg-white shadow-sm md:start-4 md:top-4 md:h-9 md:w-9 dark:bg-white/10">
                {f.icon}
              </span>
              <h3 className="text-[11px] font-extrabold leading-5 text-ink md:text-base dark:text-white">
                {f.title}
              </h3>
              <p className="mt-1.5 hidden text-xs font-semibold leading-6 text-zinc-500 md:mt-2 md:block">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
