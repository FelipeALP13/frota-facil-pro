import { page } from "./ui.js";

// Versão simples: caminhões (lançamentos por quinzena) + planilha financeira mensal.

const GRUPOS = ["rec1", "rec2", "desp1", "desp2"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function texto(p, chave, obrigatorio = false, rotulo = chave) {
  const v = String(p[chave] ?? "").trim();
  if (obrigatorio && !v) throw new Error(`Preencha o campo ${rotulo}.`);
  return v.slice(0, 200);
}

function numero(p, chave, rotulo = chave) {
  const bruto = p[chave];
  if (bruto === "" || bruto === null || bruto === undefined) return 0;
  const v = Number(bruto);
  if (!Number.isFinite(v)) throw new Error(`Valor inválido em ${rotulo}.`);
  return Math.round(v * 100) / 100;
}

function kmOpcional(p, chave) {
  const bruto = p[chave];
  if (bruto === "" || bruto === null || bruto === undefined) return null;
  const digitos = String(bruto).replace(/\D/g, "");
  if (!digitos) return null;
  const v = Number(digitos);
  if (!Number.isFinite(v)) throw new Error("KM inválido.");
  return v;
}

function dataValida(p, chave) {
  const v = texto(p, chave, true, "data");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) throw new Error("Informe a data no formato correto.");
  return v;
}

function anoValido(v) {
  const ano = Number(v);
  if (!Number.isInteger(ano) || ano < 2000 || ano > 2100) throw new Error("Ano inválido.");
  return ano;
}

async function todos(db, sql, ...params) {
  return (await db.prepare(sql).bind(...params).all()).results;
}
async function executar(db, sql, ...params) {
  return db.prepare(sql).bind(...params).run();
}

const RECEITAS_PADRAO = [
  ["rec1", "Receita 01 a 15"],
  ["rec2", "Receita 16 a 31"],
];

