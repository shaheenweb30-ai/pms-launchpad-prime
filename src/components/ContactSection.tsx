import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Property Management?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with a personalized demo or contact our team to learn how 
            PropertyFlow can streamline your operations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-gradient shadow-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get Your Free Demo
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john@propertycompany.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Company Name
                  </label>
                  <Input placeholder="Property Management Inc." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Number of Properties
                  </label>
                  <Input placeholder="e.g., 50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message (Optional)
                  </label>
                  <Textarea 
                    placeholder="Tell us about your current property management challenges..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300">
                  Schedule Demo
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email Us</h4>
                  <p className="text-muted-foreground">sales@propertyflow.com</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Call Us</h4>
                  <p className="text-muted-foreground">1-800-PROPERTY</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Visit Us</h4>
                  <p className="text-muted-foreground">123 Property St, Business District</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/80 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Live Chat</h4>
                  <p className="text-muted-foreground">Available 24/7 for support</p>
                </div>
              </div>
            </Card>
            
            <div className="bg-gradient-hero rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">
                Ready to Get Started?
              </h4>
              <p className="text-white/80 mb-4">
                Join hundreds of property managers who have transformed their business with PropertyFlow.
              </p>
              <Button variant="secondary" className="w-full">
                Start Free Trial Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;