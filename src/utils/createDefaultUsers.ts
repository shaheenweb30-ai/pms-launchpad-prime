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
  
  for (const userData of defaultUsers) {
    try {
      console.log(`Processing user: ${userData.email}`);
      
      // Check if user already exists in auth
      const { data: existingUser } = await supabase.auth.getUser();
      
      // Try to sign in first to see if user exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
      });
      
      if (signInError) {
        console.log(`User ${userData.email} doesn't exist, creating...`);
        
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password
        });
        
        if (authError) {
          console.error(`Failed to create auth user for ${userData.email}:`, authError.message);
          continue;
        }
        
        if (authData.user) {
          console.log(`Auth user created for ${userData.email}`);
          
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
          } else {
            console.log(`✅ Profile created successfully for ${userData.email}`);
          }
        }
      } else {
        console.log(`✅ User ${userData.email} already exists and can sign in`);
        
        // Check if profile exists in users table
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', signInData.user.id)
          .single();
        
        if (profileError) {
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
          } else {
            console.log(`✅ Missing profile created for ${userData.email}`);
          }
        } else {
          console.log(`✅ Profile exists for ${userData.email}`);
        }
      }
      
      // Sign out before processing next user
      await supabase.auth.signOut();
      
    } catch (error) {
      console.error(`Error processing user ${userData.email}:`, error);
    }
  }
  
  console.log('Default user creation process completed');
};

// Auto-run if called directly
if (typeof window !== 'undefined') {
  (window as any).createDefaultUsers = createDefaultUsers;
}