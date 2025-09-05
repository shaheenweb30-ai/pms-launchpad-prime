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
      // Redirect based on user role
      if (profile.role === 'admin') {
        navigate('/admin-dashboard');
        return;
      }
      if (profile.role === 'homeowner') {
        navigate('/dashboard');
        return;
      }
      if (profile.role === 'tenant') {
        navigate('/tenant-dashboard');
        return;
      }
      if (profile.role === 'vendor') {
        navigate('/vendor-dashboard');
        return;
      }
      navigate('/');
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Back to Home */}
      <div className="text-center mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-500 hover:text-black transition-colors font-light text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to PropertyFlow
        </Link>
      </div>
      
      {/* Main Content Container */}
      <div className="w-full max-w-lg">
        {/* Logo and Title */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-extralight text-black mb-4 tracking-tight font-google-sans">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Sign in to your PropertyFlow account
          </p>
        </div>
        
        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block text-sm font-light text-gray-600 mb-3">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-14 border-gray-200 focus:border-black focus:ring-black rounded-2xl text-base font-light px-6"
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Password Field */}
          <div>
            <Label htmlFor="password" className="block text-sm font-light text-gray-600 mb-3">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="h-14 border-gray-200 focus:border-black focus:ring-black rounded-2xl text-base font-light px-6 pr-12"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer font-light">
                Remember me
              </Label>
            </div>
            <Link 
              to="/forgot-password" 
              className="text-sm text-gray-600 hover:text-black transition-colors font-light"
            >
              Forgot password?
            </Link>
          </div>
          
          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white font-light rounded-2xl transition-colors mt-8"
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
        
        {/* Credentials for Quick Access */}
        <div className="mt-8 p-6 bg-gray-50 rounded-3xl border-0">
          <div className="space-y-3 text-sm">
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-white p-3 rounded-2xl transition-colors duration-200"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'admin@gmail.com',
                  password: '123456'
                });
              }}
            >
              <span className="font-light text-gray-700">Admin:</span>
              <span className="text-gray-500 font-light">admin@gmail.com | 123456</span>
            </div>
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-white p-3 rounded-2xl transition-colors duration-200"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'owner@gmail.com',
                  password: '123456'
                });
              }}
            >
              <span className="font-light text-gray-700">Owner:</span>
              <span className="text-gray-500 font-light">owner@gmail.com | 123456</span>
            </div>
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-white p-3 rounded-2xl transition-colors duration-200"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'tenant@gmail.com',
                  password: '123456'
                });
              }}
            >
              <span className="font-light text-gray-700">Tenant:</span>
              <span className="text-gray-500 font-light">tenant@gmail.com | 123456</span>
            </div>
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-white p-3 rounded-2xl transition-colors duration-200"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'maintainer@gmail.com',
                  password: '123456'
                });
              }}
            >
              <span className="font-light text-gray-700">Maintainer:</span>
              <span className="text-gray-500 font-light">maintainer@gmail.com | 123456</span>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400 font-light">or</span>
          </div>
        </div>
        
        {/* Social Sign In */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-14 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl transition-colors font-light"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-14 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl transition-colors font-light"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            Continue with Twitter
          </Button>
        </div>
        
        {/* Sign Up Link */}
        <div className="text-center pt-8">
          <p className="text-gray-400 text-sm font-light">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-black hover:text-gray-600 font-light transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
        
        {/* Footer Links */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-black transition-colors font-light">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-black transition-colors font-light">
              Terms of Service
            </Link>
            <Link to="/help" className="hover:text-black transition-colors font-light">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
