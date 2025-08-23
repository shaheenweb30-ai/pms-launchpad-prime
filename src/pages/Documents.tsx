import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  FileText,
  Folder,
  Upload,
  Download,
  Share,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Star,
  StarOff,
  Clock,
  User,
  Building2,
  Filter,
  Grid,
  List,
  FolderOpen,
  File,
  Image,
  FileImage,
  FileVideo,
  Archive,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Copy,
  Move,
  Tag,
  Activity,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
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
  Printer,
  Settings,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  Coins,
  Building,
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
  ShieldIcon,
  SendIcon,
  BellIcon,
  CalculatorIcon,
  BarChart3Icon,
  PieChartIcon,
  Database,
  HardDrive,
  CloudIcon,
  FolderIcon,
  FileIcon,
  ImageIcon,
  VideoIcon,
  ArchiveIcon,
  DocumentIcon,
  PresentationIcon,
  SpreadsheetIcon,
  LinkIcon,
  LockIcon,
  UnlockIcon,
  KeyIcon,
  CertificateIcon,
  BadgeCheckIcon,
  VerifiedIcon,
  SecurityIcon
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

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Enhanced document data with more details
  const documents = [
    {
      id: 'DOC001',
      name: 'Property Deed - Oak Street Apartments',
      type: 'pdf',
      category: 'legal',
      property: 'Oak Street Apartments',
      size: 2.4,
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      uploadedBy: 'John Smith',
      tags: ['deed', 'ownership', 'legal'],
      favorite: true,
      shared: false,
      description: 'Property ownership deed and title documents',
      version: '1.0',
      status: 'active',
      downloadCount: 12,
      viewCount: 45,
      securityLevel: 'high',
      encrypted: true,
      expiryDate: null,
      accessLevel: 'admin',
      lastViewed: '2024-12-10',
      fileHash: 'a1b2c3d4e5f6',
      storageLocation: 'cloud',
      backupStatus: 'backed_up',
      complianceStatus: 'compliant',
      digitalSignature: true,
      documentScore: 95,
      importance: 'critical',
      retention: '7 years',
      auditTrail: true
    },
    {
      id: 'DOC002',
      name: 'Insurance Policy 2024',
      type: 'pdf',
      category: 'insurance',
      property: 'All Properties',
      size: 1.8,
      uploadDate: '2024-01-01',
      lastModified: '2024-06-01',
      uploadedBy: 'Sarah Johnson',
      tags: ['insurance', 'policy', '2024'],
      favorite: false,
      shared: true,
      description: 'Annual property insurance policy documentation',
      version: '2.0',
      status: 'active',
      downloadCount: 8,
      viewCount: 32,
      securityLevel: 'medium',
      encrypted: false,
      expiryDate: '2024-12-31',
      accessLevel: 'manager',
      lastViewed: '2024-12-08',
      fileHash: 'b2c3d4e5f6g7',
      storageLocation: 'cloud',
      backupStatus: 'backed_up',
      complianceStatus: 'compliant',
      digitalSignature: false,
      documentScore: 88,
      importance: 'high',
      retention: '5 years',
      auditTrail: true
    },
    {
      id: 'DOC003',
      name: 'Lease Agreement - Unit 101',
      type: 'pdf',
      category: 'lease',
      property: 'Oak Street Apartments - Unit 101',
      size: 0.9,
      uploadDate: '2024-03-01',
      lastModified: '2024-03-01',
      uploadedBy: 'Mike Davis',
      tags: ['lease', 'tenant', 'agreement'],
      favorite: true,
      shared: false,
      description: 'Signed lease agreement for current tenant',
      version: '1.0',
      status: 'active'
    },
    {
      id: 'DOC004',
      name: 'Inspection Report December',
      type: 'pdf',
      category: 'inspection',
      property: 'Downtown Lofts - Unit 205',
      size: 3.2,
      uploadDate: '2024-12-15',
      lastModified: '2024-12-15',
      uploadedBy: 'Lisa Wilson',
      tags: ['inspection', 'report', 'december'],
      favorite: false,
      shared: false,
      description: 'Detailed inspection report with photos and findings',
      version: '1.0',
      status: 'active'
    },
    {
      id: 'DOC005',
      name: 'Property Photos - Exterior',
      type: 'jpg',
      category: 'photos',
      property: 'Riverside Complex',
      size: 15.6,
      uploadDate: '2024-11-20',
      lastModified: '2024-11-20',
      uploadedBy: 'David Brown',
      tags: ['photos', 'exterior', 'marketing'],
      favorite: false,
      shared: true,
      description: 'Professional exterior photos for marketing',
      version: '1.0',
      status: 'active'
    },
    {
      id: 'DOC006',
      name: 'Tax Assessment 2024',
      type: 'pdf',
      category: 'financial',
      property: 'Suburban Homes',
      size: 1.2,
      uploadDate: '2024-02-10',
      lastModified: '2024-02-10',
      uploadedBy: 'Emily Rodriguez',
      tags: ['tax', 'assessment', '2024'],
      favorite: true,
      shared: false,
      description: 'Annual property tax assessment documentation',
      version: '1.0',
      status: 'active'
    },
    {
      id: 'DOC007',
      name: 'Maintenance Contract - HVAC',
      type: 'pdf',
      category: 'maintenance',
      property: 'Commercial Plaza',
      size: 0.7,
      uploadDate: '2024-01-10',
      lastModified: '2024-01-10',
      uploadedBy: 'Tech Solutions Inc',
      tags: ['maintenance', 'hvac', 'contract'],
      favorite: false,
      shared: false,
      description: 'Annual HVAC maintenance service contract',
      version: '1.0',
      status: 'active'
    },
    {
      id: 'DOC008',
      name: 'Floor Plans - All Units',
      type: 'dwg',
      category: 'plans',
      property: 'Oak Street Apartments',
      size: 8.9,
      uploadDate: '2024-01-05',
      lastModified: '2024-01-05',
      uploadedBy: 'Architect Office',
      tags: ['floorplans', 'blueprint', 'units'],
      favorite: true,
      shared: true,
      description: 'Architectural floor plans for all apartment units',
      version: '1.0',
      status: 'active'
    }
  ];

  const properties = [
    'All Properties',
    'Oak Street Apartments',
    'Downtown Lofts',
    'Riverside Complex',
    'Suburban Homes',
    'Commercial Plaza'
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="h-8 w-8 text-blue-600" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <FileVideo className="h-8 w-8 text-purple-600" />;
      case 'dwg':
      case 'cad':
        return <File className="h-8 w-8 text-green-600" />;
      case 'zip':
      case 'rar':
        return <Archive className="h-8 w-8 text-orange-600" />;
      default:
        return <File className="h-8 w-8 text-gray-600" />;
    }
  };

  const getSmallFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="h-4 w-4 text-blue-600" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <FileVideo className="h-4 w-4 text-purple-600" />;
      case 'dwg':
      case 'cad':
        return <File className="h-4 w-4 text-green-600" />;
      case 'zip':
      case 'rar':
        return <Archive className="h-4 w-4 text-orange-600" />;
      default:
        return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'insurance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lease':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inspection':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'financial':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'photos':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'plans':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getSecurityLevelBadge = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getDocumentScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'admin': return <Shield className="h-4 w-4 text-red-600" />;
      case 'manager': return <Key className="h-4 w-4 text-orange-600" />;
      case 'user': return <User className="h-4 w-4 text-blue-600" />;
      default: return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStorageIcon = (location: string) => {
    switch (location) {
      case 'cloud': return <CloudIcon className="h-4 w-4 text-blue-600" />;
      case 'local': return <HardDrive className="h-4 w-4 text-gray-600" />;
      case 'database': return <Database className="h-4 w-4 text-green-600" />;
      default: return <HardDrive className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesProperty = propertyFilter === 'all' || doc.property === propertyFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesProperty && matchesType;
  });

  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const favoriteDocuments = documents.filter(doc => doc.favorite).length;
  const sharedDocuments = documents.filter(doc => doc.shared).length;
  
  const avgDocumentScore = documents.filter(doc => doc.documentScore)
    .reduce((sum, doc) => sum + (doc.documentScore || 0), 0) / Math.max(documents.filter(doc => doc.documentScore).length, 1);
  const totalDownloads = documents.filter(doc => doc.downloadCount)
    .reduce((sum, doc) => sum + (doc.downloadCount || 0), 0);
  const totalViews = documents.filter(doc => doc.viewCount)
    .reduce((sum, doc) => sum + (doc.viewCount || 0), 0);
  const encryptedDocuments = documents.filter(doc => doc.encrypted).length;
  const criticalDocuments = documents.filter(doc => doc.importance === 'critical').length;
  const expiringSoon = documents.filter(doc => {
    if (!doc.expiryDate) return false;
    const expiry = new Date(doc.expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;
  const compliantDocuments = documents.filter(doc => doc.complianceStatus === 'compliant').length;

  const categoryStats = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log('Downloading document:', documentId);
    // In a real app, this would download the file
  };

  const handleToggleFavorite = (documentId: string) => {
    console.log('Toggling favorite for document:', documentId);
    // In a real app, this would update the favorite status
  };

  const handleShareDocument = (documentId: string) => {
    console.log('Sharing document:', documentId);
    // In a real app, this would open a sharing dialog
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-8 border border-violet-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/20 to-cyan-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Document Management 📄
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Organize, store, and securely manage all your property documents and files. Access control, version tracking, and compliance management in one place.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                  <span>{totalDocuments} documents stored</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HardDrive className="h-4 w-4" />
                  <span>{totalSize.toFixed(1)} MB total</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>{encryptedDocuments} encrypted</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                <Activity className="h-4 w-4 mr-2" />
                Document Analytics
              </Button>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                {viewMode === 'grid' ? <List className="h-4 w-4 mr-2" /> : <Grid className="h-4 w-4 mr-2" />}
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-violet-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-colors duration-300">
                <FileText className="h-8 w-8 text-violet-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalDocuments}</p>
                <p className="text-sm text-gray-600">Total Documents</p>
                <div className="flex items-center gap-1 text-xs text-violet-600 mt-1">
                  <Database className="h-3 w-3" />
                  Files stored
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-cyan-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-100 group-hover:bg-cyan-200 transition-colors duration-300">
                <HardDrive className="h-8 w-8 text-cyan-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalSize.toFixed(1)} MB</p>
                <p className="text-sm text-gray-600">Storage Used</p>
                <div className="flex items-center gap-1 text-xs text-cyan-600 mt-1">
                  <Archive className="h-3 w-3" />
                  Total file size
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
                <p className="text-3xl font-bold text-gray-900">{favoriteDocuments}</p>
                <p className="text-sm text-gray-600">Favorites</p>
                <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                  <Award className="h-3 w-3" />
                  Starred documents
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                <Share className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{sharedDocuments}</p>
                <p className="text-sm text-gray-600">Shared</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <Users className="h-3 w-3" />
                  Shared files
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Document Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{avgDocumentScore.toFixed(1)}</div>
          <div className="text-sm text-gray-600 mb-1">Avg Document Score</div>
          <div className="text-xs text-emerald-600">Quality rating</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">{totalViews}</div>
          <div className="text-sm text-gray-600 mb-1">Total Views</div>
          <div className="text-xs text-purple-600">Document access</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <div className="text-2xl font-bold text-indigo-600 mb-1">{criticalDocuments}</div>
          <div className="text-sm text-gray-600 mb-1">Critical Documents</div>
          <div className="text-xs text-indigo-600">High importance</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-red-50 to-white border border-red-100">
          <div className="text-2xl font-bold text-red-600 mb-1">{compliantDocuments}</div>
          <div className="text-sm text-gray-600 mb-1">Compliant Files</div>
          <div className="text-xs text-red-600">Compliance status</div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search Documents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, tags, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="plans">Plans</SelectItem>
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
              <Label htmlFor="type">File Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="jpg">Images</SelectItem>
                  <SelectItem value="dwg">CAD Files</SelectItem>
                  <SelectItem value="zip">Archives</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Documents Display */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(document.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{document.name}</h3>
                          <p className="text-xs text-muted-foreground">{formatFileSize(document.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(document.id)}
                      >
                        {document.favorite ? 
                          <Star className="h-4 w-4 text-yellow-500 fill-current" /> : 
                          <StarOff className="h-4 w-4 text-gray-400" />
                        }
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {document.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleViewDocument(document)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(document.id)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getSmallFileIcon(document.type)}
                          <div>
                            <div className="font-medium">{document.name}</div>
                            <div className="text-xs text-muted-foreground">{document.type.toUpperCase()}</div>
                          </div>
                          {document.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          {document.shared && <Share className="h-4 w-4 text-blue-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(document.category)}>
                          {document.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="max-w-[150px] truncate">{document.property}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(document.size)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{document.uploadedBy}</span>
                        </div>
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
                            <DropdownMenuItem onClick={() => handleViewDocument(document)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadDocument(document.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareDocument(document.id)}>
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFavorite(document.id)}>
                              {document.favorite ? (
                                <>
                                  <StarOff className="h-4 w-4 mr-2" />
                                  Remove from Favorites
                                </>
                              ) : (
                                <>
                                  <Star className="h-4 w-4 mr-2" />
                                  Add to Favorites
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600">No documents found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search criteria or upload a new document
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Document Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(categoryStats)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(category)}>
                        {category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{count} files</div>
                      <div className="text-xs text-muted-foreground">
                        {((count / totalDocuments) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents
                .filter(doc => doc.favorite)
                .slice(0, 4)
                .map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getSmallFileIcon(document.type)}
                      <div>
                        <div className="font-medium text-sm">{document.name}</div>
                        <div className="text-xs text-muted-foreground">{document.property}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDocument(document)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(document.id)}>
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              {favoriteDocuments === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No favorite documents yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Details Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Document Details - {selectedDocument?.name}</DialogTitle>
            <DialogDescription>
              Complete information for this document
            </DialogDescription>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {getFileIcon(selectedDocument.type)}
                <div>
                  <h3 className="font-semibold text-lg">{selectedDocument.name}</h3>
                  <p className="text-muted-foreground">{selectedDocument.description}</p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Badge className={getCategoryColor(selectedDocument.category)}>
                    {selectedDocument.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Property</Label>
                  <div className="p-2 border rounded">{selectedDocument.property}</div>
                </div>
                <div className="space-y-2">
                  <Label>File Size</Label>
                  <div className="p-2 border rounded">{formatFileSize(selectedDocument.size)}</div>
                </div>
                <div className="space-y-2">
                  <Label>File Type</Label>
                  <div className="p-2 border rounded">{selectedDocument.type.toUpperCase()}</div>
                </div>
                <div className="space-y-2">
                  <Label>Upload Date</Label>
                  <div className="p-2 border rounded">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</div>
                </div>
                <div className="space-y-2">
                  <Label>Uploaded By</Label>
                  <div className="p-2 border rounded">{selectedDocument.uploadedBy}</div>
                </div>
                <div className="space-y-2">
                  <Label>Version</Label>
                  <div className="p-2 border rounded">{selectedDocument.version}</div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {selectedDocument.status}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadDocument(selectedDocument?.id)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;
