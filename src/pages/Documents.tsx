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
  const documents: any[] = [];
      favorite: false,
      shared: false,
      description: 'Detailed inspection report with photos and findings',
      version: '1.0',
      status: 'active'
    }
  ];

  const properties: string[] = [];

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
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                Document Management
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Organize, store, and securely manage all your property documents and files. Access control, version tracking, and compliance management in one place.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  <span className="font-medium">{totalDocuments} documents stored</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <HardDrive className="h-4 w-4" />
                  <span>{totalSize.toFixed(1)} MB total</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Shield className="h-4 w-4" />
                  <span>{encryptedDocuments} encrypted</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                {viewMode === 'grid' ? <List className="h-4 w-4 mr-2" /> : <Grid className="h-4 w-4 mr-2" />}
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
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
              <div className="p-3 rounded-2xl bg-violet-50 group-hover:bg-violet-100 transition-colors duration-200">
                <FileText className="h-7 w-7 text-violet-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{totalDocuments}</p>
                <p className="text-sm text-slate-600 font-medium">Total Documents</p>
                <div className="flex items-center gap-1 text-xs text-violet-600 mt-1">
                  <Database className="h-3 w-3" />
                  Files stored
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <HardDrive className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{totalSize.toFixed(1)} MB</p>
                <p className="text-sm text-slate-600 font-medium">Storage Used</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Archive className="h-3 w-3" />
                  Total file size
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
                <p className="text-3xl font-light text-slate-900">{favoriteDocuments}</p>
                <p className="text-sm text-slate-600 font-medium">Favorites</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                  <Award className="h-3 w-3" />
                  Starred documents
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <Share className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{sharedDocuments}</p>
                <p className="text-sm text-slate-600 font-medium">Shared</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <Users className="h-3 w-3" />
                  Shared files
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Minimal Additional Document Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-emerald-600 mb-1">{avgDocumentScore.toFixed(1)}</div>
          <div className="text-sm text-slate-600 mb-1">Avg Document Score</div>
          <div className="text-xs text-emerald-600">Quality rating</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-slate-600 mb-1">{totalViews}</div>
          <div className="text-sm text-slate-600 mb-1">Total Views</div>
          <div className="text-xs text-slate-600">Document access</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-blue-600 mb-1">{criticalDocuments}</div>
          <div className="text-sm text-slate-600 mb-1">Critical Documents</div>
          <div className="text-xs text-blue-600">High importance</div>
        </div>
        
        <div className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="text-2xl font-light text-red-600 mb-1">{compliantDocuments}</div>
          <div className="text-sm text-slate-600 mb-1">Compliant Files</div>
          <div className="text-xs text-red-600">Compliance status</div>
        </div>
      </div>

      {/* Modern Minimal Filters and Search */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-slate-800">Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="text-slate-700">Search Documents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by name, tags, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full md:w-40">
              <Label htmlFor="category" className="text-slate-700">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
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
              <Label htmlFor="type" className="text-slate-700">File Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-slate-200 rounded-xl">
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

          {/* Modern Minimal Documents Display */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(document.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate text-slate-900">{document.name}</h3>
                          <p className="text-xs text-slate-500">{formatFileSize(document.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(document.id)}
                        className="hover:bg-slate-50"
                      >
                        {document.favorite ? 
                          <Star className="h-4 w-4 text-yellow-500 fill-current" /> : 
                          <StarOff className="h-4 w-4 text-slate-400" />
                        }
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {document.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleViewDocument(document)} className="border-slate-200 text-slate-700 hover:bg-slate-50">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(document.id)} className="border-slate-200 text-slate-700 hover:bg-slate-50">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold text-slate-700">Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Category</TableHead>
                    <TableHead className="font-semibold text-slate-700">Property</TableHead>
                    <TableHead className="font-semibold text-slate-700">Size</TableHead>
                    <TableHead className="font-semibold text-slate-700">Upload Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Uploaded By</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getSmallFileIcon(document.type)}
                          <div>
                            <div className="font-medium text-slate-900">{document.name}</div>
                            <div className="text-xs text-slate-500">{document.type.toUpperCase()}</div>
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
                          <Building2 className="h-4 w-4 text-slate-500" />
                          <span className="max-w-[150px] truncate text-slate-900">{document.property}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-900">{formatFileSize(document.size)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-900">
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-900">{document.uploadedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-50">
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
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                              <p className="text-lg font-semibold text-slate-700">No documents found</p>
                <p className="text-sm text-slate-500">
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