async function garantirLinhasDoAno(db, ano) {
  const existentes = await todos(db, "SELECT id FROM fin_linhas WHERE ano=? LIMIT 1", ano);
  if (existentes.length) return;
  // Ano novo: copia os nomes das linhas do ano anterior (sem valores) ou cria só as receitas.
  const anteriores = await todos(db, "SELECT grupo,nome,ordem FROM fin_linhas WHERE ano=? ORDER BY grupo,ordem", ano - 1);
  const base = anteriores.length ? anteriores : RECEITAS_PADRAO.map(([grupo, nome], i) => ({ grupo, nome, ordem: i }));
  await db.batch(base.map((l) =>
    db.prepare("INSERT INTO fin_linhas (id,ano,grupo,nome,ordem) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(), ano, l.grupo, l.nome, l.ordem)
  ));
}

async function dados(db, url) {
  const ano = anoValido(url.searchParams.get("ano") || new Date().getFullYear());
  await garantirLinhasDoAno(db, ano);
  const [caminhoes, lancamentos, linhas, valores] = await Promise.all([
    todos(db, "SELECT * FROM cam_caminhoes ORDER BY ordem,placa"),
    todos(db, "SELECT * FROM cam_lancamentos WHERE data>=? AND data<=? ORDER BY data,criado_em", `${ano}-01-01`, `${ano}-12-31`),
    todos(db, "SELECT * FROM fin_linhas WHERE ano=? ORDER BY grupo,ordem,nome", ano),
    todos(db, "SELECT v.linha_id,v.mes,v.valor FROM fin_valores v JOIN fin_linhas l ON l.id=v.linha_id WHERE l.ano=?", ano),
  ]);
  // KM do lançamento mais recente de cada caminhão (de qualquer ano), para preencher o próximo dia.
  // Usa o mais recente, não o maior: o hodômetro pode ter sido trocado.
  const ultimoKm = await todos(db,
    "SELECT caminhao_id, km FROM (SELECT caminhao_id, COALESCE(km_final,km_inicial) AS km, ROW_NUMBER() OVER (PARTITION BY caminhao_id ORDER BY data DESC, criado_em DESC, COALESCE(km_final,km_inicial) DESC) AS n FROM cam_lancamentos WHERE COALESCE(km_final,km_inicial) IS NOT NULL) WHERE n=1");
  const [despesas, vales, lembretes, config] = await Promise.all([
    todos(db, "SELECT * FROM cam_despesas WHERE data>=? AND data<=? ORDER BY data,criado_em", `${ano}-01-01`, `${ano}-12-31`),
    todos(db, "SELECT * FROM cam_vales WHERE data>=? AND data<=? ORDER BY data,criado_em", `${ano}-01-01`, `${ano}-12-31`),
    todos(db, "SELECT * FROM cam_lembretes ORDER BY nome"),
    lerConfig(db),
  ]);
  return { ano, caminhoes, lancamentos, linhas, valores, ultimoKm, despesas, vales, lembretes, config };
}

// ---------- Ajustes, outras despesas, vales e lembretes ----------

async function lerConfig(db) {
  const linhas = await todos(db, "SELECT chave,valor FROM config");
  const cfg = {};
  for (const l of linhas) { try { cfg[l.chave] = JSON.parse(l.valor); } catch { /* ignora valor corrompido */ } }
  return cfg;
}

async function salvarConfig(db, p) {
  const chave = texto(p, "chave", true, "chave");
  if (!/^[a-z_]{1,40}$/.test(chave)) throw new Error("Ajuste inválido.");
  const valor = JSON.stringify(p.valor ?? null);
  if (valor.length > 20000) throw new Error("Ajuste grande demais.");
  await executar(db, "INSERT INTO config (chave,valor) VALUES (?,?) ON CONFLICT(chave) DO UPDATE SET valor=excluded.valor", chave, valor);
  return { ok: true };
}

async function caminhaoExiste(db, id) {
  const r = await todos(db, "SELECT id FROM cam_caminhoes WHERE id=?", id);
  if (!r.length) throw new Error("Caminhão não encontrado.");
}

// O celular pode mandar o código do registro novo (para reenviar sem duplicar quando volta a internet).
const TABELAS_ID = new Set(["cam_lancamentos", "cam_despesas", "cam_vales"]);
async function jaExiste(db, tabela, id) {
  if (!TABELAS_ID.has(tabela) || !id) return false;
  return (await todos(db, `SELECT id FROM ${tabela} WHERE id=?`, String(id))).length > 0;
}
function idNovo(p) {
  const v = String(p.id || "");
  return /^[A-Za-z0-9-]{8,80}$/.test(v) ? v : crypto.randomUUID();
}

async function salvarDespesa(db, p) {
  const caminhaoId = texto(p, "caminhao_id", true, "caminhão");
  await caminhaoExiste(db, caminhaoId);
  const valor = numero(p, "valor", "valor");
  if (valor <= 0) throw new Error("Informe o valor da despesa.");
  const campos = [caminhaoId, dataValida(p, "data"), texto(p, "categoria") || "Outros", valor, kmOpcional(p, "km"), texto(p, "obs")];
  if (await jaExiste(db, "cam_despesas", p.id)) {
    await executar(db, "UPDATE cam_despesas SET caminhao_id=?,data=?,categoria=?,valor=?,km=?,obs=? WHERE id=?", ...campos, String(p.id));
    return { id: p.id };
  }
  const id = idNovo(p);
  await executar(db, "INSERT INTO cam_despesas (caminhao_id,data,categoria,valor,km,obs,id) VALUES (?,?,?,?,?,?,?)", ...campos, id);
  return { id };
}

async function salvarVale(db, p) {
  const valor = numero(p, "valor", "valor");
  if (valor <= 0) throw new Error("Informe o valor do vale.");
  const campos = [texto(p, "pessoa", true, "pessoa"), dataValida(p, "data"), valor, texto(p, "obs")];
  if (await jaExiste(db, "cam_vales", p.id)) {
    await executar(db, "UPDATE cam_vales SET pessoa=?,data=?,valor=?,obs=? WHERE id=?", ...campos, String(p.id));
    return { id: p.id };
  }
  const id = idNovo(p);
  await executar(db, "INSERT INTO cam_vales (pessoa,data,valor,obs,id) VALUES (?,?,?,?,?)", ...campos, id);
  return { id };
}

function dataOpcional(p, chave) {
  const v = texto(p, chave);
  if (!v) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) throw new Error("Data inválida.");
  return v;
}

