import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  accessCode: text("access_code").notNull().unique(),
  stage: text("stage").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  badge: text("badge"),
  free: boolean("free").notNull().default(false),
  price: integer("price"),
  startLabel: text("start_label"),
  noteLabel: text("note_label"),
  detailLabel: text("detail_label"),
  image: text("image").notNull(),
  tint: text("tint"),
  orderIndex: integer("order_index").notNull().default(0),
});

export type UserRow = typeof users.$inferSelect;
export type CourseRow = typeof courses.$inferSelect;
