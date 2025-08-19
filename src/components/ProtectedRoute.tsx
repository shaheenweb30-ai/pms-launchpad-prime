import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/signin' 
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute render:', { 
    user: user?.id, 
    profile: profile?.id, 
    loading, 
    requireAuth, 
    pathname: location.pathname,
    userEmail: user?.email,
    profileRole: profile?.role
  });

  // Show loading spinner while checking authentication
  if (loading) {
    console.log('Showing loading spinner...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ed1c24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    console.log('User not authenticated, redirecting to signin...');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authentication is not required and user is logged in, redirect to home
  if (!requireAuth && user) {
    console.log('User authenticated but not required, redirecting to home...');
    return <Navigate to="/" replace />;
  }

  // Render children if authentication requirements are met
  console.log('Rendering protected content...');
  return <>{children}</>;
};

export default ProtectedRoute;
