import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 md:grid-cols-2 md:pb-20 md:pt-14">
        {/* text column (right in RTL on desktop, below photo on mobile) */}
        <div className="order-2 text-center md:order-1 md:text-start">
          <h1 className="text-3xl font-black leading-[1.6] md:text-[42px] md:leading-[1.55]">
            منصتك الأولى لتعلم
            <br />
            وفهم الفيزياء بأسلوب
            <br />
            بسيط وممتع
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm font-semibold leading-7 text-white/90 md:mx-0 md:text-base">
            أهلاً بيك في بيتك التاني!
            <br />
            سواء كنت في أولى ثانوي أو تالتة ثانوي، هنا هتلاقي كل اللي تحتاجه
            عشان تتفوق في الفيزياء وتفهمها صح وتحبها بسهولة.
          </p>
          <a
            href="#courses"
            className="mt-7 inline-block rounded-lg bg-sky px-10 py-3 text-sm font-extrabold text-brand shadow-[0_12px_25px_-10px_rgba(0,0,0,0.45)] transition hover:brightness-105"
          >
            اشترك دلوقتي !
          </a>

        </div>

        {/* hero artwork (first on mobile, left on desktop) */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto h-80 w-72 md:h-[420px] md:w-[400px]">
            <Image
              src="/images/uploads/kamal-hero.png"
              alt="الأستاذ كمال فتحي - مدرس الفيزياء"
              fill
              priority
              sizes="(max-width: 768px) 288px, 400px"
              className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
