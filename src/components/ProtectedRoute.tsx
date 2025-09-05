import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!user || !profile) {
    return <Navigate to="/signin" replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles && !allowedRoles.includes(profile.role || '')) {
    const role = profile.role;
    const fallback = role === 'admin' ? '/admin-dashboard'
      : role === 'homeowner' ? '/dashboard'
      : role === 'tenant' ? '/tenant-dashboard'
      : role === 'vendor' ? '/vendor-dashboard'
      : '/';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
