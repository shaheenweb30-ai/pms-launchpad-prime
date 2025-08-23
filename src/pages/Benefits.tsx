import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Shield, 
  Zap, 
  BarChart3,
  Star,
  ArrowRight,
  Building2,
  Home,
  Calculator,
  Target
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Benefits = () => {
  const { t } = useTranslation();
  
  const coreBenefits = [
    {
      icon: TrendingUp,
      title: t('benefits.revenue.title'),
      description: t('benefits.revenue.description'),
      metric: t('benefits.revenue.metric'),
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Clock,
      title: t('benefits.time.title'),
      description: t('benefits.time.description'),
      metric: t('benefits.time.metric'),
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: CheckCircle,
      title: t('benefits.quality.title'), 
      description: t('benefits.quality.description'),
      metric: t('benefits.quality.metric'),
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: DollarSign,
      title: t('benefits.costs.title'),
      description: t('benefits.costs.description'),
      metric: t('benefits.costs.metric'),
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const additionalBenefits = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enable seamless collaboration between property managers, maintenance staff, and tenants with real-time updates and shared access.",
      features: ["Role-based permissions", "Team communication tools", "Shared calendars", "Document collaboration"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Minimize risks with comprehensive compliance tracking, automated legal document generation, and audit trails.",
      features: ["Compliance monitoring", "Legal document templates", "Audit logging", "Insurance tracking"]
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Automate routine tasks to focus on strategic decisions and tenant relationships.",
      features: ["Rent reminders", "Maintenance scheduling", "Lease renewals", "Financial reporting"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Make data-driven decisions with comprehensive reporting and predictive analytics.",
      features: ["Performance metrics", "Market analysis", "ROI calculations", "Predictive insights"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Properties LLC",
      content: "PropertyFlow has transformed how we manage our 200+ unit portfolio. We've seen a 25% increase in efficiency and our tenants love the improved communication.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Real Estate Investor",
      company: "Chen Investments",
      content: "The automation features alone have saved us 15+ hours per week. The ROI tracking has helped us make better investment decisions.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Property Owner",
      company: "Rodriguez Properties",
      content: "As a small property owner, I was worried about the complexity, but PropertyFlow made everything simple and intuitive.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const caseStudies = [
    {
      title: "Multi-Family Complex Optimization",
      company: "Metro Living Properties",
      challenge: "Managing 500+ units across 3 complexes with manual processes",
      solution: "Implemented PropertyFlow with automated workflows and tenant portals",
      results: [
        "40% reduction in maintenance response time",
        "25% increase in rent collection efficiency",
        "15% decrease in operational costs"
      ]
    },
    {
      title: "Commercial Property Portfolio",
      company: "Downtown Real Estate Group",
      challenge: "Complex lease management and financial reporting across diverse property types",
      solution: "Centralized platform with advanced analytics and compliance tracking",
      results: [
        "30% faster lease processing",
        "99.9% compliance rate",
        "20% improvement in tenant retention"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Property Management
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
            Discover how PropertyFlow delivers measurable results that drive growth, efficiency, and service quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Benefits That Drive Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These are the fundamental advantages that have helped thousands of property managers succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreBenefits.map((benefit, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-elegant transition-all duration-300 card-gradient border-border/50"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {benefit.description}
                  </p>
                  <div className="text-lg font-bold text-primary">
                    {benefit.metric}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beyond the Basics
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover additional features that set PropertyFlow apart from traditional property management solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {t('benefits.stats.title')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-white/80">{t('benefits.stats.properties')}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
                <div className="text-white/80">{t('benefits.stats.managers')}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
                <div className="text-white/80">{t('benefits.stats.uptime')}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">25+</div>
                <div className="text-white/80">{t('benefits.stats.countries')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from property managers who have transformed their operations with PropertyFlow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how real companies achieved measurable results with PropertyFlow
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <Badge variant="secondary">{caseStudy.company}</Badge>
                  </div>
                  <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-muted-foreground">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Results</h4>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience These Benefits?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of property managers who have already transformed their operations with PropertyFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
          <p className="text-white/70 mt-4 text-sm">
            No credit card required • 14-day free trial • Full access to all features
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Benefits;
