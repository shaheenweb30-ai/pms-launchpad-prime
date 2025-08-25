import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { 
  Building2, 
  Home, 
  Users, 
  FileText, 
  DollarSign, 
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  User,
  Wrench,
  CreditCard,
  Receipt,
  ClipboardList,
  Calendar,
  FolderOpen,
  UserCheck,
  Search,
  Shield,
  Eye,
  Clock,
  MessageSquare
} from 'lucide-react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { t, i18n } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Get current language direction
  const isRTL = i18n.language === 'ar';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('sidebar.signOut'),
        description: t('sidebar.signOutSuccess'),
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



  return (
    <SidebarProvider defaultOpen={true}>
      <div 
        className={`flex h-screen bg-background w-full protected-layout ${isRTL ? 'rtl' : 'ltr'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Sidebar - Conditionally positioned based on language */}
        {!isRTL ? (
          <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
            <SidebarHeader className="border-b border-gray-200 bg-gray-50/30">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                  <span className="text-white font-medium text-lg">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light text-black">PropertyFlow</p>
                  <p className="text-xs text-gray-600 truncate">
                    {profile?.first_name || user?.email}
                  </p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Main Navigation */}
              <SidebarMenu>
                {/* Dashboard - Different for each role */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === '/dashboard' || location.pathname === '/admin-dashboard' || location.pathname === '/tenant-dashboard' || location.pathname === '/vendor-dashboard'}
                    tooltip="Dashboard"
                  >
                    <Link to={
                      profile?.role === 'admin' ? '/admin-dashboard' :
                      profile?.role === 'tenant' ? '/tenant-dashboard' :
                      profile?.role === 'vendor' ? '/vendor-dashboard' :
                      '/dashboard'
                    }>
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Property Owner Navigation */}
                {profile?.role === 'homeowner' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/properties'}
                        tooltip="Properties"
                      >
                        <Link to="/properties">
                          <Building2 className="h-4 w-4" />
                          <span>Properties</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/tenants'}
                        tooltip="Tenants"
                      >
                        <Link to="/tenants">
                          <Users className="h-4 w-4" />
                          <span>Tenants</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/chat'}
                        tooltip="Chat"
                      >
                        <Link to="/chat">
                          <MessageSquare className="h-4 w-4" />
                          <span>Chat</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/leases'}
                        tooltip="Leases"
                      >
                        <Link to="/leases">
                          <FileText className="h-4 w-4" />
                          <span>Leases</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>





                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/rent-collection'}
                        tooltip="Rent Collection"
                      >
                        <Link to="/rent-collection">
                          <CreditCard className="h-4 w-4" />
                          <span>Rent Collection</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>



                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance'}
                        tooltip="Maintenance"
                      >
                        <Link to="/maintenance">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>





                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/reports'}
                        tooltip="Reports"
                      >
                        <Link to="/reports">
                          <BarChart3 className="h-4 w-4" />
                          <span>Reports</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Tenant Navigation */}
                {profile?.role === 'tenant' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/my-lease'}
                        tooltip="My Lease"
                      >
                        <Link to="/my-lease">
                          <FileText className="h-4 w-4" />
                          <span>My Lease</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/payment-history'}
                        tooltip="Payment History"
                      >
                        <Link to="/payment-history">
                          <CreditCard className="h-4 w-4" />
                          <span>Payment History</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance-requests'}
                        tooltip="Maintenance Requests"
                      >
                        <Link to="/maintenance-requests">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance Requests</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Vendor/Maintainer Navigation */}
                {profile?.role === 'vendor' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance-tasks'}
                        tooltip="Maintenance Tasks"
                      >
                        <Link to="/maintenance-tasks">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance Tasks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/work-history'}
                        tooltip="Work History"
                      >
                        <Link to="/work-history">
                          <Clock className="h-4 w-4" />
                          <span>Work History</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Admin Navigation */}
                {profile?.role === 'admin' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin-panel'}
                        tooltip="Admin Panel"
                      >
                        <Link to="/admin-panel">
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin-access-control'}
                        tooltip="Access Control"
                      >
                        <Link to="/admin-access-control">
                          <Shield className="h-4 w-4" />
                          <span>Access Control</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Settings - Available to all roles */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === '/settings'}
                    tooltip="Settings"
                  >
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200 bg-gray-50/30">
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/settings'}
                      tooltip={t('sidebar.settings')}
                    >
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        <span>{t('sidebar.settings')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      tooltip={t('sidebar.profile')}
                    >
                      <User className="h-4 w-4" />
                      <span>{t('sidebar.profile')}</span>
                      <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-auto' : 'ml-auto'} transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {isProfileDropdownOpen && (
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={handleSignOut}
                          tooltip={t('sidebar.signOut')}
                          variant="outline"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t('sidebar.signOut')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  )}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>
        ) : null}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Top Header */}
          <header className="flex h-20 shrink-0 items-center gap-4 border-b border-gray-100 bg-gradient-to-r from-white via-white to-gray-50/30 backdrop-blur-sm px-8 shadow-sm">
            {/* Left Section - Sidebar Trigger & Breadcrumb */}
            <div className="flex items-center gap-6">
              <SidebarTrigger 
                className={`${isRTL ? '-mr-1' : '-ml-1'} hover:bg-gray-50 hover:text-black text-gray-600 rounded-2xl transition-all duration-200 p-2 hover:shadow-sm`} 
              />
              
              {/* Enhanced Breadcrumb */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-gray-400 text-sm font-medium">/</span>
                  <span className="font-medium capitalize text-gray-800 text-sm">
                    {location.pathname.split('/')[1] || t('sidebar.dashboard')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Notifications & Profile */}
            <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} flex items-center gap-4`}>
              {/* Enhanced Notifications Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  // Handle notifications click
                  toast({
                    title: "Notifications",
                    description: "You have 3 unread notifications",
                  });
                }}
                className="relative hover:bg-gray-50 hover:text-black hover:shadow-md text-gray-600 rounded-2xl transition-all duration-300 p-3 h-12 w-12 group active:scale-95" 
                title={t('sidebar.notifications')}
              >
                <Bell className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <Badge className="absolute -top-2 -right-2 h-7 w-7 rounded-full p-0 text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-white shadow-lg">
                  3
                </Badge>
                {/* Subtle notification indicator */}
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full animate-ping opacity-75"></div>
              </Button>
              
              {/* Enhanced Profile Section */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 hover:text-black text-gray-700 rounded-2xl px-4 py-2 h-11 transition-all duration-200"
                >
                  {/* Enhanced Avatar */}
                  <div className="w-9 h-9 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-medium text-sm">
                      {profile?.first_name?.[0] || user?.email?.[0] || 'U'}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">
                      {profile?.first_name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 font-light">
                      {profile?.role === 'admin' ? 'Administrator' : 
                       profile?.role === 'homeowner' ? 'Property Owner' : 
                       profile?.role === 'tenant' ? 'Tenant' : 
                       profile?.role === 'vendor' ? 'Vendor' : 'User'}
                    </span>
                  </div>
                  
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-8 w-full max-w-none protected-content bg-gradient-to-br from-gray-50 via-white to-gray-50/30">
            {children}
          </div>
        </div>

        {/* Sidebar for Arabic RTL - positioned on the right */}
        {isRTL ? (
          <Sidebar className="border-l border-gray-200 bg-white shadow-sm">
            <SidebarHeader className="border-b border-gray-200 bg-gray-50/30">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                  <span className="text-white font-medium text-lg">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-light text-black">PropertyFlow</p>
                  <p className="text-xs text-gray-600 truncate">
                    {profile?.first_name || user?.email}
                  </p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Main Navigation */}
              <SidebarMenu>
                {/* Dashboard - Different for each role */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === '/dashboard' || location.pathname === '/admin-dashboard' || location.pathname === '/tenant-dashboard' || location.pathname === '/vendor-dashboard'}
                    tooltip="Dashboard"
                  >
                    <Link to={
                      profile?.role === 'admin' ? '/admin-dashboard' :
                      profile?.role === 'tenant' ? '/tenant-dashboard' :
                      profile?.role === 'vendor' ? '/vendor-dashboard' :
                      '/dashboard'
                    }>
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Property Owner Navigation */}
                {profile?.role === 'homeowner' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/properties'}
                        tooltip="Properties"
                      >
                        <Link to="/properties">
                          <Building2 className="h-4 w-4" />
                          <span>Properties</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/tenants'}
                        tooltip="Tenants"
                      >
                        <Link to="/tenants">
                          <Users className="h-4 w-4" />
                          <span>Tenants</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/leases'}
                        tooltip="Leases"
                      >
                        <Link to="/leases">
                          <FileText className="h-4 w-4" />
                          <span>Leases</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/applications'}
                        tooltip="Applications"
                      >
                        <Link to="/applications">
                          <ClipboardList className="h-4 w-4" />
                          <span>Applications</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/financials'}
                        tooltip="Financials"
                      >
                        <Link to="/financials">
                          <DollarSign className="h-4 w-4" />
                          <span>Financials</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/rent-collection'}
                        tooltip="Rent Collection"
                      >
                        <Link to="/rent-collection">
                          <CreditCard className="h-4 w-4" />
                          <span>Rent Collection</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/expenses'}
                        tooltip="Expenses"
                      >
                        <Link to="/expenses">
                          <Receipt className="h-4 w-4" />
                          <span>Expenses</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance'}
                        tooltip="Maintenance"
                      >
                        <Link to="/maintenance">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/inspections'}
                        tooltip="Inspections"
                      >
                        <Link to="/inspections">
                          <Eye className="h-4 w-4" />
                          <span>Inspections</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/documents'}
                        tooltip="Documents"
                      >
                        <Link to="/documents">
                          <FolderOpen className="h-4 w-4" />
                          <span>Documents</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/reports'}
                        tooltip="Reports"
                      >
                        <Link to="/reports">
                          <BarChart3 className="h-4 w-4" />
                          <span>Reports</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Tenant Navigation */}
                {profile?.role === 'tenant' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/my-lease'}
                        tooltip="My Lease"
                      >
                        <Link to="/my-lease">
                          <FileText className="h-4 w-4" />
                          <span>My Lease</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/payment-history'}
                        tooltip="Payment History"
                      >
                        <Link to="/payment-history">
                          <CreditCard className="h-4 w-4" />
                          <span>Payment History</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance-requests'}
                        tooltip="Maintenance Requests"
                      >
                        <Link to="/maintenance-requests">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance Requests</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Vendor/Maintainer Navigation */}
                {profile?.role === 'vendor' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/maintenance-tasks'}
                        tooltip="Maintenance Tasks"
                      >
                        <Link to="/maintenance-tasks">
                          <Wrench className="h-4 w-4" />
                          <span>Maintenance Tasks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/work-history'}
                        tooltip="Work History"
                      >
                        <Link to="/work-history">
                          <Clock className="h-4 w-4" />
                          <span>Work History</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Admin Navigation */}
                {profile?.role === 'admin' && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin-panel'}
                        tooltip="Admin Panel"
                      >
                        <Link to="/admin-panel">
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === '/admin-access-control'}
                        tooltip="Access Control"
                      >
                        <Link to="/admin-access-control">
                          <Shield className="h-4 w-4" />
                          <span>Access Control</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Settings - Available to all roles */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === '/settings'}
                    tooltip="Settings"
                  >
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200 bg-gray-50/30">
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/settings'}
                      tooltip={t('sidebar.settings')}
                    >
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        <span>{t('sidebar.settings')}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      tooltip={t('sidebar.profile')}
                    >
                      <User className="h-4 w-4" />
                      <span>{t('sidebar.profile')}</span>
                      <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-auto' : 'ml-auto'} transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {isProfileDropdownOpen && (
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={handleSignOut}
                          tooltip={t('sidebar.signOut')}
                          variant="outline"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t('sidebar.signOut')}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  )}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>
        ) : null}
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
