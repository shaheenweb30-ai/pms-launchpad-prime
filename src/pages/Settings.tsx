import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Bell,
  Shield,
  CreditCard,
  Building2,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
  Key,
  Globe,
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
  Star,
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
  SecurityIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AnalyticsIcon,
  ReportIcon,
  ChartIcon,
  GraphIcon,
  StatsIcon,
  MetricsIcon,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  MoreHorizontal,
  Download,
  Edit,
  Calendar,
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
  ShieldIcon2,
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
  TrendingUpIcon2,
  TrendingDownIcon2,
  BarChart3Icon2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Enhanced settings data
  const [accountStats, setAccountStats] = useState({
    lastLogin: '2024-12-15 14:30',
    loginCount: 127,
    securityScore: 85,
    profileCompletion: 78,
    activeSessions: 2,
    twoFactorEnabled: false,
    lastPasswordChange: '2024-10-15',
    accountAge: '2 years, 3 months'
  });

  const [systemInfo, setSystemInfo] = useState({
    appVersion: '2.1.0',
    lastUpdate: '2024-12-10',
    storageUsed: '2.4 GB',
    storageLimit: '10 GB',
    dataSync: 'Last sync: 2 hours ago',
    backupStatus: 'Last backup: 1 day ago',
    performanceScore: 92,
    uptime: '99.8%'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    rentReminders: true,
    maintenanceUpdates: true,
    paymentAlerts: true,
    marketingEmails: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'EST',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSecurityScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getProfileCompletionColor = (completion: number) => {
    if (completion >= 90) return 'text-emerald-600';
    if (completion >= 80) return 'text-green-600';
    if (completion >= 70) return 'text-blue-600';
    if (completion >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStoragePercentage = () => {
    try {
      const used = parseFloat(accountStats.storageUsed?.split(' ')[0] || '0');
      const limit = parseFloat(systemInfo.storageLimit?.split(' ')[0] || '10');
      return (used / limit) * 100;
    } catch (error) {
      return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-gray-50 p-8 border border-slate-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 to-gray-50/20 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                Settings ⚙️
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage your account settings, security preferences, and application configurations. Customize your experience and maintain account security.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                  <span>Last login: {accountStats.lastLogin}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Security score: {accountStats.securityScore}/100</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Profile: {accountStats.profileCompletion}% complete</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                <Activity className="h-4 w-4 mr-2" />
                Account Analytics
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
              <Button className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{accountStats.securityScore}</p>
                <p className="text-sm text-gray-600">Security Score</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Account protected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{accountStats.profileCompletion}%</p>
                <p className="text-sm text-gray-600">Profile Complete</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Target className="h-3 w-3" />
                  {100 - accountStats.profileCompletion}% remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{accountStats.loginCount}</p>
                <p className="text-sm text-gray-600">Total Logins</p>
                <div className="flex items-center gap-1 text-xs text-purple-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Active user
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-orange-50/50 shadow-lg hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                <HardDrive className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{getStoragePercentage().toFixed(0)}%</p>
                <p className="text-sm text-gray-600">Storage Used</p>
                <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                  <Database className="h-3 w-3" />
                  {systemInfo.storageUsed} of {systemInfo.storageLimit}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <User className="h-6 w-6" />
                Personal Information
              </CardTitle>
              <p className="text-sm text-blue-700">Update your personal details and contact information</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                  <AvatarImage src="/placeholder.svg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    {getInitials(profileData.firstName, profileData.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">Profile Photo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      Remove
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG, GIF or PNG. 1MB max. Recommended: 400x400 pixels
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info className="h-4 w-4" />
                    <span>All changes are automatically saved</span>
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Bell className="h-6 w-6" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-green-700">Customize how and when you receive notifications</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base font-medium text-gray-900">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base font-medium text-gray-900">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via text message</p>
                    </div>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <Label htmlFor="rentReminders" className="text-base font-medium text-gray-900">Rent Reminders</Label>
                      <p className="text-sm text-gray-600">Get notified about upcoming rent payments</p>
                    </div>
                  </div>
                  <Switch
                    id="rentReminders"
                    checked={notifications.rentReminders}
                    onCheckedChange={(value) => handleNotificationChange('rentReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-orange-100">
                      <WrenchIcon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <Label htmlFor="maintenanceUpdates" className="text-base font-medium text-gray-900">Maintenance Updates</Label>
                      <p className="text-sm text-gray-600">Updates on maintenance request status</p>
                    </div>
                  </div>
                  <Switch
                    id="maintenanceUpdates"
                    checked={notifications.maintenanceUpdates}
                    onCheckedChange={(value) => handleNotificationChange('maintenanceUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <Label htmlFor="paymentAlerts" className="text-base font-medium text-gray-900">Payment Alerts</Label>
                      <p className="text-sm text-gray-600">Alerts for payment confirmations and issues</p>
                    </div>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(value) => handleNotificationChange('paymentAlerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-rose-50 rounded-xl border border-rose-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-rose-100">
                      <Star className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <Label htmlFor="marketingEmails" className="text-base font-medium text-gray-900">Marketing Emails</Label>
                      <p className="text-sm text-gray-600">Receive updates about new features and tips</p>
                    </div>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4" />
                  <span>Notification preferences are saved automatically</span>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100">
              <CardTitle className="flex items-center gap-2 text-red-900">
                <Shield className="h-6 w-6" />
                Security Settings
              </CardTitle>
              <p className="text-sm text-red-700">Protect your account with advanced security features</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                {/* Security Score */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-gray-900">Security Score</span>
                    </div>
                    <span className={`text-lg font-bold ${getSecurityScoreColor(accountStats.securityScore)}`}>
                      {accountStats.securityScore}/100
                    </span>
                  </div>
                  <Progress value={accountStats.securityScore} className="h-2" />
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Password Change */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Key className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-gray-900">Change Password</Label>
                      <p className="text-sm text-gray-600">Last changed: {accountStats.lastPasswordChange}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" />
                    <Input type="password" placeholder="New password" className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" />
                    <Input type="password" placeholder="Confirm new password" className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" />
                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <ShieldIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-gray-900">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={accountStats.twoFactorEnabled ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}>
                          {accountStats.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant={accountStats.twoFactorEnabled ? "outline" : "default"} className={accountStats.twoFactorEnabled ? "border-purple-200 text-purple-700 hover:bg-purple-50" : "bg-purple-600 hover:bg-purple-700"}>
                    {accountStats.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </Button>
                </div>

                {/* Login Sessions */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <Activity className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-gray-900">Login Sessions</Label>
                      <p className="text-sm text-gray-600">Manage your active login sessions</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                          {accountStats.activeSessions} active
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    View Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Globe className="h-6 w-6" />
                Application Preferences
              </CardTitle>
              <p className="text-sm text-indigo-700">Customize your application experience and regional settings</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="language" className="text-sm font-medium text-gray-700">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="timezone" className="text-sm font-medium text-gray-700">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="CST">Central Time</SelectItem>
                      <SelectItem value="MST">Mountain Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="currency" className="text-sm font-medium text-gray-700">Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dateFormat" className="text-sm font-medium text-gray-700">Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}>
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Info className="h-4 w-4" />
                  <span>Preferences are applied immediately</span>
                </div>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
