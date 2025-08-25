# 🚀 User Setup Guide for PropertyFlow Pro

## 🔐 **Default User Accounts**

The system comes with pre-configured user accounts for testing purposes. These accounts are designed to demonstrate different user roles and permissions.

### **Available User Types**

| Role | Email | Password | Description |
|------|--------|----------|-------------|
| **Admin** | `admin@gmail.com` | `123456` | Full system access, can manage all users and settings |
| **Owner** | `owner@gmail.com` | `123456` | Property owner with access to property management features |
| **Tenant** | `tenant@gmail.com` | `123456` | Tenant user with limited access to their own information |
| **Maintainer** | `maintainer@gmail.com` | `123456` | Vendor/maintenance staff with access to maintenance features |

## 🛠️ **Setting Up User Accounts**

### **Option 1: Use the Admin Panel (Recommended)**

1. **Sign in as Admin**: Use `admin@gmail.com` with password `123456`
2. **Navigate to Admin Panel**: Go to `/admin-panel` in your browser
3. **Create Default Users**: Click the "Create Default Users" button
4. **Verify Creation**: Use "Check User Status" to confirm all users were created

### **Option 2: Manual Creation via Supabase Dashboard**

1. **Access Supabase Dashboard**: Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Select Your Project**: Choose your PropertyFlow Pro project
3. **Navigate to Authentication**: Go to Authentication > Users
4. **Add Users Manually**: Create each user with the credentials above

### **Option 3: Programmatic Creation**

Use the utility functions in `src/utils/createDefaultUsers.ts`:

```typescript
import { createDefaultUsers, checkDefaultUsers } from '@/utils/createDefaultUsers';

// Create all default users
const results = await createDefaultUsers();

// Check user status
const status = await checkDefaultUsers();
```

## 🔑 **Quick Access from Sign-In Page**

The sign-in page includes clickable credential rows that automatically fill in the email and password fields:

1. **Click any user type** (Admin, Owner, Tenant, Maintainer)
2. **Fields auto-fill** with the corresponding credentials
3. **Click "Sign In"** to authenticate

## 🚨 **Important Security Notes**

- **Default passwords are for testing only**
- **Change passwords in production**
- **Use strong, unique passwords for real users**
- **Consider implementing password policies**

## 🔧 **Troubleshooting**

### **User Creation Fails**

- Check Supabase connection
- Verify database permissions
- Check console for error messages
- Ensure email verification is properly configured

### **Login Issues**

- Verify user exists in Supabase
- Check if email verification is required
- Confirm password is correct
- Check browser console for errors

### **Role-Based Access Issues**

- Verify user role is set correctly in database
- Check `ProtectedRoute` component permissions
- Ensure role enum values match database schema

## 📱 **Testing Different User Roles**

1. **Admin Role**: Full access to all features
2. **Owner Role**: Access to property management, tenants, leases
3. **Tenant Role**: Limited access to personal information
4. **Maintainer Role**: Access to maintenance and inspection features

## 🔄 **Resetting Users**

To reset all users to default state:

1. **Delete existing users** from Supabase Authentication
2. **Clear user profiles** from the `users` table
3. **Re-run user creation** via Admin Panel

## 📞 **Support**

If you encounter issues:

1. Check the browser console for error messages
2. Verify Supabase configuration
3. Check database connection and permissions
4. Review the authentication flow in `AuthContext.tsx`

---

**Happy Testing! 🎉**
