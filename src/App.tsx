import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLayout from "@/components/ProtectedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Benefits from "./pages/Benefits";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GetDemo from "./pages/GetDemo";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Lease from "./pages/Lease";
import Applications from "./pages/Applications";
import RentCollection from "./pages/RentCollection";
import Expenses from "./pages/Expenses";
import Inspections from "./pages/Inspections";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Financials from "./pages/Financials";
import Maintenance from "./pages/Maintenance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import './lib/i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/demo" element={<GetDemo />} />
              
              {/* Protected Homeowner Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Dashboard />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Analytics />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leases" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Lease />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/applications" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Applications />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rent-collection" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <RentCollection />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/expenses" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Expenses />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inspections" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Inspections />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/documents" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Documents />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Reports />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/properties" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Properties />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tenants" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Tenants />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/financials" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Financials />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/maintenance" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin']}>
                    <ProtectedLayout>
                      <Maintenance />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute allowedRoles={['homeowner', 'admin', 'tenant', 'vendor']}>
                    <ProtectedLayout>
                      <Settings />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
