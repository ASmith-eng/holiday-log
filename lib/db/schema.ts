import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid().defaultRandom().notNull(),
  username: varchar({ length: 20 }),
  email: varchar({ length: 255 }).notNull(),
  hPassword: varchar("h_password", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});
