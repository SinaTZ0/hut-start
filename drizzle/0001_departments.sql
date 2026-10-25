CREATE TABLE "department" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" jsonb NOT NULL,
	"lede" jsonb NOT NULL,
	"quote" jsonb,
	"intro" jsonb NOT NULL,
	"milestones" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"founded_on" date,
	"student_count" integer,
	"head_member_id" uuid,
	"labs_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "department_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "department_document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"degree" text NOT NULL,
	"title" jsonb NOT NULL,
	"url" text NOT NULL,
	"format" text NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_field" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"key" text NOT NULL,
	"name" jsonb NOT NULL,
	"summary" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_lab" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"honorific" text,
	"name" jsonb NOT NULL,
	"rank" text,
	"job_title" jsonb,
	"phone" text,
	"email" text,
	"office" jsonb,
	"homepage_url" text,
	"scholar_url" text,
	"photo_media_id" uuid,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_track" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"field_id" uuid NOT NULL,
	"degree" text NOT NULL,
	"name" jsonb NOT NULL,
	"note" jsonb,
	"plan_url" text,
	"chart_url" text,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "department" ADD CONSTRAINT "department_head_member_id_department_member_id_fk" FOREIGN KEY ("head_member_id") REFERENCES "public"."department_member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_document" ADD CONSTRAINT "department_document_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_field" ADD CONSTRAINT "department_field_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_lab" ADD CONSTRAINT "department_lab_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_member" ADD CONSTRAINT "department_member_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_member" ADD CONSTRAINT "department_member_photo_media_id_media_id_fk" FOREIGN KEY ("photo_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_track" ADD CONSTRAINT "department_track_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_track" ADD CONSTRAINT "department_track_field_id_department_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."department_field"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "department_document_department_id_position_idx" ON "department_document" USING btree ("department_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "department_field_department_id_key_idx" ON "department_field" USING btree ("department_id","key");--> statement-breakpoint
CREATE INDEX "department_field_department_id_position_idx" ON "department_field" USING btree ("department_id","position");--> statement-breakpoint
CREATE INDEX "department_lab_department_id_position_idx" ON "department_lab" USING btree ("department_id","position");--> statement-breakpoint
CREATE INDEX "department_member_department_id_position_idx" ON "department_member" USING btree ("department_id","position");--> statement-breakpoint
CREATE INDEX "department_track_department_id_position_idx" ON "department_track" USING btree ("department_id","position");