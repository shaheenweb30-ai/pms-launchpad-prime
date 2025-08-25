import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Shield,
  Users,
  Settings,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Search,
  Activity,
  Target,
  Percent,
  Building,
  DollarSign,
  Wrench,
  BarChart3,
  TrendingUp,
  FileIcon,
  Download,
  Upload
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
import { useAccessControl, allPages } from '@/contexts/AccessControlContext';

const AdminAccessControl = () => {
  // User types in the system
  const userTypes = ['homeowner', 'admin', 'tenant', 'vendor'];
  
  const { 
    accessControl, 
    togglePageAccess, 
    isPageAccessible, 
    saveConfiguration, 
    resetToDefault 
  } = useAccessControl();
  
  const [selectedUserType, setSelectedUserType] = useState('homeowner');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Statistics
  const totalPages = allPages.length;
  const enabledPages = accessControl[selectedUserType]?.length || 0;
  const disabledPages = totalPages - enabledPages;
  const accessPercentage = Math.round((enabledPages / totalPages) * 100);

  // Filter pages based on search and category
  const filteredPages = allPages.filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || page.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle page access toggle
  const handleTogglePageAccess = (pageId: string) => {
    togglePageAccess(selectedUserType, pageId);
  };

  // Check if a page is accessible to selected user type
  const checkPageAccessible = (pageId: string) => {
    return isPageAccessible(selectedUserType, pageId);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Management': return 'bg-green-100 text-green-800 border-green-200';
      case 'Finance': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Operations': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Analytics': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'System': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">

      
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-white to-rose-50 p-8 border border-red-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-rose-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Admin Access Control 🛡️
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage page visibility and access permissions for different user types. Control what features each user role can access throughout the application.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>{totalPages} total pages available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Role-based access control</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{userTypes.length} user types</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-red-200 text-red-700 hover:bg-red-50"
                onClick={() => setShowResetModal(true)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowSaveModal(true)}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Access Control Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-red-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{selectedUserType}</p>
                <p className="text-sm text-gray-600">Selected User Type</p>
                <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <Users className="h-3 w-3" />
                  Access control active
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{enabledPages}</p>
                <p className="text-sm text-gray-600">Enabled Pages</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Visible to users
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                <EyeOff className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{disabledPages}</p>
                <p className="text-sm text-gray-600">Disabled Pages</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <XCircle className="h-3 w-3" />
                  Hidden from users
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{accessPercentage}%</p>
                <p className="text-sm text-gray-600">Access Coverage</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Percent className="h-3 w-3" />
                  Pages accessible
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Access Control Management */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="h-6 w-6" />
            Page Access Management
          </CardTitle>
          <p className="text-sm text-blue-700">Configure which pages are visible to each user type</p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* User Type Selector */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
            <Label className="text-base font-medium text-gray-900">Select User Type:</Label>
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger className="w-48 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((userType) => (
                  <SelectItem key={userType} value={userType}>
                    <div className="flex items-center gap-2">
                      <span className="capitalize">{userType}</span>
                      <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                        {accessControl[userType]?.length || 0} pages
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="ml-4">
              <Progress value={accessPercentage} className="h-2 w-32" />
              <p className="text-xs text-gray-600 mt-1">{accessPercentage}% accessible</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Pages</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by page name or description..."
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
                  {Array.from(new Set(allPages.map(p => p.category))).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pages Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Access Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <FileIcon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{page.name}</div>
                          <div className="text-xs text-muted-foreground">/{page.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(page.category)}>
                        {page.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-gray-600">{page.description}</p>
                    </TableCell>
                                            <TableCell>
                          <Badge className={checkPageAccessible(page.id) ? 
                            "bg-green-100 text-green-800 border-green-200" : 
                            "bg-gray-100 text-gray-800 border-gray-200"}>
                            <div className="flex items-center gap-1">
                              {checkPageAccessible(page.id) ? (
                                <>
                                  <Eye className="h-3 w-3" />
                                  Enabled
                                </>
                              ) : (
                                <>
                                  <EyeOff className="h-3 w-3" />
                                  Disabled
                                </>
                              )}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={checkPageAccessible(page.id)}
                            onCheckedChange={() => handleTogglePageAccess(page.id)}
                          />
                        </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-600">No pages found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your search criteria or category filter
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Configuration Modal */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Access Control Configuration</DialogTitle>
            <DialogDescription>
              This will save the current access control settings for all user types. 
              Changes will take effect immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Configuration Summary</span>
              </div>
              <div className="mt-2 space-y-1 text-sm text-blue-700">
                {userTypes.map((userType) => (
                  <div key={userType} className="flex justify-between">
                    <span className="capitalize">{userType}:</span>
                    <span>{accessControl[userType]?.length || 0} pages accessible</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              saveConfiguration();
              setShowSaveModal(false);
            }} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Configuration Modal */}
      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset to Default Configuration</DialogTitle>
            <DialogDescription>
              This will reset all access control settings to their default values. 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Warning</span>
            </div>
            <p className="text-sm text-red-700 mt-2">
              All custom access control settings will be lost and replaced with default configurations.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              resetToDefault();
              setShowResetModal(false);
            }} variant="destructive">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccessControl;
