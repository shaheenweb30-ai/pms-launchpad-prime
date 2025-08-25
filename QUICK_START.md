# 🚀 Quick Start Guide - PropertyFlow Pro

## 🎯 **Goal: Enable Users to Access the Platform**

You want users to be able to access the platform using these credentials:
- **Admin**: admin@gmail.com | 123456
- **Owner**: owner@gmail.com | 123456  
- **Tenant**: tenant@gmail.com | 123456
- **Maintainer**: maintainer@gmail.com | 123456

## 🛠️ **Step-by-Step Setup**

### **Step 1: Access the Setup Page**
1. **Go to your homepage**: Navigate to your application
2. **Click "Setup Users"**: You'll see this link in the navigation bar
3. **Or go directly to**: `/create-users` in your browser

### **Step 2: Create the User Accounts**
1. **Click "Create Default Users"** button
2. **Wait for completion** - you'll see results for each user
3. **Verify creation** - use "Check User Status" to confirm

### **Step 3: Test User Access**
1. **Go to Sign-In page**: Navigate to `/signin`
2. **Click any credential row** (Admin, Owner, Tenant, Maintainer)
3. **Fields auto-fill** with email and password
4. **Click "Sign In"** to access the platform

## 🔑 **What Each User Can Access**

| User Type | Access Level | Main Features |
|-----------|--------------|---------------|
| **Admin** | Full System | All pages, user management, settings |
| **Owner** | Property Management | Dashboard, Properties, Tenants, Leases, Analytics |
| **Tenant** | Limited | Personal information, limited dashboard |
| **Maintainer** | Maintenance | Maintenance, Inspections, limited access |

## 🚨 **Troubleshooting**

### **If User Creation Fails:**
- Check browser console for error messages
- Verify Supabase connection in your `.env` file
- Ensure database permissions are set correctly

### **If Login Fails:**
- Verify users were created successfully
- Check if email verification is required
- Confirm password is exactly `123456`

### **If Access is Denied:**
- Check user role in database
- Verify `ProtectedRoute` permissions
- Ensure role enum values match

## 🔧 **Technical Details**

- **Authentication**: Supabase Auth
- **User Storage**: PostgreSQL database
- **Role Management**: Role-based access control
- **Session Management**: Automatic token refresh

## 📱 **Testing Different Roles**

1. **Create all users** using the setup page
2. **Test each role** by signing in with different credentials
3. **Verify permissions** work correctly for each user type
4. **Check navigation** and access to different pages

## 🎉 **Success Indicators**

✅ **Users created successfully** - All 4 users show "Created" status  
✅ **Login works** - Can sign in with any credential  
✅ **Role access works** - Different permissions for different users  
✅ **Platform accessible** - Can navigate to protected pages  

---

**Ready to test? Go to `/create-users` and start setting up your user accounts! 🚀**
