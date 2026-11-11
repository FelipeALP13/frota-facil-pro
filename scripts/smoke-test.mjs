// Teste rápido: cria o banco em memória, aplica todas as migrações e testa a API da versão simples.
// Uso (Node.js 22+): node scripts/smoke-test.mjs
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
  async batch(statements) { const out = []; for (const s of statements) out.push(await s.run()); return out; },
};
async function call(method, path, body) {
  const response = await app.fetch(new Request(`https://teste.local/api/${path}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  }), { DB });
  return { status: response.status, data: await response.json() };
}

// Página abre
const home = await app.fetch(new Request("https://teste.local/"), { DB });
assert.equal(home.status, 200);
assert.match(await home.text(), /<title>Frota<\/title>/);

// Três caminhões iniciais e receitas criadas automaticamente
let r = await call("GET", "dados?ano=2026");
assert.equal(r.status, 200);
assert.equal(r.data.caminhoes.length, 3);
assert.deepEqual(r.data.linhas.map((l) => l.grupo).sort(), ["rec1", "rec2"]);

// Lançamento com KM e lançamento de pernoite
r = await call("POST", "lancamento", { caminhao_id: "cam1", data: "2026-04-02", regiao: "CABO FRIO", km_inicial: "60 643", km_final: "61016", valor_saida: 670, diesel: 500.9, frete: 1129.27, motorista: 170, ajudante: 0 });
assert.equal(r.status, 200);
const lancId = r.data.id;
r = await call("POST", "lancamento", { caminhao_id: "cam1", data: "2026-04-20", km_inicial: 61016, pernoite: true, valor_saida: 737, frete: 1204.77, motorista: 170, ajudante: 100 });
assert.equal(r.status, 200);
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.lancamentos.length, 2);
assert.equal(r.data.lancamentos[0].km_inicial, 60643);
assert.equal(r.data.lancamentos[1].km_final, 61016, "pernoite copia o KM inicial");
assert.equal(r.data.ultimoKm[0].km, 61016);

// Validações
assert.equal((await call("POST", "lancamento", { caminhao_id: "cam1", data: "2026-04-03", km_inicial: 500, km_final: 400 })).status, 400);
assert.equal((await call("POST", "lancamento", { caminhao_id: "nao-existe", data: "2026-04-03" })).status, 400);
assert.equal((await call("POST", "lancamento", { caminhao_id: "cam1", data: "" })).status, 400);

// Edição e exclusão
r = await call("POST", "lancamento", { id: lancId, caminhao_id: "cam1", data: "2026-04-02", km_inicial: 60643, km_final: 61016, frete: 1500 });
assert.equal(r.status, 200);
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.lancamentos.find((l) => l.id === lancId).frete, 1500);
assert.equal((await call("DELETE", "caminhao?id=cam1")).status, 400, "não exclui caminhão com lançamentos");
assert.equal((await call("DELETE", `lancamento?id=${lancId}`)).status, 200);

// Caminhão novo
r = await call("POST", "caminhao", { placa: "abc1d23", nome_motorista: "Motorista", valor_motorista: 180, km_franquia: 150 });
assert.equal(r.status, 200);
const camId = r.data.id;
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.caminhoes.find((c) => c.id === camId).placa, "ABC1D23");
assert.equal((await call("DELETE", `caminhao?id=${camId}`)).status, 200);

// Financeiro: linha, valor, repetir até dezembro
r = await call("POST", "linha", { ano: 2026, grupo: "desp1", nome: "Seguro" });
assert.equal(r.status, 200);
const seguro = r.data.id;
assert.equal((await call("POST", "valor", { linha_id: seguro, mes: 3, valor: 950 })).status, 200);
assert.equal((await call("POST", "valor/repetir", { linha_id: seguro, mes: 3 })).status, 200);
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.valores.filter((v) => v.linha_id === seguro).length, 10, "março a dezembro");
await call("POST", "valor", { linha_id: seguro, mes: 12, valor: 0 });
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.valores.filter((v) => v.linha_id === seguro).length, 9, "valor zero apaga a célula");
assert.equal((await call("POST", "linha", { ano: 2026, grupo: "errado", nome: "X" })).status, 400);

// Ano novo copia os nomes das linhas do ano anterior, sem valores, e só uma vez
r = await call("GET", "dados?ano=2027");
assert.deepEqual(r.data.linhas.map((l) => l.nome).sort(), ["Receita 01 a 15", "Receita 16 a 31", "Seguro"]);
assert.equal(r.data.valores.length, 0);
r = await call("GET", "dados?ano=2027");
assert.equal(r.data.linhas.length, 3);

// Excluir linha apaga os valores
assert.equal((await call("DELETE", `linha?id=${seguro}`)).status, 200);
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.valores.filter((v) => v.linha_id === seguro).length, 0);

// Quem trabalhou: nome padrão do caminhão fica vazio; substituto fica gravado
await call("POST", "caminhao", { id: "cam2", placa: "LLF9969", nome_motorista: "Victor", nome_ajudante: "Gabriel", valor_motorista: 170, valor_ajudante: 100, km_franquia: 130 });
await call("POST", "lancamento", { caminhao_id: "cam2", data: "2026-05-04", frete: 900, motorista: 170, ajudante: 100, nome_motorista: "victor", nome_ajudante: "Gabriel" });
await call("POST", "lancamento", { caminhao_id: "cam2", data: "2026-05-05", frete: 800, motorista: 170, ajudante: 100, nome_motorista: "Pai", nome_ajudante: "Gabriel" });
r = await call("GET", "dados?ano=2026");
const maio = r.data.lancamentos.filter((l) => l.data.startsWith("2026-05"));
assert.deepEqual(maio.map((l) => l.nome_motorista), ["", "Pai"]);

// Fechar quinzena: grava em linha existente e cria linha nova, de uma vez
const rec1 = r.data.linhas.find((l) => l.grupo === "rec1").id;
r = await call("POST", "fechar", { ano: 2026, mes: 5, itens: [{ linha_id: rec1, valor: 1700 }, { nova_linha: "Gabriel", grupo: "desp1", valor: 200 }] });
assert.equal(r.status, 200);
r = await call("POST", "fechar", { ano: 2026, mes: 5, itens: [{ linha_id: rec1, valor: 1700 }] });
assert.equal(r.status, 200, "fechar de novo só sobrescreve");
r = await call("GET", "dados?ano=2026");
assert.equal(r.data.valores.filter((v) => v.linha_id === rec1 && v.mes === 5)[0].valor, 1700);
const gabriel = r.data.linhas.find((l) => l.nome === "Gabriel" && l.grupo === "desp1");
assert.ok(gabriel);
assert.equal(r.data.valores.find((v) => v.linha_id === gabriel.id && v.mes === 5).valor, 200);
assert.equal((await call("POST", "fechar", { ano: 2026, mes: 5, itens: [] })).status, 400);
assert.equal((await call("POST", "fechar", { ano: 2026, mes: 5, itens: [{ linha_id: "outra", valor: 1 }] })).status, 400);
assert.equal((await call("POST", "fechar", { ano: 2026, mes: 5, itens: [{ nova_linha: "X", grupo: "errado", valor: 1 }] })).status, 400);

assert.equal((await call("GET", "nada")).status, 404);
console.log("Teste OK: caminhões, lançamentos, financeiro e validações.");
