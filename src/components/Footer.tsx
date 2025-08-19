import { useTranslation } from 'react-i18next';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#231f20] text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 h-12 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4">
                <Building2 className="w-6 h-6 sm:w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                PropertyFlow
              </h3>
            </div>
            <p className="text-[#a5afbe] mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center text-[#a5afbe] text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 h-4 mr-2 sm:mr-3 text-[#ed1c24] flex-shrink-0" />
                <span>hello@propertyflow.com</span>
              </div>
              <div className="flex items-center text-[#a5afbe] text-xs sm:text-sm">
                <Phone className="w-3 h-3 sm:w-4 h-4 mr-2 sm:mr-3 text-[#ed1c24] flex-shrink-0" />
                <span>1-800-PROPERTY</span>
              </div>
              <div className="flex items-center text-[#a5afbe] text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 h-4 mr-2 sm:mr-3 text-[#ed1c24] flex-shrink-0" />
                <span>123 Property St, Business District</span>
              </div>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">{t('footer.product')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#features" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Features</a></li>
              <li><a href="/benefits" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Benefits</a></li>
              <li><a href="/pricing" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Pricing</a></li>
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Security</a></li>
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Integrations</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">{t('footer.support')}</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Help Center</a></li>
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Documentation</a></li>
              <li><a href="#contact" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Contact Us</a></li>
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">Status Page</a></li>
              <li><a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-xs sm:text-sm">API Reference</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-[#2a2627] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-12 sm:mb-14 lg:mb-16">
          <div className="text-center">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3">
              Stay Updated
            </h4>
            <p className="text-[#a5afbe] mb-4 sm:mb-6 max-w-md mx-auto text-xs sm:text-sm px-4">
              Get the latest property management insights and product updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-[#a5afbe]/30 bg-[#231f20] text-white placeholder-[#a5afbe] focus:outline-none focus:border-[#ed1c24] focus:ring-1 focus:ring-[#ed1c24] text-xs sm:text-sm"
              />
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white font-semibold rounded-full hover:from-[#d41920] hover:to-[#1e4f9a] transition-all duration-300 text-xs sm:text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-[#2a2627] pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#a5afbe] text-xs sm:text-sm text-center sm:text-left">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-3 sm:mt-0">
            <a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] text-xs sm:text-sm transition-colors duration-300">{t('footer.privacy')}</a>
            <a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] text-xs sm:text-sm transition-colors duration-300">{t('footer.terms')}</a>
            <a href="#" className="text-[#a5afbe] hover:text-[#ed1c24] text-xs sm:text-sm transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;