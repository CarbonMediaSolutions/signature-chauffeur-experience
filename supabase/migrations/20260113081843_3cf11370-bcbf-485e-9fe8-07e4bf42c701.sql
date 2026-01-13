-- Add multi-day pricing and aircon fields to vehicles table
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS multi_day_threshold INTEGER DEFAULT 4;
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS multi_day_rate INTEGER;
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS original_multi_day_rate INTEGER;
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS has_aircon BOOLEAN DEFAULT true;