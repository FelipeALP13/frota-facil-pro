import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import app from "../worker/index.js";

const root = resolve(import.meta.dirname, "..");
const sqlite = new DatabaseSync(":memory:");
sqlite.exec("PRAGMA foreign_keys = ON");
for (const migration of readdirSync(resolve(root, "drizzle")).filter((name) => name.endsWith(".sql")).sort()) {
  sqlite.exec(readFileSync(resolve(root, "drizzle", migration), "utf8"));
}

class Statement {
  constructor(sql) { this.statement = sqlite.prepare(sql); this.parameters = []; }
  bind(...parameters) { this.parameters = parameters; return this; }
  async all() { return { results: this.statement.all(...this.parameters) }; }
  async run() { return { meta: this.statement.run(...this.parameters) }; }
}
const DB = {
  prepare(sql) { return new Statement(sql); },
  async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); },
};
const call = (method, payload) => app.fetch(new Request("https://teste.local/api/data", {
  method,
  headers: payload ? { "content-type": "application/json", "oai-authenticated-user-email": "teste@local" } : undefined,
  body: payload ? JSON.stringify(payload) : undefined,
}), { DB });

let response = await call("GET");
assert.equal(response.status, 200);
let data = await response.json();
assert.equal(data.trucks.length, 3, "A base piloto deve iniciar com três caminhões.");

response = await call("POST", { type: "driver", name: "Motorista Teste", cnh: "123", cnhCategory: "D" });
assert.equal(response.status, 201);
response = await call("POST", { type: "client", name: "Frigorífico Teste", city: "São Paulo" });
assert.equal(response.status, 201);
response = await call("POST", { type: "fuel", truckId: data.trucks[0].id, date: "2026-10-10", liters: 100, total: 620, odometer: 1000, station: "Posto Teste" });
assert.equal(response.status, 201);
response = await call("POST", { type: "financial", entryType: "Receita", category: "Frete", description: "Entrega teste", amount: 2500, dueDate: "2026-10-15" });
assert.equal(response.status, 201);
response = await call("POST", { type: "message", channel: "email", recipient: "teste@example.com", subject: "Teste", message: "Mensagem de validação" });
assert.equal(response.status, 202, "Sem credenciais, a comunicação deve ficar aguardando configuração.");
const dueDate=new Date(Date.now()+5*86400000).toISOString().slice(0,10);
response = await call("POST", { type: "document", documentType: "CRLV", description: "CRLV para automação", expiryDate: dueDate, status: "Válido" });
assert.equal(response.status, 201);
response = await call("POST", { type: "rule", name: "Aviso CRLV", eventType: "Documento vencendo", daysBefore: 7, channel: "email", recipient: "teste@example.com" });
assert.equal(response.status, 201);
const automationRequest=()=>app.fetch(new Request("https://teste.local/api/automations/run",{method:"POST"}),{DB});
let automation=await automationRequest();
assert.equal(automation.status,200);
assert.equal((await automation.json()).prepared,1);
automation=await automationRequest();
assert.equal((await automation.json()).duplicates,1,"A mesma regra não deve gerar mensagens duplicadas.");

data = await (await call("GET")).json();
assert.equal(data.drivers.length, 1);
assert.equal(data.clients.length, 1);
assert.equal(data.fuel.length, 1);
assert.equal(data.financial.length, 1);
assert.equal(data.communications.length, 2);
assert.equal(data.integrations.email, false);
assert.equal(data.integrations.whatsapp, false);
console.log("Smoke test aprovado: painel, cadastros, financeiro e automação sem duplicidade.");
