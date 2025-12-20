-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  monthly_price DECIMAL(10, 2) NOT NULL,
  annual_price DECIMAL(10, 2) NOT NULL,
  period TEXT NOT NULL DEFAULT 'per month',
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for active plans
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active ON public.pricing_plans(is_active, display_order);

-- Enable RLS
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active pricing plans (public access)
CREATE POLICY "Anyone can view active pricing plans"
  ON public.pricing_plans
  FOR SELECT
  USING (is_active = true);

-- Policy: Only admins can insert/update/delete pricing plans
CREATE POLICY "Admins can manage pricing plans"
  ON public.pricing_plans
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Insert default pricing plans
INSERT INTO public.pricing_plans (name, monthly_price, annual_price, period, description, features, popular, display_order) VALUES
(
  'Starter',
  29.00,
  290.00,
  'per month',
  'Perfect for individual landlords',
  '["Up to 5 properties", "Basic tenant management", "Online rent collection", "Mobile app access", "Email support"]'::jsonb,
  false,
  1
),
(
  'Professional',
  79.00,
  790.00,
  'per month',
  'Ideal for growing portfolios',
  '["Up to 25 properties", "Advanced tenant screening", "Maintenance management", "Financial reporting", "Priority support", "API access"]'::jsonb,
  true,
  2
),
(
  'Enterprise',
  199.00,
  1990.00,
  'per month',
  'For large property managers',
  '["Unlimited properties", "Custom integrations", "Advanced analytics", "White-label options", "Dedicated support", "Custom training"]'::jsonb,
  false,
  3
)
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

