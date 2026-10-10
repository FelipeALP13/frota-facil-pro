import { createServer } from "node:http";
import { readFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import app from "../worker/index.js";

const root = resolve(import.meta.dirname, "..");
const databasePath = resolve(root, ".sites-runtime", "frota-preview-v2.sqlite");
mkdirSync(dirname(databasePath), { recursive: true });

const sqlite = new DatabaseSync(databasePath);
sqlite.exec("PRAGMA foreign_keys = ON");
for (const migration of readdirSync(resolve(root, "drizzle")).filter((name) => name.endsWith(".sql")).sort()) {
  sqlite.exec(readFileSync(resolve(root, "drizzle", migration), "utf8"));
}

class Statement {
  constructor(sql) {
    this.statement = sqlite.prepare(sql);
    this.parameters = [];
  }

  bind(...parameters) {
    this.parameters = parameters;
    return this;
  }

  async all() {
    return { results: this.statement.all(...this.parameters) };
  }

  async run() {
    return { meta: this.statement.run(...this.parameters) };
  }
}

const DB = {
  prepare(sql) {
    return new Statement(sql);
  },
  async batch(statements) {
    return Promise.all(statements.map((statement) => statement.run()));
  },
};

async function bodyFrom(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

const server = createServer(async (request, response) => {
  try {
    const body = ["GET", "HEAD"].includes(request.method) ? undefined : await bodyFrom(request);
    const webRequest = new Request(`http://127.0.0.1:4173${request.url}`, {
      method: request.method,
      headers: request.headers,
      body,
    });
    const result = await app.fetch(webRequest, { DB });
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Erro inesperado");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Local: http://127.0.0.1:4173");
});
