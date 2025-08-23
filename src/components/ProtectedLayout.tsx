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
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      isActive: location.pathname === '/dashboard'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      isActive: location.pathname === '/analytics'
    },
    {
      title: 'Properties',
      href: '/properties',
      icon: Building2,
      isActive: location.pathname === '/properties' || location.pathname.startsWith('/properties/')
    },
    {
      title: 'Tenants',
      href: '/tenants',
      icon: Users,
      isActive: location.pathname === '/tenants'
    },
    {
      title: 'Leases',
      href: '/leases',
      icon: ClipboardList,
      isActive: location.pathname === '/leases'
    },
    {
      title: 'Applications',
      href: '/applications',
      icon: UserCheck,
      isActive: location.pathname === '/applications'
    }
  ];

  const financialItems = [
    {
      title: 'Financials',
      href: '/financials',
      icon: DollarSign,
      isActive: location.pathname === '/financials'
    },
    {
      title: 'Rent Collection',
      href: '/rent-collection',
      icon: CreditCard,
      isActive: location.pathname === '/rent-collection'
    },
    {
      title: 'Expenses',
      href: '/expenses',
      icon: Receipt,
      isActive: location.pathname === '/expenses'
    }
  ];

  const operationsItems = [
    {
      title: 'Maintenance',
      href: '/maintenance',
      icon: Wrench,
      isActive: location.pathname === '/maintenance'
    },
    {
      title: 'Inspections',
      href: '/inspections',
      icon: Search,
      isActive: location.pathname === '/inspections'
    },
    {
      title: 'Documents',
      href: '/documents',
      icon: FolderOpen,
      isActive: location.pathname === '/documents'
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: FileText,
      isActive: location.pathname === '/reports'
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background w-full protected-layout">
        {/* Sidebar */}
        <Sidebar>
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
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
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
              <SidebarGroupLabel>Financial</SidebarGroupLabel>
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
              <SidebarGroupLabel>Operations</SidebarGroupLabel>
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
                    tooltip="Settings"
                  >
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    tooltip="Profile"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                    <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {isProfileDropdownOpen && (
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={handleSignOut}
                        tooltip="Sign Out"
                        variant="outline"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Top Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 px-4 text-sm">
              <span className="text-muted-foreground">/</span>
              <span className="font-medium capitalize">
                {location.pathname.split('/')[1] || 'Dashboard'}
              </span>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
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
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
