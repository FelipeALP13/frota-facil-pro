ALTER TABLE financial_entries ADD COLUMN source_type TEXT NOT NULL DEFAULT 'manual';
--> statement-breakpoint
ALTER TABLE financial_entries ADD COLUMN source_id TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE financial_entries ADD COLUMN source_line TEXT NOT NULL DEFAULT '';
--> statement-breakpoint
CREATE UNIQUE INDEX financial_source_unique ON financial_entries (organization_id, source_type, source_id, source_line) WHERE source_id <> '';
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN secondary_color TEXT NOT NULL DEFAULT '#ef7b2d';
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN sidebar_color TEXT NOT NULL DEFAULT '#0c2f47';
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN surface_color TEXT NOT NULL DEFAULT '#ffffff';
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN theme_mode TEXT NOT NULL DEFAULT 'Claro';
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN border_radius INTEGER NOT NULL DEFAULT 15;
--> statement-breakpoint
ALTER TABLE organizations ADD COLUMN compact_mode INTEGER NOT NULL DEFAULT 0;
