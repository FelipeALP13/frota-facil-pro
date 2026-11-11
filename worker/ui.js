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

/* Avisos, lembretes, ajustes */
.alertas{display:grid;gap:10px;margin-bottom:18px}
.alerta{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--surface)}
.alerta .ic-box{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;flex:none;background:var(--warn-soft);color:var(--warn)}
.alerta.vencido .ic-box{background:var(--bad-soft);color:var(--bad)}.alerta.ok .ic-box{background:var(--good-soft);color:var(--good)}
.alerta .txt{flex:1;min-width:0}.alerta b{display:block}.alerta span{color:var(--muted);font-size:13px}
.st{font-size:12px;font-weight:700;padding:3px 8px;border-radius:999px;white-space:nowrap}
.st.ok{background:var(--good-soft);color:var(--good)}.st.perto{background:var(--warn-soft);color:var(--warn)}.st.vencido{background:var(--bad-soft);color:var(--bad)}
.linha-cfg{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--line2)}.linha-cfg:last-child{border-bottom:0}
.linha-cfg .txt{flex:1;min-width:0}.linha-cfg b{display:block}.linha-cfg span{color:var(--muted);font-size:13px}
.chave{position:relative;width:46px;height:28px;flex:none}.chave input{opacity:0;width:0;height:0;position:absolute}
.chave i{position:absolute;inset:0;border-radius:999px;background:var(--line);transition:.15s;cursor:pointer}
.chave i:after{content:"";position:absolute;width:22px;height:22px;left:3px;top:3px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #0003;transition:.15s}
.chave input:checked+i{background:var(--accent)}.chave input:checked+i:after{transform:translateX(18px)}.chave input:focus-visible+i{outline:3px solid var(--accent);outline-offset:2px}
.chip .x{margin-left:6px;opacity:.55}.chip.add{border-style:dashed;color:var(--brand2)}
.menu-acoes{display:grid;gap:10px}.menu-acoes button{display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);text-align:left}
.menu-acoes button:hover{background:var(--surface2)}.menu-acoes .ic-box{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--accent-soft);color:var(--accent);flex:none}
.menu-acoes b{display:block}.menu-acoes span{color:var(--muted);font-size:13px}
.sub-lista{border-top:1px solid var(--line2)}.sub-cab{display:flex;justify-content:space-between;align-items:center;padding:10px 16px 4px;font-size:12.5px;font-weight:700;color:var(--muted);letter-spacing:.03em;text-transform:uppercase}
.desp{display:flex;align-items:center;gap:10px;width:100%;padding:9px 16px;border:0;background:none;text-align:left;border-bottom:1px solid var(--line2)}
.desp:last-child{border-bottom:0}.desp:hover{background:var(--surface2)}.desp .txt{flex:1;min-width:0}.desp small{color:var(--muted)}

/* Avisos */
#aviso{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:var(--ink);color:var(--surface);padding:11px 16px;border-radius:12px;opacity:0;pointer-events:none;transition:.18s;z-index:100;max-width:90vw;font-weight:600;display:flex;gap:8px;align-items:center}
#aviso.on{opacity:1;transform:translate(-50%,0)}#aviso.erro{background:var(--bad);color:#fff}
.fab{display:none}
.carregando{display:grid;place-items:center;min-height:50vh;color:var(--muted)}
.giro{width:28px;height:28px;border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:g .8s linear infinite}@keyframes g{to{transform:rotate(360deg)}}

@media (max-width:899px){
  .topo{padding:0 14px;padding-top:env(safe-area-inset-top)}.topo-in{height:54px;gap:10px}
  .nav-topo,.marca span{display:none}.titulo-cel{display:block}
  .nav-baixo{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--surface);border-top:1px solid var(--line);padding-bottom:env(safe-area-inset-bottom)}
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
<button class="fab escondido" id="fab"><svg class="ic" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Lançar</button>
<nav class="nav-baixo" id="navBaixo" aria-label="Seções"></nav>
<dialog id="janela"></dialog><dialog id="janela2"></dialog>
<div id="aviso" role="status" aria-live="polite"></div>
<script>
var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var CURTO=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
var SEMANA=["dom","seg","ter","qua","qui","sex","sáb"],SEMANA_LONGA=["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
var ABAS=[["inicio","Início","inicio"],["caminhoes","Caminhões","caminhao"],["financeiro","Financeiro","carteira"],["resumo","Resumo","grafico"],["ajustes","Ajustes","engrenagem"]];
var ICONES={inicio:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',caminhao:'<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  carteira:'<path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l12-3v3"/><circle cx="16.5" cy="13.5" r="1.2"/>',grafico:'<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>',
  mais:'<path d="M12 5v14M5 12h14"/>',lapis:'<path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4"/>',esq:'<path d="M15 5l-7 7 7 7"/>',dir:'<path d="M9 5l7 7-7 7"/>',
  check:'<path d="M5 12l5 5 9-10"/>',alerta:'<path d="M12 4l9 16H3zM12 10v4M12 17v.5"/>',baixar:'<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',subir:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  fechar:'<path d="M6 6l12 12M18 6L6 18"/>',lista:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.5M4 12h.5M4 18h.5"/>',
  engrenagem:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  moeda:'<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',
  chave:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  sino:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>',
  recibo:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',lixo:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'};
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
  j.innerHTML='<form method="dialog"><div class="j-cab"><h3>'+esc(o.titulo)+'</h3></div><div class="j-corpo"><label class="campo">'+esc(o.rotulo)+'<input name="v" required autocomplete="off" type="'+(o.tipo||"text")+'"'+(o.modo?' inputmode="'+o.modo+'"':"")+' value="'+esc(o.valor||"")+'"></label></div><div class="j-rodape"><button type="button" class="btn" id="c2nao">Cancelar</button><button class="btn prim">'+esc(o.ok||"Salvar")+"</button></div></form>";
  var feito=false,f=j.querySelector("form");function fim(v){if(feito)return;feito=true;j.close();ok(v)}
  $("#c2nao").onclick=function(){fim(null)};f.onsubmit=function(e){e.preventDefault();var v=f.v.value.trim();if(v)fim(v)};j.onclose=function(){fim(null)};j.showModal();f.v.focus()})}

