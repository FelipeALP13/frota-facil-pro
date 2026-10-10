ALTER TABLE `organizations` ADD COLUMN `legal_name` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `state_registration` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `whatsapp` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `zip_code` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `street` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `address_number` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `complement` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `district` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `city` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `state` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `primary_color` text DEFAULT '#0c2f47' NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `email_batch_size` integer DEFAULT 20 NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `email_interval_seconds` integer DEFAULT 30 NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `whatsapp_batch_size` integer DEFAULT 20 NOT NULL;
--> statement-breakpoint
ALTER TABLE `organizations` ADD COLUMN `whatsapp_interval_seconds` integer DEFAULT 30 NOT NULL;
--> statement-breakpoint
CREATE TABLE `financial_categories` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `code` text DEFAULT '' NOT NULL,
  `name` text NOT NULL,
  `entry_type` text DEFAULT 'Ambos' NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `financial_categories_org_code_unique` ON `financial_categories` (`organization_id`,`code`);
--> statement-breakpoint
CREATE TABLE `cost_centers` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `code` text DEFAULT '' NOT NULL,
  `name` text NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cost_centers_org_code_unique` ON `cost_centers` (`organization_id`,`code`);
--> statement-breakpoint
CREATE TABLE `payment_methods` (
  `id` text PRIMARY KEY NOT NULL,
  `organization_id` text DEFAULT 'pilot' NOT NULL,
  `name` text NOT NULL,
  `kind` text DEFAULT 'Transferência' NOT NULL,
  `status` text DEFAULT 'Ativo' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `payment_methods_org_name_idx` ON `payment_methods` (`organization_id`,`name`);
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `reference` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `cost_center_id` text;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `payment_method_id` text;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `original_due_date` text;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `original_amount` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `fees` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `interest` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `fine` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `discount` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `financial_entries` ADD COLUMN `net_amount` real DEFAULT 0 NOT NULL;
--> statement-breakpoint
INSERT OR IGNORE INTO `financial_categories` (`id`,`organization_id`,`code`,`name`,`entry_type`) VALUES
  ('cat-frete','pilot','1.01','Fretes','Receita'),
  ('cat-combustivel','pilot','2.01','Combustível','Despesa'),
  ('cat-manutencao','pilot','2.02','Manutenção','Despesa'),
  ('cat-impostos','pilot','2.03','Impostos e documentação','Despesa');
--> statement-breakpoint
INSERT OR IGNORE INTO `cost_centers` (`id`,`organization_id`,`code`,`name`) VALUES
  ('cc-operacao','pilot','001','Operação da frota'),
  ('cc-administrativo','pilot','002','Administrativo');
--> statement-breakpoint
INSERT OR IGNORE INTO `payment_methods` (`id`,`organization_id`,`name`,`kind`) VALUES
  ('pay-pix','pilot','PIX','Transferência'),
  ('pay-boleto','pilot','Boleto','Boleto'),
  ('pay-dinheiro','pilot','Dinheiro','Dinheiro');
