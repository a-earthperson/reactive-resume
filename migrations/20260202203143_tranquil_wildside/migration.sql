CREATE TABLE "draft" (
	"id" uuid PRIMARY KEY,
	"data" jsonb NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "draft_user_id_index" ON "draft" ("user_id");--> statement-breakpoint
CREATE INDEX "draft_user_id_updated_at_index" ON "draft" ("user_id","updated_at" DESC NULLS LAST);--> statement-breakpoint
ALTER TABLE "draft" ADD CONSTRAINT "draft_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;