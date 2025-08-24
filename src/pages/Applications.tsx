import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  UserCheck,
  FileText,
  Clock,
  CheckCircle,
  X,
  Eye,
  Download,
  Star,
  Building2,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  Home,
  Shield,
  Award,
  MessageSquare,
  CreditCard,
  ArrowUpRight,
  Share,
  RefreshCw,
  Minus,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  CalendarDays,
  FileCheck,
  FileX,
  FileClock,
  Building,
  Timer,
  CheckCircle2,
  XCircle,
  Clock4,
  Info,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  Send,
  Archive,
  Trash2,
  Settings,
  Bell,
  HelpCircle,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  HomeIcon,
  Car,
  Wifi,
  UtensilsCrossed
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

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Enhanced application data with more details
  const applications = [
    {
      id: 'APP001',
      applicantName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 123-4567',
      property: 'Oak Street Apartments - Unit 205',
      appliedDate: '2024-11-20',
      status: 'pending',
      creditScore: 750,
      monthlyIncome: 5200,
      requestedRent: 1800,
      employmentStatus: 'Full-time',
      employer: 'Tech Solutions Inc',
      previousAddress: '123 Main St, Previous City',
      references: 3,
      pets: 'None',
      moveInDate: '2024-12-15',
      documents: ['ID', 'Pay Stubs', 'Bank Statements', 'References'],
      notes: 'Excellent credit score and stable employment history.',
      rating: 4.5,
      daysSinceApplied: 5,
      incomeToRentRatio: 2.89,
      applicationScore: 85,
      backgroundCheck: 'pending',
      verificationStatus: 'in_progress',
      urgency: 'medium',
      preferredContact: 'email',
      availability: 'weekdays',
      specialRequirements: 'None',
      previousLandlordRating: 4.8,
      employmentDuration: '3 years',
      savingsBalance: 15000,
      debtToIncomeRatio: 0.15
    },
    {
      id: 'APP002',
      applicantName: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 987-6543',
      property: 'Downtown Lofts - Unit 312',
      appliedDate: '2024-11-18',
      status: 'approved',
      creditScore: 720,
      monthlyIncome: 6800,
      requestedRent: 2200,
      employmentStatus: 'Full-time',
      employer: 'Design Agency Co',
      previousAddress: '456 Oak Ave, Another City',
      references: 3,
      pets: '1 Cat',
      moveInDate: '2024-12-01',
      documents: ['ID', 'Pay Stubs', 'Bank Statements', 'References', 'Pet Deposit'],
      notes: 'Great references from previous landlord. Pet deposit received.',
      rating: 4.8,
      daysSinceApplied: 7,
      incomeToRentRatio: 3.09,
      applicationScore: 92,
      backgroundCheck: 'completed',
      verificationStatus: 'verified',
      urgency: 'low',
      preferredContact: 'phone',
      availability: 'anytime',
      specialRequirements: 'Pet deposit received',
      previousLandlordRating: 4.9,
      employmentDuration: '5 years',
      savingsBalance: 25000,
      debtToIncomeRatio: 0.12
    },
    {
      id: 'APP003',
      applicantName: 'Sarah Thompson',
      email: 'sarah.thompson@email.com',
      phone: '(555) 456-7890',
      property: 'Riverside Complex - Unit 101',
      appliedDate: '2024-11-15',
      status: 'rejected',
      creditScore: 620,
      monthlyIncome: 3200,
      requestedRent: 1600,
      employmentStatus: 'Part-time',
      employer: 'Local Restaurant',
      previousAddress: '789 Pine St, Current City',
      references: 2,
      pets: 'None',
      moveInDate: '2024-11-30',
      documents: ['ID', 'Pay Stubs'],
      notes: 'Insufficient income and missing documentation.',
      rating: 2.5,
      daysSinceApplied: 10,
      incomeToRentRatio: 2.0,
      applicationScore: 45,
      backgroundCheck: 'failed',
      verificationStatus: 'unverified',
      urgency: 'high',
      preferredContact: 'email',
      availability: 'weekends',
      specialRequirements: 'None',
      previousLandlordRating: 3.2,
      employmentDuration: '1 year',
      savingsBalance: 2000,
      debtToIncomeRatio: 0.35
    },
    {
      id: 'APP004',
      applicantName: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '(555) 321-0987',
      property: 'Suburban Homes - 123 Main St',
      appliedDate: '2024-11-22',
      status: 'under_review',
      creditScore: 680,
      monthlyIncome: 4500,
      requestedRent: 2800,
      employmentStatus: 'Self-employed',
      employer: 'Wilson Consulting',
      previousAddress: '321 Elm St, Business District',
      references: 2,
      pets: '1 Dog',
      moveInDate: '2025-01-01',
      documents: ['ID', 'Tax Returns', 'Bank Statements'],
      notes: 'Self-employed applicant - reviewing tax returns and business income.',
      rating: 3.5,
      daysSinceApplied: 3,
      incomeToRentRatio: 1.61,
      applicationScore: 68,
      backgroundCheck: 'pending',
      verificationStatus: 'in_progress',
      urgency: 'medium',
      preferredContact: 'phone',
      availability: 'weekdays',
      specialRequirements: 'Business verification needed',
      previousLandlordRating: 4.0,
      employmentDuration: '8 years',
      savingsBalance: 35000,
      debtToIncomeRatio: 0.25
    },
    {
      id: 'APP005',
      applicantName: 'Lisa Martinez',
      email: 'lisa.martinez@email.com',
      phone: '(555) 654-3210',
      property: 'Commercial Plaza - Suite 200',
      appliedDate: '2024-11-25',
      status: 'pending',
      creditScore: 780,
      monthlyIncome: 8500,
      requestedRent: 4500,
      employmentStatus: 'Full-time',
      employer: 'Financial Services Corp',
      previousAddress: '654 Business Blvd, Finance District',
      references: 3,
      pets: 'None',
      moveInDate: '2024-12-20',
      documents: ['ID', 'Pay Stubs', 'Bank Statements', 'References', 'Business License'],
      notes: 'Commercial application for office space. Excellent financials.',
      rating: 4.9,
      daysSinceApplied: 0,
      incomeToRentRatio: 1.89,
      applicationScore: 95,
      backgroundCheck: 'completed',
      verificationStatus: 'verified',
      urgency: 'low',
      preferredContact: 'email',
      availability: 'anytime',
      specialRequirements: 'Commercial lease requirements',
      previousLandlordRating: 5.0,
      employmentDuration: '12 years',
      savingsBalance: 100000,
      debtToIncomeRatio: 0.08
    },
    {
      id: 'APP006',
      applicantName: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '(555) 111-2222',
      property: 'Harbor View Condos - Unit 3A',
      appliedDate: '2024-11-26',
      status: 'under_review',
      creditScore: 690,
      monthlyIncome: 3800,
      requestedRent: 1900,
      employmentStatus: 'Full-time',
      employer: 'Healthcare Systems',
      previousAddress: '789 Health Ave, Medical District',
      references: 2,
      pets: '1 Small Dog',
      moveInDate: '2024-12-10',
      documents: ['ID', 'Pay Stubs', 'Bank Statements', 'Pet Records'],
      notes: 'Healthcare worker with stable income. Pet deposit pending.',
      rating: 4.2,
      daysSinceApplied: 1,
      incomeToRentRatio: 2.0,
      applicationScore: 72,
      backgroundCheck: 'pending',
      verificationStatus: 'in_progress',
      urgency: 'medium',
      preferredContact: 'email',
      availability: 'evenings',
      specialRequirements: 'Pet deposit needed',
      previousLandlordRating: 4.1,
      employmentDuration: '2 years',
      savingsBalance: 8000,
      debtToIncomeRatio: 0.28
    },
    {
      id: 'APP007',
      applicantName: 'Rachel Green',
      email: 'rachel.green@email.com',
      phone: '(555) 333-4444',
      property: 'Mountain Ridge Estates - Unit 5',
      appliedDate: '2024-11-27',
      status: 'pending',
      creditScore: 810,
      monthlyIncome: 7200,
      requestedRent: 2100,
      employmentStatus: 'Full-time',
      employer: 'Marketing Agency Pro',
      previousAddress: '456 Creative Blvd, Arts District',
      references: 3,
      pets: 'None',
      moveInDate: '2024-12-20',
      documents: ['ID', 'Pay Stubs', 'Bank Statements', 'References', 'Portfolio'],
      notes: 'Creative professional with excellent credit. Looking for long-term lease.',
      rating: 4.7,
      daysSinceApplied: 0,
      incomeToRentRatio: 3.43,
      applicationScore: 88,
      backgroundCheck: 'pending',
      verificationStatus: 'in_progress',
      urgency: 'low',
      preferredContact: 'email',
      availability: 'weekdays',
      specialRequirements: 'None',
      previousLandlordRating: 4.8,
      employmentDuration: '6 years',
      savingsBalance: 45000,
      debtToIncomeRatio: 0.18
    }
  ];

  const properties = [
    'All Properties',
    'Oak Street Apartments - Unit 205',
    'Downtown Lofts - Unit 312',
    'Riverside Complex - Unit 101',
    'Suburban Homes - 123 Main St',
    'Commercial Plaza - Suite 200',
    'Harbor View Condos - Unit 3A',
    'Mountain Ridge Estates - Unit 5'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under_review':
        return <Eye className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const getApplicationScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getApplicationScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBackgroundCheckColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBackgroundCheckBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesProperty = propertyFilter === 'all' || app.property === propertyFilter;
    
    return matchesSearch && matchesStatus && matchesProperty;
  });

  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const underReviewApplications = applications.filter(app => app.status === 'under_review').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
  
  const totalApplications = applications.length;
  const avgApplicationScore = applications.reduce((sum, app) => sum + app.applicationScore, 0) / applications.length;
  const avgCreditScore = applications.reduce((sum, app) => sum + app.creditScore, 0) / applications.length;
  const avgIncomeToRentRatio = applications.reduce((sum, app) => sum + app.incomeToRentRatio, 0) / applications.length;
  const highPriorityApplications = applications.filter(app => app.urgency === 'high').length;
  const completedBackgroundChecks = applications.filter(app => app.backgroundCheck === 'completed').length;

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const handleApprove = (applicationId: string) => {
    console.log('Approving application:', applicationId);
    // In a real app, this would update the backend
  };

  const handleReject = (applicationId: string) => {
    console.log('Rejecting application:', applicationId);
    // In a real app, this would update the backend
  };

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Rental Applications
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Review and manage rental applications for your properties. Streamline your tenant screening process and make informed decisions with comprehensive applicant data.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium">{totalApplications} applications received</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                <Plus className="h-4 w-4 mr-2" />
                New Application
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
              <div className="p-3 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                <Clock className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{pendingApplications}</p>
                <p className="text-sm text-slate-600 font-medium">Pending Review</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  Awaiting review
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <Eye className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{underReviewApplications}</p>
                <p className="text-sm text-slate-600 font-medium">Under Review</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Activity className="h-3 w-3" />
                  Being processed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <CheckCircle className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{approvedApplications}</p>
                <p className="text-sm text-slate-600 font-medium">Approved</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Ready for lease
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                <X className="h-7 w-7 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{rejectedApplications}</p>
                <p className="text-sm text-slate-600 font-medium">Rejected</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  Did not meet criteria
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-emerald-600 mb-1">{avgApplicationScore.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg. Application Score</div>
          <div className="text-xs text-emerald-600">Quality indicator</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-blue-600 mb-1">{avgCreditScore.toFixed(0)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg. Credit Score</div>
          <div className="text-xs text-blue-600">Financial health</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-slate-600 mb-1">{avgIncomeToRentRatio.toFixed(1)}x</div>
          <div className="text-sm text-slate-600 mb-1">Income/Rent Ratio</div>
          <div className="text-xs text-slate-600">Affordability</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-amber-600 mb-1">{highPriorityApplications}</div>
          <div className="text-sm text-slate-600 mb-1">High Priority</div>
          <div className="text-xs text-amber-600">Need attention</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-slate-600" />
            Application Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-slate-700 mb-2 block">Search Applications</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by applicant, email, property, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Label htmlFor="status" className="text-sm font-medium text-slate-700 mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Label htmlFor="property" className="text-sm font-medium text-slate-700 mb-2 block">Property</Label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Modern Minimal Applications Table */}
          <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Application ID</TableHead>
                  <TableHead className="font-semibold text-slate-700">Applicant & Property</TableHead>
                  <TableHead className="font-semibold text-slate-700">Application Details</TableHead>
                  <TableHead className="font-semibold text-slate-700">Financial Metrics</TableHead>
                  <TableHead className="font-semibold text-slate-700">Score & Rating</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status & Priority</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                    <TableCell className="font-medium text-emerald-600">{application.id}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-900">{application.applicantName}</div>
                            <div className="text-xs text-gray-600">{application.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 max-w-[200px] truncate">{application.property}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-sm font-medium">{new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {application.daysSinceApplied} days ago
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            Move-in: {new Date(application.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-medium text-green-600">${application.monthlyIncome.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">
                          ${application.requestedRent.toLocaleString()} rent
                        </div>
                        <div className="text-xs text-gray-600">
                          {application.incomeToRentRatio.toFixed(1)}x ratio
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getApplicationScoreColor(application.applicationScore)}`}>
                            {application.applicationScore}
                          </span>
                          <Badge className={getApplicationScoreBadge(application.applicationScore)}>
                            Score
                          </Badge>
                        </div>
                        <div className="font-medium">{application.creditScore}</div>
                        <div className={`text-xs ${
                          application.creditScore >= 700 ? 'text-green-600' :
                          application.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {application.creditScore >= 700 ? 'Excellent' :
                           application.creditScore >= 650 ? 'Good' : 'Fair'}
                        </div>
                        {getRatingStars(application.rating)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.replace('_', ' ').charAt(0).toUpperCase() + 
                             application.status.replace('_', ' ').slice(1)}
                          </div>
                        </Badge>
                        <Badge className={getUrgencyBadge(application.urgency)}>
                          {application.urgency} priority
                        </Badge>
                        <Badge className={getBackgroundCheckBadge(application.backgroundCheck)}>
                          {application.backgroundCheck}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(application)}
                          className="hover:bg-emerald-50 hover:border-emerald-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApprove(application.id)}
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(application.id)}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-600 mb-2">No applications found</p>
              <p className="text-sm text-slate-500 mb-4">
                Try adjusting your search criteria or check back later
              </p>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 py-3">
                <Plus className="h-4 w-4 mr-2" />
                Create New Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details - {selectedApplication?.id}</DialogTitle>
            <DialogDescription>
              Complete application information for {selectedApplication?.applicantName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="p-2 border rounded">{selectedApplication.applicantName}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-2 border rounded">{selectedApplication.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="p-2 border rounded">{selectedApplication.phone}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Employment Status</Label>
                    <div className="p-2 border rounded">{selectedApplication.employmentStatus}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Employer</Label>
                    <div className="p-2 border rounded">{selectedApplication.employer}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Previous Address</Label>
                    <div className="p-2 border rounded">{selectedApplication.previousAddress}</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="financial" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Credit Score</Label>
                    <div className="p-2 border rounded font-medium">{selectedApplication.creditScore}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Income</Label>
                    <div className="p-2 border rounded font-medium">${selectedApplication.monthlyIncome.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Requested Rent</Label>
                    <div className="p-2 border rounded">${selectedApplication.requestedRent.toLocaleString()}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Income to Rent Ratio</Label>
                    <div className="p-2 border rounded">
                      {((selectedApplication.monthlyIncome / selectedApplication.requestedRent) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="property" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Requested Property</Label>
                    <div className="p-2 border rounded">{selectedApplication.property}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Move-in Date</Label>
                    <div className="p-2 border rounded">{new Date(selectedApplication.moveInDate).toLocaleDateString()}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Pets</Label>
                    <div className="p-2 border rounded">{selectedApplication.pets}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>References</Label>
                    <div className="p-2 border rounded">{selectedApplication.references} provided</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <div className="p-2 border rounded">{selectedApplication.notes}</div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Submitted Documents</Label>
                    <div className="space-y-2">
                      {selectedApplication.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span>{doc}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Close
            </Button>
            {selectedApplication?.status === 'pending' && (
              <>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    handleReject(selectedApplication.id);
                    setShowDetails(false);
                  }}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  onClick={() => {
                    handleApprove(selectedApplication.id);
                    setShowDetails(false);
                  }}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;
