import { supabase } from '@/integrations/supabase/client';

export const debugDatabaseStructure = async () => {
  try {
    console.log('🔍 Debugging database structure...');
    
    // Try to get table info
    const { data: tableData, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.error('❌ Table access error:', tableError);
      return {
        success: false,
        error: tableError.message,
        details: tableError
      };
    }
    
    console.log('✅ Table accessible');
    
    // Try to insert a minimal test record to see what's required
    const testId = crypto.randomUUID(); // Generate proper UUID
    console.log('🧪 Testing with minimal insert...');
    
    const minimalInsert = {
      id: testId,
      email: 'test-debug@example.com'
    };
    
    const { error: minimalError } = await supabase
      .from('users')
      .insert(minimalInsert);
    
    if (minimalError) {
      console.log('❌ Minimal insert failed:', minimalError.message);
      console.log('Error details:', minimalError);
      
      // Try with more fields
      console.log('🧪 Testing with more fields...');
      const extendedInsert = {
        id: testId,
        email: 'test-debug@example.com',
        first_name: 'Test',
        last_name: 'Debug',
        role: 'admin',
        is_active: true,
        email_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { error: extendedError } = await supabase
        .from('users')
        .insert(extendedInsert);
      
      if (extendedError) {
        console.log('❌ Extended insert also failed:', extendedError.message);
        console.log('Extended error details:', extendedError);
        
        return {
          success: false,
          error: `Database insert failed: ${extendedError.message}`,
          details: extendedError,
          suggestion: 'Check required fields and constraints'
        };
      } else {
        console.log('✅ Extended insert succeeded');
        
        // Clean up test record
        await supabase.from('users').delete().eq('id', testId);
        
        return {
          success: true,
          message: 'Extended insert works - check required fields',
          requiredFields: ['id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'email_verified', 'created_at', 'updated_at']
        };
      }
    } else {
      console.log('✅ Minimal insert succeeded');
      
      // Clean up test record
      await supabase.from('users').delete().eq('id', testId);
      
      return {
        success: true,
        message: 'Minimal insert works - table structure is simple',
        requiredFields: ['id', 'email']
      };
    }
    
  } catch (error) {
    console.error('❌ Unexpected error debugging structure:', error);
    return {
      success: false,
      error: 'Unexpected error',
      details: error
    };
  }
};

export const testSpecificUserInsert = async (email: string, userType: string) => {
  try {
    console.log(`🧪 Testing specific insert for ${email} with role ${userType}`);
    
    const testId = crypto.randomUUID(); // Generate proper UUID
    
    // Test the exact insert we're trying to do
    const testInsert = {
      id: testId,
      email: email,
      first_name: 'Test',
      last_name: 'User',
      role: userType,
      is_active: true,
      email_verified: true
    };
    
    console.log('Test insert data:', testInsert);
    
    const { error: insertError } = await supabase
      .from('users')
      .insert(testInsert);
    
    if (insertError) {
      console.error(`❌ Specific insert failed for ${email}:`, insertError);
      console.error('Error details:', insertError);
      
      return {
        success: false,
        error: insertError.message,
        details: insertError,
        testData: testInsert
      };
    } else {
      console.log(`✅ Specific insert succeeded for ${email}`);
      
      // Clean up test record
      await supabase.from('users').delete().eq('id', testId);
      
      return {
        success: true,
        message: `Insert works for ${email}`,
        testData: testInsert
      };
    }
    
  } catch (error) {
    console.error(`❌ Unexpected error testing ${email}:`, error);
    return {
      success: false,
      error: 'Unexpected error',
      details: error
    };
  }
};