async function salvarLembrete(db, p) {
  const tipo = p.tipo === "data" ? "data" : "km";
  const caminhaoId = texto(p, "caminhao_id") || null;
  if (caminhaoId) await caminhaoExiste(db, caminhaoId);
  const nome = texto(p, "nome", true, "nome");
  let aCadaKm = null, ultimoKm = null, venceEm = null, aCadaMeses = null;
  if (tipo === "km") {
    if (!caminhaoId) throw new Error("Lembrete por KM precisa de um caminhão.");
    aCadaKm = kmOpcional(p, "a_cada_km");
    if (!aCadaKm) throw new Error("Informe a cada quantos km.");
    ultimoKm = kmOpcional(p, "ultimo_km");
    if (ultimoKm === null) throw new Error("Informe o KM em que foi feito pela última vez.");
  } else {
    venceEm = dataOpcional(p, "vence_em");
    if (!venceEm) throw new Error("Informe a data de vencimento.");
    const m = Number(p.a_cada_meses || 0);
    aCadaMeses = Number.isInteger(m) && m > 0 && m <= 120 ? m : null;
  }
  const campos = [caminhaoId, nome, tipo, aCadaKm, ultimoKm, venceEm, aCadaMeses, texto(p, "obs")];
  if (p.id) {
    await executar(db, "UPDATE cam_lembretes SET caminhao_id=?,nome=?,tipo=?,a_cada_km=?,ultimo_km=?,vence_em=?,a_cada_meses=?,obs=? WHERE id=?", ...campos, String(p.id));
    return { id: p.id };
  }
  const id = crypto.randomUUID();
  await executar(db, "INSERT INTO cam_lembretes (caminhao_id,nome,tipo,a_cada_km,ultimo_km,vence_em,a_cada_meses,obs,id) VALUES (?,?,?,?,?,?,?,?,?)", ...campos, id);
  return { id };
}

// Marca um lembrete como feito: por KM, reinicia no KM informado; por data, empurra o vencimento.
async function lembreteFeito(db, p) {
  const id = texto(p, "id", true);
  const r = (await todos(db, "SELECT * FROM cam_lembretes WHERE id=?", id))[0];
  if (!r) throw new Error("Lembrete não encontrado.");
  if (r.tipo === "km") {
    const km = kmOpcional(p, "km");
    if (km === null) throw new Error("Informe o KM em que foi feito.");
    await executar(db, "UPDATE cam_lembretes SET ultimo_km=? WHERE id=?", km, id);
  } else {
    const nova = dataOpcional(p, "vence_em");
    if (!nova) throw new Error("Informe o novo vencimento.");
    await executar(db, "UPDATE cam_lembretes SET vence_em=? WHERE id=?", nova, id);
  }
  return { ok: true };
}

async function salvarCaminhao(db, p) {
  const c = {
    placa: texto(p, "placa", true, "placa").toUpperCase(),
    nome_motorista: texto(p, "nome_motorista") || "Motorista",
    nome_ajudante: texto(p, "nome_ajudante") || "Ajudante",
    valor_motorista: numero(p, "valor_motorista"),
    valor_ajudante: numero(p, "valor_ajudante"),
    km_franquia: Math.max(0, Math.round(numero(p, "km_franquia"))),
  };
  if (p.id) {
    await executar(db,
      "UPDATE cam_caminhoes SET placa=?,nome_motorista=?,nome_ajudante=?,valor_motorista=?,valor_ajudante=?,km_franquia=? WHERE id=?",
      c.placa, c.nome_motorista, c.nome_ajudante, c.valor_motorista, c.valor_ajudante, c.km_franquia, String(p.id));
    return { id: p.id };
  }
  const id = crypto.randomUUID();
  const ordem = (await todos(db, "SELECT COALESCE(MAX(ordem),0)+1 AS o FROM cam_caminhoes"))[0].o;
  await executar(db,
    "INSERT INTO cam_caminhoes (id,placa,nome_motorista,nome_ajudante,valor_motorista,valor_ajudante,km_franquia,ordem) VALUES (?,?,?,?,?,?,?,?)",
    id, c.placa, c.nome_motorista, c.nome_ajudante, c.valor_motorista, c.valor_ajudante, c.km_franquia, ordem);
  return { id };
}

async function excluirCaminhao(db, id) {
  const usados = await todos(db, "SELECT (SELECT COUNT(*) FROM cam_lancamentos WHERE caminhao_id=?)+(SELECT COUNT(*) FROM cam_despesas WHERE caminhao_id=?) AS n", id, id);
  if (usados[0].n > 0) throw new Error("Este caminhão tem lançamentos ou despesas. Exclua-os antes.");
  await db.batch([
    db.prepare("DELETE FROM cam_lembretes WHERE caminhao_id=?").bind(id),
    db.prepare("DELETE FROM cam_caminhoes WHERE id=?").bind(id),
  ]);
  return { ok: true };
}

