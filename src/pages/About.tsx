import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, X, Users, Target, Zap, Heart, Award, TrendingUp, Globe, Shield } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const About = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  const values = [
    {
      icon: Users,
      titleKey: "about.values.customerCentric",
      descriptionKey: "about.values.customerCentricDesc"
    },
    {
      icon: Zap,
      titleKey: "about.values.innovation",
      descriptionKey: "about.values.innovationDesc"
    },
    {
      icon: Heart,
      titleKey: "about.values.integrity",
      descriptionKey: "about.values.integrityDesc"
    },
    {
      icon: Target,
      titleKey: "about.values.excellence",
      descriptionKey: "about.values.excellenceDesc"
    }
  ];

  const stats = [
    { number: "10,000+", labelKey: "about.stats.properties" },
    { number: "50,000+", labelKey: "about.stats.users" },
    { number: "$2B+", labelKey: "about.stats.rent" },
    { number: "99.9%", labelKey: "about.stats.uptime" }
  ];

  const team = [
    {
      name: "Shaheen Eied Al Kadri",
      roleKey: "about.team.ceo",
      description: "Former property manager with 15+ years of experience"
    },
    {
      name: "Michael Chen",
      roleKey: "about.team.cto",
      description: "Tech veteran with expertise in scalable SaaS platforms"
    },
    {
      name: "Emily Rodriguez",
      roleKey: "about.team.headProduct",
      description: "Product strategist passionate about user experience"
    },
    {
      name: "David Kim",
      roleKey: "about.team.headSuccess",
      description: "Dedicated to ensuring every customer succeeds"
    }
  ];

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
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Free Trial
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
              {t('about.backToHome')}
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('about.pageTitle')}
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              {t('about.pageSubtitle')}
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-6 tracking-tight font-google-sans">{t('about.ourStory')}</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed font-light">
              <p>{t('about.ourStoryText1')}</p>
              <p>{t('about.ourStoryText2')}</p>
              <p>{t('about.ourStoryText3')}</p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-extralight text-black mb-2 font-google-sans">{stat.number}</div>
                  <div className="text-gray-500 font-light">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-20">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'} mb-6`}>
                <Target className="h-8 w-8 text-black" />
                <h2 className="text-3xl font-extralight text-black tracking-tight font-google-sans">{t('about.ourMission')}</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                {t('about.missionText')}
              </p>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-12 tracking-tight font-google-sans text-center">{t('about.ourValues')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-black mb-3">{t(value.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{t(value.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-12 tracking-tight font-google-sans text-center">{t('about.ourTeam')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <h3 className="text-xl font-light text-black mb-1">{member.name}</h3>
                  <p className="text-gray-500 font-light mb-3">{t(member.roleKey)}</p>
                  <p className="text-gray-600 leading-relaxed font-light text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="bg-black rounded-3xl p-8 md:p-12 text-white">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'} mb-6`}>
                <Award className="h-8 w-8" />
                <h2 className="text-3xl font-extralight tracking-tight font-google-sans">{t('about.whyChooseUsTitle')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <TrendingUp className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-light mb-2">{t('about.whyChooseUs.provenResults')}</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{t('about.whyChooseUs.provenResultsDesc')}</p>
                  </div>
                </div>
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <Globe className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-light mb-2">{t('about.whyChooseUs.globalReach')}</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{t('about.whyChooseUs.globalReachDesc')}</p>
                  </div>
                </div>
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <Zap className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-light mb-2">{t('about.whyChooseUs.innovation')}</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{t('about.whyChooseUs.innovationDesc')}</p>
                  </div>
                </div>
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-light mb-2">{t('about.whyChooseUs.security')}</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{t('about.whyChooseUs.securityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-extralight text-black mb-6 tracking-tight font-google-sans">{t('about.joinUs')}</h2>
            <p className="text-xl text-gray-500 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              {t('about.joinUsDesc')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to={getLocalizedPath('/signup')}>
                <Button className="px-8 py-6 rounded-full font-light text-lg">
                  {t('about.startFreeTrial')}
                </Button>
              </Link>
              <Link to={getLocalizedPath('/contact')}>
                <Button variant="outline" className="px-8 py-6 rounded-full font-light text-lg">
                  {t('about.contactUs')}
                </Button>
              </Link>
            </div>
          </section>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/">
              <Button className="w-full md:w-auto px-8 py-3 rounded-full font-light">
                Back to Home
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black font-medium text-lg">
                  P
                </div>
                <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
              </div>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                Modern property management software built for the next generation of property managers.
              </p>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors font-light">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors font-light">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors font-light">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors font-light">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors font-light">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors font-light">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors font-light">Help Center</Link></li>
                <li><a href="#faq" className="hover:text-white transition-colors font-light">FAQ</a></li>
                <li><Link to="/signin" className="hover:text-white transition-colors font-light">Sign In</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
                © 2024 PropertyFlow. All rights reserved.
              </div>
              
              <div className="flex space-x-8 text-gray-400 text-sm">
                <Link to="/privacy" className="hover:text-white transition-colors font-light">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors font-light">Terms of Service</Link>
                <Link to="/cookies" className="hover:text-white transition-colors font-light">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;

