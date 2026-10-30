"""Offline SQLite validation of the non-destructive legacy schedule seed snapshots."""
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
db = sqlite3.connect(":memory:")
for name in ("schema.sql", "seed-bmc-2026-10.sql", "seed-bmc-2026-11.sql", "seed-sierra-2026.sql"):
    db.executescript((ROOT / name).read_text(encoding="utf-8"))

def scalar(sql, *args):
    return db.execute(sql, args).fetchone()[0]

assert scalar("SELECT COUNT(*) FROM shows WHERE tenant='bmc'") == 88
assert scalar("SELECT COUNT(DISTINCT date) FROM shows WHERE tenant='bmc'") == 35
assert scalar("SELECT COUNT(*) FROM bands WHERE tenant='bmc'") >= 22
assert scalar("SELECT COUNT(*) FROM shows WHERE tenant='sierra'") == 3
assert scalar("SELECT COUNT(*) FROM bands WHERE tenant='sierra'") == 2

assert db.execute("""
    SELECT title, end_time, status FROM shows
    WHERE tenant='bmc' AND date='2026-10-31' AND start_time='18:00'
""").fetchone() == ("Epic Funk Brass Band", "20:30", "published")
assert scalar("""
    SELECT title FROM shows
    WHERE tenant='bmc' AND date='2026-10-10' AND start_time='18:00'
""") == "TBA"
assert scalar("""
    SELECT COUNT(*) FROM shows
    WHERE tenant='bmc' AND date='2026-10-31'
""") == 3
assert db.execute("""
    SELECT title, venue, location, start_time, end_time, description
    FROM shows WHERE tenant='sierra' AND date='2026-08-01'
""").fetchone() == (
    "Sierra Green", "The Spotted Cat", "New Orleans, LA",
    "22:00", None, "Original listing: 10:00 PM–Close"
)
assert scalar("""
    SELECT COUNT(*) FROM shows
    WHERE band_id IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM bands b
        WHERE b.id=shows.band_id AND b.tenant=shows.tenant
    )
""") == 0
assert scalar("""
    SELECT COUNT(*) FROM bands
    WHERE legacy_photo_url IS NOT NULL AND
          legacy_photo_url NOT LIKE 'https://shows.balconymusicclub.com/%'
""") == 0

# Reapplying these snapshots must not duplicate events or erase existing rows.
for name in ("seed-bmc-2026-10.sql", "seed-bmc-2026-11.sql", "seed-sierra-2026.sql"):
    db.executescript((ROOT / name).read_text(encoding="utf-8"))
assert scalar("SELECT COUNT(*) FROM shows") == 91
assert scalar("SELECT COUNT(*) FROM bands") >= 24
assert scalar("SELECT COUNT(*) FROM closures WHERE tenant='bmc'") == 1
assert scalar("SELECT notice FROM closures WHERE tenant='bmc' AND date='2026-11-26'").startswith("CLOSED FOR THANKSGIVING")
assert scalar("SELECT title FROM shows WHERE tenant='bmc' AND date='2026-11-28' AND start_time='21:00'") == "TBD"
assert scalar("SELECT title FROM shows WHERE tenant='bmc' AND date='2026-11-07' AND start_time='21:00'") == "KEEPING IT ROLLING BRASS BAND"
print("Seeds validated: 47 October BMC slots + 41 November slots, 1 closure, 3 Sierra shows; idempotent.")
