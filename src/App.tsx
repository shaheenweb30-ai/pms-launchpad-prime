import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AccessControlProvider } from "@/contexts/AccessControlContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLayout from "@/components/ProtectedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
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
import TenantLease from "./pages/TenantLease";
import TenantPayments from "./pages/TenantPayments";
import TenantRequests from "./pages/TenantRequests";
import NotFound from "./pages/NotFound";
import './lib/i18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();
  const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, profile, loading } = useAuth();
    if (loading) return <></>;
    if (user && profile) {
      const role = profile.role;
      const to = role === 'admin' ? '/admin-dashboard'
        : role === 'homeowner' ? '/dashboard'
        : role === 'tenant' ? '/tenant-dashboard'
        : role === 'vendor' ? '/vendor-dashboard'
        : '/';
      return <Navigate to={to} replace />;
    }
    return <>{children}</>;
  };

  // Initialize language from localStorage on app startup
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthRedirect><Index /></AuthRedirect>} />
        <Route path="/signin" element={<AuthRedirect><SignIn /></AuthRedirect>} />
        <Route path="/signup" element={<AuthRedirect><SignUp /></AuthRedirect>} />
        
        {/* Admin Routes - Admin Only */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin-panel" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedLayout>
                <AdminPanel />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin-access-control" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedLayout>
                <AdminAccessControl />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Property Owner Routes - Homeowner Only */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Analytics />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/leases" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Lease />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/properties" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Properties />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/tenants" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Tenants />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Chat />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/lease" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Lease />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        
        
        <Route 
          path="/rent-collection" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <RentCollection />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        
        
        <Route 
          path="/maintenance" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Maintenance />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        
        
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute allowedRoles={['homeowner']}>
              <ProtectedLayout>
                <Reports />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Tenant Routes - Tenant Only */}
        <Route 
          path="/tenant-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProtectedLayout>
                <TenantDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/my-lease" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProtectedLayout>
                <TenantLease />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/payment-history" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProtectedLayout>
                <TenantPayments />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/maintenance-requests" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProtectedLayout>
                <TenantRequests />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/tenant-maintenance" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProtectedLayout>
                <TenantMaintenance />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Vendor Routes - Vendor Only */}
        <Route 
          path="/vendor-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Shared Routes - All Authenticated Users */}
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'homeowner', 'tenant', 'vendor']}>
              <ProtectedLayout>
                <Settings />
              </ProtectedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Create Users Route (Temporary - No Auth Required) */}
        <Route path="/create-users" element={<CreateUsers />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </>
    ),
    { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
  );

    return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AccessControlProvider>
            <CurrencyProvider>
              <Toaster />
              <Sonner />
              <ErrorBoundary>
                <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
              </ErrorBoundary>
            </CurrencyProvider>
          </AccessControlProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
