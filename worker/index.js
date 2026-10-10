const page = String.raw`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#102a43">
  <title>Frota Fácil</title>
  <style>
    :root{--navy:#102a43;--navy2:#193f5d;--ink:#17202a;--muted:#66788a;--line:#dde7ec;--bg:#f3f7f8;--orange:#ef7d32;--green:#1d8a63;--red:#c24145;--radius:18px;font-family:Arial,Helvetica,sans-serif;color:#17202a;background:#f3f7f8}
    *{box-sizing:border-box}body{margin:0;background:var(--bg)}button,input,select,textarea{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #ef7d3250;outline-offset:2px}
    .shell{min-height:100vh}.side{position:fixed;inset:0 auto 0 0;width:255px;z-index:20;display:flex;flex-direction:column;padding:26px 18px;color:white;background:linear-gradient(180deg,#0b263e,#123b59)}
    .brand{display:flex;align-items:center;gap:12px;padding:0 8px 28px}.logo{display:grid;width:48px;height:48px;place-items:center;border-radius:15px;background:var(--orange);font-size:25px;box-shadow:0 8px 22px #ef7d3240}.brand div:last-child{display:grid;gap:2px}.brand strong{font-size:20px}.brand span{font-size:12px;color:#b9cad6}
    nav{display:grid;gap:7px}.nav{display:flex;min-height:51px;align-items:center;gap:13px;padding:0 15px;border:0;border-radius:13px;color:#c8d6df;background:transparent;font-weight:700;text-align:left}.nav.active{color:var(--navy);background:white}.help{margin-top:auto;padding:15px;border:1px solid #ffffff20;border-radius:14px;color:#d9e4ea;background:#ffffff10;font-size:12px;line-height:1.5}
    .main{min-height:100vh;margin-left:255px;padding:30px 34px 52px}.top{display:flex;align-items:center;justify-content:space-between;gap:20px;max-width:1400px;margin:0 auto 27px}.eye{margin:0 0 5px;color:#7d8b96;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.top h1,.panel h2{margin:0;color:var(--navy)}.top h1{font-size:36px;letter-spacing:-.04em}.actions{display:flex;gap:11px}.filter{display:flex;align-items:center;gap:8px;min-height:48px;padding:0 13px;border:1px solid var(--line);border-radius:13px;background:white}.filter select{border:0;color:var(--navy);background:transparent;font-weight:700}
    .primary,.secondary,.ghost{display:inline-flex;min-height:48px;align-items:center;justify-content:center;gap:8px;padding:0 18px;border-radius:13px;font-weight:800}.primary{border:0;color:white;background:var(--orange);box-shadow:0 8px 20px #ef7d3230}.secondary{border:1px solid #b9cbd5;color:var(--navy);background:#f7fafb}.ghost{border:1px solid var(--line);color:var(--muted);background:white}
    .error{display:none;max-width:1400px;margin:-10px auto 18px;padding:13px 16px;border:1px solid #fecaca;border-radius:13px;color:#9f2d32;background:#fff1f1;font-weight:700}.error.show{display:block}
    .metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1400px;margin:0 auto 18px}.metric{min-height:125px;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:white;box-shadow:0 6px 18px #1e37460a}.metric span{display:block;color:var(--muted);font-size:12px;font-weight:700}.metric strong{display:block;margin-top:12px;color:var(--navy);font-size:26px;letter-spacing:-.04em}.metric small{display:block;margin-top:6px;color:var(--muted)}.metric.orange{border-top:4px solid var(--orange)}.metric.green{border-top:4px solid var(--green)}.metric.blue{border-top:4px solid #2c7fa9}.metric.navy{border-top:4px solid var(--navy)}
    .grid{display:grid;grid-template-columns:2fr 1fr;gap:18px;max-width:1400px;margin:0 auto 18px}.panel{padding:22px;border:1px solid var(--line);border-radius:var(--radius);background:white;box-shadow:0 6px 18px #1e37460a}.head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:18px}.head h2{font-size:20px}.trucks{display:grid;gap:11px}.truck{display:grid;grid-template-columns:110px 1fr auto;align-items:center;gap:15px;width:100%;min-height:94px;padding:10px;border:1px solid #e2e9ed;border-radius:15px;background:#fbfdfd;text-align:left}.truck:hover{background:#f4fafb}.truckpic{display:grid;height:72px;place-items:center;border-radius:12px;color:white;background:linear-gradient(135deg,#315a73,#16384f);font-size:29px}.truck:nth-child(2) .truckpic{background:linear-gradient(135deg,#d97b39,#aa4f19)}.truck:nth-child(3) .truckpic{background:linear-gradient(135deg,#4d6e5c,#244a37)}.truckpic b{padding:3px 6px;border-radius:4px;color:#17202a;background:white;font-size:10px}.truckbody{display:grid;gap:4px}.truckbody em{color:var(--green);font-size:11px;font-style:normal;font-weight:800}.truckbody strong{color:var(--navy)}.truckbody span{color:var(--muted);font-size:12px}
    .quick button{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:11px;width:100%;padding:13px 4px;border:0;border-bottom:1px solid #e8eef1;background:transparent;text-align:left}.quick button:last-child{border-bottom:0}.qicon{display:grid;width:42px;height:42px;place-items:center;border-radius:12px;background:#fff0e5;font-size:21px}.quick b{display:block;color:var(--navy);font-size:14px}.quick small{color:var(--muted)}
    .wide{max-width:1400px;margin:0 auto}.records{display:grid}.record{display:grid;grid-template-columns:115px 1fr 145px 40px;align-items:center;gap:15px;min-height:74px;border-top:1px solid #e8eef1}.record:first-child{border-top:0}.record .date{color:#667f8e;font-size:12px;font-weight:700}.record .mainrow{display:grid;gap:5px}.record .mainrow b{color:var(--navy)}.record .mainrow span{color:var(--muted);font-size:11px}.record .value{text-align:right}.record .value small{display:block;color:var(--muted);text-transform:uppercase}.record .value b{color:var(--navy)}.trash{width:34px;height:34px;border:0;border-radius:9px;color:#9aa8b1;background:transparent}.trash:hover{color:var(--red);background:#fff0f0}.empty{padding:75px 20px;color:var(--muted);text-align:center}.empty b{display:block;margin-bottom:7px;color:var(--navy);font-size:17px}
    .view{display:none}.view.active{display:block}.modal{position:fixed;inset:0;z-index:50;display:none;overflow:auto;place-items:center;padding:25px;background:#071a28a8;backdrop-filter:blur(4px)}.modal.open{display:grid}.dialog{width:min(680px,100%);max-height:calc(100vh - 40px);overflow:auto;border-radius:22px;background:white}.dialog header{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--line);background:white}.dialog h2{margin:0;color:var(--navy)}.close{width:42px;height:42px;border:1px solid var(--line);border-radius:12px;background:white;font-size:21px}.dialog form{padding:22px 24px}.formgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.field{display:grid;gap:7px}.field.full{grid-column:1/-1}.field>span{color:#465b69;font-size:12px;font-weight:800}.field input,.field select,.field textarea{width:100%;min-height:47px;padding:0 12px;border:1px solid #cfdbe2;border-radius:11px;background:white}.field textarea{padding:12px}.check{display:flex;align-items:center;gap:10px;align-self:end;min-height:55px;padding:10px;border:1px solid #cfdbe2;border-radius:11px}.check input{width:22px;height:22px}.form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:17px;border-top:1px solid var(--line)}.mobilebar{display:none}.loading{padding:100px;text-align:center;color:var(--navy)}
    @media(max-width:1000px){.metrics{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}}
    @media(max-width:720px){.side{transform:translateX(-110%)}.main{margin-left:0;padding:18px 13px 88px}.top{align-items:flex-start}.top h1{font-size:27px}.eye{display:none}.filter{min-height:44px;padding:0 8px}.filter select{width:90px;font-size:12px}.primary{min-height:44px;padding:0 12px}.metrics{gap:10px}.metric{min-height:104px;padding:14px}.metric strong{font-size:19px}.panel{padding:17px}.truck{grid-template-columns:82px 1fr}.truck>span:last-child{display:none}.record{grid-template-columns:1fr auto;padding:12px 0}.record .mainrow{grid-column:1}.record .value{grid-column:2;grid-row:1/3}.record .trash{display:none}.mobilebar{position:fixed;inset:auto 0 0;z-index:30;display:grid;grid-template-columns:repeat(4,1fr);padding:7px 4px max(7px,env(safe-area-inset-bottom));border-top:1px solid var(--line);background:#fffffff7}.mobilebar button{display:grid;gap:3px;justify-items:center;min-height:48px;border:0;color:#7b8d98;background:transparent;font-size:10px;font-weight:800}.mobilebar button.active{color:#d96821}.modal{align-items:end;padding:0}.dialog{width:100%;max-height:94vh;border-radius:22px 22px 0 0}.formgrid{grid-template-columns:1fr}.field.full{grid-column:auto}}
  </style>
</head>
<body>
<div class="shell">
  <aside class="side"><div class="brand"><div class="logo">🚚</div><div><strong>Frota Fácil</strong><span>Gestão dos caminhões</span></div></div><nav><button class="nav active" data-view="painel">▦ Painel</button><button class="nav" data-view="viagens">↗ Viagens</button><button class="nav" data-view="despesas">R$ Despesas</button><button class="nav" data-view="manutencao">🔧 Manutenção</button></nav><div class="help"><b>✓ Dados protegidos</b><br>Salvos automaticamente</div></aside>
  <main class="main"><header class="top"><div><p class="eye">Visão geral da operação</p><h1 id="title">Painel</h1></div><div class="actions"><label class="filter">🚚 <select id="filter"><option value="todos">Todos os caminhões</option></select></label><button class="primary" data-open="trip">＋ Nova viagem</button></div></header><div class="error" id="error"></div><div id="loading" class="loading">Carregando a frota...</div>
    <section class="view active" id="painel"><div class="metrics"><article class="metric green"><span>Receita de fretes</span><strong id="revenue">R$ 0,00</strong></article><article class="metric orange"><span>Total de custos</span><strong id="costs">R$ 0,00</strong></article><article class="metric blue"><span>Resultado</span><strong id="balance">R$ 0,00</strong></article><article class="metric navy"><span>Viagens lançadas</span><strong id="tripcount">0</strong><small id="kmcount">0 km percorridos</small></article></div><div class="grid"><section class="panel"><div class="head"><div><p class="eye">Acesso rápido</p><h2>Seus 3 caminhões</h2></div><span>🚚</span></div><div class="trucks" id="trucks"></div></section><section class="panel quick"><div class="head"><div><p class="eye">Lançar agora</p><h2>Ações rápidas</h2></div></div><button data-open="trip"><span class="qicon">↗</span><span><b>Nova viagem</b><small>Frete, diesel e quilômetros</small></span><span>›</span></button><button data-open="expense"><span class="qicon">⛽</span><span><b>Nova despesa</b><small>Combustível e outros gastos</small></span><span>›</span></button><button data-open="maintenance"><span class="qicon">🔧</span><span><b>Nova manutenção</b><small>Serviços e próximos prazos</small></span><span>›</span></button></section></div><section class="panel wide"><div class="head"><div><p class="eye">Últimos registros</p><h2>Viagens recentes</h2></div></div><div id="recent"></div></section></section>
    <section class="view panel wide" id="viagens"><div class="head"><div><p class="eye">Histórico</p><h2>Viagens e fretes</h2></div><button class="secondary" data-open="trip">＋ Adicionar</button></div><div id="trips"></div></section>
    <section class="view panel wide" id="despesas"><div class="head"><div><p class="eye">Controle financeiro</p><h2>Despesas</h2></div><button class="secondary" data-open="expense">＋ Adicionar</button></div><div id="expenses"></div></section>
    <section class="view panel wide" id="manutencao"><div class="head"><div><p class="eye">Cuidados com a frota</p><h2>Manutenções</h2></div><button class="secondary" data-open="maintenance">＋ Adicionar</button></div><div id="maintenance"></div></section>
  </main>
  <nav class="mobilebar"><button class="active" data-view="painel">▦<span>Painel</span></button><button data-view="viagens">↗<span>Viagens</span></button><button data-view="despesas">R$<span>Despesas</span></button><button data-view="manutencao">🔧<span>Manutenção</span></button></nav>
</div>
<div class="modal" id="modal"><section class="dialog"><header><div><p class="eye">Novo lançamento</p><h2 id="modal-title">Nova viagem</h2></div><button class="close" type="button">×</button></header><form id="entry-form"><div class="formgrid" id="fields"></div><div class="form-actions"><button type="button" class="ghost close-action">Cancelar</button><button class="primary" type="submit">✓ Salvar lançamento</button></div></form></section></div>
<script>
const state={data:{trucks:[],trips:[],expenses:[],maintenance:[]},filter:'todos',type:'trip'};
const brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});const n=new Intl.NumberFormat('pt-BR');
const $=s=>document.querySelector(s);const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function date(v){if(!v)return'—';const p=v.slice(0,10).split('-');return p[2]+'/'+p[1]+'/'+p[0]}
function showError(m){const e=$('#error');e.textContent=m;e.classList.toggle('show',!!m)}
async function load(){showError('');try{const r=await fetch('/api/data',{cache:'no-store'});const d=await r.json();if(!r.ok)throw Error(d.error);state.data=d;render()}catch(e){showError(e.message||'Erro ao carregar os dados.')}finally{$('#loading').style.display='none'}}
function filtered(items){return items.filter(x=>state.filter==='todos'||x.truck_id===state.filter)}
function render(){const d=state.data;const f=$('#filter');f.innerHTML='<option value="todos">Todos os caminhões</option>'+d.trucks.map(t=>'<option value="'+esc(t.id)+'">'+esc(t.plate)+'</option>').join('');f.value=state.filter;const trips=filtered(d.trips),exp=filtered(d.expenses),maint=filtered(d.maintenance);const revenue=trips.reduce((s,x)=>s+Number(x.freight||0),0);const tripcost=trips.reduce((s,x)=>s+Number(x.departure_value||0)+Number(x.diesel||0)+Number(x.driver_cost||0)+Number(x.assistant_cost||0),0);const costs=tripcost+exp.reduce((s,x)=>s+Number(x.amount||0),0)+maint.reduce((s,x)=>s+Number(x.cost||0),0);const km=trips.reduce((s,x)=>s+Math.max(0,Number(x.km_end)-Number(x.km_start)),0);$('#revenue').textContent=brl.format(revenue);$('#costs').textContent=brl.format(costs);$('#balance').textContent=brl.format(revenue-costs);$('#tripcount').textContent=n.format(trips.length);$('#kmcount').textContent=n.format(km)+' km percorridos';$('#trucks').innerHTML=d.trucks.map(t=>{const last=d.trips.find(x=>x.truck_id===t.id);return'<button class="truck" data-truck="'+esc(t.id)+'"><div class="truckpic">🚚<b>'+esc(t.plate)+'</b></div><div class="truckbody"><em>● '+esc(t.status)+'</em><strong>'+esc(t.name)+'</strong><span>'+(last?esc(last.region)+' · '+date(last.trip_date):'Pronto para o primeiro lançamento')+'</span></div><span>›</span></button>'}).join('');$('#recent').innerHTML=tripRows(trips.slice(0,6));$('#trips').innerHTML=tripRows(trips);$('#expenses').innerHTML=otherRows(exp,'expense');$('#maintenance').innerHTML=otherRows(maint,'maintenance');$$('[data-truck]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.truck;showView('viagens');render()});$$('.trash').forEach(b=>b.onclick=()=>removeRow(b.dataset.type,b.dataset.id))}
function tripRows(rows){if(!rows.length)return'<div class="empty"><b>Nenhuma viagem lançada</b>Clique em Nova viagem para registrar o primeiro frete.</div>';return'<div class="records">'+rows.map(x=>'<article class="record"><div class="date">📅 '+date(x.trip_date)+'</div><div class="mainrow"><b>'+esc(x.region)+'</b><span>📍 '+esc(x.plate)+' · '+n.format(Math.max(0,x.km_end-x.km_start))+' km'+(x.overnight?' · Pernoite':'')+'</span></div><div class="value"><small>Frete</small><b>'+brl.format(x.freight)+'</b></div><button class="trash" data-type="trip" data-id="'+esc(x.id)+'">🗑</button></article>').join('')+'</div>'}
function otherRows(rows,type){if(!rows.length)return'<div class="empty"><b>Nenhum lançamento</b>Use o botão Adicionar para começar.</div>';return'<div class="records">'+rows.map(x=>{const isM=type==='maintenance';return'<article class="record"><div class="date">📅 '+date(isM?x.maintenance_date:x.expense_date)+'</div><div class="mainrow"><b>'+esc(isM?x.service:x.description)+'</b><span>'+esc(isM?x.status:x.category)+' · '+esc(x.plate)+(isM&&x.next_date?' · Próxima: '+date(x.next_date):'')+'</span></div><div class="value"><small>Valor</small><b>'+brl.format(isM?x.cost:x.amount)+'</b></div><button class="trash" data-type="'+type+'" data-id="'+esc(x.id)+'">🗑</button></article>'}).join('')+'</div>'}
function showView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===id));$('#title').textContent={painel:'Painel',viagens:'Viagens',despesas:'Despesas',manutencao:'Manutenção'}[id]}
function field(label,name,type='text',extra=''){return'<label class="field"><span>'+label+'</span><input name="'+name+'" type="'+type+'" '+extra+'></label>'}
function openModal(type){state.type=type;const trucks=state.data.trucks.map(t=>'<option value="'+esc(t.id)+'">'+esc(t.plate)+' — '+esc(t.name)+'</option>').join('');let h='<label class="field"><span>Caminhão</span><select name="truckId" required>'+trucks+'</select></label>'+field('Data','date','date','required value="'+new Date().toISOString().slice(0,10)+'"');if(type==='trip')h+=field('Região / destino','region','text','required placeholder="Ex.: Cabo Frio"')+field('KM inicial','kmStart','number','required min="0"')+field('KM final','kmEnd','number','required min="0"')+field('Valor de saída','departureValue','number','min="0" step="0.01"')+field('Diesel','diesel','number','min="0" step="0.01"')+field('Valor do frete','freight','number','required min="0" step="0.01"')+field('Motorista','driverCost','number','min="0" step="0.01"')+field('Ajudante','assistantCost','number','min="0" step="0.01"')+field('Rodados','runs','number','min="0"')+'<label class="check"><input name="overnight" type="checkbox"><b>Teve pernoite?</b></label>';else if(type==='expense')h+='<label class="field"><span>Categoria</span><select name="category"><option>Combustível</option><option>Pedágio</option><option>Alimentação</option><option>Documentação</option><option>Pneu</option><option>Outros</option></select></label>'+field('Valor','amount','number','required min="0" step="0.01"')+field('Descrição','description','text','required placeholder="Ex.: Abastecimento"')+field('Quilometragem','km','number','min="0"');else h+=field('Serviço','service','text','required placeholder="Ex.: Troca de óleo"')+field('Custo','cost','number','required min="0" step="0.01"')+field('KM atual','km','number','min="0"')+field('Próxima data','nextDate','date')+field('Próximo KM','nextKm','number','min="0"')+'<label class="field"><span>Situação</span><select name="status"><option>Concluída</option><option>Agendada</option><option>Pendente</option></select></label>';h+='<label class="field full"><span>Observações</span><textarea name="notes" rows="3" placeholder="Informações importantes (opcional)"></textarea></label>';$('#fields').innerHTML=h;$('#modal-title').textContent={trip:'Nova viagem',expense:'Nova despesa',maintenance:'Nova manutenção'}[type];$('#modal').classList.add('open')}
async function save(ev){ev.preventDefault();const fd=new FormData(ev.target);const o=Object.fromEntries(fd.entries());o.type=state.type;o.overnight=fd.get('overnight')==='on';['kmStart','kmEnd','departureValue','diesel','freight','driverCost','assistantCost','runs','amount','km','cost','nextKm'].forEach(k=>{if(k in o)o[k]=Number(o[k]||0)});try{const r=await fetch('/api/data',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(o)});const d=await r.json();if(!r.ok)throw Error(d.error);$('#modal').classList.remove('open');await load()}catch(e){showError(e.message||'Erro ao salvar.')}}
async function removeRow(type,id){if(!confirm('Deseja apagar este lançamento?'))return;await fetch('/api/data?type='+encodeURIComponent(type)+'&id='+encodeURIComponent(id),{method:'DELETE'});await load()}
$$('[data-view]').forEach(b=>b.onclick=()=>showView(b.dataset.view));$$('[data-open]').forEach(b=>b.onclick=()=>openModal(b.dataset.open));$('.close').onclick=$('.close-action').onclick=()=>$('#modal').classList.remove('open');$('#modal').onclick=e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')};$('#entry-form').onsubmit=save;$('#filter').onchange=e=>{state.filter=e.target.value;render()};load();
</script>
</body></html>`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function message(error) {
  const value = error instanceof Error ? error.message : "Erro inesperado.";
  return value.includes("no such table") ? "O banco está sendo preparado. Tente novamente em alguns instantes." : value;
}

