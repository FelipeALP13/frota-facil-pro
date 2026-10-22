ALTER TABLE organizations ADD COLUMN rntrc TEXT NOT NULL DEFAULT '';
ALTER TABLE organizations ADD COLUMN rntrc_expiry TEXT;
ALTER TABLE organizations ADD COLUMN operation_mode TEXT NOT NULL DEFAULT 'Transporte remunerado';
ALTER TABLE organizations ADD COLUMN rctrc_policy TEXT NOT NULL DEFAULT '';
ALTER TABLE organizations ADD COLUMN rctrc_expiry TEXT;
ALTER TABLE organizations ADD COLUMN rcdc_policy TEXT NOT NULL DEFAULT '';
ALTER TABLE organizations ADD COLUMN rcdc_expiry TEXT;
ALTER TABLE organizations ADD COLUMN rcv_policy TEXT NOT NULL DEFAULT '';
ALTER TABLE organizations ADD COLUMN rcv_expiry TEXT;
ALTER TABLE organizations ADD COLUMN pgr_expiry TEXT;

ALTER TABLE trucks ADD COLUMN pbt_kg REAL NOT NULL DEFAULT 0;
ALTER TABLE trucks ADD COLUMN axle_count INTEGER NOT NULL DEFAULT 2;
ALTER TABLE trucks ADD COLUMN tachograph_expiry TEXT;

ALTER TABLE trips ADD COLUMN status TEXT NOT NULL DEFAULT 'Programada';
ALTER TABLE trips ADD COLUMN operation_type TEXT NOT NULL DEFAULT 'Remunerada';
ALTER TABLE trips ADD COLUMN cargo_type TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN cargo_description TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN weight_kg REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN volume_m3 REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN package_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN empty_km REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN axle_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN ciot TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN cte_key TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN mdfe_key TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN invoice_key TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN toll_amount REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN toll_advance REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN floor_freight REAL NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN floor_freight_checked INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN fuel_cost_mode TEXT NOT NULL DEFAULT 'Abastecimentos';
ALTER TABLE trips ADD COLUMN setpoint_temp REAL;
ALTER TABLE trips ADD COLUMN departure_temp REAL;
ALTER TABLE trips ADD COLUMN arrival_temp REAL;
ALTER TABLE trips ADD COLUMN min_temp REAL;
ALTER TABLE trips ADD COLUMN max_temp REAL;
ALTER TABLE trips ADD COLUMN pre_cooled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN sanitized INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN thermometer_ok INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trips ADD COLUMN release_status TEXT NOT NULL DEFAULT 'Pendente';
ALTER TABLE trips ADD COLUMN release_notes TEXT NOT NULL DEFAULT '';
ALTER TABLE trips ADD COLUMN release_override_reason TEXT NOT NULL DEFAULT '';

ALTER TABLE maintenance ADD COLUMN maintenance_type TEXT NOT NULL DEFAULT 'Preventiva';
ALTER TABLE maintenance ADD COLUMN supplier TEXT NOT NULL DEFAULT '';
ALTER TABLE maintenance ADD COLUMN invoice_number TEXT NOT NULL DEFAULT '';
ALTER TABLE maintenance ADD COLUMN labor_cost REAL NOT NULL DEFAULT 0;
ALTER TABLE maintenance ADD COLUMN parts_cost REAL NOT NULL DEFAULT 0;
ALTER TABLE maintenance ADD COLUMN downtime_hours REAL NOT NULL DEFAULT 0;
ALTER TABLE maintenance ADD COLUMN part_id TEXT;
ALTER TABLE maintenance ADD COLUMN part_quantity REAL NOT NULL DEFAULT 0;

ALTER TABLE financial_entries ADD COLUMN paid_amount REAL NOT NULL DEFAULT 0;
ALTER TABLE financial_entries ADD COLUMN competence_date TEXT;

ALTER TABLE driver_journeys ADD COLUMN max_continuous_minutes INTEGER NOT NULL DEFAULT 0;

CREATE TABLE inventory_movements (
  id TEXT PRIMARY KEY NOT NULL,
  organization_id TEXT NOT NULL REFERENCES organizations(id),
  inventory_id TEXT NOT NULL REFERENCES parts_inventory(id),
  movement_date TEXT NOT NULL,
  direction TEXT NOT NULL,
  quantity REAL NOT NULL,
  reference_type TEXT NOT NULL DEFAULT 'manual',
  reference_id TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_movements_org_date ON inventory_movements(organization_id, movement_date);
CREATE UNIQUE INDEX inventory_movement_reference_unique ON inventory_movements(organization_id, reference_type, reference_id) WHERE reference_id <> '';
