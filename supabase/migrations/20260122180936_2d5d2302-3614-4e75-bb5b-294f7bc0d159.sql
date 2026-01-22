-- Create storage bucket for vehicle submission photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-submissions', 'vehicle-submissions', true);

-- RLS Policy: Allow anyone to upload vehicle submission images
CREATE POLICY "Anyone can upload vehicle submission images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'vehicle-submissions');

-- RLS Policy: Public read access for vehicle submissions
CREATE POLICY "Public read access for vehicle submissions"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vehicle-submissions');