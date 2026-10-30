-- Independent content namespaces. Running this script repeatedly is safe.
CREATE TABLE IF NOT EXISTS bands (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL CHECK (tenant IN ('bmc','sierra')),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  photo_key TEXT,
  photo_type TEXT,
  legacy_photo_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (tenant, name)
);
CREATE INDEX IF NOT EXISTS idx_bands_tenant ON bands (tenant, name);

CREATE TABLE IF NOT EXISTS shows (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL CHECK (tenant IN ('bmc','sierra')),
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT,
  title TEXT NOT NULL,
  band_id TEXT,
  venue TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  is_headliner INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','cancelled')),
  version INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shows_tenant_date ON shows (tenant, date, start_time);
CREATE INDEX IF NOT EXISTS idx_shows_public ON shows (tenant, status, date);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_tenant ON audit_log (tenant, created_at DESC);

-- Closures have no performers and must not be mistaken for scheduled shows.
CREATE TABLE IF NOT EXISTS closures (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL CHECK (tenant IN ('bmc','sierra')),
  date TEXT NOT NULL,
  notice TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  updated_by TEXT NOT NULL,
  UNIQUE (tenant, date)
);
CREATE INDEX IF NOT EXISTS idx_closures_tenant_date ON closures(tenant, date);
