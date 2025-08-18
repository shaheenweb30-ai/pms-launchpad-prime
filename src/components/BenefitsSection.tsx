import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Clock, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Optimize rent collection and reduce vacancy rates",
    metric: "Average 15% increase in NOI"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate routine tasks and streamline operations",
    metric: "Save 20+ hours per week"
  },
  {
    icon: CheckCircle,
    title: "Improve Satisfaction", 
    description: "Better tenant communication and faster response times",
    metric: "98% tenant satisfaction rate"
  },
  {
    icon: DollarSign,
    title: "Reduce Costs",
    description: "Lower maintenance costs through predictive analytics",
    metric: "Cut expenses by 25%"
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proven Results for Property Managers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of property managers who have transformed their operations 
            and achieved measurable results with our platform.
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
            Trusted by Property Management Professionals
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80">Properties Managed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-white/80">Tenant Interactions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">$2M+</div>
              <div className="text-white/80">Monthly Rent Processed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
              <div className="text-white/80">System Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;