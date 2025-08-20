import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Home,
  UserPlus,
  Download,
  Upload,
  Settings,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'inactive' | 'pending' | 'overdue';
  lastPayment: string;
  nextPayment: string;
  notes: string;
}

const Tenants = () => {
  const { user, profile, signOut, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockTenants: Tenant[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        property: 'Sunset Apartments',
        unit: 'A-101',
        rentAmount: 1200,
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31',
        status: 'active',
        lastPayment: '2024-01-01',
        nextPayment: '2024-02-01',
        notes: 'Reliable tenant, always pays on time'
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 234-5678',
        property: 'Sunset Apartments',
        unit: 'A-102',
        rentAmount: 1150,
        leaseStart: '2024-01-15',
        leaseEnd: '2024-12-15',
        status: 'active',
        lastPayment: '2024-01-15',
        nextPayment: '2024-02-15',
        notes: 'Quiet tenant, no issues'
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@email.com',
        phone: '+1 (555) 345-6789',
        property: 'Sunset Apartments',
        unit: 'A-103',
        rentAmount: 1300,
        leaseStart: '2023-11-01',
        leaseEnd: '2024-10-31',
        status: 'overdue',
        lastPayment: '2023-12-01',
        nextPayment: '2024-01-01',
        notes: 'Payment overdue, needs follow-up'
      },
      {
        id: '4',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 456-7890',
        property: 'Sunset Apartments',
        unit: 'A-104',
        rentAmount: 1250,
        leaseStart: '2024-02-01',
        leaseEnd: '2025-01-31',
        status: 'pending',
        lastPayment: '',
        nextPayment: '2024-03-01',
        notes: 'New tenant, lease pending'
      },
      {
        id: '5',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 567-8901',
        property: 'Sunset Apartments',
        unit: 'A-105',
        rentAmount: 1100,
        leaseStart: '2023-09-01',
        leaseEnd: '2024-08-31',
        status: 'inactive',
        lastPayment: '2024-08-01',
        nextPayment: '',
        notes: 'Lease expired, unit available'
      }
    ];
    
    setTenants(mockTenants);
    setFilteredTenants(mockTenants);
  }, []);

  // Filter tenants based on search and status
  useEffect(() => {
    let filtered = tenants;
    
    if (searchTerm) {
      filtered = filtered.filter(tenant => 
        tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tenant => tenant.status === statusFilter);
    }
    
    setFilteredTenants(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, tenants]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of PropertyFlow.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Pagination
  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(filteredTenants.length / tenantsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ed1c24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Back to Dashboard */}
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-slate-600 hover:text-[#ed1c24] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {profile?.first_name?.[0] || user?.email?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-slate-700 font-medium">
                  {profile?.first_name || user?.email}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                Tenant Management
              </h1>
              <p className="text-lg text-slate-600">
                Manage your tenants, leases, and rental agreements
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-xl px-6 py-3">
              <UserPlus className="w-5 h-5 mr-2" />
              Add New Tenant
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Total Tenants</p>
                    <p className="text-3xl font-bold text-blue-900">{tenants.length}</p>
                    <p className="text-sm text-blue-600 flex items-center mt-2">
                      <Users className="w-4 h-4 mr-1" />
                      All properties
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 mb-1">Active Tenants</p>
                    <p className="text-3xl font-bold text-green-900">
                      {tenants.filter(t => t.status === 'active').length}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Current leases
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-700 mb-1">Pending</p>
                    <p className="text-3xl font-bold text-yellow-900">
                      {tenants.filter(t => t.status === 'pending').length}
                    </p>
                    <p className="text-sm text-yellow-600 flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      Awaiting approval
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700 mb-1">Overdue</p>
                    <p className="text-3xl font-bold text-red-900">
                      {tenants.filter(t => t.status === 'overdue').length}
                    </p>
                    <p className="text-sm text-red-600 flex items-center mt-2">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Needs attention
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search tenants, properties, or units..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-[#ed1c24] focus:ring-[#ed1c24]/20"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-lg focus:border-[#ed1c24] focus:ring-[#ed1c24]/20 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700 rounded-xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenants Table */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200/60">
            <CardTitle className="text-xl text-slate-900">Tenant Directory</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-slate-50/50">
                    <TableHead className="font-semibold text-slate-700">Tenant</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                    <TableHead className="font-semibold text-slate-700">Property</TableHead>
                    <TableHead className="font-semibold text-slate-700">Lease</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rent</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTenants.map((tenant) => (
                    <TableRow key={tenant.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">
                            {tenant.firstName} {tenant.lastName}
                          </div>
                          <div className="text-sm text-slate-500">{tenant.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center mb-1">
                            <Phone className="w-3 h-3 mr-2 text-slate-400" />
                            {tenant.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-slate-900">{tenant.property}</div>
                          <div className="text-sm text-slate-500">Unit {tenant.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-600">
                          <div className="mb-1">
                            <Calendar className="w-3 h-3 inline mr-1 text-slate-400" />
                            {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900">
                          {formatCurrency(tenant.rentAmount)}
                        </div>
                        <div className="text-sm text-slate-500">
                          Next: {formatDate(tenant.nextPayment)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(tenant.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-slate-100"
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-slate-100"
                          >
                            <Edit className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-slate-100"
                          >
                            <MoreHorizontal className="w-4 h-4 text-slate-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/60">
                <div className="text-sm text-slate-600">
                  Showing {indexOfFirstTenant + 1} to {Math.min(indexOfLastTenant, filteredTenants.length)} of {filteredTenants.length} tenants
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(page)}
                      className={currentPage === page 
                        ? "bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white" 
                        : "border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-slate-200 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-slate-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Tenants;
