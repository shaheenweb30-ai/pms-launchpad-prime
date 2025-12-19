import { Link, LinkProps } from 'react-router-dom';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
}

/**
 * Language-aware Link component that automatically adds language prefix to paths
 */
export const LocalizedLink = ({ to, ...props }: LocalizedLinkProps) => {
  const { getLocalizedPath } = useLanguageNavigation();
  const localizedTo = getLocalizedPath(to);
  
  return <Link to={localizedTo} {...props} />;
};

