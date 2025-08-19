# PropertyFlow Authentication System

## Overview

PropertyFlow uses Supabase for authentication, providing a secure and scalable solution for user management. The authentication system includes user registration, sign-in, profile management, and role-based access control.

## Features

- **User Registration**: Email/password signup with role selection (Owner, Tenant, Maintainer)
- **User Authentication**: Secure sign-in with email/password
- **Profile Management**: User profiles with role-based information
- **Protected Routes**: Authentication-based routing with automatic redirects
- **Session Management**: Persistent sessions with automatic token refresh
- **Role-Based Access**: Different user roles with appropriate permissions

## Architecture

### Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state throughout the application
   - Provides authentication methods (signIn, signUp, signOut)
   - Handles user profile data

2. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
   - Wraps routes that require authentication
   - Redirects unauthenticated users to sign-in page
   - Shows loading states during authentication checks

3. **LoadingSpinner** (`src/components/LoadingSpinner.tsx`)
   - Consistent loading UI component
   - Used during authentication state checks

4. **ErrorBoundary** (`src/components/ErrorBoundary.tsx`)
   - Catches and handles authentication errors gracefully
   - Provides user-friendly error messages

### Pages

1. **SignIn** (`src/pages/SignIn.tsx`)
   - User authentication form
   - Social login options (Google, Twitter)
   - Redirects to dashboard on success

2. **SignUp** (`src/pages/SignUp.tsx`)
   - User registration form
   - Role selection (Owner, Tenant, Maintainer)
   - Creates user profile in database

3. **Dashboard** (`src/pages/Dashboard.tsx`)
   - Protected route requiring authentication
   - Role-based content and actions
   - User profile management

## User Roles

### Property Owner (`homeowner`)
- Manage properties and units
- Handle tenant relationships
- View financial reports
- Manage maintenance requests

### Tenant (`tenant`)
- View rental information
- Submit maintenance requests
- Make rent payments
- Access lease documents

### Maintainer (`vendor`)
- Handle maintenance requests
- Update request status
- Upload invoices and photos
- Communicate with tenants

### Administrator (`admin`)
- Platform oversight
- User management
- System configuration
- Analytics and reporting

## Database Schema

The authentication system integrates with the following Supabase tables:

### `auth.users` (Supabase Auth)
- `id`: Unique user identifier
- `email`: User email address
- `email_confirmed_at`: Email verification timestamp
- `created_at`: Account creation timestamp

### `public.users` (Custom Profile)
- `id`: References auth.users.id
- `email`: User email
- `first_name`: User's first name
- `last_name`: User's last name
- `role`: User role (homeowner, tenant, vendor, admin)
- `is_active`: Account status
- `email_verified`: Email verification status
- `phone`: Optional phone number
- `created_at`: Profile creation timestamp
- `updated_at`: Last update timestamp

## Authentication Flow

### Sign Up Process
1. User fills out registration form
2. Supabase Auth creates user account
3. User profile is created in `public.users` table
4. Email verification is sent (if enabled)
5. User is redirected to sign-in page

### Sign In Process
1. User enters credentials
2. Supabase Auth validates credentials
3. User session is created
4. User profile is fetched from database
5. User is redirected to dashboard

### Session Management
- Sessions are stored in localStorage
- Automatic token refresh
- Persistent across browser sessions
- Automatic logout on token expiration

## Security Features

- **Password Requirements**: Enforced by Supabase Auth
- **Email Verification**: Optional but recommended
- **Session Security**: Secure token storage
- **CSRF Protection**: Built into Supabase
- **Rate Limiting**: Supabase Auth built-in protection

## Usage Examples

### Using the Auth Context

```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, profile, signIn, signOut } = useAuth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {profile?.first_name}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

### Protecting Routes

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Custom Loading States

```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

<LoadingSpinner size="lg" text="Authenticating..." />
```

## Configuration

### Environment Variables

The Supabase configuration is already set up in:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`

### Supabase Setup

1. Enable Email Auth in Supabase Dashboard
2. Configure email templates (optional)
3. Set up Row Level Security (RLS) policies
4. Configure authentication redirects

## Error Handling

The system includes comprehensive error handling:

- **Network Errors**: Graceful fallbacks and retry mechanisms
- **Authentication Errors**: User-friendly error messages
- **Validation Errors**: Form-level error display
- **System Errors**: Error boundary with development details

## Testing

### Manual Testing
1. Test user registration with different roles
2. Verify email verification flow
3. Test sign-in with valid/invalid credentials
4. Verify protected route access
5. Test session persistence

### Automated Testing
- Unit tests for authentication functions
- Integration tests for auth flows
- E2E tests for complete user journeys

## Troubleshooting

### Common Issues

1. **Authentication State Not Persisting**
   - Check localStorage settings
   - Verify Supabase client configuration

2. **Profile Not Loading**
   - Check database permissions
   - Verify RLS policies

3. **Sign Up Failing**
   - Check Supabase Auth settings
   - Verify email confirmation requirements

### Debug Mode

Enable debug logging by setting:
```typescript
const supabase = createClient(url, key, {
  auth: {
    debug: true
  }
});
```

## Future Enhancements

- **Social Authentication**: Google, Facebook, Apple
- **Multi-Factor Authentication**: SMS, TOTP
- **Password Reset**: Self-service password recovery
- **Account Linking**: Multiple authentication methods
- **Advanced Permissions**: Granular role-based access control
- **Audit Logging**: User action tracking
- **Session Management**: Multiple device support

## Support

For authentication-related issues:
1. Check Supabase Dashboard logs
2. Review browser console errors
3. Verify environment configuration
4. Check database permissions and RLS policies
