import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import { 
  Building2, 
  Users, 
  Wrench, 
  CreditCard, 
  BarChart3, 
  ArrowRight, 
  FileText,
  Eye,
  Calendar,
  DollarSign,
  Receipt,
  Home,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
  Download,
  Plus,
  Menu,
  X,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';

const Index = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isButtonScrolling = useRef(false);
  const isRTL = i18n.language === 'ar';

  // Handle infinite loop when reaching the end of scroll
  useEffect(() => {
    const container = testimonialsRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Skip if button is controlling the scroll
      if (isButtonScrolling.current) {
        isButtonScrolling.current = false;
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const threshold = 10; // pixels from edge

      // If scrolled to the end, loop back to beginning
      if (scrollLeft + clientWidth >= scrollWidth - threshold) {
        container.scrollLeft = 0;
      }
      // If scrolled to the beginning (from second set), loop to end of first set
      else if (scrollLeft <= threshold && scrollLeft > 0) {
        const singleSetWidth = scrollWidth / 2;
        container.scrollLeft = singleSetWidth - clientWidth;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Building2,
      titleKey: "features.portfolio.title",
      descriptionKey: "features.portfolio.description"
    },
    {
      icon: Users,
      titleKey: "features.tenant.title",
      descriptionKey: "features.tenant.description"
    },
    {
      icon: CreditCard,
      titleKey: "features.payments.title",
      descriptionKey: "features.payments.description"
    },
    {
      icon: Wrench,
      titleKey: "features.maintenance.title",
      descriptionKey: "features.maintenance.description"
    },
    {
      icon: BarChart3,
      titleKey: "features.analytics.title",
      descriptionKey: "features.analytics.description"
    },
    {
      icon: FileText,
      titleKey: "sidebar.documents",
      descriptionKey: "features.document.description"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for individual landlords",
      features: [
        "Up to 5 properties",
        "Basic tenant management",
        "Online rent collection",
        "Mobile app access",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month", 
      description: "Ideal for growing portfolios",
      features: [
        "Up to 25 properties",
        "Advanced tenant screening",
        "Maintenance management",
        "Financial reporting",
        "Priority support",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large property managers",
      features: [
        "Unlimited properties",
        "Custom integrations",
        "Advanced analytics",
        "White-label options",
        "Dedicated support",
        "Custom training"
      ],
      popular: false
    }
  ];

  const howItWorksSteps = [
    {
      step: "1",
      titleKey: "homepage.howItWorks.step1.title",
      descriptionKey: "homepage.howItWorks.step1.description"
    },
    {
      step: "2", 
      titleKey: "homepage.howItWorks.step2.title",
      descriptionKey: "homepage.howItWorks.step2.description"
    },
    {
      step: "3",
      titleKey: "homepage.howItWorks.step3.title",
      descriptionKey: "homepage.howItWorks.step3.description"
    },
    {
      step: "4",
      titleKey: "homepage.howItWorks.step4.title",
      descriptionKey: "homepage.howItWorks.step4.description"
    }
  ];

  const testimonials = [
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial1.quote",
      avatar: "SM",
      nameKey: "homepage.testimonials.testimonial1.name",
      roleKey: "homepage.testimonials.testimonial1.role",
      companyKey: "homepage.testimonials.testimonial1.company"
    },
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial2.quote",
      avatar: "JD",
      nameKey: "homepage.testimonials.testimonial2.name",
      roleKey: "homepage.testimonials.testimonial2.role",
      companyKey: "homepage.testimonials.testimonial2.company"
    },
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial3.quote",
      avatar: "EM",
      nameKey: "homepage.testimonials.testimonial3.name",
      roleKey: "homepage.testimonials.testimonial3.role",
      companyKey: "homepage.testimonials.testimonial3.company"
    },
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial4.quote",
      avatar: "RK",
      nameKey: "homepage.testimonials.testimonial4.name",
      roleKey: "homepage.testimonials.testimonial4.role",
      companyKey: "homepage.testimonials.testimonial4.company"
    },
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial5.quote",
      avatar: "LP",
      nameKey: "homepage.testimonials.testimonial5.name",
      roleKey: "homepage.testimonials.testimonial5.role",
      companyKey: "homepage.testimonials.testimonial5.company"
    },
    {
      rating: 5,
      quoteKey: "homepage.testimonials.testimonial6.quote",
      avatar: "MC",
      nameKey: "homepage.testimonials.testimonial6.name",
      roleKey: "homepage.testimonials.testimonial6.role",
      companyKey: "homepage.testimonials.testimonial6.company"
    }
  ];

  const faqs = [
    {
      questionKey: "homepage.faq.faq1.question",
      answerKey: "homepage.faq.faq1.answer"
    },
    {
      questionKey: "homepage.faq.faq2.question",
      answerKey: "homepage.faq.faq2.answer"
    },
    {
      questionKey: "homepage.faq.faq3.question",
      answerKey: "homepage.faq.faq3.answer"
    },
    {
      questionKey: "homepage.faq.faq4.question",
      answerKey: "homepage.faq.faq4.answer"
    },
    {
      questionKey: "homepage.faq.faq5.question",
      answerKey: "homepage.faq.faq5.answer"
    },
    {
      questionKey: "homepage.faq.faq6.question",
      answerKey: "homepage.faq.faq6.answer"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
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

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gray-50 text-gray-600 text-sm font-light mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`w-2 h-2 bg-green-500 rounded-full ${isRTL ? 'ml-2' : 'mr-2'}`}></div>
            {t('homepage.trusted')}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extralight text-black mb-8 leading-tight tracking-tight font-google-sans">
            {t('homepage.hero.title')}
            <br />
            <span className="font-light">{t('homepage.hero.subtitle')}</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {t('homepage.hero.description')}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to={getLocalizedPath('/signup')}>
              <Button size="lg" className={`px-8 py-4 text-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('homepage.hero.startTrial')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className={`text-gray-500 hover:text-black px-8 py-4 text-lg font-light ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Play className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('homepage.hero.watchDemo')}
            </Button>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400 font-light">{t('homepage.hero.dashboardPreview')}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="text-sm font-light text-gray-600">{t('homepage.hero.properties')}</div>
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">24</div>
                  <div className="text-sm text-gray-400 font-light">{t('homepage.hero.active')}</div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="text-sm font-light text-gray-600">{t('homepage.hero.revenue')}</div>
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">$48.5k</div>
                  <div className="text-sm text-gray-400 font-light">{t('homepage.hero.monthly')}</div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="text-sm font-light text-gray-600">{t('homepage.hero.tenants')}</div>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">89</div>
                  <div className="text-sm text-gray-400 font-light">{t('homepage.hero.rate')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('homepage.features.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('homepage.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-light text-black mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('homepage.pricing.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('homepage.pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-8 border transition-all duration-200 ${plan.popular ? 'border-black shadow-lg scale-105' : 'border-gray-100 hover:border-gray-200'}`}>
                {plan.popular && (
                  <div className={`absolute -top-4 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} bg-black text-white px-4 py-1 rounded-full text-sm font-light`}>
                    {t('homepage.pricing.mostPopular')}
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-black mb-4">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-extralight text-black">{plan.price}</span>
                    <span className="text-gray-500 font-light">/{plan.period}</span>
                  </div>
                  <p className="text-gray-500 font-light">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-600 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={getLocalizedPath('/signup')}>
                  <Button className={`w-full py-3 rounded-full font-light ${plan.popular ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}>
                    {t('homepage.pricing.startTrial')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('homepage.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('homepage.howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-6' : 'space-x-6'}`}>
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-light flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-light text-black mb-3">{t(step.titleKey)}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{t(step.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('homepage.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              {t('homepage.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="relative px-8 md:px-12">
            {/* Left Arrow Button */}
            <button
              onClick={() => {
                const container = testimonialsRef.current;
                if (!container) return;
                
                isButtonScrolling.current = true;
                
                const card = container.querySelector('.testimonial-card') as HTMLElement;
                if (!card) return;
                
                const cardWidth = card.offsetWidth;
                const gap = 32; // gap-8 = 2rem = 32px
                const scrollAmount = (cardWidth + gap) * 3;
                const { scrollLeft, scrollWidth, clientWidth } = container;
                
                // If we're at the start, jump to end first
                if (scrollLeft <= 10) {
                  container.scrollLeft = scrollWidth - clientWidth;
                  requestAnimationFrame(() => {
                    container.scrollBy({
                      left: isRTL ? scrollAmount : -scrollAmount,
                      behavior: 'smooth'
                    });
                  });
                } else {
                  container.scrollBy({
                    left: isRTL ? scrollAmount : -scrollAmount,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 hover:shadow-xl active:scale-95`}
              aria-label={isRTL ? "Scroll right" : "Scroll left"}
            >
              {isRTL ? <ChevronRight className="h-6 w-6 text-gray-600" /> : <ChevronLeft className="h-6 w-6 text-gray-600" />}
            </button>

            {/* Scrollable Container */}
            <div
              ref={testimonialsRef}
              className={`flex gap-8 overflow-x-hidden scroll-smooth scrollbar-hide snap-x snap-mandatory ${isRTL ? 'flex-row-reverse' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={`${index}-${testimonial.avatar}`}
                  className="testimonial-card flex-shrink-0 w-full md:w-[calc((100%-4rem)/3)] snap-start bg-white rounded-3xl p-8 border-0 shadow-sm"
                >
                  <blockquote className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
                    "{t(testimonial.quoteKey)}"
                  </blockquote>
                  
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-light ${isRTL ? 'ml-4' : 'mr-4'}`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-light text-black">{t(testimonial.nameKey)}</div>
                      <div className="text-sm text-gray-500 font-light">{t(testimonial.roleKey)}, {t(testimonial.companyKey)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => {
                const container = testimonialsRef.current;
                if (!container) return;
                
                isButtonScrolling.current = true;
                
                const card = container.querySelector('.testimonial-card') as HTMLElement;
                if (!card) return;
                
                const cardWidth = card.offsetWidth;
                const gap = 32; // gap-8 = 2rem = 32px
                const scrollAmount = (cardWidth + gap) * 3;
                const { scrollLeft, scrollWidth, clientWidth } = container;
                
                // If we're at the end, loop back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                  container.scrollLeft = 0;
                  requestAnimationFrame(() => {
                    container.scrollBy({
                      left: isRTL ? -scrollAmount : scrollAmount,
                      behavior: 'smooth'
                    });
                  });
                } else {
                  container.scrollBy({
                    left: isRTL ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 hover:shadow-xl active:scale-95`}
              aria-label={isRTL ? "Scroll left" : "Scroll right"}
            >
              {isRTL ? <ChevronLeft className="h-6 w-6 text-gray-600" /> : <ChevronRight className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('homepage.faq.title')}
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              {t('homepage.faq.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <button 
                  className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-lg font-light text-black ${isRTL ? 'pl-4' : 'pr-4'}`}>{t(faq.questionKey)}</h3>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 mt-1 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed font-light">{t(faq.answerKey)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {t('homepage.footer.description')}
              </p>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">{t('homepage.footer.product')}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors font-light">{t('homepage.footer.features')}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors font-light">{t('homepage.footer.pricing')}</a></li>
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
                <li><a href="#faq" className="hover:text-white transition-colors font-light">{t('homepage.footer.faq')}</a></li>
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

export default Index;