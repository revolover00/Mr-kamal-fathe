import { hashPassword, verifyPassword, makeAccessCode } from "@/lib/auth";
import { DEFAULT_COURSES } from "@/data/defaultCourses";
import type { CourseRow } from "@/db/schema";

export interface StoredUser {
  id: number;
  name: string;
  phone: string;
  passwordHash: string;
  accessCode: string;
  stage: string;
  role: "student" | "admin";
  walletBalance: number;
  enrolledCourseIds: number[];
  createdAt: string;
}

export interface RechargeCode {
  code: string;
  amount: number;
  used: boolean;
  usedBy?: string;
  usedAt?: string;
  batch: string;
}

export interface QuizAttempt {
  id: string;
  userId: number;
  quizId: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: Record<string, number>;
}

// Global in-memory storage that survives hot module reloads in Node
const globalForStore = globalThis as unknown as {
  __kfStoreUsers?: Map<number, StoredUser>;
  __kfStoreCodes?: Map<string, RechargeCode>;
  __kfStoreQuizzes?: QuizAttempt[];
  __kfStoreCourses?: CourseRow[];
};

function initStore() {
  if (!globalForStore.__kfStoreUsers) {
    const usersMap = new Map<number, StoredUser>();
    // Preseed Demo Student
    usersMap.set(1, {
      id: 1,
      name: "أحمد محمود (طالب تجريبي)",
      phone: "01000000001",
      passwordHash: hashPassword("123456"),
      accessCode: "KF-100200",
      stage: "الصف الأول الثانوي",
      role: "student",
      walletBalance: 350,
      enrolledCourseIds: [1, 2],
      createdAt: new Date().toISOString(),
    });

    // Preseed Demo Admin / Assistant
    usersMap.set(2, {
      id: 2,
      name: "أ/ كمال فتحي (إدارة المنصة)",
      phone: "01000000000",
      passwordHash: hashPassword("admin123"),
      accessCode: "KF-ADMIN",
      stage: "مسؤول المنصة",
      role: "admin",
      walletBalance: 5000,
      enrolledCourseIds: [1, 2, 3, 4, 5],
      createdAt: new Date().toISOString(),
    });

    globalForStore.__kfStoreUsers = usersMap;
  }

  if (!globalForStore.__kfStoreCodes) {
    const codesMap = new Map<string, RechargeCode>();
    const seeds = [
      { code: "KF-FREE-2026", amount: 150, batch: "دعاية بداية العام" },
      { code: "KF-CARD-100", amount: 100, batch: "سنتر الأهرام" },
      { code: "KF-CARD-150", amount: 150, batch: "مكتبة المتفوقين" },
      { code: "KF-CARD-200", amount: 200, batch: "سنتر النور" },
      { code: "KF-VIP-500", amount: 500, batch: "بطاقات اشتراك فصلي" },
      { code: "PHYSICS-2026", amount: 180, batch: "عرض أوائل المحافظة" },
    ];
    for (const c of seeds) {
      codesMap.set(c.code.toUpperCase(), { ...c, used: false });
    }
    globalForStore.__kfStoreCodes = codesMap;
  }

  if (!globalForStore.__kfStoreQuizzes) {
    globalForStore.__kfStoreQuizzes = [
      {
        id: "att-1",
        userId: 1,
        quizId: "quiz-1",
        quizTitle: "كويز المحاضرة الأولى: صيغ الأبعاد ووحدات القياس",
        score: 9,
        total: 10,
        percentage: 90,
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        answers: {},
      },
    ];
  }

  if (!globalForStore.__kfStoreCourses) {
    globalForStore.__kfStoreCourses = [...DEFAULT_COURSES];
  }
}

initStore();

