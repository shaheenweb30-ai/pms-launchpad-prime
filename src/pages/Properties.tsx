import { useState, useEffect } from 'react';
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
  Plus,
  BarChart3,
  MapPin,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  Bell,
  ChevronDown,
  User,
  Shield,
  HelpCircle,
  LogOut,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Settings,
  Download,
  Share2,
  Trash2,
  EyeOff,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  LayoutDashboard
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Properties = () => {
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'units' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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
      status: "active",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      lastUpdated: "2024-01-15",
      occupancyRate: 83.3,
      avgRent: 2000,
      maintenanceRequests: 3,
      upcomingRenewals: 5
    },
    {
      id: 2,
      name: "Downtown Lofts",
      address: "456 Main St, Los Angeles, CA",
      type: "Loft Building",
      units: 12,
      occupied: 10,
      monthlyRevenue: 32000,
      status: "active",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      lastUpdated: "2024-01-16",
      occupancyRate: 83.3,
      avgRent: 2667,
      maintenanceRequests: 1,
      upcomingRenewals: 2
    },
    {
      id: 3,
      name: "Garden Villas",
      address: "789 Oak Ave, Los Angeles, CA",
      type: "Townhouse",
      units: 8,
      occupied: 6,
      monthlyRevenue: 24000,
      status: "active",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      lastUpdated: "2024-01-10",
      occupancyRate: 75.0,
      avgRent: 3000,
      maintenanceRequests: 2,
      upcomingRenewals: 1
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
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredProperties = properties
    .filter(property => 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'revenue':
          aValue = a.monthlyRevenue;
          bValue = b.monthlyRevenue;
          break;
        case 'units':
          aValue = a.units;
          bValue = b.units;
          break;
        case 'date':
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
                  PropertyFlow
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-slate-100 text-slate-700 border-slate-200">
                    {profile.role === 'homeowner' ? 'Property Owner' : 
                     profile.role === 'tenant' ? 'Tenant' : 
                     profile.role === 'vendor' ? 'Maintainer' : 'User'}
                  </Badge>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-slate-500">Online</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Search, Notifications, Profile */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search properties, tenants..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 text-slate-600 hover:text-[#ed1c24] hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-[#ed1c24] text-white rounded-full flex items-center justify-center animate-pulse">
                  3
                </Badge>
              </Button>

              {/* Profile Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-medium text-sm">
                    {profile.first_name?.[0] || user.email?.[0] || 'U'}
                  </span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-slate-900">
                    {profile.first_name || user.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    {profile.role === 'homeowner' ? 'Property Owner' : 
                     profile.role === 'tenant' ? 'Tenant' : 
                     profile.role === 'vendor' ? 'Maintainer' : 'User'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 hover:text-[#ed1c24] hover:bg-slate-100 rounded-xl"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Properties</h1>
              <p className="text-xl text-slate-600">
                Manage your property portfolio and monitor performance
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700 mb-1">Total Properties</p>
                    <p className="text-3xl font-bold text-emerald-900">{financialData.totalProperties}</p>
                    <p className="text-sm text-emerald-600 flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +2 this month
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Total Units</p>
                    <p className="text-3xl font-bold text-blue-900">{financialData.totalUnits}</p>
                    <p className="text-sm text-blue-600 flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8 this month
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700 mb-1">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-amber-900">${(financialData.monthlyRevenue / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-amber-600 flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +15% this month
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700 mb-1">Occupancy Rate</p>
                    <p className="text-3xl font-bold text-purple-900">{financialData.occupancyRate}%</p>
                    <p className="text-sm text-purple-600 flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +5% this month
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 bg-white/80 backdrop-blur-md shadow-xl border border-slate-200/60 rounded-2xl p-6 sticky top-24 h-fit">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Navigation</h2>
              <p className="text-sm text-slate-500">Manage your properties</p>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <LayoutDashboard className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Dashboard</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400" />
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white shadow-lg shadow-[#ed1c24]/25">
                <Building2 className="w-5 h-5 text-white" />
                <span className="font-medium">Properties</span>
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <Users className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Tenants</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Maintenance</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <DollarSign className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Financials</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Reports</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                <Settings className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Settings</span>
              </button>
            </nav>

            {/* Quick Stats in Sidebar */}
            <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200/60">
              <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Properties</span>
                  <span className="font-semibold text-slate-900">{financialData.totalProperties}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Units</span>
                  <span className="font-semibold text-slate-900">{financialData.totalUnits}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Revenue</span>
                  <span className="font-semibold text-emerald-600">${(financialData.monthlyRevenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200 w-64"
                    />
                  </div>

                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200"
                    >
                      <option value="name">Name</option>
                      <option value="revenue">Revenue</option>
                      <option value="units">Units</option>
                      <option value="date">Date</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 hover:bg-slate-100 rounded-lg"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Filter Toggle */}
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl px-4 ${showFilters ? 'border-[#ed1c24] bg-[#ed1c24]/5' : ''}`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {selectedFilters.length > 0 && (
                      <Badge className="ml-2 bg-[#ed1c24] text-white text-xs">
                        {selectedFilters.length}
                      </Badge>
                    )}
                  </Button>

                  {/* Add Property */}
                  <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Property Type</label>
                      <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200">
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="loft">Loft</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                      <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Min Revenue</label>
                      <input
                        type="number"
                        placeholder="$0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Revenue</label>
                      <input
                        type="number"
                        placeholder="$100k"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed1c24]/20 focus:border-[#ed1c24] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Properties Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <Card key={property.id} className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                        <Home className="w-16 h-16 text-slate-600" />
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        {index === 0 && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 border-0">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge className={getStatusColor(property.status)}>
                          {property.status === 'active' ? 'Active' : property.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#ed1c24] transition-colors duration-200">
                          {property.name}
                        </h3>
                        <p className="text-slate-600 flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                          {property.address}
                        </p>
                        <p className="text-slate-500 text-sm font-medium">{property.type}</p>
                      </div>

                      {/* Property Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60">
                          <div className="flex items-center space-x-2 mb-1">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-xs text-slate-600 font-medium">OCCUPANCY</span>
                          </div>
                          <p className="text-lg font-bold text-slate-900">{property.occupied}/{property.units}</p>
                          <p className="text-xs text-slate-500">{property.occupancyRate}%</p>
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60">
                          <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-slate-500" />
                            <span className="text-xs text-slate-600 font-medium">REVENUE</span>
                          </div>
                          <p className="text-lg font-bold text-slate-900">${(property.monthlyRevenue / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-slate-500">per month</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-500 hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 rounded-xl"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property, index) => (
                  <Card key={property.id} className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                          <Home className="w-10 h-10 text-slate-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ed1c24] transition-colors duration-200">
                              {property.name}
                            </h3>
                            <Badge className={getStatusColor(property.status)}>
                              {property.status === 'active' ? 'Active' : property.status}
                            </Badge>
                            {index === 0 && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-slate-600 flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                            {property.address}
                          </p>
                          
                          <div className="grid grid-cols-4 gap-6">
                            <div className="text-center">
                              <p className="text-sm text-slate-500">Units</p>
                              <p className="text-lg font-bold text-slate-900">{property.units}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-500">Occupied</p>
                              <p className="text-lg font-bold text-slate-900">{property.occupied}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-500">Revenue</p>
                              <p className="text-lg font-bold text-slate-900">${(property.monthlyRevenue / 1000).toFixed(0)}k</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-slate-500">Rate</p>
                              <p className="text-lg font-bold text-slate-900">{property.occupancyRate}%</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl px-4"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl px-4"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 rounded-xl px-4"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick Actions Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button className="w-full h-14 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Plus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Add New Property
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group">
                    <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group">
                    <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200/60">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Home className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">New property added</p>
                      <p className="text-xs text-slate-600">Ocean View Condos was added</p>
                      <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200/60">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Tenant moved in</p>
                      <p className="text-xs text-slate-600">Unit A103 at Sunset Apartments</p>
                      <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-slate-200/60">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Revenue milestone</p>
                      <p className="text-xs text-slate-600">Monthly revenue exceeded $250k</p>
                      <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900 mb-2">{financialData.occupancyRate}%</p>
                    <p className="text-sm text-slate-600">Overall Occupancy Rate</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${financialData.occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-slate-900">${(financialData.averageRent).toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Average Rent</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">${(financialData.netIncome / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-slate-600">Net Income</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
