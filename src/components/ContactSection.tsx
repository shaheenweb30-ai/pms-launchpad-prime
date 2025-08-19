import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#ed1c24]/10 border border-[#ed1c24]/20 text-[#ed1c24] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Contact
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#231f20] mb-4 sm:mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
              Property Management?
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#a5afbe] max-w-3xl mx-auto leading-relaxed px-4">
            Get in touch with our team to learn how PropertyFlow can help streamline 
            your operations and boost your bottom line.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl bg-white order-2 lg:order-1">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#231f20] mb-2">
                  Get Your Free Demo
                </h3>
                <p className="text-[#a5afbe] text-sm sm:text-base">
                  Experience the power of PropertyFlow firsthand
                </p>
              </div>
              
              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-[#231f20] mb-2 block">
                      {t('contact.form.name')}
                    </label>
                    <Input 
                      placeholder="Enter your full name" 
                      className="h-10 sm:h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-[#231f20] mb-2 block">
                      {t('contact.form.email')}
                    </label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="h-10 sm:h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#231f20] mb-2 block">
                    {t('contact.form.company')}
                  </label>
                  <Input 
                    placeholder="Enter your company name" 
                    className="h-10 sm:h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#231f20] mb-2 block">
                    {t('contact.form.properties')}
                  </label>
                  <Input 
                    placeholder="Number of properties you manage" 
                    className="h-10 sm:h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#231f20] mb-2 block">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder="Tell us about your needs and challenges"
                    className="min-h-[100px] sm:min-h-[120px] border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] resize-none rounded-2xl text-sm sm:text-base"
                  />
                </div>
                
                <Button className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-full">
                  {t('contact.form.submit')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Contact Cards */}
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-r from-[#f8f9fa] to-[#225fac]/5">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 h-14 bg-gradient-to-br from-[#225fac] to-[#43c1c3] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[#231f20] text-sm sm:text-base lg:text-lg">{t('contact.details.email')}</h4>
                  <p className="text-[#a5afbe] text-xs sm:text-sm">sales@propertyflow.com</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-r from-[#f8f9fa] to-[#46b64b]/5">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 h-14 bg-gradient-to-br from-[#46b64b] to-[#bed62f] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[#231f20] text-sm sm:text-base lg:text-lg">{t('contact.details.phone')}</h4>
                  <p className="text-[#a5afbe] text-xs sm:text-sm">1-800-PROPERTY</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-r from-[#f8f9fa] to-[#834b9d]/5">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 h-14 bg-gradient-to-br from-[#834b9d] to-[#aa385c] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[#231f20] text-sm sm:text-base lg:text-lg">{t('contact.details.address')}</h4>
                  <p className="text-[#a5afbe] text-xs sm:text-sm">123 Property St, Business District</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-r from-[#f8f9fa] to-[#f5821f]/5">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 h-14 bg-gradient-to-br from-[#f5821f] to-[#fbd835] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[#231f20] text-sm sm:text-base lg:text-lg">{t('contact.details.chat')}</h4>
                  <p className="text-[#a5afbe] text-xs sm:text-sm">Available 24/7 for support</p>
                </div>
              </div>
            </Card>
            
            {/* Trial CTA */}
            <div className="bg-gradient-to-br from-[#ed1c24] via-[#225fac] to-[#46b64b] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3">
                {t('contact.trial.title')}
              </h4>
              <p className="text-white/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {t('contact.trial.description')}
              </p>
              <Button 
                variant="secondary" 
                className="w-full h-10 sm:h-12 bg-white text-[#ed1c24] hover:bg-[#f8f9fa] font-semibold border-0 rounded-full text-sm sm:text-base"
              >
                {t('contact.trial.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;