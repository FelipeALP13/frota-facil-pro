-- Quem trabalhou no dia. Vazio = o motorista/ajudante padrão do caminhão.
ALTER TABLE `cam_lancamentos` ADD COLUMN `nome_motorista` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `cam_lancamentos` ADD COLUMN `nome_ajudante` text DEFAULT '' NOT NULL;
