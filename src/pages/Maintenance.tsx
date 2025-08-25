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
  const maintenanceRequests: any[] = [];

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

      
            {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
        <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Maintenance Hub
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Manage maintenance requests and work orders efficiently. Track progress, assign vendors, and ensure quality maintenance across your property portfolio.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{totalRequests} total requests this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Avg urgency: {avgUrgencyScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-black">
              Create New Maintenance Request
            </DialogTitle>
            <DialogDescription className="font-light text-gray-600">
              Fill out the form below to create a new maintenance request. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-black border-b pb-2">Basic Information</h3>
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
              <h3 className="text-lg font-light text-black border-b pb-2">Property & Tenant</h3>
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
              <h3 className="text-lg font-light text-black border-b pb-2">Priority & Scheduling</h3>
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
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Calculated Urgency Score:</span>
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
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-600">
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
              <h3 className="text-lg font-light text-black border-b pb-2">Cost & Contact</h3>
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
              <h3 className="text-lg font-light text-black border-b pb-2">Additional Details</h3>
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
                <h3 className="text-lg font-light text-black border-b pb-2">Request Preview</h3>
                                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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
                      <h4 className="font-semibold text-slate-900">
                        {newRequest.title || 'Request Title'}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {newRequest.description || 'Description will appear here...'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Property:</span>
                        <span className="ml-2 font-medium">{newRequest.property || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Unit:</span>
                        <span className="ml-2 font-medium">{newRequest.unit || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Tenant:</span>
                        <span className="ml-2 font-medium">{newRequest.tenant || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Due:</span>
                        <span className="ml-2 font-medium">
                          {newRequest.dueDate ? new Date(newRequest.dueDate).toLocaleDateString() : 'Not specified'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-500">
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
              className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRequest}
              disabled={!newRequest.title || !newRequest.description || !newRequest.property || !newRequest.unit || !newRequest.tenant || isCreating}
              className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light"
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

      {/* Modern Minimal Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
            <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <Wrench className="h-7 w-7 text-gray-600" />
              </div>
                <div>
                <p className="text-3xl font-extralight text-black">{totalRequests}</p>
                <p className="text-sm text-gray-600 font-light">Total Requests</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Activity className="h-3 w-3" />
                  Active portfolio
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
                <p className="text-3xl font-extralight text-black">{pendingRequests}</p>
                <p className="text-sm text-gray-600 font-light">Pending</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Timer className="h-3 w-3" />
                  Awaiting assignment
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
                <p className="text-3xl font-extralight text-black">{inProgressRequests}</p>
                <p className="text-sm text-gray-600 font-light">In Progress</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Settings className="h-3 w-3" />
                  Active work
                </div>
                </div>
              </div>
            </CardContent>
          </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
            <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <CheckCircle className="h-7 w-7 text-gray-600" />
              </div>
                <div>
                <p className="text-3xl font-extralight text-black">{completedRequests}</p>
                <p className="text-sm text-gray-600 font-light">Completed</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                  <Award className="h-3 w-3" />
                  Successfully finished
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>

      {/* Modern Minimal Additional Maintenance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{avgUrgencyScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Avg Urgency Score</div>
          <div className="text-xs text-gray-600">Request priority</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{emergencyRequests}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Emergency Requests</div>
          <div className="text-xs text-gray-600">Urgent repairs</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{avgVendorRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Avg Vendor Rating</div>
          <div className="text-xs text-gray-600">Service quality</div>
        </div>
        
        <div className="text-center p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-extralight text-black mb-1">{followUpRequired}</div>
          <div className="text-sm text-gray-600 mb-1 font-light">Follow-up Required</div>
          <div className="text-xs text-gray-600">Needs attention</div>
        </div>
        </div>

        {/* Modern Minimal Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search maintenance requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                  />
                </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 border-gray-200 rounded-xl">
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
          <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50 font-light">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
              </Button>
            </div>
      </div>

      {/* Modern Minimal Maintenance Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <Card 
              key={request.id} 
              ref={recentlyCreatedId === request.id ? newRequestRef : null}
              className={`hover:shadow-md transition-all duration-200 relative border-0 bg-white shadow-sm ${
                recentlyCreatedId === request.id 
                  ? 'ring-2 ring-gray-500 ring-opacity-50 bg-gray-50/50 shadow-md' 
                  : ''
              }`}
            >
              {recentlyCreatedId === request.id && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gray-500 text-white animate-pulse">
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
                          <h3 className="font-light text-lg text-black">{request.title}</h3>
                          <p className="text-sm text-gray-600">{request.description}</p>
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
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-500">Property:</span>
                          <span className="font-light text-black">{request.property}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Unit:</span>
                          <span className="font-light text-black">{request.unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-500">Tenant:</span>
                          <span className="font-light text-black">{request.tenant}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-500">Reported:</span>
                          <span className="font-light text-black">{new Date(request.dateReported).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-500">Est. Cost:</span>
                            <span className="font-light text-black">${request.estimatedCost}</span>
                          </div>
                          {request.assignedVendor && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">Vendor:</span>
                              <span className="font-light text-black">{request.assignedVendor}</span>
                            </div>
                          )}
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-gray-50">
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
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-12 text-center">
            <Wrench className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-700">No maintenance requests found</h3>
            <p className="text-slate-500 mb-4">
              {searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters' : 'All caught up! No pending maintenance requests.'}
            </p>
            <Button 
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 py-3"
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
