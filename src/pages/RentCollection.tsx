import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Download,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  CreditCard,
  Banknote,
  Receipt,
  FileText,
  Send,
  Bell,
  Calculator,
  BarChart3,
  PieChart,
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
  Home,
  Wrench,
  Car,
  Wifi,
  UtensilsCrossed,
  Timer,
  CheckCircle2,
  XCircle,
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
  TrendingUp2,
  TrendingDown2,
  DollarSignIcon,
  PiggyBank,
  Wallet,
  Coins,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  AlertTriangle
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

const RentCollection = () => {
  const { formatCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // Enhanced rent collection data with more details
  const rentPayments = [
    {
      id: 'PAY001',
      tenant: 'John Smith',
      property: 'Oak Street Apartments - Unit 101',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 1800,
      status: 'paid',
      paidDate: '2024-12-01',
      paymentMethod: 'Bank Transfer',
      lateFees: 0,
      notes: 'On-time payment',
      daysOverdue: 0,
      paymentScore: 100,
      tenantRating: 4.8,
      previousPayments: 12,
      onTimeRate: 100,
      propertyType: 'Apartment',
      rentIncrease: 0,
      specialTerms: 'None',
      autoPay: true,
      reminderSent: 0
    },
    {
      id: 'PAY002',
      tenant: 'Sarah Johnson',
      property: 'Downtown Lofts - Unit 205',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 2200,
      status: 'paid',
      paidDate: '2024-12-03',
      paymentMethod: 'Credit Card',
      lateFees: 44,
      notes: 'Paid 2 days late, late fee applied',
      daysOverdue: 2,
      paymentScore: 85,
      tenantRating: 4.2,
      previousPayments: 8,
      onTimeRate: 75,
      propertyType: 'Loft',
      rentIncrease: 5.2,
      specialTerms: 'Pet deposit',
      autoPay: false,
      reminderSent: 1
    },
    {
      id: 'PAY003',
      tenant: 'Mike Davis',
      property: 'Riverside Complex - Unit 312',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 1600,
      status: 'overdue',
      paymentMethod: 'N/A',
      lateFees: 160,
      notes: '15 days overdue, reminder sent',
      daysOverdue: 15,
      paymentScore: 45,
      tenantRating: 3.8,
      previousPayments: 6,
      onTimeRate: 50,
      propertyType: 'Apartment',
      rentIncrease: 0,
      specialTerms: 'None',
      autoPay: false,
      reminderSent: 3
    },
    {
      id: 'PAY004',
      tenant: 'Lisa Wilson',
      property: 'Suburban Homes - 123 Main St',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 2800,
      status: 'pending',
      paymentMethod: 'N/A',
      lateFees: 0,
      notes: 'Payment expected',
      daysOverdue: 0,
      paymentScore: 70,
      tenantRating: 4.5,
      previousPayments: 10,
      onTimeRate: 90,
      propertyType: 'House',
      rentIncrease: 3.5,
      specialTerms: 'Garden maintenance',
      autoPay: true,
      reminderSent: 0
    },
    {
      id: 'PAY005',
      tenant: 'Tech Solutions Inc',
      property: 'Commercial Plaza - Suite 100',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 4500,
      status: 'paid',
      paidDate: '2024-11-28',
      paymentMethod: 'ACH Transfer',
      lateFees: 0,
      notes: 'Early payment, corporate account',
      daysOverdue: -3,
      paymentScore: 100,
      tenantRating: 5.0,
      previousPayments: 24,
      onTimeRate: 100,
      propertyType: 'Commercial',
      rentIncrease: 0,
      specialTerms: 'Corporate lease',
      autoPay: true,
      reminderSent: 0
    },
    {
      id: 'PAY006',
      tenant: 'Alex Johnson',
      property: 'Harbor View Condos - Unit 3A',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 1900,
      status: 'paid',
      paidDate: '2024-12-02',
      paymentMethod: 'Credit Card',
      lateFees: 19,
      notes: 'Paid 1 day late, first late payment',
      daysOverdue: 1,
      paymentScore: 90,
      tenantRating: 4.6,
      previousPayments: 4,
      onTimeRate: 100,
      propertyType: 'Condo',
      rentIncrease: 0,
      specialTerms: 'None',
      autoPay: false,
      reminderSent: 1
    },
    {
      id: 'PAY007',
      tenant: 'Rachel Green',
      property: 'Mountain Ridge Estates - Unit 5',
      month: 'December 2024',
      dueDate: '2024-12-01',
      amount: 2100,
      status: 'partial',
      paidDate: '2024-12-05',
      paymentMethod: 'Bank Transfer',
      lateFees: 84,
      notes: 'Partial payment received, balance pending',
      daysOverdue: 4,
      paymentScore: 60,
      tenantRating: 4.0,
      previousPayments: 7,
      onTimeRate: 85,
      propertyType: 'House',
      rentIncrease: 0,
      specialTerms: 'Mountain view premium',
      autoPay: false,
      reminderSent: 2
    }
  ];

  const properties = [
    'All Properties',
    'Oak Street Apartments - Unit 101',
    'Downtown Lofts - Unit 205',
    'Riverside Complex - Unit 312',
    'Suburban Homes - 123 Main St',
    'Commercial Plaza - Suite 100',
    'Harbor View Condos - Unit 3A',
    'Mountain Ridge Estates - Unit 5'
  ];

  const months = [
    'December 2024',
    'November 2024',
    'October 2024',
    'September 2024',
    'August 2024'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'partial':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPaymentScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPaymentScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getDaysOverdueColor = (days: number) => {
    if (days <= 0) return 'text-green-600';
    if (days <= 7) return 'text-yellow-600';
    if (days <= 14) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDaysOverdueBadge = (days: number) => {
    if (days <= 0) return 'bg-green-100 text-green-800 border-green-200';
    if (days <= 7) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (days <= 14) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'Apartment': return <Home className="h-4 w-4 text-blue-600" />;
      case 'Loft': return <Building2 className="h-4 w-4 text-purple-600" />;
      case 'House': return <HomeIcon className="h-4 w-4 text-green-600" />;
      case 'Commercial': return <Briefcase className="h-4 w-4 text-indigo-600" />;
      case 'Condo': return <Building2 className="h-4 w-4 text-orange-600" />;
      default: return <Building2 className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredPayments = rentPayments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || payment.property === propertyFilter;
    const matchesMonth = monthFilter === 'all' || payment.month === monthFilter;
    
    return matchesSearch && matchesStatus && matchesProperty && matchesMonth;
  });

  const totalCollected = rentPayments.filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount + p.lateFees, 0);
  const totalExpected = rentPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalLateFees = rentPayments.reduce((sum, p) => sum + p.lateFees, 0);
  const overdueAmount = rentPayments.filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount + p.lateFees, 0);
  const collectionRate = ((rentPayments.filter(p => p.status === 'paid').length / rentPayments.length) * 100).toFixed(1);
  
  const avgPaymentScore = rentPayments.reduce((sum, p) => sum + p.paymentScore, 0) / rentPayments.length;
  const avgTenantRating = rentPayments.reduce((sum, p) => sum + p.tenantRating, 0) / rentPayments.length;
  const totalRemindersSent = rentPayments.reduce((sum, p) => sum + p.reminderSent, 0);
  const autoPayUsers = rentPayments.filter(p => p.autoPay).length;
  const onTimePayments = rentPayments.filter(p => p.daysOverdue <= 0).length;
  const avgDaysOverdue = rentPayments.filter(p => p.daysOverdue > 0)
    .reduce((sum, p) => sum + p.daysOverdue, 0) / Math.max(rentPayments.filter(p => p.daysOverdue > 0).length, 1);

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleSendReminder = (paymentId: string) => {
    console.log('Sending reminder for payment:', paymentId);
    // In a real app, this would send an email/SMS reminder
  };

  const handleRecordPayment = (paymentId: string) => {
    console.log('Recording payment for:', paymentId);
    // In a real app, this would open a payment recording form
  };

  return (
    <div className="space-y-6">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Rent Collection
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Manage rent payments, track collections, monitor payment status, and optimize your rental income with comprehensive payment analytics.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{formatCurrency(totalCollected)} collected this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Collection rate: {collectionRate}%</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
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
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(totalCollected)}</p>
                <p className="text-sm text-slate-600 font-medium">Total Collected</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Including late fees
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{collectionRate}%</p>
                <p className="text-sm text-slate-600 font-medium">Collection Rate</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Target className="h-3 w-3" />
                  Successful collections
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                <AlertCircle className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(totalLateFees)}</p>
                <p className="text-sm text-slate-600 font-medium">Late Fees</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <Zap className="h-3 w-3" />
                  Additional revenue
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                <TrendingDown className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(overdueAmount)}</p>
                <p className="text-sm text-slate-600 font-medium">Overdue Amount</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  Outstanding payments
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-emerald-600 mb-1">{avgPaymentScore.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Payment Score</div>
          <div className="text-xs text-emerald-600">Tenant reliability</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-slate-600 mb-1">{avgTenantRating.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Tenant Rating</div>
          <div className="text-xs text-slate-600">Payment score</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-amber-600 mb-1">{autoPayUsers}</div>
          <div className="text-sm text-slate-600 mb-1">Auto-Pay Users</div>
          <div className="text-xs text-amber-600">Automated payments</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-blue-600 mb-1">{onTimePayments}</div>
          <div className="text-sm text-slate-600 mb-1">On-Time Payments</div>
          <div className="text-xs text-blue-600">Reliable tenants</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-slate-600" />
            Payment Overview & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-slate-700 mb-2 block">Search Payments</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by tenant, property, or payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="status" className="text-sm font-medium text-slate-700 mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="property" className="text-sm font-medium text-slate-700 mb-2 block">Property</Label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-40">
              <Label htmlFor="month" className="text-sm font-medium text-slate-700 mb-2 block">Month</Label>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modern Minimal Payments Table */}
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Payment ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Tenant</TableHead>
                  <TableHead className="font-semibold text-slate-700">Property</TableHead>
                  <TableHead className="font-semibold text-slate-700">Month</TableHead>
                  <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-700">Due Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Payment Method</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                    <TableCell className="font-medium text-blue-600">{payment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{payment.tenant}</span>
                        <Badge className={getPaymentScoreBadge(payment.paymentScore)} variant="outline">
                          {payment.paymentScore}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPropertyTypeIcon(payment.propertyType)}
                        <span className="max-w-[200px] truncate text-sm">{payment.property}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{payment.month}</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                      {payment.lateFees > 0 && (
                        <div className="text-xs text-orange-600 font-medium">
                                                      +{formatCurrency(payment.lateFees)} late fees
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        {payment.autoPay ? 'Auto-pay' : 'Manual'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </div>
                        <Badge className={getDaysOverdueBadge(payment.daysOverdue)} variant="outline">
                          {payment.daysOverdue > 0 ? `${payment.daysOverdue} days overdue` : 'On time'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {payment.paymentMethod === 'Bank Transfer' && <Banknote className="h-4 w-4 text-green-600" />}
                        {payment.paymentMethod === 'Credit Card' && <CreditCard className="h-4 w-4 text-blue-600" />}
                        {payment.paymentMethod === 'ACH Transfer' && <Receipt className="h-4 w-4 text-purple-600" />}
                        {payment.paymentMethod === 'N/A' && <Clock className="h-4 w-4 text-gray-400" />}
                        <span className="text-sm font-medium">{payment.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {payment.status === 'overdue' && (
                            <DropdownMenuItem onClick={() => handleSendReminder(payment.id)}>
                              <Bell className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                          )}
                          {payment.status !== 'paid' && (
                            <DropdownMenuItem onClick={() => handleRecordPayment(payment.id)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Record Payment
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-10 w-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No payments found</h3>
              <p className="text-slate-500 mb-4 max-w-md mx-auto">
                Try adjusting your search criteria, filters, or check back later for new payment records.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <Search className="h-4 w-4" />
                <span>Use different search terms or clear filters</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modern Minimal Quick Actions and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <AlertCircle className="h-5 w-5" />
              Overdue Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {rentPayments
                .filter(payment => payment.status === 'overdue')
                .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-900">{payment.tenant}</div>
                      <div className="text-sm text-slate-600">
                        {payment.property} - ${payment.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline">
                          {payment.daysOverdue} days overdue
                        </Badge>
                        <span className="text-xs text-red-600 font-medium">
                          Late fees: ${payment.lateFees}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleSendReminder(payment.id)} className="border-red-200 text-red-700 hover:bg-red-50">
                        <Bell className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                      <Button size="sm" onClick={() => handleRecordPayment(payment.id)} className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 mr-1" />
                        Record
                      </Button>
                    </div>
                  </div>
                ))}
              {rentPayments.filter(payment => payment.status === 'overdue').length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-green-700 font-medium">No overdue payments</p>
                  <p className="text-sm text-green-600">All tenants are up to date!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BarChart3 className="h-5 w-5" />
              Collection Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <span className="text-sm font-medium text-green-700">Expected Revenue</span>
                <span className="text-lg font-bold text-green-800">{formatCurrency(totalExpected)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <span className="text-sm font-medium text-blue-700">Collected Revenue</span>
                <span className="text-lg font-bold text-blue-800">{formatCurrency(totalCollected)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <span className="text-sm font-medium text-purple-700">Collection Rate</span>
                <span className="text-lg font-bold text-purple-800">{collectionRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                <span className="text-sm font-medium text-orange-700">Late Fees</span>
                <span className="text-lg font-bold text-orange-800">{formatCurrency(totalLateFees)}</span>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Collection Progress</span>
                  <span className="text-sm font-medium text-gray-600">{collectionRate}%</span>
                </div>
                <Progress value={parseFloat(collectionRate)} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details - {selectedPayment?.id}</DialogTitle>
            <DialogDescription>
              Complete payment information for {selectedPayment?.tenant}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tenant</Label>
                  <div className="p-2 border rounded">{selectedPayment.tenant}</div>
                </div>
                <div className="space-y-2">
                  <Label>Property</Label>
                  <div className="p-2 border rounded">{selectedPayment.property}</div>
                </div>
                <div className="space-y-2">
                  <Label>Month</Label>
                  <div className="p-2 border rounded">{selectedPayment.month}</div>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <div className="p-2 border rounded">{new Date(selectedPayment.dueDate).toLocaleDateString()}</div>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <div className="p-2 border rounded font-medium">{formatCurrency(selectedPayment.amount)}</div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedPayment.status)}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="p-2 border rounded">{selectedPayment.paymentMethod}</div>
                </div>
                <div className="space-y-2">
                  <Label>Late Fees</Label>
                  <div className="p-2 border rounded">{formatCurrency(selectedPayment.lateFees)}</div>
                </div>
                {selectedPayment.paidDate && (
                  <div className="space-y-2">
                    <Label>Paid Date</Label>
                    <div className="p-2 border rounded">{new Date(selectedPayment.paidDate).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <div className="p-2 border rounded">{selectedPayment.notes}</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Close
            </Button>
            {selectedPayment?.status !== 'paid' && (
              <Button onClick={() => handleRecordPayment(selectedPayment?.id)}>
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentCollection;
