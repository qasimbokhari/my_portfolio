-- Add rating column to reviews table
ALTER TABLE reviews ADD COLUMN rating INTEGER DEFAULT 5;

-- Rename author column to name
ALTER TABLE reviews RENAME COLUMN author TO name;