export const store = {
  getUsers(): StoredUser[] {
    initStore();
    return Array.from(globalForStore.__kfStoreUsers!.values());
  },

  findUserById(id: number): StoredUser | undefined {
    initStore();
    return globalForStore.__kfStoreUsers!.get(id);
  },

  findUserByPhone(phone: string): StoredUser | undefined {
    initStore();
    const clean = phone.trim();
    for (const u of globalForStore.__kfStoreUsers!.values()) {
      if (u.phone === clean) return u;
    }
    return undefined;
  },

  findUserByCode(code: string): StoredUser | undefined {
    initStore();
    const clean = code.trim().toUpperCase();
    for (const u of globalForStore.__kfStoreUsers!.values()) {
      if (u.accessCode.toUpperCase() === clean) return u;
    }
    return undefined;
  },

  createUser(data: { name: string; phone: string; password: string; stage: string }): StoredUser {
    initStore();
    const id = (globalForStore.__kfStoreUsers!.size || 0) + 1;
    const accessCode = makeAccessCode();
    const user: StoredUser = {
      id,
      name: data.name.trim(),
      phone: data.phone.trim(),
      passwordHash: hashPassword(data.password),
      accessCode,
      stage: data.stage.trim(),
      role: "student",
      walletBalance: 100, // Welcome bonus of 100 EGP!
      enrolledCourseIds: [1], // Free course pre-enrolled!
      createdAt: new Date().toISOString(),
    };
    globalForStore.__kfStoreUsers!.set(id, user);
    return user;
  },

  updateUser(id: number, updates: Partial<StoredUser>): StoredUser | undefined {
    initStore();
    const u = globalForStore.__kfStoreUsers!.get(id);
    if (!u) return undefined;
    const updated = { ...u, ...updates };
    globalForStore.__kfStoreUsers!.set(id, updated);
    return updated;
  },

  enrollCourse(userId: number, courseId: number): boolean {
    initStore();
    const u = globalForStore.__kfStoreUsers!.get(userId);
    if (!u) return false;
    if (!u.enrolledCourseIds.includes(courseId)) {
      u.enrolledCourseIds.push(courseId);
    }
    return true;
  },

  redeemCode(userId: number, rawCode: string): { ok: boolean; amount?: number; error?: string } {
    initStore();
    const codeKey = rawCode.trim().toUpperCase();
    const codeObj = globalForStore.__kfStoreCodes!.get(codeKey);
    if (!codeObj) {
      return { ok: false, error: "كود الكارت غير صالح أو تم إدخاله بطريقة خاطئة" };
    }
    if (codeObj.used) {
      return { ok: false, error: "تم استخدام هذا الكود من قبل مسبقاً!" };
    }
    const u = globalForStore.__kfStoreUsers!.get(userId);
    if (!u) {
      return { ok: false, error: "المستخدم غير مسجل" };
    }

    codeObj.used = true;
    codeObj.usedBy = u.name;
    codeObj.usedAt = new Date().toISOString();
    u.walletBalance += codeObj.amount;

    return { ok: true, amount: codeObj.amount };
  },

  getCourses(): CourseRow[] {
    initStore();
    return globalForStore.__kfStoreCourses!;
  },

  saveQuizAttempt(attempt: Omit<QuizAttempt, "id">): QuizAttempt {
    initStore();
    const id = `att-${Date.now()}`;
    const fullAttempt: QuizAttempt = { ...attempt, id };
    globalForStore.__kfStoreQuizzes!.push(fullAttempt);
    return fullAttempt;
  },

  getQuizAttempts(userId?: number): QuizAttempt[] {
    initStore();
    if (userId) {
      return globalForStore.__kfStoreQuizzes!.filter((q) => q.userId === userId);
    }
    return globalForStore.__kfStoreQuizzes!;
  },

  getCodes(): RechargeCode[] {
    initStore();
    return Array.from(globalForStore.__kfStoreCodes!.values());
  },

  generateBatchCodes(count: number, amount: number, batch: string): RechargeCode[] {
    initStore();
    const created: RechargeCode[] = [];
    for (let i = 0; i < count; i++) {
      const rand = Math.floor(100000 + Math.random() * 900000);
      const code = `KF-${rand}`;
      const item: RechargeCode = {
        code,
        amount,
        used: false,
        batch,
      };
      globalForStore.__kfStoreCodes!.set(code, item);
      created.push(item);
    }
    return created;
  },
};
