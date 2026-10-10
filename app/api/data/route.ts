import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

function database() {
  if (!env.DB) throw new Error("O banco de dados ainda não está disponível.");
  return env.DB;
}

function text(payload: Record<string, unknown>, key: string, required = false) {
  const value = String(payload[key] ?? "").trim();
  if (required && !value) throw new Error(`Preencha o campo ${key}.`);
  return value;
}

function numeric(payload: Record<string, unknown>, key: string) {
  const value = Number(payload[key] ?? 0);
  if (!Number.isFinite(value) || value < 0) throw new Error(`O campo ${key} deve ser um número válido.`);
  return value;
}

function message(error: unknown) {
  const value = error instanceof Error ? error.message : "Erro inesperado.";
  if (value.includes("no such table")) return "O banco está sendo preparado. Tente novamente em alguns instantes.";
  return value;
}

export async function GET() {
  try {
    const db = database();
    const [trucks, trips, expenses, maintenance] = await Promise.all([
      db.prepare("SELECT id, plate, name, status, current_km FROM trucks ORDER BY plate").all(),
      db.prepare("SELECT trips.*, trucks.plate FROM trips JOIN trucks ON trucks.id = trips.truck_id ORDER BY trip_date DESC, trips.created_at DESC LIMIT 500").all(),
      db.prepare("SELECT expenses.*, trucks.plate FROM expenses JOIN trucks ON trucks.id = expenses.truck_id ORDER BY expense_date DESC, expenses.created_at DESC LIMIT 500").all(),
      db.prepare("SELECT maintenance.*, trucks.plate FROM maintenance JOIN trucks ON trucks.id = maintenance.truck_id ORDER BY maintenance_date DESC, maintenance.created_at DESC LIMIT 500").all(),
    ]);
    return Response.json({ trucks: trucks.results, trips: trips.results, expenses: expenses.results, maintenance: maintenance.results });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const type = text(payload, "type", true);
    const db = database();

    if (type === "setup") {
      await db.batch([
        db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-kpe3j85", "KPE3J85", "Caminhão KPE",),
        db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-llf9969", "LLF9969", "Caminhão LLF"),
        db.prepare("INSERT OR IGNORE INTO trucks (id, plate, name, status, current_km) VALUES (?, ?, ?, 'Ativo', 0)").bind("truck-bao2d30", "BAO2D30", "Caminhão BAO"),
      ]);
      return Response.json({ ok: true }, { status: 201 });
    }

    const id = crypto.randomUUID();
    const truckId = text(payload, "truckId", true);
    const date = text(payload, "date", true);

    if (type === "trip") {
      const region = text(payload, "region", true);
      const kmStart = numeric(payload, "kmStart");
      const kmEnd = numeric(payload, "kmEnd");
      if (kmEnd < kmStart) throw new Error("O KM final não pode ser menor que o KM inicial.");
      await db.batch([
        db.prepare("INSERT INTO trips (id, truck_id, trip_date, region, km_start, km_end, excess_km, departure_value, diesel, freight, driver_cost, assistant_cost, runs, overnight, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, truckId, date, region, kmStart, kmEnd, kmEnd - kmStart, numeric(payload, "departureValue"), numeric(payload, "diesel"), numeric(payload, "freight"), numeric(payload, "driverCost"), numeric(payload, "assistantCost"), numeric(payload, "runs"), payload.overnight ? 1 : 0, text(payload, "notes")),
        db.prepare("UPDATE trucks SET current_km = MAX(current_km, ?) WHERE id = ?").bind(kmEnd, truckId),
      ]);
    } else if (type === "expense") {
      await db.prepare("INSERT INTO expenses (id, truck_id, expense_date, category, description, amount, km, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(id, truckId, date, text(payload, "category", true), text(payload, "description", true), numeric(payload, "amount"), numeric(payload, "km") || null, text(payload, "notes")).run();
    } else if (type === "maintenance") {
      await db.prepare("INSERT INTO maintenance (id, truck_id, maintenance_date, service, cost, km, next_date, next_km, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, truckId, date, text(payload, "service", true), numeric(payload, "cost"), numeric(payload, "km") || null, text(payload, "nextDate") || null, numeric(payload, "nextKm") || null, text(payload, "status", true), text(payload, "notes")).run();
    } else {
      return Response.json({ error: "Tipo de lançamento inválido." }, { status: 400 });
    }

    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id")?.trim();
    const tables: Record<string, string> = { trip: "trips", expense: "expenses", maintenance: "maintenance" };
    if (!type || !tables[type] || !id) return Response.json({ error: "Lançamento inválido." }, { status: 400 });
    await database().prepare(`DELETE FROM ${tables[type]} WHERE id = ?`).bind(id).run();
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: message(error) }, { status: 400 });
  }
}
