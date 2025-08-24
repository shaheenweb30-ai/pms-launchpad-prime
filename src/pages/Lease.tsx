import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  FileText,
  Users,
  Building2,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Star,
  Home,
  User,
  Shield,
  Award,
  MessageSquare,
  CreditCard,
  ArrowUpRight,
  Share,
  RefreshCw,
  Minus,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  CalendarDays,
  FileCheck,
  FileX,
  FileClock,
  Building,
  MapPin,
  Timer,
  CheckCircle2,
  XCircle,
  Clock4,
  AlertTriangle,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  Send,
  Archive,
  Trash2,
  Settings,
  Bell,
  HelpCircle
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

const Lease = () => {
  const { formatCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [leaseTypeFilter, setLeaseTypeFilter] = useState('all');
  const [showAddLeaseModal, setShowAddLeaseModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newLease, setNewLease] = useState({
    property: '',
    tenant: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    leaseType: 'residential',
    autoRenew: false,
    status: 'active',
    utilities: 'included',
    parking: 'included',
    petPolicy: 'not allowed',
    smokingPolicy: 'not allowed',
    securityDeposit: '',
    lateFees: '',
    notes: ''
  });

  // Enhanced lease data with more details
  const leases = [
    {
      id: 'L001',
      property: 'Oak Street Apartments - Unit 101',
      tenant: 'John Smith',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      monthlyRent: 1800,
      deposit: 1800,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 0,
      leaseType: 'residential',
      autoRenew: true,
      daysRemaining: 31,
      totalCollected: 19800,
      lastPayment: '2024-11-01',
      paymentHistory: 'excellent',
      tenantRating: 4.8,
      maintenanceRequests: 1,
      communicationScore: 95,
      propertyValue: 2800000,
      monthlyExpenses: 8500,
      lateFees: 0,
      securityDeposit: 1800,
      utilities: 'included',
      parking: 'included',
      petPolicy: 'allowed',
      smokingPolicy: 'not allowed'
    },
    {
      id: 'L002',
      property: 'Downtown Lofts - Unit 205',
      tenant: 'Sarah Johnson',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      monthlyRent: 2200,
      deposit: 2200,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 1,
      leaseType: 'residential',
      autoRenew: false,
      daysRemaining: 89,
      totalCollected: 19800,
      lastPayment: '2024-11-01',
      paymentHistory: 'good',
      tenantRating: 4.6,
      maintenanceRequests: 2,
      communicationScore: 88,
      propertyValue: 1800000,
      monthlyExpenses: 4500,
      lateFees: 50,
      securityDeposit: 2200,
      utilities: 'tenant pays',
      parking: 'included',
      petPolicy: 'not allowed',
      smokingPolicy: 'not allowed'
    },
    {
      id: 'L003',
      property: 'Riverside Complex - Unit 312',
      tenant: 'Mike Davis',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      monthlyRent: 1600,
      deposit: 1600,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 0,
      leaseType: 'residential',
      autoRenew: true,
      daysRemaining: 156,
      totalCollected: 9600,
      lastPayment: '2024-11-01',
      paymentHistory: 'excellent',
      tenantRating: 4.9,
      maintenanceRequests: 0,
      communicationScore: 98,
      propertyValue: 2800000,
      monthlyExpenses: 7200,
      lateFees: 0,
      securityDeposit: 1600,
      utilities: 'included',
      parking: 'included',
      petPolicy: 'allowed',
      smokingPolicy: 'not allowed'
    },
    {
      id: 'L004',
      property: 'Suburban Homes - 123 Main St',
      tenant: 'Lisa Wilson',
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      monthlyRent: 2800,
      deposit: 2800,
      status: 'expired',
      nextPayment: 'N/A',
      latePayments: 2,
      leaseType: 'residential',
      autoRenew: false,
      daysRemaining: -122,
      totalCollected: 30800,
      lastPayment: '2024-07-01',
      paymentHistory: 'fair',
      tenantRating: 4.2,
      maintenanceRequests: 3,
      communicationScore: 75,
      propertyValue: 1200000,
      monthlyExpenses: 3800,
      lateFees: 200,
      securityDeposit: 2800,
      utilities: 'tenant pays',
      parking: 'included',
      petPolicy: 'allowed',
      smokingPolicy: 'not allowed'
    },
    {
      id: 'L005',
      property: 'Commercial Plaza - Suite 100',
      tenant: 'Tech Solutions Inc',
      startDate: '2024-01-01',
      endDate: '2026-12-31',
      monthlyRent: 4500,
      deposit: 9000,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 0,
      leaseType: 'commercial',
      autoRenew: false,
      daysRemaining: 761,
      totalCollected: 49500,
      lastPayment: '2024-11-01',
      paymentHistory: 'excellent',
      tenantRating: 5.0,
      maintenanceRequests: 0,
      communicationScore: 100,
      propertyValue: 3200000,
      monthlyExpenses: 6800,
      lateFees: 0,
      securityDeposit: 9000,
      utilities: 'tenant pays',
      parking: 'included',
      petPolicy: 'N/A',
      smokingPolicy: 'N/A'
    },
    {
      id: 'L006',
      property: 'Harbor View Condos - Unit 7B',
      tenant: 'James Thompson',
      startDate: '2024-08-01',
      endDate: '2025-07-31',
      monthlyRent: 2200,
      deposit: 2200,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 0,
      leaseType: 'residential',
      autoRenew: true,
      daysRemaining: 212,
      totalCollected: 8800,
      lastPayment: '2024-11-01',
      paymentHistory: 'excellent',
      tenantRating: 5.0,
      maintenanceRequests: 0,
      communicationScore: 100,
      propertyValue: 3200000,
      monthlyExpenses: 6800,
      lateFees: 0,
      securityDeposit: 2200,
      utilities: 'included',
      parking: 'included',
      petPolicy: 'not allowed',
      smokingPolicy: 'not allowed'
    },
    {
      id: 'L007',
      property: 'Mountain Ridge Estates - Unit 3',
      tenant: 'Maria Garcia',
      startDate: '2024-11-01',
      endDate: '2025-10-31',
      monthlyRent: 1900,
      deposit: 1900,
      status: 'active',
      nextPayment: '2024-12-01',
      latePayments: 1,
      leaseType: 'residential',
      autoRenew: false,
      daysRemaining: 304,
      totalCollected: 1900,
      lastPayment: '2024-11-01',
      paymentHistory: 'poor',
      tenantRating: 3.8,
      maintenanceRequests: 4,
      communicationScore: 65,
      propertyValue: 2800000,
      monthlyExpenses: 5200,
      lateFees: 100,
      securityDeposit: 1900,
      utilities: 'tenant pays',
      parking: 'included',
      petPolicy: 'allowed',
      smokingPolicy: 'not allowed'
    }
  ];

  const properties = [
    'All Properties',
    'Oak Street Apartments - Unit 101',
    'Downtown Lofts - Unit 205',
    'Riverside Complex - Unit 312',
    'Suburban Homes - 123 Main St',
    'Commercial Plaza - Suite 100',
    'Harbor View Condos - Unit 7B',
    'Mountain Ridge Estates - Unit 3'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLeaseTypeColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'commercial':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeaseTypeIcon = (type: string) => {
    switch (type) {
      case 'residential':
        return <Home className="h-4 w-4 text-blue-600" />;
      case 'commercial':
        return <Building className="h-4 w-4 text-purple-600" />;
      default:
        return <Building2 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPaymentHistoryColor = (history: string) => {
    switch (history) {
      case 'excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeaseStatusColor = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'text-red-600';
    if (daysRemaining <= 30) return 'text-red-600';
    if (daysRemaining <= 90) return 'text-orange-600';
    return 'text-green-600';
  };

  const getLeaseStatusText = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'Expired';
    if (daysRemaining <= 30) return 'Expiring Soon';
    if (daysRemaining <= 90) return 'Expiring Soon';
    return 'Active';
  };

  const getLeaseStatusBadge = (daysRemaining: number) => {
    if (daysRemaining <= 0) return 'bg-red-100 text-red-800 border-red-200';
    if (daysRemaining <= 30) return 'bg-red-100 text-red-800 border-red-200';
    if (daysRemaining <= 90) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const filteredLeases = leases.filter(lease => {
    const matchesSearch = lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lease.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lease.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || lease.property === propertyFilter;
    const matchesType = leaseTypeFilter === 'all' || lease.leaseType === leaseTypeFilter;
    
    return matchesSearch && matchesStatus && matchesProperty && matchesType;
  });

  const activeLeases = leases.filter(lease => lease.status === 'active').length;
  const expiredLeases = leases.filter(lease => lease.status === 'expired').length;
  const totalMonthlyRent = leases.filter(lease => lease.status === 'active')
    .reduce((sum, lease) => sum + lease.monthlyRent, 0);
  const expiringSoon = leases.filter(lease => {
    const endDate = new Date(lease.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  }).length;
  const totalDeposits = leases.reduce((sum, lease) => sum + lease.deposit, 0);
  const avgTenantRating = leases.reduce((sum, lease) => sum + lease.tenantRating, 0) / leases.length;
  const totalLatePayments = leases.reduce((sum, lease) => sum + lease.latePayments, 0);
  const avgCommunicationScore = leases.reduce((sum, lease) => sum + lease.communicationScore, 0) / leases.length;
  const totalLateFees = leases.reduce((sum, lease) => sum + lease.lateFees, 0);

  // Add Lease Modal Helper Functions
  const handleInputChange = (field: string, value: string | boolean) => {
    setNewLease(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setNewLease({
      property: '',
      tenant: '',
      startDate: '',
      endDate: '',
      monthlyRent: '',
      deposit: '',
      leaseType: 'residential',
      autoRenew: false,
      status: 'active',
      utilities: 'included',
      parking: 'included',
      petPolicy: 'not allowed',
      smokingPolicy: 'not allowed',
      securityDeposit: '',
      lateFees: '',
      notes: ''
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return newLease.property && newLease.tenant && newLease.startDate && newLease.endDate;
      case 2:
        return newLease.monthlyRent && newLease.deposit;
      case 3:
        return newLease.securityDeposit;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('New Lease Data:', newLease);
      alert('Lease created successfully!');
      
      resetForm();
      setShowAddLeaseModal(false);
    } catch (error) {
      console.error('Error creating lease:', error);
      alert('Error creating lease. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Lease Management
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Streamline your leasing operations with modern tools and insights
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{activeLeases} active leases</span>
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
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Dialog open={showAddLeaseModal} onOpenChange={setShowAddLeaseModal}>
                <DialogTrigger asChild>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                    <Plus className="h-4 w-4 mr-2" />
                    New Lease
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <FileText className="h-6 w-6 text-blue-600" />
                      Create New Lease
                    </DialogTitle>
                    <DialogDescription>
                      Complete the form below to create a new lease agreement for your property.
                    </DialogDescription>
                    
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step < currentStep ? 'bg-green-500 text-white' : 
                              step === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {step < currentStep ? '✓' : step}
                            </div>
                            {step < 4 && (
                              <div className={`w-12 h-0.5 mx-2 ${
                                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Step Labels */}
                    <div className="flex items-center justify-center mt-2 text-xs text-gray-600">
                      <span className={currentStep === 1 ? 'text-blue-600 font-medium' : ''}>Basic Info</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 2 ? 'text-blue-600 font-medium' : ''}>Financial Terms</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 3 ? 'text-blue-600 font-medium' : ''}>Policies & Settings</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 4 ? 'text-blue-600 font-medium' : ''}>Review & Submit</span>
                    </div>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Basic Lease Information</h3>
                          <p className="text-gray-600">Let's start with the essential details about the lease</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="property">Property *</Label>
                            <Select value={newLease.property} onValueChange={(value) => handleInputChange('property', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Oak Street Apartments - Unit 101">Oak Street Apartments - Unit 101</SelectItem>
                                <SelectItem value="Downtown Lofts - Unit 205">Downtown Lofts - Unit 205</SelectItem>
                                <SelectItem value="Riverside Complex - Unit 312">Riverside Complex - Unit 312</SelectItem>
                                <SelectItem value="Suburban Homes - Unit 15">Suburban Homes - Unit 15</SelectItem>
                                <SelectItem value="Harbor View Condos - Unit 7B">Harbor View Condos - Unit 7B</SelectItem>
                                <SelectItem value="Mountain Ridge Estates - Unit 3">Mountain Ridge Estates - Unit 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tenant">Tenant Name *</Label>
                            <Input
                              id="tenant"
                              placeholder="e.g., John Smith"
                              value={newLease.tenant}
                              onChange={(e) => handleInputChange('tenant', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startDate">Lease Start Date *</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={newLease.startDate}
                              onChange={(e) => handleInputChange('startDate', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate">Lease End Date *</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={newLease.endDate}
                              onChange={(e) => handleInputChange('endDate', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="leaseType">Lease Type</Label>
                          <Select value={newLease.leaseType} onValueChange={(value) => handleInputChange('leaseType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select lease type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="short-term">Short-term</SelectItem>
                              <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Financial Terms */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Financial Terms</h3>
                          <p className="text-gray-600">Set up the financial aspects of the lease agreement</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                            <Input
                              id="monthlyRent"
                              type="number"
                              placeholder="e.g., 1800"
                              value={newLease.monthlyRent}
                              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deposit">Security Deposit *</Label>
                            <Input
                              id="deposit"
                              type="number"
                              placeholder="e.g., 1800"
                              value={newLease.deposit}
                              onChange={(e) => handleInputChange('deposit', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="securityDeposit">Additional Security Deposit</Label>
                            <Input
                              id="securityDeposit"
                              type="number"
                              placeholder="e.g., 500"
                              value={newLease.securityDeposit}
                              onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lateFees">Late Payment Fees</Label>
                            <Input
                              id="lateFees"
                              type="number"
                              placeholder="e.g., 50"
                              value={newLease.lateFees}
                              onChange={(e) => handleInputChange('lateFees', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="autoRenew">Auto-Renewal</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="autoRenew"
                              checked={newLease.autoRenew}
                              onChange={(e) => handleInputChange('autoRenew', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="autoRenew">Automatically renew lease when it expires</Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Policies & Settings */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Policies & Settings</h3>
                          <p className="text-gray-600">Configure lease policies and property rules</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="utilities">Utilities</Label>
                            <Select value={newLease.utilities} onValueChange={(value) => handleInputChange('utilities', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select utilities policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="included">Included in Rent</SelectItem>
                                <SelectItem value="tenant pays">Tenant Pays</SelectItem>
                                <SelectItem value="split">Split Between Parties</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="parking">Parking</Label>
                            <Select value={newLease.parking} onValueChange={(value) => handleInputChange('parking', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select parking policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="included">Included in Rent</SelectItem>
                                <SelectItem value="additional fee">Additional Fee</SelectItem>
                                <SelectItem value="not available">Not Available</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="petPolicy">Pet Policy</Label>
                            <Select value={newLease.petPolicy} onValueChange={(value) => handleInputChange('petPolicy', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pet policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="allowed">Pets Allowed</SelectItem>
                                <SelectItem value="not allowed">No Pets</SelectItem>
                                <SelectItem value="case-by-case">Case by Case</SelectItem>
                                <SelectItem value="additional deposit">Additional Deposit Required</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                            <Select value={newLease.smokingPolicy} onValueChange={(value) => handleInputChange('smokingPolicy', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select smoking policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="not allowed">Not Allowed</SelectItem>
                                <SelectItem value="allowed">Allowed</SelectItem>
                                <SelectItem value="designated areas">Designated Areas Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any additional terms, conditions, or special arrangements"
                            value={newLease.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
                          <p className="text-gray-600">Please review all the information before creating the lease</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Property:</span> {newLease.property}</p>
                                <p><span className="font-medium">Tenant:</span> {newLease.tenant}</p>
                                <p><span className="font-medium">Start Date:</span> {newLease.startDate}</p>
                                <p><span className="font-medium">End Date:</span> {newLease.endDate}</p>
                                <p><span className="font-medium">Lease Type:</span> {newLease.leaseType}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Financial Terms</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                                <p><span className="font-medium">Monthly Rent:</span> {formatCurrency(newLease.monthlyRent)}/month</p>
                <p><span className="font-medium">Security Deposit:</span> {formatCurrency(newLease.deposit)}</p>
                <p><span className="font-medium">Additional Deposit:</span> {newLease.securityDeposit ? formatCurrency(newLease.securityDeposit) : 'None'}</p>
                <p><span className="font-medium">Late Fees:</span> {newLease.lateFees ? formatCurrency(newLease.lateFees) : 'None'}</p>
                                <p><span className="font-medium">Auto-Renewal:</span> {newLease.autoRenew ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Policies & Settings</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><span className="font-medium">Utilities:</span> {newLease.utilities}</p>
                              <p><span className="font-medium">Parking:</span> {newLease.parking}</p>
                              <p><span className="font-medium">Pet Policy:</span> {newLease.petPolicy}</p>
                              <p><span className="font-medium">Smoking Policy:</span> {newLease.smokingPolicy}</p>
                              {newLease.notes && <p><span className="font-medium">Notes:</span> {newLease.notes}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetForm();
                          setShowAddLeaseModal(false);
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        {currentStep > 1 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={prevStep}
                            disabled={isSubmitting}
                          >
                            Previous
                          </Button>
                        )}
                        
                        {currentStep < 4 ? (
                          <Button 
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceedToNext() || isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Lease...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Create Lease
                              </div>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <FileCheck className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{activeLeases}</p>
                <p className="text-sm text-slate-600 font-medium">Active Leases</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {Math.round((activeLeases / leases.length) * 100)}% of total
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{formatCurrency(totalMonthlyRent)}</p>
                <p className="text-sm text-slate-600 font-medium">Monthly Rent</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Total monthly income
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
                <p className="text-3xl font-light text-slate-900">{expiringSoon}</p>
                <p className="text-sm text-slate-600 font-medium">Expiring Soon</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  Within 90 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                <FileX className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{expiredLeases}</p>
                <p className="text-sm text-slate-600 font-medium">Expired Leases</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  Need attention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

            {/* Modern Minimal Additional Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-3xl font-light text-slate-900 mb-2">{formatCurrency(totalDeposits)}</div>
          <div className="text-sm text-slate-600 mb-1 font-medium">Security Deposits</div>
          <div className="text-xs text-slate-500">Total held</div>
        </div>
        
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-3xl font-light text-slate-900 mb-2">{avgTenantRating.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1 font-medium">Avg. Rating</div>
          <div className="text-xs text-slate-500">Lease status</div>
        </div>
        
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-3xl font-light text-slate-900 mb-2">{avgCommunicationScore.toFixed(0)}%</div>
          <div className="text-sm text-slate-600 mb-1 font-medium">Communication</div>
          <div className="text-xs text-slate-500">Response rate</div>
        </div>
        
        <div className="text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-3xl font-light text-slate-900 mb-2">{formatCurrency(totalLateFees)}</div>
          <div className="text-sm text-slate-600 mb-1 font-medium">Late Fees</div>
          <div className="text-xs text-slate-500">This year</div>
        </div>
      </div>

      {/* Modern Minimal Search and Filters */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by tenant, property, or lease ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-40">
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue placeholder="Property" />
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
              <Select value={leaseTypeFilter} onValueChange={setLeaseTypeFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue placeholder="Lease Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

          {/* Modern Minimal Leases Table */}
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-0">
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-200">
                  <TableHead className="font-medium text-slate-700 py-4">Lease ID</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Property & Tenant</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Lease Period</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Financial Details</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Status & Type</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Next Payment</TableHead>
                  <TableHead className="font-medium text-slate-700 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeases.map((lease) => (
                  <TableRow key={lease.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="font-medium text-blue-600">{lease.id}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 max-w-[200px] truncate">{lease.property}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{lease.tenant}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="font-medium">{new Date(lease.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-gray-500">to</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="font-medium">{new Date(lease.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className={`text-xs font-medium ${getLeaseStatusColor(lease.daysRemaining)}`}>
                          {lease.daysRemaining > 0 ? `${lease.daysRemaining} days remaining` : 'Expired'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-green-600">{formatCurrency(lease.monthlyRent)}/month</div>
                        <div className="text-xs text-gray-600">
                          Deposit: {formatCurrency(lease.deposit)}
                        </div>
                        <div className="text-xs text-gray-600">
                          Total collected: {formatCurrency(lease.totalCollected)}
                        </div>
                        {lease.lateFees > 0 && (
                          <div className="text-xs text-red-600">
                            Late fees: {formatCurrency(lease.lateFees)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={getStatusColor(lease.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(lease.status)}
                            {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
                          </div>
                        </Badge>
                        <Badge className={getLeaseTypeColor(lease.leaseType)}>
                          <div className="flex items-center gap-1">
                            {getLeaseTypeIcon(lease.leaseType)}
                            {lease.leaseType.charAt(0).toUpperCase() + lease.leaseType.slice(1)}
                          </div>
                        </Badge>
                        <Badge className={getPaymentHistoryColor(lease.paymentHistory)}>
                          <Star className="h-3 w-3 mr-1" />
                          {lease.paymentHistory}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {lease.status === 'active' ? (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-blue-600">
                            {new Date(lease.nextPayment).toLocaleDateString()}
                          </div>
                          {lease.latePayments > 0 && (
                            <div className="text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {lease.latePayments} late payment{lease.latePayments > 1 ? 's' : ''}
                            </div>
                          )}
                          <div className="text-xs text-gray-600">
                            Last: {new Date(lease.lastPayment).toLocaleDateString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Lease
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Lease ID
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Lease
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Terminate Lease
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLeases.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600 mb-2">No leases found</p>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search criteria or create a new lease
              </p>
              <Button 
                onClick={() => setShowAddLeaseModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Lease
              </Button>
            </div>
          )}
            </CardContent>
          </Card>

      {/* Enhanced Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Calendar className="h-5 w-5" />
              Upcoming Renewals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {leases
                .filter(lease => {
                  const endDate = new Date(lease.endDate);
                  const today = new Date();
                  const diffTime = endDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 90 && diffDays > 0;
                })
                .map((lease) => (
                  <div key={lease.id} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50/50 hover:bg-orange-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{lease.property}</div>
                      <div className="text-sm text-gray-600">
                        Expires: {new Date(lease.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-orange-600 font-medium">
                        {lease.daysRemaining} days remaining
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Renew
                    </Button>
                  </div>
                ))}
              {expiringSoon === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>No leases expiring soon</p>
                  <p className="text-sm">All leases are in good standing</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {leases
                .filter(lease => lease.latePayments > 0 || lease.status === 'expired')
                .map((lease) => (
                  <div key={lease.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50/50 hover:bg-red-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{lease.property}</div>
                      <div className="text-sm text-gray-600">
                        {lease.latePayments > 0 
                          ? `${lease.latePayments} late payment${lease.latePayments > 1 ? 's' : ''}`
                          : 'Lease expired'
                        }
                      </div>
                      <div className="text-xs text-red-600 font-medium">
                                                    {lease.latePayments > 0 ? `Late fees: ${formatCurrency(lease.lateFees)}` : 'Action required'}
                      </div>
                    </div>
                    <Button size="sm" variant="destructive" className="hover:bg-red-700">
                      {lease.latePayments > 0 ? 'Follow Up' : 'Renew'}
                    </Button>
                  </div>
                ))}
              {leases.filter(lease => lease.latePayments > 0 || lease.status === 'expired').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p>All leases are in good standing</p>
                  <p className="text-sm">No immediate action required</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Lease;
