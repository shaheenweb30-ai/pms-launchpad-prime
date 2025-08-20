import { useState, useEffect, useRef } from 'react';
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
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowUpRight,
  Search,
  Bell,
  LogOut,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, profile, signOut, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Debug logging
  console.log('Dashboard render:', { user, profile, loading });
  
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

  const financialData = {
    monthlyRevenue: 104000,
    monthlyExpenses: 32000,
    netIncome: 72000,
    occupancyRate: 83.3,
    averageRent: 2167,
    totalProperties: 3,
    totalUnits: 44
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ed1c24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Required</h1>
          <p className="text-slate-600 mb-6">
            You need to be signed in to access the Dashboard.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl py-3"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button 
              variant="outline"
              className="w-full border-slate-200 text-slate-700 rounded-xl py-3"
              onClick={() => navigate('/')}
            >
              Go to Homepage
            </Button>
          </div>
          <div className="mt-6 p-4 bg-slate-100 rounded-lg text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>User: {user ? 'Present' : 'None'}</p>
            <p>Profile: {profile ? 'Present' : 'None'}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    );
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
                  placeholder="Search dashboard, properties..."
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
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
              <p className="text-xl text-slate-600">
                Welcome back, {profile.first_name || 'User'}! Here's what's happening with your properties today
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/properties')}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Properties
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white shadow-lg shadow-[#ed1c24]/25">
                <LayoutDashboard className="w-5 h-5 text-white" />
                <span className="font-medium">Dashboard</span>
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              </button>
              
              <button 
                onClick={() => navigate('/properties')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Building2 className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Properties</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400" />
              </button>

              {/* Additional Navigation Items */}
              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => navigate('/tenants')}
              >
                <Users className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Tenants</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => navigate('/maintenance')}
              >
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Maintenance</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => navigate('/financials')}
              >
                <DollarSign className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Financials</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => navigate('/reports')}
              >
                <BarChart3 className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Reports</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => navigate('/settings')}
              >
                <Settings className="w-5 h-5 text-slate-500" />
                <span className="font-medium">Settings</span>
              </button>
            </nav>

            {/* Quick Stats Section */}
            <div className="mt-8 p-5 bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl border border-slate-200/60 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-slate-500" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/40">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-slate-600">Properties</span>
                  </div>
                  <span className="font-bold text-slate-900">{financialData.totalProperties}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/40">
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600">Units</span>
                  </div>
                  <span className="font-bold text-slate-900">{financialData.totalUnits}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200/40">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-600">Revenue</span>
                  </div>
                  <span className="font-bold text-emerald-600">${(financialData.monthlyRevenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#ed1c24]/5 to-[#225fac]/5 rounded-2xl border border-[#ed1c24]/20">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
                <Plus className="w-4 h-4 mr-2 text-[#ed1c24]" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left text-xs text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-white/50">
                  + Add New Property
                </button>
                <button className="w-full text-left text-xs text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-white/50">
                  + Add New Tenant
                </button>
                <button className="w-full text-left text-xs text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-white/50">
                  + Create Report
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Welcome Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#ed1c24] to-[#225fac] rounded-3xl overflow-hidden mb-8">
              <CardContent className="p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-3">
                      Welcome back, {profile.first_name || 'User'}! 👋
                    </h2>
                    <p className="text-xl text-white/90 mb-4">
                      {profile.role === 'homeowner' 
                        ? 'Here\'s what\'s happening with your properties today'
                        : 'Welcome to your PropertyFlow dashboard'
                      }
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-white/90">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-300" />
                        <span>All systems operational</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span>Last updated: 2 min ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-white/80" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-slate-900">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#ed1c24] hover:text-[#d41920] hover:bg-[#ed1c24]/5 rounded-xl">
                      View All
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Home className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">New tenant moved in</p>
                          <p className="text-xs text-slate-600">Sunset Apartments - A103</p>
                          <p className="text-xs text-slate-500 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            2 hours ago
                          </p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">New</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Rent payment received</p>
                          <p className="text-xs text-slate-600">Downtown Lofts - L202</p>
                          <p className="text-xs text-slate-500 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            1 day ago
                          </p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Payment</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Maintenance completed</p>
                          <p className="text-xs text-slate-600">Garden Villas - V3</p>
                          <p className="text-xs text-slate-500 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            3 days ago
                          </p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button 
                    className="w-full h-14 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/properties')}
                  >
                    <Building2 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Manage Properties
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group">
                    <Plus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Add New Property
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group"
                    onClick={() => navigate('/tenants')}
                  >
                    <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Manage Tenants
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group">
                    <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Create Maintenance Request
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl transition-all duration-200 group">
                    <BarChart3 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Generate Financial Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden mt-8">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                <CardTitle className="text-xl text-slate-900">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900 mb-2">${(financialData.averageRent).toLocaleString()}</p>
                    <p className="text-sm text-slate-600">Average Rent</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                      <span className="text-xs text-emerald-600">+8% this month</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900 mb-2">${(financialData.netIncome / 1000).toFixed(0)}k</p>
                    <p className="text-sm text-slate-600">Net Income</p>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                      <span className="text-xs text-emerald-600">+12% this month</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
