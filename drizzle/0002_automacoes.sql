ALTER TABLE `communication_logs` ADD COLUMN `automation_key` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX `communication_automation_unique` ON `communication_logs` (`organization_id`,`automation_key`) WHERE `automation_key` <> '';
