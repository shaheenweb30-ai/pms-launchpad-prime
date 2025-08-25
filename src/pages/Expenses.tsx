import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
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
  Wrench,
  Shield,
  Home,
  Zap,
  Trash2,
  AlertTriangle,
  CheckSquare,
  XSquare,
  Activity,
  Target,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Share,
  RefreshCw,
  Minus,
  Percent,
  Users,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
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
  Settings,
  HelpCircle,
  Star,
  TrendingUp2,
  TrendingDown2,
  DollarSignIcon,
  PiggyBank,
  Wallet,
  Coins,
  BuildingIcon,
  Car,
  Wifi,
  UtensilsCrossed,
  FileTextIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MoreHorizontalIcon,
  CreditCardIcon,
  BanknoteIcon,
  ReceiptIcon,
  FileTextIcon2,
  SendIcon,
  BellIcon,
  CalculatorIcon,
  BarChart3Icon,
  PieChartIcon,
  WrenchIcon,
  ShieldIcon2,
  HomeIcon2,
  ZapIcon2,
  Trash2Icon,
  AlertTriangleIcon,
  CheckSquareIcon,
  XSquareIcon
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

const Expenses = () => {
  const { formatCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  // Enhanced expense data with more details
  const expenses = [
    {
      id: 'EXP001',
      description: 'HVAC System Repair',
      category: 'maintenance',
      property: '',
      amount: 450,
      date: '2024-12-15',
      status: 'paid',
      vendor: 'ABC HVAC Services',
      invoiceNumber: 'INV-2024-001',
      paymentMethod: 'Credit Card',
      notes: 'Emergency repair for broken AC unit',
      recurring: false,
      approved: true,
      priority: 'high',
      dueDate: '2024-12-15',
      paidDate: '2024-12-15',
      lateFees: 0,
      approvalDate: '2024-12-14',
      approvedBy: 'John Manager',
      expenseScore: 85,
      vendorRating: 4.2,
      previousExpenses: 3,
      avgResponseTime: 2.5,
      warranty: '1 year',
      nextMaintenance: '2025-06-15'
    },
    {
      id: 'EXP002',
      description: 'Property Insurance Premium',
      category: 'insurance',
      property: 'All Properties',
      amount: 1200,
      date: '2024-12-01',
      status: 'paid',
      vendor: 'Secure Insurance Co',
      invoiceNumber: 'INS-2024-001',
      paymentMethod: 'Bank Transfer',
      notes: 'Annual property insurance coverage',
      recurring: true,
      approved: true,
      priority: 'medium',
      dueDate: '2024-12-01',
      paidDate: '2024-12-01',
      lateFees: 0,
      approvalDate: '2024-11-25',
      approvedBy: 'John Manager',
      expenseScore: 95,
      vendorRating: 4.8,
      previousExpenses: 5,
      avgResponseTime: 1.0,
      warranty: '1 year',
      nextMaintenance: '2025-12-01'
    },
    {
      id: 'EXP003',
      description: 'Property Tax Payment',
      category: 'taxes',
      property: '',
      amount: 2800,
      date: '2024-11-30',
      status: 'paid',
      vendor: 'City Tax Office',
      invoiceNumber: 'TAX-2024-001',
      paymentMethod: 'ACH Transfer',
      notes: 'Q4 property tax payment',
      recurring: true,
      approved: true,
      priority: 'high',
      dueDate: '2024-11-30',
      paidDate: '2024-11-30',
      lateFees: 0,
      approvalDate: '2024-11-20',
      approvedBy: 'John Manager',
      expenseScore: 100,
      vendorRating: 5.0,
      previousExpenses: 8,
      avgResponseTime: 0.0,
      warranty: 'N/A',
      nextMaintenance: '2025-02-28'
    },
    {
      id: 'EXP004',
      description: 'Landscaping Services',
      category: 'maintenance',
      property: 'Suburban Homes - 123 Main St',
      amount: 180,
      date: '2024-12-10',
      status: 'pending',
      vendor: 'Green Thumb Landscaping',
      invoiceNumber: 'LAN-2024-001',
      paymentMethod: 'N/A',
      notes: 'Monthly lawn maintenance and trimming',
      recurring: true,
      approved: false,
      priority: 'low',
      dueDate: '2024-12-20',
      paidDate: null,
      lateFees: 0,
      approvalDate: null,
      approvedBy: null,
      expenseScore: 70,
      vendorRating: 4.0,
      previousExpenses: 2,
      avgResponseTime: 3.0,
      warranty: 'N/A',
      nextMaintenance: '2025-01-10'
    },
    {
      id: 'EXP005',
      description: 'Utility Bill - Electricity',
      category: 'utilities',
      property: '',
      amount: 320,
      date: '2024-12-05',
      status: 'paid',
      vendor: 'City Power Company',
      invoiceNumber: 'UTL-2024-001',
      paymentMethod: 'Auto-Pay',
      notes: 'Monthly electricity for common areas',
      recurring: true,
      approved: true,
      priority: 'medium',
      dueDate: '2024-12-05',
      paidDate: '2024-12-05',
      lateFees: 0,
      approvalDate: '2024-12-01',
      approvedBy: 'John Manager',
      expenseScore: 90,
      vendorRating: 4.5,
      previousExpenses: 12,
      avgResponseTime: 1.5,
      warranty: 'N/A',
      nextMaintenance: '2025-01-05'
    },
    {
      id: 'EXP006',
      description: 'Property Management Fee',
      category: 'management',
      property: 'All Properties',
      amount: 850,
      date: '2024-12-01',
      status: 'paid',
      vendor: 'PropertyFlow Management',
      invoiceNumber: 'MGMT-2024-001',
      paymentMethod: 'Bank Transfer',
      notes: 'Monthly property management services',
      recurring: true,
      approved: true,
      priority: 'medium',
      dueDate: '2024-12-01',
      paidDate: '2024-12-01',
      lateFees: 0,
      approvalDate: '2024-11-25',
      approvedBy: 'John Manager',
      expenseScore: 88,
      vendorRating: 4.3,
      previousExpenses: 24,
      avgResponseTime: 1.0,
      warranty: 'N/A',
      nextMaintenance: '2025-01-01'
    },
    {
      id: 'EXP007',
      description: 'Roof Inspection',
      category: 'maintenance',
      property: '',
      amount: 150,
      date: '2024-12-12',
      status: 'pending',
      vendor: 'Roof Masters Inc',
      invoiceNumber: 'ROOF-2024-001',
      paymentMethod: 'N/A',
      notes: 'Annual roof inspection and maintenance',
      recurring: false,
      approved: false,
      priority: 'medium',
      dueDate: '2024-12-25',
      paidDate: null,
      lateFees: 0,
      approvalDate: null,
      approvedBy: null,
      expenseScore: 75,
      vendorRating: 4.1,
      previousExpenses: 1,
      avgResponseTime: 4.0,
      warranty: '2 years',
      nextMaintenance: '2025-12-12'
    },
    {
      id: 'EXP008',
      description: 'Legal Consultation',
      category: 'legal',
      property: 'All Properties',
      amount: 300,
      date: '2024-12-08',
      status: 'paid',
      vendor: 'Smith & Associates Law',
      invoiceNumber: 'LEGAL-2024-001',
      paymentMethod: 'Credit Card',
      notes: 'Tenant dispute consultation',
      recurring: false,
      approved: true,
      priority: 'high',
      dueDate: '2024-12-08',
      paidDate: '2024-12-08',
      lateFees: 0,
      approvalDate: '2024-12-05',
      approvedBy: 'John Manager',
      expenseScore: 92,
      vendorRating: 4.7,
      previousExpenses: 6,
      avgResponseTime: 1.5,
      warranty: 'N/A',
      nextMaintenance: 'N/A'
    },
    {
      id: 'EXP009',
      description: 'Security System Upgrade',
      category: 'maintenance',
      property: '',
      amount: 1200,
      date: '2024-12-18',
      status: 'pending',
      vendor: 'SecureTech Solutions',
      invoiceNumber: 'SEC-2024-001',
      paymentMethod: 'N/A',
      notes: 'Upgrade to smart security system with cameras',
      recurring: false,
      approved: false,
      priority: 'high',
      dueDate: '2024-12-30',
      paidDate: null,
      lateFees: 0,
      approvalDate: null,
      approvedBy: null,
      expenseScore: 78,
      vendorRating: 4.4,
      previousExpenses: 2,
      avgResponseTime: 3.5,
      warranty: '3 years',
      nextMaintenance: '2027-12-18'
    },
    {
      id: 'EXP010',
      description: 'Pool Maintenance Contract',
      category: 'maintenance',
      property: '',
      amount: 650,
      date: '2024-12-20',
      status: 'paid',
      vendor: 'Aqua Pool Services',
      invoiceNumber: 'POOL-2024-001',
      paymentMethod: 'Bank Transfer',
      notes: 'Annual pool maintenance and cleaning contract',
      recurring: true,
      approved: true,
      priority: 'medium',
      dueDate: '2024-12-20',
      paidDate: '2024-12-20',
      lateFees: 0,
      approvalDate: '2024-12-15',
      approvedBy: 'John Manager',
      expenseScore: 87,
      vendorRating: 4.6,
      previousExpenses: 4,
      avgResponseTime: 2.0,
      warranty: '1 year',
      nextMaintenance: '2025-12-20'
    }
  ];

  const properties: string[] = [];

  const months = [
    'December 2024',
    'November 2024',
    'October 2024',
    'September 2024',
    'August 2024'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maintenance':
        return <Wrench className="h-4 w-4 text-blue-600" />;
      case 'insurance':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'taxes':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'utilities':
        return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'management':
        return <Home className="h-4 w-4 text-purple-600" />;
      case 'legal':
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExpenseScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getExpenseScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getVendorRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getDueDateBadge = (days: number) => {
    if (days < 0) return 'bg-red-100 text-red-800 border-red-200';
    if (days <= 3) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (days <= 7) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    const matchesProperty = propertyFilter === 'all' || expense.property === propertyFilter;
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesProperty && matchesStatus;
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const paidExpenses = expenses.filter(exp => exp.status === 'paid').reduce((sum, exp) => sum + exp.amount, 0);
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0);
  const recurringExpenses = expenses.filter(exp => exp.recurring).reduce((sum, exp) => sum + exp.amount, 0);
  
  const avgExpenseScore = expenses.reduce((sum, exp) => sum + exp.expenseScore, 0) / expenses.length;
  const avgVendorRating = expenses.reduce((sum, exp) => sum + exp.vendorRating, 0) / expenses.length;
  const highPriorityExpenses = expenses.filter(exp => exp.priority === 'high').length;
  const overdueExpenses = expenses.filter(exp => getDaysUntilDue(exp.dueDate) < 0).length;
  const totalVendors = new Set(expenses.map(exp => exp.vendor)).size;
  const avgResponseTime = expenses.reduce((sum, exp) => sum + exp.avgResponseTime, 0) / expenses.length;

  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleViewExpense = (expense: any) => {
    setSelectedExpense(expense);
    setShowExpenseModal(true);
  };

  const handleApproveExpense = (expenseId: string) => {
    console.log('Approving expense:', expenseId);
    // In a real app, this would update the backend
  };

  const handleRejectExpense = (expenseId: string) => {
    console.log('Rejecting expense:', expenseId);
    // In a real app, this would update the backend
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
                Expense Management
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Track and manage property expenses, budgets, and spending. Monitor vendor performance, optimize costs, and maintain financial control across your property portfolio.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="font-medium">{formatCurrency(totalExpenses)} total expenses this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Avg score: {avgExpenseScore.toFixed(1)}</span>
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
                Add Expense
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
              <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(totalExpenses)}</p>
                <p className="text-sm text-slate-600 font-medium">Total Expenses</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  All time expenses
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(paidExpenses)}</p>
                <p className="text-sm text-slate-600 font-medium">Paid Expenses</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Successfully paid
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                <Clock className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(pendingExpenses)}</p>
                <p className="text-sm text-slate-600 font-medium">Pending Expenses</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Awaiting payment
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
                <p className="text-3xl font-light text-slate-900">{formatCurrency(recurringExpenses)}</p>
                <p className="text-sm text-slate-600 font-medium">Recurring Expenses</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Monthly/annual costs
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Expense Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-emerald-600 mb-1">{avgExpenseScore.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Expense Score</div>
          <div className="text-xs text-emerald-600">Quality rating</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-slate-600 mb-1">{avgVendorRating.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Vendor Rating</div>
          <div className="text-xs text-slate-600">Service quality</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-amber-600 mb-1">{highPriorityExpenses}</div>
          <div className="text-sm text-slate-600 mb-1">High Priority</div>
          <div className="text-xs text-amber-600">Urgent expenses</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-red-600 mb-1">{overdueExpenses}</div>
          <div className="text-sm text-slate-600 mb-1">Overdue</div>
          <div className="text-xs text-red-600">Past due date</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-slate-800">Expense Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-slate-700">Search Expenses</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by description, vendor, or expense ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="category" className="text-slate-700">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="taxes">Taxes</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
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

            <div className="w-full md:w-40">
              <Label htmlFor="status" className="text-slate-700">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modern Minimal Expenses Table */}
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="text-slate-700">Expense ID</TableHead>
                  <TableHead className="text-slate-700">Description</TableHead>
                  <TableHead className="text-slate-700">Category</TableHead>
                  <TableHead className="text-slate-700">Property</TableHead>
                  <TableHead className="text-slate-700">Amount</TableHead>
                  <TableHead className="text-slate-700">Date</TableHead>
                  <TableHead className="text-slate-700">Vendor</TableHead>
                  <TableHead className="text-slate-700">Status</TableHead>
                  <TableHead className="text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="font-medium">{expense.description}</div>
                        {expense.recurring && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Recurring
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(expense.category)}
                        <span className="capitalize">{expense.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-[150px] truncate">{expense.property}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(expense.amount)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate">{expense.vendor}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(expense.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(expense.status)}
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewExpense(expense)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Expense
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          {expense.status === 'pending' && !expense.approved && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleApproveExpense(expense.id)}
                                className="text-green-600"
                              >
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRejectExpense(expense.id)}
                                className="text-red-600"
                              >
                                <XSquare className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-600">No expenses found</p>
              <p className="text-sm text-slate-500">
                Try adjusting your search criteria or add a new expense
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modern Minimal Analytics and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <PieChart className="h-5 w-5" />
              Expense by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown)
                .sort(([,a], [,b]) => b - a)
                .map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="capitalize font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(amount)}</div>
                      <div className="text-xs text-slate-500">
                        {((amount / totalExpenses) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <AlertTriangle className="h-5 w-5" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenses
                .filter(expense => expense.status === 'pending' && !expense.approved)
                .map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {expense.property} - {formatCurrency(expense.amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Vendor: {expense.vendor}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleRejectExpense(expense.id)}
                      >
                        <XSquare className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveExpense(expense.id)}
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              {expenses.filter(expense => expense.status === 'pending' && !expense.approved).length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No pending approvals
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Details Modal */}
      <Dialog open={showExpenseModal} onOpenChange={setShowExpenseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details - {selectedExpense?.id}</DialogTitle>
            <DialogDescription>
              Complete expense information for {selectedExpense?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <div className="p-2 border rounded">{selectedExpense.description}</div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="p-2 border rounded capitalize">{selectedExpense.category}</div>
                </div>
                <div className="space-y-2">
                  <Label>Property</Label>
                  <div className="p-2 border rounded">{selectedExpense.property}</div>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <div className="p-2 border rounded font-medium">{formatCurrency(selectedExpense.amount)}</div>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="p-2 border rounded">{new Date(selectedExpense.date).toLocaleDateString()}</div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedExpense.status)}>
                    {selectedExpense.status.charAt(0).toUpperCase() + selectedExpense.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <div className="p-2 border rounded">{selectedExpense.vendor}</div>
                </div>
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <div className="p-2 border rounded">{selectedExpense.invoiceNumber}</div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="p-2 border rounded">{selectedExpense.paymentMethod}</div>
                </div>
                <div className="space-y-2">
                  <Label>Recurring</Label>
                  <div className="p-2 border rounded">
                    {selectedExpense.recurring ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <div className="p-2 border rounded">{selectedExpense.notes}</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExpenseModal(false)}>
              Close
            </Button>
            {selectedExpense?.status === 'pending' && !selectedExpense?.approved && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleRejectExpense(selectedExpense.id);
                    setShowExpenseModal(false);
                  }}
                >
                  <XSquare className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  onClick={() => {
                    handleApproveExpense(selectedExpense.id);
                    setShowExpenseModal(false);
                  }}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
