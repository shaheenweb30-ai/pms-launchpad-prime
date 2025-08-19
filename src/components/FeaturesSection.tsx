import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Shield,
  Smartphone,
  Zap
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Building2,
      title: t('features.portfolio.title'),
      description: t('features.portfolio.description'),
      color: "from-[#225fac] to-[#43c1c3]",
      bgColor: "bg-[#225fac]/10",
      iconColor: "text-[#225fac]"
    },
    {
      icon: Users,
      title: t('features.tenant.title'),
      description: t('features.tenant.description'),
      color: "from-[#46b64b] to-[#bed62f]",
      bgColor: "bg-[#46b64b]/10",
      iconColor: "text-[#46b64b]"
    },
    {
      icon: Calendar,
      title: t('features.maintenance.title'),
      description: t('features.maintenance.description'),
      color: "from-[#834b9d] to-[#aa385c]",
      bgColor: "bg-[#834b9d]/10",
      iconColor: "text-[#834b9d]"
    },
    {
      icon: CreditCard,
      title: t('features.payments.title'),
      description: t('features.payments.description'),
      color: "from-[#f5821f] to-[#fbd835]",
      bgColor: "bg-[#f5821f]/10",
      iconColor: "text-[#f5821f]"
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      color: "from-[#ed1c24] to-[#225fac]",
      bgColor: "bg-[#ed1c24]/10",
      iconColor: "text-[#ed1c24]"
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description'),
      color: "from-[#c69c60] to-[#e1c2ae]",
      bgColor: "bg-[#c69c60]/10",
      iconColor: "text-[#c69c60]"
    },
    {
      icon: Smartphone,
      title: t('features.mobile.title'),
      description: t('features.mobile.description'),
      color: "from-[#43c1c3] to-[#0b3f0]",
      bgColor: "bg-[#43c1c3]/10",
      iconColor: "text-[#43c1c3]"
    },
    {
      icon: Zap,
      title: t('features.automation.title'),
      description: t('features.automation.description'),
      color: "from-[#bed62f] to-[#fbd835]",
      bgColor: "bg-[#bed62f]/10",
      iconColor: "text-[#bed62f]"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#ed1c24]/10 border border-[#ed1c24]/20 text-[#ed1c24] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#231f20] mb-4 sm:mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#a5afbe] max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive property management features designed to streamline your operations 
            and maximize your returns.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-[#f8f9fa] cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 h-16 ${feature.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${feature.iconColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#231f20] mb-2 sm:mb-3 group-hover:text-[#ed1c24] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#a5afbe] leading-relaxed text-xs sm:text-sm lg:text-base">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-6 h-6 sm:w-8 h-0.5 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-[#f8f9fa] to-[#ed1c24]/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#a5afbe]/20">
            <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#231f20] mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-[#a5afbe] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of property managers who have already transformed their operations with PropertyFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#ed1c24] to-[#225fac] text-white font-semibold rounded-full hover:from-[#d41920] hover:to-[#1e4f9a] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Start Free Trial
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#a5afbe] text-[#231f20] font-semibold rounded-full hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 transition-all duration-300 text-sm sm:text-base">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;