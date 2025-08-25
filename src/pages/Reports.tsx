import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Clock,
  FileText,
  PieChart,
  LineChart,
  DollarSign,
  Building2,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Share,
  MoreHorizontal,
  Target,
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  Home,
  Star,
  Settings,
  RefreshCw,
  Mail,
  Printer,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Percent,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  Timer,
  CheckCircle2,
  Clock4,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
  Archive,
  HelpCircle,
  TrendingUp2,
  TrendingDown2,
  PiggyBank,
  Wallet,
  Coins,
  Building,
  Car,
  Wifi,
  UtensilsCrossed,
  FileTextIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  EditIcon,
  CalendarIcon,
  ShieldIcon,
  SendIcon,
  BellIcon,
  CalculatorIcon,
  BarChart3Icon,
  PieChartIcon,
  Database,
  HardDrive,
  CloudIcon,
  FolderIcon,
  FileIcon,
  ImageIcon,
  VideoIcon,
  ArchiveIcon,
  DocumentIcon,
  PresentationIcon,
  SpreadsheetIcon,
  LinkIcon,
  LockIcon,
  UnlockIcon,
  KeyIcon,
  CertificateIcon,
  BadgeCheckIcon,
  VerifiedIcon,
  SecurityIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AnalyticsIcon,
  ReportIcon,
  ChartIcon,
  GraphIcon,
  StatsIcon,
  MetricsIcon
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('monthly');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Sample report data - in a real app, this would come from your backend
  const reports = [
    {
      id: 'RPT001',
      name: 'Monthly Financial Summary',
      category: 'financial',
      type: 'summary',
      property: 'All Properties',
      period: 'December 2024',
      createdDate: '2024-12-31',
      status: 'completed',
      format: 'PDF',
      size: 2.3,
      description: 'Comprehensive monthly financial performance report',
      metrics: {
        revenue: 125000,
        expenses: 45000,
        netIncome: 80000,
        occupancyRate: 94.5,
        collections: 98.2
      },
      charts: ['revenue_trend', 'expense_breakdown', 'occupancy_chart'],
      automated: true,
      schedule: 'monthly'
    },
    {
      id: 'RPT002',
      name: 'Property Performance Analysis',
      category: 'performance',
      type: 'analysis',
      property: '',
      period: 'Q4 2024',
      createdDate: '2024-12-30',
      status: 'completed',
      format: 'PDF',
      size: 4.1,
      description: 'Detailed analysis of property performance metrics',
      metrics: {
        revenue: 48000,
        expenses: 15000,
        netIncome: 33000,
        occupancyRate: 96.0,

      },
      charts: ['performance_trend', 'tenant_analysis', 'maintenance_costs'],
      automated: false,
      schedule: 'quarterly'
    },
    {
      id: 'RPT003',
      name: 'Occupancy & Vacancy Report',
      category: 'occupancy',
      type: 'operational',
      property: 'All Properties',
      period: 'December 2024',
      createdDate: '2024-12-29',
      status: 'completed',
      format: 'Excel',
      size: 1.8,
      description: 'Monthly occupancy rates and vacancy analysis',
      metrics: {
        totalUnits: 45,
        occupiedUnits: 42,
        vacantUnits: 3,
        occupancyRate: 93.3,
        avgVacancyDays: 12
      },
      charts: ['occupancy_trend', 'vacancy_analysis', 'unit_status'],
      automated: true,
      schedule: 'monthly'
    },
    {
      id: 'RPT004',
      name: 'Maintenance Cost Analysis',
      category: 'maintenance',
      type: 'analysis',
      property: '',
      period: 'November 2024',
      createdDate: '2024-12-01',
      status: 'completed',
      format: 'PDF',
      size: 3.5,
      description: 'Analysis of maintenance costs and trends',
      metrics: {
        totalCosts: 15600,
        emergencyRepairs: 4200,
        preventiveMaintenance: 8500,
        avgCostPerUnit: 347,
        completionRate: 94.2
      },
      charts: ['cost_breakdown', 'category_analysis', 'trend_comparison'],
      automated: false,
      schedule: 'as_needed'
    },
    {
      id: 'RPT005',
      name: 'Rental Income Statement',
      category: 'financial',
      type: 'statement',
      property: '',
      period: 'December 2024',
      createdDate: '2024-12-28',
      status: 'in_progress',
      format: 'PDF',
      size: 0,
      description: 'Monthly rental income and collection report',
      metrics: {
        expectedRent: 28000,
        collectedRent: 26800,
        outstandingRent: 1200,
        collectionRate: 95.7,
        lateFees: 240
      },
      charts: ['income_trend', 'collection_analysis', 'arrears_report'],
      automated: true,
      schedule: 'monthly'
    },
    {
      id: 'RPT006',
      name: 'Tax Preparation Summary',
      category: 'tax',
      type: 'summary',
      property: 'All Properties',
      period: 'Year 2024',
      createdDate: '2024-12-15',
      status: 'draft',
      format: 'Excel',
      size: 0,
      description: 'Annual tax preparation and documentation report',
      metrics: {
        totalIncome: 1450000,
        totalExpenses: 520000,
        netIncome: 930000,
        depreciation: 185000,
        taxableIncome: 745000
      },
      charts: ['income_summary', 'expense_categories', 'depreciation_schedule'],
      automated: false,
      schedule: 'annually'
    }
  ];

  const properties: string[] = [];

  const reportTemplates = [
    {
      id: 'TPL001',
      name: 'Financial Performance Dashboard',
      category: 'financial',
      description: 'Monthly financial metrics and KPI tracking',
      estimatedTime: '5 minutes'
    },
    {
      id: 'TPL002',
      name: 'Property Analysis Report',
      category: 'performance',
      description: 'Comprehensive property performance analysis',
      estimatedTime: '10 minutes'
    },
    {
      id: 'TPL003',
      name: 'Occupancy Report',
      category: 'occupancy',
      description: 'Vacancy and occupancy rate analysis',
      estimatedTime: '3 minutes'
    },
    {
      id: 'TPL004',
      name: 'Maintenance Summary',
      category: 'maintenance',
      description: 'Maintenance costs and work order analysis',
      estimatedTime: '7 minutes'
    },
    {
      id: 'TPL005',
      name: 'Tax Documentation',
      category: 'tax',
      description: 'Annual tax preparation and compliance report',
      estimatedTime: '15 minutes'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'performance':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'occupancy':
        return <Home className="h-4 w-4 text-purple-600" />;
      case 'maintenance':
        return <Settings className="h-4 w-4 text-orange-600" />;
      case 'tax':
        return <FileText className="h-4 w-4 text-red-600" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'performance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'occupancy':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'tax':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB === 0) return 'N/A';
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const getScheduleColor = (schedule: string) => {
    switch (schedule) {
      case 'daily': return 'text-green-600';
      case 'weekly': return 'text-blue-600';
      case 'monthly': return 'text-purple-600';
      case 'quarterly': return 'text-orange-600';
      case 'annually': return 'text-red-600';
      case 'as_needed': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getScheduleBadge = (schedule: string) => {
    switch (schedule) {
      case 'daily': return 'bg-green-100 text-green-800 border-green-200';
      case 'weekly': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'monthly': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'quarterly': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'annually': return 'bg-red-100 text-red-800 border-red-200';
      case 'as_needed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'summary': return <BarChart3 className="h-4 w-4 text-blue-600" />;
      case 'analysis': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'operational': return <Activity className="h-4 w-4 text-purple-600" />;
      case 'statement': return <FileText className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-600" />;
      case 'excel': return <FileText className="h-4 w-4 text-green-600" />;
      case 'csv': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'word': return <FileText className="h-4 w-4 text-blue-800" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-emerald-600';
    if (progress >= 70) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesProperty = propertyFilter === 'all' || report.property === propertyFilter;
    
    return matchesSearch && matchesCategory && matchesProperty;
  });

  const completedReports = reports.filter(r => r.status === 'completed').length;
  const inProgressReports = reports.filter(r => r.status === 'in_progress').length;
  const automatedReports = reports.filter(r => r.automated).length;
  const totalReports = reports.length;
  
  const avgFileSize = reports.filter(r => r.size > 0).reduce((sum, r) => sum + r.size, 0) / Math.max(reports.filter(r => r.size > 0).length, 1);
  const totalFileSize = reports.reduce((sum, r) => sum + r.size, 0);
  const scheduledReports = reports.filter(r => r.schedule !== 'as_needed').length;
  const draftReports = reports.filter(r => r.status === 'draft').length;
  const failedReports = reports.filter(r => r.status === 'failed').length;
  const recentReports = reports.filter(r => {
    const created = new Date(r.createdDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleDownloadReport = (reportId: string) => {
    console.log('Downloading report:', reportId);
    // In a real app, this would download the report file
  };

  const handleGenerateReport = (templateId: string) => {
    console.log('Generating report from template:', templateId);
    // In a real app, this would open the report generation form
  };

  const handleScheduleReport = (reportId: string) => {
    console.log('Scheduling report:', reportId);
    // In a real app, this would open the scheduling dialog
  };

  return (
    <div className="space-y-6">

      
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Reports & Analytics
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Generate comprehensive reports and analyze property performance with advanced analytics. Track KPIs, monitor trends, and make data-driven decisions.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{totalReports} reports generated</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BarChart3 className="h-4 w-4" />
                  <span>{completedReports} completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Zap className="h-4 w-4" />
                  <span>{automatedReports} automated</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light">
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <BarChart3 className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{totalReports}</p>
                <p className="text-sm text-gray-600 font-light">Total Reports</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <FileText className="h-3 w-3" />
                  Generated reports
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <CheckCircle className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{completedReports}</p>
                <p className="text-sm text-gray-600 font-light">Completed</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Download className="h-3 w-3" />
                  Ready for download
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <Clock className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{inProgressReports}</p>
                <p className="text-sm text-gray-600 font-light">In Progress</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Activity className="h-3 w-3" />
                  Currently generating
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <Zap className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{automatedReports}</p>
                <p className="text-sm text-gray-600 font-light">Automated</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Calendar className="h-3 w-3" />
                  Scheduled reports
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Report Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{avgFileSize.toFixed(1)} MB</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Avg File Size</div>
          <div className="text-xs text-gray-600">Per report</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{scheduledReports}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Scheduled Reports</div>
          <div className="text-xs text-gray-600">Auto-generated</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{recentReports}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Recent Reports</div>
          <div className="text-xs text-gray-600">This week</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{totalFileSize.toFixed(1)} MB</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Total Storage</div>
          <div className="text-xs text-gray-600">All reports</div>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-50 border border-gray-200 rounded-2xl">
          <TabsTrigger value="reports" className="font-light">My Reports</TabsTrigger>
          <TabsTrigger value="templates" className="font-light">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled" className="font-light">Scheduled Reports</TabsTrigger>
        </TabsList>

        {/* My Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-black font-light">Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search" className="text-gray-600 font-light">Search Reports</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by report name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-40">
                  <Label htmlFor="category" className="text-gray-600 font-light">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="border-gray-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="occupancy">Occupancy</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-40">
                  <Label htmlFor="property" className="text-slate-700">Property</Label>
                  <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                    <SelectTrigger className="border-slate-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      {properties.map((property) => (
                        <SelectItem key={property} value={property}>
                          {property}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Modern Minimal Reports Table */}
              <div className="rounded-md border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-semibold text-slate-700">Report Name</TableHead>
                      <TableHead className="font-semibold text-slate-700">Category</TableHead>
                      <TableHead className="font-semibold text-slate-700">Property</TableHead>
                      <TableHead className="font-semibold text-slate-700">Period</TableHead>
                      <TableHead className="font-semibold text-slate-700">Created</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="font-semibold text-slate-700">Size</TableHead>
                      <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="font-medium text-slate-900">{report.name}</div>
                              <div className="text-xs text-slate-500">{report.format}</div>
                            </div>
                            {report.automated && <Zap className="h-4 w-4 text-purple-600" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(report.category)}>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(report.category)}
                              {report.category}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-500" />
                            <span className="max-w-[150px] truncate text-slate-900">{report.property}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-900">{report.period}</TableCell>
                        <TableCell>
                          <div className="text-sm text-slate-900">
                            {new Date(report.createdDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              {report.status.replace('_', ' ').charAt(0).toUpperCase() + 
                               report.status.replace('_', ' ').slice(1)}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-900">{formatFileSize(report.size)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-50">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewReport(report)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {report.status === 'completed' && (
                                <DropdownMenuItem onClick={() => handleDownloadReport(report.id)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleScheduleReport(report.id)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Regenerate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-600">No reports found</p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search criteria or generate a new report
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(template.category)}
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {template.estimatedTime}
                    </div>
                    <Button onClick={() => handleGenerateReport(template.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Report Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports
                  .filter(report => report.automated)
                  .map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(report.category)}
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">{report.property}</div>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(report.category)}>
                          {report.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{report.schedule}</div>
                          <div className="text-xs text-muted-foreground">
                            Last: {new Date(report.createdDate).toLocaleDateString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Details Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details - {selectedReport?.name}</DialogTitle>
            <DialogDescription>
              Complete report information and metrics
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Report Name</Label>
                    <div className="p-2 border rounded">{selectedReport.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Badge className={getCategoryColor(selectedReport.category)}>
                      {selectedReport.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Property</Label>
                    <div className="p-2 border rounded">{selectedReport.property}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <div className="p-2 border rounded">{selectedReport.period}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Created Date</Label>
                    <div className="p-2 border rounded">{new Date(selectedReport.createdDate).toLocaleDateString()}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       selectedReport.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <div className="p-2 border rounded">{selectedReport.format}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>File Size</Label>
                    <div className="p-2 border rounded">{formatFileSize(selectedReport.size)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <div className="p-2 border rounded">{selectedReport.description}</div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(selectedReport.metrics).map(([key, value]) => (
                    <div key={key} className="p-3 border rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-2xl font-bold">
                        {typeof value === 'number' && key.includes('Rate') ? `${value}%` :
                         typeof value === 'number' && (key.includes('revenue') || key.includes('expense') || key.includes('income') || key.includes('cost')) ? 
                         `$${value.toLocaleString()}` : value}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="charts" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedReport.charts.map((chart: string, index: number) => (
                    <div key={index} className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-600">
                          {chart.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-500">Chart visualization would be displayed here</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportModal(false)}>
              Close
            </Button>
            {selectedReport?.status === 'completed' && (
              <Button onClick={() => handleDownloadReport(selectedReport.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
