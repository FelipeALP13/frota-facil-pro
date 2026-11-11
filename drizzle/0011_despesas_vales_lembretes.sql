-- Outras despesas do caminhão (pedágio, manutenção, pneus...), vales/adiantamentos das pessoas,
-- lembretes (manutenção por KM e vencimentos por data) e ajustes do sistema.
CREATE TABLE IF NOT EXISTS `cam_despesas` (
  `id` text PRIMARY KEY NOT NULL,
  `caminhao_id` text NOT NULL REFERENCES `cam_caminhoes`(`id`),
  `data` text NOT NULL,
  `categoria` text DEFAULT 'Outros' NOT NULL,
  `valor` real DEFAULT 0 NOT NULL,
  `km` integer,
  `obs` text DEFAULT '' NOT NULL,
  `criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `cam_despesas_data` ON `cam_despesas` (`caminhao_id`,`data`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `cam_vales` (
  `id` text PRIMARY KEY NOT NULL,
  `pessoa` text NOT NULL,
  `data` text NOT NULL,
  `valor` real DEFAULT 0 NOT NULL,
  `obs` text DEFAULT '' NOT NULL,
  `criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `cam_lembretes` (
  `id` text PRIMARY KEY NOT NULL,
  `caminhao_id` text,
  `nome` text NOT NULL,
  `tipo` text DEFAULT 'km' NOT NULL,
  `a_cada_km` integer,
  `ultimo_km` integer,
  `vence_em` text,
  `a_cada_meses` integer,
  `obs` text DEFAULT '' NOT NULL,
  `criado_em` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `config` (
  `chave` text PRIMARY KEY NOT NULL,
  `valor` text NOT NULL
);
