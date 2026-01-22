-- Add discount_percent column to specials table for corner badges
ALTER TABLE public.specials ADD COLUMN discount_percent integer;

-- Add comment for clarity
COMMENT ON COLUMN public.specials.discount_percent IS 'Optional discount percentage to display as corner badge on special offer cards';