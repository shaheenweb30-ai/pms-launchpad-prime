import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslation } from 'react-i18next';

const PricingSection = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      name: t('pricing.starter.name'),
      price: "$49",
      period: "/month",
      description: t('pricing.starter.description'),
      features: [
        t('pricing.starter.features.1'),
        t('pricing.starter.features.2'),
        t('pricing.starter.features.3'),
        t('pricing.starter.features.4')
      ],
      popular: false
    },
    {
      name: t('pricing.professional.name'),
      price: "$99", 
      period: "/month",
      description: t('pricing.professional.description'),
      features: [
        t('pricing.professional.features.1'),
        t('pricing.professional.features.2'),
        t('pricing.professional.features.3'),
        t('pricing.professional.features.4'),
        t('pricing.professional.features.5')
      ],
      popular: true
    },
    {
      name: t('pricing.enterprise.name'),
      price: "Custom",
      period: "",
      description: t('pricing.enterprise.description'),
      features: [
        t('pricing.enterprise.features.1'),
        t('pricing.enterprise.features.2'),
        t('pricing.enterprise.features.3'),
        t('pricing.enterprise.features.4'),
        t('pricing.enterprise.features.5'),
        t('pricing.enterprise.features.6')
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {t('pricing.monthly')}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {t('pricing.annually')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all duration-300 hover:shadow-elegant hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-primary bg-gradient-to-b from-primary/5 to-background' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-8 ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-elegant' 
                      : 'variant-outline'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === t('pricing.enterprise.name') ? t('pricing.contactSales') : t('pricing.getStarted')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;