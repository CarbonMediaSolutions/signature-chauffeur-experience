-- Create storage bucket for specials images
INSERT INTO storage.buckets (id, name, public)
VALUES ('specials', 'specials', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access
CREATE POLICY "Public read access for specials images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'specials');

-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload specials images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'specials' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update specials images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'specials' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete specials images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'specials' AND auth.role() = 'authenticated');