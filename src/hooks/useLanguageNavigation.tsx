import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * Hook to handle language-aware navigation
 * Extracts language from URL and provides utilities for language-aware routing
 */
export const useLanguageNavigation = () => {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const currentLang = params.lang || 'en';
  const isValidLang = currentLang === 'en' || currentLang === 'ar';
  const lang = isValidLang ? currentLang : 'en';

  // Update i18n and document when language changes
  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      localStorage.setItem('preferredLanguage', lang);
    }
  }, [lang, i18n]);

  /**
   * Get the path with language prefix
   */
  const getLocalizedPath = (path: string, targetLang?: string): string => {
    const target = targetLang || lang;
    // Remove leading slash and any existing language prefix
    const cleanPath = path.replace(/^\//, '').replace(/^(en|ar)\//, '');
    
    // Always add language prefix, including for root path
    if (cleanPath === '') {
      return `/${target}`;
    }
    
    return `/${target}/${cleanPath}`;
  };

  /**
   * Navigate to a path with current language
   */
  const navigateTo = (path: string, targetLang?: string) => {
    const localizedPath = getLocalizedPath(path, targetLang);
    navigate(localizedPath);
  };

  /**
   * Switch language while staying on the same page
   */
  const switchLanguage = (newLang: string) => {
    if (newLang === lang) return;
    
    // Get current path without language prefix
    const currentPath = location.pathname.replace(/^\/(en|ar)/, '') || '/';
    const newPath = getLocalizedPath(currentPath, newLang);
    navigate(newPath);
  };

  return {
    lang,
    getLocalizedPath,
    navigateTo,
    switchLanguage,
    currentPath: location.pathname,
  };
};

