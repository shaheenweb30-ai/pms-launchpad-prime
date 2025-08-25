import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createDefaultUsers, checkDefaultUsers } from '@/utils/createDefaultUsers';
import { testSupabaseConnection, checkSupabaseConfig } from '@/utils/testSupabaseConnection';
import { checkDatabaseSchema, checkRequiredTables } from '@/utils/checkDatabaseSchema';
import { checkCurrentStatus, getStatusSummary } from '@/utils/checkCurrentStatus';
import { debugDatabaseStructure, testSpecificUserInsert } from '@/utils/debugDatabaseStructure';
import { CheckCircle, XCircle, Loader2, UserPlus, Users, Home, Wifi, Database, Clipboard, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateUsers = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isCheckingSchema, setIsCheckingSchema] = useState(false);
  const [isCheckingCurrentStatus, setIsCheckingCurrentStatus] = useState(false);
  const [isDebuggingDatabase, setIsDebuggingDatabase] = useState(false);
  const [createResults, setCreateResults] = useState<any[]>([]);
  const [checkResults, setCheckResults] = useState<any[]>([]);
  const [connectionTestResult, setConnectionTestResult] = useState<any>(null);
  const [schemaCheckResult, setSchemaCheckResult] = useState<any>(null);
  const [currentStatusResults, setCurrentStatusResults] = useState<any[]>([]);
  const [statusSummary, setStatusSummary] = useState<any>(null);
  const [debugResult, setDebugResult] = useState<any>(null);

  const handleCreateUsers = async () => {
    setIsCreating(true);
    try {
      const results = await createDefaultUsers();
      setCreateResults(results);
      console.log('User creation results:', results);
    } catch (error) {
      console.error('Error creating users:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCheckUsers = async () => {
    setIsChecking(true);
    try {
      const results = await checkDefaultUsers();
      setCheckResults(results);
      console.log('User check results:', results);
    } catch (error) {
      console.error('Error checking users:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      // First check config
      const config = checkSupabaseConfig();
      console.log('Supabase config:', config);
      
      // Then test connection
      const result = await testSupabaseConnection();
      setConnectionTestResult(result);
      console.log('Connection test result:', result);
    } catch (error) {
      console.error('Error testing connection:', error);
      setConnectionTestResult({
        success: false,
        error: 'Unexpected error',
        details: error
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleCheckSchema = async () => {
    setIsCheckingSchema(true);
    try {
      console.log('Checking database schema...');
      
      // Check required tables
      const tableResults = await checkRequiredTables();
      console.log('Table check results:', tableResults);
      
      // Check database schema
      const schemaResult = await checkDatabaseSchema();
      setSchemaCheckResult(schemaResult);
      console.log('Schema check result:', schemaResult);
    } catch (error) {
      console.error('Error checking schema:', error);
      setSchemaCheckResult({
        success: false,
        error: 'Unexpected error',
        details: error
      });
    } finally {
      setIsCheckingSchema(false);
    }
  };

  const handleCheckCurrentStatus = async () => {
    setIsCheckingCurrentStatus(true);
    try {
      console.log('Checking current user status...');
      
      const results = await checkCurrentStatus();
      setCurrentStatusResults(results);
      
      const summary = getStatusSummary(results);
      setStatusSummary(summary);
      
      console.log('Current status results:', results);
      console.log('Status summary:', summary);
    } catch (error) {
      console.error('Error checking current status:', error);
    } finally {
      setIsCheckingCurrentStatus(false);
    }
  };

  const handleDebugDatabase = async () => {
    setIsDebuggingDatabase(true);
    try {
      console.log('Debugging database structure...');
      
      const result = await debugDatabaseStructure();
      setDebugResult(result);
      
      console.log('Debug result:', result);
    } catch (error) {
      console.error('Error debugging database:', error);
    } finally {
      setIsDebuggingDatabase(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Setup Default Users</h1>
          <p className="text-slate-600 mb-4">Create the initial user accounts for PropertyFlow Pro</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {/* Test Connection Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Test Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Test the connection to Supabase before creating users.
              </p>
              
              <Button 
                onClick={handleTestConnection} 
                disabled={isTestingConnection}
                variant="outline"
                className="w-full"
              >
                {isTestingConnection ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>

              {connectionTestResult && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Result:</h4>
                  <div className={`p-2 rounded text-sm ${
                    connectionTestResult.success 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {connectionTestResult.success ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {connectionTestResult.message}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        {connectionTestResult.error}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Check Schema Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Check Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Verify database structure and table permissions.
              </p>
              
              <Button 
                onClick={handleCheckSchema} 
                disabled={isCheckingSchema}
                variant="outline"
                className="w-full"
              >
                {isCheckingSchema ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Check Schema
                  </>
                )}
              </Button>

              {schemaCheckResult && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Result:</h4>
                  <div className={`p-2 rounded text-sm ${
                    schemaCheckResult.success 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {schemaCheckResult.success ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {schemaCheckResult.message}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        {schemaCheckResult.error}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Debug Database Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Debug Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Debug database structure and identify insert issues.
              </p>
              
              <Button 
                onClick={handleDebugDatabase} 
                disabled={isDebuggingDatabase}
                variant="outline"
                className="w-full"
              >
                {isDebuggingDatabase ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Debugging...
                  </>
                ) : (
                  <>
                    <Bug className="h-4 w-4 mr-2" />
                    Debug Database
                  </>
                )}
              </Button>

              {debugResult && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Result:</h4>
                  <div className={`p-2 rounded text-sm ${
                    debugResult.success 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {debugResult.success ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {debugResult.message}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        {debugResult.error}
                      </div>
                    )}
                  </div>
                  {debugResult.requiredFields && (
                    <div className="text-xs text-slate-600 mt-2">
                      <strong>Required fields:</strong> {debugResult.requiredFields.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Check Current Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Check the current status of all users without creating duplicates.
              </p>
              
              <Button 
                onClick={handleCheckCurrentStatus} 
                disabled={isCheckingCurrentStatus}
                variant="outline"
                className="w-full"
              >
                {isCheckingCurrentStatus ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Check Status
                  </>
                )}
              </Button>

              {statusSummary && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Summary:</h4>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Total Users:</span>
                      <span className="font-medium">{statusSummary.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profiles Exist:</span>
                      <span className="font-medium">{statusSummary.profilesExist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ready to Login:</span>
                      <span className="font-medium">{statusSummary.readyToLogin}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create Users Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create Default Users
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                This will create the default user accounts that can be used to test the platform.
              </p>
              
              <Button 
                onClick={handleCreateUsers} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Users...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Default Users
                  </>
                )}
              </Button>

              {createResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Results:</h4>
                  {createResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                      <span className="text-slate-600">{result.email}</span>
                      {result.success ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Created
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed: {result.error}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Check Users Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Check User Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Verify which users exist in the system and their current status.
              </p>
              
              <Button 
                onClick={handleCheckUsers} 
                disabled={isChecking}
                variant="outline"
                className="w-full"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Check User Status
                  </>
                )}
              </Button>

              {checkResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Status:</h4>
                  {checkResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                      <span className="text-slate-600">{result.email}</span>
                      {result.exists ? (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Exists
                          </Badge>
                          <span className="text-xs text-slate-500">{result.role}</span>
                        </div>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Missing
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Default User Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Default User Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-sm text-slate-900">Admin</h4>
                <p className="text-sm text-slate-600">Email: admin@gmail.com</p>
                <p className="text-sm text-slate-600">Password: 123456</p>
                <p className="text-sm text-slate-600">Role: Administrator</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-sm text-slate-900">Owner</h4>
                <p className="text-sm text-slate-600">Email: owner@gmail.com</p>
                <p className="text-sm text-slate-600">Password: 123456</p>
                <p className="text-sm text-slate-600">Role: Property Owner</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-sm text-slate-900">Tenant</h4>
                <p className="text-sm text-slate-600">Email: tenant@gmail.com</p>
                <p className="text-sm text-slate-600">Password: 123456</p>
                <p className="text-sm text-slate-600">Role: Tenant</p>
              </div>
              <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-sm text-slate-900">Maintainer</h4>
                <p className="text-sm text-slate-600">Email: maintainer@gmail.com</p>
                <p className="text-sm text-slate-600">Password: 123456</p>
                <p className="text-sm text-slate-600">Role: Vendor/Maintainer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600">
              <p>1. <strong>Create Users:</strong> Click "Create Default Users" to set up all accounts</p>
              <p>2. <strong>Verify Creation:</strong> Use "Check User Status" to confirm users were created</p>
              <p>3. <strong>Test Login:</strong> Go to the sign-in page and try logging in with any of the credentials above</p>
              <p>4. <strong>Access Platform:</strong> Once logged in, you'll have access to the full platform based on your role</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateUsers;
