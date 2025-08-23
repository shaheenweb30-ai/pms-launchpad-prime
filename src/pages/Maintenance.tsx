import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  Wrench,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  User,
  MapPin,
  DollarSign,
  MoreHorizontal,
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
  Users,
  Building2,
  Home,
  Car,
  Wifi,
  UtensilsCrossed,
  Timer,
  CheckCircle2,
  AlertTriangle,
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
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  Coins,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  FileText,
  Edit,
  Eye,
  Bell,
  Download,
  Send,
  Phone,
  Mail,
  Camera,
  Upload,
  PlayCircle,
  PauseCircle,
  StopCircle,
  FastForward,
  SkipForward,
  SkipBack,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Move,
  Crop,
  Scissors,
  PaintBucket,
  Brush,
  Palette,
  Layers,
  Grid,
  Ruler,
  Compass,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Pentagon,
  Octagon
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

const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    property: '',
    unit: '',
    tenant: '',
    priority: 'medium',
    category: 'plumbing',
    estimatedCost: '',
    dueDate: '',
    estimatedDuration: '',
    contactMethod: 'phone',
    tenantAvailability: '',
    specialInstructions: '',
    emergencyLevel: false,
    followUpRequired: false
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [recentlyCreatedId, setRecentlyCreatedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const newRequestRef = useRef<HTMLDivElement>(null);

  // Scroll to newly created request
  useEffect(() => {
    if (recentlyCreatedId && newRequestRef.current) {
      newRequestRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [recentlyCreatedId]);

  // Enhanced maintenance requests data with more details
  const maintenanceRequests = [
        {
          id: 1,
      title: 'Kitchen Faucet Leak',
      description: 'Water is dripping from the kitchen faucet constantly',
      property: 'Oak Street Apartments',
      unit: '4B',
      tenant: 'Sarah Johnson',
      priority: 'high',
      status: 'pending',
      category: 'plumbing',
      dateReported: '2024-12-10',
      estimatedCost: 150,
      assignedVendor: null,
      dueDate: '2024-12-18',
      urgencyScore: 85,
      completionTime: null,
      vendorRating: null,
      tenantSatisfaction: null,
      photosCount: 2,
      updatesCount: 0,
      estimatedDuration: '2-4 hours',
      warranty: '1 year',
      lastUpdate: '2024-12-10',
      contactMethod: 'phone',
      tenantAvailability: 'weekdays 9-5',
      specialInstructions: 'Tenant has small children, please be careful with tools',
      emergencyLevel: false,
      followUpRequired: true
        },
        {
          id: 2,
      title: 'Broken Window',
      description: 'Living room window has a crack and needs replacement',
      property: 'Downtown Lofts',
      unit: '12',
      tenant: 'Mike Davis',
      priority: 'medium',
      status: 'in_progress',
      category: 'structural',
      dateReported: '2024-12-08',
      estimatedCost: 450,
      assignedVendor: 'Glass Pro Services',
      dueDate: '2024-12-15',
      urgencyScore: 65,
      completionTime: null,
      vendorRating: 4.2,
      tenantSatisfaction: null,
      photosCount: 3,
      updatesCount: 2,
      estimatedDuration: '3-5 hours',
      warranty: '2 years',
      lastUpdate: '2024-12-12',
      contactMethod: 'email',
      tenantAvailability: 'weekends only',
      specialInstructions: 'Need to coordinate with building management for exterior access',
      emergencyLevel: false,
      followUpRequired: false
    },
    {
      id: 3,
      title: 'HVAC Not Working',
      description: 'Heating system is not working properly, very cold in apartment',
      property: 'Riverside Complex',
      unit: '8A',
      tenant: 'Emma Wilson',
      priority: 'urgent',
      status: 'assigned',
      category: 'hvac',
      dateReported: '2024-12-09',
      estimatedCost: 800,
      assignedVendor: 'Climate Solutions',
      dueDate: '2024-12-11',
      urgencyScore: 95,
      completionTime: null,
      vendorRating: 4.8,
      tenantSatisfaction: null,
      photosCount: 1,
      updatesCount: 3,
      estimatedDuration: '4-6 hours',
      warranty: '5 years',
      lastUpdate: '2024-12-11',
      contactMethod: 'phone',
      tenantAvailability: 'anytime',
      specialInstructions: 'Emergency repair - tenant has elderly residents',
      emergencyLevel: true,
      followUpRequired: true
    },
    {
      id: 4,
      title: 'Dishwasher Repair',
      description: 'Dishwasher is making loud noises and not cleaning properly',
      property: 'Suburban Homes',
      unit: '15',
      tenant: 'David Chen',
      priority: 'low',
      status: 'completed',
      category: 'appliance',
      dateReported: '2024-12-05',
      estimatedCost: 200,
      assignedVendor: 'Appliance Fix Pro',
      dueDate: '2024-12-05',
      urgencyScore: 40,
      completionTime: '3 hours',
      vendorRating: 4.5,
      tenantSatisfaction: 4.8,
      photosCount: 0,
      updatesCount: 1,
      estimatedDuration: '2-3 hours',
      warranty: '6 months',
      lastUpdate: '2024-12-06',
      contactMethod: 'email',
      tenantAvailability: 'evenings after 6pm',
      specialInstructions: 'Appliance is still under manufacturer warranty',
      emergencyLevel: false,
      followUpRequired: false
    },
    {
      id: 5,
      title: 'Electrical Outlet Issue',
      description: 'Bedroom outlet is not working, possible electrical issue',
      property: 'Oak Street Apartments',
      unit: '2C',
      tenant: 'Lisa Rodriguez',
      priority: 'high',
      status: 'cancelled',
      category: 'electrical',
      dateReported: '2024-12-07',
      estimatedCost: 300,
      assignedVendor: null,
      dueDate: '2024-12-07',
      urgencyScore: 75,
      completionTime: null,
      vendorRating: null,
      tenantSatisfaction: null,
      photosCount: 1,
      updatesCount: 0,
      estimatedDuration: '1-2 hours',
      warranty: '1 year',
      lastUpdate: '2024-12-07',
      contactMethod: 'phone',
      tenantAvailability: 'flexible',
      specialInstructions: 'Safety concern - tenant reported sparking',
      emergencyLevel: true,
      followUpRequired: true
    },
    {
      id: 6,
      title: 'Garbage Disposal Stuck',
      description: 'Kitchen garbage disposal is jammed and making grinding noise',
      property: 'Harbor View Condos',
      unit: '3A',
      tenant: 'Alex Johnson',
      priority: 'medium',
      status: 'assigned',
      category: 'appliance',
      dateReported: '2024-12-11',
      estimatedCost: 120,
      assignedVendor: 'Kitchen Pro Repairs',
      dueDate: '2024-12-16',
      urgencyScore: 55,
      completionTime: null,
      vendorRating: 4.1,
      tenantSatisfaction: null,
      photosCount: 2,
      updatesCount: 1,
      estimatedDuration: '1-2 hours',
      warranty: '6 months',
      lastUpdate: '2024-12-13',
      contactMethod: 'text',
      tenantAvailability: 'weekdays 8-6',
      specialInstructions: 'Tenant works from home, please call before arriving',
      emergencyLevel: false,
      followUpRequired: false
    },
    {
      id: 7,
      title: 'Balcony Door Lock Broken',
      description: 'Cannot lock balcony sliding door, security concern',
      property: 'Mountain Ridge Estates',
      unit: '5',
      tenant: 'Rachel Green',
      priority: 'high',
      status: 'in_progress',
      category: 'security',
      dateReported: '2024-12-12',
      estimatedCost: 180,
      assignedVendor: 'Secure Lock Services',
      dueDate: '2024-12-14',
      urgencyScore: 80,
      completionTime: null,
      vendorRating: 4.6,
      tenantSatisfaction: null,
      photosCount: 3,
      updatesCount: 2,
      estimatedDuration: '2-3 hours',
      warranty: '2 years',
      lastUpdate: '2024-12-13',
      contactMethod: 'email',
      tenantAvailability: 'weekends preferred',
      specialInstructions: 'Ground floor unit, easy access',
      emergencyLevel: false,
      followUpRequired: true
    }
  ];

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRequests = maintenanceRequests.length;
  const pendingRequests = maintenanceRequests.filter(r => r.status === 'pending').length;
  const inProgressRequests = maintenanceRequests.filter(r => r.status === 'in_progress' || r.status === 'assigned').length;
  const completedRequests = maintenanceRequests.filter(r => r.status === 'completed').length;
  
  const avgUrgencyScore = maintenanceRequests.reduce((sum, r) => sum + r.urgencyScore, 0) / maintenanceRequests.length;
  const emergencyRequests = maintenanceRequests.filter(r => r.emergencyLevel).length;
  const avgVendorRating = maintenanceRequests.filter(r => r.vendorRating).reduce((sum, r) => sum + (r.vendorRating || 0), 0) / Math.max(maintenanceRequests.filter(r => r.vendorRating).length, 1);
  const avgTenantSatisfaction = maintenanceRequests.filter(r => r.tenantSatisfaction).reduce((sum, r) => sum + (r.tenantSatisfaction || 0), 0) / Math.max(maintenanceRequests.filter(r => r.tenantSatisfaction).length, 1);
  const totalPhotos = maintenanceRequests.reduce((sum, r) => sum + r.photosCount, 0);
  const followUpRequired = maintenanceRequests.filter(r => r.followUpRequired).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'assigned': return 'default';
      case 'in_progress': return 'default';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'assigned': return User;
      case 'in_progress': return Wrench;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getUrgencyScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600';
    if (score >= 70) return 'text-orange-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUrgencyScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 70) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'plumbing': return <Wrench className="h-4 w-4 text-blue-600" />;
      case 'electrical': return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'hvac': return <Settings className="h-4 w-4 text-purple-600" />;
      case 'appliance': return <Home className="h-4 w-4 text-green-600" />;
      case 'structural': return <Building2 className="h-4 w-4 text-gray-600" />;
      case 'security': return <Shield className="h-4 w-4 text-red-600" />;
      default: return <Wrench className="h-4 w-4 text-gray-600" />;
    }
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
    if (days <= 1) return 'text-orange-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getVendorRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCreateRequest = async () => {
    // Validate required fields
    const errors: {[key: string]: string} = {};
    
    if (!newRequest.title.trim()) errors.title = 'Title is required';
    if (!newRequest.description.trim()) errors.description = 'Description is required';
    if (!newRequest.property.trim()) errors.property = 'Property is required';
    if (!newRequest.unit.trim()) errors.unit = 'Unit is required';
    if (!newRequest.tenant.trim()) errors.tenant = 'Tenant name is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Clear any previous errors
    setFormErrors({});
    setIsCreating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const request = {
        id: maintenanceRequests.length + 1,
        ...newRequest,
        estimatedCost: parseFloat(newRequest.estimatedCost) || 0,
        status: 'pending',
        dateReported: new Date().toISOString().split('T')[0],
        urgencyScore: newRequest.emergencyLevel ? 95 : 
                     newRequest.priority === 'urgent' ? 90 :
                     newRequest.priority === 'high' ? 75 :
                     newRequest.priority === 'medium' ? 55 : 35,
        assignedVendor: null,
        completionTime: null,
        vendorRating: null,
        tenantSatisfaction: null,
        photosCount: 0,
        updatesCount: 0,
        warranty: '1 year',
        lastUpdate: new Date().toISOString().split('T')[0]
      };

      // In a real app, this would be sent to an API
      maintenanceRequests.unshift(request);
      
      // Set recently created ID for highlighting
      setRecentlyCreatedId(request.id);
      
      // Clear highlight after 5 seconds
      setTimeout(() => setRecentlyCreatedId(null), 5000);
      
      // Reset form and close modal
      setNewRequest({
        title: '',
        description: '',
        property: '',
        unit: '',
        tenant: '',
        priority: 'medium',
        category: 'plumbing',
        estimatedCost: '',
        dueDate: '',
        estimatedDuration: '',
        contactMethod: 'phone',
        tenantAvailability: '',
        specialInstructions: '',
        emergencyLevel: false,
        followUpRequired: false
      });
      setFormErrors({});
      setIsCreateModalOpen(false);
      toast.success(`Maintenance request "${request.title}" created successfully!`, {
        description: `${request.property} - Unit ${request.unit} | Priority: ${request.priority.toUpperCase()}`,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Failed to create maintenance request. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewRequest(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleOpenCreateModal = () => {
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 7);
    
    setNewRequest({
      title: '',
      description: '',
      property: '',
      unit: '',
      tenant: '',
      priority: 'medium',
      category: 'plumbing',
      estimatedCost: '',
      dueDate: defaultDueDate.toISOString().split('T')[0],
      estimatedDuration: '',
      contactMethod: 'phone',
      tenantAvailability: '',
      specialInstructions: '',
      emergencyLevel: false,
      followUpRequired: false
    });
    setIsCreateModalOpen(true);
    setFormErrors({});
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormErrors({});
    setNewRequest({
      title: '',
      description: '',
      property: '',
      unit: '',
      tenant: '',
      priority: 'medium',
      category: 'plumbing',
      estimatedCost: '',
      dueDate: '',
      estimatedDuration: '',
      contactMethod: 'phone',
      tenantAvailability: '',
      specialInstructions: '',
      emergencyLevel: false,
      followUpRequired: false
    });
  };

  return (
    <div className="space-y-6">
            {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 border border-blue-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-30"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Maintenance Hub 🔧
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage maintenance requests and work orders efficiently. Track progress, assign vendors, and ensure tenant satisfaction across your property portfolio.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>{totalRequests} total requests this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Avg urgency: {avgUrgencyScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Activity className="h-4 w-4 mr-2" />
                Maintenance Analytics
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleOpenCreateModal}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Request
            </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Maintenance Request Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Maintenance Request 🔧
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new maintenance request. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Kitchen Faucet Leak"
                    value={newRequest.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={formErrors.title ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newRequest.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="landscaping">Landscaping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the issue..."
                  rows={3}
                  value={newRequest.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={formErrors.description ? 'border-red-500 focus:border-red-500' : ''}
                />
                <div className="flex justify-between items-center">
                  {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
                  <p className={`text-xs ml-auto ${newRequest.description.length < 20 ? 'text-orange-600' : 'text-gray-500'}`}>
                    {newRequest.description.length} characters
                    {newRequest.description.length < 20 && ' (recommend at least 20)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Property & Tenant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property & Tenant</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property">Property *</Label>
                  <Input
                    id="property"
                    placeholder="e.g., Oak Street Apartments"
                    value={newRequest.property}
                    onChange={(e) => handleInputChange('property', e.target.value)}
                    className={formErrors.property ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.property && <p className="text-red-500 text-xs mt-1">{formErrors.property}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., 4B"
                    value={newRequest.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className={formErrors.unit ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.unit && <p className="text-red-500 text-xs mt-1">{formErrors.unit}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant Name *</Label>
                  <Input
                    id="tenant"
                    placeholder="e.g., Sarah Johnson"
                    value={newRequest.tenant}
                    onChange={(e) => handleInputChange('tenant', e.target.value)}
                    className={formErrors.tenant ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.tenant && <p className="text-red-500 text-xs mt-1">{formErrors.tenant}</p>}
                </div>
              </div>
            </div>

            {/* Priority & Scheduling */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Priority & Scheduling</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select value={newRequest.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newRequest.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                  <Input
                    id="estimatedDuration"
                    placeholder="e.g., 2-4 hours"
                    value={newRequest.estimatedDuration}
                    onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Real-time Urgency Score Display */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Calculated Urgency Score:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      (newRequest.emergencyLevel ? 95 : 
                       newRequest.priority === 'urgent' ? 90 :
                       newRequest.priority === 'high' ? 75 :
                       newRequest.priority === 'medium' ? 55 : 35) >= 90 ? 'bg-red-100 text-red-800' :
                      (newRequest.emergencyLevel ? 95 : 
                       newRequest.priority === 'urgent' ? 90 :
                       newRequest.priority === 'high' ? 75 :
                       newRequest.priority === 'medium' ? 55 : 35) >= 70 ? 'bg-orange-100 text-orange-800' :
                      (newRequest.emergencyLevel ? 95 : 
                       newRequest.priority === 'urgent' ? 90 :
                       newRequest.priority === 'high' ? 75 :
                       newRequest.priority === 'medium' ? 55 : 35) >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {newRequest.emergencyLevel ? 95 : 
                       newRequest.priority === 'urgent' ? 90 :
                       newRequest.priority === 'high' ? 75 :
                       newRequest.priority === 'medium' ? 55 : 35}
                    </div>
                    <span className="text-xs text-gray-500">/ 100</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {newRequest.emergencyLevel && '🚨 Emergency level selected - 24hr response required'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'urgent' && '⚡ Urgent priority - immediate attention needed'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'high' && '🔴 High priority - schedule within 48 hours'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'medium' && '🟡 Medium priority - schedule within 1 week'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'low' && '🟢 Low priority - schedule when convenient'}
                </div>
              </div>
            </div>

            {/* Cost & Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Cost & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    placeholder="0.00"
                    value={newRequest.estimatedCost}
                    onChange={(e) => handleInputChange('estimatedCost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                  <Select value={newRequest.contactMethod} onValueChange={(value) => handleInputChange('contactMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenantAvailability">Tenant Availability</Label>
                  <Input
                    id="tenantAvailability"
                    placeholder="e.g., weekdays 9-5, weekends only"
                    value={newRequest.tenantAvailability}
                    onChange={(e) => handleInputChange('tenantAvailability', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Any special considerations, access requirements, or notes..."
                    rows={2}
                    value={newRequest.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emergencyLevel"
                      checked={newRequest.emergencyLevel}
                      onChange={(e) => handleInputChange('emergencyLevel', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="emergencyLevel" className="text-sm font-medium">
                      Emergency Level (24hr response required)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="followUpRequired"
                      checked={newRequest.followUpRequired}
                      onChange={(e) => handleInputChange('followUpRequired', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="followUpRequired" className="text-sm font-medium">
                      Follow-up Required
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Preview */}
            {(newRequest.title || newRequest.description || newRequest.property || newRequest.unit || newRequest.tenant) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Request Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(newRequest.priority || 'medium')}>
                        {(newRequest.priority || 'medium').toUpperCase()}
                      </Badge>
                      <Badge variant="secondary">
                        {newRequest.category || 'plumbing'}
                      </Badge>
                      {newRequest.emergencyLevel && (
                        <Badge variant="destructive">
                          🚨 EMERGENCY
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {newRequest.title || 'Request Title'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {newRequest.description || 'Description will appear here...'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Property:</span>
                        <span className="ml-2 font-medium">{newRequest.property || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Unit:</span>
                        <span className="ml-2 font-medium">{newRequest.unit || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Tenant:</span>
                        <span className="ml-2 font-medium">{newRequest.tenant || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Due:</span>
                        <span className="ml-2 font-medium">
                          {newRequest.dueDate ? new Date(newRequest.dueDate).toLocaleDateString() : 'Not specified'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Estimated cost: ${newRequest.estimatedCost || '0'} | 
                      Duration: {newRequest.estimatedDuration || 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCloseCreateModal}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRequest}
              disabled={!newRequest.title || !newRequest.description || !newRequest.property || !newRequest.unit || !newRequest.tenant || isCreating}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isCreating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Request
                </>
              )}
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
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
                <div>
                <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
                <p className="text-sm text-gray-600">Total Requests</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Activity className="h-3 w-3" />
                  Active portfolio
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-yellow-50/50 shadow-lg hover:shadow-2xl">
            <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100 group-hover:bg-yellow-200 transition-colors duration-300">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
                <div>
                <p className="text-3xl font-bold text-gray-900">{pendingRequests}</p>
                <p className="text-sm text-gray-600">Pending</p>
                <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                  <Timer className="h-3 w-3" />
                  Awaiting assignment
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-2xl">
            <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
                <div>
                <p className="text-3xl font-bold text-gray-900">{inProgressRequests}</p>
                <p className="text-sm text-gray-600">In Progress</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <Settings className="h-3 w-3" />
                  Active work
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
                <p className="text-3xl font-bold text-gray-900">{completedRequests}</p>
                <p className="text-sm text-gray-600">Completed</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <Award className="h-3 w-3" />
                  Successfully finished
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>

      {/* Additional Maintenance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{avgUrgencyScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Urgency Score</div>
          <div className="text-xs text-emerald-600">Request priority</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">{emergencyRequests}</div>
          <div className="text-sm text-gray-600 mb-1">Emergency Requests</div>
          <div className="text-xs text-purple-600">Urgent repairs</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <div className="text-2xl font-bold text-indigo-600 mb-1">{avgVendorRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Vendor Rating</div>
          <div className="text-xs text-indigo-600">Service quality</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-white border border-red-100">
          <div className="text-2xl font-bold text-red-600 mb-1">{followUpRequired}</div>
          <div className="text-sm text-gray-600 mb-1">Follow-up Required</div>
          <div className="text-xs text-red-600">Needs attention</div>
        </div>
        </div>

        {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search maintenance requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
                  />
                </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
              </Button>
            </div>
      </div>

      {/* Maintenance Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <Card 
              key={request.id} 
              ref={recentlyCreatedId === request.id ? newRequestRef : null}
              className={`hover:shadow-lg transition-all duration-300 relative ${
                recentlyCreatedId === request.id 
                  ? 'ring-2 ring-green-500 ring-opacity-50 bg-gradient-to-r from-green-50 to-white shadow-lg' 
                  : ''
              }`}
            >
              {recentlyCreatedId === request.id && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-green-500 text-white animate-pulse">
                    <Plus className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between">
                      <div>
                          <h3 className="font-semibold text-lg">{request.title}</h3>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(request.priority)}>
                            {request.priority.toUpperCase()}
                          </Badge>
                          <Badge variant={getStatusColor(request.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Property:</span>
                          <span className="font-medium">{request.property}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Unit:</span>
                          <span className="font-medium">{request.unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Tenant:</span>
                          <span className="font-medium">{request.tenant}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Reported:</span>
                          <span className="font-medium">{new Date(request.dateReported).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">Est. Cost:</span>
                            <span className="font-semibold">${request.estimatedCost}</span>
                          </div>
                          {request.assignedVendor && (
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Vendor:</span>
                              <span className="font-medium">{request.assignedVendor}</span>
                            </div>
                          )}
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                        </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign Vendor
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Add Photos
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Cancel Request
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No maintenance requests found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters' : 'All caught up! No pending maintenance requests.'}
            </p>
            <Button 
              className="bg-gradient-to-r from-[#ed1c24] to-[#225fac]"
              onClick={handleOpenCreateModal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Maintenance;
