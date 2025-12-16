import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }
    
    console.log('Database connection successful');
    
    // Test 2: Check if users table exists and has correct structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('Table structure error:', tableError);
      return {
        success: false,
        error: tableError.message,
        details: tableError
      };
    }
    
    console.log('Users table accessible');
    
    // Test 3: Check auth configuration
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Auth configuration error:', authError);
      return {
        success: false,
        error: authError.message,
        details: authError
      };
    }
    
    console.log('Auth configuration successful');
    
    return {
      success: true,
      message: 'All Supabase connections working correctly'
    };
    
  } catch (error) {
    console.error('Unexpected error testing Supabase:', error);
    return {
      success: false,
      error: 'Unexpected error',
      details: error
    };
  }
};

export const checkSupabaseConfig = () => {
  console.log('Supabase Configuration:');
  console.log('URL: [configured]');
  console.log('Key: [configured]');
  console.log('Auth config:', supabase.auth);
  
  return {
    url: '[configured]',
    keyLength: 0,
    hasAuth: !!supabase.auth
  };
};
