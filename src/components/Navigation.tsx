import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-[#a5afbe]/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <div className="w-8 h-8 sm:w-10 h-10 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-xl sm:rounded-2xl flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-sm sm:text-lg font-bold">PF</span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#231f20]">
                PropertyFlow
              </h1>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 sm:ml-8 lg:ml-10 flex items-baseline space-x-3 sm:space-x-4 lg:space-x-6">
              <a href="/#features" className="text-[#a5afbe] hover:text-[#ed1c24] px-2 sm:px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                {t('nav.features')}
              </a>
              <a href="/#benefits" className="text-[#a5afbe] hover:text-[#ed1c24] px-2 sm:px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                {t('nav.benefits')}
              </a>
              <a href="/#pricing" className="text-[#a5afbe] hover:text-[#ed1c24] px-2 sm:px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                {t('nav.pricing')}
              </a>
              <a href="#contact" className="text-[#a5afbe] hover:text-[#ed1c24] px-2 sm:px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                {t('nav.contact')}
              </a>
            </div>
          </div>
          
          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="rounded-full text-[#231f20] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 border-0 text-xs sm:text-sm">
              {t('nav.signIn')}
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full border-0 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm">
              {t('nav.getDemo')}
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 rounded-full text-[#231f20] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#a5afbe]/20 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/#features"
                className="block px-3 py-2 rounded-full text-base font-medium text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a
                href="/#benefits"
                className="block px-3 py-2 rounded-full text-base font-medium text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.benefits')}
              </a>
              <a
                href="/#pricing"
                className="block px-3 py-2 rounded-full text-base font-medium text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.pricing')}
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-full text-base font-medium text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 pb-2 space-y-2">
                <Button variant="ghost" className="w-full rounded-full text-[#231f20] hover:text-[#ed1c24] hover:bg-[#ed1c24]/5 border-0">
                  {t('nav.signIn')}
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  {t('nav.getDemo')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;