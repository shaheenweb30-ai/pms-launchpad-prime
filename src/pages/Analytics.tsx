import { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Users,
  Calendar,
  Download,
  Filter,
  Target,
  PieChart,
  LineChart,
  Activity,
  Eye,
  Share,
  RefreshCw,
  Zap,
  Star,
  Award,
  TrendingUpIcon,
  TrendingDownIcon,
  Minus,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart,
  PieChartIcon,
  LineChartIcon,
  ActivityIcon,
  TargetIcon,
  BuildingIcon,
  UserIcon,
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  EyeIcon,
  ShareIcon,
  RefreshCwIcon,
  ZapIcon,
  StarIcon,
  AwardIcon,
  Wrench,
  Shield,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Analytics = () => {
  const { formatCurrency } = useCurrency();
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample data - in a real app, this would come from your backend
  const kpiData = {
    totalROI: 18.5,
    avgOccupancy: 92.3,
    revenueGrowth: 12.8,
    expenseRatio: 0.34,
    netYield: 8.2,
    portfolioValue: 2840000
  };

  const monthlyPerformance = [
    { month: 'Jan', revenue: 98000, expenses: 28000, occupancy: 89, roi: 16.2 },
    { month: 'Feb', revenue: 102000, expenses: 31000, occupancy: 91, roi: 17.1 },
    { month: 'Mar', revenue: 105000, expenses: 29000, occupancy: 93, roi: 18.3 },
    { month: 'Apr', revenue: 108000, expenses: 33000, occupancy: 88, roi: 17.8 },
    { month: 'May', revenue: 110000, expenses: 30000, occupancy: 95, roi: 19.2 },
    { month: 'Jun', revenue: 112000, expenses: 35000, occupancy: 92, roi: 18.1 },
    { month: 'Jul', revenue: 115000, expenses: 32000, occupancy: 94, roi: 19.8 },
    { month: 'Aug', revenue: 118000, expenses: 34000, occupancy: 96, roi: 20.1 },
    { month: 'Sep', revenue: 116000, expenses: 31000, occupancy: 93, roi: 19.5 },
    { month: 'Oct', revenue: 119000, expenses: 33000, occupancy: 91, roi: 18.9 },
    { month: 'Nov', revenue: 121000, expenses: 30000, occupancy: 97, roi: 21.2 },
    { month: 'Dec', revenue: 125000, expenses: 32000, occupancy: 95, roi: 20.8 }
  ];

  const propertyPerformance = [
    { property: 'Oak Street Apartments', revenue: 48000, expenses: 12000, roi: 22.5, occupancy: 96, trend: 'up', change: '+2.1%' },
    { property: 'Downtown Lofts', revenue: 36000, expenses: 8500, roi: 19.8, occupancy: 92, trend: 'up', change: '+1.5%' },
    { property: 'Riverside Complex', revenue: 28000, expenses: 7200, roi: 18.1, occupancy: 88, trend: 'down', change: '-0.8%' },
    { property: 'Suburban Homes', revenue: 13000, expenses: 4300, roi: 15.2, occupancy: 94, trend: 'up', change: '+3.2%' }
  ];

  const expenseBreakdown = [
    { category: 'Maintenance', amount: 18500, percentage: 35.2, trend: 'up', icon: Wrench, color: 'text-red-600', bgColor: 'bg-red-50' },
    { category: 'Insurance', amount: 12300, percentage: 23.4, trend: 'stable', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { category: 'Property Tax', amount: 10800, percentage: 20.5, trend: 'up', icon: FileText, color: 'text-green-600', bgColor: 'bg-green-50' },
    { category: 'Management', amount: 6200, percentage: 11.8, trend: 'down', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { category: 'Utilities', amount: 4700, percentage: 8.9, trend: 'stable', icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { category: 'Other', amount: 150, percentage: 0.3, trend: 'down', icon: MoreHorizontal, color: 'text-gray-600', bgColor: 'bg-gray-50' }
  ];

  const marketComparison = {
    yourAvgRent: 2167,
    marketAvgRent: 2050,
    yourOccupancy: 92.3,
    marketOccupancy: 87.8,
    yourROI: 18.5,
    marketROI: 15.2
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendBadgeVariant = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'default';
      case 'down':
        return 'destructive';
      case 'stable':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 border border-indigo-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Dashboard 📊
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comprehensive insights and performance metrics for your property portfolio. Track ROI, occupancy rates, and market performance in real-time.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Data updated 2 minutes ago</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Last refresh: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <Share className="h-4 w-4 mr-2" />
                Share Report
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <span className="font-medium text-gray-700">Time Range</span>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48 border-indigo-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="2years">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enhanced Key Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Portfolio ROI
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{kpiData.totalROI}%</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">+2.3% from last quarter</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Occupancy
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{kpiData.avgOccupancy}%</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">+1.8% vs market avg</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Revenue Growth
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-300">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{kpiData.revenueGrowth}%</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">YoY growth rate</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Expense Ratio
            </CardTitle>
            <div className="p-2 rounded-lg bg-orange-50 group-hover:bg-orange-100 transition-colors duration-300">
              <PieChart className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{kpiData.expenseRatio}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingDown className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">-0.05 from last year</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Net Yield
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{kpiData.netYield}%</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">Above industry standard</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-green-50/50 shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Portfolio Value
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(kpiData.portfolioValue)}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="font-medium">+8.2% appreciation</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-1">
          <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
            <BarChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="properties" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
            <Building2 className="h-4 w-4 mr-2" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
            <PieChart className="h-4 w-4 mr-2" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-indigo-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Performance Chart */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <LineChart className="h-5 w-5 text-blue-600" />
                  </div>
                  Monthly Performance Trends
                  <Badge variant="secondary" className="ml-auto">12 months</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center border border-blue-100">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">Revenue vs ROI Chart</p>
                    <p className="text-sm text-gray-500 mb-4">Interactive performance chart would go here</p>
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Occupancy Trends */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-green-50">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  Occupancy Trends
                  <Badge variant="secondary" className="ml-auto">92.3% avg</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center border border-green-100">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">Occupancy Rate Chart</p>
                    <p className="text-sm text-gray-500 mb-4">Monthly occupancy visualization</p>
                    <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Performance Summary Table */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-indigo-50">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                </div>
                Monthly Performance Summary
                <Badge variant="secondary" className="ml-auto">Last 6 months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-700">Month</th>
                      <th className="text-right p-4 font-semibold text-gray-700">Revenue</th>
                      <th className="text-right p-4 font-semibold text-gray-700">Expenses</th>
                      <th className="text-right p-4 font-semibold text-gray-700">Net Income</th>
                      <th className="text-right p-4 font-semibold text-gray-700">Occupancy</th>
                      <th className="text-right p-4 font-semibold text-gray-700">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyPerformance.slice(-6).map((month, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                        <td className="p-4 font-medium text-gray-900">{month.month}</td>
                                          <td className="p-4 text-right font-semibold text-gray-900">{formatCurrency(month.revenue)}</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(month.expenses)}</td>
                  <td className="p-4 text-right font-semibold text-green-600">
                    {formatCurrency(month.revenue - month.expenses)}
                  </td>
                        <td className="p-4 text-right">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {month.occupancy}%
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-semibold text-indigo-600">{month.roi}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                Property Performance Comparison
                <Badge variant="secondary" className="ml-auto">4 properties</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {propertyPerformance.map((property, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.property}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span>Occupancy: {property.occupancy}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span>Monthly Revenue: {formatCurrency(property.revenue)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`text-2xl font-bold ${getTrendColor(property.trend)}`}>
                            {property.roi}% ROI
                          </div>
                          <Badge variant={getTrendBadgeVariant(property.trend)} className="text-xs">
                            {property.change}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Net: {formatCurrency(property.revenue - property.expenses)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-red-50">
                    <PieChart className="h-5 w-5 text-red-600" />
                  </div>
                  Expense Breakdown
                                      <Badge variant="secondary" className="ml-auto">{formatCurrency(52650)} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${expense.bgColor}`}>
                          <expense.icon className={`h-4 w-4 ${expense.color}`} />
                        </div>
                        <span className="font-medium text-gray-900">{expense.category}</span>
                        <Badge variant={getTrendBadgeVariant(expense.trend)} className="text-xs">
                          {expense.trend}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatCurrency(expense.amount)}</div>
                        <div className="text-xs text-gray-500">{expense.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 rounded-lg bg-orange-50">
                    <PieChart className="h-5 w-5 text-orange-600" />
                  </div>
                  Expense Trends
                  <Badge variant="secondary" className="ml-auto">Monthly view</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center border border-red-100">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">Expense Distribution</p>
                    <p className="text-sm text-gray-500 mb-4">Pie chart visualization</p>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 rounded-lg bg-purple-50">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                Market Comparison
                <Badge variant="secondary" className="ml-auto">Real-time data</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">{formatCurrency(marketComparison.yourAvgRent)}</div>
                  <div className="text-sm text-gray-600 mb-3">Your Avg. Rent</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                                          +{formatCurrency(marketComparison.yourAvgRent - marketComparison.marketAvgRent)} vs market
                  </div>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{marketComparison.yourOccupancy}%</div>
                  <div className="text-sm text-gray-600 mb-3">Your Occupancy</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    +{(marketComparison.yourOccupancy - marketComparison.marketOccupancy).toFixed(1)}% vs market
                  </div>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{marketComparison.yourROI}%</div>
                  <div className="text-sm text-gray-600 mb-3">Your ROI</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4" />
                    +{(marketComparison.yourROI - marketComparison.marketROI).toFixed(1)}% vs market
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
