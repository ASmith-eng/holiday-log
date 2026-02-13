import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  text,
  index,
  foreignKey,
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
  image: text(),
});

export const accounts = pgTable(
  "accounts",
  {
    id: uuid().defaultRandom().notNull(),
    account_id: text().notNull(),
    provider_id: text().notNull(),
    user_id: uuid().notNull(),
    access_token: text(),
    refresh_token: text(),
    id_token: text(),
    access_token_expires_at: timestamp({ withTimezone: true, mode: "string" }),
    refresh_token_expires_at: timestamp({ withTimezone: true, mode: "string" }),
    scope: text(),
    password: text(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updated_at: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  },
  (table) => [
    index("account_user_id_idx").using(
      "btree",
      table.user_id.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [users.id],
      name: "account_user_id_fkey",
    }).onDelete("cascade"),
  ],
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: uuid().defaultRandom().notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    ipAddress: varchar("ip_address", { length: 40 }),
    userAgent: text("user_agent"),
    userId: uuid("user_id").notNull(),
  },
  (table) => [
    index("user_sessions_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "user_sessions_user_id_fkey",
    }).onDelete("cascade"),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: uuid().defaultRandom().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("verification_identifier_idx").using(
      "btree",
      table.identifier.asc().nullsLast().op("text_ops"),
    ),
  ],
);
