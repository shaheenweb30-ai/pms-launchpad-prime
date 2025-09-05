import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  DollarSign,
  Calendar,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  FileText,
  ArrowLeft,
  CreditCard,
  Banknote
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PaymentRecord {
  id: string;
  taskId: string;
  taskTitle: string;
  property: string;
  propertyAddress: string;
  ownerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod: 'bank_transfer' | 'check' | 'cash' | 'digital_wallet';
  dueDate: string;
  paidDate?: string;
  invoiceNumber: string;
  description: string;
  hoursWorked: number;
  hourlyRate: number;
  materialsCost: number;
  laborCost: number;
  notes?: string;
}

const VendorPaymentHistory: React.FC = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Modal states
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAllPaymentsModal, setShowAllPaymentsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  // Load payment data from localStorage
  const loadPayments = () => {
    try {
      const savedPayments = localStorage.getItem('pms-vendor-payments');
      if (savedPayments) {
        const parsedPayments = JSON.parse(savedPayments);
        setPayments(parsedPayments);
        setFilteredPayments(parsedPayments);
      } else {
        // Create default payment records
        const defaultPayments: PaymentRecord[] = [
          {
            id: '1',
            taskId: 'TASK-001',
            taskTitle: 'HVAC Repair - Unit 3B',
            property: 'Sunset Apartments',
            propertyAddress: '123 Main Street, Downtown',
            ownerName: 'Sarah Johnson',
            amount: 450.00,
            status: 'paid',
            paymentMethod: 'bank_transfer',
            dueDate: '2024-01-15',
            paidDate: '2024-01-14',
            invoiceNumber: 'INV-2024-001',
            description: 'Repaired HVAC unit, replaced faulty compressor',
            hoursWorked: 4.5,
            hourlyRate: 75.00,
            materialsCost: 125.00,
            laborCost: 325.00,
            notes: 'Customer very satisfied with quick service'
          },
          {
            id: '2',
            taskId: 'TASK-002',
            taskTitle: 'Plumbing Emergency - Basement',
            property: 'Riverside Plaza',
            propertyAddress: '456 River Road, Midtown',
            ownerName: 'Michael Chen',
            amount: 320.00,
            status: 'pending',
            paymentMethod: 'check',
            dueDate: '2024-01-20',
            invoiceNumber: 'INV-2024-002',
            description: 'Fixed main water pipe leak in basement',
            hoursWorked: 3.0,
            hourlyRate: 75.00,
            materialsCost: 95.00,
            laborCost: 225.00,
            notes: 'Urgent repair completed same day'
          },
          {
            id: '3',
            taskId: 'TASK-003',
            taskTitle: 'Monthly Maintenance Check',
            property: 'Garden View Complex',
            propertyAddress: '789 Garden Lane, Uptown',
            ownerName: 'Emily Rodriguez',
            amount: 280.00,
            status: 'paid',
            paymentMethod: 'digital_wallet',
            dueDate: '2024-01-10',
            paidDate: '2024-01-09',
            invoiceNumber: 'INV-2024-003',
            description: 'Monthly inspection of all units',
            hoursWorked: 2.5,
            hourlyRate: 75.00,
            materialsCost: 55.00,
            laborCost: 225.00,
            notes: 'All systems functioning properly'
          },
          {
            id: '4',
            taskId: 'TASK-004',
            taskTitle: 'Electrical Panel Upgrade',
            property: 'Sunset Apartments',
            propertyAddress: '123 Main Street, Downtown',
            ownerName: 'Sarah Johnson',
            amount: 850.00,
            status: 'overdue',
            paymentMethod: 'bank_transfer',
            dueDate: '2024-01-05',
            invoiceNumber: 'INV-2024-004',
            description: 'Upgraded electrical panel to meet current code',
            hoursWorked: 6.0,
            hourlyRate: 75.00,
            materialsCost: 400.00,
            laborCost: 450.00,
            notes: 'Major upgrade project'
          },
          {
            id: '5',
            taskId: 'TASK-005',
            taskTitle: 'Appliance Repair - Dishwasher',
            property: 'Riverside Plaza',
            propertyAddress: '456 River Road, Midtown',
            ownerName: 'Michael Chen',
            amount: 180.00,
            status: 'paid',
            paymentMethod: 'cash',
            dueDate: '2024-01-12',
            paidDate: '2024-01-12',
            invoiceNumber: 'INV-2024-005',
            description: 'Fixed dishwasher motor and water pump',
            hoursWorked: 1.5,
            hourlyRate: 75.00,
            materialsCost: 67.50,
            laborCost: 112.50,
            notes: 'Quick repair, customer happy'
          }
        ];
        setPayments(defaultPayments);
        setFilteredPayments(defaultPayments);
        localStorage.setItem('pms-vendor-payments', JSON.stringify(defaultPayments));
      }
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && profile) {
      loadPayments();
    }
  }, [user, profile]);

  // Filter payments based on search and filters
  useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(payment =>
        payment.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Payment method filter
    if (paymentMethodFilter !== 'all') {
      filtered = filtered.filter(payment => payment.paymentMethod === paymentMethodFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.dueDate);
        switch (dateFilter) {
          case 'last-30-days':
            return paymentDate >= thirtyDaysAgo;
          case 'last-90-days':
            return paymentDate >= ninetyDaysAgo;
          case 'overdue':
            return payment.status === 'overdue';
          default:
            return true;
        }
      });
    }

    setFilteredPayments(filtered);
  }, [payments, searchQuery, statusFilter, paymentMethodFilter, dateFilter]);

  // Calculate summary statistics
  const totalEarnings = payments.reduce((sum, payment) => 
    payment.status === 'paid' ? sum + payment.amount : sum, 0
  );
  const pendingAmount = payments.reduce((sum, payment) => 
    payment.status === 'pending' ? sum + payment.amount : sum, 0
  );
  const overdueAmount = payments.reduce((sum, payment) => 
    payment.status === 'overdue' ? sum + payment.amount : sum, 0
  );
  const totalHours = payments.reduce((sum, payment) => sum + payment.hoursWorked, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <CreditCard className="h-4 w-4 text-gray-400" />;
      case 'check':
        return <FileText className="h-4 w-4 text-gray-400" />;
      case 'cash':
        return <Banknote className="h-4 w-4 text-gray-400" />;
      case 'digital_wallet':
        return <CreditCard className="h-4 w-4 text-gray-400" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'check':
        return 'Check';
      case 'cash':
        return 'Cash';
      case 'digital_wallet':
        return 'Digital Wallet';
      default:
        return method;
    }
  };

  const handleViewDetails = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowPaymentDetailsModal(true);
  };

  const handleExportRecords = () => {
    setShowExportModal(true);
  };

  const handleViewAllPayments = () => {
    setShowAllPaymentsModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading payment history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 lg:mt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/vendor-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Payment History
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Track your earnings, monitor payment status, and manage your financial records.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Financial Overview</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatCurrency(totalEarnings)} total earnings</span>
                </div>
                {overdueAmount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{formatCurrency(overdueAmount)} overdue</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportRecords}
                className="hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
              <Button
                size="sm"
                onClick={handleViewAllPayments}
                className="hidden sm:flex"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Payments
              </Button>
              {/* Mobile buttons */}
              <div className="flex sm:hidden gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportRecords}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleViewAllPayments}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Minimal KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
                  <CheckCircle className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">{payments.filter(p => p.status === 'paid').length} paid invoices</span>
                </div>
                <div className="text-xs text-gray-500">All completed work</div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-light text-gray-600">
                Pending Payments
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extralight text-black">{formatCurrency(pendingAmount)}</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">{payments.filter(p => p.status === 'pending').length} pending</span>
                </div>
                <div className="text-xs text-gray-500">Awaiting payment</div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-light text-gray-600">
                Overdue Amount
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <AlertCircle className="h-5 w-5 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extralight text-black">{formatCurrency(overdueAmount)}</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">{payments.filter(p => p.status === 'overdue').length} overdue</span>
                </div>
                <div className="text-xs text-gray-500">Past due date</div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-light text-gray-600">
                Total Hours
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <TrendingUp className="h-5 w-5 text-gray-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-extralight text-black">{totalHours.toFixed(1)}h</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="font-medium">{formatCurrency(totalHours * 75)} estimated value</span>
                </div>
                <div className="text-xs text-gray-500">All completed work</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm rounded-3xl mb-6">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-light">
                  {filteredPayments.length} payments
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History List */}
        <div className="grid gap-6">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-light text-black">{payment.taskTitle}</h3>
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-light text-gray-600">{payment.property}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-light text-gray-600">Due: {formatDate(payment.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="text-sm font-light text-gray-600">{getPaymentMethodLabel(payment.paymentMethod)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-light text-gray-600">{formatCurrency(payment.amount)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-light">Invoice: {payment.invoiceNumber}</span>
                      <span className="font-light">Hours: {payment.hoursWorked}h</span>
                      <span className="font-light">Rate: {formatCurrency(payment.hourlyRate)}/h</span>
                    </div>

                    {payment.notes && (
                      <div className="bg-gray-50 p-3 rounded-xl mt-4">
                        <p className="text-sm font-light text-gray-600">
                          <strong>Notes:</strong> {payment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(payment)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <Card className="border-0 shadow-sm rounded-3xl">
            <CardContent className="p-12 text-center">
              <DollarSign className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-light text-gray-600 mb-2">No payments found</h3>
              <p className="text-gray-500 font-light">No payment records match your current filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Payment Details Modal */}
        <Dialog open={showPaymentDetailsModal} onOpenChange={setShowPaymentDetailsModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Details
              </DialogTitle>
              <DialogDescription>
                Detailed information about this payment record
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Task Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Task:</span> {selectedPayment.taskTitle}</p>
                      <p><span className="font-medium">Property:</span> {selectedPayment.property}</p>
                      <p><span className="font-medium">Address:</span> {selectedPayment.propertyAddress}</p>
                      <p><span className="font-medium">Owner:</span> {selectedPayment.ownerName}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Amount:</span> {formatCurrency(selectedPayment.amount)}</p>
                      <p><span className="font-medium">Status:</span> {getStatusBadge(selectedPayment.status)}</p>
                      <p><span className="font-medium">Method:</span> {getPaymentMethodLabel(selectedPayment.paymentMethod)}</p>
                      <p><span className="font-medium">Invoice:</span> {selectedPayment.invoiceNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Work Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Hours Worked:</span> {selectedPayment.hoursWorked}h</p>
                      <p><span className="font-medium">Hourly Rate:</span> {formatCurrency(selectedPayment.hourlyRate)}</p>
                      <p><span className="font-medium">Labor Cost:</span> {formatCurrency(selectedPayment.laborCost)}</p>
                      <p><span className="font-medium">Materials:</span> {formatCurrency(selectedPayment.materialsCost)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dates</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Due Date:</span> {formatDate(selectedPayment.dueDate)}</p>
                      {selectedPayment.paidDate && (
                        <p><span className="font-medium">Paid Date:</span> {formatDate(selectedPayment.paidDate)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedPayment.description}</p>
                </div>

                {selectedPayment.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-sm text-gray-600">{selectedPayment.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Export Records Modal */}
        <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Payment Records
              </DialogTitle>
              <DialogDescription>
                Choose the format and date range for your payment records export
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Export Format</label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowExportModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Export Started",
                    description: "Your payment records are being prepared for download.",
                  });
                  setShowExportModal(false);
                }}>
                  Export Records
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View All Payments Modal */}
        <Dialog open={showAllPaymentsModal} onOpenChange={setShowAllPaymentsModal}>
          <DialogContent className="sm:max-w-[800px] max-h-[600px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                All Payment Records
              </DialogTitle>
              <DialogDescription>
                Complete overview of all your payment records
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-light text-black">{formatCurrency(totalEarnings)}</p>
                  <p className="text-sm text-gray-600 font-light">Total Earnings</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-light text-black">{payments.filter(p => p.status === 'paid').length}</p>
                  <p className="text-sm text-gray-600 font-light">Paid Invoices</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-light text-black">{totalHours.toFixed(1)}h</p>
                  <p className="text-sm text-gray-600 font-light">Total Hours</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-gray-900">{payment.taskTitle}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-gray-600">{payment.property} • {formatDate(payment.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-600">{getPaymentMethodLabel(payment.paymentMethod)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VendorPaymentHistory;
