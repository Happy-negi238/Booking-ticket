CREATE TABLE "seats" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"isbooked" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "updated_at" timestamp;