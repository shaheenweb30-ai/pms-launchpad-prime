-- Create a function that automatically creates a user profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the RLS policy to allow the trigger to insert
DROP POLICY IF EXISTS "Allow profile creation during signup" ON public.users;
CREATE POLICY "Users can insert own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = id);