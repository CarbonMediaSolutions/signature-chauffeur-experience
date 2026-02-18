
-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  enquiry_type text NOT NULL,
  preferred_vehicle text,
  start_date text,
  end_date text,
  message text NOT NULL,
  referral_source text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins can view submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Service role can insert (from edge function)
CREATE POLICY "Service role can insert contact submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);
