import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X, User, Users, Wrench, DollarSign, BarChart3, Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of PropertyFlow.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#a5afbe]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-xl flex items-center justify-center text-white font-bold text-lg lg:text-xl group-hover:opacity-80 transition-opacity">
              PF
            </div>
            <span className="text-xl lg:text-2xl font-bold text-[#231f20]">PropertyFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/#features" 
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Features
            </Link>
            <Link 
              to="/#benefits" 
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Benefits
            </Link>
            <Link 
              to="/#pricing" 
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Pricing
            </Link>
            <Link 
              to="/#contact" 
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/tenants">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <Users className="w-4 h-4 mr-2" />
                    Tenants
                  </Button>
                </Link>
                <Link to="/maintenance">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <Wrench className="w-4 h-4 mr-2" />
                    Maintenance
                  </Button>
                </Link>
                <Link to="/financials">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Financials
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Reports
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {profile?.first_name?.[0] || user.email?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-[#231f20] font-medium">
                    {profile?.first_name || user.email}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" className="border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button className="bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full">
                    Get Demo
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-[#a5afbe]/20 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/#features" 
                className="block px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link 
                to="/#benefits" 
                className="block px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
                onClick={closeMenu}
              >
                Benefits
              </Link>
              <Link 
                to="/#pricing" 
                className="block px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/#contact" 
                className="block px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
                onClick={closeMenu}
              >
                Contact
              </Link>
              
                             {/* Mobile Auth Section */}
               <div className="pt-4 border-t border-[#a5afbe]/20">
                 {user ? (
                   <div className="space-y-3">
                     <Link to="/dashboard" onClick={closeMenu}>
                       <Button variant="outline" className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                         <User className="w-4 h-4 mr-2" />
                         Dashboard
                       </Button>
                     </Link>
                     <div className="flex items-center space-x-3 px-3 py-2">
                       <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                         <span className="text-white font-medium text-sm">
                           {profile?.first_name?.[0] || user.email?.[0] || 'U'}
                         </span>
                       </div>
                       <span className="text-[#231f20] font-medium">
                         {profile?.first_name || user.email}
                       </span>
                     </div>
                     <Button
                       onClick={() => {
                         handleSignOut();
                         closeMenu();
                       }}
                       variant="outline"
                       className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full"
                     >
                       <LogOut className="w-4 h-4 mr-2" />
                       Sign Out
                     </Button>
                   </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/signin" onClick={closeMenu}>
                      <Button variant="outline" className="w-full border-[#a5afbe]/30 hover:border-[#ed1c24] hover:bg-[#ed1c24]/5 text-[#231f20] rounded-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/demo" onClick={closeMenu}>
                      <Button className="w-full bg-gradient-to-r from-[#ed1c24] to-[#225fac] hover:from-[#d41920] hover:to-[#1e4f9a] text-white rounded-full">
                        Get Demo
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;