function value(payload, key, required = false) {
  const result = String(payload[key] ?? "").trim();
  if (required && !result) throw new Error("Preencha todos os campos obrigatórios.");
  return result;
}

function numeric(payload, key) {
  const result = Number(payload[key] ?? 0);
  if (!Number.isFinite(result) || result < 0) throw new Error("Digite somente números válidos.");
  return result;
}

async function getData(db) {
  let trucks = await db.prepare("SELECT id, plate, name, status, current_km FROM trucks ORDER BY plate").all();
  if (!trucks.results.length) {
    await db.batch([
      db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-kpe3j85", "KPE3J85", "Caminhão KPE"),
      db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-llf9969", "LLF9969", "Caminhão LLF"),
      db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-bao2d30", "BAO2D30", "Caminhão BAO"),
    ]);
    trucks = await db.prepare("SELECT id, plate, name, status, current_km FROM trucks ORDER BY plate").all();
  }
  const [trips, expenses, maintenance] = await Promise.all([
    db.prepare("SELECT trips.*, trucks.plate FROM trips JOIN trucks ON trucks.id=trips.truck_id ORDER BY trip_date DESC, trips.created_at DESC LIMIT 500").all(),
    db.prepare("SELECT expenses.*, trucks.plate FROM expenses JOIN trucks ON trucks.id=expenses.truck_id ORDER BY expense_date DESC, expenses.created_at DESC LIMIT 500").all(),
    db.prepare("SELECT maintenance.*, trucks.plate FROM maintenance JOIN trucks ON trucks.id=maintenance.truck_id ORDER BY maintenance_date DESC, maintenance.created_at DESC LIMIT 500").all(),
  ]);
  return { trucks: trucks.results, trips: trips.results, expenses: expenses.results, maintenance: maintenance.results };
}

