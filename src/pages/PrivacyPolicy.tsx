import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { getLocalizedPath } = useLanguageNavigation();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

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
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link to={getLocalizedPath('/')}>
            <Button 
              variant="ghost" 
              className="mb-8 text-gray-500 hover:text-black font-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              Privacy Policy
            </h1>
            <p className="text-gray-500 font-light">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                At PropertyFlow ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our property management platform and services.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                Please read this Privacy Policy carefully. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-light text-black mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Property information, including addresses and property details</li>
                <li>Tenant and vendor information</li>
                <li>Payment and financial information</li>
                <li>Account credentials and authentication information</li>
              </ul>

              <h3 className="text-xl font-light text-black mb-3 mt-6">Usage Information</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We automatically collect certain information when you use our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Device information, including IP address, browser type, and operating system</li>
                <li>Usage data, including pages visited, features used, and time spent on the platform</li>
                <li>Log files and analytics data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage payments</li>
                <li>Communicate with you about your account and our services</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li><strong className="font-medium">Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
                <li><strong className="font-medium">Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                <li><strong className="font-medium">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                <li><strong className="font-medium">With Your Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data storage and backup systems</li>
              </ul>
              <p className="text-gray-600 leading-relaxed font-light">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Your Rights and Choices</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li><strong className="font-medium">Access:</strong> You can request access to your personal information</li>
                <li><strong className="font-medium">Correction:</strong> You can update or correct inaccurate information</li>
                <li><strong className="font-medium">Deletion:</strong> You can request deletion of your personal information</li>
                <li><strong className="font-medium">Opt-Out:</strong> You can opt-out of certain communications and data processing</li>
                <li><strong className="font-medium">Data Portability:</strong> You can request a copy of your data in a portable format</li>
              </ul>
              <p className="text-gray-600 leading-relaxed font-light">
                To exercise these rights, please contact us at privacy@propertyflow.com.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-600 leading-relaxed font-light mb-2">
                  <strong className="font-medium text-black">Email:</strong> privacy@propertyflow.com
                </p>
                <p className="text-gray-600 leading-relaxed font-light mb-2">
                  <strong className="font-medium text-black">Address:</strong> PropertyFlow, Inc.
                </p>
                <p className="text-gray-600 leading-relaxed font-light">
                  <strong className="font-medium text-black">Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to={getLocalizedPath('/')}>
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

export default PrivacyPolicy;

