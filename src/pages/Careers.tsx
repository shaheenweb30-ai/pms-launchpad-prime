import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Menu, X, MapPin, Clock, Briefcase, Users, TrendingUp, Heart, Zap, Upload, CheckCircle } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useToast } from '@/hooks/use-toast';

const Careers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    resume: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.resume) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real application, you would upload the file and send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setIsResumeDialogOpen(false);
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          coverLetter: '',
          resume: null
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsResumeDialogOpen(open);
    if (!open) {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        coverLetter: '',
        resume: null
      });
    }
  };

  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      description: "Build and scale our property management platform using React, TypeScript, and modern web technologies."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote / New York, NY",
      type: "Full-time",
      description: "Create beautiful, intuitive user experiences that make property management effortless for our customers."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Austin, TX",
      type: "Full-time",
      description: "Help our customers succeed by providing exceptional support and building lasting relationships."
    },
    {
      title: "Sales Engineer",
      department: "Sales",
      location: "Remote / Chicago, IL",
      type: "Full-time",
      description: "Work with potential customers to understand their needs and demonstrate how PropertyFlow can help."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles, CA",
      type: "Full-time",
      description: "Drive growth through strategic marketing campaigns and content that resonates with property managers."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Ensure our infrastructure is scalable, reliable, and secure as we grow our platform."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance for you and your family"
    },
    {
      icon: Zap,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Professional development budget and opportunities for advancement"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment with regular team events and retreats"
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
        <div className="max-w-5xl mx-auto px-6">
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

          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extralight text-black mb-6 tracking-tight font-google-sans">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Help us build the future of property management. We're looking for talented, passionate people to join our mission.
            </p>
          </div>

          {/* Why Work With Us */}
          <section className="mb-20">
            <h2 className="text-3xl font-extralight text-black mb-8 text-center tracking-tight font-google-sans">
              Why PropertyFlow?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-black mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-extralight text-black tracking-tight font-google-sans">
                Open Positions
              </h2>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-light text-black mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-light">
                        <span className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {position.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="md:w-auto w-full rounded-full font-light"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, position: position.title }));
                        setIsResumeDialogOpen(true);
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">{position.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Don't See a Role? */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center">
              <h3 className="text-2xl font-light text-black mb-4">Don't See a Role That Fits?</h3>
              <p className="text-gray-600 leading-relaxed font-light mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. Send us your resume and let us know how you'd like to contribute.
              </p>
              <Button 
                className="rounded-full font-light px-8"
                onClick={() => setIsResumeDialogOpen(true)}
              >
                Send Us Your Resume
              </Button>
            </div>
          </section>

          {/* Resume Submission Dialog */}
          <Dialog open={isResumeDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <DialogTitle className="text-2xl font-light text-black mb-2">Application Submitted!</DialogTitle>
                  <DialogDescription className="text-gray-600 font-light">
                    Thank you for your interest in joining PropertyFlow. We'll review your application and get back to you soon.
                  </DialogDescription>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-light text-black">Send Us Your Resume</DialogTitle>
                    <DialogDescription className="text-gray-500 font-light">
                      Fill out the form below and we'll get back to you soon.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-black font-light">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="font-light"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-black font-light">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="font-light"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-black font-light">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          className="font-light"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-black font-light">
                          Position Interested In
                        </Label>
                        <Input
                          id="position"
                          name="position"
                          type="text"
                          value={formData.position}
                          onChange={handleInputChange}
                          placeholder="e.g., Software Engineer"
                          className="font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-black font-light">
                        Resume <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleFileChange}
                          className="font-light cursor-pointer"
                        />
                        {formData.resume && (
                          <div className="mt-2 flex items-center text-sm text-gray-600 font-light">
                            <Upload className="h-4 w-4 mr-2" />
                            {formData.resume.name}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-light mt-1">
                        Accepted formats: PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter" className="text-black font-light">
                        Cover Letter / Message
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you'd like to join PropertyFlow..."
                        rows={5}
                        className="font-light resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsResumeDialogOpen(false)}
                        className="flex-1 rounded-full font-light"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 rounded-full font-light"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Submitting...</span>
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>

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

export default Careers;

