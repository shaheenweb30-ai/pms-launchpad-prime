import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useTranslation } from 'react-i18next';

const BenefitsSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: TrendingUp,
      title: t('benefits.revenue.title'),
      description: t('benefits.revenue.description'),
      metric: t('benefits.revenue.metric')
    },
    {
      icon: Clock,
      title: t('benefits.time.title'),
      description: t('benefits.time.description'),
      metric: t('benefits.time.metric')
    },
    {
      icon: CheckCircle,
      title: t('benefits.satisfaction.title'), 
      description: t('benefits.satisfaction.description'),
      metric: t('benefits.satisfaction.metric')
    },
    {
      icon: DollarSign,
      title: t('benefits.costs.title'),
      description: t('benefits.costs.description'),
      metric: t('benefits.costs.metric')
    }
  ];
  return (
    <section id="benefits" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('benefits.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="text-center hover:shadow-elegant transition-all duration-300 card-gradient border-border/50"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {benefit.description}
                </p>
                <div className="text-lg font-bold text-primary">
                  {benefit.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 bg-gradient-hero rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {t('benefits.stats.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80">{t('benefits.stats.properties')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-white/80">{t('benefits.stats.managers')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
              <div className="text-white/80">{t('benefits.stats.uptime')}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">25+</div>
              <div className="text-white/80">{t('benefits.stats.countries')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;