/* ---------- Dados ---------- */
function caminhao(id){return st.d.caminhoes.find(function(c){return c.id===id})}
function doMes(camId,mes){var pre=st.ano+"-"+dois(mes);return st.d.lancamentos.filter(function(l){return(!camId||l.caminhao_id===camId)&&l.data.slice(0,7)===pre})}
function daQ(lista,q){return lista.filter(function(l){var d=Number(l.data.slice(8));return q===1?d<=15:d>15})}
function soma(lista,campo){return lista.reduce(function(s,l){return s+Number(l[campo]||0)},0)}
function gastos(lista){return soma(lista,"diesel")+soma(lista,"motorista")+soma(lista,"ajudante")}
function sobra(lista){return soma(lista,"frete")-gastos(lista)}
/* Ajustes (com padrão) */
var PADRAO={categorias:["Pedágio","Manutenção","Pneus","Peças","Óleo","Documentos","Multa","Lavagem","Alimentação","Outros"],campos:{km:true,saida:true,diesel:true,obs:true},avisoKm:1000,avisoDias:15,ultimoBackup:null};
function prefs(){var c=(st.d&&st.d.config&&st.d.config.prefs)||{},p={};for(var k in PADRAO)p[k]=c[k]!==undefined?c[k]:PADRAO[k];p.campos=Object.assign({},PADRAO.campos,c.campos||{});return p}
function salvarPrefs(mudar){var p=prefs();mudar(p);st.d.config=st.d.config||{};st.d.config.prefs=p;return api("POST","config",{chave:"prefs",valor:p})}
/* Outras despesas e vales */
function despDe(camId,mes,q){var pre=st.ano+"-"+dois(mes);return (st.d.despesas||[]).filter(function(d){if(camId&&d.caminhao_id!==camId)return false;if(mes&&d.data.slice(0,7)!==pre)return false;if(q){var dd=Number(d.data.slice(8));if(q===1?dd>15:dd<=15)return false}return true})}
function despAno(camId){return (st.d.despesas||[]).filter(function(d){return !camId||d.caminhao_id===camId})}
function lucro(lancs,desps){return sobra(lancs)-soma(desps,"valor")}
function custoTotal(lancs,desps){return gastos(lancs)+soma(desps,"valor")}
function margem(lancs,desps){var f=soma(lancs,"frete");return f?lucro(lancs,desps)/f*100:0}
function pct(v){return (Math.round(v*10)/10).toLocaleString("pt-BR")+"%"}
function valesDe(pessoaNormal,mes,q){var pre=st.ano+"-"+dois(mes);return (st.d.vales||[]).filter(function(v){var dd=Number(v.data.slice(8));return v.data.slice(0,7)===pre&&(q===1?dd<=15:dd>15)&&(!pessoaNormal||normal(v.pessoa)===pessoaNormal)})}
/* Lembretes: situação */
function situacao(l){var p=prefs();
  if(l.tipo==="km"){var atual=kmAtual(l.caminhao_id),prox=Number(l.ultimo_km||0)+Number(l.a_cada_km||0);if(atual==null)return{st:"ok",txt:"Próximo aos "+km(prox)+" km",ord:1e9};var falta=prox-atual;
    return{st:falta<=0?"vencido":falta<=p.avisoKm?"perto":"ok",txt:falta<=0?"Passou "+km(-falta)+" km (era aos "+km(prox)+")":"Faltam "+km(falta)+" km · aos "+km(prox),ord:falta/50}}
  var dias=diasEntre(hojeZero(),dataObj(l.vence_em)),dt=l.vence_em.slice(8)+"/"+l.vence_em.slice(5,7)+"/"+l.vence_em.slice(0,4);
  return{st:dias<0?"vencido":dias<=p.avisoDias?"perto":"ok",txt:dias<0?"Venceu em "+dt:dias===0?"Vence hoje":"Vence em "+dt+" ("+dias+(dias===1?" dia":" dias")+")",ord:dias}}
