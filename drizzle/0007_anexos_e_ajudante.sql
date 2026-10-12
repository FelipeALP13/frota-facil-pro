ALTER TABLE trips ADD COLUMN helper_id TEXT;
--> statement-breakpoint
ALTER TABLE trips ADD COLUMN attachment_name TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE trips ADD COLUMN attachment_data TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE fuel_records ADD COLUMN attachment_name TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE fuel_records ADD COLUMN attachment_data TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE inspections ADD COLUMN attachment_name TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE inspections ADD COLUMN attachment_data TEXT NOT NULL DEFAULT '';
