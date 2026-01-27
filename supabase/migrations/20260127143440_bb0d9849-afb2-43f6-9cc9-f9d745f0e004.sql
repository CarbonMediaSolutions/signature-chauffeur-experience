-- 1. Add is_hot column to vehicles table
ALTER TABLE vehicles ADD COLUMN is_hot boolean DEFAULT false;

-- 2. Create site_settings table for configurable content
CREATE TABLE site_settings (
  id text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Initial founder image setting
INSERT INTO site_settings (id, value) VALUES ('founder_image_url', null);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));