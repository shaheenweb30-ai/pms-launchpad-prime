import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const CookiePolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white font-medium text-lg">
                P
              </div>
              <span className="text-2xl font-light tracking-tight font-google-sans">PropertyFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              <Link to="/#features" className="text-gray-500 hover:text-black transition-colors font-light">Features</Link>
              <Link to="/#pricing" className="text-gray-500 hover:text-black transition-colors font-light">Pricing</Link>
              <Link to="/#how-it-works" className="text-gray-500 hover:text-black transition-colors font-light">How it Works</Link>
              <Link to="/#testimonials" className="text-gray-500 hover:text-black transition-colors font-light">Testimonials</Link>
              <Link to="/#faq" className="text-gray-500 hover:text-black transition-colors font-light">FAQ</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <LanguageSwitcher />
              <Link to="/signin">
                <Button variant="ghost" className="text-gray-500 hover:text-black font-light">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="px-6">
                  Free Trial
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
                <Link to="/#features" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</Link>
                <Link to="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                <Link to="/#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
                <Link to="/#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
                <Link to="/#faq" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
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
          <Link to="/">
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
              Cookie Policy
            </h1>
            <p className="text-gray-500 font-light">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">What Are Cookies</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                PropertyFlow uses cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By continuing to use our Service, you consent to our use of cookies as described in this policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We use cookies for various purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li><strong className="font-medium text-black">Essential Cookies:</strong> Required for the website to function properly and cannot be disabled</li>
                <li><strong className="font-medium text-black">Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong className="font-medium text-black">Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong className="font-medium text-black">Analytics Cookies:</strong> Collect information about how you use our website</li>
                <li><strong className="font-medium text-black">Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-light text-black mb-3 mt-6">Strictly Necessary Cookies</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                These cookies are essential for the Service to function and cannot be switched off. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
              </p>

              <h3 className="text-xl font-light text-black mb-3 mt-6">Performance and Analytics Cookies</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are most popular and see how visitors move around the site.
              </p>

              <h3 className="text-xl font-light text-black mb-3 mt-6">Functionality Cookies</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>

              <h3 className="text-xl font-light text-black mb-3 mt-6">Targeting/Advertising Cookies</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant content on other sites.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service and refine marketing efforts. These third parties may include:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Advertising networks for targeted advertising</li>
                <li>Social media platforms for social sharing features</li>
                <li>Customer support tools for live chat functionality</li>
              </ul>
              <p className="text-gray-600 leading-relaxed font-light">
                These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies, and you should check the respective privacy policies of these third parties for more information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Managing Cookies</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
              </p>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                However, please note that if you choose to disable cookies, some features of the Service may not function properly or may be unavailable.
              </p>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                You can manage cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed font-light space-y-2 mb-4 ml-4">
                <li><strong className="font-medium text-black">Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong className="font-medium text-black">Firefox:</strong> Options → Privacy & Security → Cookies</li>
                <li><strong className="font-medium text-black">Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong className="font-medium text-black">Edge:</strong> Settings → Privacy → Cookies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Cookie Consent</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                When you first visit our website, you may be presented with a cookie consent banner. By clicking "Accept" or continuing to use our Service, you consent to our use of cookies as described in this policy.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Do Not Track Signals</h2>
              <p className="text-gray-600 leading-relaxed font-light">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As a result, PropertyFlow does not currently respond to DNT browser signals or mechanisms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Updates to This Cookie Policy</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date. You are advised to review this Cookie Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-light text-black mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed font-light mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
                <li><a href="#" className="hover:text-white transition-colors font-light">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Blog</a></li>
                <li><Link to="/careers" className="hover:text-white transition-colors font-light">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors font-light">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-light">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Documentation</a></li>
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

export default CookiePolicy;

