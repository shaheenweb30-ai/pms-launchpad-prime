import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TenantDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tenantData, setTenantData] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  
  // Submit request modal state
  const [showSubmitRequestModal, setShowSubmitRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  // Load tenant data from localStorage on component mount
  useEffect(() => {
    const loadTenantData = () => {
      try {
        // Load tenant profile
        const savedTenants = localStorage.getItem('pms-tenants');
        let currentTenant = null;
        
        if (savedTenants) {
          const tenants = JSON.parse(savedTenants);
          currentTenant = tenants.find((t: any) => t.email === user?.email);
        }
        
        // If no tenant found in localStorage, create default tenant data
        if (!currentTenant && user?.email) {
          currentTenant = {
            id: user.id,
            email: user.email,
            name: profile?.first_name + ' ' + profile?.last_name,
            property: 'Downtown Residences',
            unit: '5B',
            monthlyRent: 1200,
            leaseStartDate: '2025-01-01',
            leaseEndDate: '2025-12-31',
            status: 'active',
            phone: '+1 (555) 123-4567',
            emergencyContact: '+1 (555) 987-6543',
            moveInDate: '2025-01-01',
            deposit: 2400,
            petDeposit: 0,
            parkingSpaces: 1,
            utilities: 'Water included',
            lastUpdated: new Date().toISOString()
          };
          
          // Save the default tenant data to localStorage
          const existingTenants = savedTenants ? JSON.parse(savedTenants) : [];
          const updatedTenants = [...existingTenants, currentTenant];
          localStorage.setItem('pms-tenants', JSON.stringify(updatedTenants));
        }
        
        if (currentTenant) {
          setTenantData(currentTenant);
        }

        // Load maintenance requests
        const savedMaintenance = localStorage.getItem('pms-maintenance-requests');
        let tenantMaintenance = [];
        
        if (savedMaintenance) {
          const maintenance = JSON.parse(savedMaintenance);
          tenantMaintenance = maintenance.filter((m: any) => 
            m.tenant === profile?.first_name + ' ' + profile?.last_name
          );
        }
        
        // If no maintenance requests found, create default ones
        if (tenantMaintenance.length === 0 && currentTenant) {
          tenantMaintenance = [
            {
              id: 'mr-001',
              title: 'Leaky Faucet',
              description: 'Kitchen sink faucet is dripping continuously',
              status: 'pending',
              priority: 'medium',
              dateReported: '2025-01-15',
              tenant: currentTenant.name,
              property: currentTenant.property,
              unit: currentTenant.unit
            }
          ];
          
          // Save default maintenance requests
          const existingMaintenance = savedMaintenance ? JSON.parse(savedMaintenance) : [];
          const updatedMaintenance = [...existingMaintenance, ...tenantMaintenance];
          localStorage.setItem('pms-maintenance-requests', JSON.stringify(updatedMaintenance));
        }
        
        setMaintenanceRequests(tenantMaintenance);

        // Load payment history
        const savedPayments = localStorage.getItem('pms-rent-payments');
        let tenantPayments = [];
        
        if (savedPayments) {
          const payments = JSON.parse(savedPayments);
          tenantPayments = payments.filter((p: any) => 
            p.tenant === profile?.first_name + ' ' + profile?.last_name
          );
        }
        
        // If no payment history found, create default ones
        if (tenantPayments.length === 0 && currentTenant) {
          tenantPayments = [
            {
              id: 'pmt-001',
              tenant: currentTenant.name,
              property: currentTenant.property,
              amount: currentTenant.monthlyRent,
              date: '2025-01-01',
              status: 'paid',
              method: 'Online Transfer',
              reference: 'TXN-001'
            },
            {
              id: 'pmt-002',
              tenant: currentTenant.name,
              property: currentTenant.property,
              amount: currentTenant.monthlyRent,
              date: '2025-02-01',
              status: 'paid',
              method: 'Online Transfer',
              reference: 'TXN-002'
            }
          ];
          
          // Save default payment history
          const existingPayments = savedPayments ? JSON.parse(savedPayments) : [];
          const updatedPayments = [...existingPayments, ...tenantPayments];
          localStorage.setItem('pms-rent-payments', JSON.stringify(updatedPayments));
        }
        
        setPaymentHistory(tenantPayments);

        // Generate recent activities
        const activities = [];
        
        // Add maintenance activities
        if (tenantMaintenance?.length > 0) {
          tenantMaintenance.forEach((request: any) => {
            activities.push({
              type: 'maintenance',
              title: `Maintenance Request: ${request.title}`,
              description: request.description,
              timestamp: new Date(request.dateReported),
              icon: <Wrench className="h-4 w-4" />
            });
          });
        }
        
        // Add payment activities
        if (tenantPayments?.length > 0) {
          tenantPayments.forEach((payment: any) => {
            activities.push({
              type: 'payment',
              title: 'Rent Payment Processed',
              description: `Payment of ${formatCurrency(payment.amount)} received`,
              timestamp: new Date(payment.date),
              icon: <CreditCard className="h-4 w-4" />
            });
          });
        }
        
        // Add lease activity
        if (currentTenant) {
          activities.push({
            type: 'lease',
            title: 'Lease Agreement Active',
            description: `Lease for ${currentTenant.property} Unit ${currentTenant.unit}`,
            timestamp: new Date(currentTenant.leaseStartDate),
            icon: <FileText className="h-4 w-4" />
          });
        }
        
        // Sort activities by timestamp (most recent first)
        activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        
        setRecentActivities(activities.slice(0, 4)); // Show only the 4 most recent
      } catch (error) {
        console.error('Error loading tenant data:', error);
      }
    };

    // Only load data if user and profile are available
    if (user && profile) {
      loadTenantData();
    }
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
          <p className="text-gray-500 mb-4">Please wait while we load your dashboard</p>
          {!user && (
            <p className="text-sm text-gray-400">Waiting for user authentication...</p>
          )}
          {user && !profile && (
            <p className="text-sm text-gray-400">Loading user profile...</p>
          )}
          {user && profile && (
            <p className="text-sm text-gray-400">Setting up your tenant dashboard...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Welcome back, {profile?.first_name}!
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Here's your personal overview of your rental property and recent activities.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{tenantData.property} - Unit {tenantData.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Lease expires: {tenantData.leaseEndDate || 'Not specified'}</span>
                </div>
                {maintenanceRequests.filter(r => r.status === 'pending').length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <Bell className="h-4 w-4" />
                    <span>{maintenanceRequests.filter(r => r.status === 'pending').length} pending requests</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/tenant-chat')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button 
                onClick={() => setShowSubmitRequestModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Current Property
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Home className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{tenantData.property}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Unit {tenantData.unit}</span>
              </div>
              <div className="text-xs text-gray-500">Your current residence</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Monthly Rent
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{formatCurrency(tenantData.monthlyRent || 0)}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Due monthly</span>
              </div>
              <div className="text-xs text-gray-500">Rent payment schedule</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Active Requests
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{maintenanceRequests.filter(r => r.status === 'pending').length}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Awaiting response</span>
              </div>
              <div className="text-xs text-gray-500">Maintenance requests</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Payment Records
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{paymentHistory.length}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Payment history</span>
              </div>
              <div className="text-xs text-gray-500">Completed payments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Modern Minimal Recent Activity */}
        <Card className="lg:col-span-2 border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Activity className="h-5 w-5 text-gray-600" />
              </div>
              Recent Activity
              <Badge variant="secondary" className="ml-auto font-light">{recentActivities.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-light text-black">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-8 text-center">
                  <div className="space-y-3">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">No recent activity</p>
                      <p className="text-xs text-gray-400">Activities will appear here as they happen</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/30">
              <Button 
                variant="ghost" 
                className="w-full text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                onClick={() => {
                  toast({
                    title: "Activity Feed",
                    description: "Viewing all recent activities and notifications.",
                  });
                }}
              >
                View All Activity
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

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
            <div className="grid gap-4">
              <Button 
                variant="outline" 
                className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
                onClick={() => navigate('/maintenance-requests')}
              >
                <Wrench className="h-4 w-4 mr-3" />
                Submit Maintenance Request
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
                onClick={() => navigate('/payment-history')}
              >
                <CreditCard className="h-4 w-4 mr-3" />
                Make Rent Payment
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
                onClick={() => navigate('/my-lease')}
              >
                <FileText className="h-4 w-4 mr-3" />
                View Lease Documents
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
                onClick={() => navigate('/tenant-chat')}
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Messages
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Maintenance Requests Overview */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-3 text-lg font-light">
            <div className="p-2 rounded-lg bg-gray-100">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
            Recent Maintenance Requests
            <Badge variant="secondary" className="ml-auto font-light">{maintenanceRequests.length} requests</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {maintenanceRequests.length > 0 ? (
              maintenanceRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-light text-black">{request.title}</p>
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {request.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{request.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Submitted: {new Date(request.dateReported).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                    onClick={() => navigate('/maintenance-requests')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <Wrench className="h-12 w-12 text-gray-300 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">No maintenance requests</p>
                    <p className="text-xs text-gray-400">Submit a request when you need maintenance</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            <Button 
              variant="ghost" 
              className="w-full text-gray-600 hover:text-black hover:bg-gray-50 font-light"
              onClick={() => navigate('/maintenance-requests')}
            >
              View All Requests
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Helpful Information Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Info className="h-5 w-5 text-gray-600" />
              </div>
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-light text-black">Submit maintenance requests early</p>
                  <p className="text-xs text-gray-500">Report issues as soon as you notice them for faster resolution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-light text-black">Keep payment records</p>
                  <p className="text-xs text-gray-500">Always save receipts and confirmation numbers for your rent payments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-light text-black">Contact your landlord</p>
                  <p className="text-xs text-gray-500">Use the contact feature for urgent matters or lease questions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-light text-black">Rent Due</p>
                    <p className="text-xs text-gray-500">1st of each month</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">Monthly</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-light text-black">Lease Renewal</p>
                    <p className="text-xs text-gray-500">60 days before expiry</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">Annual</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-light text-black">Property Inspection</p>
                    <p className="text-xs text-gray-500">Scheduled quarterly</p>
                  </div>
                </div>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">Quarterly</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Request Modal */}
      <Dialog open={showSubmitRequestModal} onOpenChange={setShowSubmitRequestModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Submit Maintenance Request
            </DialogTitle>
            <DialogDescription>
              Report a maintenance issue or request service for your unit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="request-title">Request Title</Label>
              <Input
                id="request-title"
                placeholder="Brief description of the issue"
                value={requestForm.title}
                onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={requestForm.category} onValueChange={(value) => setRequestForm({...requestForm, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC/Heating</SelectItem>
                  <SelectItem value="appliances">Appliances</SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                  <SelectItem value="general">General Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={requestForm.priority} onValueChange={(value) => setRequestForm({...requestForm, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Non-urgent</SelectItem>
                  <SelectItem value="medium">Medium - Standard</SelectItem>
                  <SelectItem value="high">High - Important</SelectItem>
                  <SelectItem value="urgent">Urgent - Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                value={requestForm.description}
                onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                rows={4}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Property:</strong> {tenantData?.property} - Unit {tenantData?.unit}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requested by:</strong> {tenantData?.name}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitRequestModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (requestForm.title && requestForm.description) {
                  // Create new maintenance request
                  const newRequest = {
                    id: `mr-${Date.now()}`,
                    title: requestForm.title,
                    description: requestForm.description,
                    status: 'pending',
                    priority: requestForm.priority,
                    category: requestForm.category,
                    dateReported: new Date().toISOString().split('T')[0],
                    tenant: tenantData?.name,
                    property: tenantData?.property,
                    unit: tenantData?.unit
                  };
                  
                  // Add to existing maintenance requests
                  const updatedRequests = [...maintenanceRequests, newRequest];
                  setMaintenanceRequests(updatedRequests);
                  
                  // Save to localStorage
                  const existingMaintenance = JSON.parse(localStorage.getItem('pms-maintenance-requests') || '[]');
                  const updatedMaintenance = [...existingMaintenance, newRequest];
                  localStorage.setItem('pms-maintenance-requests', JSON.stringify(updatedMaintenance));
                  
                  // Dispatch custom event to notify other components
                  window.dispatchEvent(new CustomEvent('maintenanceRequestAdded', { detail: newRequest }));
                  
                  toast({
                    title: "Request Submitted",
                    description: "Your maintenance request has been submitted successfully.",
                  });
                  
                  setShowSubmitRequestModal(false);
                  setRequestForm({ title: '', description: '', priority: 'medium', category: 'general' });
                } else {
                  toast({
                    title: "Missing Information",
                    description: "Please fill in both title and description fields.",
                    variant: "destructive"
                  });
                }
              }}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantDashboard;
