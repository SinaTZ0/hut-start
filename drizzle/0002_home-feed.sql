CREATE TABLE "feed_article" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"source_asset_id" text,
	"title" jsonb NOT NULL,
	"summary" jsonb,
	"published_on" date,
	"image_url" text,
	"enriched_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "feed_article_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "feed_placement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"category" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feed_placement" ADD CONSTRAINT "feed_placement_article_id_feed_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."feed_article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "feed_placement_kind_category_article_id_idx" ON "feed_placement" USING btree ("kind","category","article_id");--> statement-breakpoint
CREATE INDEX "feed_placement_kind_category_position_idx" ON "feed_placement" USING btree ("kind","category","position");