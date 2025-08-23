import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Building2,
  Home,
  User,
  Shield,
  Award,
  MessageSquare,
  FileText,
  CreditCard,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  Download,
  Share,
  RefreshCw,
  Minus,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    rent: '',
    leaseStart: '',
    leaseEnd: '',
    status: 'active',
    paymentStatus: 'current',
    paymentHistory: 'good',
    emergencyContact: '',
    emergencyPhone: '',
    pets: 'no',
    vehicleInfo: '',
    employmentStatus: 'employed',
    employer: '',
    annualIncome: '',
    references: '',
    notes: ''
  });

  const tenants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      property: 'Oak Street Apartments',
      unit: '4B',
      rent: 1200,
      leaseStart: '2023-03-01',
      leaseEnd: '2024-03-01',
      status: 'active',
      paymentStatus: 'current',
      avatar: '/placeholder.svg',
      paymentHistory: 'excellent',
      maintenanceRequests: 2,
      tenantRating: 4.8,
      leaseDaysRemaining: 89,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01',
      totalPaid: 13200,
      latePayments: 0,
      communicationScore: 95,
      propertyValue: 2800000,
      monthlyExpenses: 8500
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '(555) 234-5678',
      property: 'Downtown Lofts',
      unit: '12',
      rent: 1800,
      leaseStart: '2023-06-15',
      leaseEnd: '2024-06-15',
      status: 'active',
      paymentStatus: 'current',
      avatar: '/placeholder.svg',
      paymentHistory: 'good',
      maintenanceRequests: 1,
      tenantRating: 4.6,
      leaseDaysRemaining: 156,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01',
      totalPaid: 19800,
      latePayments: 1,
      communicationScore: 88,
      propertyValue: 1800000,
      monthlyExpenses: 4500
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '(555) 345-6789',
      property: 'Riverside Complex',
      unit: '8A',
      rent: 1400,
      leaseStart: '2023-01-01',
      leaseEnd: '2024-01-01',
      status: 'active',
      paymentStatus: 'late',
      avatar: '/placeholder.svg',
      paymentHistory: 'fair',
      maintenanceRequests: 3,
      tenantRating: 4.2,
      leaseDaysRemaining: 0,
      lastPayment: '2023-12-15',
      nextPayment: '2024-01-15',
      totalPaid: 15400,
      latePayments: 2,
      communicationScore: 75,
      propertyValue: 2800000,
      monthlyExpenses: 7200
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '(555) 456-7890',
      property: 'Suburban Homes',
      unit: '15',
      rent: 1600,
      leaseStart: '2023-09-01',
      leaseEnd: '2024-09-01',
      status: 'expiring',
      paymentStatus: 'current',
      avatar: '/placeholder.svg',
      paymentHistory: 'excellent',
      maintenanceRequests: 0,
      tenantRating: 4.9,
      leaseDaysRemaining: 245,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01',
      totalPaid: 17600,
      latePayments: 0,
      communicationScore: 98,
      propertyValue: 1200000,
      monthlyExpenses: 3800
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@email.com',
      phone: '(555) 567-8901',
      property: 'Oak Street Apartments',
      unit: '2C',
      rent: 1300,
      leaseStart: '2023-04-01',
      leaseEnd: '2024-04-01',
      status: 'active',
      paymentStatus: 'current',
      avatar: '/placeholder.svg',
      paymentHistory: 'good',
      maintenanceRequests: 1,
      tenantRating: 4.7,
      leaseDaysRemaining: 119,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01',
      totalPaid: 14300,
      latePayments: 0,
      communicationScore: 92,
      propertyValue: 2800000,
      monthlyExpenses: 8500
    },
    {
      id: 6,
      name: 'James Thompson',
      email: 'james.thompson@email.com',
      phone: '(555) 678-9012',
      property: 'Harbor View Condos',
      unit: '7B',
      rent: 2200,
      leaseStart: '2023-08-01',
      leaseEnd: '2024-08-01',
      status: 'active',
      paymentStatus: 'current',
      avatar: '/placeholder.svg',
      paymentHistory: 'excellent',
      maintenanceRequests: 0,
      tenantRating: 5.0,
      leaseDaysRemaining: 212,
      lastPayment: '2024-01-01',
      nextPayment: '2024-02-01',
      totalPaid: 24200,
      latePayments: 0,
      communicationScore: 100,
      propertyValue: 3200000,
      monthlyExpenses: 6800
    },
    {
      id: 7,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '(555) 789-0123',
      property: 'Mountain Ridge Estates',
      unit: '3',
      rent: 1900,
      leaseStart: '2023-11-01',
      leaseEnd: '2024-11-01',
      status: 'active',
      paymentStatus: 'overdue',
      avatar: '/placeholder.svg',
      paymentHistory: 'poor',
      maintenanceRequests: 4,
      tenantRating: 3.8,
      leaseDaysRemaining: 304,
      lastPayment: '2023-12-01',
      nextPayment: '2024-01-01',
      totalPaid: 19000,
      latePayments: 3,
      communicationScore: 65,
      propertyValue: 2800000,
      monthlyExpenses: 5200
    }
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || tenant.paymentStatus === paymentFilter;
    const matchesProperty = propertyFilter === 'all' || tenant.property === propertyFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesProperty;
  });

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const lateTenants = tenants.filter(t => t.paymentStatus === 'late' || t.paymentStatus === 'overdue').length;
  const expiringLeases = tenants.filter(t => t.status === 'expiring').length;
  const totalMonthlyRent = tenants.reduce((sum, t) => sum + t.rent, 0);
  const avgTenantRating = tenants.reduce((sum, t) => sum + t.tenantRating, 0) / tenants.length;
  const totalLatePayments = tenants.reduce((sum, t) => sum + t.latePayments, 0);
  const avgCommunicationScore = tenants.reduce((sum, t) => sum + t.communicationScore, 0) / tenants.length;

  const properties = [
    'All Properties',
    'Oak Street Apartments',
    'Downtown Lofts',
    'Riverside Complex',
    'Suburban Homes',
    'Harbor View Condos',
    'Mountain Ridge Estates'
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expiring': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800 border-green-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    return 'bg-green-100 text-red-800 border-green-200';
  };

  // Add Tenant Modal Helper Functions
  const handleInputChange = (field: string, value: string) => {
    setNewTenant(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      property: '',
      unit: '',
      rent: '',
      leaseStart: '',
      leaseEnd: '',
      status: 'active',
      paymentStatus: 'current',
      paymentHistory: 'good',
      emergencyContact: '',
      emergencyPhone: '',
      pets: 'no',
      vehicleInfo: '',
      employmentStatus: 'employed',
      employer: '',
      annualIncome: '',
      references: '',
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
        return newTenant.name && newTenant.email && newTenant.phone && newTenant.property && newTenant.unit && newTenant.rent;
      case 2:
        return newTenant.leaseStart && newTenant.leaseEnd;
      case 3:
        return newTenant.emergencyContact && newTenant.emergencyPhone;
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
      
      console.log('New Tenant Data:', newTenant);
      alert('Tenant added successfully!');
      
      resetForm();
      setShowAddTenantModal(false);
    } catch (error) {
      console.error('Error adding tenant:', error);
      alert('Error adding tenant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8 border border-purple-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tenant Management 👥
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage your tenant relationships, track payments, and monitor lease agreements. Build strong partnerships with your tenants for long-term success.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{totalTenants} tenants managed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Tenant Analytics
              </Button>
              <Dialog open={showAddTenantModal} onOpenChange={setShowAddTenantModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Users className="h-6 w-6 text-purple-600" />
                      Add New Tenant
                    </DialogTitle>
                    <DialogDescription>
                      Complete the form below to add a new tenant to your property management system.
                    </DialogDescription>
                    
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step < currentStep ? 'bg-green-500 text-white' : 
                              step === currentStep ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
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
                      <span className={currentStep === 1 ? 'text-purple-600 font-medium' : ''}>Basic Info</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 2 ? 'text-purple-600 font-medium' : ''}>Lease Details</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 3 ? 'text-purple-600 font-medium' : ''}>Emergency & Additional</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 4 ? 'text-purple-600 font-medium' : ''}>Review & Submit</span>
                    </div>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Basic Tenant Information</h3>
                          <p className="text-gray-600">Let's start with the essential details about your tenant</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="e.g., John Doe"
                              value={newTenant.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="e.g., john.doe@email.com"
                              value={newTenant.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              placeholder="e.g., (555) 123-4567"
                              value={newTenant.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="property">Property *</Label>
                            <Select value={newTenant.property} onValueChange={(value) => handleInputChange('property', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property" />
                              </SelectTrigger>
                              <SelectContent>
                                {properties.slice(1).map((property) => (
                                  <SelectItem key={property} value={property}>
                                    {property}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="unit">Unit/Address *</Label>
                            <Input
                              id="unit"
                              placeholder="e.g., 4B or 123 Main St"
                              value={newTenant.unit}
                              onChange={(e) => handleInputChange('unit', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rent">Monthly Rent *</Label>
                            <Input
                              id="rent"
                              type="number"
                              placeholder="e.g., 1200"
                              value={newTenant.rent}
                              onChange={(e) => handleInputChange('rent', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Lease Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Lease Agreement Details</h3>
                          <p className="text-gray-600">Set up the lease terms and payment information</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="leaseStart">Lease Start Date *</Label>
                            <Input
                              id="leaseStart"
                              type="date"
                              value={newTenant.leaseStart}
                              onChange={(e) => handleInputChange('leaseStart', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="leaseEnd">Lease End Date *</Label>
                            <Input
                              id="leaseEnd"
                              type="date"
                              value={newTenant.leaseEnd}
                              onChange={(e) => handleInputChange('leaseEnd', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="status">Tenant Status</Label>
                            <Select value={newTenant.status} onValueChange={(value) => handleInputChange('status', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="expiring">Expiring Soon</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="paymentStatus">Payment Status</Label>
                            <Select value={newTenant.paymentStatus} onValueChange={(value) => handleInputChange('paymentStatus', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="current">Current</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="paymentHistory">Payment History</Label>
                          <Select value={newTenant.paymentHistory} onValueChange={(value) => handleInputChange('paymentHistory', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment history" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Emergency & Additional Information */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Emergency & Additional Information</h3>
                          <p className="text-gray-600">Important details for property management and emergencies</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                            <Input
                              id="emergencyContact"
                              placeholder="e.g., Jane Doe"
                              value={newTenant.emergencyContact}
                              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                            <Input
                              id="emergencyPhone"
                              placeholder="e.g., (555) 987-6543"
                              value={newTenant.emergencyPhone}
                              onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pets">Pets</Label>
                            <Select value={newTenant.pets} onValueChange={(value) => handleInputChange('pets', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pet policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="no">No Pets</SelectItem>
                                <SelectItem value="yes">Has Pets</SelectItem>
                                <SelectItem value="case-by-case">Case by Case</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vehicleInfo">Vehicle Information</Label>
                            <Input
                              id="vehicleInfo"
                              placeholder="e.g., 2020 Honda Civic - ABC123"
                              value={newTenant.vehicleInfo}
                              onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="employmentStatus">Employment Status</Label>
                            <Select value={newTenant.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="employed">Employed</SelectItem>
                                <SelectItem value="self-employed">Self-Employed</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="retired">Retired</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="employer">Employer</Label>
                            <Input
                              id="employer"
                              placeholder="e.g., ABC Company"
                              value={newTenant.employer}
                              onChange={(e) => handleInputChange('employer', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="annualIncome">Annual Income</Label>
                          <Input
                            id="annualIncome"
                            type="number"
                            placeholder="e.g., 75000"
                            value={newTenant.annualIncome}
                            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="references">References</Label>
                          <Textarea
                            id="references"
                            placeholder="List any references or previous landlords"
                            value={newTenant.references}
                            onChange={(e) => handleInputChange('references', e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any additional information about the tenant"
                            value={newTenant.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>
                          <p className="text-gray-600">Please review all the information before submitting</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Name:</span> {newTenant.name}</p>
                                <p><span className="font-medium">Email:</span> {newTenant.email}</p>
                                <p><span className="font-medium">Phone:</span> {newTenant.phone}</p>
                                <p><span className="font-medium">Property:</span> {newTenant.property}</p>
                                <p><span className="font-medium">Unit:</span> {newTenant.unit}</p>
                                <p><span className="font-medium">Rent:</span> ${newTenant.rent}/month</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Lease Details</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Start Date:</span> {newTenant.leaseStart}</p>
                                <p><span className="font-medium">End Date:</span> {newTenant.leaseEnd}</p>
                                <p><span className="font-medium">Status:</span> {newTenant.status}</p>
                                <p><span className="font-medium">Payment Status:</span> {newTenant.paymentStatus}</p>
                                <p><span className="font-medium">Payment History:</span> {newTenant.paymentHistory}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Additional Information</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><span className="font-medium">Emergency Contact:</span> {newTenant.emergencyContact} ({newTenant.emergencyPhone})</p>
                              <p><span className="font-medium">Pets:</span> {newTenant.pets}</p>
                              <p><span className="font-medium">Employment:</span> {newTenant.employmentStatus}</p>
                              {newTenant.employer && <p><span className="font-medium">Employer:</span> {newTenant.employer}</p>}
                              {newTenant.annualIncome && <p><span className="font-medium">Annual Income:</span> ${newTenant.annualIncome}</p>}
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
                          setShowAddTenantModal(false);
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
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Adding Tenant...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Add Tenant
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

      {/* Enhanced Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalTenants}</p>
                <p className="text-sm text-gray-600">Total Tenants</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2 this year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{activeTenants}</p>
                <p className="text-sm text-gray-600">Active Tenants</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {Math.round((activeTenants / totalTenants) * 100)}% of total
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{lateTenants}</p>
                <p className="text-sm text-gray-600">Late Payments</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  {totalLatePayments} total late payments
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{expiringLeases}</p>
                <p className="text-sm text-gray-600">Expiring Leases</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Next 90 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600 mb-1">${(totalMonthlyRent / 1000).toFixed(1)}K</div>
          <div className="text-sm text-gray-600 mb-1">Monthly Rent</div>
          <div className="text-xs text-emerald-600">Total collected</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
          <div className="text-2xl font-bold text-blue-600 mb-1">{avgTenantRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg. Rating</div>
          <div className="text-xs text-blue-600">Tenant rating</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">{avgCommunicationScore.toFixed(0)}%</div>
          <div className="text-sm text-gray-600 mb-1">Communication</div>
          <div className="text-xs text-purple-600">Response rate</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{totalLatePayments}</div>
          <div className="text-sm text-gray-600 mb-1">Late Payments</div>
          <div className="text-xs text-yellow-600">This year</div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tenants by name, email, or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-purple-500"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="w-40 border-gray-200">
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
              
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tenants List */}
      <div className="grid gap-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-purple-100 group-hover:border-purple-200 transition-colors duration-300">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
                      {getInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">{tenant.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-500" />
                        <span>{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        <Building2 className="h-3 w-3 mr-1" />
                        {tenant.property}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        <Home className="h-3 w-3 mr-1" />
                        Unit {tenant.unit}
                      </Badge>
                      <Badge className={getPaymentHistoryColor(tenant.paymentHistory)}>
                        <Star className="h-3 w-3 mr-1" />
                        {tenant.paymentHistory}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">${tenant.rent}</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total paid: ${tenant.totalPaid.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getLeaseStatusColor(tenant.leaseDaysRemaining)}`}>
                        {tenant.leaseDaysRemaining} days
                      </span>
                      <Badge className={getLeaseStatusBadge(tenant.leaseDaysRemaining)}>
                        {getLeaseStatusText(tenant.leaseDaysRemaining)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Ends: {new Date(tenant.leaseEnd).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">{tenant.tenantRating}</span>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="text-sm text-gray-600">
                      {tenant.maintenanceRequests} maintenance requests
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(tenant.status)}>
                      {tenant.status === 'active' ? 'Active' : 
                       tenant.status === 'expiring' ? 'Expiring Soon' : 'Inactive'}
                    </Badge>
                    <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                      {tenant.paymentStatus === 'current' ? 'Current' : 
                       tenant.paymentStatus === 'late' ? 'Late Payment' : 'Overdue'}
                    </Badge>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        View Lease
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payment History
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Tenant
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Tenant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Additional Tenant Metrics */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Communication</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold">{tenant.communicationScore}%</span>
                      <Progress value={tenant.communicationScore} className="w-16 h-2" />
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Last Payment</div>
                    <div className="font-semibold text-green-600">
                      {new Date(tenant.lastPayment).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Next Payment</div>
                    <div className="font-semibold text-blue-600">
                      {new Date(tenant.nextPayment).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Late Payments</div>
                    <div className="font-semibold text-red-600">
                      {tenant.latePayments} this year
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No tenants found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search criteria or filters' : 'Get started by adding your first tenant'}
            </p>
            <Button 
              onClick={() => setShowAddTenantModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Tenant
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tenants;
