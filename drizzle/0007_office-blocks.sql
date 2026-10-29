CREATE TABLE "office_list" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"office_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "office_list_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"list_id" uuid NOT NULL,
	"title" jsonb NOT NULL,
	"text" jsonb,
	"url" text,
	"image_media_id" uuid,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "office" ADD COLUMN "faq" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "office" ADD COLUMN "schedules" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "office_list" ADD CONSTRAINT "office_list_office_id_office_id_fk" FOREIGN KEY ("office_id") REFERENCES "public"."office"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_list_item" ADD CONSTRAINT "office_list_item_list_id_office_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."office_list"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "office_list_item" ADD CONSTRAINT "office_list_item_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "office_list_office_id_position_idx" ON "office_list" USING btree ("office_id","position");--> statement-breakpoint
CREATE INDEX "office_list_item_list_id_position_idx" ON "office_list_item" USING btree ("list_id","position");