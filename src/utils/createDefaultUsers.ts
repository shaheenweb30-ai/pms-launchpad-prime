import { supabase } from '@/integrations/supabase/client';

export const createDefaultUsers = async () => {
  const defaultUsers = [
    {
      email: 'admin@gmail.com',
      password: '123456',
      name: 'Admin User',
      userType: 'admin'
    },
    {
      email: 'owner@gmail.com',
      password: '123456',
      name: 'Property Owner',
      userType: 'homeowner'
    },
    {
      email: 'tenant@gmail.com',
      password: '123456',
      name: 'Tenant User',
      userType: 'tenant'
    },
    {
      email: 'maintainer@gmail.com',
      password: '123456',
      name: 'Maintainer User',
      userType: 'vendor'
    }
  ];

  const results = [];

  for (const user of defaultUsers) {
    try {
      console.log(`\n=== Creating user: ${user.email} ===`);
      console.log('User data:', { email: user.email, userType: user.userType });
      
      // Check if user already exists in auth system
      console.log('Checking if user already exists...');
      try {
        const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password,
        });
        
        if (existingUser.user) {
          console.log(`✅ User ${user.email} already exists in auth system`);
          
          // Check if profile exists in users table
          const { data: profile, error: profileCheckError } = await supabase
            .from('users')
            .select('id, email, role')
            .eq('email', user.email)
            .single();
          
          if (profile && !profileCheckError) {
            console.log(`✅ Profile already exists for ${user.email}`);
            results.push({ email: user.email, success: true, message: 'User already exists' });
            continue; // Skip to next user
          } else {
            console.log(`⚠️ User exists in auth but profile missing, will create profile`);
          }
          
          // Sign out after checking
          await supabase.auth.signOut();
        }
      } catch (e) {
        console.log('User does not exist, proceeding with creation...');
      }
      
      // Sign up the user
      console.log('Attempting to sign up user...');
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (error) {
        console.error(`❌ Error creating ${user.email}:`, error);
        console.error('Error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        results.push({ email: user.email, success: false, error: error.message });
        continue;
      }

      if (data.user) {
        console.log(`✅ User ${user.email} created successfully in auth`);
        console.log('User ID:', data.user.id);
        console.log('User email:', data.user.email);
        
        // Create user profile
        console.log('Creating user profile in database...');
        console.log('User ID from auth:', data.user.id);
        console.log('User email:', data.user.email);
        
        const profileData = {
          id: data.user.id,
          email: data.user.email!,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ').slice(1).join(' ') || '',
          role: user.userType as any,
          is_active: true,
          email_verified: true, // Set to true for testing
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log('Profile data to insert:', profileData);
        
        const { error: profileError } = await supabase
          .from('users')
          .insert(profileData);

        // Try to confirm the user's email in auth system
        console.log('Attempting to confirm user email...');
        try {
          const { error: confirmError } = await supabase.auth.admin.updateUserById(
            data.user.id,
            { email_confirm: true }
          );
          
          if (confirmError) {
            console.log('⚠️ Could not auto-confirm email (expected for client-side):', confirmError.message);
          } else {
            console.log('✅ User email confirmed successfully');
          }
        } catch (e) {
          console.log('ℹ️ Auto-email confirmation not available (normal for client-side)');
        }

        if (profileError) {
          console.error(`❌ Error creating profile for ${user.email}:`, profileError);
          console.error('Profile error details:', {
            message: profileError.message,
            code: profileError.code,
            details: profileError.details
          });
          results.push({ email: user.email, success: false, error: profileError.message });
        } else {
          console.log(`✅ Profile created successfully for ${user.email}`);
          results.push({ email: user.email, success: true });
        }
      } else {
        console.error(`❌ No user data returned for ${user.email}`);
        results.push({ email: user.email, success: false, error: 'No user data returned' });
      }
    } catch (error) {
      console.error(`❌ Unexpected error creating ${user.email}:`, error);
      results.push({ email: user.email, success: false, error: 'Unexpected error' });
    }
  }

  console.log('\n=== Final Results ===');
  console.log(results);
  return results;
};

// Function to check if users exist
export const checkDefaultUsers = async () => {
  const defaultEmails = [
    'admin@gmail.com',
    'owner@gmail.com',
    'tenant@gmail.com',
    'maintainer@gmail.com'
  ];

  const results = [];

  for (const email of defaultEmails) {
    try {
      console.log(`\n=== Checking user: ${email} ===`);
      
      // First check in auth system
      console.log('Checking in Supabase Auth...');
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.log('Auth admin check failed (expected for non-admin):', authError.message);
      } else {
        const authUser = authData.users.find(u => u.email === email);
        if (authUser) {
          console.log('✅ User found in Auth system');
        } else {
          console.log('❌ User not found in Auth system');
        }
      }

      // Check in users table
      console.log('Checking in users table...');
      const { data, error } = await supabase
        .from('users')
        .select('id, email, role, is_active')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error(`❌ Error checking ${email}:`, error);
        results.push({ email, exists: false, error: error.message });
      } else if (data) {
        console.log('✅ User found in database:', data);
        results.push({ email, exists: true, role: data.role, isActive: data.is_active });
      } else {
        console.log('❌ User not found in database');
        results.push({ email, exists: false });
      }
    } catch (error) {
      console.error(`❌ Unexpected error checking ${email}:`, error);
      results.push({ email, exists: false, error: 'Unexpected error' });
    }
  }

  console.log('\n=== Check Results ===');
  console.log(results);
  return results;
};
