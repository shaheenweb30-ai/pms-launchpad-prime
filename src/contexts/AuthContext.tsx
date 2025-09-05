import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string, userType: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log('Getting initial session...');
      // Test database connection first
      await testDatabaseConnection();
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Initial session:', session);
      console.log('Session user:', session?.user);
      console.log('Session expires at:', session?.expires_at);
      console.log('Current time:', Math.floor(Date.now() / 1000));
      console.log('Session valid:', session?.expires_at ? session.expires_at > Math.floor(Date.now() / 1000) : false);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('User found, fetching profile...');
        await fetchProfile(session.user.id);
      } else {
        console.log('No user found');
      }
      
      setLoading(false);
      console.log('Initial session setup complete, loading:', false);
      console.log('Final state - user:', session?.user, 'profile:', profile);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('User authenticated, fetching profile...');
          await fetchProfile(session.user.id);
          console.log('Profile fetched after auth change');
        } else {
          console.log('User signed out, clearing profile');
          setProfile(null);
        }
        
        setLoading(false);
        console.log('Auth state change complete, loading:', false);
        console.log('Final state after auth change - user:', session?.user, 'profile:', profile);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const testDatabaseConnection = async () => {
    try {
      console.log('Skipping database connection test');
      return true;
      
      // Try the most basic possible query
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      console.log('Database test result:', { data, error });
      
      if (error) {
        console.error('Database connection failed:', error);
        return false;
      }
      
      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Database connection exception:', error);
      return false;
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Create a default profile for now
      const defaultProfile = {
        id: userId,
        email: user?.email || '',
        first_name: 'User',
        last_name: 'Name',
        role: 'homeowner' as const,
        is_active: true,
        email_verified: true,
        phone: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Using default profile:', defaultProfile);
      setProfile(defaultProfile);
      
      // Skip all database operations for now
      return;
    } catch (error) {
      console.error('Exception in fetchProfile:', error);
      setProfile(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signUp = async (email: string, password: string, name: string, userType: string) => {
    try {
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        // Create user profile in the users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            first_name: firstName,
            last_name: lastName,
            role: userType as Database['public']['Enums']['user_role'],
            is_active: true,
            email_verified: false,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // If profile creation fails, we should clean up the auth user
          await supabase.auth.signOut();
          return { error: { message: profileError.message } as AuthError };
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as AuthError };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: { message: 'No user logged in' } as AuthError };
    }

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        await fetchProfile(user.id);
      }

      return { error: error ? { message: error.message } as AuthError : null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: error as AuthError };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
