import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Menu, X, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      toast({
        title: t('contact.failedToSend'),
        description: t('contact.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@propertyflow.com",
      link: "mailto:hello@propertyflow.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Property Street, San Francisco, CA 94105",
      link: null
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
              {t('contact.getInTouch')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-light text-black mb-8">{t('contact.contactInfo')}</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse space-x-4' : 'space-x-4'}`}>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-gray-500 mb-1">{t(info.titleKey)}</h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-black font-light hover:text-gray-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-black font-light">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="mt-12 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <h3 className="text-lg font-light text-black mb-4">{t('contact.officeHours')}</h3>
                <div className="space-y-2 text-gray-600 font-light text-sm">
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between`}>
                    <span>{t('contact.officeHours.weekdays')}</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between`}>
                    <span>{t('contact.officeHours.saturday')}</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between`}>
                    <span>{t('contact.officeHours.sunday')}</span>
                    <span>{t('contact.officeHours.closed')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-light text-black mb-2">{t('contact.messageSent')}</h3>
                    <p className="text-gray-600 font-light">
                      {t('contact.thankYou')}
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-light text-black mb-6">{t('contact.sendMessage')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-black font-light">
                            {t('contact.name')} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t('contact.namePlaceholder')}
                            className="font-light"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-black font-light">
                            {t('contact.email')} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('contact.emailPlaceholder')}
                            className="font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-black font-light">
                            {t('contact.phone')}
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t('contact.phonePlaceholder')}
                            className="font-light"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-black font-light">
                            {t('contact.subject')}
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder={t('contact.subjectPlaceholder')}
                            className="font-light"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-black font-light">
                          {t('contact.message')} <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t('contact.messagePlaceholder')}
                          rows={6}
                          className="font-light resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className={`w-full rounded-full font-light ${isRTL ? 'flex-row-reverse' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          t('contact.sending')
                        ) : (
                          <div className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            {t('contact.sendMessage')}
                          </div>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to={getLocalizedPath('/')}>
              <Button className={`w-full md:w-auto px-8 py-3 rounded-full font-light ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t('about.backToHome')}
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

export default Contact;

