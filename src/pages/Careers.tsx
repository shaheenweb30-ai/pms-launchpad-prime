import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Menu, X, MapPin, Clock, Briefcase, Users, TrendingUp, Heart, Zap, Upload, CheckCircle } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';

const Careers = () => {
  const { t, i18n } = useTranslation();
  const { getLocalizedPath } = useLanguageNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    resume: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: t('careers.resumeDialog.fileTooLarge'),
          description: t('careers.resumeDialog.fileSizeLimit'),
          variant: "destructive",
        });
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: t('careers.resumeDialog.invalidFileType'),
          description: t('careers.resumeDialog.fileTypeLimit'),
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.resume) {
      toast({
        title: t('careers.resumeDialog.missingFields'),
        description: t('careers.resumeDialog.fillRequired'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real application, you would upload the file and send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: t('careers.resumeDialog.applicationSubmitted'),
        description: t('careers.resumeDialog.thankYou'),
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setIsResumeDialogOpen(false);
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          coverLetter: '',
          resume: null
        });
      }, 2000);
    } catch (error) {
      toast({
        title: t('careers.resumeDialog.applicationSubmitted'),
        description: t('contact.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsResumeDialogOpen(open);
    if (!open) {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
        resume: null
      });
    }
  };

  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      description: "Build and scale our property management platform using React, TypeScript, and modern web technologies."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote / New York, NY",
      type: "Full-time",
      description: "Create beautiful, intuitive user experiences that make property management effortless for our customers."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Austin, TX",
      type: "Full-time",
      description: "Help our customers succeed by providing exceptional support and building lasting relationships."
    },
    {
      title: "Sales Engineer",
      department: "Sales",
      location: "Remote / Chicago, IL",
      type: "Full-time",
      description: "Work with potential customers to understand their needs and demonstrate how PropertyFlow can help."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles, CA",
      type: "Full-time",
      description: "Drive growth through strategic marketing campaigns and content that resonates with property managers."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Ensure our infrastructure is scalable, reliable, and secure as we grow our platform."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      titleKey: "careers.benefits.health",
      descriptionKey: "careers.benefits.healthDesc"
    },
    {
      icon: Zap,
      titleKey: "careers.benefits.flexible",
      descriptionKey: "careers.benefits.flexibleDesc"
    },
    {
      icon: TrendingUp,
      titleKey: "careers.benefits.growth",
      descriptionKey: "careers.benefits.growthDesc"
    },
    {
      icon: Users,
      titleKey: "careers.benefits.team",
      descriptionKey: "careers.benefits.teamDesc"
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
          <Link to="/">
            <Button 
              variant="ghost" 
              className="mb-8 text-gray-500 hover:text-black font-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              {t('careers.joinUs')}
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              {t('careers.subtitle')}
            </p>
          </div>

          {/* Why Work With Us */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-8 text-center tracking-tight font-google-sans">
              {t('careers.whyPropertyFlow')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-black mb-3">{t(benefit.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{t(benefit.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-20">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between mb-12`}>
              <h2 className="text-3xl font-extralight text-black tracking-tight font-google-sans">
                {t('careers.openPositions')}
              </h2>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-light text-black mb-2">{position.title}</h3>
                      <div className={`flex flex-wrap gap-4 text-sm text-gray-500 font-light ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Briefcase className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {position.department}
                        </span>
                        <span className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <MapPin className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {position.location}
                        </span>
                        <span className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="md:w-auto w-full rounded-full font-light"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: position.title }));
                        setIsResumeDialogOpen(true);
                      }}
                    >
                      {t('careers.applyNow')}
                    </Button>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">{position.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Don't See a Role? */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
              <h3 className="text-2xl font-light text-black mb-4">{t('careers.dontSeeRole')}</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 max-w-2xl mx-auto">
                {t('careers.dontSeeRoleDesc')}
              </p>
              <Button 
                className="rounded-full font-light px-8"
                onClick={() => setIsResumeDialogOpen(true)}
              >
                {t('careers.sendResume')}
              </Button>
            </div>
          </section>

          {/* Resume Submission Dialog */}
          <Dialog open={isResumeDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <DialogTitle className="text-2xl font-light text-black mb-2">{t('careers.resumeDialog.applicationSubmitted')}</DialogTitle>
                  <DialogDescription className="text-gray-600 font-light">
                    {t('careers.resumeDialog.thankYou')}
                  </DialogDescription>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-light text-black">{t('careers.resumeDialog.title')}</DialogTitle>
                    <DialogDescription className="text-gray-500 font-light">
                      {t('careers.resumeDialog.subtitle')}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
                        <Label htmlFor="position" className="text-black font-light">
                          {t('careers.resumeDialog.position')}
                        </Label>
                        <Input
                          id="position"
                          name="position"
                          type="text"
                          value={formData.position}
                          onChange={handleInputChange}
                          placeholder={t('careers.resumeDialog.positionPlaceholder')}
                          className="font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-black font-light">
                        {t('careers.resumeDialog.uploadResume')} <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleFileChange}
                          className="font-light cursor-pointer"
                        />
                        {formData.resume && (
                          <div className={`mt-2 flex items-center text-sm text-gray-600 font-light ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Upload className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            {formData.resume.name}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-light mt-1">
                        {t('careers.resumeDialog.resumeAccepted')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="text-black font-light">
                        {t('careers.resumeDialog.coverLetter')}
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder={t('careers.resumeDialog.coverLetterPlaceholder')}
                        rows={5}
                        className="font-light resize-none"
                      />
                    </div>

                    <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsResumeDialogOpen(false)}
                        className="flex-1 rounded-full font-light"
                        disabled={isSubmitting}
                      >
                        {t('careers.resumeDialog.cancel')}
                      </Button>
                      <Button
                        type="submit"
                        className={`flex-1 rounded-full font-light ${isRTL ? 'flex-row-reverse' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={isRTL ? 'ml-2' : 'mr-2'}>{t('careers.resumeDialog.submitting')}</span>
                          </div>
                        ) : (
                          t('careers.resumeDialog.submit')
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>

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

export default Careers;

