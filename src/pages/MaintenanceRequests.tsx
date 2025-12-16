import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Plus, Clock, CheckCircle, AlertTriangle, ArrowUpRight, Calendar, Eye, MessageSquare, Phone, Mail, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  dateReported: string;
  tenant: string;
  property: string;
  unit: string;
}

const initialRequests: MaintenanceRequest[] = [
  {
    id: 'mr-001',
    title: 'Leaky Faucet',
    description: 'Kitchen sink faucet is leaking',
    status: 'pending',
    priority: 'medium',
    category: 'plumbing',
    dateReported: '2025-03-10',
    tenant: 'John Doe',
    property: 'Sunset Apartments',
    unit: '2B'
  }
];

const MaintenanceRequests = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showRequestHistoryModal, setShowRequestHistoryModal] = useState(false);
  const [showRequestDetailsModal, setShowRequestDetailsModal] = useState(false);
  const [showAllRequestsModal, setShowAllRequestsModal] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  
  // New request form state
  const [newRequestForm, setNewRequestForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  // Load maintenance requests from localStorage
  useEffect(() => {
    const loadMaintenanceRequests = () => {
      try {
        if (!user || !profile) {
          setLoading(false);
          return;
        }

        // Get maintenance requests from localStorage
        const storedRequests = localStorage.getItem('pms-maintenance-requests');
        
        if (storedRequests) {
          const parsedRequests = JSON.parse(storedRequests);
          // Filter requests for current tenant
          const tenantRequests = parsedRequests.filter((req: MaintenanceRequest) => 
            req.tenant === profile.name || req.tenant === user.email
          );
          setRequests(tenantRequests);
        } else {
          // If no stored requests, use initial data and save it
          setRequests(initialRequests);
          localStorage.setItem('pms-maintenance-requests', JSON.stringify(initialRequests));
        }
      } catch (error) {
        console.error('Error loading maintenance requests:', error);
        setRequests(initialRequests);
      } finally {
        setLoading(false);
      }
    };

    loadMaintenanceRequests();
  }, [user, profile]);

  // Listen for storage changes and custom events to refresh data when new requests are added
  useEffect(() => {
    const handleStorageChange = () => {
      const storedRequests = localStorage.getItem('pms-maintenance-requests');
      if (storedRequests) {
        const parsedRequests = JSON.parse(storedRequests);
        const tenantRequests = parsedRequests.filter((req: MaintenanceRequest) => 
          req.tenant === profile?.name || req.tenant === user?.email
        );
        setRequests(tenantRequests);
      }
    };

    const handleMaintenanceRequestAdded = () => {
      handleStorageChange();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('maintenanceRequestAdded', handleMaintenanceRequestAdded);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('maintenanceRequestAdded', handleMaintenanceRequestAdded);
    };
  }, [user, profile]);

  const getBadge = (status: MaintenanceRequest['status']) => {
    if (status === 'completed') {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Completed</Badge>;
    }
    if (status === 'in_progress') {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">In Progress</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>;
  };

  const getIcon = (status: MaintenanceRequest['status']) => {
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-gray-600" />;
    if (status === 'in_progress') return <Clock className="h-4 w-4 text-gray-600" />;
    return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  };

  const getPriorityBadge = (priority: MaintenanceRequest['priority']) => {
    const priorityColors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      urgent: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge className={`${priorityColors[priority]} text-xs`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const refreshRequests = () => {
    const storedRequests = localStorage.getItem('pms-maintenance-requests');
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      const tenantRequests = parsedRequests.filter((req: MaintenanceRequest) => 
        req.tenant === profile?.name || req.tenant === user?.email
      );
      setRequests(tenantRequests);
    }
    toast({
      title: "Data Refreshed",
      description: "Maintenance requests have been updated.",
    });
  };

  // Handle Request History - Show chronological timeline view
  const handleRequestHistory = () => {
    setShowRequestHistoryModal(true);
  };

  // Handle View Details
  const handleViewDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setShowRequestDetailsModal(true);
  };

  // Handle View All Requests - Show comprehensive table view with filters
  const handleViewAllRequests = () => {
    setShowAllRequestsModal(true);
  };

  // Handle New Request (open modal)
  const handleNewRequest = () => {
    setNewRequestForm({
      title: '',
      description: '',
      priority: 'medium',
      category: 'general'
    });
    setShowNewRequestModal(true);
  };

  // Handle New Request Submission
  const handleNewRequestSubmit = () => {
    if (newRequestForm.title && newRequestForm.description) {
      // Create new maintenance request
      const newRequest = {
        id: `mr-${Date.now()}`,
        title: newRequestForm.title,
        description: newRequestForm.description,
        status: 'pending' as const,
        priority: newRequestForm.priority as 'low' | 'medium' | 'high' | 'urgent',
        category: newRequestForm.category,
        dateReported: new Date().toISOString().split('T')[0],
        tenant: profile?.name || user?.email || 'Unknown Tenant',
        property: 'Downtown Residences',
        unit: '5B'
      };
      
      // Add to existing maintenance requests
      const updatedRequests = [...requests, newRequest];
      setRequests(updatedRequests);
      
      // Save to localStorage
      const existingMaintenance = JSON.parse(localStorage.getItem('pms-maintenance-requests') || '[]');
      const updatedMaintenance = [...existingMaintenance, newRequest];
      localStorage.setItem('pms-maintenance-requests', JSON.stringify(updatedMaintenance));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('maintenanceRequestAdded', { detail: newRequest }));
      
      toast({
        title: "Request Submitted",
        description: "Your maintenance request has been submitted successfully.",
      });
      
      setShowNewRequestModal(false);
      setNewRequestForm({ title: '', description: '', priority: 'medium', category: 'general' });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and description fields.",
        variant: "destructive"
      });
    }
  };

  // Handle Contact Property Manager
  const handleContactManager = () => {
    toast({
      title: "Contact Property Manager",
      description: "Opening contact options for your property management team.",
    });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in_progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  if (loading) {
    return (
      <div className="space-y-8 p-1">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-light">Loading maintenance requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Maintenance Requests
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Submit maintenance requests, track their progress, and communicate with your property management team. Keep your living space in perfect condition.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{requests.length} total requests</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>{pendingCount} pending</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={refreshRequests}
              >
                <Clock className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                variant="outline"
                onClick={handleRequestHistory}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Request History
              </Button>
              <Button 
                onClick={handleNewRequest}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Pending Requests
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{pendingCount}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Awaiting response</span>
              </div>
              <div className="text-xs text-gray-500">Newly submitted requests</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              In Progress
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{inProgressCount}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Being addressed</span>
              </div>
              <div className="text-xs text-gray-500">Work in progress</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Completed
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{completedCount}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Successfully resolved</span>
              </div>
              <div className="text-xs text-gray-500">Completed requests</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Requests List */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-3 text-lg font-light">
            <div className="p-2 rounded-lg bg-gray-100">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
            Recent Requests
            <Badge variant="secondary" className="ml-auto font-light">{requests.length} requests</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {requests.length > 0 ? (
              requests.map((r) => (
                <div key={r.id} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                    {getIcon(r.status)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-light text-black">{r.title}</p>
                      {getBadge(r.status)}
                      {getPriorityBadge(r.priority)}
                    </div>
                    <p className="text-xs text-gray-500">{r.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Reported: {r.dateReported}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="capitalize">{r.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{r.property} - Unit {r.unit}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDetails(r)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <Wrench className="h-12 w-12 text-gray-300 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">No maintenance requests</p>
                    <p className="text-xs text-gray-400">Submit a request when you need maintenance</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={handleViewAllRequests}
            >
              View All Requests
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Request History Modal - Timeline View */}
      <Dialog open={showRequestHistoryModal} onOpenChange={setShowRequestHistoryModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Request Timeline
            </DialogTitle>
            <DialogDescription>
              Chronological timeline of your maintenance requests and their progress.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {requests.length > 0 ? (
              <div className="space-y-4">
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  {requests
                    .sort((a, b) => new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime())
                    .map((request, index) => (
                    <div key={request.id} className="relative flex items-start gap-4 pb-6">
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          request.status === 'completed' ? 'bg-green-100' :
                          request.status === 'in_progress' ? 'bg-blue-100' : 'bg-yellow-100'
                        }`}>
                          {getIcon(request.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{request.title}</h4>
                                {getBadge(request.status)}
                                {getPriorityBadge(request.priority)}
                              </div>
                              <p className="text-xs text-gray-500">{request.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{request.dateReported}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="capitalize">{request.category}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowRequestHistoryModal(false);
                                setShowRequestDetailsModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Summary Stats */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Timeline Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-medium text-yellow-600">{pendingCount}</div>
                      <div className="text-xs text-gray-500">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-blue-600">{inProgressCount}</div>
                      <div className="text-xs text-gray-500">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-green-600">{completedCount}</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No request history found</p>
                <p className="text-sm text-gray-400">Submit your first maintenance request to get started</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestHistoryModal(false)}>
              Close
            </Button>
            <Button onClick={handleNewRequest}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal */}
      <Dialog open={showRequestDetailsModal} onOpenChange={setShowRequestDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Request Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about your maintenance request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedRequest && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Request Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Request ID:</span>
                      <span className="font-medium">{selectedRequest.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{selectedRequest.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getBadge(selectedRequest.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedRequest.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{selectedRequest.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date Reported:</span>
                      <span className="font-medium">{selectedRequest.dateReported}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Description</h4>
                  <p className="text-sm text-gray-700">{selectedRequest.description}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Property Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-medium">{selectedRequest.property}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium">{selectedRequest.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenant:</span>
                      <span className="font-medium">{selectedRequest.tenant}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDetailsModal(false)}>
              Close
            </Button>
            <Button onClick={handleContactManager}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Manager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Requests Modal - Comprehensive Table View */}
      <Dialog open={showAllRequestsModal} onOpenChange={setShowAllRequestsModal}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              All Maintenance Requests
            </DialogTitle>
            <DialogDescription>
              Comprehensive view of all your maintenance requests with filtering and sorting options.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {requests.length > 0 ? (
              <div className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-yellow-800">{pendingCount}</div>
                        <div className="text-sm text-yellow-600">Pending Requests</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-blue-800">{inProgressCount}</div>
                        <div className="text-sm text-blue-600">In Progress</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-medium text-green-800">{completedCount}</div>
                        <div className="text-sm text-green-600">Completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requests Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-medium text-sm text-gray-700">Request Details</h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {requests.map((request) => (
                      <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-gray-100">
                              {getIcon(request.status)}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{request.title}</h4>
                                {getBadge(request.status)}
                                {getPriorityBadge(request.priority)}
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>ID: {request.id}</span>
                                <span>•</span>
                                <span>{request.dateReported}</span>
                                <span>•</span>
                                <span className="capitalize">{request.category}</span>
                                <span>•</span>
                                <span>{request.property} - Unit {request.unit}</span>
                              </div>
                              <p className="text-xs text-gray-600 max-w-md">{request.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowAllRequestsModal(false);
                                setShowRequestDetailsModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleRequestHistory}>
                      <Calendar className="h-4 w-4 mr-2" />
                      View Timeline
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleContactManager}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Manager
                    </Button>
                    <Button size="sm" onClick={handleNewRequest}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No maintenance requests found</p>
                <p className="text-sm text-gray-400">Submit your first request to get started</p>
                <div className="mt-4">
                  <Button onClick={handleNewRequest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Request
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllRequestsModal(false)}>
              Close
            </Button>
            <Button onClick={handleNewRequest}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Request Modal */}
      <Dialog open={showNewRequestModal} onOpenChange={setShowNewRequestModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Submit New Request
            </DialogTitle>
            <DialogDescription>
              Report a maintenance issue or request service for your unit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="request-title">Request Title</Label>
              <Input
                id="request-title"
                placeholder="Brief description of the issue"
                value={newRequestForm.title}
                onChange={(e) => setNewRequestForm({...newRequestForm, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newRequestForm.category} onValueChange={(value) => setNewRequestForm({...newRequestForm, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC/Heating</SelectItem>
                  <SelectItem value="appliances">Appliances</SelectItem>
                  <SelectItem value="structural">Structural</SelectItem>
                  <SelectItem value="general">General Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={newRequestForm.priority} onValueChange={(value) => setNewRequestForm({...newRequestForm, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Non-urgent</SelectItem>
                  <SelectItem value="medium">Medium - Standard</SelectItem>
                  <SelectItem value="high">High - Important</SelectItem>
                  <SelectItem value="urgent">Urgent - Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                value={newRequestForm.description}
                onChange={(e) => setNewRequestForm({...newRequestForm, description: e.target.value})}
                rows={4}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Property:</strong> Downtown Residences - Unit 5B
              </p>
              <p className="text-sm text-gray-600">
                <strong>Requested by:</strong> {profile?.name || user?.email || 'Current User'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRequestModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewRequestSubmit}>
              <Plus className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaintenanceRequests;


