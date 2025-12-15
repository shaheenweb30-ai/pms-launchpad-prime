import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wrench,
  Plus,
  Search,
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
  Home,
  Building2,
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
import { useAuth } from '@/contexts/AuthContext';

const TenantMaintenance = () => {
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'plumbing',
    priority: 'medium',
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
  const [isCreating, setIsCreating] = useState(false);
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([]);

  // Load maintenance requests from localStorage on component mount
  useEffect(() => {
    loadMaintenanceRequests();
  }, []);

  const loadMaintenanceRequests = () => {
    try {
      const savedMaintenance = localStorage.getItem('pms-maintenance-requests');
      if (savedMaintenance) {
        const maintenance = JSON.parse(savedMaintenance);
        const tenantMaintenance = maintenance.filter((m: any) => 
          m.tenant === profile?.first_name + ' ' + profile?.last_name
        );
        setMaintenanceRequests(tenantMaintenance);
      }
    } catch (error) {
      console.error('Error loading maintenance requests:', error);
    }
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleCreateRequest = async () => {
    // Validate required fields
    const errors: {[key: string]: string} = {};
    
    if (!newRequest.title.trim()) errors.title = 'Title is required';
    if (!newRequest.description.trim()) errors.description = 'Description is required';
    
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
        id: Date.now(),
        ...newRequest,
        tenant: profile?.first_name + ' ' + profile?.last_name,
        property: 'Current Property', // This would come from tenant's lease
        unit: 'Current Unit', // This would come from tenant's lease
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

      // Add new request to the list
      const updatedRequests = [request, ...maintenanceRequests];
      setMaintenanceRequests(updatedRequests);
      
      // Save to localStorage
      try {
        const existingMaintenance = localStorage.getItem('pms-maintenance-requests');
        const allMaintenance = existingMaintenance ? JSON.parse(existingMaintenance) : [];
        allMaintenance.unshift(request);
        localStorage.setItem('pms-maintenance-requests', JSON.stringify(allMaintenance));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Reset form and close modal
      setNewRequest({
        title: '',
        description: '',
        category: 'plumbing',
        priority: 'medium',
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
      
      toast.success(`Maintenance request "${request.title}" submitted successfully!`, {
        description: `Your request has been received and is being reviewed.`,
        duration: 5000,
      });
    } catch (error) {
      toast.error('Failed to submit maintenance request. Please try again.');
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
      category: 'plumbing',
      priority: 'medium',
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
      category: 'plumbing',
      priority: 'medium',
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-8 border border-orange-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent tracking-tight">
                Maintenance Requests
              </h1>
              <p className="text-lg text-orange-600 max-w-2xl font-light leading-relaxed">
                Submit maintenance requests and track their progress. Get quick responses from your property management team.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-orange-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">{maintenanceRequests.length} total requests</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-500">
                  <Clock className="h-4 w-4" />
                  <span>{maintenanceRequests.filter(r => r.status === 'pending').length} pending</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 font-light"
                onClick={loadMaintenanceRequests}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light"
                onClick={handleOpenCreateModal}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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
        </div>
      </div>

      {/* Maintenance Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <Card 
              key={request.id} 
              className="hover:shadow-md transition-all duration-200 relative border-0 bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getCategoryIcon(request.category)}
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
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-500">Reported:</span>
                          <span className="font-light text-black">{new Date(request.dateReported).toLocaleDateString()}</span>
                        </div>
                        {request.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-500">Due:</span>
                            <span className="font-light text-black">{new Date(request.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {request.estimatedCost > 0 && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-500">Est. Cost:</span>
                            <span className="font-light text-black">${request.estimatedCost}</span>
                          </div>
                        )}
                        {request.assignedVendor && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">Vendor:</span>
                            <span className="font-light text-black">{request.assignedVendor}</span>
                          </div>
                        )}
                      </div>
                      
                      {request.emergencyLevel && (
                        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-800">Emergency Request - 24hr response required</span>
                        </div>
                      )}
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
            <Wrench className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-orange-700">No maintenance requests found</h3>
            <p className="text-orange-500 mb-4">
              {searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Submit your first maintenance request to get started!'}
            </p>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl px-6 py-3"
              onClick={handleOpenCreateModal}
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Maintenance Request Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-black">
              Submit Maintenance Request
            </DialogTitle>
            <DialogDescription className="font-light text-gray-600">
              Fill out the form below to submit a new maintenance request. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-black border-b pb-2">Request Details</h3>
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
                  <Label htmlFor="dueDate">Preferred Due Date</Label>
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
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Calculated Urgency Score:</span>
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
                    <span className="text-xs text-orange-500">/ 100</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-orange-600">
                  {newRequest.emergencyLevel && '🚨 Emergency level selected - 24hr response required'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'urgent' && '⚡ Urgent priority - immediate attention needed'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'high' && '🔴 High priority - schedule within 48 hours'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'medium' && '🟡 Medium priority - schedule within 1 week'}
                  {!newRequest.emergencyLevel && newRequest.priority === 'low' && '🟢 Low priority - schedule when convenient'}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-black border-b pb-2">Additional Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenantAvailability">Your Availability</Label>
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
              </div>
            </div>
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
              disabled={!newRequest.title || !newRequest.description || isCreating}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light"
            >
              {isCreating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantMaintenance;
