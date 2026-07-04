-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  approved INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Create index on ip_hash for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_reviews_ip_hash ON reviews(ip_hash);

-- Create index on approved status for filtering
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
