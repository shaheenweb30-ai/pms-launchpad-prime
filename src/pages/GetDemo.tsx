import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ArrowRight, ArrowLeft, Calendar, Clock, Users, CheckCircle, Star, Zap, Crown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const GetDemo = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    companySize: '',
    propertyCount: '',
    preferredTime: '',
    preferredDate: '',
    useCase: '',
    additionalInfo: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle demo request submission here
      console.log('Demo request:', formData);
    }, 2000);
  };

  const demoBenefits = [
    {
      icon: CheckCircle,
      title: "Personalized Walkthrough",
      description: "See exactly how PropertyFlow fits your specific needs",
      color: "from-[#46b64b] to-[#bed62f]",
      bgColor: "bg-[#46b64b]/10"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Get answers from our property management specialists",
      color: "from-[#225fac] to-[#43c1c3]",
      bgColor: "bg-[#225fac]/10"
    },
    {
      icon: Clock,
      title: "No Time Wasted",
      description: "30-minute focused demo that gets straight to the point",
      color: "from-[#ed1c24] to-[#225fac]",
      bgColor: "bg-[#ed1c24]/10"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Properties",
      content: "The demo was incredibly helpful. I could see exactly how PropertyFlow would solve our specific challenges.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      company: "Coastal Real Estate",
      content: "Our demo specialist understood our business immediately and showed us features we didn't even know we needed.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(237,28,36,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,95,172,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Back to Home */}
        <div className="text-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-[#ed1c24]/10 border border-[#ed1c24]/20 text-[#ed1c24] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Get Demo
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#231f20] mb-4 sm:mb-6">
            See PropertyFlow
            <span className="block bg-gradient-to-r from-[#ed1c24] to-[#225fac] bg-clip-text text-transparent">
              In Action
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#a5afbe] max-w-3xl mx-auto leading-relaxed px-4">
            Book a personalized demo and discover how PropertyFlow can transform your property management operations. 
            No sales pitch, just real solutions for your business.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Demo Form */}
          <div className="order-2 lg:order-1">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-[#231f20]">
                  Schedule Your Demo
                </CardTitle>
                <p className="text-[#a5afbe] text-sm">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-[#231f20]">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-[#231f20]">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Contact Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#231f20]">
                      Business Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your business email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-[#231f20]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                    />
                  </div>
                  
                  {/* Company Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium text-[#231f20]">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                      required
                    />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="text-sm font-medium text-[#231f20]">
                        Company Size
                      </Label>
                      <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                        <SelectTrigger className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertyCount" className="text-sm font-medium text-[#231f20]">
                        Properties Managed
                      </Label>
                      <Select value={formData.propertyCount} onValueChange={(value) => handleInputChange('propertyCount', value)}>
                        <SelectTrigger className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm">
                          <SelectValue placeholder="Select property count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-25">1-25 properties</SelectItem>
                          <SelectItem value="26-100">26-100 properties</SelectItem>
                          <SelectItem value="101-500">101-500 properties</SelectItem>
                          <SelectItem value="501-1000">501-1000 properties</SelectItem>
                          <SelectItem value="1000+">1000+ properties</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Scheduling Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-sm font-medium text-[#231f20]">
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="text-sm font-medium text-[#231f20]">
                        Preferred Time
                      </Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Use Case */}
                  <div className="space-y-2">
                    <Label htmlFor="useCase" className="text-sm font-medium text-[#231f20]">
                      Primary Use Case
                    </Label>
                    <Select value={formData.useCase} onValueChange={(value) => handleInputChange('useCase', value)}>
                      <SelectTrigger className="h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm">
                        <SelectValue placeholder="Select your primary use case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant-management">Tenant Management</SelectItem>
                        <SelectItem value="maintenance-tracking">Maintenance Tracking</SelectItem>
                        <SelectItem value="rent-collection">Rent Collection</SelectItem>
                        <SelectItem value="financial-reporting">Financial Reporting</SelectItem>
                        <SelectItem value="property-marketing">Property Marketing</SelectItem>
                        <SelectItem value="compliance-management">Compliance Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo" className="text-sm font-medium text-[#231f20]">
                      Additional Information
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Tell us about your specific needs, challenges, or questions..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      className="min-h-[100px] border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] resize-none rounded-2xl text-sm"
                    />
                  </div>
                  
                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        className="mt-1 border-[#a5afbe]/30 data-[state=checked]:bg-[#ed1c24] data-[state=checked]:border-[#ed1c24]"
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm text-[#231f20] cursor-pointer leading-relaxed">
                        I agree to the <Link to="/terms" className="text-[#ed1c24] hover:text-[#d41920] underline">Terms of Service</Link> and <Link to="/privacy" className="text-[#ed1c24] hover:text-[#d41920] underline">Privacy Policy</Link> *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToMarketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked as boolean)}
                        className="mt-1 border-[#a5afbe]/30 data-[state=checked]:bg-[#ed1c24] data-[state=checked]:border-[#ed1c24]"
                      />
                      <Label htmlFor="agreeToMarketing" className="text-sm text-[#a5afbe] cursor-pointer leading-relaxed">
                        I agree to receive marketing communications from PropertyFlow (optional)
                      </Label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.agreeToTerms}
                    className="w-full h-14 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white font-semibold rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Scheduling Demo...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Schedule Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Demo Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#231f20]">
                What to Expect
              </h3>
              <div className="space-y-4">
                {demoBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className={`w-6 h-6 bg-gradient-to-br ${benefit.color} bg-clip-text text-transparent`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#231f20] mb-1">{benefit.title}</h4>
                      <p className="text-[#a5afbe] text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Demo Process */}
            <div className="bg-gradient-to-r from-[#f8f9fa] to-[#ed1c24]/5 rounded-2xl p-6 border border-[#a5afbe]/20">
              <h3 className="text-lg font-semibold text-[#231f20] mb-4">
                Demo Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#ed1c24] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-sm text-[#231f20]">Schedule your preferred time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#ed1c24] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-sm text-[#231f20]">Receive calendar confirmation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#ed1c24] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-sm text-[#231f20]">Join personalized 30-minute demo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#ed1c24] text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span className="text-sm text-[#231f20]">Get your questions answered</span>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#231f20]">
                What Our Users Say
              </h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-[#a5afbe]/20">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#231f20] text-sm mb-3 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-[#231f20] text-sm">{testimonial.name}</p>
                      <p className="text-[#a5afbe] text-xs">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-gradient-to-r from-[#f8f9fa] to-[#225fac]/5 rounded-2xl p-6 border border-[#a5afbe]/20">
              <h3 className="text-lg font-semibold text-[#231f20] mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-[#a5afbe] text-sm mb-4">
                Can't wait for a demo? Our team is here to help you get started right away.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-[#231f20]">
                  <strong>Email:</strong> demo@propertyflow.com
                </p>
                <p className="text-sm text-[#231f20]">
                  <strong>Phone:</strong> 1-800-PROPERTY
                </p>
                <p className="text-sm text-[#231f20]">
                  <strong>Response Time:</strong> Within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDemo;
