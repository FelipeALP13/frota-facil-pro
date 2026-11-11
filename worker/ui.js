// Atenção: este HTML fica dentro de String.raw. No script da página não use crase nem "${".
export const page = String.raw`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0f3d5c" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#121c22" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Frota">
<title>Frota</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#f2f5f7;--surface:#fff;--surface2:#f7f9fa;--ink:#13202a;--ink2:#46555f;--muted:#7a8892;--line:#e2e8ec;--line2:#edf1f4;
  --brand:#0f3d5c;--brand2:#165a85;--brand-soft:#e6f0f6;--accent:#ee7a2c;--accent-ink:#fff;--accent-soft:#fdeee2;
  --good:#16805a;--good-soft:#e3f4ec;--bad:#c23b49;--bad-soft:#fbe9eb;--warn:#a65f0f;--warn-soft:#fdf1df;
  --bar:#2f6f99;--bar-hover:#1f5a82;--shadow:0 1px 2px #0f3d5c14,0 4px 14px #0f3d5c0d;--radius:16px;
  --topo:#0f3d5c;--topo-ink:#fff;--topo-muted:#b9cfdd;
  color-scheme:light;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#0d151a;--surface:#152028;--surface2:#1a2730;--ink:#e6eef2;--ink2:#b3c2ca;--muted:#83939d;--line:#26353f;--line2:#1f2d36;
  --brand:#7fb6dc;--brand2:#9cc8e6;--brand-soft:#1c3242;--accent:#f28a43;--accent-ink:#1a0f06;--accent-soft:#3a271a;
  --good:#46b985;--good-soft:#16302a;--bad:#e8737e;--bad-soft:#3a1e23;--warn:#e0a24f;--warn-soft:#382a17;
  --bar:#5e9fca;--bar-hover:#8bbfe0;--shadow:0 1px 2px #0006;--topo:#121c22;--topo-ink:#e6eef2;--topo-muted:#8fa3af;color-scheme:dark}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-size:15px;line-height:1.4;-webkit-font-smoothing:antialiased}
button,input,select{font:inherit;color:inherit}button{cursor:pointer;-webkit-tap-highlight-color:transparent}
.ic{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.num{font-variant-numeric:tabular-nums}

/* Topo e navegação */
.topo{position:sticky;top:0;z-index:30;background:var(--topo);color:var(--topo-ink);padding:0 20px;padding-top:env(safe-area-inset-top)}
.topo-in{max-width:1240px;margin:0 auto;height:60px;display:flex;align-items:center;gap:22px}
.marca{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;letter-spacing:-.01em}
.marca i{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--accent);color:#fff}
.nav-topo{display:flex;gap:4px;flex:1}.nav-topo button{display:flex;align-items:center;gap:8px;border:0;background:none;color:var(--topo-muted);padding:9px 14px;border-radius:10px;font-weight:600}
.nav-topo button:hover{color:var(--topo-ink);background:#ffffff12}.nav-topo button.ativo{color:var(--topo-ink);background:#ffffff1f}
.ano{display:flex;align-items:center;gap:2px;font-weight:700}.ano button{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:9px;background:#ffffff14;color:var(--topo-ink)}
.ano span{min-width:52px;text-align:center}
.titulo-cel{display:none;font-weight:800;font-size:18px;flex:1}
.nav-baixo{display:none}
main{max-width:1240px;margin:0 auto;padding:22px 20px 60px}

/* Blocos */
.cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.cab h1{margin:0;font-size:24px;letter-spacing:-.02em}.cab p{margin:2px 0 0;color:var(--muted)}
.cartao{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
.secao{margin-bottom:18px;overflow:hidden}
.secao-cab{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid var(--line2);flex-wrap:wrap}
.secao-cab h2{margin:0;font-size:16px;display:flex;align-items:baseline;gap:8px}.secao-cab h2 small{color:var(--muted);font-weight:500;font-size:13px}
.secao-cab .direita{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.resumo-linha{color:var(--ink2);font-size:13px}.resumo-linha b{color:var(--ink)}
.blocos{display:grid;gap:18px}

/* Indicadores */
.tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}
.tile{padding:14px 16px}.tile small{display:block;color:var(--muted);font-weight:600;font-size:12.5px;margin-bottom:4px}
.tile b{display:block;font-size:22px;letter-spacing:-.02em;font-weight:800}.tile span{display:block;color:var(--muted);font-size:12.5px;margin-top:2px}
.pos{color:var(--good)}.neg{color:var(--bad)}

/* Botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:40px;border:1px solid var(--line);background:var(--surface);color:var(--ink);padding:8px 14px;border-radius:11px;font-weight:600;white-space:nowrap}
.btn:hover{background:var(--surface2)}.btn .ic{width:18px;height:18px}
.btn.prim{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}.btn.prim:hover{filter:brightness(.96)}
.btn.suave{background:var(--brand-soft);border-color:transparent;color:var(--brand)}
.btn.perigo{color:var(--bad)}.btn.so-ic{width:40px;padding:0}.btn.peq{min-height:34px;padding:6px 11px;font-size:14px}
.link{border:0;background:none;color:var(--brand2);font-weight:600;padding:6px 0;display:inline-flex;align-items:center;gap:6px}
.mesnav{display:flex;align-items:center;gap:6px}.mesnav b{min-width:150px;text-align:center;font-size:15px}

/* Caminhões: abas */
.abas{display:flex;gap:8px;overflow-x:auto;padding:2px;margin:0 -2px 16px;scrollbar-width:none}.abas::-webkit-scrollbar{display:none}
.aba{display:flex;flex-direction:column;align-items:flex-start;gap:1px;min-width:132px;padding:10px 14px;border:1px solid var(--line);background:var(--surface);border-radius:14px;text-align:left}
.aba b{font-size:15px;letter-spacing:.02em}.aba small{color:var(--muted);font-size:12.5px}
.aba.ativa{border-color:var(--brand2);background:var(--brand-soft);box-shadow:inset 0 0 0 1px var(--brand2)}.aba.ativa b{color:var(--brand)}
.aba.nova{align-items:center;justify-content:center;min-width:64px;color:var(--brand2)}

/* Tabelas */
.rolar{overflow-x:auto}
table{border-collapse:collapse;width:100%}
th,td{padding:10px 12px;text-align:right;white-space:nowrap;border-bottom:1px solid var(--line2)}
th{font-size:12px;font-weight:600;color:var(--muted);background:var(--surface2);position:sticky;top:0}
th.e,td.e{text-align:left}td.fraco{color:var(--muted)}
tbody tr.clica{cursor:pointer}tbody tr.clica:hover td{background:var(--surface2)}
tr.total td{font-weight:700;background:var(--surface2);border-bottom:0}
.tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.03em;padding:3px 7px;border-radius:6px;background:var(--brand-soft);color:var(--brand)}
.tag.laranja{background:var(--accent-soft);color:var(--accent)}.tag.verde{background:var(--good-soft);color:var(--good)}.tag.amarela{background:var(--warn-soft);color:var(--warn)}
small.quem{display:block;font-size:11.5px;font-weight:600;color:var(--accent)}

/* Lista (celular) */
.lista{display:grid}
.item{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;width:100%;padding:12px 16px;border:0;border-bottom:1px solid var(--line2);background:none;text-align:left}
.item:last-child{border-bottom:0}.item:active{background:var(--surface2)}
.dia{display:grid;justify-items:center;line-height:1.1}.dia b{font-size:19px;font-weight:800}.dia small{color:var(--muted);font-size:11.5px;text-transform:uppercase;font-weight:600}
.item-tit{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item-sub{color:var(--muted);font-size:13px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:2px}
.item-val{text-align:right}.item-val b{display:block;font-weight:800}.item-val small{color:var(--muted);font-size:12.5px}
.vazio{padding:26px 16px;text-align:center;color:var(--muted)}.vazio .btn{margin-top:10px}

/* Início */
.saudacao h1{font-size:26px}
.camgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-bottom:18px}
.camcard{padding:16px;display:grid;gap:12px}
.camcard-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.camcard-top b{font-size:18px;letter-spacing:.02em}.camcard-top small{display:block;color:var(--muted)}
.mini{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.mini div{background:var(--surface2);border-radius:11px;padding:8px 10px}
.mini small{display:block;color:var(--muted);font-size:11.5px;font-weight:600}.mini b{font-size:15px}
.camcard .acoes-card{display:flex;gap:8px}.camcard .acoes-card .btn{flex:1}
.aviso-card{display:flex;gap:14px;align-items:center;padding:16px;margin-bottom:18px;flex-wrap:wrap}
.aviso-card .ic-box{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--accent-soft);color:var(--accent);flex:none}
.aviso-card.ok .ic-box{background:var(--good-soft);color:var(--good)}
.aviso-card div.txt{flex:1;min-width:200px}.aviso-card b{display:block}.aviso-card span{color:var(--muted);font-size:13.5px}
.banner{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:12px 16px;margin-bottom:16px;background:var(--warn-soft);color:var(--warn);border-radius:12px;font-weight:600;flex-wrap:wrap}

/* Financeiro */
.fin td,.fin th{padding:0}.fin th{padding:9px 10px}
.fin th.mes-col button{border:0;background:none;font:inherit;color:inherit;font-weight:600;padding:2px 6px;border-radius:6px}
.fin th.mes-col.sel{color:var(--accent);box-shadow:inset 0 -2px 0 var(--accent)}
.fin td.nome{padding:6px 12px;min-width:190px;position:sticky;left:0;background:var(--surface);z-index:1;text-align:left}
.fin th:first-child{position:sticky;left:0;z-index:2}
.fin td.sel{background:color-mix(in srgb,var(--accent) 5%,transparent)}
.fin input{width:100%;min-width:96px;border:0;background:transparent;text-align:right;padding:9px 10px;border-radius:0;font-variant-numeric:tabular-nums}
.fin input:hover{background:var(--surface2)}.fin input:focus{outline:2px solid var(--accent);outline-offset:-2px;background:var(--accent-soft)}
.fin td.calc{padding:9px 10px}
.fin tr.grupo td{background:var(--surface2);padding:10px 12px;font-weight:800;font-size:12.5px;letter-spacing:.04em;color:var(--ink2);text-align:left}
.fin tr.grupo td .link{font-size:13px;letter-spacing:0;margin-left:12px;padding:0}
.fin tr.ref td{color:var(--muted);font-size:12.5px}.fin tr.ref td.nome{font-style:italic}
.fin tr.tot td{font-weight:700}.fin tr.tot td.nome{background:var(--surface)}
.nome-linha{border:0;background:none;padding:0;text-align:left;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:6px}
.nome-linha:hover{color:var(--brand2)}.nome-linha .ic{width:14px;height:14px;opacity:.45}
.fin-lista .linha{display:flex;align-items:center;gap:10px;padding:4px 8px 4px 16px;border-bottom:1px solid var(--line2);min-height:50px}
.fin-lista .linha:last-child{border-bottom:0}.fin-lista .linha .nome-linha{flex:1;font-weight:500}
.fin-lista .linha input{width:132px;border:1px solid var(--line);border-radius:10px;padding:9px 10px;text-align:right;background:var(--surface2);font-variant-numeric:tabular-nums;font-size:16px}
.fin-lista .linha input:focus{outline:2px solid var(--accent);background:var(--surface)}
.fin-lista .linha.tot{font-weight:800;background:var(--surface2);padding-right:16px}.fin-lista .linha.tot span:first-child{flex:1}
.fin-lista .linha.ref{color:var(--muted);font-size:13px;min-height:38px;padding-right:16px}.fin-lista .linha.ref span:first-child{flex:1}
.fin-lista .add{padding:8px 16px 12px}

/* Gráfico */
.grafico{position:relative;padding:8px 16px 14px}.grafico svg{display:block;width:100%;height:auto;overflow:visible}
.grafico .barra{fill:var(--bar);transition:fill .12s}.grafico g.col:hover .barra,.grafico g.col:focus .barra{fill:var(--bar-hover)}
.grafico g.col{outline:none;cursor:default}.grafico text{fill:var(--muted);font-size:11px;font-family:inherit}.grafico text.val{fill:var(--ink2);font-weight:700}
.grafico line{stroke:var(--line2);stroke-width:1}.grafico line.base{stroke:var(--line)}
.dica-graf{position:absolute;pointer-events:none;background:var(--ink);color:var(--surface);padding:8px 10px;border-radius:9px;font-size:12.5px;line-height:1.45;white-space:nowrap;opacity:0;transition:opacity .1s;transform:translate(-50%,-100%);z-index:3}
.dica-graf b{display:block;font-size:13px}
.camres{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:18px}.camres .cartao{padding:14px 16px}
.camres b.placa{display:block;font-size:16px;margin-bottom:6px}.camres dl{margin:0;display:grid;grid-template-columns:1fr auto;gap:4px 10px;font-size:13.5px}
.camres dt{color:var(--muted)}.camres dd{margin:0;text-align:right;font-weight:600}

/* Janelas */
dialog{border:0;padding:0;border-radius:20px;width:min(600px,94vw);max-height:90vh;background:var(--surface);color:var(--ink);box-shadow:0 20px 60px #0005}
dialog::backdrop{background:#0b1a24a6;backdrop-filter:blur(2px)}
dialog form{display:flex;flex-direction:column;max-height:90vh;margin:0}
.j-cab{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:18px 20px 10px}
.j-cab h3{margin:0;font-size:19px;letter-spacing:-.01em}.j-cab small{display:block;color:var(--muted);font-weight:500;font-size:13px}
.j-corpo{padding:6px 20px 16px;overflow-y:auto;display:grid;gap:16px}
.j-rodape{display:flex;gap:8px;justify-content:flex-end;padding:12px 20px calc(14px + env(safe-area-inset-bottom));border-top:1px solid var(--line2);background:var(--surface)}
.j-rodape .btn.perigo{margin-right:auto}
.grupo-campos{display:grid;gap:10px}.grupo-campos>h4{margin:0;font-size:12.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
.dois{display:grid;grid-template-columns:1fr 1fr;gap:10px}
label.campo{display:grid;gap:5px;font-size:13px;font-weight:600;color:var(--ink2)}
.campo input,.campo select,.entrada{width:100%;border:1px solid var(--line);border-radius:11px;padding:11px 12px;font-size:16px;background:var(--surface2);color:var(--ink)}
.campo input:focus,.campo select:focus{outline:2px solid var(--accent);outline-offset:-1px;background:var(--surface)}
.campo input:disabled{opacity:.5}
.dinheiro{position:relative}.dinheiro span{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);font-weight:600;font-size:14px;pointer-events:none}
.dinheiro input{padding-left:38px;text-align:right;font-variant-numeric:tabular-nums}
.chips{display:flex;gap:6px;flex-wrap:wrap}
.chip{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:6px 12px;font-size:13.5px;font-weight:600;color:var(--ink2)}
.chip:hover{border-color:var(--brand2);color:var(--brand)}.chip.on{background:var(--brand-soft);border-color:var(--brand2);color:var(--brand)}
.seg{display:grid;grid-template-columns:1fr 1fr;background:var(--surface2);border:1px solid var(--line);border-radius:12px;padding:3px}
.seg button{border:0;background:none;padding:10px;border-radius:9px;font-weight:700;color:var(--muted)}
.seg button[aria-pressed=true]{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px #0002}
.calc-km{background:var(--brand-soft);color:var(--brand);border-radius:11px;padding:10px 12px;font-size:14px}
.nota{color:var(--muted);font-size:13px;margin:0}
.fecha-item{display:grid;grid-template-columns:auto 1fr 130px;gap:8px 12px;align-items:center;border:1px solid var(--line);border-radius:14px;padding:12px}
.fecha-item.marcado{border-color:var(--brand2);background:var(--brand-soft)}
.fecha-item input[type=checkbox]{width:22px;height:22px;accent-color:var(--accent)}
.fecha-item b{display:block}.fecha-item small{color:var(--muted)}
.fecha-item select{grid-column:2/-1;border:1px solid var(--line);border-radius:10px;padding:8px;background:var(--surface);font-size:14px}
.fecha-item .estado{grid-column:2/-1;font-size:12.5px;color:var(--muted)}.fecha-item .estado.alerta{color:var(--bad);font-weight:600}

/* Avisos */
#aviso{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:var(--ink);color:var(--surface);padding:11px 16px;border-radius:12px;opacity:0;pointer-events:none;transition:.18s;z-index:100;max-width:90vw;font-weight:600;display:flex;gap:8px;align-items:center}
#aviso.on{opacity:1;transform:translate(-50%,0)}#aviso.erro{background:var(--bad);color:#fff}
.fab{display:none}
.carregando{display:grid;place-items:center;min-height:50vh;color:var(--muted)}
.giro{width:28px;height:28px;border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:g .8s linear infinite}@keyframes g{to{transform:rotate(360deg)}}

@media (max-width:899px){
  .topo{padding:0 14px;padding-top:env(safe-area-inset-top)}.topo-in{height:54px;gap:10px}
  .nav-topo,.marca span{display:none}.titulo-cel{display:block}
  .nav-baixo{display:grid;grid-template-columns:repeat(4,1fr);position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--surface);border-top:1px solid var(--line);padding-bottom:env(safe-area-inset-bottom)}
  .nav-baixo button{display:grid;justify-items:center;gap:3px;border:0;background:none;padding:9px 0 8px;color:var(--muted);font-size:11.5px;font-weight:600}
  .nav-baixo button.ativo{color:var(--accent)}.nav-baixo .ic{width:23px;height:23px}
  main{padding:16px 14px calc(150px + env(safe-area-inset-bottom))}
  .cab h1{font-size:21px}.saudacao h1{font-size:22px}
  .tiles{grid-template-columns:1fr 1fr;gap:10px}.tile b{font-size:19px}
  .fab{display:flex;align-items:center;gap:8px;position:fixed;right:16px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:29;border:0;background:var(--accent);color:var(--accent-ink);font-weight:800;padding:14px 20px;border-radius:999px;box-shadow:0 8px 22px #ee7a2c55}
  .fab.escondido{display:none}
  .so-pc{display:none!important}.mesnav{width:100%;justify-content:space-between}.mesnav b{min-width:0}
  .cab:not(.saudacao) h1{display:none}.cab{margin-bottom:12px}
  .cab-cam{margin-bottom:12px;gap:10px}.cab-cam .cab-txt{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%}.cab-cam .cab-txt p{margin:0}
  .tile{padding:11px 13px}.tile span{font-size:12px}.secao-cab{padding:12px 14px;flex-wrap:nowrap}.abas{margin-bottom:12px}
  dialog{width:100%;max-width:100%;margin:auto 0 0;border-radius:20px 20px 0 0;max-height:94vh}dialog form{max-height:94vh}
  .fecha-item{grid-template-columns:auto 1fr}.fecha-item .dinheiro{grid-column:2/-1}
}
@media (min-width:900px){.so-cel{display:none!important}}
</style></head><body>
<header class="topo"><div class="topo-in">
  <div class="marca"><i><svg class="ic" viewBox="0 0 24 24"><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></svg></i><span>Frota</span></div>
  <div class="titulo-cel" id="tituloCel">Frota</div>
  <nav class="nav-topo" id="navTopo" aria-label="Seções"></nav>
  <div class="ano"><button id="anoMenos" aria-label="Ano anterior"><svg class="ic" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><span id="anoTxt"></span><button id="anoMais" aria-label="Próximo ano"><svg class="ic" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div>
</div></header>
<main id="tela"><div class="carregando"><div class="giro"></div></div></main>
<button class="fab escondido" id="fab"><svg class="ic" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Lançar dia</button>
<nav class="nav-baixo" id="navBaixo" aria-label="Seções"></nav>
<dialog id="janela"></dialog><dialog id="janela2"></dialog>
<div id="aviso" role="status" aria-live="polite"></div>
<script>
var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var CURTO=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
var SEMANA=["dom","seg","ter","qua","qui","sex","sáb"],SEMANA_LONGA=["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
var ABAS=[["inicio","Início","inicio"],["caminhoes","Caminhões","caminhao"],["financeiro","Financeiro","carteira"],["resumo","Resumo","grafico"]];
var ICONES={inicio:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',caminhao:'<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  carteira:'<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l12-3v3"/><circle cx="16.5" cy="13.5" r="1.2"/>',grafico:'<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>',
  mais:'<path d="M12 5v14M5 12h14"/>',lapis:'<path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4"/>',esq:'<path d="M15 5l-7 7 7 7"/>',dir:'<path d="M9 5l7 7-7 7"/>',
  check:'<path d="M5 12l5 5 9-10"/>',alerta:'<path d="M12 4l9 16H3zM12 10v4M12 17v.5"/>',baixar:'<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',subir:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  fechar:'<path d="M6 6l12 12M18 6L6 18"/>',lista:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.5M4 12h.5M4 18h.5"/>'};
function ic(n){return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+ICONES[n]+"</svg>"}
var hoje=new Date();
var st={ano:hoje.getFullYear(),mes:hoje.getMonth()+1,aba:"inicio",cam:null,d:null};
try{var salvo=JSON.parse(localStorage.getItem("frota-tela")||"{}");if(salvo.aba)st.aba=salvo.aba;if(salvo.cam)st.cam=salvo.cam}catch(e){}
function lembrar(){try{localStorage.setItem("frota-tela",JSON.stringify({aba:st.aba,cam:st.cam}))}catch(e){}}
function $(s){return document.querySelector(s)}function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function dinheiro(v){return Number(v||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}
function rs(v){v=Number(v||0);return (v<0?"−":"")+"R$ "+dinheiro(Math.abs(v))}
function km(v){return v==null||v===""?"":Number(v).toLocaleString("pt-BR")}
function cor(v){return v<-0.004?"neg":v>0.004?"pos":""}
function pc(){return window.matchMedia("(min-width:900px)").matches}
function dois(n){return String(n).padStart(2,"0")}
function lerNumero(t){t=String(t||"").replace(/[R$\s]/g,"");if(!t)return 0;var neg=t.charAt(0)==="-"||t.charAt(0)==="−";t=t.replace(/[-−]/g,"");
  if(t.indexOf(",")>=0)t=t.replace(/\./g,"").replace(",",".");else{var p=t.split(".");if(p.length>2||(p.length===2&&p[1].length===3))t=p.join("")}
  var n=Number(t);if(!isFinite(n))return NaN;return neg?-n:n}
function dinheiroCampo(v){return v?dinheiro(v):""}
function dataObj(iso){return new Date(Number(iso.slice(0,4)),Number(iso.slice(5,7))-1,Number(iso.slice(8,10)))}
function diasEntre(a,b){return Math.round((b-a)/86400000)}
function hojeZero(){return new Date(hoje.getFullYear(),hoje.getMonth(),hoje.getDate())}
function quando(iso){var d=diasEntre(dataObj(iso),hojeZero());if(d===0)return "Hoje";if(d===1)return "Ontem";if(d>1&&d<7)return "Há "+d+" dias";return iso.slice(8,10)+"/"+iso.slice(5,7)}
function nomeQ(mes,q){return (q===1?"1ª":"2ª")+" quinzena de "+MESES[mes-1].toLowerCase()}
var avisoT;function aviso(msg,erro){var a=$("#aviso");a.innerHTML=(erro?ic("alerta"):ic("check"))+"<span>"+esc(msg)+"</span>";a.className="on"+(erro?" erro":"");clearTimeout(avisoT);avisoT=setTimeout(function(){a.className=erro?"erro":""},erro?5000:2000)}
function api(metodo,caminho,corpo){return fetch("/api/"+caminho,{method:metodo,headers:corpo?{"content-type":"application/json"}:undefined,body:corpo?JSON.stringify(corpo):undefined})
  .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok)throw new Error(j.error||"Não foi possível salvar.");return j})})}
function carregar(){return api("GET","dados?ano="+st.ano).then(function(d){st.d=d;if(!d.caminhoes.some(function(c){return c.id===st.cam}))st.cam=d.caminhoes.length?d.caminhoes[0].id:null;desenhar()})
  .catch(function(e){$("#tela").innerHTML='<div class="cartao vazio"><b>Não foi possível carregar.</b><br>'+esc(e.message)+'<br><button class="btn" onclick="carregar()">Tentar de novo</button></div>'})}

/* ---------- Janelas: confirmar e perguntar ---------- */
function confirmar(o){return new Promise(function(ok){var j=$("#janela2");
  j.innerHTML='<form method="dialog"><div class="j-cab"><h3>'+esc(o.titulo)+'</h3></div><div class="j-corpo"><p class="nota" style="font-size:15px;color:var(--ink2)">'+esc(o.texto||"")+'</p></div><div class="j-rodape"><button type="button" class="btn" id="c2nao">Cancelar</button><button class="btn '+(o.perigo?"perigo":"prim")+'" id="c2sim">'+esc(o.ok||"Confirmar")+"</button></div></form>";
  var feito=false;function fim(v){if(feito)return;feito=true;j.close();ok(v)}
  $("#c2nao").onclick=function(){fim(false)};j.querySelector("form").onsubmit=function(e){e.preventDefault();fim(true)};j.onclose=function(){fim(false)};j.showModal()})}
function perguntar(o){return new Promise(function(ok){var j=$("#janela2");
  j.innerHTML='<form method="dialog"><div class="j-cab"><h3>'+esc(o.titulo)+'</h3></div><div class="j-corpo"><label class="campo">'+esc(o.rotulo)+'<input name="v" required autocomplete="off" value="'+esc(o.valor||"")+'"></label></div><div class="j-rodape"><button type="button" class="btn" id="c2nao">Cancelar</button><button class="btn prim">'+esc(o.ok||"Salvar")+"</button></div></form>";
  var feito=false,f=j.querySelector("form");function fim(v){if(feito)return;feito=true;j.close();ok(v)}
  $("#c2nao").onclick=function(){fim(null)};f.onsubmit=function(e){e.preventDefault();var v=f.v.value.trim();if(v)fim(v)};j.onclose=function(){fim(null)};j.showModal();f.v.focus()})}

/* ---------- Dados ---------- */
function caminhao(id){return st.d.caminhoes.find(function(c){return c.id===id})}
function doMes(camId,mes){var pre=st.ano+"-"+dois(mes);return st.d.lancamentos.filter(function(l){return(!camId||l.caminhao_id===camId)&&l.data.slice(0,7)===pre})}
function daQ(lista,q){return lista.filter(function(l){var d=Number(l.data.slice(8));return q===1?d<=15:d>15})}
function soma(lista,campo){return lista.reduce(function(s,l){return s+Number(l[campo]||0)},0)}
function gastos(lista){return soma(lista,"diesel")+soma(lista,"motorista")+soma(lista,"ajudante")}
function sobra(lista){return soma(lista,"frete")-gastos(lista)}
function kmRodado(lista){return lista.reduce(function(s,l){return s+(l.km_inicial!=null&&l.km_final!=null?Math.max(0,l.km_final-l.km_inicial):0)},0)}
function quemMot(c,l){return l.nome_motorista||c.nome_motorista}function quemAju(c,l){return l.nome_ajudante||c.nome_ajudante}
function pessoasConhecidas(){var s=new Set();st.d.caminhoes.forEach(function(c){s.add(c.nome_motorista);s.add(c.nome_ajudante)});st.d.lancamentos.forEach(function(l){if(l.nome_motorista)s.add(l.nome_motorista);if(l.nome_ajudante)s.add(l.nome_ajudante)});return Array.from(s).filter(Boolean).sort()}
function ultimoDe(camId){var l=st.d.lancamentos.filter(function(x){return x.caminhao_id===camId});return l.length?l[l.length-1]:null}
function kmAtual(camId){return (st.d.ultimoKm.find(function(x){return x.caminhao_id===camId})||{}).km}
function maisUsados(lista,fn,n){var c={},orig={};lista.forEach(function(l){var v=fn(l);if(v===""||v==null||v===0)return;var k=typeof v==="string"?v.trim().toUpperCase():v;c[k]=(c[k]||0)+1;orig[k]=typeof v==="string"?v.trim():v});
  return Object.keys(c).sort(function(a,b){return c[b]-c[a]}).slice(0,n).map(function(k){return orig[k]})}
function valor(linhaId,mes){var v=st.d.valores.find(function(x){return x.linha_id===linhaId&&x.mes===mes});return v?v.valor:0}
function linhasDe(g){return st.d.linhas.filter(function(l){return l.grupo===g})}
function totalGrupo(g,mes){return linhasDe(g).reduce(function(s,l){return s+valor(l.id,mes)},0)}
function freteQ(mes,q){return soma(daQ(doMes(null,mes),q),"frete")}
function saldos(mes){var q1=totalGrupo("rec1",mes)-totalGrupo("desp1",mes),q2=totalGrupo("rec2",mes)-totalGrupo("desp2",mes);return{q1:q1,q2:q2,mes:q1+q2,ent:totalGrupo("rec1",mes)+totalGrupo("rec2",mes),sai:totalGrupo("desp1",mes)+totalGrupo("desp2",mes)}}
function acumulado(mes){var s=0;for(var m=1;m<=mes;m++)s+=saldos(m).mes;return s}

/* ---------- Estrutura ---------- */
function montarNav(){var h="";ABAS.forEach(function(a){h+='<button data-aba="'+a[0]+'">'+ic(a[2])+"<span>"+a[1]+"</span></button>"});$("#navTopo").innerHTML=h;$("#navBaixo").innerHTML=h;
  $$("[data-aba]").forEach(function(b){b.onclick=function(){if(st.aba===b.dataset.aba)return;st.aba=b.dataset.aba;lembrar();window.scrollTo(0,0);desenhar()}})}
function desenhar(){
  $("#anoTxt").textContent=st.ano;
  $$("[data-aba]").forEach(function(b){b.classList.toggle("ativo",b.dataset.aba===st.aba);b.setAttribute("aria-current",b.dataset.aba===st.aba?"page":"false")});
  $("#tituloCel").textContent=(ABAS.find(function(a){return a[0]===st.aba})||ABAS[0])[1];
  $("#fab").classList.toggle("escondido",!(st.d&&st.cam&&st.aba==="caminhoes"));
  if(!st.d)return;
  if(st.aba==="inicio")telaInicio();else if(st.aba==="caminhoes")telaCaminhoes();else if(st.aba==="financeiro")telaFinanceiro();else telaResumo();
}
function mesNav(){return '<div class="mesnav"><button class="btn so-ic" data-mes="-1" aria-label="Mês anterior">'+ic("esq")+"</button><b>"+MESES[st.mes-1]+" "+st.ano+'</b><button class="btn so-ic" data-mes="1" aria-label="Próximo mês">'+ic("dir")+"</button></div>"}
function ligarMes(){$$("[data-mes]").forEach(function(b){b.onclick=function(){var m=st.mes+Number(b.dataset.mes);if(m<1){st.mes=12;st.ano--;carregar();return}if(m>12){st.mes=1;st.ano++;carregar();return}st.mes=m;desenhar()}})}
function tile(rot,val,extra,cls){return '<div class="cartao tile"><small>'+rot+'</small><b class="num '+(cls||"")+'">'+val+"</b>"+(extra?"<span>"+extra+"</span>":"")+"</div>"}

/* ---------- INÍCIO ---------- */
function quinzenaAnterior(){var m=hoje.getMonth()+1;if(hoje.getDate()>15)return{mes:m,q:1};if(m>1)return{mes:m-1,q:2};return null}
function telaInicio(){
  var d=st.d,h="",anoAtual=hoje.getFullYear()===st.ano;
  var hora=hoje.getHours(),ola=hora<12?"Bom dia":hora<18?"Boa tarde":"Boa noite";
  h+='<div class="cab saudacao"><div><h1>'+ola+'</h1><p>'+SEMANA_LONGA[hoje.getDay()]+", "+hoje.getDate()+" de "+MESES[hoje.getMonth()].toLowerCase()+"</p></div></div>";
  if(!anoAtual){h+='<div class="banner"><span>Você está vendo '+st.ano+'.</span><button class="btn peq" id="irHoje">Voltar para '+hoje.getFullYear()+"</button></div>";$("#tela").innerHTML=h;$("#irHoje").onclick=function(){st.ano=hoje.getFullYear();st.mes=hoje.getMonth()+1;carregar()};return}
  var mes=hoje.getMonth()+1,q=hoje.getDate()<=15?1:2,fimQ=q===1?15:new Date(st.ano,mes,0).getDate(),falta=fimQ-hoje.getDate();
  var lq=daQ(doMes(null,mes),q);
  h+='<div class="secao-cab" style="padding:0 2px 10px;border:0"><h2>'+nomeQ(mes,q).replace(/^./,function(c){return c.toUpperCase()})+'</h2><span class="resumo-linha">'+(falta===0?"termina hoje":"faltam "+falta+(falta===1?" dia":" dias"))+"</span></div>";
  var s=saldos(mes);
  h+='<div class="tiles">'+tile("Frete na quinzena",rs(soma(lq,"frete")),lq.length+(lq.length===1?" dia lançado":" dias lançados"))+tile("Gastos",rs(gastos(lq)),"diesel e diárias")+tile("Sobra",rs(sobra(lq)),"frete − gastos",cor(sobra(lq)))+tile("Saldo do mês",rs(s.mes),"no financeiro",cor(s.mes))+"</div>";
  // Fechamento da quinzena anterior
  var qa=quinzenaAnterior();
  if(qa){var it=itensFechamento(qa.mes,qa.q);if(it.dias){var pend=it.itens.filter(function(x){return x.valor&&!(x.linha&&Math.abs(valor(x.linha,qa.mes)-x.valor)<0.005)}).length;
    h+='<div class="cartao aviso-card'+(pend?"":" ok")+'"><div class="ic-box">'+ic(pend?"lista":"check")+'</div><div class="txt"><b>'+(pend?"Fechar a "+nomeQ(qa.mes,qa.q):"A "+nomeQ(qa.mes,qa.q)+" já está no financeiro")+"</b><span>"+(pend?pend+(pend===1?" valor ainda não lançado":" valores ainda não lançados")+" no financeiro (frete e pagamentos).":"Frete e pagamentos conferidos.")+'</span></div><button class="btn '+(pend?"prim":"")+'" id="fecharAnterior">'+(pend?"Fechar quinzena":"Ver")+"</button></div>"}}
  // Caminhões
  h+='<div class="secao-cab" style="padding:4px 2px 10px;border:0"><h2>Caminhões</h2></div><div class="camgrid">';
  d.caminhoes.forEach(function(c){var lc=lq.filter(function(l){return l.caminhao_id===c.id}),u=ultimoDe(c.id),k=kmAtual(c.id);
    var atraso=u?diasEntre(dataObj(u.data),hojeZero()):null;
    h+='<div class="cartao camcard"><div class="camcard-top"><div><b>'+esc(c.placa)+"</b><small>"+esc(c.nome_motorista)+" · "+esc(c.nome_ajudante)+"</small></div>"+
      (u?'<span class="tag '+(atraso>=3?"amarela":"verde")+'">'+esc(quando(u.data))+(u.regiao?" · "+esc(u.regiao):"")+"</span>":'<span class="tag">Sem lançamentos</span>')+"</div>"+
      '<div class="mini"><div><small>Dias</small><b class="num">'+lc.length+'</b></div><div><small>Frete</small><b class="num">'+dinheiro(soma(lc,"frete")).replace(/,\d\d$/,"")+'</b></div><div><small>KM atual</small><b class="num">'+(k?km(k):"—")+"</b></div></div>"+
      '<div class="acoes-card"><button class="btn" data-ver="'+esc(c.id)+'">Ver mês</button><button class="btn prim" data-lancar="'+esc(c.id)+'">'+ic("mais")+"Lançar dia</button></div></div>"});
  h+="</div>";
  // Recentes
  var rec=d.lancamentos.slice(-6).reverse();
  if(rec.length){h+='<div class="cartao secao"><div class="secao-cab"><h2>Últimos lançamentos</h2></div><div class="lista">';rec.forEach(function(l){h+=itemLista(l,true)});h+="</div></div>"}
  $("#tela").innerHTML=h;
  if($("#fecharAnterior"))$("#fecharAnterior").onclick=function(){fechamento(qa.mes,qa.q)};
  $$("[data-ver]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.ver;st.aba="caminhoes";st.mes=hoje.getMonth()+1;lembrar();window.scrollTo(0,0);desenhar()}});
  $$("[data-lancar]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.lancar;st.mes=hoje.getMonth()+1;lembrar();formLancamento(null,0)}});
  ligarItens();
}

/* ---------- CAMINHÕES ---------- */
function itemLista(l,comPlaca){var c=caminhao(l.caminhao_id)||{},dt=dataObj(l.data),sub=[];
  if(comPlaca)sub.push('<span class="tag">'+esc(c.placa)+"</span>");
  if(l.pernoite)sub.push('<span class="tag laranja">PERNOITE</span>');else if(l.km_inicial!=null&&l.km_final!=null){var r=l.km_final-l.km_inicial;sub.push(km(r)+" km"+(r-c.km_franquia>0?" · +"+km(r-c.km_franquia)+" exced.":""))}
  if(l.nome_motorista||l.nome_ajudante)sub.push('<span style="color:var(--accent);font-weight:600">'+esc([l.nome_motorista,l.nome_ajudante].filter(Boolean).join(", "))+"</span>");
  return '<button class="item" data-id="'+esc(l.id)+'"><div class="dia"><b>'+dois(dt.getDate())+"</b><small>"+(comPlaca?CURTO[dt.getMonth()]:SEMANA[dt.getDay()])+'</small></div><div style="min-width:0"><div class="item-tit">'+(esc(l.regiao)||'<span style="color:var(--muted)">Sem região</span>')+'</div><div class="item-sub">'+sub.join(" ")+'</div></div><div class="item-val"><b class="num">'+rs(l.frete)+'</b><small class="num">'+(l.diesel?"diesel "+dinheiro(l.diesel):"sem diesel")+"</small></div></button>"}
function ligarItens(){$$(".item[data-id],tr.clica[data-id]").forEach(function(el){el.onclick=function(){formLancamento(st.d.lancamentos.find(function(l){return l.id===el.dataset.id}))}})}
function telaCaminhoes(){
  var d=st.d,c=caminhao(st.cam),h='<div class="abas" role="tablist">';
  d.caminhoes.forEach(function(x){h+='<button class="aba'+(x.id===st.cam?" ativa":"")+'" role="tab" aria-selected="'+(x.id===st.cam)+'" data-cam="'+esc(x.id)+'"><b>'+esc(x.placa)+"</b><small>"+esc(x.nome_motorista)+"</small></button>"});
  h+='<button class="aba nova" id="novoCam" aria-label="Novo caminhão">'+ic("mais")+"</button></div>";
  if(!c){$("#tela").innerHTML=h+'<div class="cartao vazio">Cadastre um caminhão para começar.</div>';ligarCam();return}
  h+='<div class="cab cab-cam"><div class="cab-txt"><h1 class="so-pc">'+esc(c.placa)+'</h1><p>'+esc(c.nome_motorista)+" e "+esc(c.nome_ajudante)+" · KM "+(kmAtual(c.id)?km(kmAtual(c.id)):"—")+'</p><button class="btn so-ic so-cel" id="editCam2" aria-label="Editar caminhão">'+ic("lapis")+'</button></div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex:1;justify-content:flex-end"><button class="btn so-pc" id="editCam">'+ic("lapis")+"<span>Editar caminhão</span></button>"+mesNav()+"</div></div>";
  var mes=doMes(c.id,st.mes);
  h+='<div class="tiles">'+tile("Frete do mês",rs(soma(mes,"frete")),mes.length+(mes.length===1?" dia":" dias"))+tile("Diesel",rs(soma(mes,"diesel")),km(kmRodado(mes))+" km rodados")+tile("Diárias",rs(soma(mes,"motorista")+soma(mes,"ajudante")),"mot. "+dinheiro(soma(mes,"motorista")).replace(/,00$/,"")+" · aj. "+dinheiro(soma(mes,"ajudante")).replace(/,00$/,""))+tile("Sobra (frete − gastos)",rs(sobra(mes)),"",cor(sobra(mes)))+"</div>";
  h+='<div class="blocos">'+blocoQ(c,daQ(mes,1),1)+blocoQ(c,daQ(mes,2),2)+"</div>";
  $("#tela").innerHTML=h;ligarCam();
}
function blocoQ(c,lista,q){
  var h='<section class="cartao secao"><div class="secao-cab"><h2>'+(q===1?"1ª quinzena":"2ª quinzena")+"<small>"+(q===1?"01 a 15":"16 a 31")+'</small></h2><div class="direita"><span class="resumo-linha so-pc">Frete <b class="num">'+rs(soma(lista,"frete"))+'</b> · diesel <b class="num">'+dinheiro(soma(lista,"diesel"))+'</b></span><button class="btn peq" data-fechar="'+q+'">'+ic("lista")+'Fechar</button><button class="btn peq prim so-pc" data-novo="'+(q===1?1:16)+'">'+ic("mais")+"Lançar dia</button></div></div>";
  if(!lista.length)return h+'<div class="vazio">Nenhum dia lançado nesta quinzena.</div></section>';
  if(!pc()){h+='<div class="lista">';lista.forEach(function(l){h+=itemLista(l,false)});
    return h+'</div><div class="secao-cab" style="border-top:1px solid var(--line2);border-bottom:0"><span class="resumo-linha">'+lista.length+(lista.length===1?" dia":" dias")+'</span><span class="resumo-linha">'+esc(c.nome_motorista)+" <b>"+dinheiro(soma(lista,"motorista"))+"</b> · "+esc(c.nome_ajudante)+" <b>"+dinheiro(soma(lista,"ajudante"))+"</b></span></div></section>"}
  h+='<div class="rolar"><table><thead><tr><th class="e">Dia</th><th class="e">Região</th><th>KM inicial</th><th>KM final</th><th>Excedente</th><th>Saída</th><th>Diesel</th><th>Frete</th><th>'+esc(c.nome_motorista)+"</th><th>"+esc(c.nome_ajudante)+'</th><th class="e">Obs</th></tr></thead><tbody>';
  lista.forEach(function(l){var dt=dataObj(l.data),ex=l.pernoite?'<span class="tag laranja">PERNOITE</span>':(l.km_inicial!=null&&l.km_final!=null?km(l.km_final-l.km_inicial-c.km_franquia):"");
    h+='<tr class="clica" data-id="'+esc(l.id)+'"><td class="e"><b>'+dois(dt.getDate())+'</b> <span style="color:var(--muted)">'+SEMANA[dt.getDay()]+'</span></td><td class="e">'+esc(l.regiao)+'</td><td class="num fraco">'+km(l.km_inicial)+'</td><td class="num fraco">'+km(l.km_final)+'</td><td class="num">'+ex+'</td><td class="num">'+dinheiro(l.valor_saida)+'</td><td class="num">'+dinheiro(l.diesel)+'</td><td class="num"><b>'+dinheiro(l.frete)+'</b></td><td class="num">'+dinheiro(l.motorista)+(l.nome_motorista?'<small class="quem">'+esc(l.nome_motorista)+"</small>":"")+'</td><td class="num">'+dinheiro(l.ajudante)+(l.nome_ajudante?'<small class="quem">'+esc(l.nome_ajudante)+"</small>":"")+'</td><td class="e fraco" style="max-width:220px;overflow:hidden;text-overflow:ellipsis">'+esc(l.obs)+"</td></tr>"});
  h+='<tr class="total"><td class="e" colspan="2">'+lista.length+(lista.length===1?" dia":" dias")+'</td><td></td><td></td><td></td><td></td><td class="num">'+dinheiro(soma(lista,"diesel"))+'</td><td class="num">'+dinheiro(soma(lista,"frete"))+'</td><td class="num">'+dinheiro(soma(lista,"motorista"))+'</td><td class="num">'+dinheiro(soma(lista,"ajudante"))+"</td><td></td></tr>";
  return h+"</tbody></table></div></section>";
}
function ligarCam(){
  ligarMes();ligarItens();
  $$("[data-cam]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.cam;lembrar();desenhar()}});
  $("#novoCam").onclick=function(){formCaminhao(null)};
  $$("#editCam,#editCam2").forEach(function(b){b.onclick=function(){formCaminhao(caminhao(st.cam))}});
  $$("[data-novo]").forEach(function(b){b.onclick=function(){formLancamento(null,Number(b.dataset.novo))}});
  $$("[data-fechar]").forEach(function(b){b.onclick=function(){fechamento(st.mes,Number(b.dataset.fechar))}});
}

/* ---------- Formulários ---------- */
function campo(rot,nome,val,attr,cls){return '<label class="campo '+(cls||"")+'">'+rot+'<input name="'+nome+'" value="'+esc(val==null?"":val)+'" '+(attr||"")+"></label>"}
function campoRS(rot,nome,val){return '<label class="campo">'+rot+'<div class="dinheiro"><span>R$</span><input name="'+nome+'" inputmode="decimal" autocomplete="off" value="'+esc(dinheiroCampo(val))+'"></div></label>'}
function janela(html){var j=$("#janela");j.innerHTML=html;j.showModal();return j}
function rodape(excluir,salvarTxt){return '<div class="j-rodape">'+(excluir?'<button type="button" class="btn perigo" id="excluir">Excluir</button>':"")+'<button type="button" class="btn" id="cancelar">Cancelar</button><button class="btn prim">'+(salvarTxt||"Salvar")+"</button></div>"}
function formLancamento(l,dia){
  var c=caminhao(l?l.caminhao_id:st.cam),novo=!l;if(!c)return;
  if(novo){var ult=ultimoDe(c.id),uk=kmAtual(c.id),dd;
    if(hoje.getFullYear()===st.ano&&hoje.getMonth()+1===st.mes&&(!dia||(dia===1?hoje.getDate()<=15:hoje.getDate()>15)))dd=hoje.getDate();else dd=dia||1;
    l={data:st.ano+"-"+dois(st.mes)+"-"+dois(dd),regiao:"",km_inicial:uk==null?"":uk,km_final:"",pernoite:0,valor_saida:ult?ult.valor_saida:0,diesel:0,frete:ult?ult.valor_saida:0,motorista:c.valor_motorista,ajudante:c.valor_ajudante,nome_motorista:"",nome_ajudante:"",obs:""}}
  var docam=st.d.lancamentos.filter(function(x){return x.caminhao_id===c.id});
  var regioes=maisUsados(docam.length?docam:st.d.lancamentos,function(x){return x.regiao},6);
  var saidas=maisUsados(docam,function(x){return x.valor_saida},4);
  var pern=!!l.pernoite;
  var j=janela('<form><div class="j-cab"><div><h3>'+(novo?"Lançar dia":"Editar dia")+"</h3><small>"+esc(c.placa)+" · "+esc(c.nome_motorista)+'</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    '<div class="dois">'+campo("Data","data",l.data,'type="date" required')+campo("Região","regiao",l.regiao,'autocomplete="off" list="regioes"')+"</div>"+
    (regioes.length?'<div class="chips" aria-label="Regiões mais usadas">'+regioes.map(function(r){r=r.toUpperCase();return '<button type="button" class="chip" data-regiao="'+esc(r)+'">'+esc(r)+"</button>"}).join("")+"</div>":"")+
    '<div class="grupo-campos"><h4>Quilometragem</h4><div class="seg" role="group"><button type="button" data-tipo="rodou" aria-pressed="'+!pern+'">Rodou</button><button type="button" data-tipo="pernoite" aria-pressed="'+pern+'">Pernoite</button></div>'+
    '<div class="dois">'+campo("KM inicial","km_inicial",km(l.km_inicial),'inputmode="numeric" autocomplete="off"')+campo("KM final","km_final",km(l.km_final),'inputmode="numeric" autocomplete="off"',"kmfim")+'</div><div class="calc-km" id="kmInfo"></div></div>'+
    '<div class="grupo-campos"><h4>Valores</h4><div class="dois">'+campoRS("Valor saída","valor_saida",l.valor_saida)+campoRS("Valor frete","frete",l.frete)+"</div>"+
    '<div class="chips">'+saidas.map(function(v){return '<button type="button" class="chip" data-saida="'+v+'">Saída '+dinheiro(v).replace(",00","")+"</button>"}).join("")+'<button type="button" class="chip" id="freteIgual">Frete = saída</button></div>'+
    campoRS("Diesel","diesel",l.diesel)+"</div>"+
    '<div class="grupo-campos"><h4>Equipe do dia</h4><div class="dois">'+campo("Motorista","nome_motorista",quemMot(c,l),'list="pessoas" autocomplete="off"')+campoRS("Diária","motorista",l.motorista)+"</div>"+
    '<div class="dois">'+campo("Ajudante","nome_ajudante",quemAju(c,l),'list="pessoas" autocomplete="off"')+campoRS("Diária","ajudante",l.ajudante)+'</div><div class="chips"><button type="button" class="chip" id="semAjudante">Sem ajudante hoje</button></div></div>'+
    campo("Observação","obs",l.obs,'autocomplete="off" placeholder="Ex.: toco 3.900"')+
    '<datalist id="regioes">'+maisUsados(st.d.lancamentos,function(x){return x.regiao},40).map(function(r){return '<option value="'+esc(r)+'">'}).join("")+'</datalist><datalist id="pessoas">'+pessoasConhecidas().map(function(n){return '<option value="'+esc(n)+'">'}).join("")+"</datalist>"+
    "</div>"+rodape(!novo,novo?"Salvar dia":"Salvar")+"</form>");
  var f=j.querySelector("form");
  function num(v){return Number(String(v).replace(/\D/g,""))}
  function atualiza(){$$("[data-tipo]").forEach(function(b){b.setAttribute("aria-pressed",String((b.dataset.tipo==="pernoite")===pern))});
    f.km_final.disabled=pern;j.querySelector(".kmfim").style.display=pern?"none":"";
    var a=num(f.km_inicial.value),b=num(f.km_final.value),info=$("#kmInfo");
    if(pern)info.innerHTML="Pernoite: o caminhão não rodou. KM final = KM inicial.";
    else if(f.km_inicial.value&&f.km_final.value){var r=b-a;info.innerHTML=r<0?'<b style="color:var(--bad)">KM final menor que o inicial</b>':"Rodou <b>"+km(r)+" km</b> · excedente <b>"+km(r-c.km_franquia)+" km</b> <span style=\"opacity:.7\">(franquia "+c.km_franquia+" km)</span>"}
    else info.innerHTML="Preencha os KMs para calcular o excedente."}
  $$("[data-tipo]").forEach(function(b){b.onclick=function(){pern=b.dataset.tipo==="pernoite";atualiza()}});
  f.km_inicial.oninput=atualiza;f.km_final.oninput=atualiza;atualiza();
  $$("[data-regiao]").forEach(function(b){b.onclick=function(){f.regiao.value=b.dataset.regiao}});
  $$("[data-saida]").forEach(function(b){b.onclick=function(){var v=Number(b.dataset.saida);var antes=lerNumero(f.valor_saida.value);f.valor_saida.value=dinheiro(v);if(!lerNumero(f.frete.value)||lerNumero(f.frete.value)===antes)f.frete.value=dinheiro(v)}});
  $("#freteIgual").onclick=function(){f.frete.value=f.valor_saida.value};
  $("#semAjudante").onclick=function(){f.ajudante.value=""};
  $("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){confirmar({titulo:"Excluir este dia?",texto:"O lançamento de "+l.data.slice(8)+"/"+l.data.slice(5,7)+(l.regiao?" ("+l.regiao+")":"")+" será apagado.",ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","lancamento?id="+encodeURIComponent(l.id)).then(function(){j.close();aviso("Dia excluído");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();
    var corpo={id:l.id,caminhao_id:c.id,data:f.data.value,regiao:f.regiao.value,pernoite:pern,km_inicial:f.km_inicial.value,km_final:pern?f.km_inicial.value:f.km_final.value,obs:f.obs.value,nome_motorista:f.nome_motorista.value,nome_ajudante:f.nome_ajudante.value};
    var ok=true;["valor_saida","diesel","frete","motorista","ajudante"].forEach(function(k){var n=lerNumero(f[k].value);if(isNaN(n))ok=false;corpo[k]=n});
    if(!ok){aviso("Confira os valores em dinheiro.",true);return}
    var bt=f.querySelector(".btn.prim");bt.disabled=true;
    api("POST","lancamento",corpo).then(function(){j.close();aviso(novo?"Dia lançado":"Alterações salvas");st.mes=Number(corpo.data.slice(5,7));st.ano=Number(corpo.data.slice(0,4));carregar()}).catch(function(e){bt.disabled=false;aviso(e.message,true)})};
}
function formCaminhao(c){
  var novo=!c;c=c||{placa:"",nome_motorista:"",nome_ajudante:"",valor_motorista:170,valor_ajudante:100,km_franquia:130};
  var j=janela('<form><div class="j-cab"><h3>'+(novo?"Novo caminhão":"Editar "+esc(c.placa))+'</h3><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    campo("Placa","placa",c.placa,'required autocomplete="off" style="text-transform:uppercase"')+
    '<div class="grupo-campos"><h4>Equipe padrão</h4><div class="dois">'+campo("Motorista","nome_motorista",c.nome_motorista,'placeholder="Nome"')+campoRS("Diária","valor_motorista",c.valor_motorista)+'</div><div class="dois">'+campo("Ajudante","nome_ajudante",c.nome_ajudante,'placeholder="Nome"')+campoRS("Diária","valor_ajudante",c.valor_ajudante)+"</div>"+
    '<p class="nota">Os nomes aparecem nas colunas e já vêm preenchidos em cada dia lançado.</p></div>'+
    campo("KM livre por dia (franquia)","km_franquia",c.km_franquia,'inputmode="numeric"')+"</div>"+rodape(!novo)+"</form>");
  var f=j.querySelector("form");$("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){confirmar({titulo:"Excluir o caminhão "+c.placa+"?",texto:"Só é possível excluir um caminhão sem lançamentos.",ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","caminhao?id="+encodeURIComponent(c.id)).then(function(){j.close();aviso("Caminhão excluído");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();api("POST","caminhao",{id:c.id,placa:f.placa.value,nome_motorista:f.nome_motorista.value,nome_ajudante:f.nome_ajudante.value,valor_motorista:lerNumero(f.valor_motorista.value),valor_ajudante:lerNumero(f.valor_ajudante.value),km_franquia:f.km_franquia.value})
    .then(function(r){j.close();aviso("Caminhão salvo");st.cam=r.id;lembrar();carregar()}).catch(function(e){aviso(e.message,true)})};
}

/* ---------- FECHAR QUINZENA ---------- */
function normal(s){return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim()}
function destinos(){try{return JSON.parse(localStorage.getItem("frota-destinos")||"{}")}catch(e){return {}}}
function lembrarDestino(grupo,pessoa,linhaNome){try{var d=destinos();d[grupo+"|"+normal(pessoa)]=normal(linhaNome);localStorage.setItem("frota-destinos",JSON.stringify(d))}catch(e){}}
function itensFechamento(mes,q){
  var lista=daQ(doMes(null,mes),q),rec=q===1?"rec1":"rec2",desp=q===1?"desp1":"desp2",itens=[];
  var porCam=st.d.caminhoes.map(function(c){var v=soma(lista.filter(function(l){return l.caminhao_id===c.id}),"frete");return v?c.placa+" "+dinheiro(v):""}).filter(Boolean).join(" · ");
  var recs=linhasDe(rec);
  itens.push({tipo:"Receita",nome:"Frete dos caminhões",detalhe:porCam||"sem lançamentos",valor:Math.round(soma(lista,"frete")*100)/100,grupo:rec,linha:recs.length?recs[0].id:"",nova:"Receita "+(q===1?"01 a 15":"16 a 31")});
  var pessoas={},ordem=[];
  lista.forEach(function(l){var c=caminhao(l.caminhao_id);if(!c)return;[[quemMot(c,l),l.motorista],[quemAju(c,l),l.ajudante]].forEach(function(p){var v=Number(p[1]||0);if(!v)return;var k=normal(p[0]);if(!pessoas[k]){pessoas[k]={nome:p[0],valor:0,dias:0};ordem.push(k)}pessoas[k].valor+=v;pessoas[k].dias++})});
  var desps=linhasDe(desp),lemb=destinos();
  ordem.sort(function(a,b){return pessoas[b].valor-pessoas[a].valor}).forEach(function(k){var p=pessoas[k],alvo=lemb[desp+"|"+k],achou=(alvo&&desps.find(function(l){return normal(l.nome)===alvo}))||desps.find(function(l){return normal(l.nome)===k});
    itens.push({tipo:"Pagamento",nome:p.nome,detalhe:p.dias+(p.dias===1?" diária":" diárias"),valor:Math.round(p.valor*100)/100,grupo:desp,linha:achou?achou.id:"",nova:p.nome})});
  return {itens:itens,dias:lista.length};
}
function fechamento(mes,q){
  var dados=itensFechamento(mes,q);
  function opcoes(it){return linhasDe(it.grupo).map(function(l){return '<option value="'+esc(l.id)+'"'+(l.id===it.linha?" selected":"")+">"+esc(l.nome)+"</option>"}).join("")+'<option value=""'+(it.linha?"":" selected")+">+ Criar linha “"+esc(it.nova)+"”</option>"}
  var h='<form><div class="j-cab"><div><h3>Fechar quinzena</h3><small>Leva o frete e os pagamentos para o financeiro</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    '<div class="dois"><label class="campo">Mês<select name="mes">'+MESES.map(function(n,i){return '<option value="'+(i+1)+'"'+(i+1===mes?" selected":"")+">"+n+"</option>"}).join("")+'</select></label><label class="campo">Quinzena<select name="q"><option value="1"'+(q===1?" selected":"")+'>1ª · 01 a 15</option><option value="2"'+(q===2?" selected":"")+">2ª · 16 a 31</option></select></label></div>";
  if(!dados.dias)h+='<div class="vazio">Nenhum dia lançado nessa quinzena.</div>';
  else{h+='<p class="nota">'+dados.dias+(dados.dias===1?" dia lançado":" dias lançados")+" nos caminhões. Marque o que vai para o financeiro e confira a linha de destino.</p>";
    dados.itens.forEach(function(it,i){if(i===0)h+='<div class="grupo-campos"><h4>Entrada</h4>';if(i===1)h+='</div><div class="grupo-campos"><h4>Pagamentos</h4>';
      h+='<div class="fecha-item" data-i="'+i+'"><input type="checkbox" aria-label="Lançar '+esc(it.nome)+'"><div><b>'+esc(it.nome)+"</b><small>"+esc(it.detalhe)+'</small></div><div class="dinheiro"><span>R$</span><input class="entrada val" inputmode="decimal" value="'+dinheiroCampo(it.valor)+'" aria-label="Valor"></div><select aria-label="Linha do financeiro">'+opcoes(it)+'</select><div class="estado"></div></div>'});
    h+="</div>"}
  h+='</div><div class="j-rodape"><button type="button" class="btn" id="cancelar">Cancelar</button><button class="btn prim"'+(dados.dias?"":" disabled")+">Lançar no financeiro</button></div></form>";
  var j=janela(h),f=j.querySelector("form");
  f.mes.onchange=f.q.onchange=function(){fechamento(Number(f.mes.value),Number(f.q.value))};
  function confere(div,primeira){var it=dados.itens[Number(div.dataset.i)],sel=div.querySelector("select"),cx=div.querySelector("input[type=checkbox]"),est=div.querySelector(".estado");
    var atual=sel.value?valor(sel.value,mes):0,novo=lerNumero(div.querySelector(".val").value),igual=Math.abs(atual-novo)<0.005;
    est.textContent=!sel.value?"Vai criar a linha “"+it.nova+"” no financeiro.":!atual?"Ainda vazio no financeiro.":igual?"✓ Já está no financeiro com este valor.":"No financeiro está "+rs(atual)+". Marcando, troca por este valor.";
    est.classList.toggle("alerta",!!(sel.value&&atual&&!igual));
    if(primeira)cx.checked=!!novo&&(!sel.value||!atual);div.classList.toggle("marcado",cx.checked)}
  $$("#janela .fecha-item").forEach(function(div){confere(div,true);div.querySelector("select").onchange=function(){confere(div)};div.querySelector(".val").oninput=function(){confere(div)};div.querySelector("input[type=checkbox]").onchange=function(){confere(div)}});
  $("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  f.onsubmit=function(ev){ev.preventDefault();var itens=[],erro=false;
    $$("#janela .fecha-item").forEach(function(div){if(!div.querySelector("input[type=checkbox]").checked)return;var it=dados.itens[Number(div.dataset.i)],v=lerNumero(div.querySelector(".val").value),sel=div.querySelector("select");
      if(isNaN(v)){erro=true;return}itens.push(sel.value?{linha_id:sel.value,valor:v}:{nova_linha:it.nova,grupo:it.grupo,valor:v});
      if(it.tipo==="Pagamento")lembrarDestino(it.grupo,it.nome,sel.value?sel.selectedOptions[0].textContent:it.nova)});
    if(erro){aviso("Confira os valores.",true);return}if(!itens.length){aviso("Marque pelo menos um item.",true);return}
    api("POST","fechar",{ano:st.ano,mes:mes,itens:itens}).then(function(){j.close();aviso(itens.length+(itens.length===1?" valor lançado":" valores lançados")+" no financeiro");carregar()}).catch(function(e){aviso(e.message,true)})};
}

/* ---------- FINANCEIRO ---------- */
var SECOES=[["rec1","rec2","Entradas","receita"],["desp1",null,"Despesas · 01 a 15","despesa"],["desp2",null,"Despesas · 16 a 31","despesa"]];
function telaFinanceiro(){
  var s=saldos(st.mes),h='<div class="cab"><div><h1>Financeiro</h1><p>'+(pc()?"Clique num valor para editar. Clique no nome da linha para mais opções.":"Toque num valor para editar.")+'</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="fecharFin">'+ic("lista")+"Fechar quinzena</button>"+mesNav()+"</div></div>";
  h+='<div class="tiles">'+tile("Entradas · "+MESES[st.mes-1],rs(s.ent))+tile("Despesas",rs(s.sai))+tile("Saldo do mês",rs(s.mes),"1ª "+rs(s.q1)+" · 2ª "+rs(s.q2),cor(s.mes))+tile("Acumulado no ano",rs(acumulado(st.mes)),"até "+MESES[st.mes-1].toLowerCase(),cor(acumulado(st.mes)))+"</div>";
  h+=pc()?gradeAno():listaMes();
  $("#tela").innerHTML=h;ligarMes();ligarFin();
}
function inputValor(l,m){var v=valor(l.id,m);return '<input data-l="'+esc(l.id)+'" data-m="'+m+'" inputmode="decimal" autocomplete="off" value="'+(v?dinheiro(v):"")+'" aria-label="'+esc(l.nome)+" em "+MESES[m-1]+'">'}
function nomeLinha(l){return '<button class="nome-linha" data-linha="'+esc(l.id)+'">'+esc(l.nome)+ic("lapis")+"</button>"}
function gradeAno(){
  var meses=[1,2,3,4,5,6,7,8,9,10,11,12],sel=function(m){return m===st.mes?" sel":""},h='<div class="cartao secao"><div class="rolar"><table class="fin"><thead><tr><th class="e"></th>';
  meses.forEach(function(m){h+='<th class="mes-col'+sel(m)+'"><button data-col="'+m+'">'+CURTO[m-1]+"</button></th>"});h+="</tr></thead><tbody>";
  function linha(l){var r='<tr><td class="nome">'+nomeLinha(l)+"</td>";meses.forEach(function(m){r+='<td class="'+sel(m)+'">'+inputValor(l,m)+"</td>"});return r+"</tr>"}
  function calc(rot,fn,cls){var r='<tr class="'+(cls||"")+'"><td class="nome">'+rot+"</td>";meses.forEach(function(m){var v=fn(m);r+='<td class="calc num'+sel(m)+(cls==="tot saldo"?" "+cor(v):"")+'">'+(v||cls!=="ref"?dinheiro(v):"")+"</td>"});return r+"</tr>"}
  function grupo(t,g,rot){return '<tr class="grupo"><td colspan="13">'+t.toUpperCase()+'<button class="link" data-add="'+g+'">'+ic("mais")+rot+"</button></td></tr>"}
  h+=grupo("Entradas","rec1","1ª quinzena");linhasDe("rec1").forEach(function(l){h+=linha(l)});h+=calc("↳ frete caminhões 01–15",function(m){return freteQ(m,1)},"ref");
  h+='<tr class="grupo"><td colspan="13" style="padding:4px 12px;background:var(--surface)"><button class="link" data-add="rec2">'+ic("mais")+"Entrada na 2ª quinzena</button></td></tr>";
  linhasDe("rec2").forEach(function(l){h+=linha(l)});h+=calc("↳ frete caminhões 16–31",function(m){return freteQ(m,2)},"ref");
  h+=calc("Total de entradas",function(m){return saldos(m).ent},"tot");
  h+=grupo("Despesas · 01 a 15","desp1","Adicionar");linhasDe("desp1").forEach(function(l){h+=linha(l)});h+=calc("Total 01 a 15",function(m){return totalGrupo("desp1",m)},"tot");
  h+=grupo("Despesas · 16 a 31","desp2","Adicionar");linhasDe("desp2").forEach(function(l){h+=linha(l)});h+=calc("Total 16 a 31",function(m){return totalGrupo("desp2",m)},"tot");
  h+='<tr class="grupo"><td colspan="13">BALANÇO</td></tr>';
  h+=calc("Saldo 01 a 15",function(m){return saldos(m).q1},"tot saldo")+calc("Saldo 16 a 31",function(m){return saldos(m).q2},"tot saldo")+calc("Saldo do mês",function(m){return saldos(m).mes},"tot saldo")+calc("Acumulado",acumulado,"tot saldo");
  return h+"</tbody></table></div></div>";
}
function listaMes(){
  var m=st.mes,h='<div class="blocos">';
  function bloco(titulo,grupos,add,totalTxt,total,refs){var b='<div class="cartao secao fin-lista"><div class="secao-cab"><h2>'+titulo+'</h2><span class="resumo-linha num"><b>'+rs(total)+"</b></span></div>";
    grupos.forEach(function(g,i){linhasDe(g).forEach(function(l){b+='<div class="linha">'+nomeLinha(l)+inputValor(l,m)+"</div>"});if(refs)b+='<div class="linha ref"><span>↳ frete caminhões '+(i===0?"01–15":"16–31")+'</span><span class="num">'+dinheiro(freteQ(m,i+1))+"</span></div>"});
    b+='<div class="add">'+add.map(function(a){return '<button class="link" data-add="'+a[0]+'">'+ic("mais")+a[1]+"</button>"}).join(" &nbsp; ")+"</div></div>";return b}
  var s=saldos(m);
  h+=bloco("Entradas",["rec1","rec2"],[["rec1","1ª quinzena"],["rec2","2ª quinzena"]],"Total",s.ent,true);
  h+=bloco("Despesas · 01 a 15",["desp1"],[["desp1","Adicionar despesa"]],"Total",totalGrupo("desp1",m));
  h+=bloco("Despesas · 16 a 31",["desp2"],[["desp2","Adicionar despesa"]],"Total",totalGrupo("desp2",m));
  return h+"</div>";
}
function ligarFin(){
  $("#fecharFin").onclick=function(){if(hoje.getFullYear()!==st.ano){fechamento(st.mes,1);return}var qa=quinzenaAnterior();if(qa)fechamento(qa.mes,qa.q);else fechamento(1,1)};
  $$("[data-col]").forEach(function(b){b.onclick=function(){st.mes=Number(b.dataset.col);telaFinanceiro()}});
  $$("[data-add]").forEach(function(b){b.onclick=function(){var g=b.dataset.add;perguntar({titulo:g.indexOf("rec")===0?"Nova entrada":"Nova despesa",rotulo:"Nome da linha",ok:"Adicionar"}).then(function(nome){if(!nome)return;
    api("POST","linha",{ano:st.ano,grupo:g,nome:nome}).then(function(){aviso("Linha adicionada");carregar()}).catch(function(e){aviso(e.message,true)})})}});
  $$("[data-linha]").forEach(function(b){b.onclick=function(){formLinha(st.d.linhas.find(function(l){return l.id===b.dataset.linha}))}});
  $$("input[data-l]").forEach(function(inp){
    inp.onfocus=function(){var v=valor(inp.dataset.l,Number(inp.dataset.m));inp.value=v?dinheiro(v):"";setTimeout(function(){inp.select()},0)};
    inp.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();inp.blur()}if(e.key==="Escape"){var v=valor(inp.dataset.l,Number(inp.dataset.m));inp.value=v?dinheiro(v):"";inp.blur()}};
    inp.onblur=function(){var n=lerNumero(inp.value),m=Number(inp.dataset.m),id=inp.dataset.l,antes=valor(id,m);
      if(isNaN(n)){aviso("Valor inválido.",true);inp.value=antes?dinheiro(antes):"";return}
      n=Math.round(n*100)/100;if(n===antes){inp.value=n?dinheiro(n):"";return}
      api("POST","valor",{linha_id:id,mes:m,valor:n}).then(function(){st.d.valores=st.d.valores.filter(function(x){return!(x.linha_id===id&&x.mes===m)});if(n)st.d.valores.push({linha_id:id,mes:m,valor:n});
        var foco=document.activeElement,fl=foco&&foco.dataset?foco.dataset.l:null,fm=foco&&foco.dataset?foco.dataset.m:null,y=window.scrollY,rolar=document.querySelector(".rolar"),x=rolar?rolar.scrollLeft:0;
        telaFinanceiro();window.scrollTo(0,y);var r2=document.querySelector(".rolar");if(r2)r2.scrollLeft=x;
        if(fl){var de=document.querySelector('input[data-l="'+fl+'"][data-m="'+fm+'"]');if(de)de.focus()}}).catch(function(e){aviso(e.message,true)})};
  });
}
function formLinha(l){
  var mesBase=st.mes;
  var j=janela('<form><div class="j-cab"><div><h3>'+esc(l.nome)+"</h3><small>"+(l.grupo.indexOf("rec")===0?"Entrada":"Despesa")+" · "+st.ano+'</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    campo("Nome","nome",l.nome,'required autocomplete="off"')+
    '<div class="grupo-campos"><h4>Conta fixa</h4><p class="nota">Copia o valor de um mês para todos os meses seguintes até dezembro.</p><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><select name="mes" class="entrada" style="width:auto">'+MESES.map(function(n,i){var v=valor(l.id,i+1);return '<option value="'+(i+1)+'"'+(i+1===mesBase?" selected":"")+">"+n+(v?" · "+dinheiro(v):"")+"</option>"}).join("")+'</select><button type="button" class="btn" id="repetir">Repetir até dezembro</button></div></div>'+
    "</div>"+rodape(true,"Salvar nome")+"</form>");
  var f=j.querySelector("form");$("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  $("#repetir").onclick=function(){var m=Number(f.mes.value),v=valor(l.id,m);confirmar({titulo:"Repetir "+rs(v)+"?",texto:"O valor de "+MESES[m-1].toLowerCase()+" vai para "+(m<12?MESES[m].toLowerCase()+" até dezembro":"nenhum mês (já é dezembro)")+", trocando o que estiver lá.",ok:"Repetir"}).then(function(sim){if(!sim)return;
    api("POST","valor/repetir",{linha_id:l.id,mes:m}).then(function(){j.close();aviso("Valor repetido até dezembro");carregar()}).catch(function(e){aviso(e.message,true)})})};
  $("#excluir").onclick=function(){confirmar({titulo:"Excluir “"+l.nome+"”?",texto:"A linha e todos os valores dela em "+st.ano+" serão apagados.",ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","linha?id="+encodeURIComponent(l.id)).then(function(){j.close();aviso("Linha excluída");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();api("POST","linha",{id:l.id,nome:f.nome.value}).then(function(){j.close();aviso("Nome salvo");carregar()}).catch(function(e){aviso(e.message,true)})};
}

/* ---------- RESUMO ---------- */
function grafico(){
  var dados=[];for(var m=1;m<=12;m++){var l=doMes(null,m);dados.push({m:m,frete:soma(l,"frete"),gastos:gastos(l),sobra:sobra(l),dias:l.length})}
  var max=Math.max.apply(null,dados.map(function(x){return x.sobra}).concat([0])),min=Math.min.apply(null,dados.map(function(x){return x.sobra}).concat([0]));
  if(max===min)return '<div class="vazio">Sem lançamentos neste ano.</div>';
  // Desenha na largura real da tela (texto sempre no mesmo tamanho; altura fixa)
  var W=Math.max(300,Math.min(1200,($("#tela").clientWidth||720)-34)),H=pc()?240:200,top=24,bot=26,esq=4,larg=(W-esq*2)/12,alt=H-top-bot,y=function(v){return top+(max-v)/(max-min)*alt},y0=y(0);
  var melhor=dados.reduce(function(a,b){return b.sobra>a.sobra?b:a});
  var s='<svg viewBox="0 0 '+W+" "+H+'" role="img" aria-label="Sobra dos caminhões por mês">';
  [0.5,1].forEach(function(f){var v=max*f;if(v>0)s+='<line x1="0" x2="'+W+'" y1="'+y(v)+'" y2="'+y(v)+'"/>'});
  dados.forEach(function(d,i){var x=esq+i*larg,bw=Math.min(34,larg*0.56),bx=x+(larg-bw)/2,yv=y(d.sobra),hgt=Math.abs(y0-yv),r=Math.min(4,hgt/2),pos=d.sobra>=0;
    s+='<g class="col" tabindex="0" data-i="'+i+'" aria-label="'+MESES[i]+": sobra "+rs(d.sobra)+'"><rect x="'+x+'" y="0" width="'+larg+'" height="'+H+'" fill="transparent"/>';
    if(hgt>0.5)s+=pos?'<path class="barra" d="M'+bx+","+y0+"V"+(yv+r)+"Q"+bx+","+yv+" "+(bx+r)+","+yv+"H"+(bx+bw-r)+"Q"+(bx+bw)+","+yv+" "+(bx+bw)+","+(yv+r)+"V"+y0+'Z"/>':'<path class="barra" d="M'+bx+","+y0+"V"+(yv-r)+"Q"+bx+","+yv+" "+(bx+r)+","+yv+"H"+(bx+bw-r)+"Q"+(bx+bw)+","+yv+" "+(bx+bw)+","+(yv-r)+"V"+y0+'Z"/>';
    if(d===melhor&&d.sobra>0)s+='<text class="val" x="'+(x+larg/2)+'" y="'+(yv-7)+'" text-anchor="middle">'+dinheiro(d.sobra).replace(/,\d\d$/,"")+"</text>";
    s+='<text x="'+(x+larg/2)+'" y="'+(H-8)+'" text-anchor="middle">'+CURTO[i]+"</text></g>"});
  s+='<line class="base" x1="0" x2="'+W+'" y1="'+y0+'" y2="'+y0+'"/></svg>';
  st.graf=dados;return '<div class="grafico" id="grafico">'+s+'<div class="dica-graf" id="dicaGraf"></div></div>';
}
function ligarGrafico(){var g=$("#grafico");if(!g)return;var dica=$("#dicaGraf");
  function mostra(el){var d=st.graf[Number(el.dataset.i)],r=el.getBoundingClientRect(),gr=g.getBoundingClientRect(),barra=el.querySelector(".barra"),br=barra?barra.getBoundingClientRect():r;
    dica.innerHTML="<b>"+MESES[d.m-1]+"</b>Frete "+rs(d.frete)+"<br>Gastos "+rs(d.gastos)+"<br><b>Sobra "+rs(d.sobra)+"</b>"+d.dias+(d.dias===1?" dia":" dias");
    var x=r.left-gr.left+r.width/2;x=Math.max(80,Math.min(gr.width-80,x));dica.style.left=x+"px";
    var topo=Math.min(br.top,r.bottom-40)-gr.top-8;dica.style.top=Math.max(topo,dica.offsetHeight+4)+"px";dica.style.opacity=1}
  $$("#grafico g.col").forEach(function(el){el.onmouseenter=el.onfocus=function(){mostra(el)};el.onclick=function(){mostra(el)};el.onmouseleave=el.onblur=function(){dica.style.opacity=0}})}
function telaResumo(){
  var d=st.d,meses=[1,2,3,4,5,6,7,8,9,10,11,12],ano=d.lancamentos,ent=0,sai=0;meses.forEach(function(m){var s=saldos(m);ent+=s.ent;sai+=s.sai});
  var h='<div class="cab"><div><h1>Resumo de '+st.ano+"</h1><p>Caminhões e financeiro no ano</p></div></div>";
  h+='<div class="tiles">'+tile("Frete no ano",rs(soma(ano,"frete")),ano.length+" dias trabalhados")+tile("Sobra dos caminhões",rs(sobra(ano)),"frete − diesel − diárias",cor(sobra(ano)))+tile("Entradas no financeiro",rs(ent))+tile("Saldo do financeiro",rs(ent-sai),"inclui despesas já previstas",cor(ent-sai))+"</div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Sobra dos caminhões por mês<small class="so-pc">passe o mouse nas barras</small></h2><span class="resumo-linha so-cel">toque numa barra</span></div>'+grafico()+"</div>";
  h+='<div class="camres">';d.caminhoes.forEach(function(c){var l=ano.filter(function(x){return x.caminhao_id===c.id});
    h+='<div class="cartao"><b class="placa">'+esc(c.placa)+'</b><dl><dt>Frete</dt><dd class="num">'+rs(soma(l,"frete"))+'</dd><dt>Diesel</dt><dd class="num">'+rs(soma(l,"diesel"))+'</dd><dt>Diárias</dt><dd class="num">'+rs(soma(l,"motorista")+soma(l,"ajudante"))+'</dd><dt>Sobra</dt><dd class="num '+cor(sobra(l))+'">'+rs(sobra(l))+'</dd><dt>Dias trabalhados</dt><dd class="num">'+l.length+'</dd><dt>KM rodados</dt><dd class="num">'+km(kmRodado(l))+"</dd></dl></div>"});
  h+="</div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Caminhões por mês</h2></div><div class="rolar"><table><thead><tr><th class="e">Mês</th>';d.caminhoes.forEach(function(c){h+="<th>"+esc(c.placa)+"</th>"});
  h+="<th>Frete total</th><th>Diesel</th><th>Diárias</th><th>Sobra</th><th>Dias</th></tr></thead><tbody>";
  meses.forEach(function(m){var l=doMes(null,m);if(!l.length&&m!==st.mes)return;h+='<tr><td class="e">'+MESES[m-1]+"</td>";d.caminhoes.forEach(function(c){h+='<td class="num">'+dinheiro(soma(doMes(c.id,m),"frete"))+"</td>"});
    h+='<td class="num"><b>'+dinheiro(soma(l,"frete"))+'</b></td><td class="num">'+dinheiro(soma(l,"diesel"))+'</td><td class="num">'+dinheiro(soma(l,"motorista")+soma(l,"ajudante"))+'</td><td class="num '+cor(sobra(l))+'">'+dinheiro(sobra(l))+'</td><td class="num">'+l.length+"</td></tr>"});
  h+='<tr class="total"><td class="e">Ano</td>';d.caminhoes.forEach(function(c){h+='<td class="num">'+dinheiro(soma(ano.filter(function(l){return l.caminhao_id===c.id}),"frete"))+"</td>"});
  h+='<td class="num">'+dinheiro(soma(ano,"frete"))+'</td><td class="num">'+dinheiro(soma(ano,"diesel"))+'</td><td class="num">'+dinheiro(soma(ano,"motorista")+soma(ano,"ajudante"))+'</td><td class="num '+cor(sobra(ano))+'">'+dinheiro(sobra(ano))+'</td><td class="num">'+ano.length+"</td></tr></tbody></table></div></div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Financeiro por mês</h2></div><div class="rolar"><table><thead><tr><th class="e">Mês</th><th>Entradas</th><th>Despesas</th><th>Saldo do mês</th><th>Acumulado</th></tr></thead><tbody>';
  meses.forEach(function(m){var s=saldos(m),a=acumulado(m);if(!s.ent&&!s.sai)return;h+='<tr><td class="e">'+MESES[m-1]+'</td><td class="num">'+dinheiro(s.ent)+'</td><td class="num">'+dinheiro(s.sai)+'</td><td class="num '+cor(s.mes)+'">'+dinheiro(s.mes)+'</td><td class="num '+cor(a)+'">'+dinheiro(a)+"</td></tr>"});
  h+="</tbody></table></div></div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Seus dados</h2></div><div style="padding:16px;display:grid;gap:12px"><p class="nota">Baixe um backup de vez em quando e guarde no computador ou no Google Drive. O mesmo arquivo serve para importar de volta.</p>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn prim" id="baixarBackup">'+ic("baixar")+'Baixar backup</button><label class="btn" tabindex="0">'+ic("subir")+'Importar arquivo<input type="file" id="arquivoImportar" accept=".json,application/json" hidden></label></div></div></div>';
  $("#tela").innerHTML=h;ligarGrafico();
  $("#baixarBackup").onclick=function(){api("GET","backup").then(function(b){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(b)],{type:"application/json"}));
    a.download="frota-backup-"+hoje.getFullYear()+"-"+dois(hoje.getMonth()+1)+"-"+dois(hoje.getDate())+".json";document.body.appendChild(a);a.click();a.remove();aviso("Backup baixado")}).catch(function(e){aviso(e.message,true)})};
  $("#arquivoImportar").onchange=function(ev){var arq=ev.target.files[0];ev.target.value="";if(!arq)return;
    arq.text().then(function(t){var dd;try{dd=JSON.parse(t)}catch(e){throw new Error("Arquivo inválido.")}if(dd.formato!=="frota-simples")throw new Error("Este arquivo não é um backup do sistema.");
      var nl=(dd.lancamentos||[]).length,nf=(dd.linhas||[]).length;
      return confirmar({titulo:"Importar "+arq.name+"?",texto:nl+" dias de caminhão e "+nf+" linhas do financeiro. O que já foi importado antes é substituído, sem duplicar. Valores do financeiro que estão no arquivo trocam os atuais.",ok:"Importar"}).then(function(sim){if(!sim)return;
        aviso("Importando...");return api("POST","importar",dd).then(function(r){aviso("Importado: "+r.lancamentos+" dias");carregar()})})}).catch(function(e){aviso(e.message,true)})};
}

/* ---------- Início ---------- */
montarNav();
$("#anoMenos").onclick=function(){st.ano--;carregar()};$("#anoMais").onclick=function(){st.ano++;carregar()};
$("#fab").onclick=function(){formLancamento(null,0)};
var largura=pc(),larguraTela=window.innerWidth,redesenhoT;
window.addEventListener("resize",function(){if(pc()!==largura){largura=pc();larguraTela=window.innerWidth;desenhar();return}
  clearTimeout(redesenhoT);redesenhoT=setTimeout(function(){if(st.aba==="resumo"&&Math.abs(window.innerWidth-larguraTela)>40&&!$("#janela").open){larguraTela=window.innerWidth;var y=window.scrollY;desenhar();window.scrollTo(0,y)}},200)});
carregar();
</script></body></html>`;
