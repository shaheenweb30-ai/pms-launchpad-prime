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
import CreateUsers from "./pages/CreateUsers";
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
              
              {/* Create Users Route (Temporary - No Auth Required, no language prefix) */}
              <Route path="/create-users" element={<CreateUsers />} />

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
              <Route path="*" element={<NotFound />} />
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
