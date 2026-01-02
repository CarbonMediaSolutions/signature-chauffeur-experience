-- Create enums
CREATE TYPE public.booking_status AS ENUM ('pending_payment', 'confirmed', 'cancelled', 'expired', 'completed');
CREATE TYPE public.hold_status AS ENUM ('active', 'converted', 'expired', 'released');
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create vehicles table (will migrate static data later)
CREATE TABLE public.vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  daily_rate INTEGER NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  engine TEXT,
  transmission TEXT,
  seats INTEGER,
  features TEXT[],
  why_we_chose TEXT,
  limited_availability BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create holds table (temporary checkout locks)
CREATE TABLE public.holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status public.hold_status NOT NULL DEFAULT 'active',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT holds_dates_check CHECK (end_date >= start_date)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE RESTRICT,
  hold_id UUID REFERENCES public.holds(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  daily_rate INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status public.booking_status NOT NULL DEFAULT 'pending_payment',
  payfast_payment_id TEXT,
  payfast_reference TEXT,
  payfast_status TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT bookings_dates_check CHECK (end_date >= start_date)
);

-- Create availability_blocks table (admin maintenance/unavailable periods)
CREATE TABLE public.availability_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blocks_dates_check CHECK (end_date >= start_date)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create security definer function for role checking (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply update triggers
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to expire holds
CREATE OR REPLACE FUNCTION public.expire_old_holds()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Expire holds that have passed their expiry time
  UPDATE public.holds
  SET status = 'expired'
  WHERE status = 'active' AND expires_at < now();
  
  -- Update associated bookings
  UPDATE public.bookings
  SET status = 'expired'
  WHERE status = 'pending_payment'
    AND hold_id IN (
      SELECT id FROM public.holds WHERE status = 'expired'
    );
  
  RETURN NULL;
END;
$$;

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Vehicles policies (public read, admin write)
CREATE POLICY "Anyone can view active vehicles"
  ON public.vehicles FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage vehicles"
  ON public.vehicles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Customers policies
CREATE POLICY "Admins can view all customers"
  ON public.customers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create customers"
  ON public.customers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update customers"
  ON public.customers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Holds policies
CREATE POLICY "Anyone can view active holds for availability"
  ON public.holds FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can create holds"
  ON public.holds FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage all holds"
  ON public.holds FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bookings policies
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can update bookings"
  ON public.bookings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Availability blocks policies
CREATE POLICY "Anyone can view availability blocks"
  ON public.availability_blocks FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage availability blocks"
  ON public.availability_blocks FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies (only admins can view/manage)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_holds_vehicle_dates ON public.holds(vehicle_id, start_date, end_date) WHERE status = 'active';
CREATE INDEX idx_bookings_vehicle_dates ON public.bookings(vehicle_id, start_date, end_date) WHERE status IN ('pending_payment', 'confirmed');
CREATE INDEX idx_availability_blocks_vehicle_dates ON public.availability_blocks(vehicle_id, start_date, end_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_holds_expires_at ON public.holds(expires_at) WHERE status = 'active';