async function salvarLancamento(db, p) {
  const caminhaoId = texto(p, "caminhao_id", true, "caminhão");
  const existe = await todos(db, "SELECT id,nome_motorista,nome_ajudante FROM cam_caminhoes WHERE id=?", caminhaoId);
  if (!existe.length) throw new Error("Caminhão não encontrado.");
  // Se for o motorista/ajudante padrão do caminhão, guarda vazio: assim acompanha se o nome do caminhão mudar.
  const quem = (chave, padrao) => {
    const v = texto(p, chave);
    return v.toLowerCase() === String(padrao).toLowerCase() ? "" : v;
  };
  const nomeMot = quem("nome_motorista", existe[0].nome_motorista);
  const nomeAju = quem("nome_ajudante", existe[0].nome_ajudante);
  const pernoite = p.pernoite ? 1 : 0;
  const kmIni = kmOpcional(p, "km_inicial");
  let kmFim = kmOpcional(p, "km_final");
  if (pernoite && kmIni !== null && kmFim === null) kmFim = kmIni;
  if (kmIni !== null && kmFim !== null && kmFim < kmIni) throw new Error("O KM final não pode ser menor que o KM inicial.");
  const l = [
    caminhaoId, dataValida(p, "data"), texto(p, "regiao"), kmIni, kmFim, pernoite,
    numero(p, "valor_saida", "valor saída"), numero(p, "diesel"), numero(p, "frete", "valor frete"),
    numero(p, "motorista"), numero(p, "ajudante"), texto(p, "obs"), nomeMot, nomeAju,
  ];
  if (await jaExiste(db, "cam_lancamentos", p.id)) {
    await executar(db,
      "UPDATE cam_lancamentos SET caminhao_id=?,data=?,regiao=?,km_inicial=?,km_final=?,pernoite=?,valor_saida=?,diesel=?,frete=?,motorista=?,ajudante=?,obs=?,nome_motorista=?,nome_ajudante=? WHERE id=?",
      ...l, String(p.id));
    return { id: p.id };
  }
  const id = idNovo(p);
  await executar(db,
    "INSERT INTO cam_lancamentos (caminhao_id,data,regiao,km_inicial,km_final,pernoite,valor_saida,diesel,frete,motorista,ajudante,obs,nome_motorista,nome_ajudante,id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    ...l, id);
  return { id };
}

async function salvarLinha(db, p) {
  const nome = texto(p, "nome", true, "nome");
  if (p.id) {
    await executar(db, "UPDATE fin_linhas SET nome=? WHERE id=?", nome, String(p.id));
    return { id: p.id };
  }
  const ano = anoValido(p.ano);
  const grupo = String(p.grupo || "");
  if (!GRUPOS.includes(grupo)) throw new Error("Grupo inválido.");
  const ordem = (await todos(db, "SELECT COALESCE(MAX(ordem),0)+1 AS o FROM fin_linhas WHERE ano=? AND grupo=?", ano, grupo))[0].o;
  const id = crypto.randomUUID();
  await executar(db, "INSERT INTO fin_linhas (id,ano,grupo,nome,ordem) VALUES (?,?,?,?,?)", id, ano, grupo, nome, ordem);
  return { id };
}

async function excluirLinha(db, id) {
  await db.batch([
    db.prepare("DELETE FROM fin_valores WHERE linha_id=?").bind(id),
    db.prepare("DELETE FROM fin_linhas WHERE id=?").bind(id),
  ]);
  return { ok: true };
}

function mesValido(v) {
  const mes = Number(v);
  if (!Number.isInteger(mes) || mes < 1 || mes > 12) throw new Error("Mês inválido.");
  return mes;
}

async function salvarValor(db, p) {
  const linhaId = texto(p, "linha_id", true);
  const mes = mesValido(p.mes);
  const valor = numero(p, "valor");
  if (valor === 0) await executar(db, "DELETE FROM fin_valores WHERE linha_id=? AND mes=?", linhaId, mes);
  else await executar(db,
    "INSERT INTO fin_valores (linha_id,mes,valor) VALUES (?,?,?) ON CONFLICT(linha_id,mes) DO UPDATE SET valor=excluded.valor",
    linhaId, mes, valor);
  return { ok: true };
}

// Repete o valor de um mês nos meses seguintes até dezembro (para contas fixas).
async function repetirValor(db, p) {
  const linhaId = texto(p, "linha_id", true);
  const mes = mesValido(p.mes);
  const atual = await todos(db, "SELECT valor FROM fin_valores WHERE linha_id=? AND mes=?", linhaId, mes);
  const valor = atual.length ? atual[0].valor : 0;
  const comandos = [];
  for (let m = mes + 1; m <= 12; m++) {
    comandos.push(valor === 0
      ? db.prepare("DELETE FROM fin_valores WHERE linha_id=? AND mes=?").bind(linhaId, m)
      : db.prepare("INSERT INTO fin_valores (linha_id,mes,valor) VALUES (?,?,?) ON CONFLICT(linha_id,mes) DO UPDATE SET valor=excluded.valor").bind(linhaId, m, valor));
  }
  if (comandos.length) await db.batch(comandos);
  return { ok: true };
}

// Fechamento da quinzena: grava de uma vez os valores escolhidos nas linhas do financeiro.
// Cada item tem linha_id (linha existente) ou nova_linha (nome, cria no grupo indicado).
async function fecharQuinzena(db, p) {
  const ano = anoValido(p.ano);
  const mes = mesValido(p.mes);
  const itens = Array.isArray(p.itens) ? p.itens : [];
  if (!itens.length) throw new Error("Nenhum valor marcado.");
  if (itens.length > 60) throw new Error("Itens demais.");
  const linhasDoAno = new Set((await todos(db, "SELECT id FROM fin_linhas WHERE ano=?", ano)).map((l) => l.id));
  const ordens = {};
  for (const g of GRUPOS) ordens[g] = (await todos(db, "SELECT COALESCE(MAX(ordem),0) AS o FROM fin_linhas WHERE ano=? AND grupo=?", ano, g))[0].o;
  const comandos = [];
  for (const item of itens) {
    const valor = numero(item, "valor");
    let linhaId = String(item.linha_id || "");
    if (!linhaId) {
      const nome = texto(item, "nova_linha", true, "nome da linha");
      const grupo = String(item.grupo || "");
      if (!GRUPOS.includes(grupo)) throw new Error("Grupo inválido.");
      linhaId = crypto.randomUUID();
      ordens[grupo] += 1;
      comandos.push(db.prepare("INSERT INTO fin_linhas (id,ano,grupo,nome,ordem) VALUES (?,?,?,?,?)").bind(linhaId, ano, grupo, nome, ordens[grupo]));
    } else if (!linhasDoAno.has(linhaId)) {
      throw new Error("Linha do financeiro não encontrada.");
    }
    comandos.push(valor === 0
      ? db.prepare("DELETE FROM fin_valores WHERE linha_id=? AND mes=?").bind(linhaId, mes)
      : db.prepare("INSERT INTO fin_valores (linha_id,mes,valor) VALUES (?,?,?) ON CONFLICT(linha_id,mes) DO UPDATE SET valor=excluded.valor").bind(linhaId, mes, valor));
  }
  await db.batch(comandos);
  return { ok: true, gravados: itens.length };
}

// ---------- Backup e importação (mesmo formato de arquivo) ----------

function semAcento(s) {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

async function backup(db) {
  const caminhoes = await todos(db, "SELECT placa,nome_motorista,nome_ajudante,valor_motorista,valor_ajudante,km_franquia FROM cam_caminhoes ORDER BY ordem,placa");
  const lancamentos = await todos(db,
    "SELECT l.id,c.placa,l.data,l.regiao,l.km_inicial,l.km_final,l.pernoite,l.valor_saida,l.diesel,l.frete,l.motorista,l.ajudante,l.nome_motorista,l.nome_ajudante,l.obs FROM cam_lancamentos l JOIN cam_caminhoes c ON c.id=l.caminhao_id ORDER BY l.data,l.criado_em");
  const linhas = await todos(db, "SELECT id,ano,grupo,nome,ordem FROM fin_linhas ORDER BY ano,grupo,ordem");
  const valores = await todos(db, "SELECT linha_id,mes,valor FROM fin_valores");
  const porLinha = {};
  for (const v of valores) (porLinha[v.linha_id] ||= {})[v.mes] = v.valor;
  const despesas = await todos(db, "SELECT d.id,c.placa,d.data,d.categoria,d.valor,d.km,d.obs FROM cam_despesas d JOIN cam_caminhoes c ON c.id=d.caminhao_id ORDER BY d.data");
  const vales = await todos(db, "SELECT id,pessoa,data,valor,obs FROM cam_vales ORDER BY data");
  const lembretes = await todos(db, "SELECT l.id,c.placa,l.nome,l.tipo,l.a_cada_km,l.ultimo_km,l.vence_em,l.a_cada_meses,l.obs FROM cam_lembretes l LEFT JOIN cam_caminhoes c ON c.id=l.caminhao_id");
  return {
    formato: "frota-simples",
    versao: 2,
    exportado_em: new Date().toISOString(),
    caminhoes,
    lancamentos,
    linhas: linhas.map((l) => ({ ano: l.ano, grupo: l.grupo, nome: l.nome, valores: porLinha[l.id] || {} })),
    despesas,
    vales,
    lembretes,
    config: await lerConfig(db),
  };
}

async function emLotes(db, comandos) {
  for (let i = 0; i < comandos.length; i += 80) await db.batch(comandos.slice(i, i + 80));
}

async function importar(db, p) {
  if (p.formato !== "frota-simples") throw new Error("Este arquivo não é um backup/importação do sistema.");
  const caminhoes = Array.isArray(p.caminhoes) ? p.caminhoes : [];
  const lancamentos = Array.isArray(p.lancamentos) ? p.lancamentos : [];
  const linhas = Array.isArray(p.linhas) ? p.linhas : [];
  if (lancamentos.length > 20000 || linhas.length > 2000) throw new Error("Arquivo grande demais.");

  // Caminhões: acha pela placa; cria se não existir. Nomes só são trocados se ainda estiverem no padrão.
  const existentes = await todos(db, "SELECT * FROM cam_caminhoes");
  const porPlaca = {};
  for (const c of existentes) porPlaca[c.placa.toUpperCase()] = c;
  let ordem = existentes.reduce((m, c) => Math.max(m, c.ordem), 0);
  const placasUsadas = new Set(lancamentos.map((l) => String(l.placa || "").toUpperCase()));
  for (const c of caminhoes) {
    const placa = texto(c, "placa", true, "placa").toUpperCase();
    const atual = porPlaca[placa];
    const nm = texto(c, "nome_motorista") || "Motorista", na = texto(c, "nome_ajudante") || "Ajudante";
    if (!atual) {
      const novo = { id: crypto.randomUUID(), placa, nome_motorista: nm, nome_ajudante: na };
      await executar(db, "INSERT INTO cam_caminhoes (id,placa,nome_motorista,nome_ajudante,valor_motorista,valor_ajudante,km_franquia,ordem) VALUES (?,?,?,?,?,?,?,?)",
        novo.id, placa, nm, na, numero(c, "valor_motorista") || 170, numero(c, "valor_ajudante") || 100, Math.round(numero(c, "km_franquia")) || 130, ++ordem);
      porPlaca[placa] = novo;
    } else {
      if (atual.nome_motorista === "Motorista" && nm !== "Motorista") atual.nome_motorista = nm;
      if (atual.nome_ajudante === "Ajudante" && na !== "Ajudante") atual.nome_ajudante = na;
      await executar(db, "UPDATE cam_caminhoes SET nome_motorista=?,nome_ajudante=? WHERE id=?", atual.nome_motorista, atual.nome_ajudante, atual.id);
    }
  }
  const despesas = Array.isArray(p.despesas) ? p.despesas : [];
  const vales = Array.isArray(p.vales) ? p.vales : [];
  const lembretes = Array.isArray(p.lembretes) ? p.lembretes : [];
  for (const d of despesas) placasUsadas.add(String(d.placa || "").toUpperCase());
  for (const placa of placasUsadas) if (!porPlaca[placa]) throw new Error(`O caminhão ${placa} não está no arquivo nem no sistema.`);

  // Lançamentos: o mesmo id substitui o anterior, então importar duas vezes não duplica.
  const comandos = [];
  for (const l of lancamentos) {
    const cam = porPlaca[String(l.placa || "").toUpperCase()];
    const id = texto(l, "id", true, "id").slice(0, 80);
    const data = dataValida(l, "data");
    const kmIni = kmOpcional(l, "km_inicial");
    let kmFim = kmOpcional(l, "km_final");
    if (l.pernoite && kmIni !== null && kmFim === null) kmFim = kmIni;
    if (kmIni !== null && kmFim !== null && kmFim < kmIni) kmFim = null;
    const quem = (chave, padrao) => { const v = texto(l, chave); return semAcento(v) === semAcento(padrao) ? "" : v; };
    comandos.push(db.prepare("DELETE FROM cam_lancamentos WHERE id=?").bind(id));
    comandos.push(db.prepare(
      "INSERT INTO cam_lancamentos (id,caminhao_id,data,regiao,km_inicial,km_final,pernoite,valor_saida,diesel,frete,motorista,ajudante,nome_motorista,nome_ajudante,obs) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    ).bind(id, cam.id, data, texto(l, "regiao"), kmIni, kmFim, l.pernoite ? 1 : 0, numero(l, "valor_saida"), numero(l, "diesel"), numero(l, "frete"),
      numero(l, "motorista"), numero(l, "ajudante"), quem("nome_motorista", cam.nome_motorista), quem("nome_ajudante", cam.nome_ajudante), texto(l, "obs")));
  }

  // Financeiro: a linha é achada por ano + grupo + nome (sem diferenciar maiúsculas/acentos).
  const linhasAtuais = await todos(db, "SELECT id,ano,grupo,nome,ordem FROM fin_linhas");
  const chave = (ano, grupo, nome) => `${ano}|${grupo}|${semAcento(nome)}`;
  const mapa = {}, maxOrdem = {};
  for (const l of linhasAtuais) {
    mapa[chave(l.ano, l.grupo, l.nome)] = l.id;
    maxOrdem[`${l.ano}|${l.grupo}`] = Math.max(maxOrdem[`${l.ano}|${l.grupo}`] || 0, l.ordem);
  }
  for (const l of linhas) {
    const ano = anoValido(l.ano), grupo = String(l.grupo || ""), nome = texto(l, "nome", true, "nome");
    if (!GRUPOS.includes(grupo)) throw new Error("Grupo inválido no arquivo.");
    let id = mapa[chave(ano, grupo, nome)];
    if (!id) {
      id = crypto.randomUUID();
      mapa[chave(ano, grupo, nome)] = id;
      const k = `${ano}|${grupo}`;
      maxOrdem[k] = (maxOrdem[k] || 0) + 1;
      comandos.push(db.prepare("INSERT INTO fin_linhas (id,ano,grupo,nome,ordem) VALUES (?,?,?,?,?)").bind(id, ano, grupo, nome, maxOrdem[k]));
    }
    for (const [mesTxt, bruto] of Object.entries(l.valores || {})) {
      const mes = mesValido(mesTxt), valor = numero({ v: bruto }, "v");
      comandos.push(valor === 0
        ? db.prepare("DELETE FROM fin_valores WHERE linha_id=? AND mes=?").bind(id, mes)
        : db.prepare("INSERT INTO fin_valores (linha_id,mes,valor) VALUES (?,?,?) ON CONFLICT(linha_id,mes) DO UPDATE SET valor=excluded.valor").bind(id, mes, valor));
    }
  }
  // Outras despesas, vales e lembretes: o mesmo id substitui o anterior.
  for (const d of despesas) {
    const id = texto(d, "id", true, "id").slice(0, 80), cam = porPlaca[String(d.placa || "").toUpperCase()];
    comandos.push(db.prepare("DELETE FROM cam_despesas WHERE id=?").bind(id));
    comandos.push(db.prepare("INSERT INTO cam_despesas (id,caminhao_id,data,categoria,valor,km,obs) VALUES (?,?,?,?,?,?,?)")
      .bind(id, cam.id, dataValida(d, "data"), texto(d, "categoria") || "Outros", numero(d, "valor"), kmOpcional(d, "km"), texto(d, "obs")));
  }
  for (const v of vales) {
    const id = texto(v, "id", true, "id").slice(0, 80);
    comandos.push(db.prepare("DELETE FROM cam_vales WHERE id=?").bind(id));
    comandos.push(db.prepare("INSERT INTO cam_vales (id,pessoa,data,valor,obs) VALUES (?,?,?,?,?)")
      .bind(id, texto(v, "pessoa", true, "pessoa"), dataValida(v, "data"), numero(v, "valor"), texto(v, "obs")));
  }
  for (const l of lembretes) {
    const id = texto(l, "id", true, "id").slice(0, 80), cam = l.placa ? porPlaca[String(l.placa).toUpperCase()] : null;
    comandos.push(db.prepare("DELETE FROM cam_lembretes WHERE id=?").bind(id));
    comandos.push(db.prepare("INSERT INTO cam_lembretes (id,caminhao_id,nome,tipo,a_cada_km,ultimo_km,vence_em,a_cada_meses,obs) VALUES (?,?,?,?,?,?,?,?,?)")
      .bind(id, cam ? cam.id : null, texto(l, "nome", true, "nome"), l.tipo === "data" ? "data" : "km", kmOpcional(l, "a_cada_km"), kmOpcional(l, "ultimo_km"),
        dataOpcional(l, "vence_em"), Number.isInteger(l.a_cada_meses) ? l.a_cada_meses : null, texto(l, "obs")));
  }
  if (p.config && typeof p.config === "object") {
    for (const [chave, valor] of Object.entries(p.config)) {
      if (!/^[a-z_]{1,40}$/.test(chave)) continue;
      const txt = JSON.stringify(valor);
      if (txt.length > 20000) continue;
      comandos.push(db.prepare("INSERT INTO config (chave,valor) VALUES (?,?) ON CONFLICT(chave) DO UPDATE SET valor=excluded.valor").bind(chave, txt));
    }
  }
  await emLotes(db, comandos);
  return { ok: true, lancamentos: lancamentos.length, linhas: linhas.length, despesas: despesas.length, vales: vales.length, lembretes: lembretes.length };
}

async function lerCorpo(request) {
  try { return await request.json(); } catch { throw new Error("Dados inválidos."); }
}

async function api(request, env, url) {
  const db = env.DB;
  if (!db) return json({ error: "O banco de dados ainda não está disponível." }, 500);
  const rota = url.pathname.slice("/api/".length);
  const metodo = request.method;
  try {
    if (rota === "dados" && metodo === "GET") return json(await dados(db, url));
    if (rota === "caminhao" && metodo === "POST") return json(await salvarCaminhao(db, await lerCorpo(request)));
    if (rota === "caminhao" && metodo === "DELETE") return json(await excluirCaminhao(db, url.searchParams.get("id") || ""));
    if (rota === "lancamento" && metodo === "POST") return json(await salvarLancamento(db, await lerCorpo(request)));
    if (rota === "lancamento" && metodo === "DELETE") {
      await executar(db, "DELETE FROM cam_lancamentos WHERE id=?", url.searchParams.get("id") || "");
      return json({ ok: true });
    }
    if (rota === "linha" && metodo === "POST") return json(await salvarLinha(db, await lerCorpo(request)));
    if (rota === "linha" && metodo === "DELETE") return json(await excluirLinha(db, url.searchParams.get("id") || ""));
    if (rota === "valor" && metodo === "POST") return json(await salvarValor(db, await lerCorpo(request)));
    if (rota === "valor/repetir" && metodo === "POST") return json(await repetirValor(db, await lerCorpo(request)));
    if (rota === "fechar" && metodo === "POST") return json(await fecharQuinzena(db, await lerCorpo(request)));
    if (rota === "despesa" && metodo === "POST") return json(await salvarDespesa(db, await lerCorpo(request)));
    if (rota === "despesa" && metodo === "DELETE") { await executar(db, "DELETE FROM cam_despesas WHERE id=?", url.searchParams.get("id") || ""); return json({ ok: true }); }
    if (rota === "vale" && metodo === "POST") return json(await salvarVale(db, await lerCorpo(request)));
    if (rota === "vale" && metodo === "DELETE") { await executar(db, "DELETE FROM cam_vales WHERE id=?", url.searchParams.get("id") || ""); return json({ ok: true }); }
    if (rota === "lembrete" && metodo === "POST") return json(await salvarLembrete(db, await lerCorpo(request)));
    if (rota === "lembrete" && metodo === "DELETE") { await executar(db, "DELETE FROM cam_lembretes WHERE id=?", url.searchParams.get("id") || ""); return json({ ok: true }); }
    if (rota === "lembrete/feito" && metodo === "POST") return json(await lembreteFeito(db, await lerCorpo(request)));
    if (rota === "config" && metodo === "POST") return json(await salvarConfig(db, await lerCorpo(request)));
    if (rota === "backup" && metodo === "GET") return json(await backup(db));
    if (rota === "importar" && metodo === "POST") return json(await importar(db, await lerCorpo(request)));
    return json({ error: "Rota não encontrada." }, 404);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro inesperado.";
    if (/no such table/i.test(msg)) return json({ error: "A atualização do banco ainda não foi aplicada." }, 500);
    return json({ error: msg }, 400);
  }
}

// ---------- Aplicativo instalável e uso sem internet ----------

const ICONE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#ee7a2c"/><g fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"><path d="M96 160h196v176H96zM292 216h72l56 64v56H292"/><circle cx="168" cy="352" r="34" fill="#ee7a2c"/><circle cx="364" cy="352" r="34" fill="#ee7a2c"/></g></svg>`;

const MANIFESTO = JSON.stringify({
  name: "Frota",
  short_name: "Frota",
  description: "Caminhões, quinzenas e financeiro",
  lang: "pt-BR",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#f2f5f7",
  theme_color: "#0f3d5c",
  icons: [{ src: "/icone.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }],
});

// Página e últimos dados ficam guardados no aparelho: abre mesmo sem sinal.
const SERVICE_WORKER = `
const CACHE = "frota-v1";
const GUARDAR = ["/", "/icone.svg", "/manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(GUARDAR)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (!(GUARDAR.includes(u.pathname) || u.pathname === "/api/dados")) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); }
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || new Response(JSON.stringify({ error: "Sem internet e sem dados guardados." }), { status: 503, headers: { "content-type": "application/json" } })))
  );
});
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return api(request, env, url);
    if (url.pathname === "/icone.svg") return new Response(ICONE, { headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=86400" } });
    if (url.pathname === "/manifest.webmanifest") return new Response(MANIFESTO, { headers: { "content-type": "application/manifest+json" } });
    if (url.pathname === "/sw.js") return new Response(SERVICE_WORKER, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" } });
    return new Response(page, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  },
};
