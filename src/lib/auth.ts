import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SECRET = process.env.AUTH_SECRET ?? "kf-physics-dev-secret";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  try {
    const candidate = scryptSync(password, salt, 32);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

export function makeAccessCode(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `KF-${n}`;
}

export function signSession(userId: number): string {
  const sig = createHmac("sha256", SECRET).update(String(userId)).digest("hex");
  return `${userId}.${sig}`;
}

export function verifySession(token: string | null | undefined): number | null {
  if (!token) return null;
  const [id, sig] = token.split(".");
  if (!id || !sig || !/^\d+$/.test(id)) return null;
  try {
    const expected = Buffer.from(
      createHmac("sha256", SECRET).update(id).digest("hex"),
      "hex"
    );
    const provided = Buffer.from(sig, "hex");
    if (provided.length !== expected.length) return null;
    return timingSafeEqual(provided, expected) ? Number(id) : null;
  } catch {
    return null;
  }
}
