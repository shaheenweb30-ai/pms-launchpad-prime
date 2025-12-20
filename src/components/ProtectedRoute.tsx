import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const params = useParams<{ lang?: string }>();
  const lang = params.lang || 'en';

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
    return <Navigate to={`/${lang}/signin`} replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles && !allowedRoles.includes(profile.role || '')) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
