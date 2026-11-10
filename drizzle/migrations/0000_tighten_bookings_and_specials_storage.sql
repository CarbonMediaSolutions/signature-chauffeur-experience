DROP POLICY IF EXISTS "Service role can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create pending bookings" ON public.bookings
FOR INSERT TO anon, authenticated
WITH CHECK (status = 'pending_payment' AND payfast_payment_id IS NULL AND payfast_status IS NULL AND end_date >= start_date AND total_amount > 0);

DROP POLICY IF EXISTS "Authenticated users can update specials images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete specials images" ON storage.objects;
CREATE POLICY "Admins can update specials images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'specials' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'specials' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete specials images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'specials' AND public.has_role(auth.uid(), 'admin'));