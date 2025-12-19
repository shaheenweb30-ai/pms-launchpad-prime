import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Building2,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Shield,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  Star,
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
  PiggyBank,
  Wallet,
  Coins,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  MessageSquare,
  Bell,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  property: string;
  unit: string;
  tenant: string;
  assignedDate: string;
  dueDate: string;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
}

interface WorkHistory {
  id: string;
  taskId: string;
  taskTitle: string;
  completedDate: string;
  hoursWorked: number;
  cost: number;
  rating: number;
  feedback?: string;
}

const VendorDashboard = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const { toast } = useToast();
  const { navigateTo } = useLanguageNavigation();

  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Load vendor data from localStorage
  useEffect(() => {
    loadVendorData();
  }, []);

  const loadVendorData = () => {
    try {
      // Load maintenance tasks
      const savedTasks = localStorage.getItem('pms-maintenance-tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        setMaintenanceTasks(tasks);
      } else {
        // Create default tasks if none exist
        const defaultTasks: MaintenanceTask[] = [
          {
            id: 'mt-001',
            title: 'Fix Leaky Faucet',
            description: 'Kitchen sink faucet needs repair',
            status: 'pending',
            priority: 'medium',
            category: 'plumbing',
            property: 'Downtown Residences',
            unit: '5B',
            tenant: 'John Doe',
            assignedDate: '2025-01-15',
            dueDate: '2025-01-17',
            estimatedCost: 150,
            notes: 'Tenant available after 5 PM'
          },
          {
            id: 'mt-002',
            title: 'HVAC Maintenance',
            description: 'Quarterly HVAC system check',
            status: 'in-progress',
            priority: 'high',
            category: 'hvac',
            property: 'Sunset Apartments',
            unit: '3A',
            tenant: 'Jane Smith',
            assignedDate: '2025-01-14',
            dueDate: '2025-01-16',
            estimatedCost: 300,
            actualCost: 280,
            notes: 'Filter replacement needed'
          },
          {
            id: 'mt-003',
            title: 'Electrical Outlet Repair',
            description: 'Bedroom outlet not working',
            status: 'completed',
            priority: 'urgent',
            category: 'electrical',
            property: 'Downtown Residences',
            unit: '2C',
            tenant: 'Mike Johnson',
            assignedDate: '2025-01-13',
            dueDate: '2025-01-14',
            estimatedCost: 200,
            actualCost: 180,
            notes: 'Wiring issue resolved'
          }
        ];
        setMaintenanceTasks(defaultTasks);
        localStorage.setItem('pms-maintenance-tasks', JSON.stringify(defaultTasks));
      }

      // Load work history
      const savedHistory = localStorage.getItem('pms-work-history');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setWorkHistory(history);
      } else {
        // Create default work history
        const defaultHistory: WorkHistory[] = [
          {
            id: 'wh-001',
            taskId: 'mt-003',
            taskTitle: 'Electrical Outlet Repair',
            completedDate: '2025-01-14',
            hoursWorked: 2,
            cost: 180,
            rating: 5,
            feedback: 'Excellent work, very professional'
          },
          {
            id: 'wh-002',
            taskId: 'mt-004',
            taskTitle: 'Plumbing Repair',
            completedDate: '2025-01-12',
            hoursWorked: 1.5,
            cost: 120,
            rating: 4,
            feedback: 'Quick and efficient service'
          }
        ];
        setWorkHistory(defaultHistory);
        localStorage.setItem('pms-work-history', JSON.stringify(defaultHistory));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading vendor data:', error);
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalTasks = maintenanceTasks.length;
  const pendingTasks = maintenanceTasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = maintenanceTasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = maintenanceTasks.filter(task => task.status === 'completed').length;
  const urgentTasks = maintenanceTasks.filter(task => task.priority === 'urgent').length;

  const totalEarnings = workHistory.reduce((sum, work) => sum + work.cost, 0);
  const totalHours = workHistory.reduce((sum, work) => sum + work.hoursWorked, 0);
  const averageRating = workHistory.length > 0 
    ? (workHistory.reduce((sum, work) => sum + work.rating, 0) / workHistory.length).toFixed(1)
    : '0.0';

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Activity },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} font-light`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', icon: Info },
      medium: { color: 'bg-blue-100 text-blue-800', icon: Clock4 },
      high: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      urgent: { color: 'bg-red-100 text-red-800', icon: Zap }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} font-light`}>
        <Icon className="h-3 w-3 mr-1" />
        {priority}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600 font-light">Loading vendor dashboard...</p>
            </div>
          </div>
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
                Welcome back, {profile?.name || user?.email || 'Vendor'}!
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Here's your professional overview of maintenance tasks and work performance.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Maintenance Professional</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>{totalTasks} total tasks assigned</span>
                </div>
                {urgentTasks > 0 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <Bell className="h-4 w-4" />
                    <span>{urgentTasks} urgent tasks</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/maintenance-tasks')}
              >
                <Wrench className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigateTo('/vendor-chat')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigateTo('/vendor-payment-history')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Payment History
              </Button>
              <Button 
                onClick={() => navigateTo('/work-history')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Work History
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
              Total Tasks
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{totalTasks}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">{completedTasks} completed</span>
              </div>
              <div className="text-xs text-gray-500">All assigned tasks</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Active Tasks
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Activity className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{pendingTasks + inProgressTasks}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <AlertTriangle className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">{urgentTasks} urgent</span>
              </div>
              <div className="text-xs text-gray-500">Currently in progress</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Total Earnings
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <DollarSign className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{formatCurrency(totalEarnings)}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">{totalHours}h worked</span>
              </div>
              <div className="text-xs text-gray-500">Lifetime earnings</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Average Rating
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Star className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{averageRating}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">out of 5 stars</span>
              </div>
              <div className="text-xs text-gray-500">Customer satisfaction</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <Card className="border-0 shadow-sm rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-light">
              <Wrench className="h-5 w-5" />
              Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {maintenanceTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-light text-black">{task.title}</h4>
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                    <p className="text-sm text-gray-600 font-light mb-1">{task.property} - Unit {task.unit}</p>
                    <p className="text-sm text-gray-500 font-light">Due: {task.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-gray-600">{formatCurrency(task.estimatedCost)}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/maintenance-tasks')}
                      className="text-xs font-light"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full justify-center font-light"
                onClick={() => navigate('/maintenance-tasks')}
              >
                View All Tasks
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Work */}
        <Card className="border-0 shadow-sm rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-light">
              <Clock className="h-5 w-5" />
              Recent Work
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {workHistory.slice(0, 5).map((work) => (
                <div key={work.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-light text-black mb-1">{work.taskTitle}</h4>
                    <p className="text-sm text-gray-600 font-light mb-1">Completed: {work.completedDate}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < work.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-light">{work.rating}/5</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-gray-600">{formatCurrency(work.cost)}</p>
                    <p className="text-xs text-gray-500 font-light">{work.hoursWorked}h</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full justify-center font-light"
                onClick={() => navigateTo('/work-history')}
              >
                View Work History
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-light">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Button 
              variant="outline" 
              className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
              onClick={() => navigate('/maintenance-tasks')}
            >
              <Wrench className="h-4 w-4 mr-3" />
              View Tasks
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
              onClick={() => navigateTo('/work-history')}
            >
              <Clock className="h-4 w-4 mr-3" />
              Work History
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
              onClick={() => navigateTo('/vendor-chat')}
            >
              <MessageSquare className="h-4 w-4 mr-3" />
              Messages
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
              onClick={() => navigateTo('/vendor-payment-history')}
            >
              <DollarSign className="h-4 w-4 mr-3" />
              Payment History
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-light"
              onClick={() => navigateTo('/settings')}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
