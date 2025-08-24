import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
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
  Building2, 
  Users, 
  DollarSign, 
  MapPin,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Home,
  Building,
  TrendingUp,
  TrendingDown,
  Star,
  Calendar,
  Phone,
  Mail,
  Globe,
  Camera,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Shield,
  Wrench,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  Download,
  Share,
  RefreshCw,
  Minus,
  Upload,
  X,
  Info
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

const Properties = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [editPropertyImages, setEditPropertyImages] = useState<File[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  
  // Tenant management state
  const [tenants, setTenants] = useState<any[]>([]);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState<any>(null);
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    unitNumber: '',
    leaseStart: '',
    leaseEnd: '',
    monthlyRent: '',
    securityDeposit: '',
    status: 'active',
    emergencyContact: '',
    notes: ''
  });
  
  // Load properties from localStorage on component mount
  useEffect(() => {
    const loadProperties = async () => {
      const savedProperties = localStorage.getItem('pms-properties');
      if (savedProperties) {
        try {
          const parsedProperties = JSON.parse(savedProperties);
          setProperties(parsedProperties);
        } catch (error) {
          console.error('Error parsing saved properties:', error);
          setProperties([]);
        }
      } else {
        // Add some sample properties if none exist
        const sampleProperties = [
          {
            id: 1,
            name: 'Oak Street Apartments',
            address: '123 Oak Street, Downtown',
            city: 'Downtown',
            type: 'Apartment',
            units: 24,
            occupiedUnits: 20,
            monthlyRent: 28800,
            image: '/placeholder.svg',
            status: 'active',
            occupancyRate: 83,
            lastInspection: '2024-01-15',
            maintenanceScore: 95,
            yearBuilt: 2020,
            propertyValue: 2800000,
            monthlyExpenses: 8500,
            netIncome: 20300,
            roi: 8.7,
            trend: 'up',
            change: '+2.3%'
          },
          {
            id: 2,
            name: 'Riverside Complex',
            address: '456 River Road, Midtown',
            city: 'Midtown',
            type: 'Complex',
            units: 48,
            occupiedUnits: 42,
            monthlyRent: 52000,
            image: '/placeholder.svg',
            status: 'active',
            occupancyRate: 88,
            lastInspection: '2024-01-10',
            maintenanceScore: 92,
            yearBuilt: 2018,
            propertyValue: 4500000,
            monthlyExpenses: 12000,
            netIncome: 40000,
            roi: 10.7,
            trend: 'up',
            change: '+1.8%'
          }
        ];
        setProperties(sampleProperties);
        await savePropertiesToStorage(sampleProperties);
      }
    };
    
    loadProperties();
  }, []);
  
  // Helper function to convert File to base64 data URL
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Helper function to save properties to localStorage
  const savePropertiesToStorage = async (propertiesToSave: any[]) => {
    try {
      // Convert properties to a format that can be safely stored in localStorage
      const propertiesToStore = [];
      
      for (const property of propertiesToSave) {
        if (property.images && property.images.length > 0) {
          // Convert File objects to base64 data URLs for storage
          const imagesWithBase64 = [];
          
          for (const img of property.images) {
            if (img.file && img.file instanceof File) {
              const base64 = await fileToBase64(img.file);
              imagesWithBase64.push({
                id: img.id,
                name: img.name,
                url: base64,
                // Don't store the File object as it can't be serialized
              });
            } else {
              // If it's already a base64 URL, keep it
              imagesWithBase64.push(img);
            }
          }
          
          propertiesToStore.push({
            ...property,
            images: imagesWithBase64,
            image: imagesWithBase64[0]?.url || '/placeholder.svg'
          });
        } else {
          propertiesToStore.push({
            ...property,
            image: property.image || '/placeholder.svg'
          });
        }
      }
      
      localStorage.setItem('pms-properties', JSON.stringify(propertiesToStore));
    } catch (error) {
      console.error('Error saving properties to localStorage:', error);
    }
  };

  // Helper function to export portfolio as PDF
  const exportPortfolioPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;
      let yPosition = 20;
      
      // PDF Header
      pdf.setFontSize(24);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Property Portfolio Report', 20, yPosition);
      
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, yPosition);
      
      yPosition += 20;
      
      // Portfolio Summary Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Portfolio Summary', 20, yPosition);
      
      yPosition += 15;
      pdf.setFontSize(11);
      
      // Summary stats
      const summaryData = [
        ['Total Properties:', totalProperties.toString()],
        ['Total Units:', `${totalOccupied}/${totalUnits}`],
        ['Occupancy Rate:', totalUnits === 0 ? 'N/A' : `${Math.round((totalOccupied / totalUnits) * 100)}%`],
        ['Monthly Revenue:', `$${totalRevenue.toLocaleString()}`],
        ['Portfolio Value:', `$${totalValue.toLocaleString()}`],
        ['Average ROI:', `${avgROI.toFixed(1)}%`]
      ];
      
      summaryData.forEach(([label, value]) => {
        pdf.text(label, 20, yPosition);
        pdf.text(value, 120, yPosition);
        yPosition += 8;
      });
      
      yPosition += 15;
      
      // Properties Details Section
      if (properties.length > 0) {
        pdf.setFontSize(16);
        pdf.setTextColor(40, 40, 40);
        pdf.text('Property Details', 20, yPosition);
        yPosition += 15;
        
        properties.forEach((property, index) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = 20;
          }
          
          // Property header
          pdf.setFontSize(14);
          pdf.setTextColor(34, 34, 34);
          pdf.text(`${index + 1}. ${property.name}`, 20, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(10);
          pdf.setTextColor(80, 80, 80);
          
          // Property details
          const propertyData = [
            ['Address:', property.address],
            ['Type:', property.type],
            ['Units:', `${property.occupiedUnits}/${property.units} occupied`],
            ['Status:', property.status.charAt(0).toUpperCase() + property.status.slice(1)],
            ['Monthly Rent:', `$${property.monthlyRent.toLocaleString()}`],
            ['Monthly Expenses:', `$${(property.monthlyExpenses || 0).toLocaleString()}`],
            ['Net Income:', `$${property.netIncome.toLocaleString()}`],
            ['ROI:', `${property.roi}%`],
            ['Occupancy Rate:', `${property.occupancyRate}%`],
            ['Maintenance Score:', `${property.maintenanceScore}%`],
            ['Year Built:', property.yearBuilt ? property.yearBuilt.toString() : 'N/A'],
            ['Property Value:', property.propertyValue ? `$${property.propertyValue.toLocaleString()}` : 'N/A'],
            ['Last Inspection:', new Date(property.lastInspection).toLocaleDateString()]
          ];
          
          propertyData.forEach(([label, value]) => {
            if (yPosition > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(`  ${label}`, 25, yPosition);
            pdf.text(value, 120, yPosition);
            yPosition += 7;
          });
          
          yPosition += 10;
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.text('No properties found in your portfolio.', 20, yPosition);
      }
      
      // Add footer to all pages
      const totalPages = pdf.internal.pages.length - 1; // -1 because pages array includes a null first element
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 40, pageHeight - 10);
        pdf.text('PMS Launchpad - Property Management System', 20, pageHeight - 10);
      }
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');
      const filename = `portfolio-report-${timestamp}.pdf`;
      
      // Save the PDF
      pdf.save(filename);
      
      toast.success('Portfolio exported successfully!', {
        description: `Downloaded as ${filename}`,
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      toast.error('Failed to export portfolio. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  // Property action modals state
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showPortfolioAnalyticsModal, setShowPortfolioAnalyticsModal] = useState(false);
  const [showTenantsModal, setShowTenantsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  
  // Form state for new property
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    type: '',
    units: '',
    description: '',
    yearBuilt: '',
    purchasePrice: '',
    monthlyRent: '',
    monthlyExpenses: '',
    managementFee: '',
    insuranceCost: '',
    propertyTax: '',
    maintenanceBudget: '',
    amenities: '',
    parkingSpaces: '',
    petPolicy: '',
    leaseDuration: '',
    securityDeposit: '',
    applicationFee: ''
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, property) => sum + (property.units || 0), 0);
  const totalOccupied = properties.reduce((sum, property) => sum + (property.occupiedUnits || 0), 0);
  const totalRevenue = properties.reduce((sum, property) => sum + (property.monthlyRent || 0), 0);
  const totalValue = properties.reduce((sum, property) => sum + (property.propertyValue || 0), 0);
  const avgROI = properties.length > 0 ? properties.reduce((sum, property) => sum + (property.roi || 0), 0) / properties.length : 0;

  // Portfolio Analytics Calculations
  const portfolioAnalytics = {
    // Basic Metrics
    totalProperties,
    totalUnits,
    totalOccupied,
    totalVacant: totalUnits - totalOccupied,
    occupancyRate: totalUnits === 0 ? 0 : Math.round((totalOccupied / totalUnits) * 100),
    
    // Financial Metrics
    totalRevenue,
    totalExpenses: properties.reduce((sum, property) => sum + (property.monthlyExpenses || 0), 0),
    totalNetIncome: properties.reduce((sum, property) => sum + (property.netIncome || 0), 0),
    totalValue,
    avgROI,
    
    // Performance Metrics
    avgOccupancyRate: properties.length > 0 ? properties.reduce((sum, property) => sum + (property.occupancyRate || 0), 0) / properties.length : 0,
    avgMaintenanceScore: properties.length > 0 ? properties.reduce((sum, property) => sum + (property.maintenanceScore || 0), 0) / properties.length : 0,
    
    // Property Type Distribution
    propertyTypeDistribution: properties.reduce((acc, property) => {
      acc[property.type] = (acc[property.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    // Status Distribution
    statusDistribution: properties.reduce((acc, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    // Top Performing Properties
    topPerformers: [...properties]
      .sort((a, b) => (b.roi || 0) - (a.roi || 0))
      .slice(0, 3),
    
    // Properties Needing Attention
    needsAttention: properties.filter(property => 
      property.occupancyRate < 80 || property.maintenanceScore < 70
    ),
    
    // Monthly Cash Flow Projection
    monthlyCashFlow: {
      gross: totalRevenue,
      expenses: properties.reduce((sum, property) => sum + (property.monthlyExpenses || 0), 0),
      net: totalRevenue - properties.reduce((sum, property) => sum + (property.monthlyExpenses || 0), 0),
      annual: (totalRevenue - properties.reduce((sum, property) => sum + (property.monthlyExpenses || 0), 0)) * 12
    },
    
    // ROI Analysis
    roiAnalysis: {
      high: properties.filter(p => (p.roi || 0) > 10).length,
      medium: properties.filter(p => (p.roi || 0) >= 5 && (p.roi || 0) <= 10).length,
      low: properties.filter(p => (p.roi || 0) < 5).length
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'vacant':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Apartment':
        return <Building2 className="h-4 w-4" />;
      case 'Complex':
        return <Building2 className="h-4 w-4" />;
      case 'Loft':
        return <Building className="h-4 w-4" />;
      case 'House':
        return <Home className="h-4 w-4" />;
      case 'Condo':
        return <Building2 className="h-4 w-4" />;
      case 'Estate':
        return <Home className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Property action handlers
  const handleViewDetails = (property: any) => {
    setSelectedProperty(property);
    setShowViewDetailsModal(true);
  };

  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
    // Pre-fill the form with existing property data
    setNewProperty({
      name: property.name,
      address: property.address.split(', ')[0], // Extract street address
      city: property.city,
      state: '', // Not stored in current property object
      zipCode: '', // Not stored in current property object
      type: property.type,
      units: property.units.toString(),
      description: '', // Not stored in current property object
      yearBuilt: property.yearBuilt?.toString() || '',
      purchasePrice: property.propertyValue?.toString() || '',
      monthlyRent: property.monthlyRent.toString(),
      monthlyExpenses: property.monthlyExpenses?.toString() || '',
      managementFee: '', // Not stored in current property object
      insuranceCost: '', // Not stored in current property object
      propertyTax: '', // Not stored in current property object
      maintenanceBudget: '', // Not stored in current property object
      amenities: '', // Not stored in current property object
      parkingSpaces: '', // Not stored in current property object
      petPolicy: '', // Not stored in current property object
      leaseDuration: '', // Not stored in current property object
      securityDeposit: '', // Not stored in current property object
      applicationFee: '' // Not stored in current property object
    });
    
    // Pre-populate images if they exist
    if (property.images && property.images.length > 0) {
      // For editing, we'll start with empty edit images since we can't convert base64 back to File objects
      // Users can re-upload images if needed
      setEditPropertyImages([]);
    } else {
      setEditPropertyImages([]);
    }
    
    setCurrentStep(1);
    setShowEditPropertyModal(true);
  };

  const handleViewAnalytics = (property: any) => {
    setSelectedProperty(property);
    setShowAnalyticsModal(true);
  };

  const handleDeleteProperty = (property: any) => {
    setSelectedProperty(property);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteProperty = async () => {
    if (selectedProperty) {
      const updatedProperties = properties.filter(p => p.id !== selectedProperty.id);
      setProperties(updatedProperties);
      await savePropertiesToStorage(updatedProperties);
      toast.success(`Property "${selectedProperty.name}" deleted successfully`);
      setShowDeleteConfirmModal(false);
      setSelectedProperty(null);
    }
  };

  const handleUpdateProperty = async () => {
    if (!selectedProperty) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the property in the array
      const updatedProperties = properties.map(p => 
        p.id === selectedProperty.id 
          ? {
              ...p,
              name: newProperty.name || 'Unnamed Property',
              address: newProperty.address && newProperty.city ? `${newProperty.address}, ${newProperty.city}` : 'Address not specified',
              city: newProperty.city || 'City not specified',
              type: newProperty.type || 'Other',
              units: parseInt(newProperty.units) || 1,
              monthlyRent: parseFloat(newProperty.monthlyRent) || 0,
              yearBuilt: newProperty.yearBuilt ? parseInt(newProperty.yearBuilt) : undefined,
              propertyValue: newProperty.purchasePrice ? parseFloat(newProperty.purchasePrice) : 0,
              monthlyExpenses: newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0,
              netIncome: (parseFloat(newProperty.monthlyRent) || 0) - (newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0),
              images: editPropertyImages.length > 0 ? editPropertyImages.map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                url: URL.createObjectURL(file),
                file: file
              })) : p.images || [],
              image: editPropertyImages.length > 0 ? URL.createObjectURL(editPropertyImages[0]) : (p.image || '/placeholder.svg')
            }
          : p
      );
      setProperties(updatedProperties);
      await savePropertiesToStorage(updatedProperties);
      
      toast.success(`Property "${newProperty.name || 'Unnamed Property'}" updated successfully!`);
      setShowEditPropertyModal(false);
      setSelectedProperty(null);
      resetForm();
      
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Error updating property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewProperty({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: '',
      units: '',
      description: '',
      yearBuilt: '',
      purchasePrice: '',
      monthlyRent: '',
      monthlyExpenses: '',
      managementFee: '',
      insuranceCost: '',
      propertyTax: '',
      maintenanceBudget: '',
      amenities: '',
      parkingSpaces: '',
      petPolicy: '',
      leaseDuration: '',
      securityDeposit: '',
      applicationFee: ''
    });
    setPropertyImages([]);
    setCurrentStep(1);
  };

  const resetEditForm = () => {
    setNewProperty({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: '',
      units: '',
      description: '',
      yearBuilt: '',
      purchasePrice: '',
      monthlyRent: '',
      monthlyExpenses: '',
      managementFee: '',
      insuranceCost: '',
      propertyTax: '',
      maintenanceBudget: '',
      amenities: '',
      parkingSpaces: '',
      petPolicy: '',
      leaseDuration: '',
      securityDeposit: '',
      applicationFee: ''
    });
    setEditPropertyImages([]);
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
    // All fields are now optional, so users can proceed through all steps
    return true;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPropertyImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentCount = editPropertyImages.length;
    const availableSlots = 3 - currentCount;
    
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image${availableSlots !== 1 ? 's' : ''}. Maximum 3 images allowed.`);
      return;
    }
    
    setEditPropertyImages(prev => [...prev, ...files]);
  };

  const removeEditImage = (index: number) => {
    setEditPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  // Tenant management functions
  const handleTenantsClick = (property: any) => {
    setSelectedProperty(property);
    // Load sample tenants for the property (in a real app, this would come from API)
    const sampleTenants = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        unitNumber: 'A101',
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31',
        monthlyRent: 1200,
        securityDeposit: 1200,
        status: 'active',
        emergencyContact: 'Jane Smith +1 (555) 987-6543',
        notes: 'Excellent tenant, always pays on time',
        rentHistory: [
          { month: 'Jan 2024', amount: 1200, status: 'paid', date: '2024-01-01' },
          { month: 'Feb 2024', amount: 1200, status: 'paid', date: '2024-02-01' },
          { month: 'Mar 2024', amount: 1200, status: 'paid', date: '2024-03-01' }
        ]
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 234-5678',
        unitNumber: 'B205',
        leaseStart: '2024-02-01',
        leaseEnd: '2025-01-31',
        monthlyRent: 1350,
        securityDeposit: 1350,
        status: 'active',
        emergencyContact: 'Mike Johnson +1 (555) 876-5432',
        notes: 'New tenant, first month completed',
        rentHistory: [
          { month: 'Feb 2024', amount: 1350, status: 'paid', date: '2024-02-01' },
          { month: 'Mar 2024', amount: 1350, status: 'paid', date: '2024-03-01' }
        ]
      }
    ];
    setTenants(sampleTenants);
    setShowTenantsModal(true);
  };

  const handleAddTenant = () => {
    setEditingTenant(null);
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      unitNumber: '',
      leaseStart: '',
      leaseEnd: '',
      monthlyRent: '',
      securityDeposit: '',
      status: 'active',
      emergencyContact: '',
      notes: ''
    });
    setShowAddTenantModal(true);
  };

  const handleEditTenant = (tenant: any) => {
    setEditingTenant(tenant);
    setNewTenant({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unitNumber: tenant.unitNumber,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd,
      monthlyRent: tenant.monthlyRent.toString(),
      securityDeposit: tenant.securityDeposit.toString(),
      status: tenant.status,
      emergencyContact: tenant.emergencyContact,
      notes: tenant.notes
    });
    setShowAddTenantModal(true);
  };

  const handleSaveTenant = () => {
    if (editingTenant) {
      // Update existing tenant
      const updatedTenants = tenants.map(t => 
        t.id === editingTenant.id 
          ? {
              ...t,
              ...newTenant,
              monthlyRent: parseFloat(newTenant.monthlyRent) || 0,
              securityDeposit: parseFloat(newTenant.securityDeposit) || 0
            }
          : t
      );
      setTenants(updatedTenants);
      toast.success(`Tenant "${newTenant.name}" updated successfully!`);
    } else {
      // Add new tenant
      const newTenantObj = {
        id: Date.now(),
        ...newTenant,
        monthlyRent: parseFloat(newTenant.monthlyRent) || 0,
        securityDeposit: parseFloat(newTenant.securityDeposit) || 0,
        rentHistory: []
      };
      setTenants(prev => [...prev, newTenantObj]);
      toast.success(`Tenant "${newTenant.name}" added successfully!`);
    }
    
    setShowAddTenantModal(false);
    setEditingTenant(null);
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      unitNumber: '',
      leaseStart: '',
      leaseEnd: '',
      monthlyRent: '',
      securityDeposit: '',
      status: 'active',
      emergencyContact: '',
      notes: ''
    });
  };

  const handleDeleteTenant = (tenant: any) => {
    const updatedTenants = tenants.filter(t => t.id !== tenant.id);
    setTenants(updatedTenants);
    toast.success(`Tenant "${tenant.name}" removed successfully!`);
  };

  const resetTenantForm = () => {
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      unitNumber: '',
      leaseStart: '',
      leaseEnd: '',
      monthlyRent: '',
      securityDeposit: '',
      status: 'active',
      emergencyContact: '',
      notes: ''
    });
    setEditingTenant(null);
  };

  // Dynamic field visibility based on property type
  const shouldShowUnits = () => {
    return ['Apartment', 'Complex', 'Condo'].includes(newProperty.type);
  };

  const shouldShowParkingSpaces = () => {
    return ['Apartment', 'Complex', 'Condo', 'House'].includes(newProperty.type);
  };

  const shouldShowYearBuilt = () => {
    return ['Apartment', 'Complex', 'Condo', 'House', 'Estate'].includes(newProperty.type);
  };

  const shouldShowManagementFee = () => {
    return ['Apartment', 'Complex', 'Condo'].includes(newProperty.type);
  };

  const shouldShowLeaseDuration = () => {
    return ['Apartment', 'Complex', 'Condo'].includes(newProperty.type);
  };

  const shouldShowSecurityDeposit = () => {
    return ['Apartment', 'Complex', 'Condo', 'House'].includes(newProperty.type);
  };

  const shouldShowApplicationFee = () => {
    return ['Apartment', 'Complex', 'Condo', 'House'].includes(newProperty.type);
  };

  const shouldShowPetPolicy = () => {
    return ['Apartment', 'Complex', 'Condo', 'House'].includes(newProperty.type);
  };

  const shouldShowMaintenanceBudget = () => {
    return ['Apartment', 'Complex', 'Condo', 'House', 'Estate'].includes(newProperty.type);
  };

  const shouldShowAmenities = () => {
    return ['Apartment', 'Complex', 'Condo', 'House', 'Estate'].includes(newProperty.type);
  };

  const handleSubmit = async () => {
    console.log('Form submitted!', newProperty);
    console.log('Property images:', propertyImages);
    
    // All fields are now optional - no validation required
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new property object with default values for empty fields
      const newPropertyObj = {
        id: properties.length + 1,
        name: newProperty.name || 'Unnamed Property',
        address: newProperty.address && newProperty.city ? `${newProperty.address}, ${newProperty.city}` : 'Address not specified',
        city: newProperty.city || 'City not specified',
        type: newProperty.type || 'Other',
        units: parseInt(newProperty.units) || 1,
        occupiedUnits: 0, // New properties start with 0 occupied units
        monthlyRent: parseFloat(newProperty.monthlyRent) || 0,
        images: propertyImages.length > 0 ? propertyImages.map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: URL.createObjectURL(file),
          file: file
        })) : [],
        image: propertyImages.length > 0 ? URL.createObjectURL(propertyImages[0]) : '/placeholder.svg',
        status: 'active',
        occupancyRate: 0, // New properties start with 0% occupancy
        lastInspection: new Date().toISOString().split('T')[0],
        maintenanceScore: 100, // New properties start with perfect maintenance score

        yearBuilt: newProperty.yearBuilt ? parseInt(newProperty.yearBuilt) : undefined,
        propertyValue: newProperty.purchasePrice ? parseFloat(newProperty.purchasePrice) : 0,
        monthlyExpenses: newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0,
        netIncome: (parseFloat(newProperty.monthlyRent) || 0) - (newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0),
        roi: 0, // New properties start with 0% ROI
        trend: 'stable',
        change: '0.0%'
      };
      
      // Add to properties array
      const updatedProperties = [...properties, newPropertyObj];
      setProperties(updatedProperties);
      await savePropertiesToStorage(updatedProperties);
      
      // Show success message
      toast.success(`Property "${newPropertyObj.name}" created successfully!`, {
        description: `${newPropertyObj.address} | ${newPropertyObj.type} | ${newPropertyObj.units} units`,
        duration: 5000,
      });
      
      // Reset form and close modal
      resetForm();
      setShowAddPropertyModal(false);
      
      // Force re-render by updating state
      setSearchQuery('');
      setStatusFilter('all');
      setTypeFilter('all');
      
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Error creating property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const PropertyCard = ({ property }: { property: typeof properties[0] }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-2xl">
      <CardHeader className="p-0 relative">
        <div className="h-48 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          {property.image && property.image !== '/placeholder.svg' ? (
            // Display the property image
            <img
              src={property.image}
              alt="Property"
              className="w-full h-full object-cover"
            />
          ) : (
            // Fallback to placeholder with icon
            <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              <Building2 className="h-16 w-16 text-blue-600 relative z-10" />
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge className={getStatusColor(property.status)}>
              {property.status === 'active' ? 'Active' : 'Maintenance'}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-white/80 text-gray-700">
              {property.occupancyRate}% Occupied
            </Badge>
          </div>

        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{property.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-blue-50">
                {getTypeIcon(property.type)}
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                {property.type}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('properties.card.actions')}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewDetails(property)}>
                <Eye className="h-4 w-4 mr-2" />
                {t('properties.card.viewDetails')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditProperty(property)}>
                <Edit className="h-4 w-4 mr-2" />
                {t('properties.card.edit')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewAnalytics(property)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteProperty(property)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                {t('properties.card.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{property.occupiedUnits}/{property.units}</div>
              <div className="text-xs text-gray-600">Units</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{property.occupancyRate}%</div>
              <div className="text-xs text-gray-600">Occupancy</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Monthly Revenue:</span>
              <span className="font-semibold text-lg text-green-600">{formatCurrency(property.monthlyRent)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Net Income:</span>
              <span className="font-semibold text-blue-600">${property.netIncome.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ROI:</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${getTrendColor(property.trend)}`}>{property.roi}%</span>
                <Badge variant="outline" className="text-xs">
                  {property.change}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Maintenance Score:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{property.maintenanceScore}%</span>
                <Progress value={property.maintenanceScore} className="w-16 h-2" />
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Last inspection: {new Date(property.lastInspection).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => handleTenantsClick(property)}
            >
              <Users className="h-4 w-4 mr-1" />
              Tenants
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => handleViewDetails(property)}
            >
              <Eye className="h-4 w-4 mr-1" />
              {t('properties.card.view')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                {t('properties.title')}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                {t('properties.description')}
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{totalProperties === 0 ? 'No properties yet' : `${totalProperties} ${t('properties.totalProperties')}`}</span>
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
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                onClick={exportPortfolioPDF}
                disabled={isExporting}
              >
                {isExporting ? (
                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                {t('properties.exporting')}
              </div>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
              </Button>
              <Button 
                variant="outline" 
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                onClick={() => setShowPortfolioAnalyticsModal(true)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Dialog open={showAddPropertyModal} onOpenChange={setShowAddPropertyModal}>
                <DialogTrigger asChild>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('properties.addProperty')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      {t('properties.addNewProperty')}
                    </DialogTitle>
                    <DialogDescription>
                      {t('properties.addPropertyDescription')}
                    </DialogDescription>
                    
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4].map((step) => (
                          <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step === currentStep
                                ? 'bg-blue-600 text-white'
                                : step < currentStep
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {step < currentStep ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                step
                              )}
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
                      <div className="flex items-center space-x-12">
                        <span className={currentStep === 1 ? 'text-blue-600 font-medium' : ''}>{t('properties.step.basic')}</span>
                        <span className={currentStep === 2 ? 'text-blue-600 font-medium' : ''}>{t('properties.step.financials')}</span>
                        <span className={currentStep === 3 ? 'text-blue-600 font-medium' : ''}>{t('properties.step.images')}</span>
                        <span className={currentStep === 4 ? 'text-blue-600 font-medium' : ''}>{t('properties.step.review')}</span>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <form className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">{t('properties.step.basic')}</h3>
                          <p className="text-gray-600">{t('properties.allFieldsOptional')}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">{t('properties.form.name')}</Label>
                            <Input
                              id="name"
                              placeholder={t('properties.form.namePlaceholder')}
                              value={newProperty.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">{t('properties.form.type')}</Label>
                            <Select value={newProperty.type} onValueChange={(value) => handleInputChange('type', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Apartment">Apartment</SelectItem>
                                <SelectItem value="Complex">Complex</SelectItem>
                                <SelectItem value="Loft">Loft</SelectItem>
                                <SelectItem value="House">House</SelectItem>
                                <SelectItem value="Condo">Condo</SelectItem>
                                <SelectItem value="Estate">Estate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {shouldShowUnits() && (
                            <div className="space-y-2">
                                                          <Label htmlFor="units">{t('properties.form.units')}</Label>
                            <Input
                              id="units"
                              type="number"
                              placeholder={t('properties.form.unitsPlaceholder')}
                              value={newProperty.units}
                              onChange={(e) => handleInputChange('units', e.target.value)}
                            />
                            </div>
                          )}
                          {shouldShowYearBuilt() && (
                            <div className="space-y-2">
                                                          <Label htmlFor="yearBuilt">{t('properties.form.yearBuilt')}</Label>
                            <Input
                              id="yearBuilt"
                              type="number"
                              placeholder={t('properties.form.yearBuiltPlaceholder')}
                              value={newProperty.yearBuilt}
                              onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                            />
                            </div>
                          )}
                          {shouldShowParkingSpaces() && (
                            <div className="space-y-2">
                              <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                              <Input
                                id="parkingSpaces"
                                type="number"
                                placeholder="e.g., 30"
                                value={newProperty.parkingSpaces}
                                onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Property Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe the property features, amenities, and unique selling points..."
                            value={newProperty.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Location Information */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Location Details</h3>
                          <p className="text-gray-600">Where is your property located? (all fields are optional)</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              placeholder="e.g., 123 Oak Street"
                              value={newProperty.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="e.g., Downtown"
                                value={newProperty.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="e.g., CA"
                                value={newProperty.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">ZIP Code</Label>
                              <Input
                                id="zipCode"
                                placeholder="e.g., 90210"
                                value={newProperty.zipCode}
                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Financial Information */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Financial Details</h3>
                          <p className="text-gray-600">Let's talk about the financial aspects of your property (all fields are optional)</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="purchasePrice">Purchase Price</Label>
                            <Input
                              id="purchasePrice"
                              type="number"
                              placeholder="e.g., 2800000"
                              value={newProperty.purchasePrice}
                              onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyRent">Monthly Rent Income</Label>
                            <Input
                              id="monthlyRent"
                              type="number"
                              placeholder="e.g., 28800"
                              value={newProperty.monthlyRent}
                              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                            <Input
                              id="monthlyExpenses"
                              type="number"
                              placeholder="e.g., 8500"
                              value={newProperty.monthlyExpenses}
                              onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="managementFee">Management Fee (%)</Label>
                            <Input
                              id="managementFee"
                              type="number"
                              placeholder="e.g., 8"
                              value={newProperty.managementFee}
                              onChange={(e) => handleInputChange('managementFee', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="insuranceCost">Monthly Insurance</Label>
                            <Input
                              id="insuranceCost"
                              type="number"
                              placeholder="e.g., 1200"
                              value={newProperty.insuranceCost}
                              onChange={(e) => handleInputChange('insuranceCost', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="propertyTax">Monthly Property Tax</Label>
                            <Input
                              id="propertyTax"
                              type="number"
                              placeholder="e.g., 2000"
                              value={newProperty.propertyTax}
                              onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        {shouldShowLeaseDuration() && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="leaseDuration">Lease Duration (months)</Label>
                              <Input
                                id="leaseDuration"
                                type="number"
                                placeholder="e.g., 12"
                                value={newProperty.leaseDuration}
                                onChange={(e) => handleInputChange('leaseDuration', e.target.value)}
                              />
                            </div>
                            {shouldShowSecurityDeposit() && (
                              <div className="space-y-2">
                                <Label htmlFor="securityDeposit">Security Deposit</Label>
                                <Input
                                  id="securityDeposit"
                                  type="number"
                                  placeholder="e.g., 1200"
                                  value={newProperty.securityDeposit}
                                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {shouldShowApplicationFee() && (
                          <div className="space-y-2">
                            <Label htmlFor="applicationFee">Application Fee</Label>
                            <Input
                              id="applicationFee"
                              type="number"
                              placeholder="e.g., 50"
                              value={newProperty.applicationFee}
                              onChange={(e) => handleInputChange('applicationFee', e.target.value)}
                            />
                          </div>
                        )}
                        
                        {shouldShowPetPolicy() && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="petPolicy">Pet Policy</Label>
                              <Select value={newProperty.petPolicy} onValueChange={(value) => handleInputChange('petPolicy', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select pet policy" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="allowed">Pets Allowed</SelectItem>
                                  <SelectItem value="not-allowed">No Pets</SelectItem>
                                  <SelectItem value="case-by-case">Case by Case</SelectItem>
                                  <SelectItem value="cats-only">Cats Only</SelectItem>
                                  <SelectItem value="dogs-only">Dogs Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {shouldShowMaintenanceBudget() && (
                              <div className="space-y-2">
                                <Label htmlFor="maintenanceBudget">Monthly Maintenance Budget</Label>
                                <Input
                                  id="maintenanceBudget"
                                  type="number"
                                  placeholder="e.g., 1500"
                                  value={newProperty.maintenanceBudget}
                                  onChange={(e) => handleInputChange('maintenanceBudget', e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {shouldShowAmenities() && (
                          <div className="space-y-2">
                            <Label htmlFor="amenities">Amenities & Features</Label>
                            <Textarea
                              id="amenities"
                              placeholder="List amenities like gym, pool, laundry, parking, etc."
                              value={newProperty.amenities}
                              onChange={(e) => handleInputChange('amenities', e.target.value)}
                              rows={2}
                            />
                          </div>
                        )}
                        
                        {shouldShowPetPolicy() && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="petPolicy">Pet Policy</Label>
                              <Select value={newProperty.petPolicy} onValueChange={(value) => handleInputChange('petPolicy', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select pet policy" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="allowed">Pets Allowed</SelectItem>
                                  <SelectItem value="not-allowed">No Pets</SelectItem>
                                  <SelectItem value="case-by-case">Case by Case</SelectItem>
                                  <SelectItem value="cats-only">Cats Only</SelectItem>
                                  <SelectItem value="dogs-only">Dogs Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {shouldShowMaintenanceBudget() && (
                              <div className="space-y-2">
                                <Label htmlFor="maintenanceBudget">Monthly Maintenance Budget</Label>
                                <Input
                                  id="maintenanceBudget"
                                  type="number"
                                  placeholder="e.g., 1500"
                                  value={newProperty.maintenanceBudget}
                                  onChange={(e) => handleInputChange('maintenanceBudget', e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        
                        {shouldShowAmenities() && (
                          <div className="space-y-2">
                            <Label htmlFor="amenities">Amenities & Features</Label>
                            <Textarea
                              id="amenities"
                              placeholder="List amenities like gym, pool, laundry, parking, etc."
                              value={newProperty.amenities}
                              onChange={(e) => handleInputChange('amenities', e.target.value)}
                              rows={2}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 4: Images */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Property Images</h3>
                          <p className="text-gray-600">Upload photos to showcase your property (optional)</p>
                        </div>
                        
                        {/* Image Upload Area */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-2">
                              Click to upload images
                            </p>
                            <p className="text-gray-600">
                              Upload multiple images (JPG, PNG, GIF) up to 10MB each
                            </p>
                          </label>
                        </div>
                        
                        {/* Uploaded Images Preview */}
                        {propertyImages.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Uploaded Images ({propertyImages.length})</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {propertyImages.map((file, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Property image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                  <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetForm();
                          setShowAddPropertyModal(false);
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
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            {t('properties.form.next')}
                          </Button>
                        ) : (
                          <Button 
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Property...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                {t('properties.form.createProperty')}
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

      {/* View Property Details Modal */}
      <Dialog open={showViewDetailsModal} onOpenChange={setShowViewDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Building2 className="h-6 w-6 text-blue-600" />
              {t('properties.details.title')}
            </DialogTitle>
            <DialogDescription>
              Complete information about {selectedProperty?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="space-y-6 py-4">
              {/* Property Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{selectedProperty.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(selectedProperty.status)}>
                        {selectedProperty.status === 'active' ? 'Active' : 'Maintenance'}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {selectedProperty.type}
                      </Badge>
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        {selectedProperty.units} units
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      ${selectedProperty.monthlyRent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                </div>
              </div>

              {/* Property Images Gallery */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">{t('properties.images.title')}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProperty.images.map((img: any, index: number) => (
                      <div key={img.id || index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          {img.url && img.url !== '/placeholder.svg' ? (
                            <img
                              src={img.url}
                              alt={img.name || `Property image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <div className="text-center">
                                <Camera className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Image {index + 1}</p>
                                <p className="text-xs text-gray-400">{img.name || 'Property Image'}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                            {index + 1}/{selectedProperty.images.length}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {selectedProperty.images.length} image{selectedProperty.images.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{selectedProperty.occupancyRate}%</div>
                  <div className="text-sm text-gray-600">Occupancy Rate</div>
                  <div className="text-xs text-gray-500">{selectedProperty.occupiedUnits}/{selectedProperty.units} units</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">${selectedProperty.netIncome.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Net Monthly Income</div>
                  <div className="text-xs text-gray-500">After expenses</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{selectedProperty.roi}%</div>
                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-xs text-gray-500">Return on Investment</div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built:</span>
                      <span className="font-medium">{selectedProperty.yearBuilt || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value:</span>
                      <span className="font-medium">${selectedProperty.propertyValue?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Expenses:</span>
                      <span className="font-medium">${selectedProperty.monthlyExpenses?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Inspection:</span>
                      <span className="font-medium">{new Date(selectedProperty.lastInspection).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance Score:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedProperty.maintenanceScore}%</span>
                        <Progress value={selectedProperty.maintenanceScore} className="w-16 h-2" />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Trend:</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getTrendColor(selectedProperty.trend)}`}>
                          {selectedProperty.change}
                        </span>
                        {getTrendIcon(selectedProperty.trend)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDetailsModal(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowViewDetailsModal(false);
                handleEditProperty(selectedProperty);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Property Modal */}
      <Dialog open={showEditPropertyModal} onOpenChange={setShowEditPropertyModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Edit className="h-6 w-6 text-blue-600" />
              Edit Property
            </DialogTitle>
            <DialogDescription>
              Update the details for {selectedProperty?.name}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateProperty(); }} className="space-y-6">
            {/* Step 1: Basic Information */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Basic Property Information</h3>
                <p className="text-gray-600">Update the essential details about your property</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Property Name</Label>
                  <Input
                    id="edit-name"
                    placeholder="e.g., Oak Street Apartments"
                    value={newProperty.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Property Type</Label>
                  <Select value={newProperty.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Complex">Complex</SelectItem>
                      <SelectItem value="Loft">Loft</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Estate">Estate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-units">Number of Units</Label>
                  <Input
                    id="edit-units"
                    type="number"
                    placeholder="e.g., 24"
                    value={newProperty.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-yearBuilt">Year Built</Label>
                  <Input
                    id="edit-yearBuilt"
                    type="number"
                    placeholder="e.g., 2020"
                    value={newProperty.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-monthlyRent">Monthly Rent</Label>
                  <Input
                    id="edit-monthlyRent"
                    type="number"
                    placeholder="e.g., 28800"
                    value={newProperty.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Street Address</Label>
                  <Input
                    id="edit-address"
                    placeholder="e.g., 123 Oak Street"
                    value={newProperty.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    placeholder="e.g., Downtown"
                    value={newProperty.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-purchasePrice">Purchase Price</Label>
                  <Input
                    id="edit-purchasePrice"
                    type="number"
                    placeholder="e.g., 2800000"
                    value={newProperty.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-monthlyExpenses">Monthly Expenses</Label>
                  <Input
                    id="edit-monthlyExpenses"
                    type="number"
                    placeholder="e.g., 8500"
                    value={newProperty.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Image Management Section */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Property Images</h3>
                  <p className="text-gray-600">Manage your property images (maximum 3 images)</p>
                </div>
                
                {/* Current Images Display */}
                {selectedProperty && selectedProperty.images && selectedProperty.images.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Current Images ({selectedProperty.images.length}/3)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedProperty.images.map((img: any, index: number) => (
                        <div key={img.id || index} className="relative group">
                          <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center">
                              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">Image {index + 1}</p>
                              <p className="text-xs text-gray-400">{img.name || 'Property Image'}</p>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-white/80 text-gray-700">
                              Current
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Current images will be preserved. Upload new images to replace them.
                    </p>
                  </div>
                )}
                
                {/* New Images Upload */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Upload New Images ({editPropertyImages.length}/3)</h4>
                  
                  {editPropertyImages.length < 3 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleEditImageUpload}
                        className="hidden"
                        id="edit-image-upload"
                      />
                      <label htmlFor="edit-image-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Click to upload new images
                        </p>
                        <p className="text-xs text-gray-600">
                          Upload up to {3 - editPropertyImages.length} more image{(3 - editPropertyImages.length) !== 1 ? 's' : ''} (JPG, PNG, GIF)
                        </p>
                      </label>
                    </div>
                  )}
                  
                  {/* Uploaded New Images Preview */}
                  {editPropertyImages.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-700">New Images Preview</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {editPropertyImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`New property image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeEditImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary" className="bg-white/80 text-blue-700">
                                New
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Image Limit Warning */}
                  {editPropertyImages.length >= 3 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Info className="h-4 w-4" />
                        <span className="text-sm font-medium">Maximum images reached</span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">
                        You've reached the maximum of 3 images. Remove some images to upload new ones.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditPropertyModal(false);
                resetEditForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProperty}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Property
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Property Analytics Modal */}
      <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Property Analytics
            </DialogTitle>
            <DialogDescription>
              Performance metrics and analytics for {selectedProperty?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="space-y-6 py-4">
              {/* Analytics Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.name}</h3>
                    <p className="text-gray-600">Comprehensive performance analysis</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      ${selectedProperty.monthlyRent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{selectedProperty.occupancyRate}%</div>
                  <div className="text-sm text-gray-600">Occupancy Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Industry avg: 95%</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">${selectedProperty.netIncome.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Net Income</div>
                  <div className="text-xs text-gray-500 mt-1">Monthly</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{selectedProperty.roi}%</div>
                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-xs text-gray-500 mt-1">Annual return</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{selectedProperty.maintenanceScore}%</div>
                  <div className="text-sm text-gray-600">Maintenance</div>
                  <div className="text-xs text-gray-500 mt-1">Health score</div>
                </div>
              </div>

              {/* Financial Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Revenue Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gross Revenue:</span>
                      <span className="font-semibold text-green-600">${selectedProperty.monthlyRent.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Operating Expenses:</span>
                      <span className="font-semibold text-red-600">-${selectedProperty.monthlyExpenses?.toLocaleString() || '0'}/mo</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-gray-800 font-semibold">Net Operating Income:</span>
                      <span className="font-bold text-blue-600">${selectedProperty.netIncome.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cash Flow:</span>
                      <span className={`font-semibold ${selectedProperty.netIncome > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${selectedProperty.netIncome.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cap Rate:</span>
                      <span className="font-semibold text-blue-600">
                        {selectedProperty.propertyValue ? ((selectedProperty.netIncome * 12 / selectedProperty.propertyValue) * 100).toFixed(2) : 'N/A'}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Trend:</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getTrendColor(selectedProperty.trend)}`}>
                          {selectedProperty.change}
                        </span>
                        {getTrendIcon(selectedProperty.trend)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Recommendations
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  {selectedProperty.occupancyRate < 90 && (
                    <p>• Consider marketing strategies to improve occupancy rate from {selectedProperty.occupancyRate}% to target 95%</p>
                  )}
                  {selectedProperty.maintenanceScore < 80 && (
                    <p>• Schedule maintenance to improve property health score from {selectedProperty.maintenanceScore}%</p>
                  )}
                  {selectedProperty.netIncome < selectedProperty.monthlyRent * 0.7 && (
                    <p>• Review operating expenses to improve net operating income</p>
                  )}
                  {selectedProperty.occupancyRate >= 90 && selectedProperty.maintenanceScore >= 80 && (
                    <p>• Property is performing well! Consider value-add improvements to increase rent</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnalyticsModal(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowAnalyticsModal(false);
                handleEditProperty(selectedProperty);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteConfirmModal} onOpenChange={setShowDeleteConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-red-600">
              <Trash2 className="h-6 w-6" />
              Delete Property
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProperty?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Warning</span>
              </div>
              <p className="text-sm text-red-700 mt-2">
                Deleting this property will remove all associated data including:
              </p>
              <ul className="text-sm text-red-700 mt-2 list-disc list-inside space-y-1">
                <li>Property details and financial records</li>
                <li>Occupancy and maintenance history</li>
                <li>Performance metrics and analytics</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteProperty}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modern Minimal Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <Building2 className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{totalProperties}</p>
                <p className="text-sm text-slate-600 font-medium">Total Properties</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span>No properties yet</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <Users className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{totalOccupied}/{totalUnits}</p>
                <p className="text-sm text-slate-600 font-medium">Occupied Units</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span>{totalUnits === 0 ? 'No units available' : `${Math.round((totalOccupied / totalUnits) * 100)}% occupancy`}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <DollarSign className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">${totalRevenue === 0 ? '0' : (totalRevenue / 1000).toFixed(1) + 'K'}</p>
                <p className="text-sm text-slate-600 font-medium">Monthly Revenue</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span>{totalRevenue === 0 ? 'No revenue yet' : `$${totalRevenue.toLocaleString()}/month`}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors duration-200">
                <Target className="h-7 w-7 text-slate-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{avgROI.toFixed(1)}%</p>
                <p className="text-sm text-slate-600 font-medium">Avg. ROI</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span>No ROI data</span>
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
                placeholder="Search properties by name, address, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 border-slate-200 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 border-slate-200 rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Complex">Complex</SelectItem>
                <SelectItem value="Loft">Loft</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Estate">Estate</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <div className="border border-slate-200 rounded-lg p-1 bg-slate-50">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-slate-100">
                <List className="h-5 w-5 text-slate-600" />
              </div>
              Properties List View
              <Badge variant="secondary" className="ml-auto">{filteredProperties.length} properties</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {filteredProperties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-slate-50/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                        <Building2 className="h-8 w-8 text-slate-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-slate-900">{property.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <span>{property.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {property.occupiedUnits}/{property.units} units
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {property.occupancyRate}% occupied
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-green-600">
                            <DollarSign className="h-3 w-3" />
                            ${property.monthlyRent.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getTrendColor(property.trend)}`}>{property.roi}% ROI</span>
                          <Badge variant="outline" className="text-xs">
                            {property.change}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Net: ${property.netIncome.toLocaleString()}/mo
                        </div>
                      </div>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status === 'active' ? 'Active' : 'Maintenance'}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(property)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProperty(property)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Property
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewAnalytics(property)}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteProperty(property)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Property
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredProperties.length === 0 && (
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {properties.length === 0 ? 'No properties in your portfolio yet' : 'No properties found'}
            </h3>
            <p className="text-slate-500 mb-4">
              {properties.length === 0 
                ? 'Start building your property portfolio by adding your first property. Track performance, manage tenants, and monitor financial metrics all in one place.'
                : 'Try adjusting your search criteria or filters to find what you\'re looking for.'
              }
            </p>
            <Button 
              onClick={() => setShowAddPropertyModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              {properties.length === 0 ? 'Add Your First Property' : 'Add New Property'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Analytics Modal */}
      <Dialog open={showPortfolioAnalyticsModal} onOpenChange={setShowPortfolioAnalyticsModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Portfolio Analytics Dashboard
            </DialogTitle>
            <DialogDescription>
              Comprehensive overview of your entire property portfolio performance, trends, and insights
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-8 py-4">
            {/* Portfolio Overview Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{portfolioAnalytics.totalProperties}</div>
                  <div className="text-sm text-gray-600">Total Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{portfolioAnalytics.totalUnits}</div>
                  <div className="text-sm text-gray-600">Total Units</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{portfolioAnalytics.occupancyRate}%</div>
                  <div className="text-sm text-gray-600">Portfolio Occupancy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">${portfolioAnalytics.totalValue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Portfolio Value</div>
                </div>
              </div>
            </div>

            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Financial Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-semibold text-green-600">${portfolioAnalytics.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Expenses:</span>
                    <span className="font-semibold text-red-600">${portfolioAnalytics.totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-800 font-semibold">Net Income:</span>
                    <span className="font-bold text-blue-600">${portfolioAnalytics.totalNetIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Annual Cash Flow:</span>
                    <span className="font-semibold text-purple-600">${portfolioAnalytics.monthlyCashFlow.annual.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. ROI:</span>
                    <span className="font-semibold text-blue-600">{portfolioAnalytics.avgROI.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Occupancy:</span>
                    <span className="font-semibold text-green-600">{portfolioAnalytics.avgOccupancyRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Maintenance:</span>
                    <span className="font-semibold text-orange-600">{portfolioAnalytics.avgMaintenanceScore.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vacant Units:</span>
                    <span className="font-semibold text-red-600">{portfolioAnalytics.totalVacant}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    ROI Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">High ROI (&gt;10%):</span>
                    <span className="font-semibold text-green-600">{portfolioAnalytics.roiAnalysis.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Medium ROI (5-10%):</span>
                    <span className="font-semibold text-blue-600">{portfolioAnalytics.roiAnalysis.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Low ROI (&lt;5%):</span>
                    <span className="font-semibold text-red-600">{portfolioAnalytics.roiAnalysis.low}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Properties:</span>
                    <span className="font-semibold text-gray-800">{portfolioAnalytics.totalProperties}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Property Type and Status Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Property Type Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(portfolioAnalytics.propertyTypeDistribution).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-gray-600">{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${((count as number) / portfolioAnalytics.totalProperties) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-gray-800">{count as number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(portfolioAnalytics.statusDistribution).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-gray-600 capitalize">{status}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${((count as number) / portfolioAnalytics.totalProperties) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-gray-800">{count as number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers and Properties Needing Attention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Top Performing Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {portfolioAnalytics.topPerformers.map((property, index) => (
                      <div key={property.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm font-bold text-yellow-700">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{property.name}</div>
                            <div className="text-sm text-gray-600">{property.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{property.roi}% ROI</div>
                          <div className="text-sm text-gray-600">${property.monthlyRent.toLocaleString()}/mo</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    Properties Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {portfolioAnalytics.needsAttention.length > 0 ? (
                      portfolioAnalytics.needsAttention.map((property) => (
                        <div key={property.id} className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                          <div className="font-semibold text-gray-900 mb-1">{property.name}</div>
                          <div className="text-sm text-gray-600 space-y-1">
                            {property.occupancyRate < 80 && (
                              <div className="flex items-center gap-2">
                                <span className="text-red-600">⚠️</span>
                                <span>Low occupancy: {property.occupancyRate}%</span>
                              </div>
                            )}
                            {property.maintenanceScore < 70 && (
                              <div className="flex items-center gap-2">
                                <span className="text-orange-600">🔧</span>
                                <span>Maintenance needed: {property.maintenanceScore}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p>All properties are performing well!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Portfolio Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  {portfolioAnalytics.occupancyRate < 85 && (
                    <p>• <strong>Improve Occupancy:</strong> Focus on marketing strategies to increase portfolio occupancy from {portfolioAnalytics.occupancyRate}% to target 90%+</p>
                  )}
                  {portfolioAnalytics.avgMaintenanceScore < 80 && (
                    <p>• <strong>Maintenance Priority:</strong> Schedule maintenance for properties with scores below 80% to improve overall portfolio health</p>
                  )}
                  {portfolioAnalytics.roiAnalysis.low > portfolioAnalytics.roiAnalysis.high && (
                    <p>• <strong>ROI Optimization:</strong> Review underperforming properties and consider value-add improvements or rent increases</p>
                  )}
                  {portfolioAnalytics.totalVacant > 0 && (
                    <p>• <strong>Vacancy Management:</strong> {portfolioAnalytics.totalVacant} vacant units represent potential revenue. Focus on quick tenant acquisition</p>
                  )}
                  {portfolioAnalytics.avgROI < 8 && (
                    <p>• <strong>Performance Review:</strong> Portfolio ROI of {portfolioAnalytics.avgROI.toFixed(1)}% is below market average. Consider strategic improvements</p>
                  )}
                  {portfolioAnalytics.occupancyRate >= 85 && portfolioAnalytics.avgMaintenanceScore >= 80 && portfolioAnalytics.avgROI >= 8 && (
                    <p>• <strong>Excellent Performance:</strong> Your portfolio is performing exceptionally well! Consider expansion opportunities or value-add investments</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPortfolioAnalyticsModal(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowPortfolioAnalyticsModal(false);
                exportPortfolioPDF();
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Analytics Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tenants Management Modal */}
      <Dialog open={showTenantsModal} onOpenChange={setShowTenantsModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-blue-600" />
              Tenant Management - {selectedProperty?.name}
            </DialogTitle>
            <DialogDescription>
              Manage tenants, view lease information, and track rent payments for this property
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Property Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{tenants.length}</div>
                  <div className="text-sm text-gray-600">Total Tenants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {tenants.filter(t => t.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active Tenants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">
                    ${tenants.reduce((sum, t) => sum + t.monthlyRent, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Rent Income</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedProperty ? Math.round((tenants.length / selectedProperty.units) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Occupancy Rate</div>
                </div>
              </div>
            </div>

            {/* Tenants List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Tenants</h3>
                <Button onClick={handleAddTenant} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </Button>
              </div>
              
              {tenants.length > 0 ? (
                <div className="grid gap-4">
                  {tenants.map((tenant) => (
                    <Card key={tenant.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">{tenant.name}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>Unit {tenant.unitNumber}</span>
                                  <span>•</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    tenant.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {tenant.status === 'active' ? 'Active' : 'Inactive'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Email:</span>
                                  <span className="font-medium">{tenant.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Phone:</span>
                                  <span className="font-medium">{tenant.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Monthly Rent:</span>
                                  <span className="font-semibold text-green-600">${tenant.monthlyRent.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Lease Start:</span>
                                  <span className="font-medium">{new Date(tenant.leaseStart).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Lease End:</span>
                                  <span className="font-medium">{new Date(tenant.leaseEnd).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Security Deposit:</span>
                                  <span className="font-medium">${tenant.securityDeposit.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            {tenant.notes && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-700">{tenant.notes}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditTenant(tenant)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTenant(tenant)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No tenants yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start managing your property by adding your first tenant. Track lease information, rent payments, and tenant details.
                    </p>
                    <Button onClick={handleAddTenant} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Tenant
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTenantsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Tenant Modal */}
      <Dialog open={showAddTenantModal} onOpenChange={setShowAddTenantModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {editingTenant ? <Edit className="h-6 w-6 text-blue-600" /> : <Plus className="h-6 w-6 text-green-600" />}
              {editingTenant ? 'Edit Tenant' : 'Add New Tenant'}
            </DialogTitle>
            <DialogDescription>
              {editingTenant ? 'Update tenant information' : 'Add a new tenant to this property'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-name">Full Name *</Label>
                <Input
                  id="tenant-name"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-email">Email *</Label>
                <Input
                  id="tenant-email"
                  type="email"
                  value={newTenant.email}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g., john@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-phone">Phone Number *</Label>
                <Input
                  id="tenant-phone"
                  value={newTenant.phone}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g., +1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-unit">Unit Number *</Label>
                <Input
                  id="tenant-unit"
                  value={newTenant.unitNumber}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, unitNumber: e.target.value }))}
                  placeholder="e.g., A101"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-lease-start">Lease Start Date *</Label>
                <Input
                  id="tenant-lease-start"
                  type="date"
                  value={newTenant.leaseStart}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, leaseStart: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-lease-end">Lease End Date *</Label>
                <Input
                  id="tenant-lease-end"
                  type="date"
                  value={newTenant.leaseEnd}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, leaseEnd: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenant-rent">Monthly Rent *</Label>
                <Input
                  id="tenant-rent"
                  type="number"
                  value={newTenant.monthlyRent}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, monthlyRent: e.target.value }))}
                  placeholder="e.g., 1200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenant-deposit">Security Deposit *</Label>
                <Input
                  id="tenant-deposit"
                  type="number"
                  value={newTenant.securityDeposit}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, securityDeposit: e.target.value }))}
                  placeholder="e.g., 1200"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenant-status">Status</Label>
              <Select value={newTenant.status} onValueChange={(value) => setNewTenant(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenant-emergency">Emergency Contact</Label>
              <Input
                id="tenant-emergency"
                value={newTenant.emergencyContact}
                onChange={(e) => setNewTenant(prev => ({ ...prev, emergencyContact: e.target.value }))}
                placeholder="e.g., Jane Smith +1 (555) 987-6543"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenant-notes">Notes</Label>
              <Textarea
                id="tenant-notes"
                value={newTenant.notes}
                onChange={(e) => setNewTenant(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes about the tenant..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddTenantModal(false);
                resetTenantForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTenant}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {editingTenant ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Tenant
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
