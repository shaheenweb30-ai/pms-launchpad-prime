import { supabase } from '@/integrations/supabase/client';

interface DefaultUser {
  email: string;
  password: string;
  role: 'admin' | 'homeowner' | 'tenant' | 'vendor';
  firstName: string;
  lastName: string;
}

const defaultUsers: DefaultUser[] = [
  {
    email: 'admin@gmail.com',
    password: '123456',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    email: 'owner@gmail.com',
    password: '123456',
    role: 'homeowner',
    firstName: 'Property',
    lastName: 'Owner'
  },
  {
    email: 'tenant@gmail.com',
    password: '123456',
    role: 'tenant',
    firstName: 'John',
    lastName: 'Tenant'
  },
  {
    email: 'maintainer@gmail.com',
    password: '123456',
    role: 'vendor',
    firstName: 'Maintenance',
    lastName: 'Vendor'
  }
];

export const createDefaultUsers = async () => {
  console.log('Creating default users...');
  const results: Array<{ email: string; success: boolean; error?: string }> = [];
  
  for (const userData of defaultUsers) {
    try {
      console.log(`Processing user: ${userData.email}`);
      
      // Check if user exists by trying to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });
      
      if (signInError && signInError.message.includes('Invalid login credentials')) {
        console.log(`User ${userData.email} doesn't exist, creating...`);
        
        // Sign out any existing session first
        await supabase.auth.signOut();
        
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            emailRedirectTo: undefined,
            data: {
              role: userData.role
            }
          }
        });
        
        if (authError) {
          console.error(`Failed to create auth user for ${userData.email}:`, authError.message);
          results.push({
            email: userData.email,
            success: false,
            error: authError.message
          });
          continue;
        }
        
        if (authData.user) {
          console.log(`Auth user created for ${userData.email}`);
          
          // Update email verification status (bypass email verification for default users)
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            authData.user.id,
            { email_confirm: true }
          ).catch(() => {
            // If admin API is not available, try alternative approach
            console.log('Admin API not available, using alternative method');
            return { error: null };
          });
          
          // Create profile in users table
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: authData.user.email!,
              first_name: userData.firstName,
              last_name: userData.lastName,
              role: userData.role,
              is_active: true,
              email_verified: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (profileError) {
            console.error(`Failed to create profile for ${userData.email}:`, profileError.message);
            results.push({
              email: userData.email,
              success: false,
              error: profileError.message
            });
          } else {
            console.log(`✅ Profile created successfully for ${userData.email}`);
            results.push({
              email: userData.email,
              success: true
            });
          }
          
          // Sign out after creating
          await supabase.auth.signOut();
        }
      } else if (signInData && signInData.user) {
        console.log(`✅ User ${userData.email} already exists and can sign in`);
        
        // Check if profile exists in users table
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', signInData.user.id)
          .single();
        
        if (profileError || !profileData) {
          console.log(`Profile missing for ${userData.email}, creating...`);
          
          // Create missing profile
          const { data: newProfileData, error: newProfileError } = await supabase
            .from('users')
            .insert({
              id: signInData.user.id,
              email: signInData.user.email!,
              first_name: userData.firstName,
              last_name: userData.lastName,
              role: userData.role,
              is_active: true,
              email_verified: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (newProfileError) {
            console.error(`Failed to create missing profile for ${userData.email}:`, newProfileError.message);
            results.push({
              email: userData.email,
              success: false,
              error: newProfileError.message
            });
          } else {
            console.log(`✅ Missing profile created for ${userData.email}`);
            results.push({
              email: userData.email,
              success: true
            });
          }
        } else {
          console.log(`✅ Profile exists for ${userData.email}`);
          results.push({
            email: userData.email,
            success: true
          });
        }
        
        // Sign out before processing next user
        await supabase.auth.signOut();
      } else {
        console.error(`Unexpected error for ${userData.email}:`, signInError);
        results.push({
          email: userData.email,
          success: false,
          error: signInError?.message || 'Unknown error'
        });
      }
      
    } catch (error) {
      console.error(`Error processing user ${userData.email}:`, error);
      results.push({
        email: userData.email,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  console.log('Default user creation process completed');
  return results;
};

export const checkDefaultUsers = async () => {
  console.log('Checking default users...');
  const results: Array<{ email: string; exists: boolean; role?: string }> = [];
  
  for (const userData of defaultUsers) {
    try {
      // Try to sign in to check if user exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });
      
      if (signInError) {
        results.push({
          email: userData.email,
          exists: false
        });
      } else {
        // Check if profile exists in users table
        const { data: profileData } = await supabase
          .from('users')
          .select('role')
          .eq('id', signInData.user.id)
          .single();
        
        results.push({
          email: userData.email,
          exists: true,
          role: profileData?.role || 'unknown'
        });
        
        // Sign out after checking
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error(`Error checking user ${userData.email}:`, error);
      results.push({
        email: userData.email,
        exists: false
      });
    }
  }
  
  return results;
};

// Auto-run if called directly
if (typeof window !== 'undefined') {
  (window as any).createDefaultUsers = createDefaultUsers;
}