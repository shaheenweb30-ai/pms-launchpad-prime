import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-building.jpg";
import { ArrowRight, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(237,28,36,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,95,172,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#ed1c24]/10 border border-[#ed1c24]/20 text-[#ed1c24] text-xs sm:text-sm font-medium">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span className="hidden sm:inline">Trusted by 500+ Properties Worldwide</span>
              <span className="sm:hidden">500+ Properties</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#231f20] leading-[0.9]">
                Modern Property
                <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-[#a5afbe] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Streamline your property management operations with our comprehensive platform. 
                Manage tenants, track maintenance, collect rent, and generate reports — all in one place.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-white rounded-full"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold border-2 border-[#a5afbe] hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] transition-all duration-300 rounded-full"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-[#a5afbe]/30">
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#ed1c24]/10 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#ed1c24]" />
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#231f20]">500+</div>
                <div className="text-xs sm:text-sm text-[#a5afbe]">Properties</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#46b64b]/10 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#46b64b]" />
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#231f20]">98%</div>
                <div className="text-xs sm:text-sm text-[#a5afbe]">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#225fac]/10 rounded-lg sm:rounded-xl mb-2 sm:mb-3 mx-auto">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#225fac]" />
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#231f20]">24/7</div>
                <div className="text-xs sm:text-sm text-[#a5afbe]">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Visual Element */}
          <div className="relative order-first lg:order-last">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-[#a5afbe]/20">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">PF</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-[#a5afbe]">PropertyFlow</div>
                      <div className="text-sm sm:text-base lg:text-lg font-semibold text-[#231f20]">Dashboard</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-[#f8f9fa] rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#46b64b]/20 rounded-lg mb-2"></div>
                      <div className="h-2 sm:h-3 bg-[#a5afbe]/30 rounded w-3/4"></div>
                    </div>
                    <div className="bg-[#f8f9fa] rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#225fac]/20 rounded-lg mb-2"></div>
                      <div className="h-2 sm:h-3 bg-[#a5afbe]/30 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#ed1c24]/10 to-[#46b64b]/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs sm:text-sm font-medium text-[#231f20]">Revenue</div>
                      <div className="text-xs sm:text-sm text-[#46b64b] font-semibold">+15%</div>
                    </div>
                    <div className="h-2 bg-[#a5afbe]/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#ed1c24] to-[#46b64b] rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements - Hidden on small screens */}
            <div className="hidden sm:block absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#46b64b] to-[#bed62f] rounded-xl sm:rounded-2xl shadow-lg opacity-80"></div>
            <div className="hidden sm:block absolute -bottom-3 -left-3 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#225fac] to-[#43c1c3] rounded-xl sm:rounded-2xl shadow-lg opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;