function lembretesOrdenados(){return (st.d.lembretes||[]).map(function(l){return {l:l,s:situacao(l)}}).sort(function(a,b){return a.s.ord-b.s.ord})}
var NOME_ST={ok:"Em dia",perto:"Perto",vencido:"Atrasado"};
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
  $("#fab").classList.toggle("escondido",!(st.d&&st.cam&&(st.aba==="caminhoes"||st.aba==="inicio")));
  if(!st.d)return;
  if(st.aba==="inicio")telaInicio();else if(st.aba==="caminhoes")telaCaminhoes();else if(st.aba==="financeiro")telaFinanceiro();else if(st.aba==="resumo")telaResumo();else telaAjustes();
}
function menuLancar(camId){
  var c=caminhao(camId||st.cam);
  var j=janela('<form><div class="j-cab"><div><h3>O que lançar?</h3><small>'+(c?esc(c.placa):"")+'</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo"><div class="menu-acoes">'+
    '<button type="button" data-o="dia"><span class="ic-box">'+ic("caminhao")+"</span><div><b>Dia de trabalho</b><span>Região, KM, frete, diesel e equipe</span></div></button>"+
    '<button type="button" data-o="despesa"><span class="ic-box">'+ic("recibo")+"</span><div><b>Outra despesa do caminhão</b><span>Pedágio, manutenção, pneus, documentos...</span></div></button>"+
    '<button type="button" data-o="vale"><span class="ic-box">'+ic("moeda")+"</span><div><b>Vale / adiantamento</b><span>Dinheiro adiantado a motorista ou ajudante</span></div></button>"+
    "</div></div></form>");
  $("#x").onclick=function(){j.close()};
  $$("[data-o]").forEach(function(b){b.onclick=function(){var o=b.dataset.o;if(camId)st.cam=camId;if(o==="dia")formLancamento(null,0);else if(o==="despesa")formDespesa(null);else formVale(null)}});
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
  var s=saldos(mes),dq=despDe(null,mes,q),lu=lucro(lq,dq);
  h+='<div class="tiles">'+tile("Frete na quinzena",rs(soma(lq,"frete")),lq.length+(lq.length===1?" dia lançado":" dias lançados"))+tile("Gastos",rs(custoTotal(lq,dq)),"diesel, diárias e despesas")+tile("Sobra",rs(lu),soma(lq,"frete")?"margem "+pct(margem(lq,dq)):"frete − gastos",cor(lu))+tile("Saldo do mês",rs(s.mes),"no financeiro",cor(s.mes))+"</div>";
  // Avisos: lembretes perto/atrasados e backup
  var al=lembretesOrdenados().filter(function(x){return x.s.st!=="ok"}),p=prefs(),bk=p.ultimoBackup?diasEntre(dataObj(p.ultimoBackup),hojeZero()):null;
  if(al.length||((bk===null||bk>=7)&&d.lancamentos.length)){h+='<div class="alertas">';
    al.slice(0,5).forEach(function(x){var c=caminhao(x.l.caminhao_id);h+='<div class="alerta '+x.s.st+'"><span class="ic-box">'+ic(x.l.tipo==="km"?"chave":"sino")+'</span><div class="txt"><b>'+esc(x.l.nome)+(c?" · "+esc(c.placa):"")+"</b><span>"+esc(x.s.txt)+'</span></div><button class="btn peq" data-feito="'+esc(x.l.id)+'">Feito</button></div>'});
    if(al.length>5)h+='<button class="link" id="verLembretes">Ver todos os '+al.length+" avisos</button>";
    if((bk===null||bk>=7)&&d.lancamentos.length)h+='<div class="alerta"><span class="ic-box">'+ic("baixar")+'</span><div class="txt"><b>Hora de fazer backup</b><span>'+(bk===null?"Nenhum backup feito ainda.":"Último backup há "+bk+" dias.")+' Guarde uma cópia dos dados.</span></div><button class="btn peq" id="backupJa">Baixar</button></div>';
    h+="</div>"}
  // Fechamento da quinzena anterior
  var qa=quinzenaAnterior();
  if(qa){var it=itensFechamento(qa.mes,qa.q);if(it.dias){var pend=it.itens.filter(function(x){return x.valor>0&&!(x.linha&&Math.abs(valor(x.linha,qa.mes)-x.valor)<0.005)}).length;
    h+='<div class="cartao aviso-card'+(pend?"":" ok")+'"><div class="ic-box">'+ic(pend?"lista":"check")+'</div><div class="txt"><b>'+(pend?"Fechar a "+nomeQ(qa.mes,qa.q):"A "+nomeQ(qa.mes,qa.q)+" já está no financeiro")+"</b><span>"+(pend?pend+(pend===1?" valor ainda não lançado":" valores ainda não lançados")+" no financeiro (frete e pagamentos).":"Frete e pagamentos conferidos.")+'</span></div><button class="btn '+(pend?"prim":"")+'" id="fecharAnterior">'+(pend?"Fechar quinzena":"Ver")+"</button></div>"}}
  // Caminhões
  h+='<div class="secao-cab" style="padding:4px 2px 10px;border:0"><h2>Caminhões</h2></div><div class="camgrid">';
  d.caminhoes.forEach(function(c){var lc=lq.filter(function(l){return l.caminhao_id===c.id}),u=ultimoDe(c.id),k=kmAtual(c.id);
    var atraso=u?diasEntre(dataObj(u.data),hojeZero()):null;
    h+='<div class="cartao camcard"><div class="camcard-top"><div><b>'+esc(c.placa)+"</b><small>"+esc(c.nome_motorista)+" · "+esc(c.nome_ajudante)+"</small></div>"+
      (u?'<span class="tag '+(atraso>=3?"amarela":"verde")+'">'+esc(quando(u.data))+(u.regiao?" · "+esc(u.regiao):"")+"</span>":'<span class="tag">Sem lançamentos</span>')+"</div>"+
      '<div class="mini"><div><small>Dias</small><b class="num">'+lc.length+'</b></div><div><small>Frete</small><b class="num">'+dinheiro(soma(lc,"frete")).replace(/,\d\d$/,"")+'</b></div><div><small>KM atual</small><b class="num">'+(k?km(k):"—")+"</b></div></div>"+
      '<div class="acoes-card"><button class="btn" data-ver="'+esc(c.id)+'">Ver mês</button><button class="btn prim" data-lancar="'+esc(c.id)+'">'+ic("mais")+"Lançar</button></div></div>"});
  h+="</div>";
  // Vales da quinzena
  var vq=valesDe(null,mes,q);
  if(vq.length){h+='<div class="cartao secao"><div class="secao-cab"><h2>Vales desta quinzena</h2><span class="resumo-linha num"><b>'+rs(soma(vq,"valor"))+'</b></span></div><div class="lista">';
    vq.forEach(function(v){h+='<button class="desp" data-vale="'+esc(v.id)+'"><span class="tag">'+esc(v.pessoa)+'</span><div class="txt">'+(esc(v.obs)||"&nbsp;")+"<br><small>"+brData(v.data)+'</small></div><b class="num">'+rs(v.valor)+"</b></button>"});
    h+='</div><div class="secao-cab" style="border-top:1px solid var(--line2);border-bottom:0"><span class="resumo-linha">Descontados no fechamento da quinzena</span><button class="btn peq" id="novoVale">'+ic("mais")+"Vale</button></div></div>"}
  // Recentes
  var rec=d.lancamentos.slice(-6).reverse();
  if(rec.length){h+='<div class="cartao secao"><div class="secao-cab"><h2>Últimos lançamentos</h2></div><div class="lista">';rec.forEach(function(l){h+=itemLista(l,true)});h+="</div></div>"}
  $("#tela").innerHTML=h;
  if($("#fecharAnterior"))$("#fecharAnterior").onclick=function(){fechamento(qa.mes,qa.q)};
  ligarFeito();if($("#backupJa"))$("#backupJa").onclick=baixarBackup;
  $$("[data-vale]").forEach(function(b){b.onclick=function(){formVale((st.d.vales||[]).find(function(v){return v.id===b.dataset.vale}))}});
  if($("#novoVale"))$("#novoVale").onclick=function(){formVale(null)};
  if($("#verLembretes"))$("#verLembretes").onclick=function(){st.aba="ajustes";lembrar();desenhar()};
  $$("[data-ver]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.ver;st.aba="caminhoes";st.mes=hoje.getMonth()+1;lembrar();window.scrollTo(0,0);desenhar()}});
  $$("[data-lancar]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.lancar;st.mes=hoje.getMonth()+1;lembrar();menuLancar(b.dataset.lancar)}});
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
  var dm=despDe(c.id,st.mes),kmr=kmRodado(mes),lu=lucro(mes,dm),sem0=function(v){return dinheiro(v).replace(/,00$/,"")};
  h+='<div class="tiles">'+tile("Frete do mês",rs(soma(mes,"frete")),mes.length+(mes.length===1?" dia":" dias"))+
    tile("Gastos",rs(custoTotal(mes,dm)),"diesel "+sem0(soma(mes,"diesel"))+" · diárias "+sem0(soma(mes,"motorista")+soma(mes,"ajudante"))+" · outras "+sem0(soma(dm,"valor")))+
    tile("Sobra",rs(lu),soma(mes,"frete")?"margem "+pct(margem(mes,dm)):"frete − gastos",cor(lu))+
    tile("KM rodados",km(kmr),kmr?"rende "+rs(soma(mes,"frete")/kmr)+"/km · custa "+rs(custoTotal(mes,dm)/kmr)+"/km":"")+"</div>";
  h+='<div class="blocos">'+blocoQ(c,daQ(mes,1),1)+blocoQ(c,daQ(mes,2),2)+"</div>";
  $("#tela").innerHTML=h;ligarCam();
}
function blocoQ(c,lista,q){
  var h='<section class="cartao secao"><div class="secao-cab"><h2>'+(q===1?"1ª quinzena":"2ª quinzena")+"<small>"+(q===1?"01 a 15":"16 a 31")+'</small></h2><div class="direita"><span class="resumo-linha so-pc">Frete <b class="num">'+rs(soma(lista,"frete"))+'</b> · diesel <b class="num">'+dinheiro(soma(lista,"diesel"))+'</b></span><button class="btn peq" data-fechar="'+q+'">'+ic("lista")+'Fechar</button><button class="btn peq so-pc" data-desp="'+q+'">'+ic("recibo")+'Despesa</button><button class="btn peq prim so-pc" data-novo="'+(q===1?1:16)+'">'+ic("mais")+"Lançar dia</button></div></div>";
  var outras=despBloco(c,q);
  if(!lista.length)return h+'<div class="vazio">Nenhum dia lançado nesta quinzena.</div>'+outras+"</section>";
  if(!pc()){h+='<div class="lista">';lista.forEach(function(l){h+=itemLista(l,false)});
    return h+'</div><div class="secao-cab" style="border-top:1px solid var(--line2);border-bottom:0"><span class="resumo-linha">'+lista.length+(lista.length===1?" dia":" dias")+'</span><span class="resumo-linha">'+esc(c.nome_motorista)+" <b>"+dinheiro(soma(lista,"motorista"))+"</b> · "+esc(c.nome_ajudante)+" <b>"+dinheiro(soma(lista,"ajudante"))+"</b></span></div>"+outras+"</section>"}
  h+='<div class="rolar"><table><thead><tr><th class="e">Dia</th><th class="e">Região</th><th>KM inicial</th><th>KM final</th><th>Excedente</th><th>Saída</th><th>Diesel</th><th>Frete</th><th>'+esc(c.nome_motorista)+"</th><th>"+esc(c.nome_ajudante)+'</th><th class="e">Obs</th></tr></thead><tbody>';
  lista.forEach(function(l){var dt=dataObj(l.data),ex=l.pernoite?'<span class="tag laranja">PERNOITE</span>':(l.km_inicial!=null&&l.km_final!=null?km(l.km_final-l.km_inicial-c.km_franquia):"");
    h+='<tr class="clica" data-id="'+esc(l.id)+'"><td class="e"><b>'+dois(dt.getDate())+'</b> <span style="color:var(--muted)">'+SEMANA[dt.getDay()]+'</span></td><td class="e">'+esc(l.regiao)+'</td><td class="num fraco">'+km(l.km_inicial)+'</td><td class="num fraco">'+km(l.km_final)+'</td><td class="num">'+ex+'</td><td class="num">'+dinheiro(l.valor_saida)+'</td><td class="num">'+dinheiro(l.diesel)+'</td><td class="num"><b>'+dinheiro(l.frete)+'</b></td><td class="num">'+dinheiro(l.motorista)+(l.nome_motorista?'<small class="quem">'+esc(l.nome_motorista)+"</small>":"")+'</td><td class="num">'+dinheiro(l.ajudante)+(l.nome_ajudante?'<small class="quem">'+esc(l.nome_ajudante)+"</small>":"")+'</td><td class="e fraco" style="max-width:220px;overflow:hidden;text-overflow:ellipsis">'+esc(l.obs)+"</td></tr>"});
  h+='<tr class="total"><td class="e" colspan="2">'+lista.length+(lista.length===1?" dia":" dias")+'</td><td></td><td></td><td></td><td></td><td class="num">'+dinheiro(soma(lista,"diesel"))+'</td><td class="num">'+dinheiro(soma(lista,"frete"))+'</td><td class="num">'+dinheiro(soma(lista,"motorista"))+'</td><td class="num">'+dinheiro(soma(lista,"ajudante"))+"</td><td></td></tr>";
  return h+"</tbody></table></div>"+outras+"</section>";
}
function despBloco(c,q){var ds=despDe(c.id,st.mes,q);if(!ds.length)return "";
  var h='<div class="sub-lista"><div class="sub-cab"><span>Outras despesas</span><span class="num">'+rs(soma(ds,"valor"))+"</span></div>";
  ds.forEach(function(d){h+='<button class="desp" data-desp-id="'+esc(d.id)+'"><span class="tag laranja">'+esc(d.categoria)+'</span><div class="txt">'+(esc(d.obs)||"&nbsp;")+"<br><small>"+d.data.slice(8)+"/"+d.data.slice(5,7)+(d.km?" · "+km(d.km)+" km":"")+'</small></div><b class="num">'+rs(d.valor)+"</b></button>"});
  return h+"</div>"}
function ligarCam(){
  ligarMes();ligarItens();
  $$("[data-cam]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.cam;lembrar();desenhar()}});
  $("#novoCam").onclick=function(){formCaminhao(null)};
  $$("#editCam,#editCam2").forEach(function(b){b.onclick=function(){formCaminhao(caminhao(st.cam))}});
  $$("[data-novo]").forEach(function(b){b.onclick=function(){formLancamento(null,Number(b.dataset.novo))}});
  $$("[data-fechar]").forEach(function(b){b.onclick=function(){fechamento(st.mes,Number(b.dataset.fechar))}});
  $$("[data-desp]").forEach(function(b){b.onclick=function(){formDespesa(null,Number(b.dataset.desp)===1?1:16)}});
  $$("[data-desp-id]").forEach(function(b){b.onclick=function(){formDespesa((st.d.despesas||[]).find(function(d){return d.id===b.dataset.despId}))}});
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
  var pern=!!l.pernoite,p=prefs(),escondido=function(nome,v){return '<input type="hidden" name="'+nome+'" value="'+esc(v)+'">'};
  if(novo&&!p.campos.km)l.km_inicial="";
  var j=janela('<form><div class="j-cab"><div><h3>'+(novo?"Lançar dia":"Editar dia")+"</h3><small>"+esc(c.placa)+" · "+esc(c.nome_motorista)+'</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    '<div class="dois">'+campo("Data","data",l.data,'type="date" required')+campo("Região","regiao",l.regiao,'autocomplete="off" list="regioes"')+"</div>"+
    (regioes.length?'<div class="chips" aria-label="Regiões mais usadas">'+regioes.map(function(r){r=r.toUpperCase();return '<button type="button" class="chip" data-regiao="'+esc(r)+'">'+esc(r)+"</button>"}).join("")+"</div>":"")+
    '<div class="grupo-campos"><h4>Quilometragem</h4><div class="seg" role="group"><button type="button" data-tipo="rodou" aria-pressed="'+!pern+'">Rodou</button><button type="button" data-tipo="pernoite" aria-pressed="'+pern+'">Pernoite</button></div>'+
    '<div class="dois"'+(p.campos.km?"":' style="display:none"')+'>'+campo("KM inicial","km_inicial",km(l.km_inicial),'inputmode="numeric" autocomplete="off"')+campo("KM final","km_final",km(l.km_final),'inputmode="numeric" autocomplete="off"',"kmfim")+'</div><div class="calc-km" id="kmInfo"'+(p.campos.km?"":' style="display:none"')+"></div></div>"+
    '<div class="grupo-campos"><h4>Valores</h4><div class="dois">'+(p.campos.saida?campoRS("Valor saída","valor_saida",l.valor_saida):escondido("valor_saida",dinheiroCampo(l.valor_saida)))+campoRS("Valor frete","frete",l.frete)+(p.campos.saida?"":(p.campos.diesel?campoRS("Diesel","diesel",l.diesel):""))+"</div>"+
    (p.campos.saida?'<div class="chips">'+saidas.map(function(v){return '<button type="button" class="chip" data-saida="'+v+'">Saída '+dinheiro(v).replace(",00","")+"</button>"}).join("")+'<button type="button" class="chip" id="freteIgual">Frete = saída</button></div>':'<span id="freteIgual" hidden></span>')+
    (p.campos.diesel?(p.campos.saida?campoRS("Diesel","diesel",l.diesel):""):escondido("diesel",dinheiroCampo(l.diesel)))+"</div>"+
    '<div class="grupo-campos"><h4>Equipe do dia</h4><div class="dois">'+campo("Motorista","nome_motorista",quemMot(c,l),'list="pessoas" autocomplete="off"')+campoRS("Diária","motorista",l.motorista)+"</div>"+
    '<div class="dois">'+campo("Ajudante","nome_ajudante",quemAju(c,l),'list="pessoas" autocomplete="off"')+campoRS("Diária","ajudante",l.ajudante)+'</div><div class="chips"><button type="button" class="chip" id="semAjudante">Sem ajudante hoje</button></div></div>'+
    (p.campos.obs?campo("Observação","obs",l.obs,'autocomplete="off" placeholder="Ex.: toco 3.900"'):escondido("obs",l.obs||""))+
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

function isoDe(dt){return dt.getFullYear()+"-"+dois(dt.getMonth()+1)+"-"+dois(dt.getDate())}
function brData(iso){return iso?iso.slice(8)+"/"+iso.slice(5,7)+"/"+iso.slice(0,4):""}
function addMeses(iso,n){var d=dataObj(iso),dia=d.getDate(),r=new Date(d.getFullYear(),d.getMonth()+n,1);r.setDate(Math.min(dia,new Date(r.getFullYear(),r.getMonth()+1,0).getDate()));return isoDe(r)}
function dataPadrao(dia){var dd=(hoje.getFullYear()===st.ano&&hoje.getMonth()+1===st.mes)?hoje.getDate():(dia||1);if(dia===1&&dd>15)dd=1;if(dia===16&&dd<16)dd=16;return st.ano+"-"+dois(st.mes)+"-"+dois(dd)}
function selCaminhao(nome,atual,vazio){return '<label class="campo">Caminhão<select name="'+nome+'">'+(vazio?'<option value="">'+vazio+"</option>":"")+st.d.caminhoes.map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===atual?" selected":"")+">"+esc(c.placa)+"</option>"}).join("")+"</select></label>"}
function chipsEscolha(nome,opcoes,atual){return '<div class="chips" data-escolha="'+nome+'">'+opcoes.map(function(o){return '<button type="button" class="chip'+(o===atual?" on":"")+'" data-v="'+esc(o)+'" aria-pressed="'+(o===atual)+'">'+esc(o)+"</button>"}).join("")+"</div>"}
function ligarEscolha(raiz,nome,aoEscolher){$$('#'+raiz.id+' [data-escolha="'+nome+'"] .chip').forEach(function(b){b.onclick=function(){$$('#'+raiz.id+' [data-escolha="'+nome+'"] .chip').forEach(function(x){x.classList.remove("on");x.setAttribute("aria-pressed","false")});b.classList.add("on");b.setAttribute("aria-pressed","true");aoEscolher(b.dataset.v)}})}

function formDespesa(d,dia){
  var novo=!d,p=prefs();if(novo)d={caminhao_id:st.cam,data:dataPadrao(dia),categoria:"",valor:0,km:"",obs:""};
  var cats=p.categorias.slice();if(d.categoria&&cats.indexOf(d.categoria)<0)cats.push(d.categoria);var cat=d.categoria||"";
  var j=janela('<form><div class="j-cab"><div><h3>'+(novo?"Outra despesa":"Editar despesa")+'</h3><small>Entra nos gastos e na sobra do caminhão</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    '<div class="dois">'+selCaminhao("caminhao_id",d.caminhao_id)+campo("Data","data",d.data,'type="date" required')+"</div>"+
    '<div class="grupo-campos"><h4>Categoria</h4>'+chipsEscolha("cat",cats,cat)+"</div>"+
    '<div class="dois">'+campoRS("Valor","valor",d.valor)+campo("KM no dia (opcional)","km",km(d.km),'inputmode="numeric" autocomplete="off"')+"</div>"+
    campo("Descrição","obs",d.obs,'autocomplete="off" placeholder="Ex.: troca de 2 pneus, pedágio Rio-Niterói"')+
    '<p class="nota">As categorias podem ser mudadas em Ajustes.</p></div>'+rodape(!novo)+"</form>");
  var f=j.querySelector("form");ligarEscolha(j,"cat",function(v){cat=v});
  $("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){confirmar({titulo:"Excluir esta despesa?",texto:d.categoria+" de "+rs(d.valor)+" em "+brData(d.data)+".",ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","despesa?id="+encodeURIComponent(d.id)).then(function(){j.close();aviso("Despesa excluída");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();var v=lerNumero(f.valor.value);if(!(v>0)){aviso("Informe o valor.",true);return}
    api("POST","despesa",{id:d.id,caminhao_id:f.caminhao_id.value,data:f.data.value,categoria:cat||"Outros",valor:v,km:f.km.value,obs:f.obs.value})
      .then(function(){j.close();aviso(novo?"Despesa lançada":"Despesa salva");st.mes=Number(f.data.value.slice(5,7));st.cam=f.caminhao_id.value;carregar()}).catch(function(e){aviso(e.message,true)})};
}

function formVale(v){
  var novo=!v;if(novo)v={pessoa:"",data:dataPadrao(0),valor:0,obs:""};
  var pessoas=pessoasConhecidas();
  var j=janela('<form><div class="j-cab"><div><h3>'+(novo?"Vale / adiantamento":"Editar vale")+'</h3><small>Descontado no fechamento da quinzena em que foi dado</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    campo("Para quem","pessoa",v.pessoa,'required list="pessoasV" autocomplete="off"')+'<datalist id="pessoasV">'+pessoas.map(function(n){return '<option value="'+esc(n)+'">'}).join("")+"</datalist>"+
    '<div class="chips">'+pessoas.slice(0,8).map(function(n){return '<button type="button" class="chip" data-pessoa="'+esc(n)+'">'+esc(n)+"</button>"}).join("")+"</div>"+
    '<div class="dois">'+campoRS("Valor","valor",v.valor)+campo("Data","data",v.data,'type="date" required')+"</div>"+
    campo("Observação","obs",v.obs,'autocomplete="off" placeholder="Ex.: pix, dinheiro, almoço"')+"</div>"+rodape(!novo)+"</form>");
  var f=j.querySelector("form");$$("[data-pessoa]").forEach(function(b){b.onclick=function(){f.pessoa.value=b.dataset.pessoa}});
  $("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){confirmar({titulo:"Excluir este vale?",texto:rs(v.valor)+" para "+v.pessoa+" em "+brData(v.data)+".",ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","vale?id="+encodeURIComponent(v.id)).then(function(){j.close();aviso("Vale excluído");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();var n=lerNumero(f.valor.value);if(!(n>0)){aviso("Informe o valor.",true);return}
    api("POST","vale",{id:v.id,pessoa:f.pessoa.value,data:f.data.value,valor:n,obs:f.obs.value}).then(function(){j.close();aviso(novo?"Vale lançado":"Vale salvo");carregar()}).catch(function(e){aviso(e.message,true)})};
}

var SUGEST_KM=["Troca de óleo","Filtros","Revisão","Rodízio de pneus","Correia","Freios"],SUGEST_DATA=["Licenciamento (CRLV)","Seguro","IPVA","ANTT / RNTRC","Aferição do tacógrafo","CNH do motorista","Exame toxicológico"];
function formLembrete(l){
  var novo=!l;if(novo)l={tipo:"km",caminhao_id:st.cam,nome:"",a_cada_km:10000,ultimo_km:kmAtual(st.cam)||"",vence_em:"",a_cada_meses:12,obs:""};
  var tipo=l.tipo;
  var j=janela('<form><div class="j-cab"><div><h3>'+(novo?"Novo lembrete":"Editar lembrete")+'</h3><small>Aparece no Início quando estiver perto</small></div><button type="button" class="btn so-ic" id="x" aria-label="Fechar">'+ic("fechar")+'</button></div><div class="j-corpo">'+
    '<div class="seg" role="group"><button type="button" data-tl="km">Por KM (manutenção)</button><button type="button" data-tl="data">Por data (vencimento)</button></div>'+
    '<div class="dois">'+selCaminhao("caminhao_id",l.caminhao_id,"Nenhum (geral)")+campo("O que é","nome",l.nome,'required autocomplete="off"')+'</div><div class="chips" id="sugest"></div>'+
    '<div class="dois" id="gKm">'+campo("A cada quantos km","a_cada_km",km(l.a_cada_km),'inputmode="numeric" autocomplete="off"')+campo("Feito por último aos (km)","ultimo_km",km(l.ultimo_km),'inputmode="numeric" autocomplete="off"')+"</div>"+
    '<div class="dois" id="gData">'+campo("Vence em","vence_em",l.vence_em||"",'type="date"')+'<label class="campo">Repete<select name="a_cada_meses"><option value="0">Não repete</option>'+[3,6,12,24,60].map(function(m){return '<option value="'+m+'"'+(Number(l.a_cada_meses)===m?" selected":"")+">A cada "+(m===12?"ano":m===24?"2 anos":m===60?"5 anos":m+" meses")+"</option>"}).join("")+"</select></label></div>"+
    campo("Observação","obs",l.obs,'autocomplete="off"')+"</div>"+rodape(!novo)+"</form>");
  var f=j.querySelector("form");
  function mostra(){$$("[data-tl]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.tl===tipo))});$("#gKm").style.display=tipo==="km"?"":"none";$("#gData").style.display=tipo==="data"?"":"none";
    $("#sugest").innerHTML=(tipo==="km"?SUGEST_KM:SUGEST_DATA).map(function(s){return '<button type="button" class="chip" data-sug="'+esc(s)+'">'+esc(s)+"</button>"}).join("");
    $$("[data-sug]").forEach(function(b){b.onclick=function(){f.nome.value=b.dataset.sug}})}
  $$("[data-tl]").forEach(function(b){b.onclick=function(){tipo=b.dataset.tl;mostra()}});mostra();
  f.caminhao_id.onchange=function(){if(tipo==="km"&&!f.ultimo_km.value&&kmAtual(f.caminhao_id.value))f.ultimo_km.value=km(kmAtual(f.caminhao_id.value))};
  $("#cancelar").onclick=$("#x").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){confirmar({titulo:"Excluir o lembrete?",texto:l.nome,ok:"Excluir",perigo:true}).then(function(sim){if(!sim)return;
    api("DELETE","lembrete?id="+encodeURIComponent(l.id)).then(function(){j.close();aviso("Lembrete excluído");carregar()}).catch(function(e){aviso(e.message,true)})})};
  f.onsubmit=function(ev){ev.preventDefault();
    api("POST","lembrete",{id:l.id,tipo:tipo,caminhao_id:f.caminhao_id.value,nome:f.nome.value,a_cada_km:f.a_cada_km.value,ultimo_km:f.ultimo_km.value,vence_em:f.vence_em.value,a_cada_meses:Number(f.a_cada_meses.value),obs:f.obs.value})
      .then(function(){j.close();aviso("Lembrete salvo");carregar()}).catch(function(e){aviso(e.message,true)})};
}
function feitoLembrete(id){var l=(st.d.lembretes||[]).find(function(x){return x.id===id});if(!l)return;
  var enviar=function(corpo){api("POST","lembrete/feito",corpo).then(function(){aviso("Marcado como feito");carregar()}).catch(function(e){aviso(e.message,true)})};
  if(l.tipo==="km"){perguntar({titulo:l.nome+" feito",rotulo:"Feito aos quantos KM?",valor:km(kmAtual(l.caminhao_id)||l.ultimo_km),ok:"Marcar feito",modo:"numeric"}).then(function(v){if(v)enviar({id:id,km:v})});return}
  if(l.a_cada_meses){var nova=addMeses(l.vence_em,l.a_cada_meses);confirmar({titulo:l.nome+" renovado?",texto:"O próximo vencimento fica para "+brData(nova)+".",ok:"Confirmar"}).then(function(s){if(s)enviar({id:id,vence_em:nova})});return}
  perguntar({titulo:l.nome+" renovado",rotulo:"Novo vencimento",valor:"",ok:"Salvar",tipo:"date"}).then(function(v){if(v)enviar({id:id,vence_em:v})})}
function ligarFeito(){$$("[data-feito]").forEach(function(b){b.onclick=function(){feitoLembrete(b.dataset.feito)}})}
function baixarBackup(){api("GET","backup").then(function(b){var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(b)],{type:"application/json"}));
  a.download="frota-backup-"+isoDe(hoje)+".json";document.body.appendChild(a);a.click();a.remove();aviso("Backup baixado");return salvarPrefs(function(p){p.ultimoBackup=isoDe(hojeZero())}).then(function(){desenhar()})}).catch(function(e){aviso(e.message,true)})}

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
  // Vales da quinzena são descontados de quem recebeu
  valesDe(null,mes,q).forEach(function(v){var k=normal(v.pessoa);if(!pessoas[k]){pessoas[k]={nome:v.pessoa,valor:0,dias:0};ordem.push(k)}pessoas[k].vales=(pessoas[k].vales||0)+Number(v.valor||0)});
  var desps=linhasDe(desp),lemb=destinos();
  ordem.sort(function(a,b){return (pessoas[b].valor-(pessoas[b].vales||0))-(pessoas[a].valor-(pessoas[a].vales||0))}).forEach(function(k){var p=pessoas[k],alvo=lemb[desp+"|"+k],achou=(alvo&&desps.find(function(l){return normal(l.nome)===alvo}))||desps.find(function(l){return normal(l.nome)===k});
    var det=p.dias?p.dias+(p.dias===1?" diária":" diárias")+" "+rs(p.valor):"sem diárias";if(p.vales)det+=" − vales "+rs(p.vales);
    itens.push({tipo:"Pagamento",nome:p.nome,detalhe:det,valor:Math.round((p.valor-(p.vales||0))*100)/100,grupo:desp,linha:achou?achou.id:"",nova:p.nome})});
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
    if(novo<0){est.textContent="Os vales passam do que tem a receber ("+rs(-novo)+" a mais).";est.classList.add("alerta")}
    if(primeira)cx.checked=novo>0&&(!sel.value||!atual);div.classList.toggle("marcado",cx.checked)}
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
  var dados=[];for(var m=1;m<=12;m++){var l=doMes(null,m),dm=despDe(null,m);dados.push({m:m,frete:soma(l,"frete"),gastos:custoTotal(l,dm),sobra:lucro(l,dm),dias:l.length})}
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
  var da=despAno(null),kmA=kmRodado(ano),luA=lucro(ano,da);
  h+='<div class="tiles">'+tile("Frete no ano",rs(soma(ano,"frete")),ano.length+" dias trabalhados")+tile("Sobra dos caminhões",rs(luA),"margem "+pct(margem(ano,da))+" · gastos "+rs(custoTotal(ano,da)),cor(luA))+
    tile("Por KM rodado",kmA?rs(soma(ano,"frete")/kmA):"—",kmA?"custa "+rs(custoTotal(ano,da)/kmA)+" · sobra "+rs(luA/kmA)+" ("+km(kmA)+" km)":"lance os KMs para calcular")+tile("Saldo do financeiro",rs(ent-sai),"entradas "+rs(ent)+" · inclui despesas previstas",cor(ent-sai))+"</div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Sobra dos caminhões por mês<small class="so-pc">passe o mouse nas barras</small></h2><span class="resumo-linha so-cel">toque numa barra</span></div>'+grafico()+"</div>";
  h+='<div class="camres">';d.caminhoes.forEach(function(c){var l=ano.filter(function(x){return x.caminhao_id===c.id}),dc=despAno(c.id),k=kmRodado(l),lu=lucro(l,dc);
    h+='<div class="cartao"><b class="placa">'+esc(c.placa)+'</b><dl><dt>Frete</dt><dd class="num">'+rs(soma(l,"frete"))+'</dd><dt>Diesel</dt><dd class="num">'+rs(soma(l,"diesel"))+'</dd><dt>Diárias</dt><dd class="num">'+rs(soma(l,"motorista")+soma(l,"ajudante"))+'</dd><dt>Outras despesas</dt><dd class="num">'+rs(soma(dc,"valor"))+'</dd><dt>Sobra</dt><dd class="num '+cor(lu)+'">'+rs(lu)+'</dd><dt>Margem</dt><dd class="num">'+(soma(l,"frete")?pct(margem(l,dc)):"—")+'</dd><dt>Dias · KM rodados</dt><dd class="num">'+l.length+" · "+km(k)+'</dd><dt>Frete por km</dt><dd class="num">'+(k?rs(soma(l,"frete")/k):"—")+"</dd></dl></div>"});
  h+="</div>";
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Caminhões por mês</h2></div><div class="rolar"><table><thead><tr><th class="e">Mês</th>';d.caminhoes.forEach(function(c){h+="<th>"+esc(c.placa)+"</th>"});
  h+="<th>Frete total</th><th>Diesel</th><th>Diárias</th><th>Outras</th><th>Sobra</th><th>Dias</th></tr></thead><tbody>";
  meses.forEach(function(m){var l=doMes(null,m),dm=despDe(null,m);if(!l.length&&!dm.length&&m!==st.mes)return;h+='<tr><td class="e">'+MESES[m-1]+"</td>";d.caminhoes.forEach(function(c){h+='<td class="num">'+dinheiro(soma(doMes(c.id,m),"frete"))+"</td>"});
    h+='<td class="num"><b>'+dinheiro(soma(l,"frete"))+'</b></td><td class="num">'+dinheiro(soma(l,"diesel"))+'</td><td class="num">'+dinheiro(soma(l,"motorista")+soma(l,"ajudante"))+'</td><td class="num">'+dinheiro(soma(dm,"valor"))+'</td><td class="num '+cor(lucro(l,dm))+'">'+dinheiro(lucro(l,dm))+'</td><td class="num">'+l.length+"</td></tr>"});
  h+='<tr class="total"><td class="e">Ano</td>';d.caminhoes.forEach(function(c){h+='<td class="num">'+dinheiro(soma(ano.filter(function(l){return l.caminhao_id===c.id}),"frete"))+"</td>"});
  h+='<td class="num">'+dinheiro(soma(ano,"frete"))+'</td><td class="num">'+dinheiro(soma(ano,"diesel"))+'</td><td class="num">'+dinheiro(soma(ano,"motorista")+soma(ano,"ajudante"))+'</td><td class="num">'+dinheiro(soma(da,"valor"))+'</td><td class="num '+cor(luA)+'">'+dinheiro(luA)+'</td><td class="num">'+ano.length+"</td></tr></tbody></table></div></div>";
  // Outras despesas por categoria no ano
  var porCat={};da.forEach(function(x){porCat[x.categoria]=(porCat[x.categoria]||0)+Number(x.valor||0)});var cats=Object.keys(porCat).sort(function(a,b){return porCat[b]-porCat[a]});
  if(cats.length){h+='<div class="cartao secao"><div class="secao-cab"><h2>Outras despesas por categoria</h2><span class="resumo-linha num"><b>'+rs(soma(da,"valor"))+'</b></span></div><div class="rolar"><table><thead><tr><th class="e">Categoria</th><th>Total no ano</th><th>% das outras</th></tr></thead><tbody>';
    cats.forEach(function(k){h+='<tr><td class="e">'+esc(k)+'</td><td class="num">'+dinheiro(porCat[k])+'</td><td class="num">'+pct(porCat[k]/soma(da,"valor")*100)+"</td></tr>"});h+="</tbody></table></div></div>"}
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Financeiro por mês</h2></div><div class="rolar"><table><thead><tr><th class="e">Mês</th><th>Entradas</th><th>Despesas</th><th>Saldo do mês</th><th>Acumulado</th></tr></thead><tbody>';
  meses.forEach(function(m){var s=saldos(m),a=acumulado(m);if(!s.ent&&!s.sai)return;h+='<tr><td class="e">'+MESES[m-1]+'</td><td class="num">'+dinheiro(s.ent)+'</td><td class="num">'+dinheiro(s.sai)+'</td><td class="num '+cor(s.mes)+'">'+dinheiro(s.mes)+'</td><td class="num '+cor(a)+'">'+dinheiro(a)+"</td></tr>"});
  h+="</tbody></table></div></div>";
  $("#tela").innerHTML=h;ligarGrafico();
}

