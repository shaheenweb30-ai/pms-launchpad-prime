import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Download,
  Upload,
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  Mail,
  Phone,
  MapPin,
  Building2,
  Home,
  CreditCard,
  Key,
  Lock,
  Unlock,
  EyeOff,
  EyeOn,
  RefreshCw,
  Trash,
  Copy,
  ExternalLink,
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    company: profile?.company || '',
    role: profile?.role || 'property_manager'
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    maintenanceAlerts: true,
    rentReminders: true,
    financialReports: false,
    systemUpdates: true
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true
  });

  useEffect(() => {
    // Simulate loading settings data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = () => {
    // Handle profile save logic
    console.log('Saving profile:', profileData);
  };

  const handleSaveNotifications = () => {
    // Handle notification settings save logic
    console.log('Saving notifications:', notifications);
  };

  const handleSaveSecurity = () => {
    // Handle security settings save logic
    console.log('Saving security:', security);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ed1c24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading Settings...</p>
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
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600">Manage your account preferences and system settings</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-slate-200 rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2 hover:shadow-lg transition-all duration-200">
              <Save className="w-4 h-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white rounded-2xl">
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                      activeTab === 'profile'
                        ? 'bg-[#ed1c24]/5 text-[#ed1c24] border-r-2 border-[#ed1c24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                      activeTab === 'notifications'
                        ? 'bg-[#ed1c24]/5 text-[#ed1c24] border-r-2 border-[#ed1c24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="font-medium">Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                      activeTab === 'security'
                        ? 'bg-[#ed1c24]/5 text-[#ed1c24] border-r-2 border-[#ed1c24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Security</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                      activeTab === 'preferences'
                        ? 'bg-[#ed1c24]/5 text-[#ed1c24] border-r-2 border-[#ed1c24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Palette className="w-5 h-5" />
                    <span className="font-medium">Preferences</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('integrations')}
                    className={`flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                      activeTab === 'integrations'
                        ? 'bg-[#ed1c24]/5 text-[#ed1c24] border-r-2 border-[#ed1c24]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Database className="w-5 h-5" />
                    <span className="font-medium">Integrations</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        placeholder="Enter your first name"
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        placeholder="Enter your last name"
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        placeholder="Enter your email"
                        className="border-slate-200 rounded-xl"
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="Enter your phone number"
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        placeholder="Enter your company name"
                        className="border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={profileData.role} onValueChange={(value) => setProfileData({...profileData, role: value})}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="property_manager">Property Manager</SelectItem>
                          <SelectItem value="homeowner">Homeowner</SelectItem>
                          <SelectItem value="tenant">Tenant</SelectItem>
                          <SelectItem value="maintenance">Maintenance Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2">
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Email Notifications</h3>
                        <p className="text-sm text-slate-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">SMS Notifications</h3>
                        <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Maintenance Alerts</h3>
                        <p className="text-sm text-slate-600">Get notified about maintenance requests</p>
                      </div>
                      <Switch
                        checked={notifications.maintenanceAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, maintenanceAlerts: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Rent Reminders</h3>
                        <p className="text-sm text-slate-600">Receive rent payment reminders</p>
                      </div>
                      <Switch
                        checked={notifications.rentReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, rentReminders: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Financial Reports</h3>
                        <p className="text-sm text-slate-600">Get monthly financial summaries</p>
                      </div>
                      <Switch
                        checked={notifications.financialReports}
                        onCheckedChange={(checked) => setNotifications({...notifications, financialReports: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">System Updates</h3>
                        <p className="text-sm text-slate-600">Receive system and feature updates</p>
                      </div>
                      <Switch
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2">
                      <Save className="w-4 h-4 mr-2" />
                      Save Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={security.twoFactorAuth}
                        onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Login Notifications</h3>
                        <p className="text-sm text-slate-600">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        checked={security.loginNotifications}
                        onCheckedChange={(checked) => setSecurity({...security, loginNotifications: checked})}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Select value={security.sessionTimeout.toString()} onValueChange={(value) => setSecurity({...security, sessionTimeout: parseInt(value)})}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Select value={security.passwordExpiry.toString()} onValueChange={(value) => setSecurity({...security, passwordExpiry: parseInt(value)})}>
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select expiry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleSaveSecurity} className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2">
                      <Save className="w-4 h-4 mr-2" />
                      Save Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences Settings */}
            {activeTab === 'preferences' && (
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="border-slate-200 rounded-xl">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="cad">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white rounded-xl px-6 py-2">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations Settings */}
            {activeTab === 'integrations' && (
              <Card className="border-0 shadow-lg bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/60">
                  <CardTitle className="text-xl text-slate-900">Third-Party Integrations</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">QuickBooks</h3>
                          <p className="text-sm text-slate-600">Sync financial data with QuickBooks</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-slate-200 rounded-xl">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">Mailchimp</h3>
                          <p className="text-sm text-slate-600">Send email campaigns to tenants</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-slate-200 rounded-xl">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">Stripe</h3>
                          <p className="text-sm text-slate-600">Process rent payments online</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-slate-200 rounded-xl">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
