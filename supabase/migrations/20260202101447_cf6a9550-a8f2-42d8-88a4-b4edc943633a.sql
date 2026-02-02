-- Create table for caching Google Reviews
CREATE TABLE public.google_reviews (
  id TEXT NOT NULL PRIMARY KEY,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  profile_photo_url TEXT,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews (public testimonials)
CREATE POLICY "Anyone can view google reviews"
ON public.google_reviews
FOR SELECT
USING (true);

-- Only admins can manage reviews (for edge function with service role)
CREATE POLICY "Admins can manage google reviews"
ON public.google_reviews
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index on rating for efficient filtering
CREATE INDEX idx_google_reviews_rating ON public.google_reviews(rating);

-- Create index on fetched_at for cache invalidation queries
CREATE INDEX idx_google_reviews_fetched_at ON public.google_reviews(fetched_at);