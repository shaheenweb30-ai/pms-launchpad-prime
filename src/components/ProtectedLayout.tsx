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
  Search
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

  const navigationItems = [
    {
      title: t('sidebar.dashboard'),
      href: '/dashboard',
      icon: Home,
      isActive: location.pathname === '/dashboard'
    },
    {
      title: t('sidebar.analytics'),
      href: '/analytics',
      icon: BarChart3,
      isActive: location.pathname === '/analytics'
    },
    {
      title: t('sidebar.properties'),
      href: '/properties',
      icon: Building2,
      isActive: location.pathname === '/properties' || location.pathname.startsWith('/properties/')
    },
    {
      title: t('sidebar.tenants'),
      href: '/tenants',
      icon: Users,
      isActive: location.pathname === '/tenants'
    },
    {
      title: t('sidebar.leases'),
      href: '/leases',
      icon: ClipboardList,
      isActive: location.pathname === '/leases'
    },
    {
      title: t('sidebar.applications'),
      href: '/applications',
      icon: UserCheck,
      isActive: location.pathname === '/applications'
    }
  ];

  const financialItems = [
    {
      title: t('sidebar.financials'),
      href: '/financials',
      icon: DollarSign,
      isActive: location.pathname === '/financials'
    },
    {
      title: t('sidebar.rentCollection'),
      href: '/rent-collection',
      icon: CreditCard,
      isActive: location.pathname === '/rent-collection'
    },
    {
      title: t('sidebar.expenses'),
      href: '/expenses',
      icon: Receipt,
      isActive: location.pathname === '/expenses'
    }
  ];

  const operationsItems = [
    {
      title: t('sidebar.maintenance'),
      href: '/maintenance',
      icon: Wrench,
      isActive: location.pathname === '/maintenance'
    },
    {
      title: t('sidebar.inspections'),
      href: '/inspections',
      icon: Search,
      isActive: location.pathname === '/inspections'
    },
    {
      title: t('sidebar.documents'),
      href: '/documents',
      icon: FolderOpen,
      isActive: location.pathname === '/documents'
    },
    {
      title: t('sidebar.reports'),
      href: '/reports',
      icon: FileText,
      isActive: location.pathname === '/reports'
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div 
        className={`flex h-screen bg-background w-full protected-layout ${isRTL ? 'rtl' : 'ltr'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Sidebar - Conditionally positioned based on language */}
        {!isRTL ? (
          <Sidebar className="border-r border-border/5">
            <SidebarHeader className="border-b border-border/5">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">PropertyFlow</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile?.first_name || user?.email}
                  </p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Main Navigation */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.overview')}</SidebarGroupLabel>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* Financial Management */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.financial')}</SidebarGroupLabel>
                <SidebarMenu>
                  {financialItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* Operations */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.operations')}</SidebarGroupLabel>
                <SidebarMenu>
                  {operationsItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/5">
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className={isRTL ? '-mr-1' : '-ml-1'} />
            <div className="flex items-center gap-2 px-4 text-sm">
              <span className="text-muted-foreground">/</span>
              <span className="font-medium capitalize">
                {location.pathname.split('/')[1] || t('sidebar.dashboard')}
              </span>
            </div>
            
            <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} flex items-center gap-2`}>
              <Button variant="ghost" size="icon" className="relative" title={t('sidebar.notifications')}>
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {profile?.first_name?.[0] || user?.email?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block text-sm font-medium">
                    {profile?.first_name || user?.email}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-6 w-full max-w-none protected-content">
            {children}
          </div>
        </div>

        {/* Sidebar for Arabic RTL - positioned on the right */}
        {isRTL ? (
          <Sidebar className="border-l border-border/5">
            <SidebarHeader className="border-b border-border/5">
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">PropertyFlow</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile?.first_name || user?.email}
                  </p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              {/* Main Navigation */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.overview')}</SidebarGroupLabel>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* Financial Management */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.financial')}</SidebarGroupLabel>
                <SidebarMenu>
                  {financialItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>

              <SidebarSeparator />

              {/* Operations */}
              <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.operations')}</SidebarGroupLabel>
                <SidebarMenu>
                  {operationsItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        tooltip={item.title}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/5">
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
