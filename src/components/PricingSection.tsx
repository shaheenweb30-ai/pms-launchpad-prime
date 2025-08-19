import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Building2, Crown } from "lucide-react";
import { useTranslation } from 'react-i18next';

const PricingSection = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small property managers",
      price: "$29",
      period: "per month",
      icon: Building2,
      color: "from-[#46b64b] to-[#bed62f]",
      bgColor: "bg-[#46b64b]/10",
      borderColor: "border-[#46b64b]/20",
      features: [
        "Up to 25 properties",
        "Basic tenant management",
        "Maintenance tracking",
        "Email support",
        "Mobile app access",
        "Basic reporting"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "Ideal for growing property management companies",
      price: "$79",
      period: "per month",
      icon: Zap,
      color: "from-[#ed1c24] to-[#225fac]",
      bgColor: "bg-[#ed1c24]/10",
      borderColor: "border-[#ed1c24]/20",
      features: [
        "Up to 100 properties",
        "Advanced tenant management",
        "Automated maintenance workflows",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "Team collaboration",
        "Advanced reporting"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      description: "For large property management portfolios",
      price: "$199",
      period: "per month",
      icon: Crown,
      color: "from-[#834b9d] to-[#aa385c]",
      bgColor: "bg-[#834b9d]/10",
      borderColor: "border-[#834b9d]/20",
      features: [
        "Unlimited properties",
        "Full tenant lifecycle management",
        "AI-powered insights",
        "24/7 dedicated support",
        "Custom development",
        "Advanced security",
        "Multi-location support",
        "White-label options",
        "API access",
        "Custom training"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f8f9fa] via-white to-[#225fac]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#225fac]/10 border border-[#225fac]/20 text-[#225fac] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#231f20] mb-4 sm:mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#a5afbe] max-w-3xl mx-auto leading-relaxed px-4">
            Choose the perfect plan for your property management needs. 
            All plans include a 14-day free trial with no credit card required.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-0 bg-white hover:shadow-xl transition-all duration-500 cursor-pointer ${
                plan.popular ? 'ring-2 ring-[#ed1c24] shadow-lg' : 'shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white border-0 px-3 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 sm:pb-8">
                <div className={`w-16 h-16 sm:w-18 h-18 lg:w-20 h-20 ${plan.bgColor} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border ${plan.borderColor}`}>
                  <plan.icon className={`w-8 h-8 sm:w-9 h-9 lg:w-10 h-10 bg-gradient-to-br ${plan.color} bg-clip-text text-transparent`} />
                </div>
                
                <CardTitle className="text-xl sm:text-2xl font-bold text-[#231f20] mb-2">
                  {plan.name}
                </CardTitle>
                
                <p className="text-[#a5afbe] text-sm sm:text-base leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231f20]">
                      {plan.price}
                    </span>
                    <span className="text-[#a5afbe] text-sm sm:text-base ml-1">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[#a5afbe] text-xs sm:text-sm">
                    Billed monthly • Cancel anytime
                  </p>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 h-5 text-[#46b64b] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#231f20] text-sm sm:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Button 
                  className={`w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-full border-0 transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-[#f8f9fa] to-[#225fac]/10 hover:from-[#ed1c24]/10 hover:to-[#225fac]/20 text-[#231f20] border-2 border-[#a5afbe]/30 hover:border-[#ed1c24]'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#ed1c24]/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#a5afbe]/20">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-3 sm:mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-[#a5afbe] mb-6 sm:mb-8 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              We offer custom enterprise solutions for large property management companies 
              with specific requirements. Let's discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white font-semibold rounded-full hover:from-[#d41920] hover:to-[#1e4f9a] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Contact Sales Team
              </Button>
              <Button variant="outline" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#a5afbe] text-[#231f20] font-semibold rounded-full hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 transition-all duration-300 text-sm sm:text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;