import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Clock,
  Calendar,
  DollarSign,
  Star,
  Search,
  Filter,
  Eye,
  Download,
  Printer,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Shield,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Timer,
  CheckCircle2,
  AlertTriangle,
  Clock4,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
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
  Building2,
  Users,
  Wrench,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

interface WorkHistory {
  id: string;
  taskId: string;
  taskTitle: string;
  completedDate: string;
  hoursWorked: number;
  cost: number;
  rating: number;
  feedback?: string;
  property?: string;
  unit?: string;
  tenant?: string;
  category?: string;
}

const WorkHistory = () => {
  const { user, profile } = useAuth();
  const { formatCurrency } = useCurrency();
  const { toast } = useToast();
  const { navigateTo } = useLanguageNavigation();

  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  // Modal states
  const [showWorkDetailsModal, setShowWorkDetailsModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkHistory | null>(null);

  // Load work history from localStorage
  useEffect(() => {
    loadWorkHistory();
  }, []);

  const loadWorkHistory = () => {
    try {
      const savedHistory = localStorage.getItem('pms-work-history');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setWorkHistory(history);
      } else {
        // Create default work history
        const defaultHistory: WorkHistory[] = [
          {
            id: 'wh-001',
            taskId: 'mt-003',
            taskTitle: 'Electrical Outlet Repair',
            completedDate: '2025-01-14',
            hoursWorked: 2,
            cost: 180,
            rating: 5,
            feedback: 'Excellent work, very professional',
            property: 'Downtown Residences',
            unit: '2C',
            tenant: 'Mike Johnson',
            category: 'electrical'
          },
          {
            id: 'wh-002',
            taskId: 'mt-004',
            taskTitle: 'Plumbing Repair',
            completedDate: '2025-01-12',
            hoursWorked: 1.5,
            cost: 120,
            rating: 4,
            feedback: 'Quick and efficient service',
            property: 'Sunset Apartments',
            unit: '4B',
            tenant: 'Lisa Brown',
            category: 'plumbing'
          },
          {
            id: 'wh-003',
            taskId: 'mt-005',
            taskTitle: 'HVAC Maintenance',
            completedDate: '2025-01-10',
            hoursWorked: 3,
            cost: 250,
            rating: 5,
            feedback: 'Thorough inspection and maintenance',
            property: 'Garden View Apartments',
            unit: '1A',
            tenant: 'Sarah Wilson',
            category: 'hvac'
          },
          {
            id: 'wh-004',
            taskId: 'mt-006',
            taskTitle: 'Appliance Repair',
            completedDate: '2025-01-08',
            hoursWorked: 1,
            cost: 95,
            rating: 4,
            feedback: 'Fixed the issue quickly',
            property: 'Downtown Residences',
            unit: '3A',
            tenant: 'David Lee',
            category: 'appliances'
          }
        ];
        setWorkHistory(defaultHistory);
        localStorage.setItem('pms-work-history', JSON.stringify(defaultHistory));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading work history:', error);
      setLoading(false);
    }
  };

  // Filter work history based on search and filters
  const filteredWork = workHistory.filter(work => {
    const matchesSearch = work.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         work.property?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         work.tenant?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'week' && isWithinWeek(work.completedDate)) ||
      (dateFilter === 'month' && isWithinMonth(work.completedDate)) ||
      (dateFilter === 'year' && isWithinYear(work.completedDate));
    
    const matchesRating = ratingFilter === 'all' || 
      (ratingFilter === '5' && work.rating === 5) ||
      (ratingFilter === '4' && work.rating === 4) ||
      (ratingFilter === '3' && work.rating === 3) ||
      (ratingFilter === '2' && work.rating === 2) ||
      (ratingFilter === '1' && work.rating === 1);
    
    return matchesSearch && matchesDate && matchesRating;
  });

  const isWithinWeek = (date: string) => {
    const workDate = new Date(date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return workDate >= weekAgo;
  };

  const isWithinMonth = (date: string) => {
    const workDate = new Date(date);
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return workDate >= monthAgo;
  };

  const isWithinYear = (date: string) => {
    const workDate = new Date(date);
    const now = new Date();
    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    return workDate >= yearAgo;
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm font-light text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  const handleViewDetails = (work: WorkHistory) => {
    setSelectedWork(work);
    setShowWorkDetailsModal(true);
  };

  const handleExportHistory = () => {
    const csvContent = [
      ['Task Title', 'Completed Date', 'Hours Worked', 'Cost', 'Rating', 'Property', 'Unit', 'Tenant', 'Category', 'Feedback'],
      ...filteredWork.map(work => [
        work.taskTitle,
        work.completedDate,
        work.hoursWorked.toString(),
        work.cost.toString(),
        work.rating.toString(),
        work.property || '',
        work.unit || '',
        work.tenant || '',
        work.category || '',
        work.feedback || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `work-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Work history has been exported to CSV.",
    });
  };

  // Calculate statistics
  const totalEarnings = filteredWork.reduce((sum, work) => sum + work.cost, 0);
  const totalHours = filteredWork.reduce((sum, work) => sum + work.hoursWorked, 0);
  const averageRating = filteredWork.length > 0 
    ? (filteredWork.reduce((sum, work) => sum + work.rating, 0) / filteredWork.length).toFixed(1)
    : '0.0';
  const totalJobs = filteredWork.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600 font-light">Loading work history...</p>
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
                Work History
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Track your completed maintenance work and earnings performance.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{workHistory.length} completed jobs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatCurrency(totalEarnings)} total earnings</span>
                </div>
                {workHistory.filter(w => w.rating === 5).length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Star className="h-4 w-4" />
                    <span>{workHistory.filter(w => w.rating === 5).length} 5-star ratings</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={handleExportHistory}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigateTo('/vendor-dashboard')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Total Jobs
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{totalJobs}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">completed</span>
              </div>
              <div className="text-xs text-gray-500">All time jobs</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Total Earnings
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <DollarSign className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{formatCurrency(totalEarnings)}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">lifetime</span>
              </div>
              <div className="text-xs text-gray-500">Total income</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Total Hours
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{totalHours}h</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">worked</span>
              </div>
              <div className="text-xs text-gray-500">Total time</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Average Rating
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Star className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{averageRating}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">out of 5</span>
              </div>
              <div className="text-xs text-gray-500">Customer satisfaction</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search work history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-light">
                {filteredWork.length} jobs
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work History List */}
      <div className="grid gap-6">
        {filteredWork.map((work) => (
          <Card key={work.id} className="border-0 shadow-sm rounded-3xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-light text-black">{work.taskTitle}</h3>
                    <Badge variant="outline" className="font-light">
                      {work.category}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{work.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{work.hoursWorked}h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{formatCurrency(work.cost)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-light text-gray-600">{work.rating}/5</span>
                    </div>
                  </div>

                  {work.property && (
                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-light text-gray-600">{work.property}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-light text-gray-600">{work.tenant}</span>
                      </div>
                    </div>
                  )}

                  {work.feedback && (
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-sm font-light text-gray-600">
                        <strong>Feedback:</strong> {work.feedback}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <div className="text-right">
                    {getRatingStars(work.rating)}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(work)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWork.length === 0 && (
        <Card className="border-0 shadow-sm rounded-3xl">
          <CardContent className="p-12 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-light text-gray-600 mb-2">No work history found</h3>
            <p className="text-gray-500 font-light">No completed work matches your current filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Work Details Modal */}
      <Dialog open={showWorkDetailsModal} onOpenChange={setShowWorkDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Work Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the completed work
            </DialogDescription>
          </DialogHeader>
          {selectedWork && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-light text-gray-600">Task Title</Label>
                  <p className="text-lg font-light text-black">{selectedWork.taskTitle}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Completed Date</Label>
                  <p className="text-sm font-light text-black">{selectedWork.completedDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Hours Worked</Label>
                  <p className="text-sm font-light text-black">{selectedWork.hoursWorked}h</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Cost</Label>
                  <p className="text-sm font-light text-black">{formatCurrency(selectedWork.cost)}</p>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Rating</Label>
                  <div className="mt-1">{getRatingStars(selectedWork.rating)}</div>
                </div>
                <div>
                  <Label className="text-sm font-light text-gray-600">Category</Label>
                  <p className="text-sm font-light text-black capitalize">{selectedWork.category}</p>
                </div>
                {selectedWork.property && (
                  <div>
                    <Label className="text-sm font-light text-gray-600">Property</Label>
                    <p className="text-sm font-light text-black">{selectedWork.property}</p>
                  </div>
                )}
                {selectedWork.unit && (
                  <div>
                    <Label className="text-sm font-light text-gray-600">Unit</Label>
                    <p className="text-sm font-light text-black">{selectedWork.unit}</p>
                  </div>
                )}
                {selectedWork.tenant && (
                  <div>
                    <Label className="text-sm font-light text-gray-600">Tenant</Label>
                    <p className="text-sm font-light text-black">{selectedWork.tenant}</p>
                  </div>
                )}
              </div>
              {selectedWork.feedback && (
                <div>
                  <Label className="text-sm font-light text-gray-600">Feedback</Label>
                  <p className="text-sm font-light text-black mt-1">{selectedWork.feedback}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWorkDetailsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkHistory;
