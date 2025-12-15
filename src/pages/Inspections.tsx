import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Building2,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  FileText,
  Camera,
  Wrench,
  Shield,
  Home,
  Zap,
  Trash2,
  AlertTriangle,
  CheckSquare,
  XSquare,
  Filter,
  MapPin,
  User,
  Phone,
  Mail,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Share,
  RefreshCw,
  Minus,
  Percent,
  Users,
  HomeIcon,
  Briefcase,
  GraduationCap,
  Heart,
  Timer,
  CheckCircle2,
  Clock4,
  Info,
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
  BuildingIcon,
  Car,
  Wifi,
  UtensilsCrossed,
  FileTextIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  EditIcon,
  CalendarIcon,
  Clock as ClockIcon2,
  CheckCircle as CheckCircleIcon2,
  AlertCircle as AlertCircleIcon2,
  XCircleIcon,
  Building2Icon,
  SearchIcon,
  PlusIcon,
  FileText as FileTextIcon2,
  CameraIcon,
  WrenchIcon,
  ShieldIcon,
  Home as HomeIcon2,
  ZapIcon,
  Trash2Icon,
  AlertTriangleIcon,
  CheckSquareIcon,
  XSquareIcon,
  FilterIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart3Icon
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
  DialogFooter,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Inspections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<any>(null);

  // Enhanced inspection data with more details
  const inspections: any[] = [];

  const properties: string[] = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'routine':
        return <Home className="h-4 w-4 text-blue-600" />;
      case 'move_in':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'move_out':
        return <XSquare className="h-4 w-4 text-orange-600" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'annual':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      default:
        return <Home className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getInspectorRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };



  const getImprovementColor = (improvement: string) => {
    if (improvement.includes('+')) return 'text-green-600';
    if (improvement.includes('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDaysUntilScheduled = (scheduledDate: string) => {
    const today = new Date();
    const scheduled = new Date(scheduledDate);
    const diffTime = scheduled.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getScheduledDateColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 1) return 'text-orange-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || inspection.property === propertyFilter;
    const matchesType = typeFilter === 'all' || inspection.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesProperty && matchesType;
  });

  const completedInspections = inspections.filter(ins => ins.status === 'completed').length;
  const scheduledInspections = inspections.filter(ins => ins.status === 'scheduled').length;
  const averageScore = inspections.filter(ins => ins.score !== null)
    .reduce((sum, ins) => sum + ins.score!, 0) / inspections.filter(ins => ins.score !== null).length;
  const highPriorityInspections = inspections.filter(ins => ins.priority === 'high').length;
  
  const avgInspectorRating = inspections.filter(ins => ins.inspectorRating)
    .reduce((sum, ins) => sum + (ins.inspectorRating || 0), 0) / Math.max(inspections.filter(ins => ins.inspectorRating).length, 1);

  const totalPhotos = inspections.reduce((sum, ins) => sum + ins.photos, 0);
  const followUpRequired = inspections.filter(ins => ins.followUpRequired).length;
  const avgInspectionDuration = inspections.filter(ins => ins.inspectionDuration)
    .reduce((sum, ins) => sum + parseFloat(ins.inspectionDuration!.split(' ')[0]), 0) / Math.max(inspections.filter(ins => ins.inspectionDuration).length, 1);
  const totalCriticalIssues = inspections.filter(ins => ins.criticalIssues).reduce((sum, ins) => sum + (ins.criticalIssues || 0), 0);
  const totalMinorIssues = inspections.filter(ins => ins.minorIssues).reduce((sum, ins) => sum + (ins.minorIssues || 0), 0);
  const totalInspections = inspections.length;

  const handleViewInspection = (inspection: any) => {
    setSelectedInspection(inspection);
    setShowInspectionModal(true);
  };

  const handleScheduleInspection = (inspectionId: string) => {
    console.log('Scheduling inspection:', inspectionId);
    // In a real app, this would open a scheduling form
  };

  const handleDownloadReport = (inspectionId: string) => {
    console.log('Downloading report for inspection:', inspectionId);
    // In a real app, this would download the PDF report
  };

  return (
    <div className="space-y-6">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Property Inspections
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Schedule, track, and manage comprehensive property inspections and maintenance checks. Ensure compliance, safety, and quality standards across your portfolio.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{totalInspections} total inspections this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Avg score: {averageScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{completedInspections}</p>
                <p className="text-sm text-slate-600 font-medium">Completed</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Inspections finished
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{scheduledInspections}</p>
                <p className="text-sm text-slate-600 font-medium">Scheduled</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Upcoming inspections
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                <Star className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{averageScore.toFixed(0)}</p>
                <p className="text-sm text-slate-600 font-medium">Average Score</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <BarChart3 className="h-3 w-3" />
                  Property condition
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{highPriorityInspections}</p>
                <p className="text-sm text-slate-600 font-medium">High Priority</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  Require attention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Inspection Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-slate-600 mb-1">{avgInspectorRating.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Inspector Rating</div>
          <div className="text-xs text-slate-600">Service quality</div>
        </div>
        

        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-amber-600 mb-1">{avgInspectionDuration.toFixed(1)}h</div>
          <div className="text-sm text-slate-600 mb-1">Avg Duration</div>
          <div className="text-xs text-amber-600">Per inspection</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-blue-600 mb-1">{totalPhotos}</div>
          <div className="text-sm text-slate-600 mb-1">Total Photos</div>
          <div className="text-xs text-blue-600">Documentation</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-slate-800">Inspection Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-slate-700">Search Inspections</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by property, inspector, or inspection ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="status" className="text-slate-700">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="property" className="text-slate-700">Property</Label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {properties.map((property) => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-40">
              <Label htmlFor="type" className="text-slate-700">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="move_in">Move-in</SelectItem>
                  <SelectItem value="move_out">Move-out</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modern Minimal Inspections Table */}
          <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-semibold text-slate-700">Inspection ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Property</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Inspector</TableHead>
                  <TableHead className="font-semibold text-slate-700">Scheduled Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700">Score</TableHead>
                  <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInspections.map((inspection) => (
                  <TableRow key={inspection.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium">{inspection.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span className="max-w-[200px] truncate">{inspection.property}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(inspection.type)}
                        <span className="capitalize">{inspection.type.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        <div>
                          <div className="font-medium">{inspection.inspector}</div>
                          <div className="text-xs text-slate-500">{inspection.inspectorEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(inspection.scheduledDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inspection.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(inspection.status)}
                          {inspection.status.replace('_', ' ').charAt(0).toUpperCase() + 
                           inspection.status.replace('_', ' ').slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {inspection.score ? (
                        <div className={`font-medium ${getScoreColor(inspection.score)}`}>
                          {inspection.score}/100
                        </div>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(inspection.priority)}>
                        {inspection.priority.charAt(0).toUpperCase() + inspection.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewInspection(inspection)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {inspection.status === 'scheduled' && (
                            <DropdownMenuItem onClick={() => handleScheduleInspection(inspection.id)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                          )}
                          {inspection.reportUrl && (
                            <DropdownMenuItem onClick={() => handleDownloadReport(inspection.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Report
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Inspection
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInspections.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-700">No inspections found</p>
              <p className="text-sm text-slate-500">
                Try adjusting your search criteria or schedule a new inspection
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modern Minimal Quick Actions and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Calendar className="h-5 w-5" />
              Upcoming Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspections
                .filter(inspection => inspection.status === 'scheduled')
                .map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50/50">
                    <div>
                      <div className="font-medium text-slate-900">{inspection.property}</div>
                      <div className="text-sm text-slate-600">
                        {new Date(inspection.scheduledDate).toLocaleDateString()} - {inspection.type.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-slate-500">
                        Inspector: {inspection.inspector}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                      <Calendar className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button>
                  </div>
                ))}
              {inspections.filter(inspection => inspection.status === 'scheduled').length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No upcoming inspections
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <AlertTriangle className="h-5 w-5" />
              High Priority Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspections
                .filter(inspection => inspection.priority === 'high' && inspection.status === 'completed')
                .map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50/50">
                    <div>
                      <div className="font-medium text-slate-900">{inspection.property}</div>
                      <div className="text-sm text-slate-600">
                        Score: {inspection.score}/100
                      </div>
                      <div className="text-xs text-red-600">
                        {inspection.findings.filter(f => f.condition === 'Poor').length} critical issues
                      </div>
                    </div>
                    <Button size="sm" variant="destructive">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                ))}
              {inspections.filter(inspection => inspection.priority === 'high' && inspection.status === 'completed').length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No high priority findings
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspection Details Modal */}
      <Dialog open={showInspectionModal} onOpenChange={setShowInspectionModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inspection Details - {selectedInspection?.id}</DialogTitle>
            <DialogDescription>
              Complete inspection information for {selectedInspection?.property}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInspection && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="inspector">Inspector</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Property</Label>
                    <div className="p-2 border rounded">{selectedInspection.property}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Inspection Type</Label>
                    <div className="p-2 border rounded capitalize">{selectedInspection.type.replace('_', ' ')}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Scheduled Date</Label>
                    <div className="p-2 border rounded">{new Date(selectedInspection.scheduledDate).toLocaleDateString()}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedInspection.status)}>
                      {selectedInspection.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       selectedInspection.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </div>
                  {selectedInspection.completedDate && (
                    <div className="space-y-2">
                      <Label>Completed Date</Label>
                      <div className="p-2 border rounded">{new Date(selectedInspection.completedDate).toLocaleDateString()}</div>
                    </div>
                  )}
                  {selectedInspection.score && (
                    <div className="space-y-2">
                      <Label>Inspection Score</Label>
                      <div className={`p-2 border rounded font-medium ${getScoreColor(selectedInspection.score)}`}>
                        {selectedInspection.score}/100
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedInspection.priority)}>
                      {selectedInspection.priority.charAt(0).toUpperCase() + selectedInspection.priority.slice(1)}
                    </Badge>
                  </div>
                  {selectedInspection.nextInspection && (
                    <div className="space-y-2">
                      <Label>Next Inspection</Label>
                      <div className="p-2 border rounded">{new Date(selectedInspection.nextInspection).toLocaleDateString()}</div>
                    </div>
                  )}
                </div>
                {selectedInspection.recommendations && (
                  <div className="space-y-2">
                    <Label>Recommendations</Label>
                    <div className="p-2 border rounded">{selectedInspection.recommendations}</div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="findings" className="space-y-4">
                <div className="space-y-3">
                  {selectedInspection.findings.map((finding, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{finding.item}</h4>
                        <Badge variant={
                          finding.condition === 'Excellent' ? 'default' :
                          finding.condition === 'Good' ? 'secondary' :
                          finding.condition === 'Fair' ? 'outline' : 'destructive'
                        }>
                          {finding.condition}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{finding.notes}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="inspector" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Inspector Name</Label>
                    <div className="p-2 border rounded">{selectedInspection.inspector}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="p-2 border rounded">{selectedInspection.inspectorPhone}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 border rounded">{selectedInspection.inspectorEmail}</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="photos" className="space-y-4">
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-600">{selectedInspection.photos} Photos</p>
                  <p className="text-sm text-gray-500">
                    Inspection photos would be displayed here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInspectionModal(false)}>
              Close
            </Button>
            {selectedInspection?.reportUrl && (
              <Button onClick={() => handleDownloadReport(selectedInspection.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inspections;
