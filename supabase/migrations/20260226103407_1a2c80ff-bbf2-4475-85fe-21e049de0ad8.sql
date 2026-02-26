ALTER TABLE public.vehicles
  ADD COLUMN self_drive_rate integer DEFAULT NULL,
  ADD COLUMN chauffeur_rate integer DEFAULT NULL;