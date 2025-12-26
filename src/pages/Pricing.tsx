import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, X, Check, ArrowRight, Zap, Shield, Headphones, BarChart3 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import { useTranslation } from 'react-i18next';

interface PricingPlan {
  id: string;
  name: string;
  monthly_price: number;
  annual_price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  is_active: boolean;
  display_order: number;
}

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const getFallbackPlans = (): PricingPlan[] => [
    {
      id: '1',
      name: "Starter",
      monthly_price: 29,
      annual_price: 290,
      period: "per month",
      description: "Perfect for individual landlords",
      features: [
        "Up to 5 properties",
        "Basic tenant management",
        "Online rent collection",
        "Mobile app access",
        "Email support"
      ],
      popular: false,
      is_active: true,
      display_order: 1
    },
    {
      id: '2',
      name: "Professional",
      monthly_price: 79,
      annual_price: 790,
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
      popular: true,
      is_active: true,
      display_order: 2
    },
    {
      id: '3',
      name: "Enterprise",
      monthly_price: 199,
      annual_price: 1990,
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
      popular: false,
      is_active: true,
      display_order: 3
    }
  ];

  const loadPricingPlans = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading pricing plans for public page...');
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('⏱️ Pricing plans query timeout, using fallback plans');
        setLoading(false);
        const fallback = getFallbackPlans();
        console.log('📦 Setting fallback plans:', fallback);
        setPricingPlans(fallback);
      }, 8000);
      
      const { data, error } = await (supabase as any)
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      clearTimeout(timeoutId);

      console.log('📊 Query result:', { 
        data, 
        error, 
        dataLength: data?.length,
        errorCode: error?.code,
        errorMessage: error?.message 
      });

      if (error) {
        console.error('❌ Supabase error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        // Don't throw - use fallback instead
        console.log('📦 Using fallback due to error');
        setPricingPlans(getFallbackPlans());
        setLoading(false);
        return;
      }
      
      const plansData = data || [];
      console.log(`✅ Loaded ${plansData.length} pricing plan(s) from database`);
      console.log('📋 Raw plans data:', plansData);
      
      // Transform features from JSONB to array if needed
      const transformedPlans = plansData.map((plan: any) => {
        let features = [];
        if (Array.isArray(plan.features)) {
          features = plan.features;
        } else if (typeof plan.features === 'string') {
          try {
            features = JSON.parse(plan.features);
          } catch (e) {
            console.warn('Failed to parse features as JSON:', plan.features);
            features = [];
          }
        }
        
        return {
          ...plan,
          features: features
        };
      });
      
      console.log('📦 Transformed plans:', transformedPlans);
      console.log('📦 Plans count:', transformedPlans.length);
      
      // Use fallback if no plans found
      if (transformedPlans.length === 0) {
        console.warn('⚠️ No pricing plans found, using fallback');
        const fallback = getFallbackPlans();
        setPricingPlans(fallback);
      } else {
        console.log('✅ Setting pricing plans:', transformedPlans);
        setPricingPlans(transformedPlans);
      }
    } catch (error: any) {
      console.error('❌ Error loading pricing plans:', error);
      console.error('Error stack:', error.stack);
      // Fallback to default plans if database fails
      console.log('📦 Using fallback pricing plans due to exception');
      setPricingPlans(getFallbackPlans());
    } finally {
      setLoading(false);
      console.log('✅ Loading complete, pricingPlans state:', pricingPlans.length);
    }
  };

  const benefits = [
    {
      icon: Zap,
      titleKey: "pricing.benefits.trial",
      descriptionKey: "pricing.benefits.trialDesc"
    },
    {
      icon: Shield,
      titleKey: "pricing.benefits.cancel",
      descriptionKey: "pricing.benefits.cancelDesc"
    },
    {
      icon: Headphones,
      titleKey: "pricing.benefits.support",
      descriptionKey: "pricing.benefits.supportDesc"
    },
    {
      icon: BarChart3,
      titleKey: "pricing.benefits.updates",
      descriptionKey: "pricing.benefits.updatesDesc"
    }
  ];

  const faqs = [
    {
      questionKey: "pricing.faqs.faq1.question",
      answerKey: "pricing.faqs.faq1.answer"
    },
    {
      questionKey: "pricing.faqs.faq2.question",
      answerKey: "pricing.faqs.faq2.answer"
    },
    {
      questionKey: "pricing.faqs.faq3.question",
      answerKey: "pricing.faqs.faq3.answer"
    },
    {
      questionKey: "pricing.faqs.faq4.question",
      answerKey: "pricing.faqs.faq4.answer"
    },
    {
      questionKey: "pricing.faqs.faq5.question",
      answerKey: "pricing.faqs.faq5.answer"
    },
    {
      questionKey: "pricing.faqs.faq6.question",
      answerKey: "pricing.faqs.faq6.answer"
    }
  ];

  const getPrice = (plan: PricingPlan) => {
    const price = billingPeriod === 'annual' ? plan.annual_price : plan.monthly_price;
    return price.toFixed(0);
  };

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
        <div className="max-w-6xl mx-auto px-6">
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
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              {t('pricing.subtitle')}
            </p>

            {/* Billing Toggle */}
            <div className={`flex items-center justify-center gap-4 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm font-light ${billingPeriod === 'monthly' ? 'text-black' : 'text-gray-400'}`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  billingPeriod === 'annual' ? 'bg-black' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`absolute top-1 ${isRTL ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full transition-transform ${
                    billingPeriod === 'annual' ? (isRTL ? '-translate-x-7' : 'translate-x-7') : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-light ${billingPeriod === 'annual' ? 'text-black' : 'text-gray-400'}`}>
                {t('pricing.annually')}
                <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-xs text-green-600`}>{t('pricing.save')} 17%</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-500 font-light">{t('pricing.loading')}</p>
              </div>
            </div>
          ) : pricingPlans.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-gray-500 font-light">No pricing plans available at this time.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {pricingPlans.map((plan, index) => {
                // Ensure features is always an array
                const planFeatures = Array.isArray(plan.features) 
                  ? plan.features 
                  : (typeof plan.features === 'string' 
                      ? (() => {
                          try {
                            return JSON.parse(plan.features);
                          } catch {
                            return [];
                          }
                        })()
                      : []);
                
                return (
              <div 
                key={index} 
                className={`relative bg-white rounded-3xl p-8 border transition-all duration-200 ${
                  plan.popular 
                    ? 'border-black shadow-lg scale-105' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className={`absolute -top-4 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} bg-black text-white px-4 py-1 rounded-full text-sm font-light`}>
                    {t('pricing.mostPopular')}
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-black mb-4">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-extralight text-black">{getPrice(plan)}</span>
                    <span className="text-gray-500 font-light">/{billingPeriod === 'annual' ? t('pricing.perYear') : t('pricing.perMonth')}</span>
                  </div>
                  {billingPeriod === 'annual' && (
                    <p className="text-sm text-gray-500 font-light mt-1">
                      {t('pricing.billedAnnually')}
                    </p>
                  )}
                  <p className="text-gray-500 font-light mt-4">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {planFeatures.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-600 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={getLocalizedPath('/signup')}>
                  <Button className={`w-full py-3 rounded-full font-light ${
                    plan.popular 
                      ? 'bg-black hover:bg-gray-800 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-black'
                  }`}>
                    {t('pricing.getStarted')}
                  </Button>
                </Link>
              </div>
              );
              })}
            </div>
          )}

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-12 tracking-tight font-google-sans text-center">
              {t('pricing.benefits')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 text-center">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-light text-black mb-2">{t(benefit.titleKey)}</h3>
                  <p className="text-gray-600 font-light text-sm">{t(benefit.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-4 tracking-tight font-google-sans text-center">
              {t('pricing.faqs')}
            </h2>
            <p className="text-gray-500 text-center mb-12 font-light">{t('pricing.faqs.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 border border-gray-100">
                  <h3 className="text-lg font-light text-black mb-3">{t(faq.questionKey)}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{t(faq.answerKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 text-center">
            <h2 className="text-3xl font-extralight text-black mb-4 tracking-tight font-google-sans">
              {t('pricing.readyToStart')}
            </h2>
            <p className="text-xl text-gray-500 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              {t('pricing.ctaDescription')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to={getLocalizedPath('/signup')}>
                <Button className={`px-8 py-6 rounded-full font-light text-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('pricing.getStarted')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link to={getLocalizedPath('/contact')}>
                <Button variant="outline" className="px-8 py-6 rounded-full font-light text-lg">
                  {t('pricing.contactSales')}
                </Button>
              </Link>
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

export default Pricing;

