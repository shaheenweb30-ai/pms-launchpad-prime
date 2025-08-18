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

const features = [
  {
    icon: Building2,
    title: "Property Portfolio Management",
    description: "Manage multiple properties from a single dashboard with comprehensive overview and controls."
  },
  {
    icon: Users,
    title: "Tenant Management",
    description: "Streamline tenant screening, lease management, and communication in one unified system."
  },
  {
    icon: Calendar,
    title: "Maintenance Scheduling",
    description: "Automated maintenance reminders and work order management to keep properties in perfect condition."
  },
  {
    icon: CreditCard,
    title: "Financial Tracking",
    description: "Complete rent collection, expense tracking, and financial reporting for better profitability insights."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Data-driven insights with customizable reports to optimize your property management strategy."
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Bank-level security with automated compliance tracking and document management."
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Full-featured mobile app for property managers and tenants to access everything on the go."
  },
  {
    icon: Zap,
    title: "Automation Tools",
    description: "Automate repetitive tasks like rent reminders, lease renewals, and maintenance notifications."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need to efficiently manage 
            your property portfolio and deliver exceptional tenant experiences.
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