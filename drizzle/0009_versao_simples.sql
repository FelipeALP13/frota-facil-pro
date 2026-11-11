-- Versão simples: caminhões com lançamentos por quinzena e planilha financeira mensal.
-- As tabelas antigas continuam no banco, sem alteração.
CREATE TABLE IF NOT EXISTS `cam_caminhoes` (
  `id` text PRIMARY KEY NOT NULL,
  `placa` text NOT NULL,
  `nome_motorista` text DEFAULT 'Motorista' NOT NULL,
  `nome_ajudante` text DEFAULT 'Ajudante' NOT NULL,
  `valor_motorista` real DEFAULT 170 NOT NULL,
  `valor_ajudante` real DEFAULT 100 NOT NULL,
  `km_franquia` integer DEFAULT 130 NOT NULL,
  `ordem` integer DEFAULT 0 NOT NULL,
  `criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `cam_lancamentos` (
  `id` text PRIMARY KEY NOT NULL,
  `caminhao_id` text NOT NULL REFERENCES `cam_caminhoes`(`id`) ON DELETE CASCADE,
  `data` text NOT NULL,
  `regiao` text DEFAULT '' NOT NULL,
  `km_inicial` integer,
  `km_final` integer,
  `pernoite` integer DEFAULT 0 NOT NULL,
  `valor_saida` real DEFAULT 0 NOT NULL,
  `diesel` real DEFAULT 0 NOT NULL,
  `frete` real DEFAULT 0 NOT NULL,
  `motorista` real DEFAULT 0 NOT NULL,
  `ajudante` real DEFAULT 0 NOT NULL,
  `obs` text DEFAULT '' NOT NULL,
  `criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `cam_lancamentos_data` ON `cam_lancamentos` (`caminhao_id`,`data`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `fin_linhas` (
  `id` text PRIMARY KEY NOT NULL,
  `ano` integer NOT NULL,
  `grupo` text NOT NULL,
  `nome` text NOT NULL,
  `ordem` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `fin_valores` (
  `linha_id` text NOT NULL REFERENCES `fin_linhas`(`id`) ON DELETE CASCADE,
  `mes` integer NOT NULL,
  `valor` real DEFAULT 0 NOT NULL,
  PRIMARY KEY (`linha_id`,`mes`)
);
--> statement-breakpoint
INSERT OR IGNORE INTO `cam_caminhoes` (`id`,`placa`,`ordem`) VALUES
  ('cam1','KPE3J85',1),
  ('cam2','LLF9969',2),
  ('cam3','NOVO',3);
