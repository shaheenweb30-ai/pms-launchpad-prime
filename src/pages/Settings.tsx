import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
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
import { useCurrency, currencies } from '@/contexts/CurrencyContext';
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
  const { t, i18n } = useTranslation();
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  
  // Temporary state for unsaved changes
  const [tempCurrency, setTempCurrency] = useState(selectedCurrency);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
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

  // Language switching functionality
  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setPreferences(prev => ({
      ...prev,
      language: newLanguage
    }));
    
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
    
    toast({
      title: t('settings.languageChanged'),
      description: `Language changed to ${newLanguage === 'en' ? 'English' : 'العربية'}`,
    });
  };

  // Save all changes function
  const handleSaveChanges = () => {
    // Apply currency changes
    if (tempCurrency.code !== selectedCurrency.code) {
      setSelectedCurrency(tempCurrency);
      localStorage.setItem('preferredCurrency', tempCurrency.code);
    }

    // Apply language changes
    if (preferences.language !== i18n.language) {
      i18n.changeLanguage(preferences.language);
      localStorage.setItem('preferredLanguage', preferences.language);
    }

    // Save other preferences
    localStorage.setItem('userPreferences', JSON.stringify(preferences));

    // Reset unsaved changes flag
    setHasUnsavedChanges(false);

    // Show success message
    toast({
      title: t('settings.updateSuccess'),
      description: `All settings have been saved successfully. Currency: ${i18n.language === 'ar' ? tempCurrency.nameArabic : tempCurrency.name}`,
    });
  };

  // Cancel changes function
  const handleCancelChanges = () => {
    // Reset to original values
    setTempCurrency(selectedCurrency);
    setPreferences(prev => ({
      ...prev,
      language: i18n.language,
      timezone: 'EST',
      dateFormat: 'MM/DD/YYYY'
    }));
    setHasUnsavedChanges(false);

    toast({
      title: t('settings.cancel'),
      description: 'Changes have been cancelled',
    });
  };

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      i18n.changeLanguage(savedLanguage);
      setPreferences(prev => ({
        ...prev,
        language: savedLanguage
      }));
    }
  }, [i18n]);

  // Update temporary currency when selected currency changes
  useEffect(() => {
    setTempCurrency(selectedCurrency);
  }, [selectedCurrency]);

  return (
    <div className="space-y-6">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-blue-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                {t('settings.title')}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                {t('settings.description')}
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  <span className="font-medium">{t('settings.lastLogin')}: {accountStats.lastLogin}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Shield className="h-4 w-4" />
                  <span>{t('settings.securityScore')}: {accountStats.securityScore}/100</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <User className="h-4 w-4" />
                  <span>{t('settings.profileComplete')}: {accountStats.profileCompletion}% complete</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <Activity className="h-4 w-4 mr-2" />
                {t('settings.accountAnalytics')}
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
              <Button 
                onClick={handleSaveChanges}
                disabled={!hasUnsavedChanges}
                className={`${
                  hasUnsavedChanges 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3' 
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <Save className="h-4 w-4 mr-2" />
                {hasUnsavedChanges ? 'Save All Changes' : 'No Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Minimal Account Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
                <Shield className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{accountStats.securityScore}</p>
                <p className="text-sm text-slate-600 font-medium">Security Score</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Account protected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                <User className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{accountStats.profileCompletion}%</p>
                <p className="text-sm text-slate-600 font-medium">Profile Complete</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Target className="h-3 w-3" />
                  {100 - accountStats.profileCompletion}% remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors duration-200">
                <Activity className="h-7 w-7 text-slate-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{accountStats.loginCount}</p>
                <p className="text-sm text-slate-600 font-medium">Total Logins</p>
                <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                  <Clock className="h-3 w-3" />
                  Active user
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors duration-200">
                <HardDrive className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-light text-slate-900">{getStoragePercentage().toFixed(0)}%</p>
                <p className="text-sm text-slate-600 font-medium">Storage Used</p>
                <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
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
          <TabsTrigger value="profile">{t('settings.profile')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('settings.preferences')}</TabsTrigger>
        </TabsList>

        {/* Modern Minimal Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <User className="h-6 w-6" />
                Personal Information
              </CardTitle>
              <p className="text-sm text-slate-600">Update your personal details and contact information</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                  <AvatarImage src="/placeholder.svg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                  <AvatarFallback className="text-2xl font-bold bg-slate-600 text-white">
                    {getInitials(profileData.firstName, profileData.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">Profile Photo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                      Remove
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    JPG, GIF or PNG. 1MB max. Recommended: 400x400 pixels
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-medium text-slate-700">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    placeholder="Your company name"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-medium text-slate-700">Street Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-medium text-slate-700">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-medium text-slate-700">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-sm font-medium text-slate-700">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Info className="h-4 w-4" />
                    <span>All changes are automatically saved</span>
                  </div>
                  <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modern Minimal Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Bell className="h-6 w-6" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-slate-600">Customize how and when you receive notifications</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Mail className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base font-medium text-slate-900">Email Notifications</Label>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base font-medium text-slate-900">SMS Notifications</Label>
                      <p className="text-sm text-slate-600">Receive notifications via text message</p>
                    </div>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Calendar className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <Label htmlFor="rentReminders" className="text-base font-medium text-slate-900">Rent Reminders</Label>
                      <p className="text-sm text-slate-600">Get notified about upcoming rent payments</p>
                    </div>
                  </div>
                  <Switch
                    id="rentReminders"
                    checked={notifications.rentReminders}
                    onCheckedChange={(value) => handleNotificationChange('rentReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <WrenchIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <Label htmlFor="maintenanceUpdates" className="text-base font-medium text-slate-900">Maintenance Updates</Label>
                      <p className="text-sm text-slate-600">Updates on maintenance request status</p>
                    </div>
                  </div>
                  <Switch
                    id="maintenanceUpdates"
                    checked={notifications.maintenanceUpdates}
                    onCheckedChange={(value) => handleNotificationChange('maintenanceUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="paymentAlerts" className="text-base font-medium text-slate-900">Payment Alerts</Label>
                      <p className="text-sm text-slate-600">Alerts for payment confirmations and issues</p>
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

        {/* Modern Minimal Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Shield className="h-6 w-6" />
                Security Settings
              </CardTitle>
              <p className="text-sm text-slate-600">Protect your account with advanced security features</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                {/* Security Score */}
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-slate-900">Security Score</span>
                    </div>
                    <span className={`text-lg font-bold ${getSecurityScoreColor(accountStats.securityScore)}`}>
                      {accountStats.securityScore}/100
                    </span>
                  </div>
                  <Progress value={accountStats.securityScore} className="h-2" />
                  <div className="flex items-center justify-between mt-2 text-sm text-slate-600">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Password Change */}
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Key className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-slate-900">Change Password</Label>
                      <p className="text-sm text-slate-600">Last changed: {accountStats.lastPasswordChange}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl" />
                    <Input type="password" placeholder="New password" className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl" />
                    <Input type="password" placeholder="Confirm new password" className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl" />
                    <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <ShieldIcon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-slate-900">Two-Factor Authentication</Label>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={accountStats.twoFactorEnabled ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-slate-100 text-slate-800 border-slate-200"}>
                          {accountStats.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant={accountStats.twoFactorEnabled ? "outline" : "default"} className={accountStats.twoFactorEnabled ? "border-slate-200 text-slate-700 hover:bg-slate-50" : "bg-slate-900 hover:bg-slate-800"}>
                    {accountStats.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </Button>
                </div>

                {/* Login Sessions */}
                <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <Label className="text-base font-medium text-slate-900">Login Sessions</Label>
                      <p className="text-sm text-slate-600">Manage your active login sessions</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {accountStats.activeSessions} active
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
                    View Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modern Minimal Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Globe className="h-6 w-6" />
                Application Preferences
              </CardTitle>
              <p className="text-sm text-slate-600">Customize your application experience and regional settings</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="language" className="text-sm font-medium text-slate-700">{t('settings.language')}</Label>
                  <Select value={preferences.language} onValueChange={(value) => {
                    setPreferences(prev => ({ ...prev, language: value }));
                    setHasUnsavedChanges(true);
                  }}>
                    <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t('settings.english')}</SelectItem>
                      <SelectItem value="ar">{t('settings.arabic')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="timezone" className="text-sm font-medium text-slate-700">{t('settings.timezone')}</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => {
                    setPreferences(prev => ({ ...prev, timezone: value }));
                    setHasUnsavedChanges(true);
                  }}>
                    <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
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
                  <Label htmlFor="currency" className="text-sm font-medium text-slate-700">{t('settings.currency')}</Label>
                  <Select value={tempCurrency.code} onValueChange={(value) => {
                    if (currencies[value]) {
                      setTempCurrency(currencies[value]);
                      setHasUnsavedChanges(true);
                    }
                  }}>
                    <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(currencies).map(([code, currency]) => (
                        <SelectItem key={code} value={code}>
                          {currency.code} - {i18n.language === 'ar' ? currency.nameArabic : currency.name} ({i18n.language === 'ar' ? currency.symbolArabic : currency.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dateFormat" className="text-sm font-medium text-slate-700">{t('settings.dateFormat')}</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => {
                    setPreferences(prev => ({ ...prev, dateFormat: value }));
                    setHasUnsavedChanges(true);
                  }}>
                    <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl">
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

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Info className="h-4 w-4" />
                  <span>Click "Save Changes" to apply your preferences</span>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleCancelChanges}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {t('settings.cancel')}
                  </Button>
                  <Button 
                    onClick={handleSaveChanges}
                    disabled={!hasUnsavedChanges}
                    className={`${
                      hasUnsavedChanges 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-300 cursor-not-allowed'
                    } transition-all duration-300 transform hover:scale-105`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {hasUnsavedChanges ? t('settings.saveChanges') : 'No Changes'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
