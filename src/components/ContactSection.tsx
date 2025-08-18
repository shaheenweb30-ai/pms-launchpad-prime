import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.description')}
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
                      {t('contact.form.name')}
                    </label>
                    <Input placeholder={t('contact.form.name')} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.email')}
                  </label>
                  <Input type="email" placeholder={t('contact.form.email')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.company')}
                  </label>
                  <Input placeholder={t('contact.form.company')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.properties')}
                  </label>
                  <Input placeholder={t('contact.form.properties')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder={t('contact.form.message')}
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full bg-gradient-primary hover:shadow-hover transition-all duration-300">
                  {t('contact.form.submit')}
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
                  <h4 className="font-semibold text-foreground">{t('contact.details.email')}</h4>
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
                  <h4 className="font-semibold text-foreground">{t('contact.details.phone')}</h4>
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
                  <h4 className="font-semibold text-foreground">{t('contact.details.address')}</h4>
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
                  <h4 className="font-semibold text-foreground">{t('contact.details.chat')}</h4>
                  <p className="text-muted-foreground">Available 24/7 for support</p>
                </div>
              </div>
            </Card>
            
            <div className="bg-gradient-hero rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-2">
                {t('contact.trial.title')}
              </h4>
              <p className="text-white/80 mb-4">
                {t('contact.trial.description')}
              </p>
              <Button variant="secondary" className="w-full">
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