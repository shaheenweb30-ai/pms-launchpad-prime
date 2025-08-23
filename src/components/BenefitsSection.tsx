import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Clock, DollarSign, Building2, Users, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';

const BenefitsSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: TrendingUp,
      title: t('benefits.revenue.title'),
      description: t('benefits.revenue.description'),
      metric: t('benefits.revenue.metric'),
      color: "text-[#46b64b]",
      bgColor: "bg-[#46b64b]/10",
      borderColor: "border-[#46b64b]/20"
    },
    {
      icon: Clock,
      title: t('benefits.time.title'),
      description: t('benefits.time.description'),
      metric: t('benefits.time.metric'),
      color: "text-[#225fac]",
      bgColor: "bg-[#225fac]/10",
      borderColor: "border-[#225fac]/20"
    },
    {
      icon: CheckCircle,
      title: t('benefits.quality.title'), 
      description: t('benefits.quality.description'),
      metric: t('benefits.quality.metric'),
      color: "text-[#834b9d]",
      bgColor: "bg-[#834b9d]/10",
      borderColor: "border-[#834b9d]/20"
    },
    {
      icon: DollarSign,
      title: t('benefits.costs.title'),
      description: t('benefits.costs.description'),
      metric: t('benefits.costs.metric'),
      color: "text-[#f5821f]",
      bgColor: "bg-[#f5821f]/10",
      borderColor: "border-[#f5821f]/20"
    }
  ];

  return (
    <section id="benefits" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#f8f9fa] via-white to-[#ed1c24]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#46b64b]/10 border border-[#46b64b]/20 text-[#46b64b] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Benefits
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#231f20] mb-4 sm:mb-6">
            Why Choose
            <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
              PropertyFlow?
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#a5afbe] max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of property managers who have transformed their operations 
            and achieved measurable results.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-500 border-0 bg-white hover:bg-[#f8f9fa] cursor-pointer"
            >
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 h-20 ${benefit.bgColor} rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 border ${benefit.borderColor}`}>
                  <benefit.icon className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 ${benefit.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#231f20] mb-2 sm:mb-3 group-hover:text-[#ed1c24] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-[#a5afbe] mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm lg:text-base">
                  {benefit.description}
                </p>
                
                {/* Metric */}
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-[#a5afbe]/20">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-3 sm:mb-4">
              Trusted by Property Managers Worldwide
            </h3>
            <p className="text-[#a5afbe] text-sm sm:text-base lg:text-lg px-4">
              Join a global community of successful property management professionals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 h-16 bg-gradient-to-br from-[#225fac] to-[#43c1c3] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-1 sm:mb-2">500+</div>
              <div className="text-[#a5afbe] text-xs sm:text-sm">Properties</div>
            </div>
            
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 h-16 bg-gradient-to-br from-[#46b64b] to-[#bed62f] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-1 sm:mb-2">50+</div>
              <div className="text-[#a5afbe] text-xs sm:text-sm">Managers</div>
            </div>
            
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 h-16 bg-gradient-to-br from-[#834b9d] to-[#aa385c] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-1 sm:mb-2">99.9%</div>
              <div className="text-[#a5afbe] text-xs sm:text-sm">Uptime</div>
            </div>
            
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 h-16 bg-gradient-to-br from-[#f5821f] to-[#fbd835] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#231f20] mb-1 sm:mb-2">25+</div>
              <div className="text-[#a5afbe] text-xs sm:text-sm">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;