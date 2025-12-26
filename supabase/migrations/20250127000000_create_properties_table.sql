-- Ensure properties table has all required columns
-- This migration adds missing columns if they don't exist

-- Add columns that might be missing (safe to run multiple times)
DO $$ 
BEGIN
  -- Add year_built if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'year_built'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN year_built INTEGER;
  END IF;

  -- Add property_value if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'property_value'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN property_value DECIMAL(10, 2) DEFAULT 0;
  END IF;

  -- Add monthly_expenses if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'monthly_expenses'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN monthly_expenses DECIMAL(10, 2) DEFAULT 0;
  END IF;
END $$;

-- Create properties table if it doesn't exist (with all columns)
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse', 'commercial', 'land', 'Other')),
  total_units INTEGER NOT NULL DEFAULT 1,
  available_units INTEGER DEFAULT 0,
  monthly_rent DECIMAL(10, 2) NOT NULL DEFAULT 0,
  security_deposit DECIMAL(10, 2) DEFAULT 0,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  -- Additional fields for property management
  year_built INTEGER,
  property_value DECIMAL(10, 2) DEFAULT 0,
  monthly_expenses DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_active ON public.properties(is_active);
CREATE INDEX IF NOT EXISTS idx_properties_owner_active ON public.properties(owner_id, is_active);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policy: Property owners can manage their own properties
CREATE POLICY "Property owners can manage their properties"
  ON public.properties
  FOR ALL
  USING (owner_id = auth.uid());

-- Policy: Tenants can view properties they're associated with (via leases)
CREATE POLICY "Tenants can view properties they're associated with"
  ON public.properties
  FOR SELECT
  USING (
    id IN (
      SELECT property_id FROM public.leases WHERE tenant_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION update_properties_updated_at();

-- Function to get owner's properties
CREATE OR REPLACE FUNCTION get_owner_properties(owner_uuid UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  property_type TEXT,
  total_units INTEGER,
  monthly_rent DECIMAL,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.address,
    p.city,
    p.state,
    p.property_type,
    p.total_units,
    p.monthly_rent,
    p.is_active
  FROM public.properties p
  WHERE p.owner_id = owner_uuid
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

