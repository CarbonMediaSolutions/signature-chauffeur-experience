-- Add discount percentage column (defaults to 10%)
ALTER TABLE public.vehicles 
ADD COLUMN IF NOT EXISTS multi_day_discount_percent INTEGER DEFAULT 10;

-- Update all existing vehicles to use 10% discount and clear old confusing fields
UPDATE public.vehicles SET
  multi_day_discount_percent = 10,
  multi_day_rate = NULL,
  original_multi_day_rate = NULL;