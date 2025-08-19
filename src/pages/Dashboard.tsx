import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Home, Users, FileText, DollarSign, Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of PropertyFlow.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'homeowner':
        return 'Property Owner';
      case 'tenant':
        return 'Tenant';
      case 'vendor':
        return 'Maintainer';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case 'homeowner':
        return 'Manage your properties and tenants efficiently';
      case 'tenant':
        return 'Stay on top of your rental payments and maintenance requests';
      case 'vendor':
        return 'Handle maintenance requests and keep properties in top condition';
      case 'admin':
        return 'Oversee all operations and manage the platform';
      default:
        return 'Welcome to PropertyFlow';
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#a5afbe]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#231f20]">PropertyFlow</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {profile.first_name?.[0] || user.email?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-[#231f20] font-medium">
                  {profile.first_name || user.email}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">
            Welcome back, {profile.first_name || 'User'}!
          </h1>
          <p className="text-[#a5afbe] text-lg">
            {getWelcomeMessage(profile.role || 'user')}
          </p>
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#ed1c24]/10 to-[#225fac]/10 border border-[#ed1c24]/20 rounded-full">
            <span className="text-sm font-medium text-[#ed1c24]">
              {getRoleDisplayName(profile.role || 'user')}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#a5afbe]">Properties</p>
                  <p className="text-2xl font-bold text-[#231f20]">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#46b64b] to-[#2d8f31] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#a5afbe]">Tenants</p>
                  <p className="text-2xl font-bold text-[#231f20]">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff9500] to-[#e6850e] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#a5afbe]">Requests</p>
                  <p className="text-2xl font-bold text-[#231f20]">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#46b64b] to-[#2d8f31] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#a5afbe]">Revenue</p>
                  <p className="text-2xl font-bold text-[#231f20]">$24.5K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#231f20]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full h-12 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full">
                <Home className="w-5 h-5 mr-2" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                <Users className="w-5 h-5 mr-2" />
                Manage Tenants
              </Button>
              <Button variant="outline" className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                <FileText className="w-5 h-5 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#231f20]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-lg">
                  <div className="w-8 h-8 bg-[#ed1c24]/10 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-[#ed1c24]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#231f20]">New property added</p>
                    <p className="text-xs text-[#a5afbe]">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-lg">
                  <div className="w-8 h-8 bg-[#46b64b]/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-[#46b64b]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#231f20]">Rent payment received</p>
                    <p className="text-xs text-[#a5afbe]">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-lg">
                  <div className="w-8 h-8 bg-[#ff9500]/10 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#ff9500]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#231f20]">Maintenance request</p>
                    <p className="text-xs text-[#a5afbe]">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#231f20]">Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-[#231f20] mb-4">Profile Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[#a5afbe]">Full Name</label>
                      <p className="text-[#231f20] font-medium">
                        {profile.first_name} {profile.last_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-[#a5afbe]">Email</label>
                      <p className="text-[#231f20] font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#a5afbe]">Role</label>
                      <p className="text-[#231f20] font-medium">
                        {getRoleDisplayName(profile.role || 'user')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-[#231f20] mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      Notification Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
