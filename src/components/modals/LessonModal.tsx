"use client";

import { useState, useEffect } from "react";
import type { LessonType } from "@/data/curriculum";

interface LessonModalProps {
  lesson: {
    title: string;
    type: LessonType;
    weekTitle: string;
  } | null;
  onClose: () => void;
  onOpenQuiz?: (quizTitle: string) => void;
}

export default function LessonModal({ lesson, onClose }: LessonModalProps) {
  const [speed, setSpeed] = useState("1x");
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "pdf" | "notes">("video");
  const [watermarkPos, setWatermarkPos] = useState({ top: 15, left: 20 });
  const [studentCode, setStudentCode] = useState("KF-100200");
  const [studentName, setStudentName] = useState("طالب فيزياء");
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketText, setTicketText] = useState("");

  useEffect(() => {
    // Dynamic watermark position movement for anti-recording
    const interval = setInterval(() => {
      setWatermarkPos({
        top: Math.floor(Math.random() * 70) + 10,
        left: Math.floor(Math.random() * 70) + 10,
      });
    }, 4000);

    // Get user from local session if available
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setStudentCode(data.user.accessCode);
          setStudentName(data.user.name);
        }
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  if (!lesson) return null;

  const isQuiz = lesson.type === "quiz";
  const isHomework = lesson.type === "homework";

  const quizQuestions = [
    {
      id: "q1",
      question: "ما هي صيغة أبعاد القوة (F) في النظام الدولي للوحدات؟",
      options: ["[M L T⁻¹]", "[M L T⁻²]", "[M L² T⁻²]", "[M² L T⁻¹]"],
      correct: 1,
      hint: "القوة = الكتلة × العجلة",
    },
    {
      id: "q2",
      question: "وحدة قياس العجلة في النظام الدولي (SI) هي:",
      options: ["m/s", "m·s", "m/s²", "kg·m/s"],
      correct: 2,
      hint: "العجلة = التغير في السرعة ÷ الزمن",
    },
    {
      id: "q3",
      question: "أي من الكميات الفيزيائية الآتية تعتبر كمية قياسية (غير متجهة)؟",
      options: ["المسافة المقطوعة", "الإزاحة", "السرعة المتجهة", "العجلة"],
      correct: 0,
      hint: "الكمية القياسية يلزم لتعريفها المقدار ووحدة القياس فقط بدون اتجاه.",
    },
    {
      id: "q4",
      question: "خاصية احتفاظ الجسم بحالته من السكون أو الحركة بسرعة منتظمة تسمى:",
      options: ["كمية التحرك", "القوة المحصلة", "القصور الذاتي", "طاقة الحركة"],
      correct: 2,
      hint: "هذا هو أساس قانون نيوتن الأول للحركة.",
    },
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6 animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-ink-2 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-ink px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-brand/20 px-2.5 py-1 text-xs font-bold text-brand">
              {lesson.weekTitle}
            </span>
            <h3 className="text-base font-extrabold md:text-lg">{lesson.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {isQuiz ? (
            /* Quiz View */
            <div className="space-y-6">
              <div className="rounded-xl border border-brand/30 bg-brand/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-white">اختبار إلكتروني فوري</h4>
                    <p className="text-xs text-zinc-400">
                      أجب عن الأسئلة الآتية واضغط على &quot;تسليم الإجابة&quot; لعرض الدرجة النموذجية وتصحيح الأخطاء.
                    </p>
                  </div>
                  <div className="rounded-lg bg-black/40 px-3 py-1.5 text-xs font-bold text-leaf">
                    ⏱️ الوقت المتبقي: 14:35 دقيقة
                  </div>
                </div>
              </div>

              {!quizSubmitted ? (
                <form onSubmit={handleQuizSubmit} className="space-y-5">
                  {quizQuestions.map((q, qIndex) => (
                    <div key={q.id} className="rounded-xl border border-zinc-800 bg-white/5 p-4 md:p-5">
                      <p className="mb-3 text-sm font-extrabold">
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt, optIndex) => (
                          <label
                            key={opt}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-xs font-bold transition ${
                              selectedAnswers[q.id] === optIndex
                                ? "border-brand bg-brand/15 text-white"
                                : "border-zinc-800 bg-black/20 text-zinc-300 hover:bg-white/5"
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={selectedAnswers[q.id] === optIndex}
                              onChange={() =>
                                setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                              }
                              className="accent-brand"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-leaf py-3 text-center text-sm font-black text-white shadow-lg transition hover:bg-leaf-deep"
                  >
                    تسليم الإجابات واعتماد النتيجة ✅
                  </button>
                </form>
              ) : (
                /* Quiz Results */
                <div className="space-y-6">
                  <div className="rounded-xl border border-leaf/40 bg-leaf/15 p-6 text-center">
                    <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full bg-leaf text-2xl font-black text-white">
                      {quizScore} / {quizQuestions.length}
                    </div>
                    <h4 className="text-xl font-black text-white">
                      {quizScore && quizScore >= 3
                        ? "أحسنت يا بطل! مستوى ممتاز 🏆"
                        : "مراجعة جيدة، راجع الأخطاء أدناه واستعد للمرة القادمة!"}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-300">
                      النسبة المئوية: {Math.round(((quizScore ?? 0) / quizQuestions.length) * 100)}%
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-extrabold text-zinc-200">تقرير الإجابات النموذجية:</h5>
                    {quizQuestions.map((q, idx) => {
                      const ans = selectedAnswers[q.id];
                      const isCorrect = ans === q.correct;
                      return (
                        <div
                          key={q.id}
                          className={`rounded-xl border p-4 ${
                            isCorrect ? "border-leaf/50 bg-leaf/5" : "border-red-500/50 bg-red-500/5"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>السؤال {idx + 1}: {q.question}</span>
                            <span className={isCorrect ? "text-leaf" : "text-brand"}>
                              {isCorrect ? "إجابة صحيحة ✔" : "إجابة خاطئة ✖"}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-zinc-400">
                            <span>إجابتك: {ans !== undefined ? q.options[ans] : "لم يتم الاختيار"}</span>
                            {!isCorrect && (
                              <span className="block text-leaf">
                                الإجابة الصحيحة: {q.options[q.correct]}
                              </span>
                            )}
                            <p className="mt-1.5 rounded bg-black/30 p-2 text-[11px] text-zinc-300">
                              💡 الشرح التوضيحي: {q.hint}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedAnswers({});
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-white/5 py-2.5 text-xs font-bold text-zinc-200 transition hover:bg-white/10"
                  >
                    إعادة المحاولة مرة أخرى 🔄
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Video / Lecture Player View */
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex gap-2 border-b border-zinc-800 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("video")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-extrabold transition ${
                    activeTab === "video" ? "bg-brand text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  فيديو الشرح 🎥
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("pdf")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-extrabold transition ${
                    activeTab === "pdf" ? "bg-brand text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  ملزمة وتلخيص PDF 📄
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("notes")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-extrabold transition ${
                    activeTab === "notes" ? "bg-brand text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  سؤال للمستر / دعم 💬
                </button>
              </div>

              {activeTab === "video" && (
                <div>
                  {/* Secure Player Frame */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-inner">
                    {/* Embedded Educational Video */}
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
                      title={lesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />

                    {/* Dynamic Moving Watermark for security */}
                    <div
                      style={{ top: `${watermarkPos.top}%`, left: `${watermarkPos.left}%` }}
                      className="pointer-events-none absolute z-20 select-none rounded bg-black/40 px-2 py-0.5 text-[10px] font-mono font-bold text-white/40 backdrop-blur-xs transition-all duration-1000"
                    >
                      {studentCode} | {studentName}
                    </div>

                    {/* Anti-Screen Recording Guard Banner */}
                    <div className="pointer-events-none absolute bottom-2 left-2 z-20 select-none rounded bg-black/70 px-2 py-1 text-[9px] font-semibold text-zinc-400">
                      🛡️ محتوى محمي بحقوق الطبع والنشر - منصة كمال فتحي
                    </div>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-400">سرعة التشغيل:</span>
                      {["0.75x", "1x", "1.25x", "1.5x", "2x"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSpeed(s)}
                          className={`rounded px-2 py-1 text-xs font-bold transition ${
                            speed === s
                              ? "bg-leaf text-white"
                              : "bg-black/30 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCompleted((v) => !v)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                          completed
                            ? "bg-leaf text-white"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        }`}
                      >
                        {completed ? "تم إنهاء الدرس ✔" : "تحديد كمكتمل"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pdf" && (
                <div className="rounded-xl border border-zinc-800 bg-black/20 p-6 text-center">
                  <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-brand/20 text-brand">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <h4 className="text-base font-black text-white">
                    ملزمة الشرح وتلخيص القوانين {lesson.title}
                  </h4>
                  <p className="mx-auto mt-1 max-w-md text-xs text-zinc-400">
                    ملزمة إلكترونية شاملة لكافة أفكار الدرس والمسائل المتوقعة، مطابقة لأحدث تعديلات الوزارة.
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <a
                      href="#download"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("جاري تحميل ملزمة المحاضرة بصيغة PDF...");
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-brand-deep"
                    >
                      <span>تحميل ملزمة المحاضرة (PDF)</span>
                      <span>⬇</span>
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-3 rounded-xl border border-zinc-800 bg-black/20 p-4">
                  <h4 className="text-sm font-extrabold text-white">
                    عندك سؤال في أي نقطة في الشرح أو مسألة مش واضحة؟
                  </h4>
                  <p className="text-xs text-zinc-400">
                    اكتب سؤالك وهيتم الرد عليك بواسطة أ/ كمال فتحي أو فريق المساعدين خلال أقل من ساعتين.
                  </p>
                  {ticketSent ? (
                    <p className="rounded-lg bg-leaf/20 p-3 text-xs font-bold text-leaf">
                      تم إرسال سؤالك بنجاح! سيصلك إشعار بالرد قريباً.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={ticketText}
                        onChange={(e) => setTicketText(e.target.value)}
                        placeholder="اكتب رقم المسألة والدقيقة في الفيديو أو استفسارك هنا..."
                        className="w-full rounded-lg border border-zinc-700 bg-white/5 p-3 text-xs font-medium text-white outline-none focus:border-brand"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!ticketText.trim()) return;
                          setTicketSent(true);
                          setTicketText("");
                        }}
                        className="rounded-lg bg-leaf px-4 py-2 text-xs font-extrabold text-white transition hover:bg-leaf-deep"
                      >
                        إرسال السؤال للأستاذ 🚀
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-ink px-5 py-3">
          <span className="text-[11px] font-bold text-zinc-400">
            منصة كمال فتحي للفيزياء - ثانوية عامة
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-4 py-1.5 text-xs font-bold text-zinc-200 transition hover:bg-white/20 hover:text-white"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
}
