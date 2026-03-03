
CREATE TABLE public.page_content (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT,
  content_type TEXT NOT NULL DEFAULT 'text',
  value TEXT,
  label TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page content"
  ON public.page_content
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage page content"
  ON public.page_content
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
