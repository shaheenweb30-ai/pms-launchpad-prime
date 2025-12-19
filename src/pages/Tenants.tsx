import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCurrency } from '@/contexts/CurrencyContext';
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
  const { formatCurrency } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');

  const [propertyFilter, setPropertyFilter] = useState('all');
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showTenantAnalyticsModal, setShowTenantAnalyticsModal] = useState(false);
  const [showViewProfileModal, setShowViewProfileModal] = useState(false);
  const [showViewLeaseModal, setShowViewLeaseModal] = useState(false);
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showEditTenantModal, setShowEditTenantModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
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
    paymentDue: '',

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

  const [tenants, setTenants] = useState<any[]>([]);

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = propertyFilter === 'all' || tenant.property === propertyFilter;
    
    return matchesSearch && matchesProperty;
  });

  const totalTenants = tenants.length;
  const activeTenants = tenants.length; // All tenants are considered active
  const lateTenants = 0; // No payment status tracking
  const expiringLeases = 0; // No status tracking
  const totalMonthlyRent = tenants.reduce((sum, t) => sum + t.rent, 0);
  const avgTenantRating = tenants.reduce((sum, t) => sum + t.tenantRating, 0) / tenants.length;
  const totalLatePayments = tenants.reduce((sum, t) => sum + t.latePayments, 0);
  
  
  const [properties, setProperties] = useState<string[]>(['All Properties']);

  // Manual refresh function
  const refreshTenants = () => {
    const savedTenants = localStorage.getItem('pms-tenants');
    
    if (savedTenants) {
      try {
        const parsedTenants = JSON.parse(savedTenants);
        setTenants(parsedTenants);
      } catch (error) {
        console.error('Error parsing saved tenants:', error);
        setTenants([]);
      }
    } else {
      setTenants([]);
    }
  };

  // Load properties from localStorage on component mount
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
    
    loadProperties();
    
    // Listen for storage changes to refresh properties when they're updated elsewhere
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pms-properties') {
        loadProperties();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load tenants from localStorage on component mount
  useEffect(() => {
    const loadTenants = () => {
      const savedTenants = localStorage.getItem('pms-tenants');
      
      if (savedTenants) {
        try {
          const parsedTenants = JSON.parse(savedTenants);
          setTenants(parsedTenants);
        } catch (error) {
          console.error('Error parsing initial tenants:', error);
          setTenants([]);
        }
      } else {
        setTenants([]);
      }
    };
    
    loadTenants();
    
    // Listen for storage changes to refresh tenants when they're updated elsewhere
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pms-tenants') {
        loadTenants();
      }
    };
    
    // Listen for custom tenant added events
    const handleTenantAdded = (e: CustomEvent) => {
      loadTenants();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('tenantAdded', handleTenantAdded as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tenantAdded', handleTenantAdded as EventListener);
    };
  }, []);

  // Tenant Analytics Data
  const tenantAnalytics = {
    portfolioOverview: {
      totalTenants,
      activeTenants,
      lateTenants,
      expiringLeases,
      totalMonthlyRent,
      avgTenantRating,

      totalLatePayments
    },
    paymentAnalysis: {
      currentPayments: totalTenants, // All tenants are considered current
      latePayments: 0, // No payment status tracking
      overduePayments: 0, // No payment status tracking
      totalCollected: tenants.reduce((sum, t) => sum + t.totalPaid, 0),
      averageRent: totalMonthlyRent / totalTenants,
      rentCollectionRate: 100 // All tenants are considered current
    },
    leaseAnalysis: {
      activeLeases: totalTenants, // All tenants are considered active
      expiringSoon: tenants.filter(t => t.leaseDaysRemaining <= 90 && t.leaseDaysRemaining > 0).length,
      expiredLeases: tenants.filter(t => t.leaseDaysRemaining <= 0).length,
      averageLeaseDuration: tenants.reduce((sum, t) => {
        const start = new Date(t.leaseStart);
        const end = new Date(t.leaseEnd);
        return sum + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      }, 0) / totalTenants,
      renewalRate: 0 // No historical data available yet
    },
    performanceMetrics: {
      topPerformers: tenants
        .filter(t => t.tenantRating >= 4.5)
        .sort((a, b) => b.tenantRating - a.tenantRating)
        .slice(0, 3),
      needsAttention: tenants
        .filter(t => t.paymentStatus === 'overdue' || t.leaseDaysRemaining <= 30)
        .sort((a, b) => a.leaseDaysRemaining - b.leaseDaysRemaining)
        .slice(0, 3),

    },
    propertyDistribution: {
      byProperty: properties.slice(1).map(property => ({
        name: property,
        tenantCount: tenants.filter(t => t.property === property).length,
        totalRent: tenants.filter(t => t.property === property).reduce((sum, t) => sum + t.rent, 0),
        avgRating: tenants.filter(t => t.property === property).reduce((sum, t) => sum + t.tenantRating, 0) / 
                  tenants.filter(t => t.property === property).length || 0
      })).filter(property => property.tenantCount > 0), // Only show properties with tenants
      byStatus: [
        { status: 'Active', count: totalTenants, color: 'bg-green-500' }
      ]
    }
  };

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

  const calculateTotalPaid = (tenant: any) => {
    // Calculate total paid based on rent history or use the stored value
    if (tenant.rentHistory && tenant.rentHistory.length > 0) {
      return tenant.rentHistory
        .filter((payment: any) => payment.status === 'paid')
        .reduce((sum: number, payment: any) => sum + (payment.amount || 0), 0);
    }
    return tenant.totalPaid || 0;
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
      paymentDue: '',

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
    // All fields are now optional, so users can proceed to next step regardless
    return true;
  };

  const exportTenantsPDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Tenant Portfolio Report', pageWidth / 2, 30, { align: 'center' });
      
      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 45, { align: 'center' });
      
      // Summary Statistics
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Portfolio Summary', margin, 70);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let yPosition = 85;
      
      const summaryData = [
        `Total Tenants: ${totalTenants}`,
        `Active Tenants: ${activeTenants}`,
        `Late Payments: ${lateTenants}`,
        `Expiring Leases: ${expiringLeases}`,
        `Total Monthly Rent: $${totalMonthlyRent.toLocaleString()}`,
        `Average Tenant Rating: ${avgTenantRating.toFixed(1)}/5.0`,

        `Total Late Payments This Year: ${totalLatePayments}`
      ];
      
      summaryData.forEach((item, index) => {
        pdf.text(item, margin, yPosition);
        yPosition += 8;
      });
      
      // Check if we need a new page for tenant details
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 30;
      }
      
      // Tenant Details Header
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Tenant Details', margin, yPosition);
      yPosition += 15;
      
      // Tenant Table Headers
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      const headers = ['Name', 'Property', 'Unit', 'Rent', 'Status', 'Rating', 'Lease End'];
      const columnWidths = [40, 35, 20, 25, 25, 20, 30];
      let xPosition = margin;
      
      headers.forEach((header, index) => {
        pdf.text(header, xPosition, yPosition);
        xPosition += columnWidths[index];
      });
      
      yPosition += 10;
      
      // Tenant Data
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      
      filteredTenants.forEach((tenant, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 30;
          
          // Repeat headers on new page
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          xPosition = margin;
          headers.forEach((header, headerIndex) => {
            pdf.text(header, xPosition, yPosition);
            xPosition += columnWidths[headerIndex];
          });
          yPosition += 10;
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
        }
        
        xPosition = margin;
        
        // Name (truncate if too long)
        const name = tenant.name.length > 15 ? tenant.name.substring(0, 15) + '...' : tenant.name;
        pdf.text(name, xPosition, yPosition);
        xPosition += columnWidths[0];
        
        // Property (truncate if too long)
        const property = tenant.property.length > 12 ? tenant.property.substring(0, 12) + '...' : tenant.property;
        pdf.text(property, xPosition, yPosition);
        xPosition += columnWidths[1];
        
        // Unit
        pdf.text(tenant.unit, xPosition, yPosition);
        xPosition += columnWidths[2];
        
        // Rent
        pdf.text(`$${tenant.rent}`, xPosition, yPosition);
        xPosition += columnWidths[3];
        
        // Status
        pdf.text('Active', xPosition, yPosition);
        xPosition += columnWidths[4];
        
        // Rating
        pdf.text(tenant.tenantRating.toString(), xPosition, yPosition);
        xPosition += columnWidths[5];
        
        // Lease End
        const leaseEnd = new Date(tenant.leaseEnd).toLocaleDateString();
        pdf.text(leaseEnd, xPosition, yPosition);
        
        yPosition += 8;
      });
      
      // Add page numbers
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      }
      
      // Save the PDF
      pdf.save('tenant-portfolio-report.pdf');
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Helper function to save tenants to localStorage
  const saveTenantsToStorage = (tenantsToSave: any[]) => {
    try {
      localStorage.setItem('pms-tenants', JSON.stringify(tenantsToSave));
    } catch (error) {
      console.error('Error saving tenants to localStorage:', error);
    }
  };

  // Action handler functions
  const handleViewProfile = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowViewProfileModal(true);
  };

  const handleViewLease = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowViewLeaseModal(true);
  };

  const handlePaymentHistory = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowPaymentHistoryModal(true);
  };

  const handleSendMessage = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowSendMessageModal(true);
  };

  const handleViewAnalytics = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowTenantAnalyticsModal(true);
  };

  const handleEditTenant = (tenant: any) => {
    setSelectedTenant(tenant);
    setShowEditTenantModal(true);
  };

  const handleRemoveTenant = (tenant: any) => {
    if (window.confirm(`Are you sure you want to remove ${tenant.name}? This action cannot be undone.`)) {
      const updatedTenants = tenants.filter(t => t.id !== tenant.id);
      setTenants(updatedTenants);
      saveTenantsToStorage(updatedTenants);
      alert('Tenant removed successfully!');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create new tenant object with generated ID and additional fields
      const newTenantData = {
        id: Date.now(), // Simple ID generation
        ...newTenant,
        avatar: '/placeholder.svg',

        maintenanceRequests: 0,
        tenantRating: 5.0, // Default rating for new tenants
        leaseDaysRemaining: newTenant.leaseStart && newTenant.leaseEnd ? 
          Math.ceil((new Date(newTenant.leaseEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 365,
        lastPayment: new Date().toISOString().split('T')[0],
        nextPayment: newTenant.paymentDue || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        totalPaid: 0,
        latePayments: 0,

        propertyValue: 0,
        monthlyExpenses: 0
      };
      

      
      // Add new tenant to the list
      const updatedTenants = [...tenants, newTenantData];
      setTenants(updatedTenants);
      
      // Save to localStorage
      saveTenantsToStorage(updatedTenants);
      
      console.log('New Tenant Data:', newTenantData);
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

      
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Tenant Management
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Streamline your tenant relationships with modern tools and insights
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{totalTenants} tenants managed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light"
                onClick={refreshTenants}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light"
                onClick={exportTenantsPDF}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light"
                onClick={() => setShowTenantAnalyticsModal(true)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Dialog open={showAddTenantModal} onOpenChange={setShowAddTenantModal}>
                <DialogTrigger asChild>
                  <Button className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tenant
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-light">
                      <Users className="h-6 w-6 text-gray-600" />
                      Add New Tenant
                    </DialogTitle>
                    <DialogDescription className="font-light text-gray-600">
                      Complete the form below to add a new tenant to your property management system.
                    </DialogDescription>
                    
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-light ${
                              step < currentStep ? 'bg-gray-600 text-white' : 
                              step === currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step < currentStep ? '✓' : step}
                            </div>
                            {step < 4 && (
                              <div className={`w-12 h-0.5 mx-2 ${
                                step < currentStep ? 'bg-gray-600' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Step Labels */}
                    <div className="flex items-center justify-center mt-2 text-xs text-gray-600">
                      <span className={currentStep === 1 ? 'text-black font-medium' : ''}>Basic Info</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 2 ? 'text-black font-medium' : ''}>Lease Details</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 3 ? 'text-black font-medium' : ''}>Emergency & Additional</span>
                      <span className="mx-4">•</span>
                      <span className={currentStep === 4 ? 'text-black font-medium' : ''}>Review & Submit</span>
                    </div>
                  </DialogHeader>
                  
                  <form className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-light text-black">Basic Tenant Information</h3>
                          <p className="text-gray-500 font-light">Let's start with the essential details about your tenant</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="e.g., John Doe"
                              value={newTenant.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="e.g., john.doe@email.com"
                              value={newTenant.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="e.g., (555) 123-4567"
                              value={newTenant.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="property">Property</Label>
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
                            <Label htmlFor="unit">Unit/Address</Label>
                            <Input
                              id="unit"
                              placeholder="e.g., 4B or 123 Main St"
                              value={newTenant.unit}
                              onChange={(e) => handleInputChange('unit', e.target.value)}
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
                          <h3 className="text-xl font-light text-black">Lease Agreement Details</h3>
                          <p className="text-gray-500 font-light">Set up the lease terms and payment information</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="leaseStart">Lease Start Date</Label>
                            <Input
                              id="leaseStart"
                              type="date"
                              value={newTenant.leaseStart}
                              onChange={(e) => handleInputChange('leaseStart', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="leaseEnd">Lease End Date</Label>
                            <Input
                              id="leaseEnd"
                              type="date"
                              value={newTenant.leaseEnd}
                              onChange={(e) => handleInputChange('leaseEnd', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="paymentDue">First Rent Payment</Label>
                          <Input
                            id="paymentDue"
                            type="date"
                            value={newTenant.paymentDue}
                            onChange={(e) => handleInputChange('paymentDue', e.target.value)}
                          />
                          <p className="text-sm text-gray-500">
                            Set the date for the first rent payment from this tenant
                          </p>
                        </div>
                        

                        

                      </div>
                    )}

                    {/* Step 3: Emergency & Additional Information */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-light text-black">Emergency & Additional Information</h3>
                          <p className="text-gray-500 font-light">Important details for property management and emergencies</p>
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
                          <h3 className="text-xl font-light text-black">Review & Submit</h3>
                          <p className="text-gray-500 font-light">Please review all the information before submitting</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-light text-black mb-2">Basic Information</h4>
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
                              <h4 className="font-light text-black mb-2">Lease Details</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Start Date:</span> {newTenant.leaseStart}</p>
                                <p><span className="font-medium">End Date:</span> {newTenant.leaseEnd}</p>
                                <p><span className="font-medium">First Rent Payment:</span> {newTenant.paymentDue}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-light text-black mb-2">Additional Information</h4>
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
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
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
                            className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
                          >
                            Previous
                          </Button>
                        )}
                        
                        {currentStep < 4 ? (
                          <Button 
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceedToNext() || isSubmitting}
                            className="bg-black hover:bg-gray-800 text-white font-light"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-black hover:bg-gray-800 text-white font-light"
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

      {/* Tenant Analytics Modal */}
      <Dialog open={showTenantAnalyticsModal} onOpenChange={setShowTenantAnalyticsModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-light">
              <BarChart3 className="h-6 w-6 text-gray-600" />
              Tenant Portfolio Analytics
            </DialogTitle>
            <DialogDescription className="font-light text-gray-600">
              Comprehensive insights into your tenant portfolio performance, payment trends, and lease management metrics.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="text-2xl font-extralight text-black mb-1">{tenantAnalytics.portfolioOverview.totalTenants}</div>
                <div className="text-sm text-gray-600 mb-1 font-light">Total Tenants</div>
                <div className="text-xs text-gray-600">Portfolio size</div>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="text-2xl font-extralight text-black mb-1">{tenantAnalytics.portfolioOverview.activeTenants}</div>
                <div className="text-sm text-gray-600 mb-1 font-light">Active Tenants</div>
                <div className="text-xs text-gray-600">{Math.round((tenantAnalytics.portfolioOverview.activeTenants / tenantAnalytics.portfolioOverview.totalTenants) * 100)}% of total</div>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="text-2xl font-extralight text-black mb-1">{tenantAnalytics.portfolioOverview.lateTenants}</div>
                <div className="text-sm text-gray-600 mb-1 font-light">Late Payments</div>
                <div className="text-xs text-gray-600">Need attention</div>
              </div>
              
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="text-2xl font-extralight text-black mb-1">{tenantAnalytics.portfolioOverview.expiringLeases}</div>
                <div className="text-sm text-gray-600 mb-1 font-light">Expiring Leases</div>
                <div className="text-xs text-gray-600">Next 90 days</div>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-light">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Monthly Rent</span>
                    <span className="font-light text-black">${tenantAnalytics.portfolioOverview.totalMonthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Collected</span>
                    <span className="font-light text-black">${tenantAnalytics.paymentAnalysis.totalCollected.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rent</span>
                    <span className="font-light text-black">${Math.round(tenantAnalytics.paymentAnalysis.averageRent)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rent Collection Rate</span>
                    <span className="font-light text-black">{tenantAnalytics.paymentAnalysis.rentCollectionRate.toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-light">
                    <Star className="h-5 w-5 text-gray-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-light text-black">{tenantAnalytics.portfolioOverview.avgTenantRating.toFixed(1)}/5.0</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Late Payments</span>
                    <span className="font-light text-black">{tenantAnalytics.portfolioOverview.totalLatePayments} this year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Renewal Rate</span>
                    <span className="font-light text-black">{tenantAnalytics.leaseAnalysis.renewalRate}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Analysis */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                                  <CardTitle className="flex items-center gap-2 font-light">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    Payment Status Distribution
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-extralight text-black">{tenantAnalytics.paymentAnalysis.currentPayments}</div>
                    <div className="text-sm text-gray-600 font-light">Current</div>
                    <div className="text-xs text-gray-600">On time payments</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-extralight text-black">{tenantAnalytics.paymentAnalysis.latePayments}</div>
                    <div className="text-sm text-gray-600 font-light">Late</div>
                    <div className="text-xs text-gray-600">Past due</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-extralight text-black">{tenantAnalytics.paymentAnalysis.overduePayments}</div>
                    <div className="text-sm text-gray-600 font-light">Overdue</div>
                    <div className="text-xs text-gray-600">Critical</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers & Needs Attention */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-light">
                    <Award className="h-5 w-5 text-gray-600" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tenantAnalytics.performanceMetrics.topPerformers.map((tenant, index) => (
                    <div key={tenant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-light text-gray-600">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-light text-black">{tenant.name}</div>
                          <div className="text-sm text-gray-600">{tenant.property} - Unit {tenant.unit}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-light text-black">{tenant.tenantRating}/5.0</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-light">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                    Needs Attention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tenantAnalytics.performanceMetrics.needsAttention.map((tenant, index) => (
                    <div key={tenant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-light text-gray-600">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-light text-black">{tenant.name}</div>
                          <div className="text-sm text-gray-600">{tenant.property} - Unit {tenant.unit}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-light text-black">{tenant.leaseDaysRemaining} days</div>
                        <div className="text-xs text-gray-500">Lease remaining</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Property Distribution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                                  <CardTitle className="flex items-center gap-2 font-light">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    Property Distribution
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenantAnalytics.propertyDistribution.byProperty.map((property) => (
                    <div key={property.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <div className="font-light text-black">{property.name}</div>
                        <div className="text-sm text-gray-600">{property.tenantCount} tenants</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-light text-black">${property.totalRent.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total rent</div>
                        <div className="text-xs text-gray-600">{property.avgRating.toFixed(1)} avg rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-light">
                  <Zap className="h-5 w-5 text-gray-600" />
                  Portfolio Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200">
                    <h4 className="font-light text-black mb-2">Immediate Actions</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Contact {tenantAnalytics.performanceMetrics.needsAttention.length} tenants with expiring leases</li>
                      <li>• Follow up with {tenantAnalytics.paymentAnalysis.overduePayments} overdue payments</li>
                      <li>• Review communication with low-scoring tenants</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-200">
                    <h4 className="font-light text-black mb-2">Growth Opportunities</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Renew leases for top-performing tenants</li>
                      <li>• Increase rent for properties with high demand</li>
                      <li>• Implement tenant satisfaction surveys</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Profile Modal */}
      <Dialog open={showViewProfileModal} onOpenChange={setShowViewProfileModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-extralight text-black tracking-tight">
                  Tenant Profile
                </DialogTitle>
                <DialogDescription className="text-lg font-light text-gray-600 mt-1">
                  Comprehensive overview of {selectedTenant?.name || 'the tenant'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.name}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.email}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Phone</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Property</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.property}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Unit</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.unit}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Monthly Rent</Label>
                      <p className="text-xl font-light text-black">${selectedTenant.rent}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">First Rent Payment</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.paymentDue || 'Not set'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lease Information */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Lease Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Lease Start</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.leaseStart}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Lease End</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.leaseEnd}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Maintenance Requests</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.maintenanceRequests}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Late Payments</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.latePayments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons Footer */}
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light px-8 py-3 rounded-2xl"
                  onClick={() => setShowViewProfileModal(false)}
                >
                  Close
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white font-light px-8 py-3 rounded-2xl transition-all duration-200"
                  onClick={() => {
                    setShowViewProfileModal(false);
                    setShowViewLeaseModal(true);
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Lease Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Lease Modal */}
      <Dialog open={showViewLeaseModal} onOpenChange={setShowViewLeaseModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-extralight text-black tracking-tight">
                  Lease Agreement Details
                </DialogTitle>
                <DialogDescription className="text-lg font-light text-gray-600 mt-1">
                  Complete lease information for {selectedTenant?.name || 'the tenant'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="space-y-6">
              {/* Lease Terms */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Lease Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.leaseStart}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">End Date</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.leaseEnd}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Duration</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.leaseDaysRemaining} days remaining</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Status</Label>
                      <Badge className={getLeaseStatusBadge(selectedTenant.leaseDaysRemaining)}>
                        {getLeaseStatusText(selectedTenant.leaseDaysRemaining)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Terms */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Financial Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Monthly Rent</Label>
                      <p className="text-xl font-light text-black">${selectedTenant.rent}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Total Paid</Label>
                      <p className="text-xl font-light text-black">${calculateTotalPaid(selectedTenant).toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Last Payment</Label>
                      <p className="text-xl font-light text-black">{new Date(selectedTenant.lastPayment).toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Next Payment</Label>
                      <p className="text-xl font-light text-black">{new Date(selectedTenant.nextPayment).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Information */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Property Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Property Name</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.property}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-600">Unit/Address</Label>
                      <p className="text-xl font-light text-black">{selectedTenant.unit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons Footer */}
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light px-8 py-3 rounded-2xl"
                  onClick={() => setShowViewLeaseModal(false)}
                >
                  Close
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white font-light px-8 py-3 rounded-2xl transition-all duration-200"
                  onClick={() => {
                    setShowViewLeaseModal(false);
                    setShowViewProfileModal(true);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Back to Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment History Modal */}
      <Dialog open={showPaymentHistoryModal} onOpenChange={setShowPaymentHistoryModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-extralight text-black tracking-tight">
                  Payment History
                </DialogTitle>
                <DialogDescription className="text-lg font-light text-gray-600 mt-1">
                  Complete payment records for {selectedTenant?.name || 'the tenant'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Payment Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div className="text-3xl font-light text-black">${calculateTotalPaid(selectedTenant).toLocaleString()}</div>
                      <div className="text-sm font-medium text-gray-600 mt-1">Total Paid</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div className="text-3xl font-light text-black">${selectedTenant.rent}</div>
                      <div className="text-sm font-medium text-gray-600 mt-1">Monthly Rent</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div className="text-3xl font-light text-black">{selectedTenant.latePayments}</div>
                      <div className="text-sm font-medium text-gray-600 mt-1">Late Payments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Payments */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Recent Payments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div>
                        <div className="font-medium text-black">Monthly Rent</div>
                        <div className="text-sm text-gray-600">{new Date(selectedTenant.lastPayment).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-light text-xl text-black">${selectedTenant.rent}</div>
                        <div className="text-sm font-medium text-gray-600">On time</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl border border-gray-200">
                      <div>
                        <div className="font-medium text-black">Next Payment Due</div>
                        <div className="text-sm text-gray-600">{new Date(selectedTenant.nextPayment).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-light text-xl text-black">${selectedTenant.rent}</div>
                        <div className="text-sm font-medium text-gray-600">Pending</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons Footer */}
              <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light px-8 py-3 rounded-2xl"
                  onClick={() => setShowPaymentHistoryModal(false)}
                >
                  Close
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white font-light px-8 py-3 rounded-2xl transition-all duration-200"
                  onClick={() => {
                    setShowPaymentHistoryModal(false);
                    setShowViewProfileModal(true);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Back to Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog open={showSendMessageModal} onOpenChange={setShowSendMessageModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-extralight text-black tracking-tight">
                  Send Message
                </DialogTitle>
                <DialogDescription className="text-lg font-light text-gray-600 mt-1">
                  Send a message to {selectedTenant?.name || 'the tenant'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="space-y-6">
              {/* Message Form Card */}
              <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-light">
                    <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                      <Edit className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-black">Message Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="messageSubject" className="text-sm font-medium text-gray-600">Subject</Label>
                    <Input
                      id="messageSubject"
                      placeholder="Enter message subject..."
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="messageContent" className="text-sm font-medium text-gray-600">Message</Label>
                    <Textarea
                      id="messageContent"
                      placeholder="Type your message here..."
                      rows={6}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons Footer */}
              <div className="flex items-center justify-center gap-4 pt-6">
                <Button 
                  onClick={() => setShowSendMessageModal(false)}
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light px-8 py-3 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    alert('Message sent successfully!');
                    setShowSendMessageModal(false);
                  }}
                  className="bg-black hover:bg-gray-800 text-white font-light px-8 py-3 rounded-2xl transition-all duration-200"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Modal */}
      <Dialog open={showEditTenantModal} onOpenChange={setShowEditTenantModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Edit className="h-6 w-6 text-purple-600" />
              Edit Tenant
            </DialogTitle>
            <DialogDescription>
              Update information for {selectedTenant?.name || 'the tenant'}.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Full Name</Label>
                  <Input
                    id="editName"
                    value={selectedTenant.name}
                    onChange={(e) => setSelectedTenant({...selectedTenant, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={selectedTenant.email}
                    onChange={(e) => setSelectedTenant({...selectedTenant, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input
                    id="editPhone"
                    value={selectedTenant.phone}
                    onChange={(e) => setSelectedTenant({...selectedTenant, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRent">Monthly Rent</Label>
                  <Input
                    id="editRent"
                    type="number"
                    value={selectedTenant.rent}
                    onChange={(e) => setSelectedTenant({...selectedTenant, rent: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editPaymentDue">Payment Due Date</Label>
                  <Input
                    id="editPaymentDue"
                    type="date"
                    value={selectedTenant.paymentDue || ''}
                    onChange={(e) => setSelectedTenant({...selectedTenant, paymentDue: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPaymentStatus">Payment Status</Label>
                  <Select 
                    value={selectedTenant.paymentStatus} 
                    onValueChange={(value) => setSelectedTenant({...selectedTenant, paymentStatus: value})}
                  >
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
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setShowEditTenantModal(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Calculate payment status based on payment due date
                    const today = new Date();
                    const paymentDueDate = new Date(selectedTenant.paymentDue);
                    let calculatedPaymentStatus = selectedTenant.paymentStatus;
                    
                    if (selectedTenant.paymentDue) {
                      if (today > paymentDueDate) {
                        const daysLate = Math.ceil((today.getTime() - paymentDueDate.getTime()) / (1000 * 60 * 60 * 24));
                        if (daysLate > 30) {
                          calculatedPaymentStatus = 'overdue';
                        } else {
                          calculatedPaymentStatus = 'late';
                        }
                      } else {
                        calculatedPaymentStatus = 'current';
                      }
                    }
                    
                    // Update tenant with calculated payment status
                    const updatedTenant = {
                      ...selectedTenant,
                      paymentStatus: calculatedPaymentStatus
                    };
                    
                    const updatedTenants = tenants.map(t => 
                      t.id === selectedTenant.id ? updatedTenant : t
                    );
                    setTenants(updatedTenants);
                    saveTenantsToStorage(updatedTenants);
                    alert('Tenant updated successfully!');
                    setShowEditTenantModal(false);
                  }}
                  className="bg-black hover:bg-gray-800 text-white font-light"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update Tenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Export Button */}
      <div className="lg:hidden">
        <Button 
          variant="outline" 
          className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
          onClick={exportTenantsPDF}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Tenant List'}
        </Button>
      </div>

      {/* Modern Minimal Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <Users className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{totalTenants}</p>
                <p className="text-sm text-gray-600 font-light">Total Tenants</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2 this year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">${(totalMonthlyRent / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600 font-light">Monthly Rent</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Total collected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <AlertCircle className="h-7 w-7 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-extralight text-black">{lateTenants}</p>
                <p className="text-sm text-gray-600 font-light">Late Payments</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  {totalLatePayments} total late payments
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
                <p className="text-3xl font-extralight text-black">{totalLatePayments}</p>
                <p className="text-sm text-gray-600 font-light">Late Payments</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  This year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Modern Minimal Search and Filters */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search tenants by name, email, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
              />
            </div>
            

            
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-40 border-slate-200 rounded-xl">
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
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
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
              title="Refresh properties list"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tenants List */}
      <div className="grid gap-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-lg font-light">
                      {getInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <h3 className="font-light text-xl text-black">{tenant.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{tenant.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-slate-200 text-slate-700">
                        <Building2 className="h-3 w-3 mr-1" />
                        {tenant.property}
                      </Badge>
                      <Badge variant="outline" className="border-slate-200 text-slate-700">
                        <Home className="h-3 w-3 mr-1" />
                        Unit {tenant.unit}
                      </Badge>
                      <Badge className={getPaymentHistoryColor(tenant.paymentHistory)}>
                        {tenant.paymentHistory}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-extralight text-black">{formatCurrency(tenant.rent)}</span>
                      <span className="text-sm text-gray-600">/month</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total paid: {formatCurrency(calculateTotalPaid(tenant))}
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
                      <DropdownMenuItem onClick={() => handleViewProfile(tenant)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewLease(tenant)}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Lease
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePaymentHistory(tenant)}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payment History
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendMessage(tenant)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewAnalytics(tenant)}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditTenant(tenant)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Tenant
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleRemoveTenant(tenant)}
                      >
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
                  <div className="text-center p-3 bg-gray-50 rounded-2xl">
                    <div className="text-sm text-gray-600 mb-1 font-light">Total Paid</div>
                    <div className="font-light text-black">
                      ${calculateTotalPaid(tenant).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-2xl">
                    <div className="text-sm text-gray-600 mb-1 font-light">Last Payment</div>
                    <div className="font-light text-black">
                      {new Date(tenant.lastPayment).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-2xl">
                    <div className="text-sm text-gray-600 mb-1 font-light">Next Payment</div>
                    <div className="font-light text-black">
                      {new Date(tenant.nextPayment).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-2xl">
                    <div className="text-sm text-gray-600 mb-1 font-light">Late Payments</div>
                    <div className="font-light text-black">
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
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-light text-black mb-2">No tenants found</h3>
            <p className="text-gray-500 mb-4 font-light">
              {searchQuery ? 'Try adjusting your search criteria or filters' : 'Get started by adding your first tenant'}
            </p>
            <Button 
              onClick={() => setShowAddTenantModal(true)}
              className="bg-black hover:bg-gray-800 text-white rounded-2xl px-6 py-3 font-light"
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
