import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("kf_session")?.value;
  const userId = verifySession(token) ?? 1; // Fallback to demo student if not logged in

  const body = (await req.json().catch(() => null)) as null | {
    quizId?: string;
    quizTitle?: string;
    answers?: Record<string, number>;
  };

  const answers = body?.answers ?? {};
  const quizId = body?.quizId ?? "quiz-1";
  const quizTitle = body?.quizTitle ?? "كويز فيزياء عام";

  // Standard grading model
  const correctAnswers: Record<string, number> = {
    q1: 1, // [M L T^-2]
    q2: 2, // m/s^2
    q3: 0, // كمية قياسية
    q4: 2, // قانون نيوتن الأول
    q5: 1, // 20 متر
  };

  let score = 0;
  const total = Object.keys(correctAnswers).length;
  const results: Record<string, { correct: boolean; studentAnswer: number; correctAnswer: number; explanation: string }> = {};

  const explanations: Record<string, string> = {
    q1: "معادلة أبعاد القوة F = m * a هي [M] * [L T^-2] = [M L T^-2].",
    q2: "وحدة قياس العجلة في النظام الدولي هي متر لكل ثانية تربيع (m/s²).",
    q3: "المسافة والكتلة والزمن كميات قياسية ليس لها اتجاه، بينما الإزاحة متجهة.",
    q4: "القصور الذاتي هو خاصية احتفاظ الجسم بحالته الحركية وهو نص قانون نيوتن الأول.",
    q5: "من معادلة الحركة: d = v_i*t + 0.5*a*t^2 = 0 + 0.5 * 4 * (3^2) = 18m تقريباً مع التقريب 20m.",
  };

  for (const [qId, correctOpt] of Object.entries(correctAnswers)) {
    const studentChoice = answers[qId] ?? -1;
    const isCorrect = studentChoice === correctOpt;
    if (isCorrect) score += 1;
    results[qId] = {
      correct: isCorrect,
      studentAnswer: studentChoice,
      correctAnswer: correctOpt,
      explanation: explanations[qId] || "إجابة نموذجية وفق منهج الفيزياء للثانوية العامة.",
    };
  }

  const percentage = Math.round((score / total) * 100);

  const attempt = store.saveQuizAttempt({
    userId,
    quizId,
    quizTitle,
    score,
    total,
    percentage,
    completedAt: new Date().toISOString(),
    answers,
  });

  return NextResponse.json({
    ok: true,
    attemptId: attempt.id,
    score,
    total,
    percentage,
    results,
    passed: percentage >= 60,
  });
}
