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
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Building2,
  Home,
  Users,
  DollarSign,
  PieChart,
  LineChart,
  ArrowLeft,
  FileText,
  Printer,
  Mail,
  Share,
  RefreshCw,
  Eye,
  Settings,
  ChevronDown,
  Activity,
  Clock,
  Target,
} from 'lucide-react';

const Reports = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [reportData, setReportData] = useState({
    occupancyTrend: 85.2,
    revenueTrend: 12.5,
    maintenanceCosts: -8.3,
    tenantSatisfaction: 4.2
  });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading report data
    setTimeout(() => {
      setReports([
        {
          id: 1,
          name: "Monthly Financial Report",
          type: "Financial",
          period: "January 2024",
          generated: "2024-01-31",
          status: "Ready",
          size: "2.3 MB"
        },
        {
          id: 2,
          name: "Occupancy Analysis",
          type: "Occupancy",
          period: "Q4 2023",
          generated: "2024-01-15",
          status: "Ready",
          size: "1.8 MB"
        },
        {
          id: 3,
          name: "Maintenance Cost Report",
          type: "Maintenance",
          period: "December 2023",
          generated: "2024-01-10",
          status: "Processing",
          size: "1.2 MB"
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
          <p className="text-lg text-slate-600">Loading Reports...</p>
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
              <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
              <p className="text-slate-600">Generate insights and track performance metrics</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-slate-200 rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2 hover:shadow-lg transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{reportData.occupancyTrend}%</p>
                  <p className="text-xs text-blue-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Revenue Growth</p>
                  <p className="text-2xl font-bold text-emerald-600">+{reportData.revenueTrend}%</p>
                  <p className="text-xs text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Strong performance
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Maintenance Costs</p>
                  <p className="text-2xl font-bold text-red-600">{reportData.maintenanceCosts}%</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Reduced from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Tenant Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">{reportData.tenantSatisfaction}/5</p>
                  <p className="text-xs text-purple-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.3 improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-slate-900">Revenue Trends</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <LineChart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p>Revenue trend chart would go here</p>
                  <p className="text-sm">12-month revenue analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Analysis */}
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-slate-900">Occupancy Analysis</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-600">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <PieChart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p>Occupancy pie chart would go here</p>
                  <p className="text-sm">Current occupancy: 85.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Financial Reports</h3>
                  <p className="text-sm text-slate-600">Revenue, expenses, and profit analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Property Reports</h3>
                  <p className="text-sm text-slate-600">Occupancy, maintenance, and performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Tenant Reports</h3>
                  <p className="text-sm text-slate-600">Satisfaction, retention, and demographics</p>
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
                    placeholder="Search reports..."
                    className="pl-10 border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-slate-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="border-slate-200 rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Reports Table */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
            <CardTitle className="text-xl text-slate-900">Generated Reports</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200/60">
                  <TableHead className="text-slate-700 font-semibold">Report Name</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Type</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Period</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Generated</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Size</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="border-slate-200/60 hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="font-medium text-slate-900">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-full">
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{report.period}</TableCell>
                    <TableCell className="text-slate-700">{report.generated}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={report.status === 'Ready' ? 'default' : 'secondary'}
                        className="rounded-full"
                      >
                        {report.status === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{report.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                          <Mail className="w-4 h-4" />
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

export default Reports;
