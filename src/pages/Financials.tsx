import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Plus,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Shield,
  Award,
  CreditCard,
  Banknote,
  Receipt,
  Calculator,
  TrendingUp2,
  TrendingDown2,
  DollarSignIcon,
  PiggyBank,
  Wallet,
  Coins,
  Building2,
  Home,
  Wrench,
  Car,
  Wifi,
  UtensilsCrossed,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Settings,
  Bell,
  HelpCircle,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  Send,
  Archive,
  Trash2,
  Star,
  Clock4,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Minus,
  Percent,
  Users,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  Edit
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Financials = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Enhanced financial data with more metrics
  const financialData = {
    totalRevenue: 110580,
    totalExpenses: 32450,
    netIncome: 78130,
    revenueChange: 12.5,
    expensesChange: -5.2,
    netIncomeChange: 18.7,
    profitMargin: 70.7,
    cashFlow: 75680,
    outstandingReceivables: 8400,
    pendingExpenses: 5200,
    totalAssets: 2850000,
    totalLiabilities: 1200000,
    netWorth: 1650000,
    roi: 15.8,
    occupancyRate: 94.2,
    averageRent: 1650,
    totalProperties: 8,
    activeTenants: 7
  };

  // Enhanced recent transactions with more details
  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'Rent Payment - Sarah Johnson',
      property: 'Oak Street Apartments #4B',
      amount: 1200,
      date: '2024-12-10',
      status: 'completed',
      category: 'Rent',
      tenant: 'Sarah Johnson',
      propertyType: 'Apartment',
      paymentMethod: 'Direct Deposit',
      lateFees: 0,
      notes: 'On-time payment, excellent tenant'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Plumbing Repair',
      property: 'Downtown Lofts #12',
      amount: -450,
      date: '2024-12-09',
      status: 'completed',
      category: 'Maintenance',
      vendor: 'Quick Fix Plumbing',
      propertyType: 'Loft',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2024-001',
      notes: 'Emergency repair - clogged drain'
    },
    {
      id: 3,
      type: 'income',
      description: 'Rent Payment - Mike Davis',
      property: 'Downtown Lofts #12',
      amount: 1800,
      date: '2024-12-08',
      status: 'completed',
      category: 'Rent',
      tenant: 'Mike Davis',
      propertyType: 'Loft',
      paymentMethod: 'Bank Transfer',
      lateFees: 0,
      notes: 'Premium unit, high-value tenant'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Property Insurance',
      property: 'Riverside Complex',
      amount: -2200,
      date: '2024-12-07',
      status: 'completed',
      category: 'Insurance',
      vendor: 'Secure Insurance Co',
      propertyType: 'Complex',
      paymentMethod: 'Direct Debit',
      policyNumber: 'POL-2024-789',
      notes: 'Annual premium renewal'
    },
    {
      id: 5,
      type: 'income',
      description: 'Rent Payment - Emma Wilson',
      property: 'Riverside Complex #8A',
      amount: 1400,
      date: '2024-12-06',
      status: 'pending',
      category: 'Rent',
      tenant: 'Emma Wilson',
      propertyType: 'Apartment',
      paymentMethod: 'Check',
      lateFees: 0,
      notes: 'Payment received, processing'
    },
    {
      id: 6,
      type: 'expense',
      description: 'Property Tax Payment',
      property: 'Suburban Homes',
      amount: -6800,
      date: '2024-12-05',
      status: 'completed',
      category: 'Property Tax',
      vendor: 'City Tax Office',
      propertyType: 'House',
      paymentMethod: 'Bank Transfer',
      taxYear: '2024',
      notes: 'Annual property tax payment'
    },
    {
      id: 7,
      type: 'income',
      description: 'Late Fee - David Chen',
      property: 'Suburban Homes #15',
      amount: 75,
      date: '2024-12-04',
      status: 'completed',
      category: 'Late Fees',
      tenant: 'David Chen',
      propertyType: 'House',
      paymentMethod: 'Credit Card',
      originalDueDate: '2024-12-01',
      notes: 'Late payment fee applied'
    }
  ];

  // Enhanced monthly data with more metrics
  const monthlyData = [
    { month: 'Jan', revenue: 98000, expenses: 28000, netIncome: 70000, occupancy: 92, avgRent: 1580 },
    { month: 'Feb', revenue: 102000, expenses: 31000, netIncome: 71000, occupancy: 94, avgRent: 1600 },
    { month: 'Mar', revenue: 105000, expenses: 29000, netIncome: 76000, occupancy: 95, avgRent: 1620 },
    { month: 'Apr', revenue: 108000, expenses: 33000, netIncome: 75000, occupancy: 93, avgRent: 1640 },
    { month: 'May', revenue: 110000, expenses: 30000, netIncome: 80000, occupancy: 96, avgRent: 1660 },
    { month: 'Jun', revenue: 112000, expenses: 35000, netIncome: 77000, occupancy: 94, avgRent: 1680 },
    { month: 'Jul', revenue: 115000, expenses: 32000, netIncome: 83000, occupancy: 97, avgRent: 1700 },
    { month: 'Aug', revenue: 118000, expenses: 34000, netIncome: 84000, occupancy: 95, avgRent: 1720 },
    { month: 'Sep', revenue: 116000, expenses: 31000, netIncome: 85000, occupancy: 96, avgRent: 1740 },
    { month: 'Oct', revenue: 119000, expenses: 33000, netIncome: 86000, occupancy: 94, avgRent: 1760 },
    { month: 'Nov', revenue: 121000, expenses: 30000, netIncome: 91000, occupancy: 98, avgRent: 1780 },
    { month: 'Dec', revenue: 110580, expenses: 32450, netIncome: 78130, occupancy: 94, avgRent: 1650 }
  ];

  // Enhanced expense categories with more details
  const expenseCategories = [
    { category: 'Maintenance', amount: 12500, percentage: 38.5, trend: 5.2, icon: Wrench, color: 'red' },
    { category: 'Insurance', amount: 8200, percentage: 25.3, trend: -2.1, icon: Shield, color: 'blue' },
    { category: 'Property Tax', amount: 6800, percentage: 21.0, trend: 0, icon: FileText, color: 'green' },
    { category: 'Utilities', amount: 3200, percentage: 9.9, trend: 8.5, icon: Wifi, color: 'yellow' },
    { category: 'Management', amount: 1750, percentage: 5.4, trend: -1.5, icon: Users, color: 'purple' }
  ];

  // Helper functions for styling
  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-3 w-3 text-red-600" />;
    if (trend < 0) return <TrendingDown className="h-3 w-3 text-green-600" />;
    return <Minus className="h-3 w-3 text-gray-600" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-red-600';
    if (trend < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransactionIcon = (type: string, category: string) => {
    if (type === 'income') return <ArrowUpRight className="h-5 w-5 text-green-600" />;
    
    switch (category) {
      case 'Maintenance': return <Wrench className="h-5 w-5 text-red-600" />;
      case 'Insurance': return <Shield className="h-5 w-5 text-blue-600" />;
      case 'Property Tax': return <FileText className="h-5 w-5 text-green-600" />;
      case 'Utilities': return <Wifi className="h-5 w-5 text-yellow-600" />;
      case 'Management': return <Users className="h-5 w-5 text-purple-600" />;
      default: return <ArrowDownRight className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 border border-green-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-emerald-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Financial Dashboard 💰
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Track your revenue, expenses, and profitability. Monitor cash flow, analyze trends, and make informed financial decisions for your property portfolio.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>${financialData.netIncome.toLocaleString()} net income this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Financial Analytics
              </Button>
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48 border-0 bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Enhanced Financial Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">${(financialData.totalRevenue / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +{financialData.revenueChange}% from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                <ArrowDownRight className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">${(financialData.totalExpenses / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  {financialData.expensesChange}% from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                <ArrowUpRight className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">${(financialData.netIncome / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Net Income</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +{financialData.netIncomeChange}% from last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <Percent className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{financialData.profitMargin}%</p>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Target className="h-3 w-3" />
                  Target: 65%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600 mb-1">${(financialData.cashFlow / 1000).toFixed(1)}K</div>
          <div className="text-sm text-gray-600 mb-1">Cash Flow</div>
          <div className="text-xs text-emerald-600">Available funds</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
          <div className="text-2xl font-bold text-blue-600 mb-1">{financialData.roi}%</div>
          <div className="text-sm text-gray-600 mb-1">ROI</div>
          <div className="text-xs text-blue-600">Return on investment</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">{financialData.occupancyRate}%</div>
          <div className="text-sm text-gray-600 mb-1">Occupancy Rate</div>
          <div className="text-xs text-purple-600">Properties occupied</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600 mb-1">${financialData.averageRent}</div>
          <div className="text-sm text-gray-600 mb-1">Average Rent</div>
          <div className="text-xs text-yellow-600">Per unit</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Enhanced Monthly Trends Chart Placeholder */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <LineChart className="h-5 w-5" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-blue-100">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700 mb-2">Revenue & Expense Chart</p>
                <p className="text-sm text-gray-600 mb-4">Interactive chart would go here</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">Revenue</div>
                    <div className="text-sm text-gray-600">Trending up</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">Expenses</div>
                    <div className="text-sm text-gray-600">Stable</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">Net Income</div>
                    <div className="text-sm text-gray-600">Growing</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Expense Breakdown */}
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <PieChart className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {expenseCategories.map((expense, index) => {
                const IconComponent = expense.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.color)}`} />
                        <IconComponent className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{expense.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">{expense.percentage}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={expense.percentage} className="flex-1 h-2" />
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(expense.trend)}
                        <span className={getTrendColor(expense.trend)}>
                          {expense.trend > 0 ? '+' : ''}{expense.trend}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Transactions */}
      <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Receipt className="h-5 w-5 text-gray-600" />
              Recent Transactions
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {getTransactionIcon(transaction.type, transaction.category)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="h-3 w-3" />
                      <span>{transaction.property}</span>
                      <span>•</span>
                      <span className="capitalize">{transaction.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      {transaction.notes && (
                        <>
                          <span>•</span>
                          <span>{transaction.notes}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-semibold text-lg ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {transaction.paymentMethod}
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="h-4 w-4 mr-2" />
                        Print Receipt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Transaction
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;
