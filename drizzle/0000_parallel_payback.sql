CREATE TABLE "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30),
	"email" varchar(322) NOT NULL,
	"password" varchar(66),
	"salt" text,
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
