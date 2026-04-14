import { pgTable, uuid, varchar, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable('user_table', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 30 }).notNull(),
    lastName: varchar("last_name", { length: 30 }),
    email: varchar("email", { length: 322 }).notNull().unique(),
    password: varchar("password", { length: 66 }),
    isVerify: boolean("is_verify").default(false),
    salt: text("salt"),
    refreshToken: varchar("refresh_token", { length: 66 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
});

export const seats = pgTable("seats", {
    id: integer('id').primaryKey(),
    name: varchar("name", {length: 30}),
    isBooked: integer('isbooked').default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})
