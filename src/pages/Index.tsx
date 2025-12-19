import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/LanguageSwitcher';
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
  Play
} from 'lucide-react';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Manage all your properties with detailed information, image galleries, and comprehensive tracking."
    },
    {
      icon: Users,
      title: "Tenant Management", 
      description: "Handle tenant profiles, payment tracking, lease management, and communication all in one place."
    },
    {
      icon: CreditCard,
      title: "Online Payments",
      description: "Secure payment processing with automated rent collection and financial tracking."
    },
    {
      icon: Wrench,
      title: "Maintenance Tracking",
      description: "Submit, track, and manage maintenance requests with priority scoring and vendor management."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive financial reports and property performance analytics for informed decisions."
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Store and organize all property documents, leases, and important paperwork securely."
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
      title: "Sign Up & Setup",
      description: "Create your account and add your properties in minutes with our intuitive setup wizard."
    },
    {
      step: "2", 
      title: "Add Tenants",
      description: "Import existing tenants or add new ones with comprehensive profiles and lease information."
    },
    {
      step: "3",
      title: "Automate Operations",
      description: "Set up automated rent collection, maintenance workflows, and communication systems."
    },
    {
      step: "4",
      title: "Monitor & Grow",
      description: "Track performance with detailed analytics and scale your property management business."
    }
  ];

  const testimonials: any[] = [];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer: "You can set up your account and add your first property in under 10 minutes. Our setup wizard guides you through each step."
    },
    {
      question: "Do you integrate with accounting software?",
      answer: "Yes, we integrate with QuickBooks, Xero, and other popular accounting platforms to streamline your financial management."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, our mobile app is available for both iOS and Android, allowing you to manage your properties on the go."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer email support for all plans, with priority support for Professional and Enterprise customers. Enterprise customers also get dedicated account management."
    },
    {
      question: "Can I import my existing data?",
      answer: "Absolutely! We provide data import tools and can help you migrate from other property management systems."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security with encrypted data storage, regular backups, and SOC 2 compliance."
    }
  ];

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
              <a href="#features" className="text-gray-500 hover:text-black transition-colors font-light">Features</a>
              <a href="#pricing" className="text-gray-500 hover:text-black transition-colors font-light">Pricing</a>
              <a href="#how-it-works" className="text-gray-500 hover:text-black transition-colors font-light">How it Works</a>
              <a href="#testimonials" className="text-gray-500 hover:text-black transition-colors font-light">Testimonials</a>
              <a href="#faq" className="text-gray-500 hover:text-black transition-colors font-light">FAQ</a>
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
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                  <Link to="/signin">
                    <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
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

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 text-gray-600 text-sm font-light mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Trusted by 10,000+ property managers
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extralight text-black mb-8 leading-tight tracking-tight font-google-sans">
            Property Management
            <br />
            <span className="font-light">Made Simple</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The only platform you need to manage properties, tenants, and finances—all in one beautifully simple interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-gray-500 hover:text-black px-8 py-4 text-lg font-light"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
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
                <div className="text-sm text-gray-400 font-light">PropertyFlow</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-light text-gray-600">Properties</div>
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">24</div>
                  <div className="text-sm text-gray-400 font-light">Active</div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-light text-gray-600">Revenue</div>
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">$48.5k</div>
                  <div className="text-sm text-gray-400 font-light">Monthly</div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-light text-gray-600">Tenants</div>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-extralight text-black">89</div>
                  <div className="text-sm text-gray-400 font-light">96% Rate</div>
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
              Everything you need
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Simple tools that handle the complexity of property management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-light text-black mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{feature.description}</p>
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
              Simple pricing
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Start free, scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-8 border transition-all duration-200 ${plan.popular ? 'border-black shadow-lg scale-105' : 'border-gray-100 hover:border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-light">
                    Most Popular
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
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-600 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <Button className={`w-full py-3 rounded-full font-light ${plan.popular ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}>
                    Start Free Trial
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
              How it works
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Four simple steps to streamlined property management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-light flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-light text-black mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              What people say
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Trusted by property professionals worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 border-0 shadow-sm">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-600 mb-8 text-lg leading-relaxed font-light">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-light mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-light text-black">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 font-light">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              Questions
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Everything you need to know about PropertyFlow
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-6">
                <button 
                  className="w-full text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between py-4">
                    <h3 className="text-lg font-light text-black">{faq.question}</h3>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="pb-4">
                    <p className="text-gray-500 leading-relaxed font-light">{faq.answer}</p>
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
                Modern property management software built for the next generation of property managers.
              </p>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors font-light">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors font-light">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors font-light">How it Works</a></li>
                <li><Link to="/create-users" className="hover:text-white transition-colors font-light">Setup Users</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-light mb-6 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors font-light">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-light">Contact</a></li>
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
                <a href="#" className="hover:text-white transition-colors font-light">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors font-light">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors font-light">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;