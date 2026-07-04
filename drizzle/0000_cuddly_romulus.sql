CREATE TABLE "hc_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"icon" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hc_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "hc_error_tags" (
	"error_id" text NOT NULL,
	"tag_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hc_errors" (
	"id" text PRIMARY KEY NOT NULL,
	"category_id" text NOT NULL,
	"error_code" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"source_urls" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hc_errors_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "hc_tags" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "hc_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "hc_error_tags" ADD CONSTRAINT "hc_error_tags_error_id_hc_errors_id_fk" FOREIGN KEY ("error_id") REFERENCES "public"."hc_errors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_error_tags" ADD CONSTRAINT "hc_error_tags_tag_id_hc_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."hc_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hc_errors" ADD CONSTRAINT "hc_errors_category_id_hc_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."hc_categories"("id") ON DELETE no action ON UPDATE no action;