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
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';

const Dashboard = () => {
  const { profile } = useAuth();
  const { formatCurrency } = useCurrency();

  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      change: '+2 this month',
      trend: 'up',
      icon: Building2,
      color: 'blue',
      progress: 85,
      detail: '8 residential, 4 commercial'
    },
    {
      title: 'Active Tenants',
      value: '28',
      change: '+3 this month',
      trend: 'up',
      icon: Users,
      color: 'green',
      progress: 94,
      detail: '96% completion rate'
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(24580),
      change: '+12% vs last month',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      progress: 78,
      detail: `Target: ${formatCurrency(30000)}`
    },
    {
      title: 'Occupancy Rate',
      value: '94%',
      change: '+2% vs last month',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      progress: 94,
      detail: '3 units available'
    }
  ];

  const recentActivity = [
    {
      type: 'payment',
      message: 'Rent payment received from Sarah Johnson',
      amount: formatCurrency(1200),
      time: '2 hours ago',
      status: 'success',
      property: 'Oak Street Apartments #4B',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'maintenance',
      message: 'Maintenance request - Kitchen faucet leak',
      property: 'Oak Street Apartments #4B',
      time: '4 hours ago',
      status: 'pending',
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      type: 'lease',
      message: 'Lease renewal signed by Mike Davis',
      property: 'Downtown Loft #12',
      time: '1 day ago',
      status: 'success',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'application',
      message: 'New rental application received',
      property: 'Riverside Complex #8A',
      time: '2 days ago',
      status: 'review',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const upcomingTasks = [
    {
      task: 'Property inspection',
      property: 'Oak Street Apartments',
      date: 'Tomorrow, 10:00 AM',
      priority: 'high',
      icon: Eye,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      task: 'Lease renewal reminder',
      tenant: 'Emma Wilson',
      date: 'Dec 15, 2024',
      priority: 'medium',
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      task: 'Maintenance follow-up',
      property: 'Downtown Loft #5',
      date: 'Dec 18, 2024',
      priority: 'low',
      icon: Wrench,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const quickActions = [
    {
      title: 'Add Property',
      icon: Building2,
      description: 'List new property',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Add Tenant',
      icon: Users,
      description: 'Register new tenant',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Record Payment',
      icon: DollarSign,
      description: 'Log rent payment',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
    },
    {
      title: 'Schedule Inspection',
      icon: Eye,
      description: 'Book property review',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Revenue Growth',
      value: '+12.5%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      label: 'Expense Reduction',
      value: '-8.2%',
      trend: 'down',
      period: 'vs last month'
    },
    {
      label: 'Tenant Retention',
      value: '96%',
      trend: 'up',
      period: 'current rate'
    },
    {
      label: 'Maintenance Response',
      value: '2.3 days',
      trend: 'down',
      period: 'avg response time'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Welcome back, {profile?.first_name || 'Owner'}!
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Here's what's happening with your properties today. Your portfolio is performing excellently with a 94% occupancy rate and growing revenue.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">All systems operational</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
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
          <Card key={index} className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors duration-200`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-light text-slate-900">{stat.value}</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-2" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
                <div className="text-xs text-gray-500">{stat.detail}</div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modern Minimal Performance Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-2xl font-light text-slate-900 mb-1">{metric.value}</div>
            <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
            <div className="text-xs text-slate-500">{metric.period}</div>
            <div className="flex items-center justify-center mt-2">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Modern Minimal Recent Activity */}
        <Card className="lg:col-span-2 border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <Bell className="h-5 w-5 text-slate-600" />
              </div>
              Recent Activity
              <Badge variant="secondary" className="ml-auto">28 items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-slate-50/50 transition-colors duration-200">
                  <div className={`p-2 rounded-lg ${activity.bgColor} ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      <span>{activity.property}</span>
                    </div>
                    {activity.amount && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-emerald-600">{activity.amount}</span>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                          Payment
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-slate-500">{activity.time}</span>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/30">
              <Button variant="ghost" className="w-full text-slate-600 hover:text-slate-700 hover:bg-slate-50">
                View All Activity
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modern Minimal Upcoming Tasks */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <Calendar className="h-5 w-5 text-slate-600" />
              </div>
              Upcoming Tasks
              <Badge variant="secondary" className="ml-auto">3 pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${task.bgColor} ${task.color}`}>
                      <task.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                      </div>
                      {task.property && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Building2 className="h-3 w-3" />
                          <span>{task.property}</span>
                        </div>
                      )}
                      {task.tenant && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
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
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/30">
              <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All Tasks
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 rounded-lg bg-slate-100">
              <Zap className="h-5 w-5 text-slate-600" />
            </div>
            Quick Actions
            <span className="text-sm font-normal text-slate-500 ml-auto">Frequently used tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex-col gap-3 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modern Minimal Additional Dashboard Widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Property Overview */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <Home className="h-5 w-5 text-slate-600" />
              </div>
              Property Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Residential Properties</span>
                <span className="font-semibold">8 units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Commercial Properties</span>
                <span className="font-semibold">4 units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Value</span>
                                    <span className="font-semibold text-emerald-600">{formatCurrency(2400000)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Average Rent</span>
                                    <span className="font-semibold">{formatCurrency(1850)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <Shield className="h-5 w-5 text-slate-600" />
              </div>
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-emerald-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-emerald-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-emerald-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Last Backup</span>
                <span className="text-sm text-slate-600">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
