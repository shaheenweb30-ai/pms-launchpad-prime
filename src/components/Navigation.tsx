import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PropertyFlow
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Benefits
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
              Get Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;