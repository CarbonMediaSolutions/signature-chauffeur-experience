-- Phase 1: Add missing columns to vehicles table
ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS fuel_type text,
ADD COLUMN IF NOT EXISTS drive_type text,
ADD COLUMN IF NOT EXISTS luggage_capacity text,
ADD COLUMN IF NOT EXISTS mileage_limit text,
ADD COLUMN IF NOT EXISTS security_deposit integer,
ADD COLUMN IF NOT EXISTS insurance_excess integer,
ADD COLUMN IF NOT EXISTS cover_image_url text,
ADD COLUMN IF NOT EXISTS gallery_urls text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS video_urls text[] DEFAULT '{}';

-- Create function to generate slug from name
CREATE OR REPLACE FUNCTION public.generate_vehicle_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'));
    NEW.slug := trim(both '-' from NEW.slug);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to auto-generate slug
DROP TRIGGER IF EXISTS generate_vehicle_slug_trigger ON public.vehicles;
CREATE TRIGGER generate_vehicle_slug_trigger
BEFORE INSERT OR UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.generate_vehicle_slug();

-- Phase 2: Create storage bucket for vehicle media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vehicle-media',
  'vehicle-media',
  true,
  209715200,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Anyone can view (public bucket)
CREATE POLICY "Anyone can view vehicle media"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-media');

-- Storage policies: Only admins can upload
CREATE POLICY "Admins can upload vehicle media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-media' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Storage policies: Only admins can update
CREATE POLICY "Admins can update vehicle media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'vehicle-media' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Storage policies: Only admins can delete
CREATE POLICY "Admins can delete vehicle media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'vehicle-media' 
  AND public.has_role(auth.uid(), 'admin')
);