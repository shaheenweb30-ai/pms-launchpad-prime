import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const closeProfileDropdown = () => setIsProfileDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Features
            </button>
            <button 
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Benefits
            </button>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Pricing
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#a5afbe] hover:text-[#ed1c24] transition-colors duration-300 font-medium rounded-full px-4 py-2 hover:bg-[#f8f9fa]"
            >
              Contact
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-sm hover:opacity-80 transition-opacity cursor-pointer p-2 rounded-lg hover:bg-[#f8f9fa]"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {profile?.first_name?.[0] || user.email?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-[#231f20] font-medium">
                    {profile?.first_name || user.email}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#a5afbe] transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#a5afbe]/20 py-2 z-50">
                    <Link 
                      to="/dashboard" 
                      onClick={closeProfileDropdown}
                      className="flex items-center px-4 py-2 text-[#231f20] hover:bg-[#f8f9fa] transition-colors"
                    >
                      <User className="w-4 h-4 mr-3 text-[#a5afbe]" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        closeProfileDropdown();
                      }}
                      className="flex items-center w-full px-4 py-2 text-[#231f20] hover:bg-[#f8f9fa] transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-[#a5afbe]" />
                      Sign Out
                    </button>
                  </div>
                )}
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
              <button 
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
              >
                Benefits
              </button>
              <button 
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  closeMenu();
                }}
                className="block w-full text-left px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
              >
                Contact
              </button>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-[#a5afbe]/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <button
                        onClick={toggleProfileDropdown}
                        className="flex items-center w-full px-3 py-2 text-[#a5afbe] hover:text-[#ed1c24] hover:bg-[#f8f9fa] rounded-lg transition-colors font-medium"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#ed1c24] to-[#225fac] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-sm">
                            {profile?.first_name?.[0] || user.email?.[0] || 'U'}
                          </span>
                        </div>
                        <span className="text-[#231f20] font-medium">
                          {profile?.first_name || user.email}
                        </span>
                        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile Profile Dropdown */}
                      {isProfileDropdownOpen && (
                        <div className="mt-2 ml-4 bg-[#f8f9fa] rounded-lg py-2">
                          <Link 
                            to="/dashboard" 
                            onClick={() => {
                              closeProfileDropdown();
                              closeMenu();
                            }}
                            className="flex items-center px-3 py-2 text-[#231f20] hover:bg-[#ed1c24]/5 transition-colors rounded-lg mx-2"
                          >
                            <User className="w-4 h-4 mr-3 text-[#a5afbe]" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              handleSignOut();
                              closeProfileDropdown();
                              closeMenu();
                            }}
                            className="flex items-center w-full px-3 py-2 text-[#231f20] hover:bg-[#ed1c24]/5 transition-colors rounded-lg mx-2"
                          >
                            <LogOut className="w-4 h-4 mr-3 text-[#a5afbe]" />
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
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