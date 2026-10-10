import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(dist, "server"), { recursive: true });
mkdirSync(resolve(dist, ".openai"), { recursive: true });
cpSync(resolve(root, "worker/index.js"), resolve(dist, "server/index.js"));
cpSync(resolve(root, "worker/ui.js"), resolve(dist, "server/ui.js"));
cpSync(resolve(root, ".openai/hosting.json"), resolve(dist, ".openai/hosting.json"));
console.log(`Built ${dist}`);
