ALTER TABLE "feed_article" ADD COLUMN "kind" text;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "image_width" integer;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "image_height" integer;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "body" jsonb;--> statement-breakpoint
ALTER TABLE "feed_article" ADD COLUMN "source" text;--> statement-breakpoint
CREATE INDEX "feed_article_source_asset_id_idx" ON "feed_article" USING btree ("source_asset_id");--> statement-breakpoint
CREATE INDEX "feed_article_kind_category_published_on_idx" ON "feed_article" USING btree ("kind","category","published_on");