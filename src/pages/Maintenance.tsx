import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Wrench,
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
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Home,
  Tool,
  Download,
  Upload,
  Settings,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

const Maintenance = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading maintenance data
    setTimeout(() => {
      setMaintenanceRequests([
        {
          id: 1,
          title: "Leaky Faucet in Unit 2A",
          property: "Sunset Apartments",
          unit: "2A",
          priority: "Medium",
          status: "In Progress",
          assignedTo: "Mike Johnson",
          createdAt: "2024-01-15",
          estimatedCompletion: "2024-01-20"
        },
        {
          id: 2,
          title: "HVAC System Not Working",
          property: "Ocean View Condos",
          unit: "5B",
          priority: "High",
          status: "Open",
          assignedTo: "Unassigned",
          createdAt: "2024-01-14",
          estimatedCompletion: "2024-01-18"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ed1c24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading Maintenance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/60 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Maintenance</h1>
              <p className="text-slate-600">Manage maintenance requests and repairs</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2 hover:shadow-lg transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Requests</p>
                  <p className="text-2xl font-bold text-slate-900">24</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Open</p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-emerald-600">4</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search maintenance requests..."
                    className="pl-10 border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-slate-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Requests Table */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
            <CardTitle className="text-xl text-slate-900">Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200/60">
                  <TableHead className="text-slate-700 font-semibold">Request</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Property</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Priority</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Assigned To</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Created</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRequests.map((request) => (
                  <TableRow key={request.id} className="border-slate-200/60 hover:bg-slate-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-900">{request.title}</p>
                        <p className="text-sm text-slate-600">Unit {request.unit}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">{request.property}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={request.priority === 'High' ? 'destructive' : 'secondary'}
                        className="rounded-full"
                      >
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === 'Open' ? 'destructive' : 
                          request.status === 'In Progress' ? 'secondary' : 'default'
                        }
                        className="rounded-full"
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{request.assignedTo}</TableCell>
                    <TableCell className="text-slate-700">{request.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Maintenance;
