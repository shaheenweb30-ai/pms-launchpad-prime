-- Drop the restrictive INSERT policy that's blocking signup
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;

-- Create a new INSERT policy that allows profile creation during signup
CREATE POLICY "Allow profile creation during signup" 
ON public.users 
FOR INSERT 
WITH CHECK (
  -- Allow insert if the user ID matches the authenticated user ID
  -- This works during signup when auth.uid() becomes available
  (auth.uid())::text = (id)::text
);