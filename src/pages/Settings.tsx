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
  Mail,
  Phone,
  Save,
  Camera,
  Key,
  Globe,
  Activity,
  Target,
  CheckCircle2,
  Info,
  HelpCircle,
  Star,
  Clock,
  ShieldIcon,
  WrenchIcon,
  Calendar,
  CreditCard
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-light bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                {t('settings.title')}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                {t('settings.description')}
              </p>

            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <Activity className="h-4 w-4 mr-2" />
                {t('settings.accountAnalytics')}
              </Button>
              <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-light">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
              <Button 
                onClick={handleSaveChanges}
                disabled={!hasUnsavedChanges}
                className={`${
                  hasUnsavedChanges 
                    ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Save className="h-4 w-4 mr-2" />
                {hasUnsavedChanges ? 'Save All Changes' : 'No Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>



      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 border border-gray-200 rounded-2xl">
          <TabsTrigger value="profile" className="font-light">{t('settings.profile')}</TabsTrigger>
          <TabsTrigger value="notifications" className="font-light">{t('settings.notifications')}</TabsTrigger>
          <TabsTrigger value="security" className="font-light">{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="preferences" className="font-light">{t('settings.preferences')}</TabsTrigger>
        </TabsList>

        {/* Modern Minimal Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-black font-light">
                <User className="h-6 w-6" />
                Personal Information
              </CardTitle>
              <p className="text-sm text-gray-600 font-light">Update your personal details and contact information</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                  <AvatarImage src="/placeholder.svg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                  <AvatarFallback className="text-2xl font-light bg-gray-600 text-white">
                    {getInitials(profileData.firstName, profileData.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-light text-black">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">Profile Photo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 font-light">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 font-light">
                      Remove
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 font-light">
                    JPG, GIF or PNG. 1MB max. Recommended: 400x400 pixels
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-light text-gray-600">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-light text-gray-600">Last Name</Label>
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
                    <Label htmlFor="phone" className="text-sm font-light text-gray-600">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-light text-gray-600">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="Your company name"
                    />
                  </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-light text-gray-600">Street Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="123 Main Street"
                    />
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-light text-gray-600">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-light text-gray-600">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-sm font-light text-gray-600">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-light">
                    <Info className="h-4 w-4" />
                    <span>All changes are automatically saved</span>
                  </div>
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-2xl px-6 py-3 font-light">
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
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-black font-light">
                <Bell className="h-6 w-6" />
                Notification Preferences
              </CardTitle>
              <p className="text-sm text-gray-600 font-light">Customize how and when you receive notifications</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base font-light text-black">Email Notifications</Label>
                      <p className="text-sm text-gray-600 font-light">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="smsNotifications" className="text-base font-light text-black">SMS Notifications</Label>
                      <p className="text-sm text-gray-600 font-light">Receive notifications via text message</p>
                    </div>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="rentReminders" className="text-base font-light text-black">Rent Reminders</Label>
                      <p className="text-sm text-gray-600 font-light">Get notified about upcoming rent payments</p>
                    </div>
                  </div>
                  <Switch
                    id="rentReminders"
                    checked={notifications.rentReminders}
                    onCheckedChange={(value) => handleNotificationChange('rentReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <WrenchIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="maintenanceUpdates" className="text-base font-light text-black">Maintenance Updates</Label>
                      <p className="text-sm text-gray-600 font-light">Updates on maintenance request status</p>
                    </div>
                  </div>
                  <Switch
                    id="maintenanceUpdates"
                    checked={notifications.maintenanceUpdates}
                    onCheckedChange={(value) => handleNotificationChange('maintenanceUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="paymentAlerts" className="text-base font-light text-black">Payment Alerts</Label>
                      <p className="text-sm text-gray-600 font-light">Alerts for payment confirmations and issues</p>
                    </div>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(value) => handleNotificationChange('paymentAlerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Star className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="marketingEmails" className="text-base font-light text-black">Marketing Emails</Label>
                      <p className="text-sm text-gray-600 font-light">Receive updates about new features and tips</p>
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
                <Button className="bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-light">
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
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-black font-light">
                <Shield className="h-6 w-6" />
                Security Settings
              </CardTitle>
              <p className="text-sm text-gray-600 font-light">Protect your account with advanced security features</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">


                {/* Password Change */}
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Key className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label className="text-base font-light text-black">Change Password</Label>
                      <p className="text-sm text-gray-600 font-light">Last changed: 2024-10-15</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl" />
                    <Input type="password" placeholder="New password" className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl" />
                    <Input type="password" placeholder="Confirm new password" className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl" />
                    <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 font-light">
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <ShieldIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label className="text-base font-light text-black">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600 font-light">Add an extra layer of security to your account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                          Disabled
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="default" className="bg-black hover:bg-gray-800 font-light">
                    Enable 2FA
                  </Button>
                </div>

                {/* Login Sessions */}
                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Activity className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <Label className="text-base font-light text-black">Login Sessions</Label>
                      <p className="text-sm text-gray-600 font-light">Manage your active login sessions</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                          2 active
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 font-light">
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