/* ---------- AJUSTES ---------- */
function chave(id,ligada,rotulo){return '<label class="chave"><input type="checkbox" id="'+id+'"'+(ligada?" checked":"")+' aria-label="'+esc(rotulo)+'"><i></i></label>'}
function telaAjustes(){
  var d=st.d,p=prefs(),h='<div class="cab"><div><h1>Ajustes</h1><p>Deixe o sistema do jeito que você trabalha</p></div></div><div class="blocos">';
  // Caminhões
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Caminhões</h2><button class="btn peq" id="cfgNovoCam">'+ic("mais")+"Caminhão</button></div>";
  d.caminhoes.forEach(function(c){h+='<div class="linha-cfg"><div class="txt"><b>'+esc(c.placa)+"</b><span>"+esc(c.nome_motorista)+" ("+rs(c.valor_motorista)+") · "+esc(c.nome_ajudante)+" ("+rs(c.valor_ajudante)+") · franquia "+c.km_franquia+' km</span></div><button class="btn peq" data-cfgcam="'+esc(c.id)+'">'+ic("lapis")+"Editar</button></div>"});
  h+="</div>";
  // Lembretes
  var lb=lembretesOrdenados();
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Lembretes<small>manutenção e vencimentos</small></h2><button class="btn peq" id="cfgNovoLemb">'+ic("mais")+"Lembrete</button></div>";
  if(!lb.length)h+='<div class="vazio">Nenhum lembrete. Crie, por exemplo, "Troca de óleo a cada 10.000 km" ou "Licenciamento vence em 30/04".</div>';
  lb.forEach(function(x){var c=caminhao(x.l.caminhao_id);h+='<div class="linha-cfg"><span class="st '+x.s.st+'">'+NOME_ST[x.s.st]+'</span><div class="txt"><b>'+esc(x.l.nome)+(c?" · "+esc(c.placa):"")+"</b><span>"+esc(x.s.txt)+(x.l.tipo==="km"?" · a cada "+km(x.l.a_cada_km)+" km":x.l.a_cada_meses?" · repete a cada "+x.l.a_cada_meses+" meses":"")+'</span></div><button class="btn peq" data-feito="'+esc(x.l.id)+'">Feito</button><button class="btn peq so-ic" data-cfglemb="'+esc(x.l.id)+'" aria-label="Editar">'+ic("lapis")+"</button></div>"});
  h+='<div class="linha-cfg"><div class="txt"><b>Avisar com antecedência</b><span>Quando faltar este tanto, o lembrete aparece no Início</span></div><div class="dinheiro" style="width:120px"><input class="entrada" id="cfgAvisoKm" inputmode="numeric" value="'+km(p.avisoKm)+'" aria-label="KM de antecedência" style="text-align:right;padding-right:36px"><span style="left:auto;right:10px">km</span></div><div class="dinheiro" style="width:110px"><input class="entrada" id="cfgAvisoDias" inputmode="numeric" value="'+p.avisoDias+'" aria-label="Dias de antecedência" style="text-align:right;padding-right:44px"><span style="left:auto;right:10px">dias</span></div></div>';
  h+="</div>";
  // Categorias
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Categorias de outras despesas</h2></div><div style="padding:14px 16px"><div class="chips">'+p.categorias.map(function(c,i){return '<button class="chip" data-delcat="'+i+'" aria-label="Remover '+esc(c)+'">'+esc(c)+'<span class="x">×</span></button>'}).join("")+'<button class="chip add" id="cfgAddCat">+ Categoria</button></div><p class="nota" style="margin-top:10px">Toque numa categoria para remover. Despesas já lançadas não mudam.</p></div></div>';
  // Campos do dia
  var campos=[["km","KM inicial e final","Calcula KM rodado, excedente e R$ por km"],["saida","Valor de saída","Valor base combinado por saída (com atalhos)"],["diesel","Diesel","Gasto com diesel no dia"],["obs","Observação","Campo livre (toco, peso, recado)"]];
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Campos ao lançar um dia</h2></div>';
  campos.forEach(function(c){h+='<div class="linha-cfg"><div class="txt"><b>'+c[1]+"</b><span>"+c[2]+"</span></div>"+chave("cfgCampo_"+c[0],p.campos[c[0]],c[1])+"</div>"});
  h+="</div>";
  // Dados
  h+='<div class="cartao secao"><div class="secao-cab"><h2>Seus dados</h2></div><div style="padding:16px;display:grid;gap:12px"><p class="nota">'+(p.ultimoBackup?"Último backup em "+brData(p.ultimoBackup)+". ":"Nenhum backup feito ainda. ")+"Baixe um backup toda semana e guarde no computador ou no Google Drive. O mesmo arquivo serve para importar de volta.</p>"+
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn prim" id="baixarBackup">'+ic("baixar")+'Baixar backup</button><label class="btn" tabindex="0">'+ic("subir")+'Importar arquivo<input type="file" id="arquivoImportar" accept=".json,application/json" hidden></label></div></div></div>';
  h+="</div>";
  $("#tela").innerHTML=h;
  $("#cfgNovoCam").onclick=function(){formCaminhao(null)};
  $$("[data-cfgcam]").forEach(function(b){b.onclick=function(){formCaminhao(caminhao(b.dataset.cfgcam))}});
  $("#cfgNovoLemb").onclick=function(){formLembrete(null)};
  $$("[data-cfglemb]").forEach(function(b){b.onclick=function(){formLembrete((st.d.lembretes||[]).find(function(l){return l.id===b.dataset.cfglemb}))}});
  ligarFeito();
  function salvarAntecedencia(){var k=Number(String($("#cfgAvisoKm").value).replace(/\D/g,""))||0,dd=Number(String($("#cfgAvisoDias").value).replace(/\D/g,""))||0;
    if(k===p.avisoKm&&dd===p.avisoDias)return;salvarPrefs(function(x){x.avisoKm=k;x.avisoDias=dd}).then(function(){aviso("Antecedência salva");telaAjustes()}).catch(function(e){aviso(e.message,true)})}
  $("#cfgAvisoKm").onchange=salvarAntecedencia;$("#cfgAvisoDias").onchange=salvarAntecedencia;
  $$("[data-delcat]").forEach(function(b){b.onclick=function(){var i=Number(b.dataset.delcat),nome=p.categorias[i];confirmar({titulo:"Remover “"+nome+"”?",texto:"Ela deixa de aparecer ao lançar despesas. As despesas já lançadas continuam.",ok:"Remover",perigo:true}).then(function(s){if(!s)return;
    salvarPrefs(function(x){x.categorias=x.categorias.filter(function(c){return c!==nome})}).then(function(){aviso("Categoria removida");telaAjustes()}).catch(function(e){aviso(e.message,true)})})}});
  $("#cfgAddCat").onclick=function(){perguntar({titulo:"Nova categoria",rotulo:"Nome",ok:"Adicionar"}).then(function(v){if(!v)return;if(p.categorias.some(function(c){return normal(c)===normal(v)})){aviso("Essa categoria já existe.",true);return}
    salvarPrefs(function(x){x.categorias=x.categorias.concat([v])}).then(function(){aviso("Categoria adicionada");telaAjustes()}).catch(function(e){aviso(e.message,true)})})};
  ["km","saida","diesel","obs"].forEach(function(k){$("#cfgCampo_"+k).onchange=function(ev){var on=ev.target.checked;salvarPrefs(function(x){x.campos[k]=on}).then(function(){aviso(on?"Campo ligado":"Campo escondido")}).catch(function(e){ev.target.checked=!on;aviso(e.message,true)})}});
  $("#baixarBackup").onclick=baixarBackup;
  $("#arquivoImportar").onchange=function(ev){var arq=ev.target.files[0];ev.target.value="";if(!arq)return;
    arq.text().then(function(t){var dd;try{dd=JSON.parse(t)}catch(e){throw new Error("Arquivo inválido.")}if(dd.formato!=="frota-simples")throw new Error("Este arquivo não é um backup do sistema.");
      var nl=(dd.lancamentos||[]).length,nf=(dd.linhas||[]).length,nd=(dd.despesas||[]).length,nv=(dd.vales||[]).length;
      return confirmar({titulo:"Importar "+arq.name+"?",texto:nl+" dias de caminhão, "+nd+" despesas, "+nv+" vales e "+nf+" linhas do financeiro. O que já foi importado antes é substituído, sem duplicar.",ok:"Importar"}).then(function(sim){if(!sim)return;
        aviso("Importando...");return api("POST","importar",dd).then(function(r){aviso("Importado: "+r.lancamentos+" dias");carregar()})})}).catch(function(e){aviso(e.message,true)})};
}

/* ---------- Início ---------- */
montarNav();
$("#anoMenos").onclick=function(){st.ano--;carregar()};$("#anoMais").onclick=function(){st.ano++;carregar()};
$("#fab").onclick=function(){menuLancar(null)};
var largura=pc(),larguraTela=window.innerWidth,redesenhoT;
window.addEventListener("resize",function(){if(pc()!==largura){largura=pc();larguraTela=window.innerWidth;desenhar();return}
  clearTimeout(redesenhoT);redesenhoT=setTimeout(function(){if(st.aba==="resumo"&&Math.abs(window.innerWidth-larguraTela)>40&&!$("#janela").open){larguraTela=window.innerWidth;var y=window.scrollY;desenhar();window.scrollTo(0,y)}},200)});
carregar();
</script></body></html>`;
