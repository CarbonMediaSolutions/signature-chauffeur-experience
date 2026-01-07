-- Add new vehicle specification and rental columns
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS acceleration text,
ADD COLUMN IF NOT EXISTS top_speed text,
ADD COLUMN IF NOT EXISTS doors integer,
ADD COLUMN IF NOT EXISTS excess_mileage_rate integer,
ADD COLUMN IF NOT EXISTS minimum_rental_days integer DEFAULT 1;