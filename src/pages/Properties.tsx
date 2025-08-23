import { useState } from 'react';
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
  X
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  
  // Property action modals state
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
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

  const confirmDeleteProperty = () => {
    if (selectedProperty) {
      setProperties(prev => prev.filter(p => p.id !== selectedProperty.id));
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
      setProperties(prev => prev.map(p => 
        p.id === selectedProperty.id 
          ? {
              ...p,
              name: newProperty.name,
              address: `${newProperty.address}, ${newProperty.city}`,
              city: newProperty.city,
              type: newProperty.type,
              units: parseInt(newProperty.units) || 0,
              monthlyRent: parseFloat(newProperty.monthlyRent) || 0,
              yearBuilt: newProperty.yearBuilt ? parseInt(newProperty.yearBuilt) : undefined,
              propertyValue: newProperty.purchasePrice ? parseFloat(newProperty.purchasePrice) : 0,
              monthlyExpenses: newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0,
              netIncome: (parseFloat(newProperty.monthlyRent) || 0) - (newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0)
            }
          : p
      ));
      
      toast.success(`Property "${newProperty.name}" updated successfully!`);
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
        return newProperty.name && newProperty.type && (shouldShowUnits() ? newProperty.units : true);
      case 2:
        return newProperty.address && newProperty.city && newProperty.state && newProperty.zipCode;
      case 3:
        return newProperty.monthlyRent;
      default:
        return true;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPropertyImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!', newProperty);
    console.log('Property images:', propertyImages);
    
    // Validate required fields
    if (!newProperty.name || !newProperty.type || !newProperty.units || !newProperty.address || !newProperty.city || !newProperty.state || !newProperty.zipCode || !newProperty.monthlyRent) {
      toast.error('Please fill in all required fields marked with *');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new property object
      const newPropertyObj = {
        id: properties.length + 1,
        name: newProperty.name,
        address: `${newProperty.address}, ${newProperty.city}`,
        city: newProperty.city,
        type: newProperty.type,
        units: parseInt(newProperty.units) || 0,
        occupiedUnits: 0, // New properties start with 0 occupied units
        monthlyRent: parseFloat(newProperty.monthlyRent) || 0,
        image: '/placeholder.svg',
        status: 'active',
        occupancyRate: 0, // New properties start with 0% occupancy
        lastInspection: new Date().toISOString().split('T')[0],
        maintenanceScore: 100, // New properties start with perfect maintenance score
        tenantSatisfaction: 0, // No tenants yet
        yearBuilt: newProperty.yearBuilt ? parseInt(newProperty.yearBuilt) : undefined,
        propertyValue: newProperty.purchasePrice ? parseFloat(newProperty.purchasePrice) : 0,
        monthlyExpenses: newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0,
        netIncome: (parseFloat(newProperty.monthlyRent) || 0) - (newProperty.monthlyExpenses ? parseFloat(newProperty.monthlyExpenses) : 0),
        roi: 0, // New properties start with 0% ROI
        trend: 'stable',
        change: '0.0%'
      };
      
      // Add to properties array
      setProperties(prev => [...prev, newPropertyObj]);
      
      // Show success message
      toast.success(`Property "${newProperty.name}" created successfully!`, {
        description: `${newProperty.address}, ${newProperty.city} | ${newProperty.type} | ${newProperty.units} units`,
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
        <div className="h-48 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <Building2 className="h-16 w-16 text-blue-600 relative z-10" />
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
              <span className="font-semibold text-lg text-green-600">${property.monthlyRent.toLocaleString()}</span>
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
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tenant Satisfaction:</span>
              <div className="flex items-center gap-1">
                <span className="font-medium">{property.tenantSatisfaction}</span>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Last inspection: {new Date(property.lastInspection).toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Users className="h-4 w-4 mr-1" />
              Tenants
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 p-1">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-white to-blue-50 p-8 border border-green-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-blue-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Property Portfolio 🏢
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage and monitor your complete property portfolio. Track performance, occupancy rates, and financial metrics across all your properties.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{totalProperties === 0 ? 'No properties yet' : `${totalProperties} properties managed`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Export Portfolio
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Portfolio Analytics
              </Button>
              <Dialog open={showAddPropertyModal} onOpenChange={setShowAddPropertyModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="h-6 w-6 text-blue-600" />
                      Add New Property
                    </DialogTitle>
                    <DialogDescription>
                      Complete all steps to add a new property to your portfolio. All fields marked with * are required.
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
                        <span className={currentStep === 1 ? 'text-blue-600 font-medium' : ''}>Basic Info</span>
                        <span className={currentStep === 2 ? 'text-blue-600 font-medium' : ''}>Location</span>
                        <span className={currentStep === 3 ? 'text-blue-600 font-medium' : ''}>Financial</span>
                        <span className={currentStep === 4 ? 'text-blue-600 font-medium' : ''}>Images</span>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Basic Property Information</h3>
                          <p className="text-gray-600">Let's start with the essential details about your property</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Property Name *</Label>
                            <Input
                              id="name"
                              placeholder="e.g., Oak Street Apartments"
                              value={newProperty.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Property Type *</Label>
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
                              <Label htmlFor="units">Number of Units *</Label>
                              <Input
                                id="units"
                                type="number"
                                placeholder="e.g., 24"
                                value={newProperty.units}
                                onChange={(e) => handleInputChange('units', e.target.value)}
                                required
                              />
                            </div>
                          )}
                          {shouldShowYearBuilt() && (
                            <div className="space-y-2">
                              <Label htmlFor="yearBuilt">Year Built</Label>
                              <Input
                                id="yearBuilt"
                                type="number"
                                placeholder="e.g., 2020"
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
                          <p className="text-gray-600">Where is your property located?</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address *</Label>
                            <Input
                              id="address"
                              placeholder="e.g., 123 Oak Street"
                              value={newProperty.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                placeholder="e.g., Downtown"
                                value={newProperty.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State *</Label>
                              <Input
                                id="state"
                                placeholder="e.g., CA"
                                value={newProperty.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">ZIP Code *</Label>
                              <Input
                                id="zipCode"
                                placeholder="e.g., 90210"
                                value={newProperty.zipCode}
                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                required
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
                          <p className="text-gray-600">Let's talk about the financial aspects of your property</p>
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
                            <Label htmlFor="monthlyRent">Monthly Rent Income *</Label>
                            <Input
                              id="monthlyRent"
                              type="number"
                              placeholder="e.g., 28800"
                              value={newProperty.monthlyRent}
                              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                              required
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
                          <p className="text-gray-600">Upload photos to showcase your property</p>
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
                            disabled={!canProceedToNext() || isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Next
                          </Button>
                        ) : (
                          <Button 
                            type="submit"
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
                                Create Property
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
              Property Details
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
                      <span className="text-gray-600">Tenant Satisfaction:</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{selectedProperty.tenantSatisfaction || 'N/A'}</span>
                        {selectedProperty.tenantSatisfaction > 0 && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
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
                  <Label htmlFor="edit-name">Property Name *</Label>
                  <Input
                    id="edit-name"
                    placeholder="e.g., Oak Street Apartments"
                    value={newProperty.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Property Type *</Label>
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
                  <Label htmlFor="edit-units">Number of Units *</Label>
                  <Input
                    id="edit-units"
                    type="number"
                    placeholder="e.g., 24"
                    value={newProperty.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                    required
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
                  <Label htmlFor="edit-monthlyRent">Monthly Rent *</Label>
                  <Input
                    id="edit-monthlyRent"
                    type="number"
                    placeholder="e.g., 28800"
                    value={newProperty.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Street Address *</Label>
                  <Input
                    id="edit-address"
                    placeholder="e.g., 123 Oak Street"
                    value={newProperty.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-city">City *</Label>
                  <Input
                    id="edit-city"
                    placeholder="e.g., Downtown"
                    value={newProperty.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
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
            </div>
          </form>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditPropertyModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProperty}
              disabled={isSubmitting || !newProperty.name || !newProperty.type || !newProperty.units || !newProperty.address || !newProperty.city || !newProperty.monthlyRent}
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

      {/* Enhanced Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalProperties}</p>
                <p className="text-sm text-gray-600">Total Properties</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <span>No properties yet</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalOccupied}/{totalUnits}</p>
                <p className="text-sm text-gray-600">Occupied Units</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <span>{totalUnits === 0 ? 'No units available' : `${Math.round((totalOccupied / totalUnits) * 100)}% occupancy`}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">${totalRevenue === 0 ? '0' : (totalRevenue / 1000).toFixed(1) + 'K'}</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <span>{totalRevenue === 0 ? 'No revenue yet' : `$${totalRevenue.toLocaleString()}/month`}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{avgROI.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Avg. ROI</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <span>No ROI data</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties by name, address, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 border-gray-200">
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
                <SelectTrigger className="w-40 border-gray-200">
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
              
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="border border-gray-200 rounded-lg p-1 bg-gray-50">
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
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-blue-50">
                <List className="h-5 w-5 text-blue-600" />
              </div>
              Properties List View
              <Badge variant="secondary" className="ml-auto">{filteredProperties.length} properties</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filteredProperties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center border border-blue-200">
                        <Building2 className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
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
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {properties.length === 0 ? 'No properties in your portfolio yet' : 'No properties found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {properties.length === 0 
                ? 'Start building your property portfolio by adding your first property. Track performance, manage tenants, and monitor financial metrics all in one place.'
                : 'Try adjusting your search criteria or filters to find what you\'re looking for.'
              }
            </p>
            <Button 
              onClick={() => setShowAddPropertyModal(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {properties.length === 0 ? 'Add Your First Property' : 'Add New Property'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Properties;
