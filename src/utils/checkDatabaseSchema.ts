import { supabase } from '@/integrations/supabase/client';

export const checkDatabaseSchema = async () => {
  try {
    console.log('🔍 Checking database schema...');
    
    // Check if users table exists and get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.error('❌ Users table error:', tableError);
      return {
        success: false,
        error: tableError.message,
        details: tableError
      };
    }
    
    console.log('✅ Users table accessible');
    
    // Try to get table structure (this might not work with client-side Supabase)
    try {
      const { data: columns, error: columnsError } = await (supabase as any)
        .rpc('get_table_columns', { table_name: 'users' });
      
      if (columnsError) {
        console.log('ℹ️ Could not get column info (normal for client-side):', columnsError.message);
      } else {
        console.log('📋 Table columns:', columns);
      }
    } catch (e) {
      console.log('ℹ️ Column info not available (normal for client-side)');
    }
    
    // Check if we can insert a test record (then delete it)
    const testId = 'test-' + Date.now();
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: testId,
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        role: 'admin',
        is_active: true,
        email_verified: true
      });
    
    if (insertError) {
      console.error('❌ Cannot insert into users table:', insertError);
      return {
        success: false,
        error: `Cannot insert into users table: ${insertError.message}`,
        details: insertError
      };
    }
    
    console.log('✅ Can insert into users table');
    
    // Delete the test record
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', testId);
    
    if (deleteError) {
      console.warn('⚠️ Could not delete test record:', deleteError.message);
    } else {
      console.log('✅ Can delete from users table');
    }
    
    return {
      success: true,
      message: 'Users table is accessible and writable'
    };
    
  } catch (error) {
    console.error('❌ Unexpected error checking schema:', error);
    return {
      success: false,
      error: 'Unexpected error',
      details: error
    };
  }
};

export const checkRequiredTables = async () => {
  const requiredTables = ['users'];
  const results = [];
  
  for (const table of requiredTables) {
    try {
      console.log(`🔍 Checking table: ${table}`);
      
      const { data, error } = await (supabase as any)
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`❌ Table ${table} error:`, error);
        results.push({ table, exists: false, error: error.message });
      } else {
        console.log(`✅ Table ${table} exists and accessible`);
        results.push({ table, exists: true });
      }
    } catch (error) {
      console.error(`❌ Unexpected error checking table ${table}:`, error);
      results.push({ table, exists: false, error: 'Unexpected error' });
    }
  }
  
  return results;
};
