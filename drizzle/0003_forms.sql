CREATE TABLE "consultation_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracking_code" text NOT NULL,
	"gender" text NOT NULL,
	"age" integer NOT NULL,
	"marital_status" text NOT NULL,
	"email" text,
	"mobile" text,
	"faculty" text NOT NULL,
	"field_of_study" text NOT NULL,
	"question" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "consultation_request_tracking_code_unique" UNIQUE("tracking_code")
);
--> statement-breakpoint
CREATE TABLE "feedback_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracking_code" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"mobile" text,
	"email" text,
	"student_id" text,
	"unit" text NOT NULL,
	"kind" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "feedback_message_tracking_code_unique" UNIQUE("tracking_code")
);
--> statement-breakpoint
CREATE INDEX "feedback_message_unit_created_at_idx" ON "feedback_message" USING btree ("unit","created_at");