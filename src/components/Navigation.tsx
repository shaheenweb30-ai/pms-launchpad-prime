import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PropertyFlow
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.features')}
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.benefits')}
              </a>
              <a href="/pricing" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.pricing')}
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.contact')}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm">
              {t('nav.signIn')}
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
              {t('nav.getDemo')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;