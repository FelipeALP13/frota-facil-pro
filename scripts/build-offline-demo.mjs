import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { page } from "../worker/ui.js";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "..", "..", "outputs", "Frota-Facil-Pro-Demo.html");
mkdirSync(resolve(root, "..", "..", "outputs"), { recursive: true });

const mock = String.raw`<script>
(() => {
  const KEY='frota-facil-pro-demo-v1';
  const fresh=()=>({organization:{id:'pilot',name:'Cliente piloto',plan:'Demonstração offline'},trucks:[
    {id:'truck-kpe3j85',plate:'KPE3J85',name:'Caminhão KPE',status:'Ativo',current_km:0,brand:'',model:'',year:null,body_type:'Frigorífico'},
    {id:'truck-llf9969',plate:'LLF9969',name:'Caminhão LLF',status:'Ativo',current_km:0,brand:'',model:'',year:null,body_type:'Frigorífico'},
    {id:'truck-bao2d30',plate:'BAO2D30',name:'Caminhão BAO',status:'Ativo',current_km:0,brand:'',model:'',year:null,body_type:'Frigorífico'}
  ],drivers:[],clients:[],trips:[],expenses:[],maintenance:[],fuel:[],documents:[],financial:[],inspections:[],occurrences:[],rules:[],communications:[],integrations:{email:false,whatsapp:false}});
  let db;try{db=JSON.parse(localStorage.getItem(KEY))||fresh()}catch{db=fresh()}
  const save=()=>localStorage.setItem(KEY,JSON.stringify(db));
  const id=()=>self.crypto?.randomUUID?.()||('id-'+Date.now()+'-'+Math.random().toString(16).slice(2));
  const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json'}});
  const get=(rows,key,value)=>rows.find(x=>x[key]===value);
  const decorate=()=>{const copy=structuredClone(db);const link=x=>{x.plate=get(copy.trucks,'id',x.truck_id)?.plate||null;x.driver_name=get(copy.drivers,'id',x.driver_id)?.name||null;x.client_name=get(copy.clients,'id',x.client_id)?.name||null;return x};['trips','expenses','maintenance','fuel','documents','financial','inspections','occurrences'].forEach(k=>copy[k]=copy[k].map(link));return copy};
  const mappings={vehicle:'trucks',driver:'drivers',client:'clients',trip:'trips',expense:'expenses',maintenance:'maintenance',fuel:'fuel',document:'documents',financial:'financial',inspection:'inspections',occurrence:'occurrences',rule:'rules',message:'communications'};
  const base=(p)=>({id:id(),organization_id:'pilot',created_at:new Date().toISOString(),...p});
  const record=(p)=>{
    if(p.type==='vehicle')return base({plate:String(p.plate||'').toUpperCase().replace(/[^A-Z0-9]/g,''),name:p.name,status:p.status||'Ativo',current_km:Number(p.currentKm||0),brand:p.brand||'',model:p.model||'',year:Number(p.year)||null,renavam:p.renavam||'',chassis:p.chassis||'',capacity_kg:Number(p.capacityKg||0),body_type:p.bodyType||'Frigorífico'});
    if(p.type==='driver')return base({name:p.name,cpf:p.cpf||'',cnh:p.cnh||'',cnh_category:p.cnhCategory||'',cnh_expiry:p.cnhExpiry||null,phone:p.phone||'',email:p.email||'',status:p.status||'Ativo'});
    if(p.type==='client')return base({name:p.name,document:p.document||'',contact_name:p.contactName||'',phone:p.phone||'',email:p.email||'',city:p.city||'',status:p.status||'Ativo'});
    if(p.type==='trip')return base({truck_id:p.truckId,driver_id:p.driverId||null,client_id:p.clientId||null,trip_date:p.date,region:p.region||'',origin:p.origin||'',destination:p.destination||'',km_start:Number(p.kmStart||0),km_end:Number(p.kmEnd||0),excess_km:Number(p.kmEnd||0)-Number(p.kmStart||0),departure_value:Number(p.departureValue||0),diesel:Number(p.diesel||0),freight:Number(p.freight||0),driver_cost:Number(p.driverCost||0),assistant_cost:Number(p.assistantCost||0),runs:Number(p.runs||0),overnight:p.overnight?1:0,notes:p.notes||''});
    if(p.type==='expense')return base({truck_id:p.truckId,expense_date:p.date,category:p.category,description:p.description,amount:Number(p.amount||0),km:Number(p.km)||null,notes:p.notes||''});
    if(p.type==='maintenance')return base({truck_id:p.truckId,maintenance_date:p.date,service:p.service,cost:Number(p.cost||0),km:Number(p.km)||null,next_date:p.nextDate||null,next_km:Number(p.nextKm)||null,status:p.status||'Concluída',notes:p.notes||''});
    if(p.type==='fuel')return base({truck_id:p.truckId,driver_id:p.driverId||null,fuel_date:p.date,liters:Number(p.liters||0),price_per_liter:Number(p.pricePerLiter||0),total:Number(p.total||0),odometer:Number(p.odometer||0),station:p.station||'',full_tank:p.fullTank===false?0:1,notes:p.notes||''});
    if(p.type==='document')return base({truck_id:p.truckId||null,driver_id:p.driverId||null,document_type:p.documentType,description:p.description,number:p.number||'',expiry_date:p.expiryDate||null,amount:Number(p.amount||0),status:p.status||'Válido',notes:p.notes||''});
    if(p.type==='financial')return base({truck_id:p.truckId||null,client_id:p.clientId||null,entry_type:p.entryType,category:p.category,description:p.description,amount:Number(p.amount||0),due_date:p.dueDate,paid_date:p.paidDate||null,status:p.status||'Pendente',notes:p.notes||''});
    if(p.type==='inspection'){const failed=['brakesOk','tiresOk','lightsOk','refrigerationOk','documentsOk'].some(k=>p[k]===false);return base({truck_id:p.truckId,driver_id:p.driverId||null,inspection_date:p.date,odometer:Number(p.odometer||0),status:failed?'Reprovado':'Aprovado',notes:p.notes||''})}
    if(p.type==='occurrence')return base({truck_id:p.truckId||null,driver_id:p.driverId||null,occurrence_date:p.date,occurrence_type:p.occurrenceType,severity:p.severity||'Baixa',description:p.description,status:p.status||'Aberta'});
    if(p.type==='rule')return base({name:p.name,event_type:p.eventType,days_before:Number(p.daysBefore||0),channel:p.channel,recipient:p.recipient,template_name:p.templateName||'',active:p.active===false?0:1});
    return base({channel:p.channel,recipient:p.recipient,subject:p.subject||'',message:p.message,status:'Aguardando configuração',provider_id:'',sent_at:null});
  };
  window.fetch=async(url,options={})=>{const target=new URL(url,location.href);if(!target.pathname.endsWith('/api/data'))return response({error:'Rota não encontrada'},404);const method=(options.method||'GET').toUpperCase();if(method==='GET')return response(decorate());if(method==='POST'){const p=JSON.parse(options.body||'{}'),item=record(p),list=mappings[p.type];if(!list)return response({error:'Tipo inválido'},400);db[list].unshift(item);if(['trip','fuel'].includes(p.type)){const truck=get(db.trucks,'id',p.truckId),km=Number(p.kmEnd||p.odometer||0);if(truck)truck.current_km=Math.max(Number(truck.current_km||0),km)}save();return response({ok:true,id:item.id,status:item.status},p.type==='message'?202:201)}if(method==='DELETE'){const list=mappings[target.searchParams.get('type')],targetId=target.searchParams.get('id');if(list)db[list]=db[list].filter(x=>x.id!==targetId);save();return response({ok:true})}return response({error:'Método não permitido'},405)};
  window.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='r'){e.preventDefault();if(confirm('Apagar todos os lançamentos desta demonstração?')){localStorage.removeItem(KEY);location.reload()}}});
})();
</script>`;

const html = page.replace("<script>\nconst state=", `${mock}\n<script>\nconst state=`);
writeFileSync(output, html, "utf8");
console.log(output);
