import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const trucks = sqliteTable("trucks", {
  id: text("id").primaryKey(),
  plate: text("plate").notNull().unique(),
  name: text("name").notNull(),
  status: text("status").notNull().default("Ativo"),
  currentKm: integer("current_km").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),
  truckId: text("truck_id").notNull().references(() => trucks.id),
  tripDate: text("trip_date").notNull(), region: text("region").notNull(),
  kmStart: integer("km_start").notNull(), kmEnd: integer("km_end").notNull(),
  excessKm: integer("excess_km").notNull().default(0),
  departureValue: real("departure_value").notNull().default(0), diesel: real("diesel").notNull().default(0),
  freight: real("freight").notNull().default(0), driverCost: real("driver_cost").notNull().default(0),
  assistantCost: real("assistant_cost").notNull().default(0), runs: integer("runs").notNull().default(0),
  overnight: integer("overnight").notNull().default(0), notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey(), truckId: text("truck_id").notNull().references(() => trucks.id),
  expenseDate: text("expense_date").notNull(), category: text("category").notNull(),
  description: text("description").notNull(), amount: real("amount").notNull().default(0),
  km: integer("km"), notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const maintenance = sqliteTable("maintenance", {
  id: text("id").primaryKey(), truckId: text("truck_id").notNull().references(() => trucks.id),
  maintenanceDate: text("maintenance_date").notNull(), service: text("service").notNull(),
  cost: real("cost").notNull().default(0), km: integer("km"), nextDate: text("next_date"),
  nextKm: integer("next_km"), status: text("status").notNull().default("Concluída"),
  notes: text("notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
