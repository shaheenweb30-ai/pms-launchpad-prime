import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { createDefaultUsers } from '@/utils/createDefaultUsers';

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
      
      // Ensure default users exist (run in background to avoid blocking)
      createDefaultUsers().catch(error => {
        console.error('Error creating default users:', error);
      });
      
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
        await fetchProfile(session.user.id, session.user.email || undefined);
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
          try {
            await fetchProfile(session.user.id, session.user.email || undefined);
            console.log('Profile fetched after auth change');
          } catch (error) {
            console.error('Error fetching profile in auth state change:', error);
            setLoading(false);
          }
        } else {
          console.log('User signed out, clearing profile');
          setProfile(null);
          setLoading(false);
        }
        
        // Don't set loading to false here - let fetchProfile handle it
        // setLoading(false);
        console.log('Auth state change complete');
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const testDatabaseConnection = async () => {
    try {
      console.log('Testing database connection...');
      
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

  const fetchProfile = async (userId: string, emailFromSession?: string) => {
    try {
      console.log('Fetching profile for user:', userId, 'email:', emailFromSession);
      
      // Determine role from email first (for fallback)
      const emailLower = (emailFromSession || user?.email || '').toLowerCase();
      let inferredRole: Database['public']['Enums']['user_role'] = 'homeowner';
      if (emailLower === 'admin@gmail.com') inferredRole = 'admin';
      else if (emailLower === 'owner@gmail.com') inferredRole = 'homeowner';
      else if (emailLower === 'tenant@gmail.com') inferredRole = 'tenant';
      else if (emailLower === 'maintainer@gmail.com') inferredRole = 'vendor';
      
      // Create a fallback profile immediately (will be used if query fails or times out)
      const [firstName, ...lastNameParts] = (emailFromSession || user?.email || 'user').split('@')[0].split('.');
      const lastName = lastNameParts.join(' ') || 'User';
      
      const fallbackProfile: UserProfile = {
        id: userId,
        email: emailFromSession || user?.email || '',
        first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        role: inferredRole,
        is_active: true,
        email_verified: true,
        phone: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Set a timeout - if query takes too long, use fallback
      const timeoutId = setTimeout(() => {
        console.log('Profile query timeout, using fallback profile');
        setProfile(fallbackProfile);
        setLoading(false);
      }, 3000);
      
      // First, try to fetch from database
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      clearTimeout(timeoutId); // Clear timeout if query completes
      
      console.log('Profile query result:', { profileData, profileError, hasData: !!profileData, hasError: !!profileError });
      
      if (profileData && !profileError) {
        console.log('Profile found in database:', profileData);
        console.log('Setting profile state...');
        setProfile(profileData);
        setLoading(false); // Ensure loading is set to false when profile is found
        console.log('Profile set successfully, loading set to false');
        return;
      }
      
      // Log if there was an error fetching
      if (profileError) {
        console.log('Profile query error (will create new profile):', profileError.message, profileError);
      } else {
        console.log('No profile found in database, will create new one');
      }
      
      // If profile doesn't exist, create it
      console.log('Profile not found, creating default profile...');
      
      console.log('Creating profile:', fallbackProfile);
      
      // Insert the profile into the database
      const { data: insertedProfile, error: insertError } = await supabase
        .from('users')
        .insert(fallbackProfile)
        .select()
        .single();
      
      console.log('Profile insert result:', { insertedProfile, insertError });
      
      if (insertError) {
        console.error('Error creating profile in database:', insertError);
        // Fallback to local profile if database insert fails
        console.log('Using fallback profile (database insert failed):', fallbackProfile);
        setProfile(fallbackProfile);
        setLoading(false);
        console.log('Fallback profile set, loading set to false');
      } else if (insertedProfile) {
        console.log('Profile created successfully:', insertedProfile);
        console.log('Setting inserted profile...');
        setProfile(insertedProfile);
        setLoading(false);
        console.log('Inserted profile set, loading set to false');
      } else {
        // No inserted profile and no error - use fallback
        console.log('No inserted profile returned, using fallback');
        setProfile(fallbackProfile);
        setLoading(false);
      }
      
      console.log('fetchProfile complete');
    } catch (error) {
      console.error('Exception in fetchProfile:', error);
      // Create a fallback profile even on error
      const emailLower = (emailFromSession || user?.email || '').toLowerCase();
      let inferredRole: Database['public']['Enums']['user_role'] = 'homeowner';
      if (emailLower === 'admin@gmail.com') inferredRole = 'admin';
      else if (emailLower === 'owner@gmail.com') inferredRole = 'homeowner';
      else if (emailLower === 'tenant@gmail.com') inferredRole = 'tenant';
      else if (emailLower === 'maintainer@gmail.com') inferredRole = 'vendor';
      
      const fallbackProfile = {
        id: userId,
        email: emailFromSession || user?.email || '',
        first_name: 'User',
        last_name: 'Name',
        role: inferredRole,
        is_active: true,
        email_verified: true,
        phone: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setProfile(fallbackProfile as UserProfile);
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        // Provide more helpful error messages
        if (error.message.includes('Invalid login credentials')) {
          return { 
            error: { 
              ...error, 
              message: 'Invalid email or password. Please check your credentials and try again.' 
            } as AuthError 
          };
        }
        if (error.message.includes('Email not confirmed')) {
          return { 
            error: { 
              ...error, 
              message: 'Please verify your email address before signing in. Check your inbox for a verification email.' 
            } as AuthError 
          };
        }
        return { error };
      }

      if (data.user) {
        console.log('Sign in successful, fetching profile for user:', data.user.id);
        // Fetch profile immediately after successful sign-in
        await fetchProfile(data.user.id, data.user.email || undefined);
        console.log('Profile fetched in signIn function');
      }

      return { error: null };
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
