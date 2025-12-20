import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessControlProvider } from "@/contexts/AccessControlContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLayout from "@/components/ProtectedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LanguageRoute } from "@/components/LanguageRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Lease from "./pages/Lease";
import RentCollection from "./pages/RentCollection";
import Reports from "./pages/Reports";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Chat from "./pages/Chat";
import Maintenance from "./pages/Maintenance";
import Settings from "./pages/Settings";
import AdminAccessControl from "./pages/AdminAccessControl";
import AdminPanel from "./components/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPricingManagement from "./pages/AdminPricingManagement";
import TenantDashboard from "./pages/TenantDashboard";
import TenantMaintenance from "./pages/TenantMaintenance";
import MyLease from "./pages/MyLease";
import PaymentHistory from "./pages/PaymentHistory";
import MaintenanceRequests from "./pages/MaintenanceRequests";
import TenantChat from "./pages/TenantChat";
import VendorDashboard from "./pages/VendorDashboard";
import MaintenanceTasks from "./pages/MaintenanceTasks";
import WorkHistory from "./pages/WorkHistory";
import VendorChat from "./pages/VendorChat";
import VendorPaymentHistory from "./pages/VendorPaymentHistory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import './lib/i18n';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AccessControlProvider>
            <CurrencyProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <ErrorBoundary>
              <Routes>
              {/* Redirect root to default language */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              
              {/* Redirect any non-prefixed routes to English version */}
              <Route path="/signin" element={<Navigate to="/en/signin" replace />} />
              <Route path="/signup" element={<Navigate to="/en/signup" replace />} />
              <Route path="/about" element={<Navigate to="/en/about" replace />} />
              <Route path="/pricing" element={<Navigate to="/en/pricing" replace />} />
              <Route path="/careers" element={<Navigate to="/en/careers" replace />} />
              <Route path="/blog" element={<Navigate to="/en/blog" replace />} />
              <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
              <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
              <Route path="/terms" element={<Navigate to="/en/terms" replace />} />
              <Route path="/cookies" element={<Navigate to="/en/cookies" replace />} />
              <Route path="/help" element={<Navigate to="/en/help" replace />} />
              
              {/* Language-prefixed routes */}
              <Route path="/:lang" element={<LanguageRoute><Index /></LanguageRoute>} />
              <Route path="/:lang/signin" element={<LanguageRoute><SignIn /></LanguageRoute>} />
              <Route path="/:lang/signup" element={<LanguageRoute><SignUp /></LanguageRoute>} />
              
              {/* Admin Routes - Admin Only */}
              <Route 
                path="/:lang/admin-dashboard" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ProtectedLayout>
                        <AdminDashboard />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/admin-panel" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ProtectedLayout>
                        <AdminPanel />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/admin-access-control" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ProtectedLayout>
                        <AdminAccessControl />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/admin-pricing" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['admin']}>
                      <ProtectedLayout>
                        <AdminPricingManagement />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              {/* Property Owner Routes - Homeowner Only */}
              <Route 
                path="/:lang/dashboard" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Dashboard />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/analytics" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Analytics />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/leases" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Lease />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/properties" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Properties />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/tenants" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Tenants />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/chat" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Chat />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/lease" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Lease />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              

              
              <Route 
                path="/:lang/rent-collection" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <RentCollection />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              

              
              <Route 
                path="/:lang/maintenance" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Maintenance />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              

              

              
              <Route 
                path="/:lang/reports" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['homeowner']}>
                      <ProtectedLayout>
                        <Reports />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              {/* Tenant Routes - Tenant Only */}
              <Route 
                path="/:lang/tenant-dashboard" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <TenantDashboard />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              <Route 
                path="/:lang/tenant-maintenance" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <TenantMaintenance />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/my-lease" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <MyLease />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/payment-history" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <PaymentHistory />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/maintenance-requests" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <MaintenanceRequests />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/tenant-chat" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['tenant']}>
                      <ProtectedLayout>
                        <TenantChat />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              {/* Vendor Routes - Vendor Only */}
              <Route 
                path="/:lang/vendor-dashboard" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <ProtectedLayout>
                        <VendorDashboard />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/maintenance-tasks" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <ProtectedLayout>
                        <MaintenanceTasks />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/work-history" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <ProtectedLayout>
                        <WorkHistory />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/vendor-chat" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <ProtectedLayout>
                        <VendorChat />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />

              <Route 
                path="/:lang/vendor-payment-history" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['vendor']}>
                      <ProtectedLayout>
                        <VendorPaymentHistory />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              {/* Shared Routes - All Authenticated Users */}
              <Route 
                path="/:lang/settings" 
                element={
                  <LanguageRoute>
                    <ProtectedRoute allowedRoles={['admin', 'homeowner', 'tenant', 'vendor']}>
                      <ProtectedLayout>
                        <Settings />
                      </ProtectedLayout>
                    </ProtectedRoute>
                  </LanguageRoute>
                } 
              />
              
              {/* Public Routes - No Auth Required */}
              <Route path="/:lang/privacy" element={<LanguageRoute><PrivacyPolicy /></LanguageRoute>} />
              <Route path="/:lang/terms" element={<LanguageRoute><TermsOfService /></LanguageRoute>} />
              <Route path="/:lang/cookies" element={<LanguageRoute><CookiePolicy /></LanguageRoute>} />
              <Route path="/:lang/careers" element={<LanguageRoute><Careers /></LanguageRoute>} />
              <Route path="/:lang/contact" element={<LanguageRoute><Contact /></LanguageRoute>} />
              <Route path="/:lang/help" element={<LanguageRoute><HelpCenter /></LanguageRoute>} />
              <Route path="/:lang/about" element={<LanguageRoute><About /></LanguageRoute>} />
              <Route path="/:lang/blog" element={<LanguageRoute><Blog /></LanguageRoute>} />
              <Route path="/:lang/pricing" element={<LanguageRoute><Pricing /></LanguageRoute>} />

              {/* Redirect old routes without language prefix to English version */}
              <Route path="/signin" element={<Navigate to="/en/signin" replace />} />
              <Route path="/signup" element={<Navigate to="/en/signup" replace />} />
              <Route path="/admin-dashboard" element={<Navigate to="/en/admin-dashboard" replace />} />
              <Route path="/admin-panel" element={<Navigate to="/en/admin-panel" replace />} />
              <Route path="/admin-access-control" element={<Navigate to="/en/admin-access-control" replace />} />
              <Route path="/dashboard" element={<Navigate to="/en/dashboard" replace />} />
              <Route path="/analytics" element={<Navigate to="/en/analytics" replace />} />
              <Route path="/leases" element={<Navigate to="/en/leases" replace />} />
              <Route path="/lease" element={<Navigate to="/en/lease" replace />} />
              <Route path="/properties" element={<Navigate to="/en/properties" replace />} />
              <Route path="/tenants" element={<Navigate to="/en/tenants" replace />} />
              <Route path="/chat" element={<Navigate to="/en/chat" replace />} />
              <Route path="/rent-collection" element={<Navigate to="/en/rent-collection" replace />} />
              <Route path="/maintenance" element={<Navigate to="/en/maintenance" replace />} />
              <Route path="/reports" element={<Navigate to="/en/reports" replace />} />
              <Route path="/tenant-dashboard" element={<Navigate to="/en/tenant-dashboard" replace />} />
              <Route path="/tenant-maintenance" element={<Navigate to="/en/tenant-maintenance" replace />} />
              <Route path="/my-lease" element={<Navigate to="/en/my-lease" replace />} />
              <Route path="/payment-history" element={<Navigate to="/en/payment-history" replace />} />
              <Route path="/maintenance-requests" element={<Navigate to="/en/maintenance-requests" replace />} />
              <Route path="/tenant-chat" element={<Navigate to="/en/tenant-chat" replace />} />
              <Route path="/vendor-dashboard" element={<Navigate to="/en/vendor-dashboard" replace />} />
              <Route path="/maintenance-tasks" element={<Navigate to="/en/maintenance-tasks" replace />} />
              <Route path="/work-history" element={<Navigate to="/en/work-history" replace />} />
              <Route path="/vendor-chat" element={<Navigate to="/en/vendor-chat" replace />} />
              <Route path="/vendor-payment-history" element={<Navigate to="/en/vendor-payment-history" replace />} />
              <Route path="/settings" element={<Navigate to="/en/settings" replace />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* Catch-all route for 404 - must be last */}
              <Route path="/:lang/*" element={<LanguageRoute><NotFound /></LanguageRoute>} />
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
            </CurrencyProvider>
        </AccessControlProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
