-- Phase 1: Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_properties()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT id FROM properties WHERE owner_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_user_leases()
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT id FROM leases WHERE tenant_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_property_owner(property_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS(SELECT 1 FROM properties WHERE id = property_uuid AND owner_id = auth.uid());
$$;

-- Phase 2: Drop existing problematic RLS policies and recreate them securely
DROP POLICY IF EXISTS "Property owners can manage their properties" ON public.properties;
DROP POLICY IF EXISTS "Tenants can view properties they're associated with" ON public.properties;
DROP POLICY IF EXISTS "Tenants can view own leases" ON public.leases;
DROP POLICY IF EXISTS "Property owners can manage leases" ON public.leases;

-- Recreate properties policies using security definer functions
CREATE POLICY "Property owners can manage their properties"
ON public.properties
FOR ALL
USING (owner_id = auth.uid());

CREATE POLICY "Tenants can view properties they're associated with"
ON public.properties
FOR SELECT
USING (id IN (
  SELECT property_id FROM leases WHERE tenant_id = auth.uid()
));

-- Recreate leases policies using security definer functions
CREATE POLICY "Tenants can view own leases"
ON public.leases
FOR SELECT
USING (tenant_id = auth.uid());

CREATE POLICY "Property owners can manage leases"
ON public.leases
FOR ALL
USING (public.is_property_owner(property_id));

-- Phase 3: Secure users table - remove overly permissive policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Enable read access for own profile" ON public.users;

-- Create single, secure policy for users table
CREATE POLICY "Users can only access own profile"
ON public.users
FOR ALL
USING (id = auth.uid());

-- Phase 4: Secure database functions with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, role, is_active, email_verified)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'tenant'::user_role),
    true,
    false
  );
  RETURN new;
END;
$$;

-- Phase 5: Create missing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Phase 6: Secure audit logs - ensure only admins can access
DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (
  EXISTS(
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Phase 7: Secure messages table
DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

CREATE POLICY "Users can view messages they sent or received"
ON public.messages
FOR SELECT
USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update messages they sent"
ON public.messages
FOR UPDATE
USING (sender_id = auth.uid());