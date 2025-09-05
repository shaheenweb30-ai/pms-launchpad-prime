import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Plus,
  Bell,
  Home,
  Shield,
  Target,
  Zap,
  Star,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Download,
  Share,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Receipt,
  Wrench,
  FileText,
  Settings,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    totalProperties: 0,
    activeTenants: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
    averageRentPerProperty: 0,
    totalPropertyValue: 0
  });

  // State for recent activity data
  const [recentActivityData, setRecentActivityData] = useState<any[]>([]);

  // State for upcoming tasks data
  const [upcomingTasksData, setUpcomingTasksData] = useState<any[]>([]);

  // Function to get total properties from localStorage
  const getTotalProperties = () => {
    try {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        const properties = JSON.parse(savedProperties);
        return properties.length;
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    }
    return 0;
  };

  // Function to get active tenants from localStorage
  const getActiveTenants = () => {
    try {
      const savedTenants = localStorage.getItem('pms-tenants');
      if (savedTenants) {
        const tenants = JSON.parse(savedTenants);
        return tenants.filter((tenant: any) => tenant.status === 'active').length;
      }
    } catch (error) {
      console.error('Error loading tenants:', error);
    }
    return 0;
  };

  // Function to get monthly revenue from localStorage
  const getMonthlyRevenue = () => {
    try {
      const savedRentPayments = localStorage.getItem('pms-rent-payments');
      if (savedRentPayments) {
        const rentPayments = JSON.parse(savedRentPayments);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        return rentPayments
          .filter((payment: any) => {
            const paymentDate = new Date(payment.date);
            return payment.status === 'paid' && 
                   paymentDate.getMonth() === currentMonth && 
                   paymentDate.getFullYear() === currentYear;
          })
          .reduce((sum: number, payment: any) => sum + payment.amount + (payment.lateFees || 0), 0);
      }
    } catch (error) {
      console.error('Error loading rent payments:', error);
    }
    return 0;
  };

  // Function to calculate occupancy rate
  const getOccupancyRate = () => {
    try {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        const properties = JSON.parse(savedProperties);
        if (properties.length === 0) return 0;
        
        const totalUnits = properties.reduce((sum: number, prop: any) => sum + (prop.units || 0), 0);
        const occupiedUnits = properties.reduce((sum: number, prop: any) => sum + (prop.occupiedUnits || 0), 0);
        
        return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
      }
    } catch (error) {
      console.error('Error calculating occupancy rate:', error);
    }
    return 0;
  };

  // Function to get average rent per property
  const getAverageRentPerProperty = () => {
    try {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        const properties = JSON.parse(savedProperties);
        if (properties.length === 0) return 0;
        
        const totalRent = properties.reduce((sum: number, prop: any) => sum + (prop.monthlyRent || 0), 0);
        return Math.round(totalRent / properties.length);
      }
    } catch (error) {
      console.error('Error calculating average rent:', error);
    }
    return 0;
  };

  // Function to get total property value
  const getTotalPropertyValue = () => {
    try {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        const properties = JSON.parse(savedProperties);
        return properties.reduce((sum: number, prop: any) => sum + (prop.propertyValue || 0), 0);
      }
    } catch (error) {
      console.error('Error calculating total property value:', error);
    }
    return 0;
  };

  // Function to get recent rent payments
  const getRecentRentPayments = () => {
    try {
      const savedPayments = localStorage.getItem('pms-rent-payments');
      if (savedPayments) {
        const payments = JSON.parse(savedPayments);
        return payments
          .filter((payment: any) => payment.status === 'paid')
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
      }
    } catch (error) {
      console.error('Error loading rent payments:', error);
    }
    return [];
  };

  // Function to get recent maintenance requests
  const getRecentMaintenanceRequests = () => {
    try {
      const savedMaintenance = localStorage.getItem('pms-maintenance-requests');
      if (savedMaintenance) {
        const maintenance = JSON.parse(savedMaintenance);
        return maintenance
          .sort((a: any, b: any) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
          .slice(0, 2);
      }
    } catch (error) {
      console.error('Error loading maintenance requests:', error);
    }
    return [];
  };

  // Function to get recent tenant activities
  const getRecentTenantActivities = () => {
    try {
      const savedTenants = localStorage.getItem('pms-tenants');
      if (savedTenants) {
        const tenants = JSON.parse(savedTenants);
        return tenants
          .filter((tenant: any) => tenant.status === 'active')
          .sort((a: any, b: any) => new Date(b.leaseStart || b.createdAt).getTime() - new Date(a.leaseStart || a.createdAt).getTime())
          .slice(0, 2);
      }
    } catch (error) {
      console.error('Error loading tenant activities:', error);
    }
    return [];
  };

  // Function to format time ago
  const getTimeAgo = (dateString: string) => {
    try {
      if (!dateString) return 'Recently';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';
      
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error formatting time ago:', error);
      return 'Recently';
    }
  };

  // Function to load and format recent activity data
  const loadRecentActivityData = () => {
    try {
      const rentPayments = getRecentRentPayments();
      const maintenanceRequests = getRecentMaintenanceRequests();
      const tenantActivities = getRecentTenantActivities();

      const activities: any[] = [];

      // Add rent payment activities
      rentPayments.forEach((payment: any) => {
        if (payment && payment.date) {
          activities.push({
            type: 'payment',
            message: `Rent payment received from ${payment.tenantName || 'Tenant'}`,
            amount: formatCurrency((payment.amount || 0) + (payment.lateFees || 0)),
            time: getTimeAgo(payment.date),
            status: 'success',
            property: payment.property || 'Property',
            icon: CreditCard,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
          });
        }
      });

      // Add maintenance request activities
      maintenanceRequests.forEach((request: any) => {
        if (request && (request.createdAt || request.date)) {
          activities.push({
            type: 'maintenance',
            message: `Maintenance request - ${request.description || 'Issue reported'}`,
            property: request.property || 'Property',
            time: getTimeAgo(request.createdAt || request.date),
            status: request.status === 'completed' ? 'success' : 'pending',
            icon: Wrench,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
          });
        }
      });

      // Add tenant activities
      tenantActivities.forEach((tenant: any) => {
        if (tenant && (tenant.leaseStart || tenant.createdAt)) {
          activities.push({
            type: 'lease',
            message: `Lease ${tenant.leaseStatus === 'active' ? 'active' : 'signed'} for ${tenant.name || 'Tenant'}`,
            property: tenant.property || 'Property',
            time: getTimeAgo(tenant.leaseStart || tenant.createdAt),
            status: 'success',
            icon: FileText,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
          });
        }
      });

      // Sort by time and take the most recent 4
      const sortedActivities = activities
        .sort((a, b) => {
          const timeA = a.time && a.time.includes('ago') ? parseInt(a.time.split(' ')[0]) : 0;
          const timeB = b.time && b.time.includes('ago') ? parseInt(b.time.split(' ')[0]) : 0;
          return timeA - timeB;
        })
        .slice(0, 4);

      setRecentActivityData(sortedActivities);
    } catch (error) {
      console.error('Error loading recent activity data:', error);
      setRecentActivityData([]);
    }
  };

  // Function to get upcoming inspections
  const getUpcomingInspections = () => {
    try {
      const savedInspections = localStorage.getItem('pms-inspections');
      if (savedInspections) {
        const inspections = JSON.parse(savedInspections);
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        
        return inspections
          .filter((inspection: any) => {
            const scheduledDate = new Date(inspection.scheduledDate || inspection.nextInspection);
            return scheduledDate >= now && scheduledDate <= thirtyDaysFromNow;
          })
          .sort((a: any, b: any) => new Date(a.scheduledDate || a.nextInspection).getTime() - new Date(b.scheduledDate || b.nextInspection).getTime())
          .slice(0, 2);
      }
    } catch (error) {
      console.error('Error loading inspections:', error);
    }
    return [];
  };

  // Function to get upcoming lease renewals
  const getUpcomingLeaseRenewals = () => {
    try {
      const savedTenants = localStorage.getItem('pms-tenants');
      if (savedTenants) {
        const tenants = JSON.parse(savedTenants);
        const now = new Date();
        const ninetyDaysFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));
        
        return tenants
          .filter((tenant: any) => {
            const leaseEnd = new Date(tenant.leaseEnd);
            return leaseEnd >= now && leaseEnd <= ninetyDaysFromNow;
          })
          .sort((a: any, b: any) => new Date(a.leaseEnd).getTime() - new Date(b.leaseEnd).getTime())
          .slice(0, 2);
      }
    } catch (error) {
      console.error('Error loading lease renewals:', error);
    }
    return [];
  };

  // Function to get pending maintenance follow-ups
  const getPendingMaintenanceFollowUps = () => {
    try {
      const savedMaintenance = localStorage.getItem('pms-maintenance-requests');
      if (savedMaintenance) {
        const maintenance = JSON.parse(savedMaintenance);
        
        return maintenance
          .filter((request: any) => request.status === 'in_progress' || request.followUpRequired)
          .sort((a: any, b: any) => new Date(a.createdAt || a.date).getTime() - new Date(b.createdAt || b.date).getTime())
          .slice(0, 1);
      }
    } catch (error) {
      console.error('Error loading maintenance follow-ups:', error);
    }
    return [];
  };

  // Function to load and format upcoming tasks data
  const loadUpcomingTasksData = () => {
    try {
      const inspections = getUpcomingInspections();
      const leaseRenewals = getUpcomingLeaseRenewals();
      const maintenanceFollowUps = getPendingMaintenanceFollowUps();

      const tasks: any[] = [];

      // Add upcoming inspections
      inspections.forEach((inspection: any) => {
        if (inspection && (inspection.scheduledDate || inspection.nextInspection)) {
          try {
            const scheduledDate = new Date(inspection.scheduledDate || inspection.nextInspection);
            if (!isNaN(scheduledDate.getTime())) {
              const daysUntil = Math.ceil((scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              tasks.push({
                task: `${inspection.type || 'Property'} inspection`,
                property: inspection.property || 'Property',
                date: daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`,
                priority: inspection.priority || 'medium',
                icon: Eye,
                color: 'text-gray-600',
                bgColor: 'bg-gray-50'
              });
            }
          } catch (dateError) {
            console.error('Error processing inspection date:', dateError);
          }
        }
      });

      // Add lease renewal reminders
      leaseRenewals.forEach((tenant: any) => {
        if (tenant && tenant.leaseEnd) {
          try {
            const leaseEnd = new Date(tenant.leaseEnd);
            if (!isNaN(leaseEnd.getTime())) {
              const daysUntil = Math.ceil((leaseEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              tasks.push({
                task: 'Lease renewal reminder',
                tenant: tenant.name || 'Tenant',
                date: daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`,
                priority: daysUntil <= 30 ? 'high' : 'medium',
                icon: Calendar,
                color: 'text-gray-600',
                bgColor: 'bg-gray-50'
              });
            }
          } catch (dateError) {
            console.error('Error processing lease end date:', dateError);
          }
        }
      });

      // Add maintenance follow-ups
      maintenanceFollowUps.forEach((request: any) => {
        if (request) {
          tasks.push({
            task: 'Maintenance follow-up',
            property: request.property || 'Property',
            date: 'Follow-up required',
            priority: (request.urgencyScore && request.urgencyScore > 7) ? 'high' : 'medium',
            icon: Wrench,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
          });
        }
      });

      // Sort by priority and take the most important 3
      const sortedTasks = tasks
        .sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
        })
        .slice(0, 3);

      setUpcomingTasksData(sortedTasks);
    } catch (error) {
      console.error('Error loading upcoming tasks data:', error);
      setUpcomingTasksData([]);
    }
  };

  // Load dashboard data on component mount
  useEffect(() => {
    const loadDashboardData = () => {
      const totalProperties = getTotalProperties();
      const activeTenants = getActiveTenants();
      const monthlyRevenue = getMonthlyRevenue();
      const occupancyRate = getOccupancyRate();
      const averageRentPerProperty = getAverageRentPerProperty();
      const totalPropertyValue = getTotalPropertyValue();

      setDashboardStats({
        totalProperties,
        activeTenants,
        monthlyRevenue,
        occupancyRate,
        averageRentPerProperty,
        totalPropertyValue
      });

      // Load recent activity data
      loadRecentActivityData();

      // Load upcoming tasks data
      loadUpcomingTasksData();
    };

    loadDashboardData();
  }, []);

  // Refresh data when component comes into focus (user navigates back)
  useEffect(() => {
    const handleFocus = () => {
      refreshDashboardData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Function to refresh dashboard data
  const refreshDashboardData = () => {
    const totalProperties = getTotalProperties();
    const activeTenants = getActiveTenants();
    const monthlyRevenue = getMonthlyRevenue();
    const occupancyRate = getOccupancyRate();
    const averageRentPerProperty = getAverageRentPerProperty();
    const totalPropertyValue = getTotalPropertyValue();

    setDashboardStats({
      totalProperties,
      activeTenants,
      monthlyRevenue,
      occupancyRate,
      averageRentPerProperty,
      totalPropertyValue
    });

    // Refresh recent activity data
    loadRecentActivityData();

    // Refresh upcoming tasks data
    loadUpcomingTasksData();

    toast({
      title: "Dashboard refreshed",
      description: "All data has been updated with the latest information.",
    });
  };

  // Redirect admin users to admin dashboard
  useEffect(() => {
    console.log('Dashboard: Profile loaded:', profile);
    console.log('Dashboard: User role:', profile?.role);
    console.log('Dashboard: Should redirect:', profile?.role === 'admin');
    console.log('Dashboard: Current pathname:', window.location.pathname);
    
    if (profile?.role === 'admin') {
      console.log('Dashboard: Redirecting to admin dashboard...');
      navigate('/admin-dashboard', { replace: true });
    }
  }, [profile?.role, navigate]);

  const stats = [
    {
      title: 'Total Properties',
      value: dashboardStats.totalProperties.toString(),
      change: 'Properties managed',
      trend: 'up',
      icon: Building2,
      progress: Math.min(dashboardStats.totalProperties * 10, 100),
      detail: `${dashboardStats.totalProperties} properties in portfolio`
    },
    {
      title: 'Active Tenants',
      value: dashboardStats.activeTenants.toString(),
      change: 'Currently active',
      trend: 'up',
      icon: Users,
      progress: Math.min(dashboardStats.activeTenants * 3, 100),
      detail: `${dashboardStats.activeTenants} active tenants`
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(dashboardStats.monthlyRevenue),
      change: 'This month',
      trend: 'up',
      icon: DollarSign,
      progress: Math.min((dashboardStats.monthlyRevenue / 50000) * 100, 100),
      detail: `Revenue for ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    },
    {
      title: 'Occupancy Rate',
      value: `${dashboardStats.occupancyRate}%`,
      change: 'Current rate',
      trend: 'up',
      icon: TrendingUp,
      progress: dashboardStats.occupancyRate,
      detail: `${dashboardStats.occupancyRate}% of units occupied`
    }
  ];



  // Use dynamic upcoming tasks data instead of hardcoded
  const upcomingTasks = upcomingTasksData.length > 0 ? upcomingTasksData : [
    {
      task: 'No upcoming tasks',
      property: 'System',
      date: 'All caught up!',
      priority: 'low',
      icon: CheckCircle,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100'
    }
  ];

  // Quick action handlers
  const handleAddProperty = () => {
    navigate('/properties');
    toast({
      title: "Redirecting to Properties",
      description: "You can add a new property from the Properties page.",
    });
  };

  const handleAddTenant = () => {
    navigate('/tenants');
    toast({
      title: "Redirecting to Tenants",
      description: "You can add a new tenant from the Tenants page.",
    });
  };

  const handleRecordPayment = () => {
    navigate('/rent-collection');
    toast({
      title: "Redirecting to Rent Collection",
      description: "You can record payments from the Rent Collection page.",
    });
  };

  const handleScheduleInspection = () => {
    navigate('/inspections');
    toast({
      title: "Redirecting to Property Inspections",
      description: "You can schedule inspections from the Inspections page.",
    });
  };

  const quickActions = [
    {
      title: 'Add Property',
      icon: Building2,
      description: 'List new property',
      onClick: handleAddProperty
    },
    {
      title: 'Add Tenant',
      icon: Users,
      description: 'Register new tenant',
      onClick: handleAddTenant
    },
    {
      title: 'Record Payment',
      icon: DollarSign,
      description: 'Log rent payment',
      onClick: handleRecordPayment
    },
    {
      title: 'Schedule Inspection',
      icon: Eye,
      description: 'Book property review',
      onClick: handleScheduleInspection
    }
  ];

  const performanceMetrics = [
    {
      label: 'Collection Rate',
      value: `${Math.round((dashboardStats.activeTenants / Math.max(dashboardStats.totalProperties, 1)) * 100)}%`,
      trend: 'up',
      period: 'rent collection rate'
    },
    {
      label: 'Avg Rent per Unit',
      value: dashboardStats.totalProperties > 0 ? formatCurrency(Math.round(dashboardStats.monthlyRevenue / Math.max(dashboardStats.totalProperties, 1))) : formatCurrency(0),
      trend: 'up',
      period: 'per property'
    },
    {
      label: 'Units Available',
      value: `${Math.max(dashboardStats.totalProperties - dashboardStats.activeTenants, 0)}`,
      trend: 'down',
      period: 'vacant units'
    },
    {
      label: 'Revenue per Tenant',
      value: dashboardStats.activeTenants > 0 ? formatCurrency(Math.round(dashboardStats.monthlyRevenue / Math.max(dashboardStats.activeTenants, 1))) : formatCurrency(0),
      trend: 'up',
      period: 'monthly average'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'review':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'medium':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 p-1">

      
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Welcome back, {profile?.first_name || 'Owner'}!
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Here's what's happening with your properties today. Your portfolio is performing excellently with a 94% occupancy rate and growing revenue.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">All systems operational</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              {/* Admin Test Button */}
              {profile?.role === 'admin' && (
                <Button 
                  onClick={() => navigate('/admin-dashboard')}
                >
                  Go to Admin Dashboard
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={refreshDashboardData}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={handleAddProperty}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-light text-gray-600">
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extralight text-black">{stat.value}</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-gray-600 mr-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-gray-600 mr-2" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
                <div className="text-xs text-gray-500">{stat.detail}</div>
                <Progress value={stat.progress} className="h-2 [&>div]:bg-black" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modern Minimal Performance Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-3xl font-extralight text-black mb-2">{metric.value}</div>
            <div className="text-sm font-light text-gray-600 mb-1">{metric.label}</div>
            <div className="text-xs font-light text-gray-400">{metric.period}</div>
            <div className="flex items-center justify-center mt-3">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-gray-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-gray-600" />
              )}
            </div>
          </div>
        ))}
        {/* Additional useful metric */}
        <div className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-3xl font-extralight text-black mb-2">
            {dashboardStats.totalProperties > 0 ? Math.round((dashboardStats.activeTenants / dashboardStats.totalProperties) * 100) : 0}%
          </div>
          <div className="text-sm font-light text-gray-600 mb-1">Tenant Coverage</div>
          <div className="text-xs font-light text-gray-400">properties with tenants</div>
          <div className="flex items-center justify-center mt-3">
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Modern Minimal Recent Activity */}
        <Card className="lg:col-span-2 border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </div>
              Recent Activity
              <Badge variant="secondary" className="ml-auto font-light">{recentActivityData.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivityData.length > 0 ? (
                recentActivityData.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className={`p-2 rounded-lg ${activity.bgColor} ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-light text-black">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{activity.property}</span>
                      </div>
                      {activity.amount && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-600">{activity.amount}</span>
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">
                            Payment
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                                          <Badge className={getStatusColor(activity.status)}>
                      {activity.status ? activity.status.charAt(0).toUpperCase() + activity.status.slice(1) : 'Info'}
                    </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-8 text-center">
                  <div className="space-y-3">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">No recent activity</p>
                      <p className="text-xs text-gray-400">Activities will appear here as they happen</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/30">
              <Button variant="ghost" className="w-full text-gray-600 hover:text-black hover:bg-gray-50 font-light">
                View All Activity
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modern Minimal Upcoming Tasks */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              Upcoming Tasks
              <Badge variant="secondary" className="ml-auto font-light">{upcomingTasksData.length} pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingTasksData.length > 0 ? (
                upcomingTasksData.map((task, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${task.bgColor} ${task.color}`}>
                        <task.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-light text-black">{task.task}</p>
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Low'}
                          </Badge>
                        </div>
                        {task.property && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Building2 className="h-3 w-3" />
                            <span>{task.property}</span>
                          </div>
                        )}
                        {task.tenant && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users className="h-3 w-3" />
                            <span>{task.tenant}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-8 text-center">
                  <div className="space-y-3">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">No upcoming tasks</p>
                      <p className="text-xs text-gray-400">You're all caught up!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/30">
              <Button variant="ghost" className="w-full text-gray-600 hover:text-black hover:bg-gray-50 font-light">
                View All Tasks
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-3 text-lg font-light">
            <div className="p-2 rounded-lg bg-gray-100">
              <Zap className="h-5 w-5 text-gray-600" />
            </div>
            Quick Actions
            <span className="text-sm font-light text-gray-500 ml-auto">Frequently used tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={action.onClick}
                className="h-24 flex-col gap-3 bg-black hover:bg-gray-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 rounded-2xl font-light cursor-pointer"
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-light text-sm">{action.title}</div>
                  <div className="text-xs opacity-90 font-light">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modern Minimal Additional Dashboard Widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Property Overview */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Home className="h-5 w-5 text-gray-600" />
              </div>
              Property Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Total Properties</span>
                <span className="font-light">{dashboardStats.totalProperties} properties</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Total Value</span>
                <span className="font-light text-gray-600">{formatCurrency(dashboardStats.totalPropertyValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Avg Rent/Property</span>
                <span className="font-light text-gray-600">{formatCurrency(dashboardStats.averageRentPerProperty)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Occupancy Rate</span>
                <span className="font-light">{dashboardStats.occupancyRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-light text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">API Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-light text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-light text-gray-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Last Backup</span>
                <span className="text-sm font-light text-gray-600">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
