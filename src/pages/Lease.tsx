import { useState, useEffect } from 'react';
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
  HelpCircle,
  Mail
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
  
  // Load properties and leases from localStorage on component mount
  useEffect(() => {
    const loadProperties = () => {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        try {
          const parsedProperties = JSON.parse(savedProperties);
          // Extract property names and add 'All Properties' option
          const propertyNames = ['All Properties', ...parsedProperties.map((prop: any) => prop.name)];
          setProperties(propertyNames);
        } catch (error) {
          console.error('Error parsing saved properties:', error);
          setProperties(['All Properties']);
        }
      } else {
        setProperties(['All Properties']);
      }
    };

    const loadLeases = () => {
      const savedLeases = localStorage.getItem('pms-leases');
      if (savedLeases) {
        try {
          const parsedLeases = JSON.parse(savedLeases);
          setLeases(parsedLeases);
        } catch (error) {
          console.error('Error parsing saved leases:', error);
          setLeases([]);
        }
      } else {
        setLeases([]);
      }
    };
    
    loadProperties();
    loadLeases();
    
    // Listen for storage changes to refresh data when they're updated elsewhere
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pms-properties') {
        loadProperties();
      }
      if (e.key === 'pms-leases') {
        loadLeases();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
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
    notes: '',
    pdfDocument: null as File | null
  });

  // Tenant management states
  const [showTenantOptionsModal, setShowTenantOptionsModal] = useState(false);
  const [showInviteTenantModal, setShowInviteTenantModal] = useState(false);
  const [tenantInvitation, setTenantInvitation] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [existingTenants, setExistingTenants] = useState<any[]>([]);
  const [selectedTenantOption, setSelectedTenantOption] = useState<'manual' | 'invite' | 'existing' | null>(null);

  // Enhanced lease data with more details
  const [leases, setLeases] = useState<any[]>([]);

  const [properties, setProperties] = useState<string[]>([]);

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
      notes: '',
      pdfDocument: null
    });
    setCurrentStep(1);
    setSelectedTenantOption(null);
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
    // All fields are now optional, so users can proceed to next step regardless
    return true;
  };

  // Helper function to save leases to localStorage
  const saveLeasesToStorage = (leasesToSave: any[]) => {
    try {
      localStorage.setItem('pms-leases', JSON.stringify(leasesToSave));
    } catch (error) {
      console.error('Error saving leases to localStorage:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create lease with default values for missing fields
      const leaseData = {
        id: Date.now().toString(), // Generate unique ID
        ...newLease,
        property: newLease.property || 'Unspecified Property',
        tenant: newLease.tenant || 'Unspecified Tenant',
        startDate: newLease.startDate || new Date().toISOString().split('T')[0],
        endDate: newLease.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        monthlyRent: parseFloat(newLease.monthlyRent) || 0,
        deposit: parseFloat(newLease.deposit) || 0,
        securityDeposit: parseFloat(newLease.securityDeposit) || 0,
        lateFees: parseFloat(newLease.lateFees) || 0,
        status: 'active',
        leaseType: newLease.leaseType || 'residential',
        autoRenew: newLease.autoRenew || false,
        utilities: newLease.utilities || 'included',
        parking: newLease.parking || 'included',
        petPolicy: newLease.petPolicy || 'not allowed',
        smokingPolicy: newLease.smokingPolicy || 'not allowed',
        notes: newLease.notes || '',
        pdfDocument: newLease.pdfDocument,
        // Additional fields for table display
        daysRemaining: newLease.endDate ? 
          Math.ceil((new Date(newLease.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 365,
        totalCollected: 0,
        lastPayment: new Date().toISOString().split('T')[0],
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        latePayments: 0,
        tenantRating: 5.0,
        communicationScore: 100,
        paymentHistory: 'excellent'
      };
      
      // Add new lease to the list
      const updatedLeases = [...leases, leaseData];
      setLeases(updatedLeases);
      
      // Save to localStorage
      saveLeasesToStorage(updatedLeases);
      
      console.log('New Lease Data:', leaseData);
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

  // Tenant management functions
  const loadExistingTenants = () => {
    try {
      const storedTenants = localStorage.getItem('pms-tenants');
      if (storedTenants) {
        const tenants = JSON.parse(storedTenants);
        setExistingTenants(tenants);
      }
    } catch (error) {
      console.error('Error loading existing tenants:', error);
    }
  };

  const handleTenantOptionSelect = (option: 'manual' | 'invite' | 'existing') => {
    setSelectedTenantOption(option);
    setShowTenantOptionsModal(false);
    
    if (option === 'existing') {
      loadExistingTenants();
    }
  };

  const handleInviteTenant = () => {
    setShowInviteTenantModal(true);
  };

  const handleSendInvitation = () => {
    // Simulate sending invitation
    alert(`Invitation sent to ${tenantInvitation.email}`);
    setTenantInvitation({ email: '', name: '', phone: '' });
    setShowInviteTenantModal(false);
    setSelectedTenantOption('manual');
  };

  const handleSelectExistingTenant = (tenant: any) => {
    setNewLease(prev => ({ ...prev, tenant: tenant.name }));
    setSelectedTenantOption(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setNewLease(prev => ({ ...prev, pdfDocument: file }));
    } else {
      alert('Please select a valid PDF file');
    }
  };

  return (
    <div className="space-y-8 p-1">

      
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
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
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light rounded-xl"
                onClick={() => {
                  const savedLeases = localStorage.getItem('pms-leases');
                  if (savedLeases) {
                    try {
                      const parsedLeases = JSON.parse(savedLeases);
                      setLeases(parsedLeases);
                    } catch (error) {
                      console.error('Error parsing saved leases:', error);
                    }
                  }
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light rounded-xl">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Dialog open={showAddLeaseModal} onOpenChange={setShowAddLeaseModal}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-gray-800 text-white font-light shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                    <Plus className="h-4 w-4 mr-2" />
                    New Lease
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200 shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-light text-black">
                      <FileText className="h-6 w-6 text-gray-600" />
                      Create New Lease
                    </DialogTitle>
                    <DialogDescription className="font-light text-gray-600 text-base">
                      Complete the form below to create a new lease agreement for your property.
                    </DialogDescription>
                    
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-light transition-all duration-200 ${
                              step < currentStep ? 'bg-gray-600 text-white shadow-md' : 
                              step === currentStep ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {step < currentStep ? '✓' : step}
                            </div>
                            {step < 4 && (
                              <div className={`w-16 h-0.5 mx-3 transition-all duration-200 ${
                                step < currentStep ? 'bg-gray-600' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Step Labels */}
                    <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                      <span className={`transition-all duration-200 ${currentStep === 1 ? 'text-black font-medium' : ''}`}>Basic Info</span>
                      <span className="mx-4 text-gray-300">•</span>
                      <span className={`transition-all duration-200 ${currentStep === 2 ? 'text-black font-medium' : ''}`}>Financial Terms</span>
                      <span className="mx-4 text-gray-300">•</span>
                      <span className={`transition-all duration-200 ${currentStep === 3 ? 'text-black font-medium' : ''}`}>Policies & Settings</span>
                      <span className="mx-4 text-gray-300">•</span>
                      <span className={`transition-all duration-200 ${currentStep === 4 ? 'text-black font-medium' : ''}`}>Review & Submit</span>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-light text-black mb-3">Basic Lease Information</h3>
                          <p className="text-gray-500 font-light text-base">Let's start with the essential details about the lease</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="property" className="font-light text-gray-700">Property</Label>
                            <div className="flex gap-2">
                              <Select value={newLease.property} onValueChange={(value) => handleInputChange('property', value)}>
                                <SelectTrigger className="font-light flex-1">
                                  <SelectValue placeholder="Select property" />
                                </SelectTrigger>
                                <SelectContent>
                                  {properties.slice(1).length > 0 ? (
                                    properties.slice(1).map((property) => (
                                      <SelectItem key={property} value={property}>
                                        {property}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="" disabled>
                                      No properties available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const savedProperties = localStorage.getItem('pms-properties');
                                  if (savedProperties) {
                                    try {
                                      const parsedProperties = JSON.parse(savedProperties);
                                      const propertyNames = ['All Properties', ...parsedProperties.map((prop: any) => prop.name)];
                                      setProperties(propertyNames);
                                    } catch (error) {
                                      console.error('Error parsing saved properties:', error);
                                    }
                                  }
                                }}
                                className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                title="Refresh properties list"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                            {properties.slice(1).length === 0 && (
                              <p className="text-sm text-orange-600">
                                No properties found. Please add properties first in the Properties section.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tenant" className="font-light text-gray-700">Tenant</Label>
                            {selectedTenantOption === 'manual' ? (
                              <Input
                                id="tenant"
                                placeholder="e.g., John Smith"
                                value={newLease.tenant}
                                onChange={(e) => handleInputChange('tenant', e.target.value)}
                                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                              />
                            ) : newLease.tenant ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={newLease.tenant}
                                  readOnly
                                  className="bg-gray-50"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setShowTenantOptionsModal(true)}
                                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowTenantOptionsModal(true)}
                                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                              >
                                <User className="h-4 w-4 mr-2" />
                                Select or Add Tenant
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startDate" className="font-light text-gray-700">Lease Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={newLease.startDate}
                              onChange={(e) => handleInputChange('startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endDate" className="font-light text-gray-700">Lease End Date</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={newLease.endDate}
                              onChange={(e) => handleInputChange('endDate', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="leaseType" className="font-light text-gray-700">Lease Type</Label>
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
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-light text-black mb-3">Financial Terms</h3>
                          <p className="text-gray-500 font-light text-base">Set up the financial aspects of the lease agreement</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="monthlyRent">Monthly Rent</Label>
                            <Input
                              id="monthlyRent"
                              type="number"
                              placeholder="e.g., 1800"
                              value={newLease.monthlyRent}
                              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="deposit">Security Deposit</Label>
                            <Input
                              id="deposit"
                              type="number"
                              placeholder="e.g., 1800"
                              value={newLease.deposit}
                              onChange={(e) => handleInputChange('deposit', e.target.value)}
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
                              className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                            />
                            <Label htmlFor="autoRenew">Automatically renew lease when it expires</Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Policies & Settings */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-light text-black mb-3">Policies & Settings</h3>
                          <p className="text-gray-500 font-light text-base">Configure lease policies and property rules</p>
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

                        <div className="space-y-2">
                          <Label htmlFor="pdfDocument">Lease Document (PDF)</Label>
                          <div className="space-y-2">
                            {newLease.pdfDocument ? (
                              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-800">{newLease.pdfDocument.name}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setNewLease(prev => ({ ...prev, pdfDocument: null }))}
                                  className="ml-auto h-6 px-2 text-red-600 hover:bg-red-50 border-red-200"
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-2">Upload your lease document</p>
                                <p className="text-xs text-gray-500 mb-4">PDF files only, max 10MB</p>
                                <Input
                                  id="pdfDocument"
                                  type="file"
                                  accept=".pdf"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById('pdfDocument')?.click()}
                                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                                >
                                  Choose File
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-light text-black mb-3">Review & Submit</h3>
                          <p className="text-gray-500 font-light text-base">Please review all the information before creating the lease</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-medium text-black mb-3 text-lg">Basic Information</h4>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-800">Property:</span> {newLease.property}</p>
                                <p><span className="font-medium text-gray-800">Tenant:</span> {newLease.tenant}</p>
                                <p><span className="font-medium text-gray-800">Start Date:</span> {newLease.startDate}</p>
                                <p><span className="font-medium text-gray-800">End Date:</span> {newLease.endDate}</p>
                                <p><span className="font-medium text-gray-800">Lease Type:</span> {newLease.leaseType}</p>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-medium text-black mb-3 text-lg">Financial Terms</h4>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-800">Monthly Rent:</span> {formatCurrency(Number(newLease.monthlyRent))}/month</p>
                                <p><span className="font-medium text-gray-800">Security Deposit:</span> {formatCurrency(Number(newLease.deposit))}</p>
                                <p><span className="font-medium text-gray-800">Additional Deposit:</span> {newLease.securityDeposit ? formatCurrency(Number(newLease.securityDeposit)) : 'None'}</p>
                                <p><span className="font-medium text-gray-800">Late Fees:</span> {newLease.lateFees ? formatCurrency(Number(newLease.lateFees)) : 'None'}</p>
                                <p><span className="font-medium text-gray-800">Auto-Renewal:</span> {newLease.autoRenew ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-xl border border-gray-100">
                            <h4 className="font-medium text-black mb-3 text-lg">Policies & Settings</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p><span className="font-medium text-gray-800">Utilities:</span> {newLease.utilities}</p>
                              <p><span className="font-medium text-gray-800">Parking:</span> {newLease.parking}</p>
                              <p><span className="font-medium text-gray-800">Pet Policy:</span> {newLease.petPolicy}</p>
                              <p><span className="font-medium text-gray-800">Smoking Policy:</span> {newLease.smokingPolicy}</p>
                              {newLease.notes && <p><span className="font-medium text-gray-800">Notes:</span> {newLease.notes}</p>}
                            </div>
                          </div>

                          {newLease.pdfDocument && (
                            <div className="bg-white p-4 rounded-xl border border-gray-100">
                              <h4 className="font-medium text-black mb-3 text-lg">Documents</h4>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-800">Lease Document:</span> {newLease.pdfDocument.name}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetForm();
                          setShowAddLeaseModal(false);
                        }}
                        disabled={isSubmitting}
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light rounded-xl px-6"
                      >
                        Cancel
                      </Button>
                      
                      <div className="flex items-center gap-3">
                        {currentStep > 1 && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={prevStep}
                            disabled={isSubmitting}
                            className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light rounded-xl px-6"
                          >
                            Previous
                          </Button>
                        )}
                        
                        {currentStep < 4 ? (
                          <Button 
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceedToNext() || isSubmitting}
                            className="bg-black hover:bg-gray-800 text-white font-light rounded-xl px-8 py-2"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-black hover:bg-gray-800 text-white font-light rounded-xl px-8 py-2"
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Options Modal */}
      <Dialog open={showTenantOptionsModal} onOpenChange={setShowTenantOptionsModal}>
        <DialogContent className="max-w-md rounded-3xl border border-gray-200 shadow-lg">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-light text-black mb-2">Add Tenant</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Choose how you'd like to add a tenant to this lease
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleTenantOptionSelect('manual')}
              variant="outline"
              className="w-full h-16 border-gray-200 text-gray-600 hover:bg-gray-50 font-light text-left justify-start px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Manual Entry</div>
                  <div className="text-sm text-gray-500">Type tenant details manually</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleTenantOptionSelect('invite')}
              variant="outline"
              className="w-full h-16 border-gray-200 text-gray-600 hover:bg-gray-50 font-light text-left justify-start px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Invite New Tenant</div>
                  <div className="text-sm text-gray-500">Send invitation via email</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleTenantOptionSelect('existing')}
              variant="outline"
              className="w-full h-16 border-gray-200 text-gray-600 hover:bg-gray-50 font-light text-left justify-start px-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Select Existing Tenant</div>
                  <div className="text-sm text-gray-500">Choose from your tenant list</div>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite Tenant Modal */}
      <Dialog open={showInviteTenantModal} onOpenChange={setShowInviteTenantModal}>
        <DialogContent className="max-w-md rounded-3xl border border-gray-200 shadow-lg">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-light text-black mb-2">Invite New Tenant</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Send an invitation to a new tenant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteName">Full Name (Optional)</Label>
              <Input
                id="inviteName"
                placeholder="e.g., John Smith"
                value={tenantInvitation.name}
                onChange={(e) => setTenantInvitation(prev => ({ ...prev, name: e.target.value }))}
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email Address *</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="e.g., john@example.com"
                value={tenantInvitation.email}
                onChange={(e) => setTenantInvitation(prev => ({ ...prev, email: e.target.value }))}
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invitePhone">Phone Number (Optional)</Label>
              <Input
                id="invitePhone"
                placeholder="e.g., +1 (555) 123-4567"
                value={tenantInvitation.phone}
                onChange={(e) => setTenantInvitation(prev => ({ ...prev, phone: e.target.value }))}
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowInviteTenantModal(false)}
                className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendInvitation}
                disabled={!tenantInvitation.email}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-light"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Tenants Modal */}
      {selectedTenantOption === 'existing' && (
        <Dialog open={true} onOpenChange={() => setSelectedTenantOption(null)}>
          <DialogContent className="max-w-2xl rounded-3xl border border-gray-200 shadow-lg">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-light text-black mb-2">Select Existing Tenant</DialogTitle>
              <DialogDescription className="text-gray-600 text-base">
                Choose a tenant from your existing list
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {existingTenants.length > 0 ? (
                existingTenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-black">{tenant.name}</div>
                        <div className="text-sm text-gray-600">{tenant.email}</div>
                        {tenant.property && (
                          <div className="text-xs text-gray-500">Current: {tenant.property}</div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSelectExistingTenant(tenant)}
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Select
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No existing tenants found</p>
                  <p className="text-sm">Try adding a tenant manually or inviting a new one</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedTenantOption(null)}
                className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modern Minimal Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-gray-200 group-hover:to-gray-100 transition-colors duration-200 shadow-sm border border-gray-200/50">
                <FileCheck className="h-7 w-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-extralight text-black mb-1">{activeLeases}</p>
                <p className="text-sm text-gray-600 font-light mb-2">Active Leases</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3 text-black" />
                  <span className="font-light">{Math.round((activeLeases / Math.max(leases.length, 1)) * 100)}% of total</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-gray-200 group-hover:to-gray-100 transition-colors duration-200 shadow-sm border border-gray-200/50">
                <DollarSign className="h-7 w-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-extralight text-black mb-1">{formatCurrency(totalMonthlyRent)}</p>
                <p className="text-sm text-gray-600 font-light mb-2">Monthly Rent</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="h-3 w-3 text-black" />
                  <span className="font-light">Total monthly income</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-gray-200 group-hover:to-gray-100 transition-colors duration-200 shadow-sm border border-gray-200/50">
                <Clock className="h-7 w-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-extralight text-black mb-1">{expiringSoon}</p>
                <p className="text-sm text-gray-600 font-light mb-2">Expiring Soon</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <AlertTriangle className="h-3 w-3 text-black" />
                  <span className="font-light">Within 90 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-gray-200 group-hover:to-gray-100 transition-colors duration-200 shadow-sm border border-gray-200/50">
                <FileX className="h-7 w-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-extralight text-black mb-1">{expiredLeases}</p>
                <p className="text-sm text-gray-600 font-light mb-2">Expired Leases</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingDown className="h-3 w-3 text-black" />
                  <span className="font-light">Need attention</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

            {/* Modern Minimal Additional Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group hover:border-gray-200">
          <div className="text-3xl font-extralight text-black mb-2">{formatCurrency(totalDeposits)}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Security Deposits</div>
          <div className="text-xs text-gray-500 font-light">Total held</div>
        </div>
        
        <div className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group hover:border-gray-200">
          <div className="text-3xl font-extralight text-black mb-2">{avgTenantRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Avg. Rating</div>
          <div className="text-xs text-gray-500 font-light">Lease status</div>
        </div>
        
        <div className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group hover:border-gray-200">
          <div className="text-3xl font-extralight text-black mb-2">{avgCommunicationScore.toFixed(0)}%</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Communication</div>
          <div className="text-xs text-gray-500 font-light">Response rate</div>
        </div>
        
        <div className="text-center p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group hover:border-gray-200">
          <div className="text-3xl font-extralight text-black mb-2">{formatCurrency(totalLateFees)}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Late Fees</div>
          <div className="text-xs text-gray-500 font-light">This year</div>
        </div>
      </div>

      {/* Modern Minimal Search and Filters */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by tenant, property, or lease ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl font-light"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                onClick={() => {
                  const savedLeases = localStorage.getItem('pms-leases');
                  if (savedLeases) {
                    try {
                      const parsedLeases = JSON.parse(savedLeases);
                      setLeases(parsedLeases);
                    } catch (error) {
                      console.error('Error parsing saved leases:', error);
                    }
                  }
                }}
                title="Refresh leases"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full md:w-40">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 rounded-xl font-light">
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
                <SelectTrigger className="border-gray-200 rounded-xl font-light">
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
                <SelectTrigger className="border-gray-200 rounded-xl font-light">
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
          <Card className="border-0 bg-white shadow-sm rounded-3xl">
            <CardContent className="p-0">
              <div className="rounded-3xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="border-gray-200">
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Lease ID</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Property & Tenant</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Lease Period</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Financial Details</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Status & Type</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Next Payment</TableHead>
                  <TableHead className="font-medium text-gray-700 py-4 font-light">Actions</TableHead>
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
                className="bg-black hover:bg-gray-800 text-white font-light shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3"
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
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-black">
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
                  <div key={lease.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{lease.property}</div>
                      <div className="text-sm text-gray-600">
                        Expires: {new Date(lease.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-black font-medium">
                        {lease.daysRemaining} days remaining
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Renew
                    </Button>
                  </div>
                ))}
              {expiringSoon === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-black" />
                  <p>No leases expiring soon</p>
                  <p className="text-sm">All leases are in good standing</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-black">
              <AlertTriangle className="h-5 w-5" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {leases
                .filter(lease => lease.latePayments > 0 || lease.status === 'expired')
                .map((lease) => (
                  <div key={lease.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{lease.property}</div>
                      <div className="text-sm text-gray-600">
                        {lease.latePayments > 0 
                          ? `${lease.latePayments} late payment${lease.latePayments > 1 ? 's' : ''}`
                          : 'Lease expired'
                        }
                      </div>
                      <div className="text-xs text-black font-medium">
                                                    {lease.latePayments > 0 ? `Late fees: ${formatCurrency(lease.lateFees)}` : 'Action required'}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-100">
                      {lease.latePayments > 0 ? 'Follow Up' : 'Renew'}
                    </Button>
                  </div>
                ))}
              {leases.filter(lease => lease.latePayments > 0 || lease.status === 'expired').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-black" />
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
