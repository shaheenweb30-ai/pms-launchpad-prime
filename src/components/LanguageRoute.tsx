import { Navigate, useParams } from 'react-router-dom';
import { ReactNode } from 'react';

interface LanguageRouteProps {
  children: ReactNode;
}

/**
 * Component that validates language parameter and redirects if invalid
 */
export const LanguageRoute = ({ children }: LanguageRouteProps) => {
  const params = useParams<{ lang?: string }>();
  const lang = params.lang;

  // If no language prefix, redirect to English (default)
  if (!lang) {
    return <Navigate to="/en" replace />;
  }

  // If invalid language, redirect to English
  if (lang !== 'en' && lang !== 'ar') {
    return <Navigate to="/en" replace />;
  }

  return <>{children}</>;
};