async function api(request, env) {
  if (!env.DB) return json({ error: "O banco de dados ainda não está disponível." }, 500);
  const db = env.DB;
  try {
    if (request.method === "GET") return json(await getData(db));
    const url = new URL(request.url);
    if (request.method === "DELETE") {
      const type = url.searchParams.get("type");
      const id = url.searchParams.get("id");
      const tables = { trip: "trips", expense: "expenses", maintenance: "maintenance" };
      if (!tables[type] || !id) return json({ error: "Lançamento inválido." }, 400);
      await db.prepare("DELETE FROM " + tables[type] + " WHERE id=?").bind(id).run();
      return json({ ok: true });
    }
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    const p = await request.json();
    const type = value(p, "type", true);
    const id = crypto.randomUUID();
    const truckId = value(p, "truckId", true);
    const date = value(p, "date", true);
    if (type === "trip") {
      const start = numeric(p, "kmStart"), end = numeric(p, "kmEnd");
      if (end < start) throw new Error("O KM final não pode ser menor que o KM inicial.");
      await db.batch([
        db.prepare("INSERT INTO trips (id,truck_id,trip_date,region,km_start,km_end,excess_km,departure_value,diesel,freight,driver_cost,assistant_cost,runs,overnight,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id, truckId, date, value(p, "region", true), start, end, end-start, numeric(p,"departureValue"), numeric(p,"diesel"), numeric(p,"freight"), numeric(p,"driverCost"), numeric(p,"assistantCost"), numeric(p,"runs"), p.overnight?1:0, value(p,"notes")),
        db.prepare("UPDATE trucks SET current_km=MAX(current_km,?) WHERE id=?").bind(end,truckId),
      ]);
    } else if (type === "expense") {
      await db.prepare("INSERT INTO expenses (id,truck_id,expense_date,category,description,amount,km,notes) VALUES (?,?,?,?,?,?,?,?)").bind(id,truckId,date,value(p,"category",true),value(p,"description",true),numeric(p,"amount"),numeric(p,"km")||null,value(p,"notes")).run();
    } else if (type === "maintenance") {
      await db.prepare("INSERT INTO maintenance (id,truck_id,maintenance_date,service,cost,km,next_date,next_km,status,notes) VALUES (?,?,?,?,?,?,?,?,?,?)").bind(id,truckId,date,value(p,"service",true),numeric(p,"cost"),numeric(p,"km")||null,value(p,"nextDate")||null,numeric(p,"nextKm")||null,value(p,"status",true),value(p,"notes")).run();
    } else return json({ error: "Tipo de lançamento inválido." }, 400);
    return json({ ok: true, id }, 201);
  } catch (error) { return json({ error: message(error) }, 400); }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/data") return api(request, env);
    if (url.pathname !== "/") return new Response("Página não encontrada", { status: 404 });
    return new Response(page, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
  },
};
