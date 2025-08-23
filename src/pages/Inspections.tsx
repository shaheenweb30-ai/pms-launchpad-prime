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
  TrendingUp2,
  TrendingDown2,
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
  ClockIcon2,
  CheckCircleIcon2,
  AlertCircleIcon2,
  XCircleIcon,
  Building2Icon,
  SearchIcon,
  PlusIcon,
  FileTextIcon2,
  CameraIcon,
  WrenchIcon,
  ShieldIcon,
  HomeIcon2,
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
  const inspections = [
    {
      id: 'INS001',
      property: 'Oak Street Apartments - Unit 101',
      type: 'routine',
      inspector: 'John Smith',
      inspectorPhone: '(555) 123-4567',
      inspectorEmail: 'john.smith@inspections.com',
      scheduledDate: '2024-12-20',
      completedDate: '2024-12-20',
      status: 'completed',
      score: 85,
      priority: 'medium',
      findings: [
        { item: 'HVAC System', condition: 'Good', notes: 'Filters need replacement' },
        { item: 'Electrical', condition: 'Good', notes: 'All outlets working properly' },
        { item: 'Plumbing', condition: 'Fair', notes: 'Minor leak under kitchen sink' }
      ],
      recommendations: 'Replace HVAC filters and fix kitchen sink leak within 30 days',
      photos: 12,
      reportUrl: '/reports/INS001.pdf',
      nextInspection: '2025-03-20',
      inspectionDuration: '2.5 hours',
      inspectorRating: 4.8,
      tenantSatisfaction: 4.5,
      complianceScore: 92,
      safetyScore: 88,
      maintenanceScore: 82,
      cleanlinessScore: 90,
      previousScore: 78,
      improvement: '+7 points',
      criticalIssues: 0,
      minorIssues: 3,
      recommendationsCount: 2,
      followUpRequired: true,
      nextFollowUp: '2025-01-20',
      inspectionNotes: 'Overall good condition, minor maintenance items identified',
      weatherConditions: 'Clear, 72°F',
      accessIssues: 'None',
      specialRequirements: 'Tenant requested quiet hours consideration'
    },
    {
      id: 'INS002',
      property: 'Downtown Lofts - Unit 205',
      type: 'move_out',
      inspector: 'Sarah Johnson',
      inspectorPhone: '(555) 987-6543',
      inspectorEmail: 'sarah.johnson@inspections.com',
      scheduledDate: '2024-12-18',
      completedDate: '2024-12-18',
      status: 'completed',
      score: 92,
      priority: 'low',
      findings: [
        { item: 'General Condition', condition: 'Excellent', notes: 'Well maintained unit' },
        { item: 'Appliances', condition: 'Good', notes: 'All appliances in working order' },
        { item: 'Walls & Floors', condition: 'Good', notes: 'Minor wear and tear' }
      ],
      recommendations: 'Unit ready for new tenant, no repairs needed',
      photos: 8,
      reportUrl: '/reports/INS002.pdf',
      nextInspection: '2025-06-18',
      inspectionDuration: '1.8 hours',
      inspectorRating: 4.9,
      tenantSatisfaction: 4.7,
      complianceScore: 95,
      safetyScore: 94,
      maintenanceScore: 91,
      cleanlinessScore: 93,
      previousScore: 89,
      improvement: '+3 points',
      criticalIssues: 0,
      minorIssues: 1,
      recommendationsCount: 0,
      followUpRequired: false,
      nextFollowUp: null,
      inspectionNotes: 'Excellent condition, well-maintained unit',
      weatherConditions: 'Partly cloudy, 68°F',
      accessIssues: 'None',
      specialRequirements: 'None'
    },
    {
      id: 'INS003',
      property: 'Riverside Complex - Unit 312',
      type: 'emergency',
      inspector: 'Mike Davis',
      inspectorPhone: '(555) 456-7890',
      inspectorEmail: 'mike.davis@inspections.com',
      scheduledDate: '2024-12-15',
      completedDate: '2024-12-15',
      status: 'completed',
      score: 45,
      priority: 'high',
      findings: [
        { item: 'Water Damage', condition: 'Poor', notes: 'Significant water damage in bathroom' },
        { item: 'Mold Growth', condition: 'Poor', notes: 'Mold found in bathroom and kitchen' },
        { item: 'Structural', condition: 'Fair', notes: 'Minor structural concerns' }
      ],
      recommendations: 'Immediate remediation required for water damage and mold',
      photos: 15,
      reportUrl: '/reports/INS003.pdf',
      nextInspection: '2024-12-30',
      inspectionDuration: '4.2 hours',
      inspectorRating: 4.6,
      tenantSatisfaction: 2.1,
      complianceScore: 35,
      safetyScore: 28,
      maintenanceScore: 22,
      cleanlinessScore: 15,
      previousScore: 72,
      improvement: '-27 points',
      criticalIssues: 3,
      minorIssues: 2,
      recommendationsCount: 5,
      followUpRequired: true,
      nextFollowUp: '2024-12-22',
      inspectionNotes: 'Critical safety issues identified, immediate action required',
      weatherConditions: 'Rainy, 45°F',
      accessIssues: 'Limited access due to water damage',
      specialRequirements: 'Emergency inspection - safety concerns'
    },
    {
      id: 'INS004',
      property: 'Suburban Homes - 123 Main St',
      type: 'routine',
      inspector: 'Lisa Wilson',
      inspectorPhone: '(555) 321-0987',
      inspectorEmail: 'lisa.wilson@inspections.com',
      scheduledDate: '2024-12-25',
      completedDate: null,
      status: 'scheduled',
      score: null,
      priority: 'medium',
      findings: [],
      recommendations: '',
      photos: 0,
      reportUrl: null,
      nextInspection: null,
      inspectionDuration: null,
      inspectorRating: null,
      tenantSatisfaction: null,
      complianceScore: null,
      safetyScore: null,
      maintenanceScore: null,
      cleanlinessScore: null,
      previousScore: null,
      improvement: null,
      criticalIssues: null,
      minorIssues: null,
      recommendationsCount: null,
      followUpRequired: null,
      nextFollowUp: null,
      inspectionNotes: 'Scheduled for routine inspection',
      weatherConditions: null,
      accessIssues: null,
      specialRequirements: 'None'
    },
    {
      id: 'INS005',
      property: 'Commercial Plaza - Suite 100',
      type: 'annual',
      inspector: 'David Brown',
      inspectorPhone: '(555) 654-3210',
      inspectorEmail: 'david.brown@inspections.com',
      scheduledDate: '2024-12-22',
      completedDate: null,
      status: 'scheduled',
      score: null,
      priority: 'medium',
      findings: [],
      recommendations: '',
      photos: 0,
      reportUrl: null,
      nextInspection: null,
      inspectionDuration: null,
      inspectorRating: null,
      tenantSatisfaction: null,
      complianceScore: null,
      safetyScore: null,
      maintenanceScore: null,
      cleanlinessScore: null,
      previousScore: null,
      improvement: null,
      criticalIssues: null,
      minorIssues: null,
      recommendationsCount: null,
      followUpRequired: null,
      nextFollowUp: null,
      inspectionNotes: 'Scheduled for annual commercial inspection',
      weatherConditions: null,
      accessIssues: null,
      specialRequirements: 'Business hours access required'
    },
    {
      id: 'INS006',
      property: 'Oak Street Apartments - Unit 205',
      type: 'move_in',
      inspector: 'Emily Rodriguez',
      inspectorPhone: '(555) 789-0123',
      inspectorEmail: 'emily.rodriguez@inspections.com',
      scheduledDate: '2024-12-10',
      completedDate: '2024-12-10',
      status: 'completed',
      score: 78,
      priority: 'medium',
      findings: [
        { item: 'General Condition', condition: 'Good', notes: 'Unit needs cleaning' },
        { item: 'Appliances', condition: 'Fair', notes: 'Dishwasher not working' },
        { item: 'Safety Features', condition: 'Good', notes: 'Smoke detectors functional' }
      ],
      recommendations: 'Clean unit thoroughly and repair dishwasher before tenant move-in',
      photos: 10,
      reportUrl: '/reports/INS006.pdf',
      nextInspection: '2025-03-10',
      inspectionDuration: '2.1 hours',
      inspectorRating: 4.4,
      tenantSatisfaction: 3.8,
      complianceScore: 75,
      safetyScore: 82,
      maintenanceScore: 68,
      cleanlinessScore: 72,
      previousScore: null,
      improvement: 'N/A',
      criticalIssues: 0,
      minorIssues: 2,
      recommendationsCount: 2,
      followUpRequired: true,
      nextFollowUp: '2024-12-25',
      inspectionNotes: 'Unit needs preparation for new tenant',
      weatherConditions: 'Sunny, 75°F',
      accessIssues: 'None',
      specialRequirements: 'Tenant present during inspection'
    }
  ];

  const properties = [
    'Oak Street Apartments - Unit 101',
    'Downtown Lofts - Unit 205',
    'Riverside Complex - Unit 312',
    'Suburban Homes - 123 Main St',
    'Commercial Plaza - Suite 100',
    'Oak Street Apartments - Unit 205'
  ];

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

  const getTenantSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 4.5) return 'text-emerald-600';
    if (satisfaction >= 4.0) return 'text-green-600';
    if (satisfaction >= 3.5) return 'text-blue-600';
    if (satisfaction >= 3.0) return 'text-yellow-600';
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
  const avgTenantSatisfaction = inspections.filter(ins => ins.tenantSatisfaction)
    .reduce((sum, ins) => sum + (ins.tenantSatisfaction || 0), 0) / Math.max(inspections.filter(ins => ins.tenantSatisfaction).length, 1);
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
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-8 border border-emerald-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-blue-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Property Inspections 🔍
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Schedule, track, and manage comprehensive property inspections and maintenance checks. Ensure compliance, safety, and tenant satisfaction across your portfolio.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>{totalInspections} total inspections this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Avg score: {averageScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Activity className="h-4 w-4 mr-2" />
                Inspection Analytics
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{completedInspections}</p>
                <p className="text-sm text-gray-600">Completed</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Inspections finished
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{scheduledInspections}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Upcoming inspections
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-yellow-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100 group-hover:bg-yellow-200 transition-colors duration-300">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{averageScore.toFixed(0)}</p>
                <p className="text-sm text-gray-600">Average Score</p>
                <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                  <BarChart3 className="h-3 w-3" />
                  Property condition
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{highPriorityInspections}</p>
                <p className="text-sm text-gray-600">High Priority</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  Require attention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Inspection Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">{avgInspectorRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Inspector Rating</div>
          <div className="text-xs text-purple-600">Service quality</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <div className="text-2xl font-bold text-indigo-600 mb-1">{avgTenantSatisfaction.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Tenant Satisfaction</div>
          <div className="text-xs text-indigo-600">Tenant feedback</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-100">
          <div className="text-2xl font-bold text-orange-600 mb-1">{avgInspectionDuration.toFixed(1)}h</div>
          <div className="text-sm text-gray-600 mb-1">Avg Duration</div>
          <div className="text-xs text-orange-600">Per inspection</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
          <div className="text-2xl font-bold text-cyan-600 mb-1">{totalPhotos}</div>
          <div className="text-sm text-gray-600 mb-1">Total Photos</div>
          <div className="text-xs text-cyan-600">Documentation</div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Inspection Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search Inspections</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by property, inspector, or inspection ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
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
              <Label htmlFor="property">Property</Label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger>
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
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
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

          {/* Inspections Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inspection ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium">{inspection.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
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
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{inspection.inspector}</div>
                          <div className="text-xs text-muted-foreground">{inspection.inspectorEmail}</div>
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
                        <span className="text-muted-foreground">N/A</span>
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
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600">No inspections found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search criteria or schedule a new inspection
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspections
                .filter(inspection => inspection.status === 'scheduled')
                .map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{inspection.property}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(inspection.scheduledDate).toLocaleDateString()} - {inspection.type.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Inspector: {inspection.inspector}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button>
                  </div>
                ))}
              {inspections.filter(inspection => inspection.status === 'scheduled').length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No upcoming inspections
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              High Priority Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspections
                .filter(inspection => inspection.priority === 'high' && inspection.status === 'completed')
                .map((inspection) => (
                  <div key={inspection.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{inspection.property}</div>
                      <div className="text-sm text-muted-foreground">
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
                <p className="text-center text-muted-foreground py-4">
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
