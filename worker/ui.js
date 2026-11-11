// Atenção: este HTML fica dentro de String.raw. No script da página não use crase nem "${".
export const page = String.raw`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0c2f47"><title>Frota</title>
<style>
:root{--azul:#0c2f47;--azul2:#174c6d;--laranja:#ef7b2d;--tinta:#17242d;--suave:#62747f;--linha:#dce6ea;--fundo:#f2f6f7;--painel:#fff;--verde:#18845e;--vermelho:#bf3f46;--cinza:#eef3f5;font-family:Inter,system-ui,Arial,sans-serif;color:var(--tinta);background:var(--fundo)}
*{box-sizing:border-box}body{margin:0;background:var(--fundo);font-size:15px}button,input,select{font:inherit;color:inherit}button{cursor:pointer}
header{position:sticky;top:0;z-index:10;background:var(--azul);color:#fff;padding:10px 16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
header h1{margin:0;font-size:18px;display:flex;align-items:center;gap:8px}header h1 span{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:8px;background:var(--laranja);font-size:16px}
nav{display:flex;gap:4px;flex:1}nav button{border:0;background:transparent;color:#c9d8df;padding:8px 12px;border-radius:8px;font-weight:700}nav button.ativo{background:#ffffff1f;color:#fff}
.ano{display:flex;align-items:center;gap:6px;font-weight:700}.ano button{border:0;background:#ffffff1f;color:#fff;width:30px;height:30px;border-radius:8px}
main{max-width:1500px;margin:0 auto;padding:16px}
.barra{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px}
.chip{border:1px solid var(--linha);background:var(--painel);padding:8px 14px;border-radius:999px;font-weight:700}.chip.ativo{background:var(--azul);border-color:var(--azul);color:#fff}
.btn{border:1px solid var(--linha);background:var(--painel);padding:8px 14px;border-radius:10px;font-weight:700}.btn.prim{background:var(--laranja);border-color:var(--laranja);color:#fff}.btn.perigo{color:var(--vermelho)}
.mes{display:flex;align-items:center;gap:6px;margin-left:auto}.mes strong{min-width:120px;text-align:center}.mes button{border:1px solid var(--linha);background:var(--painel);width:34px;height:34px;border-radius:10px;font-weight:700}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}.card{background:var(--painel);border:1px solid var(--linha);border-radius:12px;padding:12px}.card small{display:block;color:var(--suave);font-weight:600}.card b{font-size:20px}
.pos{color:var(--verde)}.neg{color:var(--vermelho)}
.bloco{background:var(--painel);border:1px solid var(--linha);border-radius:12px;margin-bottom:14px;overflow:hidden}.bloco h2{margin:0;padding:10px 14px;font-size:14px;background:var(--cinza);display:flex;justify-content:space-between;align-items:center}
.rolar{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{padding:7px 9px;border-bottom:1px solid var(--linha);text-align:right;white-space:nowrap}th{font-size:12px;color:var(--suave);text-transform:uppercase;background:#fafcfd}th:first-child,td:first-child{text-align:left}td.txt,th.txt{text-align:left}
tbody tr.lanc{cursor:pointer}tbody tr.lanc:hover{background:#f7fafb}tr.total td{font-weight:800;background:#fafcfd}tr.vazio td{text-align:center;color:var(--suave);padding:16px}
.pernoite{font-size:11px;font-weight:800;color:var(--azul2);background:#e3eef5;padding:2px 6px;border-radius:6px}
.fin td{padding:0}.fin td:first-child{padding:6px 10px;min-width:170px;position:sticky;left:0;background:var(--painel);z-index:1}.fin th:first-child{position:sticky;left:0;z-index:1}.fin td.calc{padding:6px 9px}.fin input{width:100%;min-width:92px;border:0;background:transparent;text-align:right;padding:7px 9px}.fin input:focus{outline:2px solid var(--laranja);background:#fff8f2}
.fin tr.secao td{background:var(--azul);color:#fff;font-weight:800;padding:7px 10px;font-size:12px;letter-spacing:.04em}.fin tr.ref td{color:var(--suave);font-style:italic;font-size:13px}.fin tr.saldo td{font-weight:800;background:#fafcfd}
.nome-linha{border:0;background:none;padding:0;text-align:left;font-weight:600;text-decoration:underline dotted var(--suave);text-underline-offset:3px}
.add{border:0;background:none;color:var(--azul2);font-weight:700;padding:4px 0}
.fab{display:none}
dialog{border:0;border-radius:14px;padding:0;width:min(560px,96vw);max-height:92vh}dialog::backdrop{background:#0c2f4799}
dialog form{padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px}dialog h3{grid-column:1/-1;margin:0 0 4px}
label{display:grid;gap:4px;font-size:13px;font-weight:600;color:var(--suave)}label input,label select{border:1px solid var(--linha);border-radius:9px;padding:9px;font-size:16px;color:var(--tinta);background:#fff}
.inteiro{grid-column:1/-1}.check{display:flex;align-items:center;gap:8px;font-size:15px;color:var(--tinta)}.check input{width:20px;height:20px}
.info{grid-column:1/-1;background:var(--cinza);border-radius:9px;padding:9px;font-size:14px}
.acoes{grid-column:1/-1;display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:6px}.acoes .btn.perigo{margin-right:auto}
#aviso{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:var(--tinta);color:#fff;padding:10px 16px;border-radius:10px;display:none;z-index:50;max-width:90vw}#aviso.erro{background:var(--vermelho)}
.dica{color:var(--suave);font-size:13px;margin:-6px 0 12px}
@media (max-width:899px){
  header{padding:10px 12px}nav{order:3;flex-basis:100%}nav button{flex:1}main{padding:12px}
  .cards{grid-template-columns:1fr 1fr}.mes{margin-left:0;width:100%;justify-content:space-between}
  table.lancs thead{display:none}table.lancs tr.lanc{display:grid;grid-template-columns:1fr 1fr;gap:2px 10px;padding:10px 12px;border-bottom:1px solid var(--linha)}
  table.lancs tr.lanc td{border:0;padding:1px 0;text-align:left;white-space:normal}table.lancs tr.lanc td[data-r]:before{content:attr(data-r) ": ";color:var(--suave);font-size:12px}
  table.lancs tr.lanc td.cab{grid-column:1/-1;font-weight:800;font-size:16px}table.lancs tr.lanc td.vz{display:none}
  table.lancs tr.total{display:grid;grid-template-columns:1fr 1fr;padding:8px 12px}table.lancs tr.total td{border:0;padding:1px 0;text-align:left}table.lancs tr.total td.vz{display:none}table.lancs tr.total td[data-r]:before{content:attr(data-r) ": ";color:var(--suave);font-weight:600;font-size:12px}
  .fab{display:block;position:fixed;right:16px;bottom:18px;z-index:20;border:0;background:var(--laranja);color:#fff;font-weight:800;padding:14px 20px;border-radius:999px;box-shadow:0 6px 18px #0004}
  .so-pc{display:none}main{padding-bottom:80px}
}
</style></head><body>
<header><h1><span>&#9951;</span>Frota</h1>
<nav><button data-aba="caminhoes">Caminhões</button><button data-aba="financeiro">Financeiro</button><button data-aba="resumo">Resumo</button></nav>
<div class="ano"><button id="anoMenos" aria-label="Ano anterior">&lsaquo;</button><span id="anoTxt"></span><button id="anoMais" aria-label="Próximo ano">&rsaquo;</button></div>
</header>
<main id="tela">Carregando...</main>
<button class="fab" id="fab">+ Lançar dia</button>
<dialog id="janela"></dialog>
<div id="aviso"></div>
<script>
var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var CURTO=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
var hoje=new Date();
var st={ano:hoje.getFullYear(),mes:hoje.getMonth()+1,aba:"caminhoes",cam:null,d:null};
try{var salvo=JSON.parse(localStorage.getItem("frota-tela")||"{}");if(salvo.aba)st.aba=salvo.aba;if(salvo.cam)st.cam=salvo.cam}catch(e){}
function lembrar(){try{localStorage.setItem("frota-tela",JSON.stringify({aba:st.aba,cam:st.cam}))}catch(e){}}
function $(s){return document.querySelector(s)}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function dinheiro(v){return Number(v||0).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}
function km(v){return v==null||v===""?"":Number(v).toLocaleString("pt-BR")}
function cor(v){return v<0?"neg":v>0?"pos":""}
function pc(){return window.matchMedia("(min-width:900px)").matches}
// Aceita "1.234,56", "1234,56", "1234.56" e "1.500" (mil e quinhentos).
function lerNumero(t){t=String(t||"").replace(/[R$\s]/g,"");if(!t)return 0;var neg=t.charAt(0)==="-";t=t.replace(/-/g,"");
  if(t.indexOf(",")>=0)t=t.replace(/\./g,"").replace(",",".");else{var p=t.split(".");if(p.length>2||(p.length===2&&p[1].length===3))t=p.join("")}
  var n=Number(t);if(!isFinite(n))return NaN;return neg?-n:n}
function aviso(msg,erro){var a=$("#aviso");a.textContent=msg;a.className=erro?"erro":"";a.style.display="block";clearTimeout(aviso.t);aviso.t=setTimeout(function(){a.style.display="none"},erro?5000:1800)}
function api(metodo,caminho,corpo){return fetch("/api/"+caminho,{method:metodo,headers:corpo?{"content-type":"application/json"}:undefined,body:corpo?JSON.stringify(corpo):undefined})
  .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||"Erro ao salvar.");return j})})}
function carregar(){return api("GET","dados?ano="+st.ano).then(function(d){st.d=d;if(!d.caminhoes.some(function(c){return c.id===st.cam}))st.cam=d.caminhoes.length?d.caminhoes[0].id:null;desenhar()}).catch(function(e){$("#tela").innerHTML="<p>"+esc(e.message)+"</p>"})}

function desenhar(){
  $("#anoTxt").textContent=st.ano;
  document.querySelectorAll("nav button").forEach(function(b){b.classList.toggle("ativo",b.dataset.aba===st.aba)});
  $("#fab").style.visibility=st.aba==="caminhoes"&&st.cam?"visible":"hidden";
  if(!st.d)return;
  if(st.aba==="caminhoes")telaCaminhoes();else if(st.aba==="financeiro")telaFinanceiro();else telaResumo();
}
function seletorMes(){return '<div class="mes"><button data-mes="-1" aria-label="Mês anterior">&lsaquo;</button><strong>'+MESES[st.mes-1]+" "+st.ano+'</strong><button data-mes="1" aria-label="Próximo mês">&rsaquo;</button></div>'}
function ligarMes(){document.querySelectorAll("[data-mes]").forEach(function(b){b.onclick=function(){var m=st.mes+Number(b.dataset.mes);if(m<1){st.mes=12;st.ano--;carregar();return}if(m>12){st.mes=1;st.ano++;carregar();return}st.mes=m;desenhar()}})}
function caminhao(id){return st.d.caminhoes.find(function(c){return c.id===id})}
function lancsDoMes(camId,mes){var pre=st.ano+"-"+String(mes).padStart(2,"0");return st.d.lancamentos.filter(function(l){return(!camId||l.caminhao_id===camId)&&l.data.slice(0,7)===pre})}
function soma(lista,campo){return lista.reduce(function(s,l){return s+Number(l[campo]||0)},0)}
function sobra(lista){return soma(lista,"frete")-soma(lista,"diesel")-soma(lista,"motorista")-soma(lista,"ajudante")}

/* ---------- CAMINHÕES ---------- */
function telaCaminhoes(){
  var d=st.d,c=caminhao(st.cam);
  var h='<div class="barra">';
  d.caminhoes.forEach(function(x){h+='<button class="chip'+(x.id===st.cam?" ativo":"")+'" data-cam="'+esc(x.id)+'">'+esc(x.placa)+"</button>"});
  h+='<button class="btn" id="novoCam">+ Caminhão</button>';
  if(c)h+='<button class="btn" id="editCam">Editar '+esc(c.placa)+"</button>";
  h+=seletorMes()+"</div>";
  if(!c){$("#tela").innerHTML=h+"<p>Cadastre um caminhão para começar.</p>";ligarCam();return}
  var mes=lancsDoMes(c.id,st.mes);
  h+='<div class="cards"><div class="card"><small>Frete do mês</small><b>'+dinheiro(soma(mes,"frete"))+'</b></div><div class="card"><small>Diesel</small><b>'+dinheiro(soma(mes,"diesel"))+'</b></div><div class="card"><small>'+esc(c.nome_motorista)+" + "+esc(c.nome_ajudante)+'</small><b>'+dinheiro(soma(mes,"motorista")+soma(mes,"ajudante"))+'</b></div><div class="card"><small>Sobra (frete − gastos)</small><b class="'+cor(sobra(mes))+'">'+dinheiro(sobra(mes))+"</b></div></div>";
  h+=blocoQuinzena(c,mes.filter(function(l){return Number(l.data.slice(8))<=15}),"01 a 15");
  h+=blocoQuinzena(c,mes.filter(function(l){return Number(l.data.slice(8))>15}),"16 a 31");
  $("#tela").innerHTML=h;ligarCam();
}
function excedente(c,l){if(l.pernoite)return '<span class="pernoite">PERNOITE</span>';if(l.km_inicial==null||l.km_final==null)return "";return km(l.km_final-l.km_inicial-c.km_franquia)}
function blocoQuinzena(c,lista,titulo){
  var h='<section class="bloco"><h2><span>'+titulo+'</span><button class="btn prim so-pc" data-novo="'+(titulo==="01 a 15"?1:16)+'">+ Lançar dia</button></h2><div class="rolar"><table class="lancs"><thead><tr><th>Data</th><th class="txt">Região</th><th>KM inicial</th><th>KM final</th><th>KM exced.</th><th>Saída</th><th>Diesel</th><th>Frete</th><th>'+esc(c.nome_motorista)+"</th><th>"+esc(c.nome_ajudante)+'</th><th class="txt">Obs</th></tr></thead><tbody>';
  if(!lista.length)h+='<tr class="vazio"><td colspan="11">Nenhum lançamento nesta quinzena.</td></tr>';
  lista.forEach(function(l){var dt=l.data.slice(8)+"/"+l.data.slice(5,7);
    h+='<tr class="lanc" data-id="'+esc(l.id)+'"><td class="cab">'+dt+' <span class="so-cel"></span></td><td class="txt" data-r="Região">'+esc(l.regiao)+'</td><td data-r="KM ini">'+km(l.km_inicial)+'</td><td data-r="KM fim">'+km(l.km_final)+'</td><td data-r="Exced.">'+excedente(c,l)+'</td><td data-r="Saída">'+dinheiro(l.valor_saida)+'</td><td data-r="Diesel">'+dinheiro(l.diesel)+'</td><td data-r="Frete"><b>'+dinheiro(l.frete)+'</b></td><td data-r="'+esc(c.nome_motorista)+'">'+dinheiro(l.motorista)+'</td><td data-r="'+esc(c.nome_ajudante)+'">'+dinheiro(l.ajudante)+'</td><td class="txt'+(l.obs?"":" vz")+'" data-r="Obs">'+esc(l.obs)+"</td></tr>"});
  h+='<tr class="total"><td>Total ('+lista.length+(lista.length===1?" dia)":" dias)")+"</td><td class=\"vz\"></td><td class=\"vz\"></td><td class=\"vz\"></td><td class=\"vz\"></td><td class=\"vz\"></td><td data-r=\"Diesel\">"+dinheiro(soma(lista,"diesel"))+'</td><td data-r="Frete">'+dinheiro(soma(lista,"frete"))+'</td><td data-r="'+esc(c.nome_motorista)+'">'+dinheiro(soma(lista,"motorista"))+'</td><td data-r="'+esc(c.nome_ajudante)+'">'+dinheiro(soma(lista,"ajudante"))+'</td><td class="vz"></td></tr>';
  return h+"</tbody></table></div></section>";
}
function ligarCam(){
  ligarMes();
  document.querySelectorAll("[data-cam]").forEach(function(b){b.onclick=function(){st.cam=b.dataset.cam;lembrar();desenhar()}});
  var n=$("#novoCam");if(n)n.onclick=function(){formCaminhao(null)};
  var e=$("#editCam");if(e)e.onclick=function(){formCaminhao(caminhao(st.cam))};
  document.querySelectorAll("[data-novo]").forEach(function(b){b.onclick=function(){formLancamento(null,Number(b.dataset.novo))}});
  document.querySelectorAll("tr.lanc").forEach(function(tr){tr.onclick=function(){formLancamento(st.d.lancamentos.find(function(l){return l.id===tr.dataset.id}))}});
}
function campo(rotulo,nome,valor,extra){return '<label'+(extra&&extra.inteiro?' class="inteiro"':"")+">"+rotulo+'<input name="'+nome+'" value="'+esc(valor==null?"":valor)+'"'+(extra&&extra.attr?" "+extra.attr:"")+"></label>"}
function dinheiroCampo(v){return v?String(Number(v).toFixed(2)).replace(".",","):""}
function ultimoDoCaminhao(camId){var l=st.d.lancamentos.filter(function(x){return x.caminhao_id===camId});return l.length?l[l.length-1]:null}
function formLancamento(l,dia){
  var c=caminhao(l?l.caminhao_id:st.cam),novo=!l;
  if(novo){var ult=ultimoDoCaminhao(c.id),uk=(st.d.ultimoKm.find(function(x){return x.caminhao_id===c.id})||{}).km;
    var dd=(hoje.getFullYear()===st.ano&&hoje.getMonth()+1===st.mes&&(!dia||(dia===1?hoje.getDate()<=15:hoje.getDate()>15)))?hoje.getDate():(dia||1);
    l={data:st.ano+"-"+String(st.mes).padStart(2,"0")+"-"+String(dd).padStart(2,"0"),regiao:"",km_inicial:uk==null?"":uk,km_final:"",pernoite:0,valor_saida:ult?ult.valor_saida:0,diesel:0,frete:ult?ult.valor_saida:0,motorista:c.valor_motorista,ajudante:c.valor_ajudante,obs:""}}
  var j=$("#janela");
  j.innerHTML='<form method="dialog"><h3>'+(novo?"Lançar dia":"Editar dia")+" · "+esc(c.placa)+"</h3>"+
    campo("Data","data",l.data,{attr:'type="date" required'})+campo("Região","regiao",l.regiao,{attr:'autocomplete="off" list="regioes"'})+
    '<label class="check inteiro"><input type="checkbox" name="pernoite"'+(l.pernoite?" checked":"")+"> Pernoite (não rodou)</label>"+
    campo("KM inicial","km_inicial",l.km_inicial,{attr:'inputmode="numeric"'})+campo("KM final","km_final",l.km_final,{attr:'inputmode="numeric"'})+
    '<div class="info" id="kmInfo"></div>'+
    campo("Valor saída","valor_saida",dinheiroCampo(l.valor_saida),{attr:'inputmode="decimal"'})+campo("Diesel","diesel",dinheiroCampo(l.diesel),{attr:'inputmode="decimal"'})+
    campo("Valor frete","frete",dinheiroCampo(l.frete),{attr:'inputmode="decimal"',inteiro:true})+
    campo(esc(c.nome_motorista),"motorista",dinheiroCampo(l.motorista),{attr:'inputmode="decimal"'})+campo(esc(c.nome_ajudante),"ajudante",dinheiroCampo(l.ajudante),{attr:'inputmode="decimal"'})+
    campo("Obs","obs",l.obs,{inteiro:true})+
    '<datalist id="regioes">'+Array.from(new Set(st.d.lancamentos.map(function(x){return x.regiao}).filter(Boolean))).map(function(r){return '<option value="'+esc(r)+'">'}).join("")+"</datalist>"+
    '<div class="acoes">'+(novo?"":'<button type="button" class="btn perigo" id="excluir">Excluir</button>')+'<button type="button" class="btn" id="cancelar">Cancelar</button><button class="btn prim">Salvar</button></div></form>';
  var f=j.querySelector("form");
  function atualizaKm(){var p=f.pernoite.checked;f.km_final.disabled=p;if(p)f.km_final.value=f.km_inicial.value;
    var a=Number(String(f.km_inicial.value).replace(/\D/g,"")),b=Number(String(f.km_final.value).replace(/\D/g,""));
    $("#kmInfo").innerHTML=p?"Pernoite: KM final igual ao inicial.":(f.km_inicial.value&&f.km_final.value?"Rodou <b>"+km(b-a)+" km</b> · excedente <b>"+km(b-a-c.km_franquia)+" km</b> (franquia "+c.km_franquia+" km)":"Preencha os KMs para ver o excedente.")}
  f.pernoite.onchange=atualizaKm;f.km_inicial.oninput=atualizaKm;f.km_final.oninput=atualizaKm;atualizaKm();
  $("#cancelar").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){if(!confirm("Excluir este lançamento?"))return;api("DELETE","lancamento?id="+encodeURIComponent(l.id)).then(function(){j.close();aviso("Lançamento excluído");carregar()}).catch(function(e){aviso(e.message,true)})};
  f.onsubmit=function(ev){ev.preventDefault();var corpo={id:l.id,caminhao_id:c.id,data:f.data.value,regiao:f.regiao.value,pernoite:f.pernoite.checked,km_inicial:f.km_inicial.value,km_final:f.pernoite.checked?f.km_inicial.value:f.km_final.value,obs:f.obs.value};
    var ok=true;["valor_saida","diesel","frete","motorista","ajudante"].forEach(function(k){var n=lerNumero(f[k].value);if(isNaN(n))ok=false;corpo[k]=n});
    if(!ok){aviso("Confira os valores em dinheiro.",true);return}
    api("POST","lancamento",corpo).then(function(){j.close();aviso("Salvo");var m=Number(corpo.data.slice(5,7)),a=Number(corpo.data.slice(0,4));st.mes=m;if(a!==st.ano)st.ano=a;carregar()}).catch(function(e){aviso(e.message,true)})};
  j.showModal();
}
function formCaminhao(c){
  var novo=!c;c=c||{placa:"",nome_motorista:"Motorista",nome_ajudante:"Ajudante",valor_motorista:170,valor_ajudante:100,km_franquia:130};
  var j=$("#janela");
  j.innerHTML='<form method="dialog"><h3>'+(novo?"Novo caminhão":"Editar caminhão")+"</h3>"+campo("Placa","placa",c.placa,{attr:"required",inteiro:true})+
    campo("Nome do motorista","nome_motorista",c.nome_motorista)+campo("Diária do motorista","valor_motorista",dinheiroCampo(c.valor_motorista),{attr:'inputmode="decimal"'})+
    campo("Nome do ajudante","nome_ajudante",c.nome_ajudante)+campo("Diária do ajudante","valor_ajudante",dinheiroCampo(c.valor_ajudante),{attr:'inputmode="decimal"'})+
    campo("KM livre por dia (franquia)","km_franquia",c.km_franquia,{attr:'inputmode="numeric"',inteiro:true})+
    '<p class="dica inteiro" style="margin:0">Os nomes aparecem nas colunas da tabela. As diárias já vêm preenchidas em cada novo lançamento.</p>'+
    '<div class="acoes">'+(novo?"":'<button type="button" class="btn perigo" id="excluir">Excluir</button>')+'<button type="button" class="btn" id="cancelar">Cancelar</button><button class="btn prim">Salvar</button></div></form>';
  var f=j.querySelector("form");$("#cancelar").onclick=function(){j.close()};
  if(!novo)$("#excluir").onclick=function(){if(!confirm("Excluir o caminhão "+c.placa+"?"))return;api("DELETE","caminhao?id="+encodeURIComponent(c.id)).then(function(){j.close();aviso("Caminhão excluído");carregar()}).catch(function(e){aviso(e.message,true)})};
  f.onsubmit=function(ev){ev.preventDefault();api("POST","caminhao",{id:c.id,placa:f.placa.value,nome_motorista:f.nome_motorista.value,nome_ajudante:f.nome_ajudante.value,valor_motorista:lerNumero(f.valor_motorista.value),valor_ajudante:lerNumero(f.valor_ajudante.value),km_franquia:f.km_franquia.value})
    .then(function(r){j.close();aviso("Salvo");st.cam=r.id;lembrar();carregar()}).catch(function(e){aviso(e.message,true)})};
  j.showModal();
}

/* ---------- FINANCEIRO ---------- */
var GRUPOS=[["rec1","rec2","ENTRADAS"],["desp1",null,"DESPESAS 01 A 15"],["desp2",null,"DESPESAS 16 A 31"]];
function valor(linhaId,mes){var v=st.d.valores.find(function(x){return x.linha_id===linhaId&&x.mes===mes});return v?v.valor:0}
function linhasDe(g){return st.d.linhas.filter(function(l){return l.grupo===g})}
function totalGrupo(g,mes){return linhasDe(g).reduce(function(s,l){return s+valor(l.id,mes)},0)}
function freteQuinzena(mes,q){return st.d.lancamentos.filter(function(l){return Number(l.data.slice(5,7))===mes&&(q===1?Number(l.data.slice(8))<=15:Number(l.data.slice(8))>15)}).reduce(function(s,l){return s+Number(l.frete||0)},0)}
function saldos(mes){var q1=totalGrupo("rec1",mes)-totalGrupo("desp1",mes),q2=totalGrupo("rec2",mes)-totalGrupo("desp2",mes);return{q1:q1,q2:q2,mes:q1+q2}}
function acumulado(mes){var s=0;for(var m=1;m<=mes;m++)s+=saldos(m).mes;return s}
function telaFinanceiro(){
  var meses=pc()?[1,2,3,4,5,6,7,8,9,10,11,12]:[st.mes];
  var h='<div class="barra">'+(pc()?'<span class="dica" style="margin:0">Clique num valor para editar. Clique no nome da linha para renomear, repetir o valor ou excluir.</span>':seletorMes())+"</div>";
  h+='<section class="bloco"><div class="rolar"><table class="fin"><thead><tr><th></th>'+meses.map(function(m){return "<th>"+(pc()?CURTO[m-1]:MESES[m-1])+"</th>"}).join("")+"</tr></thead><tbody>";
  function linhaValores(l){var r='<tr><td><button class="nome-linha" data-linha="'+esc(l.id)+'">'+esc(l.nome)+"</button></td>";
    meses.forEach(function(m){var v=valor(l.id,m);r+='<td><input inputmode="decimal" data-l="'+esc(l.id)+'" data-m="'+m+'" value="'+(v?dinheiro(v):"")+'" aria-label="'+esc(l.nome)+" "+MESES[m-1]+'"></td>'});return r+"</tr>"}
  function linhaCalc(rotulo,fn,cls){return '<tr class="'+(cls||"")+'"><td>'+rotulo+"</td>"+meses.map(function(m){var v=fn(m);return '<td class="calc '+(cls==="saldo"?cor(v):"")+'">'+dinheiro(v)+"</td>"}).join("")+"</tr>"}
  function adicionar(g,rot){return '<tr><td colspan="'+(meses.length+1)+'"><button class="add" data-add="'+g+'">+ '+rot+"</button></td></tr>"}
  var col=meses.length+1;
  h+='<tr class="secao"><td colspan="'+col+'">ENTRADAS: RECEITAS</td></tr>';
  linhasDe("rec1").forEach(function(l){h+=linhaValores(l)});
  h+=linhaCalc("&#8627; frete dos caminhões 01–15",function(m){return freteQuinzena(m,1)},"ref");
  h+=adicionar("rec1","entrada na 1ª quinzena");
  linhasDe("rec2").forEach(function(l){h+=linhaValores(l)});
  h+=linhaCalc("&#8627; frete dos caminhões 16–31",function(m){return freteQuinzena(m,2)},"ref");
  h+=adicionar("rec2","entrada na 2ª quinzena");
  h+=linhaCalc("Total de entradas",function(m){return totalGrupo("rec1",m)+totalGrupo("rec2",m)},"saldo");
  [["desp1","SAÍDA: DESPESAS 01 A 15"],["desp2","SAÍDA: DESPESAS 16 A 31"]].forEach(function(g){
    h+='<tr class="secao"><td colspan="'+col+'">'+g[1]+"</td></tr>";
    linhasDe(g[0]).forEach(function(l){h+=linhaValores(l)});
    h+=adicionar(g[0],"despesa");
    h+=linhaCalc("Total",function(m){return totalGrupo(g[0],m)},"saldo total");
  });
  h+='<tr class="secao"><td colspan="'+col+'">BALANÇO</td></tr>';
  h+=linhaCalc("Saldo 01 a 15",function(m){return saldos(m).q1},"saldo");
  h+=linhaCalc("Saldo 16 a 31",function(m){return saldos(m).q2},"saldo");
  h+=linhaCalc("Saldo do mês",function(m){return saldos(m).mes},"saldo");
  h+=linhaCalc("Acumulado no ano",acumulado,"saldo");
  h+="</tbody></table></div></section>";
  $("#tela").innerHTML=h;ligarMes();
  document.querySelectorAll(".fin input").forEach(function(inp){
    inp.onfocus=function(){var v=valor(inp.dataset.l,Number(inp.dataset.m));inp.value=v?dinheiroCampo(v):"";inp.select()};
    inp.onkeydown=function(e){if(e.key==="Enter"){e.preventDefault();inp.blur()}};
    inp.onblur=function(){var n=lerNumero(inp.value),m=Number(inp.dataset.m),id=inp.dataset.l,antes=valor(id,m);
      if(isNaN(n)){aviso("Valor inválido.",true);inp.value=antes?dinheiro(antes):"";return}
      n=Math.round(n*100)/100;if(n===antes){inp.value=n?dinheiro(n):"";return}
      api("POST","valor",{linha_id:id,mes:m,valor:n}).then(function(){var lista=st.d.valores.filter(function(x){return!(x.linha_id===id&&x.mes===m)});if(n)lista.push({linha_id:id,mes:m,valor:n});st.d.valores=lista;
        var foco=document.activeElement,fl=foco&&foco.dataset?foco.dataset.l:null,fm=foco&&foco.dataset?foco.dataset.m:null;telaFinanceiro();
        if(fl){var de=document.querySelector('.fin input[data-l="'+fl+'"][data-m="'+fm+'"]');if(de)de.focus()}}).catch(function(e){aviso(e.message,true)})};
  });
  document.querySelectorAll("[data-add]").forEach(function(b){b.onclick=function(){var nome=prompt("Nome da linha:");if(!nome||!nome.trim())return;api("POST","linha",{ano:st.ano,grupo:b.dataset.add,nome:nome}).then(carregar).catch(function(e){aviso(e.message,true)})}});
  document.querySelectorAll("[data-linha]").forEach(function(b){b.onclick=function(){formLinha(st.d.linhas.find(function(l){return l.id===b.dataset.linha}))}});
}
function formLinha(l){
  var j=$("#janela"),mesBase=pc()?(hoje.getFullYear()===st.ano?hoje.getMonth()+1:1):st.mes;
  j.innerHTML='<form method="dialog"><h3>'+esc(l.nome)+"</h3>"+campo("Nome","nome",l.nome,{attr:"required",inteiro:true})+
    '<div class="info">Repetir o valor de <select name="mes" style="border:1px solid var(--linha);border-radius:8px;padding:4px">'+MESES.map(function(n,i){return '<option value="'+(i+1)+'"'+(i+1===mesBase?" selected":"")+">"+n+"</option>"}).join("")+'</select> até dezembro. <button type="button" class="btn" id="repetir">Repetir</button></div>'+
    '<div class="acoes"><button type="button" class="btn perigo" id="excluir">Excluir linha</button><button type="button" class="btn" id="cancelar">Cancelar</button><button class="btn prim">Salvar nome</button></div></form>';
  var f=j.querySelector("form");$("#cancelar").onclick=function(){j.close()};
  $("#repetir").onclick=function(){var m=Number(f.mes.value);if(!confirm("Repetir "+dinheiro(valor(l.id,m))+" de "+MESES[m-1]+" nos meses seguintes até dezembro?"))return;api("POST","valor/repetir",{linha_id:l.id,mes:m}).then(function(){j.close();aviso("Valor repetido");carregar()}).catch(function(e){aviso(e.message,true)})};
  $("#excluir").onclick=function(){if(!confirm("Excluir a linha "+l.nome+" e todos os valores dela em "+st.ano+"?"))return;api("DELETE","linha?id="+encodeURIComponent(l.id)).then(function(){j.close();aviso("Linha excluída");carregar()}).catch(function(e){aviso(e.message,true)})};
  f.onsubmit=function(ev){ev.preventDefault();api("POST","linha",{id:l.id,nome:f.nome.value}).then(function(){j.close();carregar()}).catch(function(e){aviso(e.message,true)})};
  j.showModal();
}

/* ---------- RESUMO ---------- */
function telaResumo(){
  var d=st.d,meses=[1,2,3,4,5,6,7,8,9,10,11,12];
  var ano=d.lancamentos,h='<div class="cards">';
  h+='<div class="card"><small>Frete no ano (todos)</small><b>'+dinheiro(soma(ano,"frete"))+'</b></div><div class="card"><small>Sobra dos caminhões no ano</small><b class="'+cor(sobra(ano))+'">'+dinheiro(sobra(ano))+'</b></div>';
  var ent=0,sai=0;meses.forEach(function(m){ent+=totalGrupo("rec1",m)+totalGrupo("rec2",m);sai+=totalGrupo("desp1",m)+totalGrupo("desp2",m)});
  h+='<div class="card"><small>Entradas no financeiro</small><b>'+dinheiro(ent)+'</b></div><div class="card"><small>Saldo do ano (financeiro)</small><b class="'+cor(ent-sai)+'">'+dinheiro(ent-sai)+"</b></div></div>";
  h+='<section class="bloco"><h2>Caminhões por mês</h2><div class="rolar"><table><thead><tr><th>Mês</th>';
  d.caminhoes.forEach(function(c){h+="<th>Frete "+esc(c.placa)+"</th>"});
  h+="<th>Frete total</th><th>Diesel</th><th>Motoristas e ajudantes</th><th>Sobra</th><th>Dias</th></tr></thead><tbody>";
  meses.forEach(function(m){var l=lancsDoMes(null,m);h+="<tr><td>"+MESES[m-1]+"</td>";d.caminhoes.forEach(function(c){h+="<td>"+dinheiro(soma(lancsDoMes(c.id,m),"frete"))+"</td>"});
    h+="<td><b>"+dinheiro(soma(l,"frete"))+"</b></td><td>"+dinheiro(soma(l,"diesel"))+"</td><td>"+dinheiro(soma(l,"motorista")+soma(l,"ajudante"))+'</td><td class="'+cor(sobra(l))+'">'+dinheiro(sobra(l))+"</td><td>"+l.length+"</td></tr>"});
  h+='<tr class="total"><td>Ano</td>';d.caminhoes.forEach(function(c){h+="<td>"+dinheiro(soma(ano.filter(function(l){return l.caminhao_id===c.id}),"frete"))+"</td>"});
  h+="<td>"+dinheiro(soma(ano,"frete"))+"</td><td>"+dinheiro(soma(ano,"diesel"))+"</td><td>"+dinheiro(soma(ano,"motorista")+soma(ano,"ajudante"))+'</td><td class="'+cor(sobra(ano))+'">'+dinheiro(sobra(ano))+"</td><td>"+ano.length+"</td></tr></tbody></table></div></section>";
  h+='<section class="bloco"><h2>Financeiro por mês</h2><div class="rolar"><table><thead><tr><th>Mês</th><th>Entradas</th><th>Despesas</th><th>Saldo do mês</th><th>Acumulado</th></tr></thead><tbody>';
  meses.forEach(function(m){var e=totalGrupo("rec1",m)+totalGrupo("rec2",m),s=totalGrupo("desp1",m)+totalGrupo("desp2",m),a=acumulado(m);
    h+="<tr><td>"+MESES[m-1]+"</td><td>"+dinheiro(e)+"</td><td>"+dinheiro(s)+'</td><td class="'+cor(e-s)+'">'+dinheiro(e-s)+'</td><td class="'+cor(a)+'">'+dinheiro(a)+"</td></tr>"});
  h+="</tbody></table></div></section>";
  $("#tela").innerHTML=h;
}

document.querySelectorAll("nav button").forEach(function(b){b.onclick=function(){st.aba=b.dataset.aba;lembrar();desenhar()}});
$("#anoMenos").onclick=function(){st.ano--;carregar()};$("#anoMais").onclick=function(){st.ano++;carregar()};
$("#fab").onclick=function(){formLancamento(null,0)};
var largura=pc();window.addEventListener("resize",function(){if(pc()!==largura){largura=pc();if(st.aba==="financeiro")desenhar()}});
carregar();
</script></body></html>`;
