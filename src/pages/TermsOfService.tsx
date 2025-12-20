import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-gray-500 font-light">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                By accessing or using PropertyFlow ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Use License</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                Permission is granted to temporarily access the materials on PropertyFlow's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on PropertyFlow's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Account Registration</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                To access certain features of the Service, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and identification</li>
                <li>Accept all responsibility for activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Service Availability</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We strive to provide continuous availability of the Service, but we do not guarantee uninterrupted access. The Service may be unavailable due to:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Scheduled maintenance</li>
                <li>System failures or technical issues</li>
                <li>Circumstances beyond our reasonable control</li>
              </ul>
              <p className="text-gray-600 leading-relaxed font-light">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time with or without notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">User Conduct</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful, offensive, or illegal content</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Payment Terms</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                If you purchase a subscription or other paid service:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>You agree to pay all fees associated with your subscription</li>
                <li>Fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to change our pricing with 30 days' notice</li>
                <li>Failure to pay may result in suspension or termination of your account</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                The Service and its original content, features, and functionality are owned by PropertyFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                You retain ownership of any data you submit to the Service. By using the Service, you grant us a license to use, store, and process your data as necessary to provide the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                You may terminate your account at any time by contacting us or using the account deletion feature in your settings. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>The Service will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The Service is free of viruses or other harmful components</li>
                <li>The results obtained from using the Service will meet your requirements</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                In no event shall PropertyFlow, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Indemnification</h2>
              <p className="text-gray-600 leading-relaxed font-light">
                You agree to defend, indemnify, and hold harmless PropertyFlow and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed font-light">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which PropertyFlow operates, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-600 leading-relaxed font-light mb-2">
                  <strong className="font-medium text-black">Email:</strong> legal@propertyflow.com
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

export default TermsOfService;

