-- Create specials table for promotional offers
CREATE TABLE public.specials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_tag TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.specials ENABLE ROW LEVEL SECURITY;

-- Public can view active specials within date range
CREATE POLICY "Anyone can view active specials"
ON public.specials
FOR SELECT
USING (
  is_active = true 
  AND (start_date IS NULL OR start_date <= CURRENT_DATE)
  AND (end_date IS NULL OR end_date >= CURRENT_DATE)
);

-- Admins can manage all specials
CREATE POLICY "Admins can manage specials"
ON public.specials
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_specials_updated_at
BEFORE UPDATE ON public.specials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();