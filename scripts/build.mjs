import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
mkdirSync(resolve(dist, ".openai"), { recursive: true });
mkdirSync(resolve(dist, "drizzle", "meta"), { recursive: true });
cpSync(resolve(root, "worker/index.js"), resolve(dist, "server/index.js"));
cpSync(resolve(root, "worker/ui.js"), resolve(dist, "server/ui.js"));
cpSync(resolve(root, ".openai/hosting.json"), resolve(dist, ".openai/hosting.json"));
for (const name of ["0000_frota_inicial.sql", "0001_base_comercial.sql", "0002_automacoes.sql", "0003_empresa_financeiro.sql", "0004_identidade_visual.sql", "0005_operacao_avancada.sql", "0006_fluxo_caixa_tema.sql"]) cpSync(resolve(root, "drizzle", name), resolve(dist, "drizzle", name));
cpSync(resolve(root, "drizzle/meta/_journal.json"), resolve(dist, "drizzle/meta/_journal.json"));
console.log(`Built ${dist}`);
