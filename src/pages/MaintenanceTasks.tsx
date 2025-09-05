import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Building2,
  Users,
  Activity,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  Info,
  Zap,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  Archive,
  Settings,
  HelpCircle,
  PiggyBank,
  Wallet,
  Coins,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  MessageSquare,
  Bell,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  property: string;
  unit: string;
  tenant: string;
  assignedDate: string;
  dueDate: string;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
  completionNotes?: string;
  hoursWorked?: number;
}

const MaintenanceTasks = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  // Modal states
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  
  // Update form state
  const [updateForm, setUpdateForm] = useState({
    status: '',
    actualCost: '',
    hoursWorked: '',
    completionNotes: '',
    notes: ''
  });

  // Load maintenance tasks from localStorage
  useEffect(() => {
    loadMaintenanceTasks();
  }, []);

  const loadMaintenanceTasks = () => {
    try {
      const savedTasks = localStorage.getItem('pms-maintenance-tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        setTasks(tasks);
      } else {
        // Create default tasks if none exist
        const defaultTasks: MaintenanceTask[] = [
          {
            id: 'mt-001',
            title: 'Fix Leaky Faucet',
            description: 'Kitchen sink faucet needs repair',
            status: 'pending',
            priority: 'medium',
            category: 'plumbing',
            property: 'Downtown Residences',
            unit: '5B',
            tenant: 'John Doe',
            assignedDate: '2025-01-15',
            dueDate: '2025-01-17',
            estimatedCost: 150,
            notes: 'Tenant available after 5 PM'
          },
          {
            id: 'mt-002',
            title: 'HVAC Maintenance',
            description: 'Quarterly HVAC system check',
            status: 'in-progress',
            priority: 'high',
            category: 'hvac',
            property: 'Sunset Apartments',
            unit: '3A',
            tenant: 'Jane Smith',
            assignedDate: '2025-01-14',
            dueDate: '2025-01-16',
            estimatedCost: 300,
            actualCost: 280,
            notes: 'Filter replacement needed'
          },
          {
            id: 'mt-003',
            title: 'Electrical Outlet Repair',
            description: 'Bedroom outlet not working',
            status: 'completed',
            priority: 'urgent',
            category: 'electrical',
            property: 'Downtown Residences',
            unit: '2C',
            tenant: 'Mike Johnson',
            assignedDate: '2025-01-13',
            dueDate: '2025-01-14',
            estimatedCost: 200,
            actualCost: 180,
            notes: 'Wiring issue resolved',
            completionNotes: 'Replaced faulty outlet and tested all connections',
            hoursWorked: 2
          },
          {
            id: 'mt-004',
            title: 'Appliance Repair',
            description: 'Dishwasher not draining properly',
            status: 'pending',
            priority: 'low',
            category: 'appliances',
            property: 'Garden View Apartments',
            unit: '1A',
            tenant: 'Sarah Wilson',
            assignedDate: '2025-01-16',
            dueDate: '2025-01-18',
            estimatedCost: 120,
            notes: 'Check drain hose and pump'
          }
        ];
        setTasks(defaultTasks);
        localStorage.setItem('pms-maintenance-tasks', JSON.stringify(defaultTasks));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading maintenance tasks:', error);
      setLoading(false);
    }
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Activity },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} font-light`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', icon: Info },
      medium: { color: 'bg-blue-100 text-blue-800', icon: Clock4 },
      high: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      urgent: { color: 'bg-red-100 text-red-800', icon: Zap }
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} font-light`}>
        <Icon className="h-3 w-3 mr-1" />
        {priority}
      </Badge>
    );
  };

  const handleViewDetails = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
  };

  const handleUpdateTask = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setUpdateForm({
      status: task.status,
      actualCost: task.actualCost?.toString() || '',
      hoursWorked: task.hoursWorked?.toString() || '',
      completionNotes: task.completionNotes || '',
      notes: task.notes || ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = () => {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      status: updateForm.status as MaintenanceTask['status'],
      actualCost: updateForm.actualCost ? parseFloat(updateForm.actualCost) : undefined,
      hoursWorked: updateForm.hoursWorked ? parseFloat(updateForm.hoursWorked) : undefined,
      completionNotes: updateForm.completionNotes,
      notes: updateForm.notes
    };

    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? updatedTask : task
    );
    
    setTasks(updatedTasks);
    localStorage.setItem('pms-maintenance-tasks', JSON.stringify(updatedTasks));

    // If task is completed, add to work history
    if (updateForm.status === 'completed' && updateForm.actualCost && updateForm.hoursWorked) {
      const workHistory = JSON.parse(localStorage.getItem('pms-work-history') || '[]');
      const newWorkEntry = {
        id: `wh-${Date.now()}`,
        taskId: selectedTask.id,
        taskTitle: selectedTask.title,
        completedDate: new Date().toISOString().split('T')[0],
        hoursWorked: parseFloat(updateForm.hoursWorked),
        cost: parseFloat(updateForm.actualCost),
        rating: 0, // Will be updated by property manager
        feedback: updateForm.completionNotes
      };
      workHistory.push(newWorkEntry);
      localStorage.setItem('pms-work-history', JSON.stringify(workHistory));
    }

    toast({
      title: "Task Updated",
      description: "Maintenance task has been updated successfully.",
    });

    setShowUpdateModal(false);
    setSelectedTask(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600 font-light">Loading maintenance tasks...</p>
            </div>
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
                Maintenance Tasks
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Manage your assigned maintenance tasks and track your progress.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{tasks.length} total tasks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>{tasks.filter(t => t.status === 'pending').length} pending</span>
                </div>
                {tasks.filter(t => t.priority === 'urgent').length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <Bell className="h-4 w-4" />
                    <span>{tasks.filter(t => t.priority === 'urgent').length} urgent</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/vendor-dashboard')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-light">
                {filteredTasks.length} tasks
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="grid gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="border-0 shadow-sm rounded-3xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-light text-black">{task.title}</h3>
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                  <p className="text-gray-600 font-light mb-4">{task.description}</p>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{task.property}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{task.tenant}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">Due: {task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{formatCurrency(task.estimatedCost)}</span>
                    </div>
                  </div>

                  {task.notes && (
                    <div className="bg-gray-50 p-3 rounded-xl mb-4">
                      <p className="text-sm font-light text-gray-600">
                        <strong>Notes:</strong> {task.notes}
                      </p>
                    </div>
                  )}

                  {task.status === 'completed' && task.completionNotes && (
                    <div className="bg-green-50 p-3 rounded-xl mb-4">
                      <p className="text-sm font-light text-green-700">
                        <strong>Completion Notes:</strong> {task.completionNotes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(task)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleUpdateTask(task)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="border-0 shadow-sm rounded-3xl">
          <CardContent className="p-12 text-center">
            <Wrench className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-light text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500 font-light">No maintenance tasks match your current filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Task Details Modal */}
      <Dialog open={showTaskDetailsModal} onOpenChange={setShowTaskDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Task Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the maintenance task
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-light text-gray-600">Task Title</Label>
                  <p className="text-lg font-light text-black">{selectedTask.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedTask.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedTask.priority)}</div>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Category</Label>
                  <p className="text-sm font-light text-black capitalize">{selectedTask.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Property</Label>
                  <p className="text-sm font-light text-black">{selectedTask.property} - Unit {selectedTask.unit}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Tenant</Label>
                  <p className="text-sm font-light text-black">{selectedTask.tenant}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Assigned Date</Label>
                  <p className="text-sm font-light text-black">{selectedTask.assignedDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Due Date</Label>
                  <p className="text-sm font-light text-black">{selectedTask.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Estimated Cost</Label>
                  <p className="text-sm font-light text-black">{formatCurrency(selectedTask.estimatedCost)}</p>
                </div>
                {selectedTask.actualCost && (
                  <div>
                    <Label className="text-sm font-light text-gray-600">Actual Cost</Label>
                    <p className="text-sm font-light text-black">{formatCurrency(selectedTask.actualCost)}</p>
                  </div>
                )}
                {selectedTask.hoursWorked && (
                  <div>
                    <Label className="text-sm font-light text-gray-600">Hours Worked</Label>
                    <p className="text-sm font-light text-black">{selectedTask.hoursWorked}h</p>
                  </div>
                )}
              </div>
              <div>
                <Label className="text-sm font-light text-gray-600">Description</Label>
                <p className="text-sm font-light text-black mt-1">{selectedTask.description}</p>
              </div>
              {selectedTask.notes && (
                <div>
                  <Label className="text-sm font-light text-gray-600">Notes</Label>
                  <p className="text-sm font-light text-black mt-1">{selectedTask.notes}</p>
                </div>
              )}
              {selectedTask.completionNotes && (
                <div>
                  <Label className="text-sm font-light text-gray-600">Completion Notes</Label>
                  <p className="text-sm font-light text-black mt-1">{selectedTask.completionNotes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaskDetailsModal(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowTaskDetailsModal(false);
              if (selectedTask) handleUpdateTask(selectedTask);
            }}>
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Task Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Update Task
            </DialogTitle>
            <DialogDescription>
              Update the status and details of the maintenance task
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={updateForm.status} onValueChange={(value) => setUpdateForm({...updateForm, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="actual-cost">Actual Cost</Label>
              <Input
                id="actual-cost"
                type="number"
                placeholder="Enter actual cost"
                value={updateForm.actualCost}
                onChange={(e) => setUpdateForm({...updateForm, actualCost: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours-worked">Hours Worked</Label>
              <Input
                id="hours-worked"
                type="number"
                step="0.5"
                placeholder="Enter hours worked"
                value={updateForm.hoursWorked}
                onChange={(e) => setUpdateForm({...updateForm, hoursWorked: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion-notes">Completion Notes</Label>
              <Textarea
                id="completion-notes"
                placeholder="Enter completion notes..."
                value={updateForm.completionNotes}
                onChange={(e) => setUpdateForm({...updateForm, completionNotes: e.target.value})}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter additional notes..."
                value={updateForm.notes}
                onChange={(e) => setUpdateForm({...updateForm, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit}>
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaintenanceTasks;
