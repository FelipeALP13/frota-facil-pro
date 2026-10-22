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
response = await call("POST", { type: "trip", truckId: data.trucks[0].id, driverId, clientId, date: "2026-10-10", origin: "Rio de Janeiro", destination: "Niterói", region: "Metropolitana", kmStart: 100, kmEnd: 180, freight: 1000, diesel: 100, driverCost: 50, incomeStatus: "Pendente", incomeDueDate: "2026-10-20", expenseStatus: "Pago", expenseDueDate: "2026-10-10", expensePaidDate: "2026-10-10", attachmentName: "canhoto.webp", attachmentData: "data:image/webp;base64,dGVzdGU=" });
assert.equal(response.status, 201);
const tripId=(await response.json()).id;
response = await call("POST", { type: "expense", truckId: data.trucks[0].id, date: "2026-10-10", category: "Pedágio", description: "Pedágio da rota", amount: 80, financialStatus: "Pendente", dueDate: "2026-10-12" });
assert.equal(response.status, 201);
const expenseId=(await response.json()).id;
response = await call("POST", { type: "fuel", truckId: data.trucks[0].id, date: "2026-10-10", liters: 100, total: 620, odometer: 1000, station: "Posto Teste" });
assert.equal(response.status, 201);
response = await call("POST", { type: "helper", name: "Ajudante Teste", phone: "(21) 99999-9999", status: "Ativo" });
assert.equal(response.status, 201);
const helperId=(await response.json()).id;
response = await call("POST", { type: "telemetry", truckId: data.trucks[0].id, latitude: -22.9068, longitude: -43.1729, speed: 62, ignition: true, provider: "Manual", capturedAt: "2026-10-10T12:00" });
assert.equal(response.status, 201);
response = await call("POST", { type: "journey", driverId, truckId: data.trucks[0].id, date: "2026-10-10", startedAt: "08:00", endedAt: "17:00", drivingMinutes: 420, maxContinuousMinutes: 360, waitingMinutes: 60, restMinutes: 60 });
assert.equal(response.status, 201);
response = await call("POST", { type: "tire", truckId: data.trucks[0].id, fireNumber: "PF-001", axlePosition: "Eixo 2 - direito", treadMm: 12.5, recapCount: 1, status: "Em uso" });
assert.equal(response.status, 201);
response = await call("POST", { type: "fine", truckId: data.trucks[0].id, driverId, date: "2026-10-10", infractionCode: "745-50", agency: "DETRAN-RJ", severity: "Grave", points: 5, amount: 195.23, status: "Pendente" });
assert.equal(response.status, 201);
response = await call("POST", { type: "inventory", sku: "FIL-001", name: "Filtro de óleo", quantity: 2, minimumQuantity: 3, unit: "un", unitCost: 85, location: "A2", status: "Ativo" });
assert.equal(response.status, 201);
const inventoryId=(await response.json()).id;
response = await call("POST", { type: "maintenance", truckId: data.trucks[0].id, date: "2026-10-11", maintenanceType: "Preventiva", service: "Troca de filtro", supplier: "Oficina Teste", invoiceNumber: "NF-10", cost: 200, laborCost: 115, partsCost: 85, downtimeHours: 2, partId: inventoryId, partQuantity: 1, km: 1000, nextKm: 11000, status: "Concluída", financialStatus: "Pendente", dueDate: "2026-10-15" });
assert.equal(response.status, 201);
const maintenanceId=(await response.json()).id;
response = await call("POST", { type: "financial", entryType: "Receita", category: "Frete", description: "Entrega teste", amount: 2500, dueDate: "2026-10-15" });
assert.equal(response.status, 201);
response = await call("POST", { type: "financial", entryType: "Receita", category: "Frete", description: "Recebimento parcial", originalAmount: 1000, paidAmount: 300, status: "Pendente", competenceDate: "2026-10-01", dueDate: "2026-10-20" });
assert.equal(response.status, 201);
response = await call("POST", { type: "costCenter", code: "COM", name: "Comercial", status: "Ativo" });
assert.equal(response.status, 201);
response = await call("PUT", { type: "driver", id: driverId, name: "Motorista Editado", cpf: "529.982.247-25", cnh: "123", cnhCategory: "E", phone: "(11) 99999-9999", email: "motorista@example.com", status: "Ativo" });
assert.equal(response.status, 200, "Cadastros precisam aceitar edição.");
response = await call("PUT", { type: "client", id: clientId, name: "Frigorífico Teste", document: "00.000.000/E08G-12", city: "São Paulo", status: "Ativo" });
assert.equal(response.status, 200, "O sistema precisa aceitar o CNPJ alfanumérico oficial.");
response = await call("PUT", { type: "trip", id: tripId, truckId: data.trucks[0].id, driverId, helperId, clientId, date: "2026-10-10", status: "Em trânsito", operationType: "Remunerada", origin: "Rio de Janeiro", destination: "Niterói", region: "Metropolitana", kmStart: 100, kmEnd: 190, emptyKm: 10, axleCount: 2, cargoType: "Refrigerada", cargoDescription: "Alimentos congelados", weightKg: 5000, volumeM3: 18, packageCount: 80, ciot: "CIOT-001", cteKey: "CTE-001", mdfeKey: "MDFE-001", invoiceKey: "NFE-001", tollAmount: 20, tollAdvance: 20, floorFreight: 900, floorFreightChecked: true, fuelCostMode: "Abastecimentos", setpointTemp: -18, departureTemp: -17.5, arrivalTemp: -17, minTemp: -20, maxTemp: -15, preCooled: true, sanitized: true, thermometerOk: true, freight: 1100, diesel: 100, driverCost: 50, incomeStatus: "Pendente", incomeDueDate: "2026-10-20", expenseStatus: "Pago", expenseDueDate: "2026-10-10", expensePaidDate: "2026-10-10" });
assert.equal(response.status, 200, "Editar a viagem precisa sincronizar o financeiro vinculado.");
response = await call("POST", { type: "driver", name: "CPF Inválido", cpf: "111.111.111-11" });
assert.equal(response.status, 400, "CPF inválido não pode ser aceito.");
response = await call("PUT", { type: "company", id: "pilot", name: "Transportadora Piloto", legalName: "Transportadora Piloto Ltda", document: "12.345.678/0001-95", phone: "(11) 3333-4444", whatsapp: "+55 (11) 99999-9999", email: "contato@example.com", city: "São Paulo", state: "SP", primaryColor: "#2244aa", secondaryColor: "#ff8800", sidebarColor: "#102030", surfaceColor: "#fafafa", themeMode: "Escuro", borderRadius: 18, compactMode: true, logoData: "data:image/png;base64,dGVzdGU=", emailBatchSize: 20, emailIntervalSeconds: 30, whatsappBatchSize: 20, whatsappIntervalSeconds: 30, rntrc: "12345678", rntrcExpiry: "2027-10-10", operationMode: "Transporte remunerado", rctrcPolicy: "RCTR-001", rctrcExpiry: "2027-06-01", rcdcPolicy: "RCDC-001", rcdcExpiry: "2027-06-01", rcvPolicy: "RCV-001", rcvExpiry: "2027-06-01", pgrExpiry: "2027-07-01" });
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
assert.match(data.organization.logo_data, /^data:image\/png/, "A identidade visual da empresa deve ser persistida.");
assert.equal(data.organization.theme_mode, "Escuro");
assert.equal(data.organization.secondary_color, "#ff8800");
assert.equal(data.clients.length, 1);
assert.equal(data.fuel.length, 1);
assert.equal(data.fuel[0].price_per_liter, 6.2, "O preço por litro deve ser calculado quando não for informado.");
assert.equal(data.trips[0].helper_name, "Ajudante Teste", "A viagem deve exibir o ajudante vinculado.");
assert.equal(data.trips[0].attachment_name, "canhoto.webp", "Editar a viagem não pode apagar o canhoto anexado.");
assert.equal(data.financial.length, 8, "Movimentos operacionais devem gerar lançamentos financeiros sem duplicidade.");
assert.equal(data.financial.filter((entry)=>entry.source_type==="trip"&&entry.source_id===tripId).length, 2, "Diesel em modo Abastecimentos não pode duplicar o custo.");
assert.equal(data.financial.find((entry)=>entry.source_type==="trip"&&entry.source_line==="freight")?.entry_type, "Receita");
assert.equal(data.financial.find((entry)=>entry.source_type==="trip"&&entry.source_line==="freight")?.status, "Pendente");
assert.equal(data.financial.find((entry)=>entry.source_type==="trip"&&entry.source_line==="freight")?.due_date, "2026-10-20");
assert.equal(data.financial.find((entry)=>entry.source_type==="trip"&&entry.source_line==="freight")?.amount, 1100);
assert.ok(data.financial.filter((entry)=>entry.source_type==="trip"&&entry.entry_type==="Despesa").every((entry)=>entry.status==="Pago"));
assert.equal(data.financial.find((entry)=>entry.source_type==="expense"&&entry.source_id===expenseId)?.amount, 80);
assert.equal(data.helpers.length, 1);
assert.equal(data.telemetry.length, 1);
assert.equal(data.journeys.length, 1);
assert.equal(data.journeys[0].max_continuous_minutes, 360);
assert.equal(data.tires.length, 1);
assert.equal(data.fines.length, 1);
assert.equal(data.inventory.length, 1);
assert.equal(data.inventory[0].quantity, 1, "A manutenção deve dar saída automática na peça usada.");
assert.equal(data.inventoryMovements.length, 1);
assert.equal(data.maintenance[0].part_name, "Filtro de óleo");
assert.equal(data.financial.find((entry)=>entry.description==="Recebimento parcial")?.status, "Parcial");
assert.equal(data.financial.find((entry)=>entry.description==="Recebimento parcial")?.paid_amount, 300);
assert.equal(data.trips[0].status, "Em trânsito");
assert.equal(data.trips[0].ciot, "CIOT-001");
assert.equal(data.trips[0].release_status, "Liberada");
assert.equal(data.organization.rntrc, "12345678");
assert.ok(data.costCenters.some((center)=>center.code==="COM"));
assert.equal(data.communications.length, 2);
assert.equal(data.integrations.email, false);
assert.equal(data.integrations.whatsapp, false);
const ui = readFileSync(resolve(root, "worker", "ui.js"), "utf8");
for (const feature of ["Rastreamento", "Jornada", "Pneus", "Multas", "Estoque", "companyLogo", "dashboardCharts", "km/L", "Canhoto de entrega", "Foto do cupom fiscal", "Foto da avaria", "prepareUpload", "configurável", "Fluxo de caixa", "downloadCsv", "applyTheme", "Impacto financeiro automático", "Receita do frete", "Despesas da viagem", "incomeStatus", "expenseStatus", "CIOT", "MDF-e", "Piso mínimo", "Temperatura", "RNTRC", "RCTR-C", "paidAmount", "periodFilter", "mobileMenu", "uploadPreparedFile"]) assert.ok(ui.includes(feature), `A interface deve incluir ${feature}.`);
for (const standard of ["screen-stack", "Padrão visual único para todas as telas", "Padronização estrutural v2", "view-heading", "view-description", "standardizeScreen", "section-card", "module-tabs", "panel-head", "table-wrap"]) assert.ok(ui.includes(standard), `A interface padronizada deve incluir ${standard}.`);
for (const view of ["dashboard", "trips", "telemetry", "journeys", "inspections", "occurrences", "vehicles", "drivers", "helpers", "clients", "finance", "fuel", "maintenance", "tires", "fines", "inventory", "documents", "communications", "reports", "company"]) assert.ok(ui.includes(`data-view="${view}"`), `A navegação padronizada deve incluir a tela ${view}.`);
const deleteExpense = await app.fetch(new Request(`https://teste.local/api/data?type=expense&id=${expenseId}`, { method: "DELETE", headers: { "oai-authenticated-user-email": "teste@local" } }), { DB });
assert.equal(deleteExpense.status, 200);
data = await (await call("GET")).json();
assert.equal(data.financial.some((entry)=>entry.source_type==="expense"&&entry.source_id===expenseId), false, "Excluir a origem deve remover o lançamento automático vinculado.");
console.log("Smoke test aprovado: fluxo de caixa integrado, relatórios, personalização, automações e CRUD.");
