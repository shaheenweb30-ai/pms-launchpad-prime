import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Home, 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  LogOut,
  Plus,
  BarChart3,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  LayoutDashboard,
  Building
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - in real app, this would come from API
  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Sunset Blvd, Los Angeles, CA",
      type: "Apartment Complex",
      units: 24,
      occupied: 20,
      monthlyRevenue: 48000,
      status: "active"
    },
    {
      id: 2,
      name: "Downtown Lofts",
      address: "456 Main St, Los Angeles, CA",
      type: "Loft Building",
      units: 12,
      occupied: 10,
      monthlyRevenue: 32000,
      status: "active"
    },
    {
      id: 3,
      name: "Garden Villas",
      address: "789 Oak Ave, Los Angeles, CA",
      type: "Townhouse",
      units: 8,
      occupied: 6,
      monthlyRevenue: 24000,
      status: "active"
    }
  ];

  const tenants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments",
      unit: "A101",
      rent: 2000,
      status: "active",
      leaseEnd: "2024-12-31"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      property: "Sunset Apartments",
      unit: "A102",
      rent: 2100,
      status: "active",
      leaseEnd: "2025-06-30"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 345-6789",
      property: "Downtown Lofts",
      unit: "L201",
      rent: 2800,
      status: "active",
      leaseEnd: "2024-11-30"
    }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      title: "Leaky Faucet in Kitchen",
      property: "Sunset Apartments",
      unit: "A101",
      tenant: "John Smith",
      priority: "medium",
      status: "in_progress",
      category: "plumbing",
      description: "Kitchen faucet is leaking and needs repair",
      createdAt: "2024-01-15",
      estimatedCost: 150
    },
    {
      id: 2,
      title: "AC Not Working",
      property: "Downtown Lofts",
      unit: "L201",
      tenant: "Mike Davis",
      priority: "high",
      status: "pending",
      category: "hvac",
      description: "Air conditioning unit stopped working",
      createdAt: "2024-01-16",
      estimatedCost: 300
    },
    {
      id: 3,
      title: "Broken Window Lock",
      property: "Garden Villas",
      unit: "V3",
      tenant: "Emily Wilson",
      priority: "low",
      status: "completed",
      category: "structural",
      description: "Window lock mechanism broken",
      createdAt: "2024-01-10",
      estimatedCost: 75
    }
  ];

  const financialData = {
    monthlyRevenue: 104000,
    monthlyExpenses: 32000,
    netIncome: 72000,
    occupancyRate: 83.3,
    averageRent: 2167,
    totalProperties: 3,
    totalUnits: 44
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <Badge variant="secondary" className="ml-2">
                {profile.role === 'homeowner' ? 'Property Owner' : 
                 profile.role === 'tenant' ? 'Tenant' : 
                 profile.role === 'vendor' ? 'Maintainer' : 'User'}
              </Badge>
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

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-[#a5afbe]/20 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-[#231f20] mb-6">Navigation</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#ed1c24] text-white'
                    : 'text-[#a5afbe] hover:bg-[#f8f9fa] hover:text-[#ed1c24]'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab('properties')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'properties'
                    ? 'bg-[#ed1c24] text-white'
                    : 'text-[#a5afbe] hover:bg-[#f8f9fa] hover:text-[#ed1c24]'
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="font-medium">Properties</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-3xl font-bold text-[#231f20] mb-2">
                  Welcome back, {profile.first_name || 'User'}!
                </h1>
                <p className="text-[#a5afbe] text-lg">
                  {profile.role === 'homeowner' 
                    ? 'Manage your properties, tenants, and financial performance'
                    : 'Welcome to your PropertyFlow dashboard'
                  }
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[#a5afbe]">Properties</p>
                        <p className="text-2xl font-bold text-[#231f20]">{financialData.totalProperties}</p>
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
                        <p className="text-sm text-[#a5afbe]">Total Units</p>
                        <p className="text-2xl font-bold text-[#231f20]">{financialData.totalUnits}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ff9500] to-[#e6850e] rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[#a5afbe]">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-[#231f20]">${financialData.monthlyRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#46b64b] to-[#2d8f31] rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[#a5afbe]">Occupancy Rate</p>
                        <p className="text-2xl font-bold text-[#231f20]">{financialData.occupancyRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity and Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                          <p className="text-sm font-medium text-[#231f20]">New tenant moved in</p>
                          <p className="text-xs text-[#a5afbe]">Sunset Apartments - A103</p>
                        </div>
                        <span className="text-xs text-[#a5afbe]">2 hours ago</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-lg">
                        <div className="w-8 h-8 bg-[#46b64b]/10 rounded-full flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-[#46b64b]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#231f20]">Rent payment received</p>
                          <p className="text-xs text-[#a5afbe]">Downtown Lofts - L202</p>
                        </div>
                        <span className="text-xs text-[#a5afbe]">1 day ago</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-[#f8f9fa] rounded-lg">
                        <div className="w-8 h-8 bg-[#ff9500]/10 rounded-full flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#ff9500]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#231f20]">Maintenance completed</p>
                          <p className="text-xs text-[#a5afbe]">Garden Villas - V3</p>
                        </div>
                        <span className="text-xs text-[#a5afbe]">3 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#231f20]">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full h-12 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full">
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Property
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      <Users className="w-5 h-5 mr-2" />
                      Add New Tenant
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      <FileText className="w-5 h-5 mr-2" />
                      Create Maintenance Request
                    </Button>
                    <Button variant="outline" className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Generate Financial Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Properties Tab Content */}
          {activeTab === 'properties' && (
            <div className="space-y-8">
              {/* Properties Header */}
              <div>
                <h1 className="text-3xl font-bold text-[#231f20] mb-2">Properties Management</h1>
                <p className="text-[#a5afbe] text-lg">
                  Manage your properties, units, and performance
                </p>
              </div>

              {/* Properties List */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-[#231f20]">Your Properties</CardTitle>
                    <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Property
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 border border-[#a5afbe]/20 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-lg flex items-center justify-center">
                            <Home className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#231f20]">{property.name}</h3>
                            <p className="text-sm text-[#a5afbe] flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {property.address}
                            </p>
                            <p className="text-sm text-[#a5afbe]">{property.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#231f20]">${property.monthlyRevenue.toLocaleString()}/month</p>
                          <p className="text-sm text-[#a5afbe]">{property.occupied}/{property.units} units occupied</p>
                          <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
