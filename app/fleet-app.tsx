"use client";

import {
  AlertTriangle, Banknote, CalendarDays, CheckCircle2, ChevronRight, Fuel,
  LayoutDashboard, LoaderCircle, MapPin, Menu, Plus, Route, Trash2, Truck,
  WalletCards, Wrench, X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type TruckRow = { id: string; plate: string; name: string; status: string; current_km: number };
type TripRow = {
  id: string; truck_id: string; plate: string; trip_date: string; region: string;
  km_start: number; km_end: number; excess_km: number; departure_value: number;
  diesel: number; freight: number; driver_cost: number; assistant_cost: number;
  runs: number; overnight: number; notes: string;
};
type ExpenseRow = {
  id: string; truck_id: string; plate: string; expense_date: string; category: string;
  description: string; amount: number; km: number | null;
};
type MaintenanceRow = {
  id: string; truck_id: string; plate: string; maintenance_date: string; service: string;
  cost: number; km: number | null; next_date: string | null; next_km: number | null;
  status: string; notes: string;
};
type AppData = { trucks: TruckRow[]; trips: TripRow[]; expenses: ExpenseRow[]; maintenance: MaintenanceRow[] };
type View = "painel" | "viagens" | "despesas" | "manutencao";
type Modal = "viagem" | "despesa" | "manutencao" | null;

const emptyData: AppData = { trucks: [], trips: [], expenses: [], maintenance: [] };
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const number = new Intl.NumberFormat("pt-BR");

function formatDate(value?: string | null) {
  if (!value) return "—";
  const [year, month, day] = value.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

function val(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function num(form: FormData, key: string) {
  const raw = val(form, key).replace(/\s/g, "").replace(",", ".");
  return raw === "" ? 0 : Number(raw);
}

export default function FleetApp() {
  const [data, setData] = useState<AppData>(emptyData);
  const [view, setView] = useState<View>("painel");
  const [modal, setModal] = useState<Modal>(null);
  const [selectedTruck, setSelectedTruck] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const response = await fetch("/api/data", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível carregar os dados.");
      if (!result.trucks?.length) {
        const setup = await fetch("/api/data", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ type: "setup" }),
        });
        if (!setup.ok) throw new Error("Não foi possível preparar os três caminhões.");
        const refreshed = await fetch("/api/data", { cache: "no-store" });
        setData(await refreshed.json());
      } else {
        setData(result);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => {
    const matches = (truckId: string) => selectedTruck === "todos" || selectedTruck === truckId;
    return {
      trips: data.trips.filter((item) => matches(item.truck_id)),
      expenses: data.expenses.filter((item) => matches(item.truck_id)),
      maintenance: data.maintenance.filter((item) => matches(item.truck_id)),
    };
  }, [data, selectedTruck]);

  const summary = useMemo(() => {
    const revenue = filtered.trips.reduce((sum, item) => sum + Number(item.freight || 0), 0);
    const tripCosts = filtered.trips.reduce((sum, item) => sum + Number(item.departure_value || 0) + Number(item.diesel || 0) + Number(item.driver_cost || 0) + Number(item.assistant_cost || 0), 0);
    const otherCosts = filtered.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const maintenanceCosts = filtered.maintenance.reduce((sum, item) => sum + Number(item.cost || 0), 0);
    const km = filtered.trips.reduce((sum, item) => sum + Math.max(0, Number(item.km_end || 0) - Number(item.km_start || 0)), 0);
    return { revenue, costs: tripCosts + otherCosts + maintenanceCosts, balance: revenue - tripCosts - otherCosts - maintenanceCosts, trips: filtered.trips.length, km };
  }, [filtered]);

  async function submit(event: FormEvent<HTMLFormElement>, type: Exclude<Modal, null>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = new FormData(event.currentTarget);
    let payload: Record<string, string | number | boolean>;
    if (type === "viagem") {
      payload = {
        type: "trip", truckId: val(form, "truckId"), date: val(form, "date"),
        region: val(form, "region"), kmStart: num(form, "kmStart"), kmEnd: num(form, "kmEnd"),
        departureValue: num(form, "departureValue"), diesel: num(form, "diesel"),
        freight: num(form, "freight"), driverCost: num(form, "driverCost"),
        assistantCost: num(form, "assistantCost"), runs: num(form, "runs"),
        overnight: form.get("overnight") === "on", notes: val(form, "notes"),
      };
    } else if (type === "despesa") {
      payload = {
        type: "expense", truckId: val(form, "truckId"), date: val(form, "date"),
        category: val(form, "category"), description: val(form, "description"),
        amount: num(form, "amount"), km: num(form, "km"), notes: val(form, "notes"),
      };
    } else {
      payload = {
        type: "maintenance", truckId: val(form, "truckId"), date: val(form, "date"),
        service: val(form, "service"), cost: num(form, "cost"), km: num(form, "km"),
        nextDate: val(form, "nextDate"), nextKm: num(form, "nextKm"),
        status: val(form, "status"), notes: val(form, "notes"),
      };
    }
    try {
      const response = await fetch("/api/data", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível salvar.");
      setModal(null);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(type: "trip" | "expense" | "maintenance", id: string) {
    if (!window.confirm("Deseja apagar este lançamento?")) return;
    const response = await fetch(`/api/data?type=${type}&id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (response.ok) await load();
  }

  const navigation = [
    { id: "painel" as View, label: "Painel", icon: LayoutDashboard },
    { id: "viagens" as View, label: "Viagens", icon: Route },
    { id: "despesas" as View, label: "Despesas", icon: WalletCards },
    { id: "manutencao" as View, label: "Manutenção", icon: Wrench },
  ];

  if (loading) return <main className="loading-screen"><div className="brand-mark"><Truck size={30} /></div><LoaderCircle className="spin" size={34} /><strong>Carregando a frota...</strong></main>;

  return (
    <div className="app-shell">
      <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
        <div className="brand"><div className="brand-mark"><Truck size={28} /></div><div><strong>Frota Fácil</strong><span>Gestão dos caminhões</span></div></div>
        <nav>{navigation.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? "nav-item active" : "nav-item"} onClick={() => { setView(id); setMobileMenu(false); }}><Icon size={22} /> {label}</button>)}</nav>
        <div className="sidebar-help"><CheckCircle2 size={22} /><div><strong>Dados protegidos</strong><span>Salvos automaticamente</span></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu"><Menu /></button>
          <div><p className="eyebrow">Visão geral da operação</p><h1>{navigation.find((item) => item.id === view)?.label}</h1></div>
          <div className="topbar-actions">
            <label className="truck-filter"><Truck size={19} /><select value={selectedTruck} onChange={(event) => setSelectedTruck(event.target.value)}><option value="todos">Todos os caminhões</option>{data.trucks.map((truck) => <option key={truck.id} value={truck.id}>{truck.plate}</option>)}</select></label>
            <button className="primary-button" onClick={() => setModal("viagem")}><Plus size={21} /> Nova viagem</button>
          </div>
        </header>

        {error && <div className="error-banner"><AlertTriangle size={20} /><span>{error}</span><button onClick={() => setError("")}><X size={18} /></button></div>}

        {view === "painel" && <>
          <section className="metric-grid">
            <Metric icon={Banknote} label="Receita de fretes" value={money.format(summary.revenue)} tone="green" />
            <Metric icon={WalletCards} label="Total de custos" value={money.format(summary.costs)} tone="orange" />
            <Metric icon={summary.balance >= 0 ? CheckCircle2 : AlertTriangle} label="Resultado" value={money.format(summary.balance)} tone={summary.balance >= 0 ? "blue" : "red"} />
            <Metric icon={Route} label="Viagens lançadas" value={number.format(summary.trips)} detail={`${number.format(summary.km)} km percorridos`} tone="navy" />
          </section>

          <section className="content-grid">
            <div className="panel span-two">
              <div className="panel-heading"><div><p className="eyebrow">Acesso rápido</p><h2>Seus 3 caminhões</h2></div><Truck size={28} /></div>
              <div className="truck-grid">{data.trucks.map((truck, index) => {
                const lastTrip = data.trips.find((trip) => trip.truck_id === truck.id);
                return <button className="truck-card" key={truck.id} onClick={() => { setSelectedTruck(truck.id); setView("viagens"); }}><div className={`truck-visual truck-${index + 1}`}><Truck size={36} /><span>{truck.plate}</span></div><div className="truck-card-body"><div><span className="status-dot" /> <b>{truck.status}</b></div><strong>{truck.name}</strong><span>{lastTrip ? `${lastTrip.region} · ${formatDate(lastTrip.trip_date)}` : "Pronto para o primeiro lançamento"}</span></div><ChevronRight size={22} /></button>;
              })}</div>
            </div>
            <div className="panel quick-panel">
              <div className="panel-heading"><div><p className="eyebrow">Lançar agora</p><h2>Ações rápidas</h2></div></div>
              <button onClick={() => setModal("viagem")}><span className="quick-icon"><Route /></span><span><strong>Nova viagem</strong><small>Frete, diesel e quilômetros</small></span><ChevronRight /></button>
              <button onClick={() => setModal("despesa")}><span className="quick-icon amber"><Fuel /></span><span><strong>Nova despesa</strong><small>Combustível e outros gastos</small></span><ChevronRight /></button>
              <button onClick={() => setModal("manutencao")}><span className="quick-icon blue"><Wrench /></span><span><strong>Nova manutenção</strong><small>Serviços e próximos prazos</small></span><ChevronRight /></button>
            </div>
          </section>
          <section className="panel recent-panel"><div className="panel-heading"><div><p className="eyebrow">Últimos registros</p><h2>Viagens recentes</h2></div><button className="text-button" onClick={() => setView("viagens")}>Ver todas <ChevronRight size={18} /></button></div><TripList trips={filtered.trips.slice(0, 6)} onRemove={(id) => remove("trip", id)} compact /></section>
        </>}

        {view === "viagens" && <section className="panel page-panel"><div className="panel-heading"><div><p className="eyebrow">Histórico</p><h2>Viagens e fretes</h2></div><button className="secondary-button" onClick={() => setModal("viagem")}><Plus size={20} /> Adicionar</button></div><TripList trips={filtered.trips} onRemove={(id) => remove("trip", id)} /></section>}
        {view === "despesas" && <section className="panel page-panel"><div className="panel-heading"><div><p className="eyebrow">Controle financeiro</p><h2>Despesas</h2></div><button className="secondary-button" onClick={() => setModal("despesa")}><Plus size={20} /> Adicionar</button></div><RecordList empty="Nenhuma despesa lançada." rows={filtered.expenses.map((item) => ({ id: item.id, title: item.description, meta: `${item.category} · ${item.plate}`, date: item.expense_date, value: item.amount }))} onRemove={(id) => remove("expense", id)} /></section>}
        {view === "manutencao" && <section className="panel page-panel"><div className="panel-heading"><div><p className="eyebrow">Cuidados com a frota</p><h2>Manutenções</h2></div><button className="secondary-button" onClick={() => setModal("manutencao")}><Plus size={20} /> Adicionar</button></div><RecordList empty="Nenhuma manutenção lançada." rows={filtered.maintenance.map((item) => ({ id: item.id, title: item.service, meta: `${item.status} · ${item.plate}${item.next_date ? ` · Próxima: ${formatDate(item.next_date)}` : ""}`, date: item.maintenance_date, value: item.cost }))} onRemove={(id) => remove("maintenance", id)} /></section>}
      </main>

      <nav className="mobile-nav">{navigation.map(({ id, label, icon: Icon }) => <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}><Icon size={21} /><span>{label}</span></button>)}</nav>
      {modal && <EntryModal type={modal} trucks={data.trucks} saving={saving} onClose={() => setModal(null)} onSubmit={submit} />}
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail, tone }: { icon: typeof Truck; label: string; value: string; detail?: string; tone: string }) {
  return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={24} /></div><div><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div></article>;
}

function TripList({ trips, onRemove, compact = false }: { trips: TripRow[]; onRemove: (id: string) => void; compact?: boolean }) {
  if (!trips.length) return <EmptyState icon={Route} title="Nenhuma viagem lançada" text="Clique em Nova viagem para registrar o primeiro frete." />;
  return <div className={compact ? "record-list compact" : "record-list"}>{trips.map((trip) => <article className="record-row" key={trip.id}><div className="record-date"><CalendarDays size={18} /><span>{formatDate(trip.trip_date)}</span></div><div className="record-main"><strong>{trip.region}</strong><span><MapPin size={15} /> {trip.plate} · {number.format(Math.max(0, trip.km_end - trip.km_start))} km{trip.overnight ? " · Pernoite" : ""}</span></div><div className="record-money"><span>Frete</span><strong>{money.format(trip.freight)}</strong></div><button className="delete-button" onClick={() => onRemove(trip.id)} aria-label="Apagar viagem"><Trash2 size={18} /></button></article>)}</div>;
}

function RecordList({ rows, empty, onRemove }: { rows: { id: string; title: string; meta: string; date: string; value: number }[]; empty: string; onRemove: (id: string) => void }) {
  if (!rows.length) return <EmptyState icon={WalletCards} title={empty} text="Use o botão Adicionar para fazer o primeiro lançamento." />;
  return <div className="record-list">{rows.map((row) => <article className="record-row" key={row.id}><div className="record-date"><CalendarDays size={18} /><span>{formatDate(row.date)}</span></div><div className="record-main"><strong>{row.title}</strong><span>{row.meta}</span></div><div className="record-money"><span>Valor</span><strong>{money.format(row.value)}</strong></div><button className="delete-button" onClick={() => onRemove(row.id)} aria-label="Apagar lançamento"><Trash2 size={18} /></button></article>)}</div>;
}

function EmptyState({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) {
  return <div className="empty-state"><div><Icon size={30} /></div><strong>{title}</strong><span>{text}</span></div>;
}

function EntryModal({ type, trucks, saving, onClose, onSubmit }: { type: Exclude<Modal, null>; trucks: TruckRow[]; saving: boolean; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>, type: Exclude<Modal, null>) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const title = type === "viagem" ? "Nova viagem" : type === "despesa" ? "Nova despesa" : "Nova manutenção";
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
    <header><div><p className="eyebrow">Novo lançamento</p><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X /></button></header>
    <form onSubmit={(event) => onSubmit(event, type)}><div className="form-grid">
      <Field label="Caminhão"><select name="truckId" required defaultValue={trucks[0]?.id}>{trucks.map((truck) => <option key={truck.id} value={truck.id}>{truck.plate} — {truck.name}</option>)}</select></Field>
      <Field label="Data"><input name="date" type="date" required defaultValue={today} /></Field>
      {type === "viagem" && <><Field label="Região / destino" wide><input name="region" required placeholder="Ex.: Cabo Frio" /></Field><Field label="KM inicial"><input name="kmStart" type="number" min="0" required inputMode="numeric" /></Field><Field label="KM final"><input name="kmEnd" type="number" min="0" required inputMode="numeric" /></Field><Field label="Valor de saída"><MoneyInput name="departureValue" /></Field><Field label="Diesel"><MoneyInput name="diesel" /></Field><Field label="Valor do frete"><MoneyInput name="freight" required /></Field><Field label="Motorista"><MoneyInput name="driverCost" /></Field><Field label="Ajudante"><MoneyInput name="assistantCost" /></Field><Field label="Rodados"><input name="runs" type="number" min="0" inputMode="numeric" /></Field><label className="check-field"><input name="overnight" type="checkbox" /><span><b>Teve pernoite?</b><small>Marque quando o caminhão dormiu fora</small></span></label></>}
      {type === "despesa" && <><Field label="Categoria"><select name="category"><option>Combustível</option><option>Pedágio</option><option>Alimentação</option><option>Documentação</option><option>Pneu</option><option>Outros</option></select></Field><Field label="Valor"><MoneyInput name="amount" required /></Field><Field label="Descrição" wide><input name="description" required placeholder="Ex.: Abastecimento no posto" /></Field><Field label="Quilometragem"><input name="km" type="number" min="0" inputMode="numeric" /></Field></>}
      {type === "manutencao" && <><Field label="Serviço" wide><input name="service" required placeholder="Ex.: Troca de óleo" /></Field><Field label="Custo"><MoneyInput name="cost" required /></Field><Field label="KM atual"><input name="km" type="number" min="0" inputMode="numeric" /></Field><Field label="Próxima data"><input name="nextDate" type="date" /></Field><Field label="Próximo KM"><input name="nextKm" type="number" min="0" inputMode="numeric" /></Field><Field label="Situação"><select name="status"><option>Concluída</option><option>Agendada</option><option>Pendente</option></select></Field></>}
      <Field label="Observações" wide><textarea name="notes" rows={3} placeholder="Informações importantes (opcional)" /></Field>
    </div><footer><button type="button" className="ghost-button" onClick={onClose}>Cancelar</button><button className="primary-button" disabled={saving}>{saving ? <><LoaderCircle className="spin" size={20} /> Salvando...</> : <><CheckCircle2 size={20} /> Salvar lançamento</>}</button></footer></form>
  </section></div>;
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "field wide" : "field"}><span>{label}</span>{children}</label>;
}

function MoneyInput({ name, required = false }: { name: string; required?: boolean }) {
  return <div className="money-input"><span>R$</span><input name={name} type="number" min="0" step="0.01" inputMode="decimal" required={required} /></div>;
}
