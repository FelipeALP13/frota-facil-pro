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
const driverId=(await response.json()).id;
response = await call("POST", { type: "client", name: "Frigorífico Teste", city: "São Paulo" });
assert.equal(response.status, 201);
const clientId=(await response.json()).id;
response = await call("POST", { type: "fuel", truckId: data.trucks[0].id, date: "2026-10-10", liters: 100, total: 620, odometer: 1000, station: "Posto Teste" });
assert.equal(response.status, 201);
response = await call("POST", { type: "financial", entryType: "Receita", category: "Frete", description: "Entrega teste", amount: 2500, dueDate: "2026-10-15" });
assert.equal(response.status, 201);
response = await call("POST", { type: "costCenter", code: "COM", name: "Comercial", status: "Ativo" });
assert.equal(response.status, 201);
response = await call("PUT", { type: "driver", id: driverId, name: "Motorista Editado", cpf: "529.982.247-25", cnh: "123", cnhCategory: "E", phone: "(11) 99999-9999", email: "motorista@example.com", status: "Ativo" });
assert.equal(response.status, 200, "Cadastros precisam aceitar edição.");
response = await call("PUT", { type: "client", id: clientId, name: "Frigorífico Teste", document: "00.000.000/E08G-12", city: "São Paulo", status: "Ativo" });
assert.equal(response.status, 200, "O sistema precisa aceitar o CNPJ alfanumérico oficial.");
response = await call("POST", { type: "driver", name: "CPF Inválido", cpf: "111.111.111-11" });
assert.equal(response.status, 400, "CPF inválido não pode ser aceito.");
response = await call("PUT", { type: "company", id: "pilot", name: "Transportadora Piloto", legalName: "Transportadora Piloto Ltda", document: "12.345.678/0001-95", phone: "(11) 3333-4444", whatsapp: "+55 (11) 99999-9999", email: "contato@example.com", city: "São Paulo", state: "SP", emailBatchSize: 20, emailIntervalSeconds: 30, whatsappBatchSize: 20, whatsappIntervalSeconds: 30 });
assert.equal(response.status, 200, "A configuração da empresa precisa aceitar edição.");
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
const webhook=await app.fetch(new Request("https://teste.local/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=segredo&hub.challenge=12345"),{DB,WHATSAPP_WEBHOOK_VERIFY_TOKEN:"segredo"});
assert.equal(webhook.status,200);
assert.equal(await webhook.text(),"12345","O webhook do WhatsApp precisa responder ao desafio de verificação.");

data = await (await call("GET")).json();
assert.equal(data.drivers.length, 1);
assert.equal(data.drivers[0].name, "Motorista Editado");
assert.equal(data.organization.name, "Transportadora Piloto");
assert.equal(data.clients.length, 1);
assert.equal(data.fuel.length, 1);
assert.equal(data.financial.length, 1);
assert.ok(data.costCenters.some((center)=>center.code==="COM"));
assert.equal(data.communications.length, 2);
assert.equal(data.integrations.email, false);
assert.equal(data.integrations.whatsapp, false);
console.log("Smoke test aprovado: painel, edição, empresa, financeiro e automação sem duplicidade.");
