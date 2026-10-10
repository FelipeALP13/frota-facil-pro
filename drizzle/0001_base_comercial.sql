CREATE TABLE `organizations` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `document` text,
  `phone` text,
  `email` text,
  `plan` text DEFAULT 'Piloto' NOT NULL,
  `status` text DEFAULT 'Ativa' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT OR IGNORE INTO `organizations` (`id`,`name`,`plan`) VALUES ('pilot','Cliente piloto','Piloto');
--> statement-breakpoint
CREATE TABLE `organization_members` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text NOT NULL REFERENCES `organizations`(`id`),
  `user_email` text NOT NULL,
  `role` text DEFAULT 'Operador' NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organization_members_email_unique` ON `organization_members` (`organization_id`,`user_email`);
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `organization_id` text DEFAULT 'pilot' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `brand` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `model` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `year` integer;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `renavam` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `chassis` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `capacity_kg` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `trucks` ADD COLUMN `body_type` text DEFAULT 'Frigorífico' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trips` ADD COLUMN `organization_id` text DEFAULT 'pilot' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trips` ADD COLUMN `driver_id` text;
--> statement-breakpoint
ALTER TABLE `trips` ADD COLUMN `client_id` text;
--> statement-breakpoint
ALTER TABLE `trips` ADD COLUMN `origin` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `trips` ADD COLUMN `destination` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `expenses` ADD COLUMN `organization_id` text DEFAULT 'pilot' NOT NULL;
--> statement-breakpoint
ALTER TABLE `maintenance` ADD COLUMN `organization_id` text DEFAULT 'pilot' NOT NULL;
--> statement-breakpoint
CREATE TABLE `drivers` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `name` text NOT NULL,
  `cpf` text DEFAULT '' NOT NULL,
  `cnh` text DEFAULT '' NOT NULL,
  `cnh_category` text DEFAULT '' NOT NULL,
  `cnh_expiry` text,
  `phone` text DEFAULT '' NOT NULL,
  `email` text DEFAULT '' NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `drivers_org_name_idx` ON `drivers` (`organization_id`,`name`);
--> statement-breakpoint
CREATE TABLE `clients` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `name` text NOT NULL,
  `document` text DEFAULT '' NOT NULL,
  `contact_name` text DEFAULT '' NOT NULL,
  `phone` text DEFAULT '' NOT NULL,
  `email` text DEFAULT '' NOT NULL,
  `city` text DEFAULT '' NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `clients_org_name_idx` ON `clients` (`organization_id`,`name`);
--> statement-breakpoint
CREATE TABLE `fuel_records` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `truck_id` text NOT NULL REFERENCES `trucks`(`id`),
  `driver_id` text REFERENCES `drivers`(`id`),
  `fuel_date` text NOT NULL,
  `liters` real DEFAULT 0 NOT NULL,
  `price_per_liter` real DEFAULT 0 NOT NULL,
  `total` real DEFAULT 0 NOT NULL,
  `odometer` integer DEFAULT 0 NOT NULL,
  `station` text DEFAULT '' NOT NULL,
  `full_tank` integer DEFAULT 1 NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `fuel_org_truck_date_idx` ON `fuel_records` (`organization_id`,`truck_id`,`fuel_date`);
--> statement-breakpoint
CREATE TABLE `documents` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `truck_id` text REFERENCES `trucks`(`id`),
  `driver_id` text REFERENCES `drivers`(`id`),
  `document_type` text NOT NULL,
  `description` text NOT NULL,
  `number` text DEFAULT '' NOT NULL,
  `expiry_date` text,
  `amount` real DEFAULT 0 NOT NULL,
  `status` text DEFAULT 'Válido' NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `documents_org_expiry_idx` ON `documents` (`organization_id`,`expiry_date`);
--> statement-breakpoint
CREATE TABLE `financial_entries` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `truck_id` text REFERENCES `trucks`(`id`),
  `client_id` text REFERENCES `clients`(`id`),
  `entry_type` text NOT NULL,
  `category` text NOT NULL,
  `description` text NOT NULL,
  `amount` real DEFAULT 0 NOT NULL,
  `due_date` text NOT NULL,
  `paid_date` text,
  `status` text DEFAULT 'Pendente' NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `financial_org_due_idx` ON `financial_entries` (`organization_id`,`due_date`,`status`);
--> statement-breakpoint
CREATE TABLE `inspections` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `truck_id` text NOT NULL REFERENCES `trucks`(`id`),
  `driver_id` text REFERENCES `drivers`(`id`),
  `inspection_date` text NOT NULL,
  `odometer` integer DEFAULT 0 NOT NULL,
  `brakes_ok` integer DEFAULT 1 NOT NULL,
  `tires_ok` integer DEFAULT 1 NOT NULL,
  `lights_ok` integer DEFAULT 1 NOT NULL,
  `refrigeration_ok` integer DEFAULT 1 NOT NULL,
  `documents_ok` integer DEFAULT 1 NOT NULL,
  `status` text DEFAULT 'Aprovado' NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `occurrences` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `truck_id` text REFERENCES `trucks`(`id`),
  `driver_id` text REFERENCES `drivers`(`id`),
  `occurrence_date` text NOT NULL,
  `occurrence_type` text NOT NULL,
  `severity` text DEFAULT 'Baixa' NOT NULL,
  `description` text NOT NULL,
  `status` text DEFAULT 'Aberta' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notification_rules` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `name` text NOT NULL,
  `event_type` text NOT NULL,
  `days_before` integer DEFAULT 7 NOT NULL,
  `channel` text DEFAULT 'email' NOT NULL,
  `recipient` text DEFAULT '' NOT NULL,
  `template_name` text DEFAULT '' NOT NULL,
  `active` integer DEFAULT 1 NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `communication_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `channel` text NOT NULL,
  `recipient` text NOT NULL,
  `subject` text DEFAULT '' NOT NULL,
  `message` text NOT NULL,
  `status` text DEFAULT 'Rascunho' NOT NULL,
  `provider_id` text DEFAULT '' NOT NULL,
  `sent_at` text,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `communication_org_date_idx` ON `communication_logs` (`organization_id`,`created_at`);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `user_email` text DEFAULT '' NOT NULL,
  `action` text NOT NULL,
  `entity_type` text NOT NULL,
  `entity_id` text NOT NULL,
  `details` text DEFAULT '' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
