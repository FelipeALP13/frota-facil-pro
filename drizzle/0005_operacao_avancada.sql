CREATE TABLE helpers (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  cpf TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Ativo',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE telemetry_positions (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  truck_id TEXT NOT NULL REFERENCES trucks(id),
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  speed REAL NOT NULL DEFAULT 0,
  ignition INTEGER NOT NULL DEFAULT 0,
  provider TEXT NOT NULL DEFAULT 'Manual',
  captured_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE driver_journeys (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  driver_id TEXT NOT NULL REFERENCES drivers(id),
  truck_id TEXT REFERENCES trucks(id),
  journey_date TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  driving_minutes INTEGER NOT NULL DEFAULT 0,
  waiting_minutes INTEGER NOT NULL DEFAULT 0,
  rest_minutes INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tires (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  truck_id TEXT REFERENCES trucks(id),
  fire_number TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT '',
  model TEXT NOT NULL DEFAULT '',
  axle_position TEXT NOT NULL DEFAULT '',
  tread_mm REAL NOT NULL DEFAULT 0,
  recap_count INTEGER NOT NULL DEFAULT 0,
  installed_km INTEGER,
  status TEXT NOT NULL DEFAULT 'Em uso',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fines (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  truck_id TEXT REFERENCES trucks(id),
  driver_id TEXT REFERENCES drivers(id),
  infraction_date TEXT NOT NULL,
  infraction_code TEXT NOT NULL,
  agency TEXT NOT NULL,
  severity TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  amount REAL NOT NULL DEFAULT 0,
  indication_deadline TEXT,
  status TEXT NOT NULL DEFAULT 'Pendente',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE parts_inventory (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity REAL NOT NULL DEFAULT 0,
  minimum_quantity REAL NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'un',
  unit_cost REAL NOT NULL DEFAULT 0,
  location TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Ativo',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_helpers_org ON helpers(organization_id);
CREATE INDEX idx_telemetry_org_truck_time ON telemetry_positions(organization_id, truck_id, captured_at);
CREATE INDEX idx_journeys_org_date ON driver_journeys(organization_id, journey_date);
CREATE INDEX idx_tires_org_truck ON tires(organization_id, truck_id);
CREATE INDEX idx_fines_org_date ON fines(organization_id, infraction_date);
CREATE INDEX idx_parts_org_sku ON parts_inventory(organization_id, sku);

