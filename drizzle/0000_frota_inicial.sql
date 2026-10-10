CREATE TABLE `trucks` (
  `id` text PRIMARY KEY NOT NULL,
  `plate` text NOT NULL,
  `name` text NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `current_km` integer DEFAULT 0 NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `trucks_plate_unique` ON `trucks` (`plate`);
--> statement-breakpoint
CREATE TABLE `trips` (
  `id` text PRIMARY KEY NOT NULL,
  `truck_id` text NOT NULL REFERENCES `trucks`(`id`),
  `trip_date` text NOT NULL,
  `region` text NOT NULL,
  `km_start` integer NOT NULL,
  `km_end` integer NOT NULL,
  `excess_km` integer DEFAULT 0 NOT NULL,
  `departure_value` real DEFAULT 0 NOT NULL,
  `diesel` real DEFAULT 0 NOT NULL,
  `freight` real DEFAULT 0 NOT NULL,
  `driver_cost` real DEFAULT 0 NOT NULL,
  `assistant_cost` real DEFAULT 0 NOT NULL,
  `runs` integer DEFAULT 0 NOT NULL,
  `overnight` integer DEFAULT 0 NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `trips_truck_date_idx` ON `trips` (`truck_id`,`trip_date`);
--> statement-breakpoint
CREATE TABLE `expenses` (
  `id` text PRIMARY KEY NOT NULL,
  `truck_id` text NOT NULL REFERENCES `trucks`(`id`),
  `expense_date` text NOT NULL,
  `category` text NOT NULL,
  `description` text NOT NULL,
  `amount` real DEFAULT 0 NOT NULL,
  `km` integer,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `expenses_truck_date_idx` ON `expenses` (`truck_id`,`expense_date`);
--> statement-breakpoint
CREATE TABLE `maintenance` (
  `id` text PRIMARY KEY NOT NULL,
  `truck_id` text NOT NULL REFERENCES `trucks`(`id`),
  `maintenance_date` text NOT NULL,
  `service` text NOT NULL,
  `cost` real DEFAULT 0 NOT NULL,
  `km` integer,
  `next_date` text,
  `next_km` integer,
  `status` text DEFAULT 'Concluída' NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `maintenance_truck_date_idx` ON `maintenance` (`truck_id`,`maintenance_date`);
