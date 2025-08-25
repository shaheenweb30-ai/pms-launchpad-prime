import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [recordingPayment, setRecordingPayment] = useState<any>(null);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    paymentMethod: '',
    paymentDate: '',
    reference: '',
    notes: '',
    lateFees: '',
    partialPayment: false
  });

  // Enhanced rent collection data with more details
  const rentPayments: any[] = [];

  const properties: string[] = [];

  const months: string[] = [];

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
    const payment = rentPayments.find(p => p.id === paymentId);
    if (payment) {
      setRecordingPayment(payment);
      setNewPayment({
        amount: payment.amount.toString(),
        paymentMethod: payment.paymentMethod || '',
        paymentDate: new Date().toISOString().split('T')[0],
        reference: '',
        notes: '',
        lateFees: payment.lateFees ? payment.lateFees.toString() : '',
        partialPayment: false
      });
      setShowRecordPaymentModal(true);
    }
  };

  const handleSubmitPayment = () => {
    if (!recordingPayment || !newPayment.amount || !newPayment.paymentMethod || !newPayment.paymentDate) {
      return;
    }

    // In a real app, this would save the payment to the database
    console.log('Recording payment:', {
      paymentId: recordingPayment.id,
      ...newPayment
    });

    // Reset form and close modal
    setNewPayment({
      amount: '',
      paymentMethod: '',
      paymentDate: '',
      reference: '',
      notes: '',
      lateFees: '',
      partialPayment: false
    });
    setRecordingPayment(null);
    setShowRecordPaymentModal(false);

    // Show success message
    toast({
      title: "Payment Recorded",
      description: `Successfully recorded payment of ${formatCurrency(parseFloat(newPayment.amount))} for ${recordingPayment.tenant}`,
    });
  };

  const resetPaymentForm = () => {
    setNewPayment({
      amount: '',
      paymentMethod: '',
      paymentDate: '',
      reference: '',
      notes: '',
      lateFees: '',
      partialPayment: false
    });
    setRecordingPayment(null);
  };

  return (
    <div className="space-y-6">

      
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-50/30 p-8 border border-gray-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Rent Collection
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl font-light leading-relaxed">
                Manage rent payments, track collections, monitor payment status, and optimize your rental income with comprehensive payment analytics.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="font-medium">{formatCurrency(totalCollected)} collected this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Collection rate: {collectionRate}%</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white font-light shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
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
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-black" />
              </div>
              <div>
                <p className="text-3xl font-light text-gray-900">{formatCurrency(totalCollected)}</p>
                <p className="text-sm text-gray-600 font-medium">Total Collected</p>
                <div className="flex items-center gap-1 text-xs text-black mt-1">
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
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <TrendingUp className="h-7 w-7 text-black" />
              </div>
              <div>
                <p className="text-3xl font-light text-gray-900">{collectionRate}%</p>
                <p className="text-sm text-gray-600 font-medium">Collection Rate</p>
                <div className="flex items-center gap-1 text-xs text-black mt-1">
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
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <AlertCircle className="h-7 w-7 text-black" />
              </div>
              <div>
                <p className="text-3xl font-light text-gray-900">{formatCurrency(totalLateFees)}</p>
                <p className="text-sm text-gray-600 font-medium">Late Fees</p>
                <div className="flex items-center gap-1 text-xs text-black mt-1">
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
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <TrendingDown className="h-7 w-7 text-black" />
              </div>
              <div>
                <p className="text-3xl font-light text-gray-900">{formatCurrency(overdueAmount)}</p>
                <p className="text-sm text-gray-600 font-medium">Overdue Amount</p>
                <div className="flex items-center gap-1 text-xs text-black mt-1">
                  Outstanding payments
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-black mb-1">{avgPaymentScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Payment Score</div>
          <div className="text-xs text-black">Tenant reliability</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-gray-600 mb-1">{avgTenantRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Tenant Rating</div>
          <div className="text-xs text-gray-600">Payment score</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-black mb-1">{autoPayUsers}</div>
          <div className="text-sm text-gray-600 mb-1">Auto-Pay Users</div>
          <div className="text-xs text-black">Automated payments</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-black mb-1">{onTimePayments}</div>
          <div className="text-sm text-gray-600 mb-1">On-Time Payments</div>
          <div className="text-xs text-black">Reliable tenants</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            Payment Overview & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">Search Payments</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by tenant, property, or payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
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
              <Label htmlFor="property" className="text-sm font-medium text-gray-700 mb-2 block">Property</Label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
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
              <Label htmlFor="month" className="text-sm font-medium text-gray-700 mb-2 block">Month</Label>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
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
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 border-gray-200">
                  <TableHead className="font-semibold text-gray-700">Payment ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Tenant</TableHead>
                  <TableHead className="font-semibold text-gray-700">Property</TableHead>
                  <TableHead className="font-semibold text-gray-700">Month</TableHead>
                  <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700">Due Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Payment Method</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                    <TableCell className="font-medium text-black">{payment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-black" />
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
                        <div className="text-xs text-black font-medium">
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
                        {payment.paymentMethod === 'Bank Transfer' && <Banknote className="h-4 w-4 text-black" />}
                        {payment.paymentMethod === 'Credit Card' && <CreditCard className="h-4 w-4 text-black" />}
                        {payment.paymentMethod === 'ACH Transfer' && <Receipt className="h-4 w-4 text-black" />}
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
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No payments found</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                Try adjusting your search criteria, filters, or check back later for new payment records.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
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
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <AlertCircle className="h-5 w-5" />
              Overdue Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {rentPayments
                .filter(payment => payment.status === 'overdue')
                .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900">{payment.tenant}</div>
                      <div className="text-sm text-gray-600">
                        {payment.property} - ${payment.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-100 text-black border-gray-200" variant="outline">
                          {payment.daysOverdue} days overdue
                        </Badge>
                        <span className="text-xs text-black font-medium">
                          Late fees: ${payment.lateFees}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleSendReminder(payment.id)} className="border-black text-black hover:bg-gray-50">
                        <Bell className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                      <Button size="sm" onClick={() => handleRecordPayment(payment.id)} className="bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Record
                      </Button>
                    </div>
                  </div>
                ))}
              {rentPayments.filter(payment => payment.status === 'overdue').length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-black" />
                  </div>
                  <p className="text-black font-medium">No overdue payments</p>
                  <p className="text-sm text-black">All tenants are up to date!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-black">
              <BarChart3 className="h-5 w-5" />
              Collection Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-black">Expected Revenue</span>
                <span className="text-lg font-bold text-black">{formatCurrency(totalExpected)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-black">Collected Revenue</span>
                <span className="text-lg font-bold text-black">{formatCurrency(totalCollected)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-black">Collection Rate</span>
                <span className="text-lg font-bold text-black">{collectionRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-black">Late Fees</span>
                <span className="text-lg font-bold text-black">{formatCurrency(totalLateFees)}</span>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black">Collection Progress</span>
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
            <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Close
            </Button>
            {selectedPayment?.status !== 'paid' && (
              <Button onClick={() => handleRecordPayment(selectedPayment?.id)} className="bg-black hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Payment Modal */}
      <Dialog open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-black">Record Payment</DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Record payment details for {recordingPayment?.tenant} - {recordingPayment?.property}
            </DialogDescription>
          </DialogHeader>
          
          {recordingPayment && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-medium text-black mb-3">Payment Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Original Amount:</span>
                    <span className="ml-2 font-medium text-black">{formatCurrency(recordingPayment.amount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Due Date:</span>
                    <span className="ml-2 font-medium text-black">{new Date(recordingPayment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Late Fees:</span>
                    <span className="ml-2 font-medium text-black">{formatCurrency(recordingPayment.lateFees || 0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <Badge className={getStatusColor(recordingPayment.status)}>
                      {recordingPayment.status.charAt(0).toUpperCase() + recordingPayment.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-light text-gray-700">Payment Amount *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      placeholder="0.00"
                      className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="text-sm font-light text-gray-700">Payment Method *</Label>
                    <Select value={newPayment.paymentMethod} onValueChange={(value) => setNewPayment({...newPayment, paymentMethod: value})}>
                      <SelectTrigger className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="ACH Transfer">ACH Transfer</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate" className="text-sm font-light text-gray-700">Payment Date *</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={newPayment.paymentDate}
                      onChange={(e) => setNewPayment({...newPayment, paymentDate: e.target.value})}
                      className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-sm font-light text-gray-700">Reference Number</Label>
                    <Input
                      id="reference"
                      value={newPayment.reference}
                      onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                      placeholder="Transaction ID, check #, etc."
                      className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-light text-gray-700">Notes</Label>
                  <textarea
                    id="notes"
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                    placeholder="Additional payment details..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 font-light resize-none"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="partialPayment"
                      checked={newPayment.partialPayment}
                      onChange={(e) => setNewPayment({...newPayment, partialPayment: e.target.checked})}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <Label htmlFor="partialPayment" className="text-sm font-light text-gray-700">Partial Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeLateFees"
                      checked={newPayment.lateFees !== ''}
                      onChange={(e) => setNewPayment({...newPayment, lateFees: e.target.checked ? (recordingPayment.lateFees || 0).toString() : ''})}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <Label htmlFor="includeLateFees" className="text-sm font-light text-gray-700">Include Late Fees</Label>
                  </div>
                </div>

                {newPayment.partialPayment && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 text-amber-800">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">Partial Payment</span>
                    </div>
                    <p className="text-xs text-amber-700 mt-1">
                      This payment covers only a portion of the total amount due. The remaining balance will still be tracked.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="pt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                resetPaymentForm();
                setShowRecordPaymentModal(false);
              }} 
              className="border-gray-200 text-gray-700 hover:bg-gray-50 font-light rounded-xl px-6 py-2"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitPayment}
              disabled={!newPayment.amount || !newPayment.paymentMethod || !newPayment.paymentDate}
              className="bg-black hover:bg-gray-800 text-white font-light rounded-xl px-6 py-2"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentCollection;
