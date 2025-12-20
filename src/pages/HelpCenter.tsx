import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Menu, X, Search, ChevronDown, BookOpen, MessageCircle, Video, FileText, HelpCircle, Mail, Phone } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const HelpCenter = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isRTL = i18n.language === 'ar';

  const categories = [
    {
      icon: BookOpen,
      titleKey: "helpCenter.categories.gettingStarted.title",
      descriptionKey: "helpCenter.categories.gettingStarted.description",
      articles: 12
    },
    {
      icon: FileText,
      titleKey: "helpCenter.categories.accountBilling.title",
      descriptionKey: "helpCenter.categories.accountBilling.description",
      articles: 8
    },
    {
      icon: HelpCircle,
      titleKey: "helpCenter.categories.propertyManagement.title",
      descriptionKey: "helpCenter.categories.propertyManagement.description",
      articles: 15
    },
    {
      icon: MessageCircle,
      titleKey: "helpCenter.categories.paymentsFinances.title",
      descriptionKey: "helpCenter.categories.paymentsFinances.description",
      articles: 10
    },
    {
      icon: Video,
      titleKey: "helpCenter.categories.maintenanceRepairs.title",
      descriptionKey: "helpCenter.categories.maintenanceRepairs.description",
      articles: 9
    }
  ];

  const faqs = [
    {
      categoryKey: "helpCenter.categories.gettingStarted.title",
      questionKey: "helpCenter.faqs.gettingStarted.q1.question",
      answerKey: "helpCenter.faqs.gettingStarted.q1.answer"
    },
    {
      categoryKey: "helpCenter.categories.gettingStarted.title",
      questionKey: "helpCenter.faqs.gettingStarted.q2.question",
      answerKey: "helpCenter.faqs.gettingStarted.q2.answer"
    },
    {
      categoryKey: "helpCenter.categories.accountBilling.title",
      questionKey: "helpCenter.faqs.accountBilling.q1.question",
      answerKey: "helpCenter.faqs.accountBilling.q1.answer"
    },
    {
      categoryKey: "helpCenter.categories.accountBilling.title",
      questionKey: "helpCenter.faqs.accountBilling.q2.question",
      answerKey: "helpCenter.faqs.accountBilling.q2.answer"
    },
    {
      categoryKey: "helpCenter.categories.propertyManagement.title",
      questionKey: "helpCenter.faqs.propertyManagement.q1.question",
      answerKey: "helpCenter.faqs.propertyManagement.q1.answer"
    },
    {
      categoryKey: "helpCenter.categories.propertyManagement.title",
      questionKey: "helpCenter.faqs.propertyManagement.q2.question",
      answerKey: "helpCenter.faqs.propertyManagement.q2.answer"
    },
    {
      categoryKey: "helpCenter.categories.paymentsFinances.title",
      questionKey: "helpCenter.faqs.paymentsFinances.q1.question",
      answerKey: "helpCenter.faqs.paymentsFinances.q1.answer"
    },
    {
      categoryKey: "helpCenter.categories.paymentsFinances.title",
      questionKey: "helpCenter.faqs.paymentsFinances.q2.question",
      answerKey: "helpCenter.faqs.paymentsFinances.q2.answer"
    },
    {
      categoryKey: "helpCenter.categories.maintenanceRepairs.title",
      questionKey: "helpCenter.faqs.maintenanceRepairs.q1.question",
      answerKey: "helpCenter.faqs.maintenanceRepairs.q1.answer"
    },
    {
      categoryKey: "helpCenter.categories.maintenanceRepairs.title",
      questionKey: "helpCenter.faqs.maintenanceRepairs.q2.question",
      answerKey: "helpCenter.faqs.maintenanceRepairs.q2.answer"
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => {
        const question = t(faq.questionKey).toLowerCase();
        const answer = t(faq.answerKey).toLowerCase();
        const query = searchQuery.toLowerCase();
        return question.includes(query) || answer.includes(query);
      })
    : faqs;

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={getLocalizedPath('/')} className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3 order-3' : 'space-x-3'}`}>
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white font-medium text-lg">
                P
              </div>
              <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-12 order-2' : 'space-x-12'}`}>
              <Link to={getLocalizedPath('/about')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.about')}</Link>
              <Link to={getLocalizedPath('/pricing')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.pricing')}</Link>
              <Link to={getLocalizedPath('/careers')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.careers')}</Link>
              <Link to={getLocalizedPath('/blog')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.blog')}</Link>
              <Link to={getLocalizedPath('/contact')} className="text-gray-500 hover:text-black transition-colors font-light">{t('homepage.footer.contact')}</Link>
            </nav>

            {/* Auth Buttons */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-6 order-1' : 'space-x-6'}`}>
              <LanguageSwitcher />
              <Link to={getLocalizedPath('/signin')}>
                <Button variant="ghost" className="text-gray-500 hover:text-black font-light">
                  {t('homepage.footer.signIn')}
                </Button>
              </Link>
              <Link to={getLocalizedPath('/signup')}>
                <Button className="px-6">
                  {t('homepage.hero.startTrial')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link to={getLocalizedPath('/about')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.about')}</Link>
                <Link to={getLocalizedPath('/pricing')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.pricing')}</Link>
                <Link to={getLocalizedPath('/careers')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.careers')}</Link>
                <Link to={getLocalizedPath('/blog')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.blog')}</Link>
                <Link to={getLocalizedPath('/contact')} className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>{t('homepage.footer.contact')}</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                  <Link to={getLocalizedPath('/signin')} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className={`w-full ${isRTL ? 'justify-end' : 'justify-start'} text-gray-600 hover:text-gray-900`}>
                      {t('homepage.footer.signIn')}
                    </Button>
                  </Link>
                  <Link to={getLocalizedPath('/signup')} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {t('homepage.hero.startTrial')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <Link to={getLocalizedPath('/')}>
            <Button 
              variant="ghost" 
              className={`mb-8 text-gray-500 hover:text-black font-light ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {t('pricing.backToHome')}
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('helpCenter.hero.title')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              {t('helpCenter.hero.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className={`max-w-2xl mx-auto relative ${isRTL ? 'rtl' : 'ltr'}`}>
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
              <Input
                type="text"
                placeholder={t('helpCenter.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-6 rounded-full font-light text-lg`}
              />
            </div>
          </div>

          {/* Categories */}
          {!searchQuery && (
            <section className="mb-16">
              <h2 className="text-2xl font-light text-black mb-8">{t('helpCenter.categories.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-light text-black mb-2">{t(category.titleKey)}</h3>
                    <p className="text-gray-600 font-light text-sm mb-3">{t(category.descriptionKey)}</p>
                    <p className="text-gray-500 font-light text-xs">{category.articles} {t('helpCenter.articles')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-light text-black mb-8">
              {searchQuery ? t('helpCenter.searchResults', { count: filteredFaqs.length }) : t('helpCenter.faqs.title')}
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-light">{t('helpCenter.noResults', { query: searchQuery })}</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 font-light"
                  onClick={() => setSearchQuery('')}
                >
                  {t('helpCenter.clearSearch')}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                    <button 
                      className={`w-full ${isRTL ? 'text-right' : 'text-left'} p-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between hover:bg-gray-50 transition-colors`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className="flex-1">
                        <div className={`text-xs text-gray-500 font-light mb-1 ${isRTL ? 'text-right' : ''}`}>{t(faq.categoryKey)}</div>
                        <h3 className={`text-lg font-light text-black ${isRTL ? 'text-right' : ''}`}>{t(faq.questionKey)}</h3>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${isRTL ? 'mr-4' : 'ml-4'} ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className={`px-6 pb-6 ${isRTL ? 'text-right' : ''}`}>
                        <p className="text-gray-600 leading-relaxed font-light">{t(faq.answerKey)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Still Need Help? */}
          <section className="mt-16">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
              <h3 className="text-2xl font-light text-black mb-4">{t('helpCenter.stillNeedHelp.title')}</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 max-w-2xl mx-auto">
                {t('helpCenter.stillNeedHelp.subtitle')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link to={getLocalizedPath('/contact')}>
                  <Button variant="outline" className={`rounded-full font-light px-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('helpCenter.stillNeedHelp.contactSupport')}
                  </Button>
                </Link>
                <a href="mailto:support@propertyflow.com">
                  <Button className={`rounded-full font-light px-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('helpCenter.stillNeedHelp.emailUs')}
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to={getLocalizedPath('/')}>
              <Button className={`w-full md:w-auto px-8 py-3 rounded-full font-light ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('pricing.backToHome')}
                <ArrowLeft className={`h-4 w-4 rotate-180 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'} mb-6`}>
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black font-medium text-lg">
                  P
                </div>
                <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
              </div>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                {t('homepage.footer.description')}
              </p>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.product')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors font-light">{t('homepage.footer.features')}</a></li>
                <li><Link to={getLocalizedPath('/pricing')} className="hover:text-white transition-colors font-light">{t('homepage.footer.pricing')}</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors font-light">{t('homepage.footer.howItWorks')}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.company')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to={getLocalizedPath('/about')} className="hover:text-white transition-colors font-light">{t('homepage.footer.about')}</Link></li>
                <li><Link to={getLocalizedPath('/blog')} className="hover:text-white transition-colors font-light">{t('homepage.footer.blog')}</Link></li>
                <li><Link to={getLocalizedPath('/careers')} className="hover:text-white transition-colors font-light">{t('homepage.footer.careers')}</Link></li>
                <li><Link to={getLocalizedPath('/contact')} className="hover:text-white transition-colors font-light">{t('homepage.footer.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.support')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to={getLocalizedPath('/help')} className="hover:text-white transition-colors font-light">{t('homepage.footer.helpCenter')}</Link></li>
                <li><a href="#faq" className="hover:text-white transition-colors font-light">{t('homepage.faq.title')}</a></li>
                <li><Link to={getLocalizedPath('/signin')} className="hover:text-white transition-colors font-light">{t('homepage.footer.signIn')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
                {t('homepage.footer.copyright')}
              </div>
              
              <div className={`flex ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'} text-gray-400 text-sm`}>
                <Link to={getLocalizedPath('/privacy')} className="hover:text-white transition-colors font-light">{t('homepage.footer.privacy')}</Link>
                <Link to={getLocalizedPath('/terms')} className="hover:text-white transition-colors font-light">{t('homepage.footer.terms')}</Link>
                <Link to={getLocalizedPath('/cookies')} className="hover:text-white transition-colors font-light">{t('homepage.footer.cookies')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;

