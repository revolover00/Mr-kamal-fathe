import Image from "next/image";

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h13v12H4z" />
      <path d="M17 10l4-2v8l-4-2" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3" />
      <path d="M8.5 3h7M7 15h10" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
      <path d="M9.5 9l1.8 1.8L15 7.2" />
      <path d="M8.2 13.5L7 22l5-3 5 3-1.2-8.5" />
    </svg>
  );
}

const ITEMS = [
  { icon: <VideoIcon />, t: "شروحات فيديو", s: "تفصيلية" },
  { icon: <FlaskIcon />, t: "تجارب فيزيائية", s: "تفاعلية" },
  { icon: <BadgeIcon />, t: "اختبارات", s: "وواجبات دورية" },
];

export default function AboutSection() {
  return (
    <section className="bg-paper px-4 py-16 dark:bg-[#141519]">
      <div className="mx-auto grid max-w-6xl items-end gap-10 md:grid-cols-2">
        {/* red quote box (left in RTL appears second visually? keep DOM: heading first = right) */}
        <div className="order-2 md:order-1">
          <div className="flex min-h-[260px] items-start rounded-2xl bg-brand p-6 md:min-h-[480px] md:p-8">
            <p className="text-lg font-extrabold leading-9 text-white md:text-xl">
              قرّب شوية وشد حيلك معانا..
              <br />
              هنمشيها سوا خطوة بخطوة لحد ما تلم
              <br />
              منهج الفيزياء وتبقى لعبة في إيدك.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-center text-3xl font-black text-ink md:text-4xl dark:text-white">
            عن أ/كمال فتحي
          </h2>
          <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-8">
            {ITEMS.map((it) => (
              <div key={it.t} className="flex flex-col items-center gap-2">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-paper-2 text-ink dark:bg-white/10 dark:text-white">
                  {it.icon}
                </span>
                <p className="text-center text-[11px] font-extrabold leading-5 text-zinc-600 dark:text-zinc-300">
                  {it.t}
                  <br />
                  {it.s}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-t-full shadow-[0_30px_60px_-25px_rgba(23,24,28,0.5)] ring-4 ring-white/60 sm:w-60 md:w-72 dark:ring-white/20">
              <Image
                src="/images/uploads/kamal-grey-suit.jpg"
                alt="الأستاذ كمال فتحي"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
