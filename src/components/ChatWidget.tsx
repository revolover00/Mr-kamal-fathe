"use client";

import { useState } from "react";

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "أهلاً بيك في منصة أ/ كمال فتحي! نقدر نساعدك في إيه النهاردة؟",
    },
  ]);

  const quickQuestions = [
    "إزاي أشحن كارت السنتر؟",
    "فيديو المحاضرة مش راضي يفتح",
    "مواعيد نزول كويزات الأسبوع",
    "عاوز أكلم مستر كمال فتحي",
  ];

  const handleSend = (textToSend?: string) => {
    const q = (textToSend ?? message).trim();
    if (!q) return;

    // Add user message
    const newMessages = [...messages, { sender: "user" as const, text: q }];
    setMessages(newMessages);
    setMessage("");

    // Bot response logic
    setTimeout(() => {
      let reply = "شكراً لرسالتك! أحد المساعدين في فريق أ/ كمال فتحي هيرد عليك فوراً.";
      if (q.includes("كارت") || q.includes("أشحن")) {
        reply = "لشحن كارت السنتر، ادخل على صفحة المحفظة أو اضغط على 'اشترك الآن' في أي كورس واكتب كود الكارت المطبوع (مثال: KF-CARD-150).";
      } else if (q.includes("فيديو") || q.includes("يفتح")) {
        reply = "تأكد من إيقاف أي برنامج لتسجيل الشاشة (Screen Recorder) وحدث الصفحة، حيث تحتوي المنصة على حماية مشددة ضد التصوير.";
      } else if (q.includes("مواعيد") || q.includes("كويزات")) {
        reply = "تنزل محاضرات وفيزياء الأسبوع كل أحد وأربعاء الساعة 6 مساءً، ويفتح الكويز فور الانتهاء من مشاهدة الشرح.";
      } else if (q.includes("مستر") || q.includes("كمال")) {
        reply = "مستر كمال بيتابع أسئلتكم بنفسه! تقدر تضغط على 'سؤال للمستر' أسفل أي فيديو في درس الشرح أو تراسلنا عبر واتساب 01000000000.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-ink-2 shadow-2xl text-white animate-fadeIn md:w-96">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-leaf"></span>
              </span>
              <div>
                <h4 className="text-xs font-black">مساعد منصة كمال فتحي الذكي</h4>
                <p className="text-[10px] text-white/80">فريق الدعم متاح للرد فوراً</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-white hover:bg-black/20"
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs font-semibold leading-5 ${
                    m.sender === "user"
                      ? "bg-brand text-white rounded-br-none"
                      : "bg-white/10 text-zinc-100 rounded-bl-none border border-white/5"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions Pills */}
          <div className="border-t border-zinc-800 bg-black/30 p-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px]">
              {quickQuestions.map((qq) => (
                <button
                  key={qq}
                  type="button"
                  onClick={() => handleSend(qq)}
                  className="whitespace-nowrap rounded-full border border-zinc-700 bg-white/5 px-2.5 py-1 font-bold text-zinc-300 hover:border-brand hover:text-white"
                >
                  {qq}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-zinc-800 bg-ink p-2.5"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 rounded-xl border border-zinc-700 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white transition hover:bg-brand-deep cursor-pointer"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="محادثة الدعم الفني"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-brand to-[#ff5233] text-white shadow-[0_12px_28px_-8px_rgba(242,41,18,0.7)] transition duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChatIcon />
      </button>
    </div>
  );
}
