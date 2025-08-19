import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Building2, Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn, profile, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Watch for profile changes and redirect accordingly
  useEffect(() => {
    if (user && profile && !loading) {
      console.log('Profile loaded, redirecting...', profile.role);
      if (profile.role === 'homeowner') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, loading, navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting sign in...'); // Debug log
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Sign in error:', error); // Debug log
        toast({
          title: "Sign in failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        console.log('Sign in successful, waiting for profile...'); // Debug log
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in to PropertyFlow.",
        });
        // Don't redirect here - let useEffect handle it when profile loads
      }
    } catch (error) {
      console.error('Unexpected error during sign in:', error); // Debug log
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8eaed]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(237,28,36,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,95,172,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      {/* Main Content Container - Centered */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Back to Home - Centered */}
        <div className="text-center mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        {/* Logo and Title - Centered */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#231f20] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#a5afbe] text-sm">
            Sign in to your PropertyFlow account
          </p>
        </div>
        
        {/* Sign In Form Card - Centered */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mx-auto">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-[#231f20]">
              Sign In
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#231f20]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a5afbe]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#231f20]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a5afbe]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-12 h-12 border-[#a5afbe]/30 focus:border-[#ed1c24] focus:ring-[#ed1c24] rounded-full text-sm"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                    className="border-[#a5afbe]/30 data-[state=checked]:bg-[#ed1c24] data-[state=checked]:border-[#ed1c24]"
                    disabled={isLoading}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-[#231f20] cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-[#ed1c24] hover:text-[#d41920] transition-colors duration-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              
              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                )}
              </Button>
            </form>
            
            {/* Divider */}
            <div className="relative">
              <Separator className="bg-[#a5afbe]/20" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[#a5afbe] text-sm">
                or
              </span>
            </div>
            
            {/* Social Sign In */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full transition-all duration-300"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12 border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full transition-all duration-300"
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Continue with Twitter
              </Button>
            </div>
            
            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-[#a5afbe] text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-[#ed1c24] hover:text-[#d41920] font-semibold transition-colors duration-300"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer Links - Centered */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-6 text-xs text-[#a5afbe]">
            <Link to="/privacy" className="hover:text-[#ed1c24] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#ed1c24] transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/help" className="hover:text-[#ed1c24] transition-colors duration-300">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
