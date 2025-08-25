import { supabase } from '@/integrations/supabase/client';

export const checkCurrentStatus = async () => {
  const defaultEmails = [
    'admin@gmail.com',
    'owner@gmail.com',
    'tenant@gmail.com',
    'maintainer@gmail.com'
  ];

  const results = [];

  for (const email of defaultEmails) {
    try {
      console.log(`\n=== Checking current status: ${email} ===`);
      
      // Check in users table first
      console.log('Checking in users table...');
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('id, email, role, is_active, email_verified')
        .eq('email', email)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error(`❌ Error checking profile for ${email}:`, profileError);
        results.push({ 
          email, 
          profileExists: false, 
          profileError: profileError.message,
          authExists: 'unknown',
          emailConfirmed: false
        });
        continue;
      }

      if (profile) {
        console.log(`✅ Profile exists for ${email}:`, profile);
        results.push({ 
          email, 
          profileExists: true, 
          role: profile.role,
          isActive: profile.is_active,
          emailVerified: profile.email_verified,
          authExists: 'yes',
          emailConfirmed: true
        });
      } else {
        console.log(`❌ No profile found for ${email}`);
        
        // Try to check if user exists in auth (this might not work from client)
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: '123456'
          });
          
          if (authData.user) {
            console.log(`✅ User ${email} exists in auth but no profile`);
            results.push({ 
              email, 
              profileExists: false, 
              authExists: 'yes',
              emailConfirmed: false,
              message: 'Profile missing - needs to be created'
            });
            
            // Sign out after checking
            await supabase.auth.signOut();
          } else {
            console.log(`❌ User ${email} does not exist in auth`);
            results.push({ 
              email, 
              profileExists: false, 
              authExists: 'no',
              emailConfirmed: false,
              message: 'User does not exist'
            });
          }
        } catch (e) {
          console.log(`⚠️ Could not check auth status for ${email}:`, e);
          results.push({ 
            email, 
            profileExists: false, 
            authExists: 'unknown',
            emailConfirmed: false,
            message: 'Could not verify auth status'
          });
        }
      }
    } catch (error) {
      console.error(`❌ Unexpected error checking ${email}:`, error);
      results.push({ 
        email, 
        profileExists: false, 
        authExists: 'unknown',
        emailConfirmed: false,
        error: 'Unexpected error'
      });
    }
  }

  console.log('\n=== Current Status Summary ===');
  console.log(results);
  return results;
};

export const getStatusSummary = (results: any[]) => {
  const summary = {
    total: results.length,
    profilesExist: results.filter(r => r.profileExists).length,
    authExists: results.filter(r => r.authExists === 'yes').length,
    emailConfirmed: results.filter(r => r.emailConfirmed).length,
    readyToLogin: results.filter(r => r.profileExists && r.emailConfirmed).length
  };

  console.log('📊 Status Summary:', summary);
  return summary;
};
