import { cpSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const archive = resolve(process.argv[2]);
const stage = mkdtempSync(resolve(tmpdir(), "frota-site-"));
const prepared = resolve(stage, "dist");
try {
  const helper = "C:/Users/Felipe/.codex/plugins/cache/openai-curated-remote/sites/1.0.1/skills/sites/scripts/prepare-site-build.cjs";
  const prep = spawnSync(process.execPath, [helper, root, prepared], { encoding: "utf8" });
  if (prep.status !== 0) throw new Error(prep.stderr || "Falha ao preparar o pacote.");
  mkdirSync(resolve(prepared, ".openai/drizzle"), { recursive: true });
  cpSync(resolve(root, "drizzle"), resolve(prepared, ".openai/drizzle"), { recursive: true });
  const manifest = JSON.parse(readFileSync(resolve(root, ".openai/hosting.json"), "utf8"));
  writeFileSync(resolve(prepared, ".openai/hosting.json"), JSON.stringify(manifest, null, 2) + "\n");
  mkdirSync(dirname(archive), { recursive: true });
  const tar = spawnSync("C:/Windows/System32/tar.exe", ["-C", stage, "-czf", archive, "dist"], { encoding: "utf8" });
  if (tar.status !== 0) throw new Error(tar.stderr || "Falha ao criar o arquivo de publicação.");
  console.log(realpathSync(archive));
} finally {
  rmSync(stage, { recursive: true, force: true });
}
