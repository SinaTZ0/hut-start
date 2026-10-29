CREATE TABLE "department_lab_file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"url" text NOT NULL,
	"format" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "directory_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unit_id" uuid NOT NULL,
	"name" jsonb NOT NULL,
	"role" text,
	"extensions" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "directory_unit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"group" text NOT NULL,
	"name" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "directory_unit_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "library_document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"url" text NOT NULL,
	"format" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "library_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "library_section" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"office_id" uuid,
	"title" jsonb NOT NULL,
	"icon" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "library_section_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "office" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"section" text NOT NULL,
	"name" jsonb NOT NULL,
	"lede" jsonb NOT NULL,
	"intro" jsonb,
	"duties" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"place" jsonb,
	"hours" jsonb,
	"phone" text,
	"fax" text,
	"email" text,
	"feed_category" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "office_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "office_link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"office_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"description" jsonb,
	"url" text NOT NULL,
	"icon" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "office_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"office_id" uuid NOT NULL,
	"role" text NOT NULL,
	"honorific" text,
	"name" jsonb NOT NULL,
	"job_title" jsonb,
	"rank" text,
	"degree" jsonb,
	"term" text,
	"phone" text,
	"email" text,
	"resume_url" text,
	"photo_media_id" uuid,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "department" ADD COLUMN "labs_intro" jsonb;--> statement-breakpoint
ALTER TABLE "department_lab" ADD COLUMN "description" jsonb;--> statement-breakpoint
ALTER TABLE "department_lab" ADD COLUMN "equipment" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "department_member" ADD COLUMN "lab_role" text;--> statement-breakpoint
ALTER TABLE "department_member" ADD COLUMN "lab_note" jsonb;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "topics" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "department_lab_file" ADD CONSTRAINT "department_lab_file_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "directory_entry" ADD CONSTRAINT "directory_entry_unit_id_directory_unit_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."directory_unit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "library_document" ADD CONSTRAINT "library_document_group_id_library_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."library_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "library_group" ADD CONSTRAINT "library_group_section_id_library_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."library_section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "library_section" ADD CONSTRAINT "library_section_office_id_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_link" ADD CONSTRAINT "office_link_office_id_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_member" ADD CONSTRAINT "office_member_office_id_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_member" ADD CONSTRAINT "office_member_photo_media_id_media_id_fk" FOREIGN KEY ("photo_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "department_lab_file_department_id_position_idx" ON "department_lab_file" USING btree ("department_id","position");--> statement-breakpoint
CREATE INDEX "directory_entry_unit_id_position_idx" ON "directory_entry" USING btree ("unit_id","position");--> statement-breakpoint
CREATE INDEX "directory_unit_position_idx" ON "directory_unit" USING btree ("position");--> statement-breakpoint
CREATE INDEX "library_document_group_id_position_idx" ON "library_document" USING btree ("group_id","position");--> statement-breakpoint
CREATE INDEX "library_group_section_id_position_idx" ON "library_group" USING btree ("section_id","position");--> statement-breakpoint
CREATE INDEX "library_section_office_id_position_idx" ON "library_section" USING btree ("office_id","position");--> statement-breakpoint
CREATE INDEX "office_link_office_id_position_idx" ON "office_link" USING btree ("office_id","position");--> statement-breakpoint
CREATE INDEX "office_member_office_id_position_idx" ON "office_member" USING btree ("office_id","position");--> statement-breakpoint
ALTER TABLE "department" DROP COLUMN "labs_url";