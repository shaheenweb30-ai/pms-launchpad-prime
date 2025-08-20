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
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Home,
  Download,
  Upload,
  Settings,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  PieChart,
  CreditCard,
  Wallet,
  PiggyBank,
  Receipt,
  Calculator,
} from 'lucide-react';

const Financials = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [financialData, setFinancialData] = useState({
    monthlyRevenue: 104000,
    monthlyExpenses: 32000,
    netIncome: 72000,
    occupancyRate: 83.3,
    averageRent: 2167,
    totalProperties: 3,
    totalUnits: 44
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading financial data
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          type: "Income",
          description: "Rent Payment - Unit 2A",
          amount: 2200,
          property: "Sunset Apartments",
          unit: "2A",
          tenant: "John Smith",
          date: "2024-01-15",
          status: "Completed"
        },
        {
          id: 2,
          type: "Expense",
          description: "Maintenance - HVAC Repair",
          amount: -450,
          property: "Ocean View Condos",
          unit: "5B",
          vendor: "ABC HVAC Services",
          date: "2024-01-14",
          status: "Pending"
        },
        {
          id: 3,
          type: "Income",
          description: "Rent Payment - Unit 1C",
          amount: 1950,
          property: "Sunset Apartments",
          unit: "1C",
          tenant: "Sarah Johnson",
          date: "2024-01-13",
          status: "Completed"
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
          <p className="text-lg text-slate-600">Loading Financials...</p>
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
              <h1 className="text-2xl font-bold text-slate-900">Financials</h1>
              <p className="text-slate-600">Manage your property finances and track performance</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-slate-200 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2 hover:shadow-lg transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-emerald-600">${(financialData.monthlyRevenue / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-emerald-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
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
                  <p className="text-sm text-slate-600 mb-1">Monthly Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${(financialData.monthlyExpenses / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    +8.2%
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Net Income</p>
                  <p className="text-2xl font-bold text-blue-600">${(financialData.netIncome / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-blue-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.3%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{financialData.occupancyRate}%</p>
                  <p className="text-xs text-purple-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue vs Expenses Chart */}
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
              <CardTitle className="text-xl text-slate-900">Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">Revenue: ${financialData.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm">Expenses: ${financialData.monthlyExpenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Performance */}
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
              <CardTitle className="text-xl text-slate-900">Property Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-slate-500" />
                    <span className="font-medium">Sunset Apartments</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">${(financialData.monthlyRevenue * 0.6).toLocaleString()}</p>
                    <p className="text-xs text-slate-500">60% of revenue</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-slate-500" />
                    <span className="font-medium">Ocean View Condos</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">${(financialData.monthlyRevenue * 0.4).toLocaleString()}</p>
                    <p className="text-xs text-slate-500">40% of revenue</p>
                  </div>
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
                    placeholder="Search transactions..."
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

        {/* Transactions Table */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
            <CardTitle className="text-xl text-slate-900">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200/60">
                  <TableHead className="text-slate-700 font-semibold">Type</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Description</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Amount</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Property</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Date</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-slate-200/60 hover:bg-slate-50">
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'Income' ? 'default' : 'destructive'}
                        className="rounded-full"
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-slate-900">{transaction.description}</p>
                        <p className="text-sm text-slate-600">
                          {transaction.type === 'Income' ? `Tenant: ${transaction.tenant}` : `Vendor: ${transaction.vendor}`}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${transaction.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-700">{transaction.property}</TableCell>
                    <TableCell className="text-slate-700">{transaction.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                        className="rounded-full"
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
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

export default Financials;
