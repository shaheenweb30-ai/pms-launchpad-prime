import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Home,
  FileText,
  CreditCard,
  Wrench,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Building2,
  Users,
  MessageSquare,
  Bell,
  Download,
  Eye,
  Plus,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Shield,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Share,
  RefreshCw,
  Minus,
  Percent,
  Car,
  Wifi,
  UtensilsCrossed,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  Archive,
  Trash2,
  Settings,
  HelpCircle,
  Star,
  PiggyBank,
  Wallet,
  Coins,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  FileText as FileTextIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';

const TenantDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const [tenantData, setTenantData] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  // Load tenant data from localStorage on component mount
  useEffect(() => {
    const loadTenantData = () => {
      try {
        // Load tenant profile
        const savedTenants = localStorage.getItem('pms-tenants');
        if (savedTenants) {
          const tenants = JSON.parse(savedTenants);
          const currentTenant = tenants.find((t: any) => t.email === user?.email);
          if (currentTenant) {
            setTenantData(currentTenant);
          }
        }

        // Load maintenance requests
        const savedMaintenance = localStorage.getItem('pms-maintenance-requests');
        if (savedMaintenance) {
          const maintenance = JSON.parse(savedMaintenance);
          const tenantMaintenance = maintenance.filter((m: any) => 
            m.tenant === profile?.first_name + ' ' + profile?.last_name
          );
          setMaintenanceRequests(tenantMaintenance);
        }

        // Load payment history
        const savedPayments = localStorage.getItem('pms-rent-payments');
        if (savedPayments) {
          const payments = JSON.parse(savedPayments);
          const tenantPayments = payments.filter((p: any) => 
            p.tenant === profile?.first_name + ' ' + profile?.last_name
          );
          setPaymentHistory(tenantPayments);
        }

        // Generate recent activities
        const activities = [];
        if (tenantMaintenance?.length > 0) {
          activities.push({
            type: 'maintenance',
            title: 'Maintenance Request Submitted',
            description: 'Your request has been received and is being reviewed',
            timestamp: new Date(),
            icon: <Wrench className="h-4 w-4" />
          });
        }
        if (tenantPayments?.length > 0) {
          activities.push({
            type: 'payment',
            title: 'Payment Received',
            description: 'Your rent payment has been processed successfully',
            timestamp: new Date(),
            icon: <CreditCard className="h-4 w-4" />
          });
        }
        setRecentActivities(activities);
      } catch (error) {
        console.error('Error loading tenant data:', error);
      }
    };

    loadTenantData();
  }, [user, profile]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (!tenantData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Loading tenant information...</h3>
          <p className="text-gray-500">Please wait while we load your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-8 border border-blue-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent tracking-tight">
                Welcome back, {profile?.first_name}!
              </h1>
              <p className="text-lg text-blue-600 max-w-2xl font-light leading-relaxed">
                Here's your personal overview of your rental property and recent activities.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{tenantData.property} - Unit {tenantData.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-500">
                  <Calendar className="h-4 w-4" />
                  <span>Lease expires: {tenantData.leaseEndDate || 'Not specified'}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-light">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-light">
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <Home className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{tenantData.property}</p>
                <p className="text-sm text-gray-600 font-light">Current Property</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Building2 className="h-3 w-3" />
                  Unit {tenantData.unit}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-green-50 group-hover:bg-green-100 transition-colors duration-200">
                <CreditCard className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{formatCurrency(tenantData.monthlyRent || 0)}</p>
                <p className="text-sm text-gray-600 font-light">Monthly Rent</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <Calendar className="h-3 w-3" />
                  Due monthly
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-50 group-hover:bg-orange-100 transition-colors duration-200">
                <Wrench className="h-7 w-7 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{maintenanceRequests.filter(r => r.status === 'pending').length}</p>
                <p className="text-sm text-gray-600 font-light">Active Requests</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Awaiting response
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-50 group-hover:bg-purple-100 transition-colors duration-200">
                <FileText className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{paymentHistory.length}</p>
                <p className="text-sm text-gray-600 font-light">Payment Records</p>
                <div className="flex items-center gap-1 text-xs text-purple-600 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Payment history
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-xl font-light text-black">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-200">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-light">No recent activities</p>
                  <p className="text-sm">Your activities will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-xl font-light text-black">
              <Zap className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light">
                <Wrench className="h-4 w-4 mr-3" />
                Submit Maintenance Request
              </Button>
              <Button variant="outline" className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light">
                <CreditCard className="h-4 w-4 mr-3" />
                Make Rent Payment
              </Button>
              <Button variant="outline" className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light">
                <FileText className="h-4 w-4 mr-3" />
                View Lease Documents
              </Button>
              <Button variant="outline" className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light">
                <MessageSquare className="h-4 w-4 mr-3" />
                Contact Property Owner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Requests Overview */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-2 text-xl font-light text-black">
            <Wrench className="h-5 w-5 text-orange-600" />
            Recent Maintenance Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {maintenanceRequests.length > 0 ? (
              maintenanceRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                  <div className="space-y-1">
                    <div className="font-semibold text-black">{request.title}</div>
                    <div className="text-sm text-gray-600">
                      {request.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Submitted: {new Date(request.dateReported).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-light text-gray-600">No maintenance requests</p>
                <p className="text-sm text-gray-500">Submit a request when you need maintenance</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDashboard;
