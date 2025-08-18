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
      description: t('features.portfolio.description')
    },
    {
      icon: Users,
      title: t('features.tenant.title'),
      description: t('features.tenant.description')
    },
    {
      icon: Calendar,
      title: t('features.maintenance.title'),
      description: t('features.maintenance.description')
    },
    {
      icon: CreditCard,
      title: t('features.payments.title'),
      description: t('features.payments.description')
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: Smartphone,
      title: t('features.mobile.title'),
      description: t('features.mobile.description')
    },
    {
      icon: Zap,
      title: t('features.automation.title'),
      description: t('features.automation.description')
    }
  ];
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 animate-scale-in border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;