import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createDefaultUsers, checkDefaultUsers } from '@/utils/createDefaultUsers';
import { CheckCircle, XCircle, Loader2, UserPlus, Users } from 'lucide-react';

const AdminPanel = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [createResults, setCreateResults] = useState<any[]>([]);
  const [checkResults, setCheckResults] = useState<any[]>([]);

  const handleCreateUsers = async () => {
    setIsCreating(true);
    try {
      const results = await createDefaultUsers();
      setCreateResults(results);
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
    } catch (error) {
      console.error('Error checking users:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Panel</h1>
        <p className="text-slate-600">Manage default user accounts for testing</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
              Create the default user accounts for testing purposes. This will create users with the credentials shown on the sign-in page.
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
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{result.email}</span>
                    {result.success ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Created
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
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
              Check the current status of default user accounts in the system.
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
                  <div key={index} className="flex items-center justify-between text-sm">
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
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Admin</h4>
              <p className="text-sm text-slate-600">Email: admin@gmail.com</p>
              <p className="text-sm text-slate-600">Password: 123456</p>
              <p className="text-sm text-slate-600">Role: Administrator</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Owner</h4>
              <p className="text-sm text-slate-600">Email: owner@gmail.com</p>
              <p className="text-sm text-slate-600">Password: 123456</p>
              <p className="text-sm text-slate-600">Role: Property Owner</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Tenant</h4>
              <p className="text-sm text-slate-600">Email: tenant@gmail.com</p>
              <p className="text-sm text-slate-600">Password: 123456</p>
              <p className="text-sm text-slate-600">Role: Tenant</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Maintainer</h4>
              <p className="text-sm text-slate-600">Email: maintainer@gmail.com</p>
              <p className="text-sm text-slate-600">Password: 123456</p>
              <p className="text-sm text-slate-600">Role: Vendor/Maintainer</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
