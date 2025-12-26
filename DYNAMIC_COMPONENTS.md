# Dynamic Components in PropertyFlow Project

This document lists all dynamic components that change based on user data, state, API responses, or user interactions.

## 🔄 Core Dynamic Components

### 1. **ProtectedLayout** (`src/components/ProtectedLayout.tsx`)
- **Dynamic Behavior**: 
  - Sidebar navigation changes based on user role (admin, homeowner, tenant, vendor)
  - Profile dropdown state management
  - Active route highlighting
  - RTL/LTR layout switching based on language
- **State Management**: `useState` for dropdown, `useAuth` for user data

### 2. **Navigation** (`src/components/Navigation.tsx`)
- **Dynamic Behavior**:
  - Shows/hides auth buttons based on user authentication status
  - Profile dropdown with user info
  - Mobile menu toggle
  - Language switcher integration
- **State Management**: `useState` for menu/dropdown states, `useAuth` for user

### 3. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
- **Dynamic Behavior**:
  - Route protection based on authentication status
  - Role-based access control
  - Redirects based on user role
- **State Management**: `useAuth` for user/profile checking

### 4. **LanguageSwitcher** (`src/components/LanguageSwitcher.tsx`)
- **Dynamic Behavior**:
  - Language selection dropdown
  - Updates UI language dynamically
  - RTL/LTR direction switching
- **State Management**: `useTranslation` hook

### 5. **AdminPanel** (`src/components/AdminPanel.tsx`)
- **Dynamic Behavior**:
  - Creates default users dynamically
  - Checks user existence
  - Shows results based on API responses
  - Loading states for async operations
- **State Management**: `useState` for loading states and results

---

## 📄 Dynamic Page Components

### Dashboard Pages

#### 6. **Dashboard** (`src/pages/Dashboard.tsx`)
- **Dynamic Behavior**:
  - Loads property/tenant/revenue data from localStorage
  - Real-time statistics calculation
  - Recent activity feed
  - Upcoming tasks list
  - Auto-refresh on window focus
  - Redirects admin users to admin dashboard
- **State Management**: Multiple `useState` hooks for data, `useEffect` for data loading

#### 7. **AdminDashboard** (`src/pages/AdminDashboard.tsx`)
- **Dynamic Behavior**:
  - Admin-specific statistics
  - User management data
  - System metrics
  - Dynamic data loading from Supabase
- **State Management**: `useState` for data, `useEffect` for fetching

#### 8. **TenantDashboard** (`src/pages/TenantDashboard.tsx`)
- **Dynamic Behavior**:
  - Tenant-specific data loading
  - Maintenance requests display
  - Payment history
  - Recent activities
  - Submit request modal
- **State Management**: Multiple `useState` hooks

#### 9. **VendorDashboard** (`src/pages/VendorDashboard.tsx`)
- **Dynamic Behavior**:
  - Vendor-specific tasks
  - Work history
  - Payment tracking
  - Dynamic data loading
- **State Management**: `useState` for data management

---

### Property Management Pages

#### 10. **Properties** (`src/pages/Properties.tsx`)
- **Dynamic Behavior**:
  - Property list with CRUD operations
  - Search and filter functionality
  - Grid/List view toggle
  - Property analytics modal
  - Portfolio analytics
  - Image upload and management
  - Export to PDF
  - Property limit tracking
- **State Management**: Extensive `useState` for forms, modals, filters, view modes

#### 11. **Tenants** (`src/pages/Tenants.tsx`)
- **Dynamic Behavior**:
  - Tenant list management
  - Add/Edit/Delete tenants
  - Search and filter
  - Tenant details modal
  - Property assignment
  - Payment tracking
- **State Management**: Multiple `useState` hooks for tenant data and modals

#### 12. **Lease** (`src/pages/Lease.tsx`)
- **Dynamic Behavior**:
  - Lease management
  - Create/Edit/Delete leases
  - Lease document upload
  - Payment tracking per lease
  - Auto-renewal settings
- **State Management**: `useState` for lease data and forms

---

### Financial Pages

#### 13. **RentCollection** (`src/pages/RentCollection.tsx`)
- **Dynamic Behavior**:
  - Payment tracking
  - Payment status updates
  - Payment history
  - Late payment alerts
  - Revenue calculations
- **State Management**: `useState` for payment data

#### 14. **PaymentHistory** (`src/pages/PaymentHistory.tsx`)
- **Dynamic Behavior**:
  - Payment transaction list
  - Filter by date/status
  - Payment details
  - Export functionality
- **State Management**: `useState` for payment data and filters

#### 15. **Expenses** (`src/pages/Expenses.tsx`)
- **Dynamic Behavior**:
  - Expense tracking
  - Category management
  - Expense reports
  - Budget tracking
- **State Management**: `useState` for expense data

#### 16. **Reports** (`src/pages/Reports.tsx`)
- **Dynamic Behavior**:
  - Financial reports generation
  - Custom date ranges
  - Report export
  - Chart visualizations
- **State Management**: `useState` for report data and filters

---

### Maintenance Pages

#### 17. **Maintenance** (`src/pages/Maintenance.tsx`)
- **Dynamic Behavior**:
  - Maintenance request management
  - Status updates
  - Vendor assignment
  - Request filtering
  - Priority management
- **State Management**: `useState` for requests and filters

#### 18. **MaintenanceRequests** (`src/pages/MaintenanceRequests.tsx`)
- **Dynamic Behavior**:
  - Tenant maintenance request submission
  - Request status tracking
  - Photo uploads
  - Request history
- **State Management**: `useState` for requests and forms

#### 19. **MaintenanceTasks** (`src/pages/MaintenanceTasks.tsx`)
- **Dynamic Behavior**:
  - Vendor task management
  - Task status updates
  - Invoice uploads
  - Work completion tracking
- **State Management**: `useState` for tasks

#### 20. **TenantMaintenance** (`src/pages/TenantMaintenance.tsx`)
- **Dynamic Behavior**:
  - Tenant maintenance view
  - Request submission
  - Status tracking
- **State Management**: `useState` for maintenance data

---

### Communication Pages

#### 21. **Chat** (`src/pages/Chat.tsx`)
- **Dynamic Behavior**:
  - Real-time messaging
  - Message history
  - User presence
  - File attachments
- **State Management**: `useState` for messages and chat state

#### 22. **TenantChat** (`src/pages/TenantChat.tsx`)
- **Dynamic Behavior**:
  - Tenant-specific chat
  - Property manager communication
- **State Management**: `useState` for chat data

#### 23. **VendorChat** (`src/pages/VendorChat.tsx`)
- **Dynamic Behavior**:
  - Vendor communication
  - Task-related messaging
- **State Management**: `useState` for chat data

---

### Admin Pages

#### 24. **AdminPricingManagement** (`src/pages/AdminPricingManagement.tsx`)
- **Dynamic Behavior**:
  - CRUD operations for pricing plans
  - Plan activation/deactivation
  - Feature management
  - Plan ordering
  - Dynamic form handling
  - Real-time data loading from Supabase
- **State Management**: `useState` for plans, forms, modals, loading states

#### 25. **AdminAccessControl** (`src/pages/AdminAccessControl.tsx`)
- **Dynamic Behavior**:
  - Page access control management
  - Role-based permissions
  - Dynamic permission updates
- **State Management**: `useState` for permissions

---

### Public Pages

#### 26. **Pricing** (`src/pages/Pricing.tsx`)
- **Dynamic Behavior**:
  - Loads pricing plans from Supabase
  - Monthly/Annual billing toggle
  - Fallback plans if database fails
  - Dynamic plan display
  - Mobile menu toggle
- **State Management**: `useState` for plans, billing period, loading state

#### 27. **Index** (`src/pages/Index.tsx`)
- **Dynamic Behavior**:
  - Infinite scroll testimonials
  - FAQ accordion
  - Mobile menu
  - Smooth scrolling
  - Dynamic content loading
- **State Management**: `useState` for menu, FAQ state, scroll refs

#### 28. **SignIn** (`src/pages/SignIn.tsx`)
- **Dynamic Behavior**:
  - Form validation
  - Authentication state management
  - Role-based redirects
  - Loading states
  - Error handling
- **State Management**: `useState` for form data, `useAuth` for auth state

#### 29. **SignUp** (`src/pages/SignUp.tsx`)
- **Dynamic Behavior**:
  - Registration form
  - Form validation
  - User creation
  - Email verification flow
- **State Management**: `useState` for form data and validation

---

### Other Dynamic Pages

#### 30. **Analytics** (`src/pages/Analytics.tsx`)
- **Dynamic Behavior**:
  - Property analytics
  - Financial charts
  - Performance metrics
  - Custom date ranges
- **State Management**: `useState` for analytics data

#### 31. **Settings** (`src/pages/Settings.tsx`)
- **Dynamic Behavior**:
  - User profile editing
  - Preferences management
  - Account settings
  - Dynamic form updates
- **State Management**: `useState` for settings data

#### 32. **Documents** (`src/pages/Documents.tsx`)
- **Dynamic Behavior**:
  - Document upload
  - Document list
  - Document categories
  - File management
- **State Management**: `useState` for documents

#### 33. **Inspections** (`src/pages/Inspections.tsx`)
- **Dynamic Behavior**:
  - Inspection scheduling
  - Inspection reports
  - Status tracking
- **State Management**: `useState` for inspections

#### 34. **MyLease** (`src/pages/MyLease.tsx`)
- **Dynamic Behavior**:
  - Tenant lease viewing
  - Lease details
  - Document access
- **State Management**: `useState` for lease data

#### 35. **WorkHistory** (`src/pages/WorkHistory.tsx`)
- **Dynamic Behavior**:
  - Vendor work history
  - Completed tasks
  - Payment history
- **State Management**: `useState` for work data

#### 36. **VendorPaymentHistory** (`src/pages/VendorPaymentHistory.tsx`)
- **Dynamic Behavior**:
  - Vendor payment tracking
  - Invoice management
- **State Management**: `useState` for payment data

---

## 🎯 Context Providers (Dynamic State Management)

### 37. **AuthContext** (`src/contexts/AuthContext.tsx`)
- **Dynamic Behavior**:
  - User authentication state
  - Profile management
  - Session handling
  - Auto-refresh on auth changes
- **State Management**: `useState` for user, profile, session

### 38. **CurrencyContext** (`src/contexts/CurrencyContext.tsx`)
- **Dynamic Behavior**:
  - Currency formatting
  - Currency selection
- **State Management**: `useState` for currency settings

### 39. **AccessControlContext** (`src/contexts/AccessControlContext.tsx`)
- **Dynamic Behavior**:
  - Page access control
  - Role-based permissions
  - Dynamic permission checking
- **State Management**: `useState` for permissions

---

## 📊 Summary

**Total Dynamic Components**: ~39 components

**Categories**:
- **Core Components**: 5
- **Dashboard Pages**: 4
- **Property Management**: 3
- **Financial Pages**: 4
- **Maintenance Pages**: 4
- **Communication Pages**: 3
- **Admin Pages**: 2
- **Public Pages**: 4
- **Other Pages**: 8
- **Context Providers**: 3

**Common Dynamic Patterns**:
1. **Data Fetching**: Components that load data from Supabase or localStorage
2. **Form Management**: Components with dynamic form states
3. **Modal/Dialog Management**: Components with show/hide states
4. **Filter/Search**: Components with dynamic filtering
5. **Role-Based Rendering**: Components that change based on user role
6. **Real-Time Updates**: Components that update based on user actions
7. **Loading States**: Components with async operation states

All these components use React hooks (`useState`, `useEffect`, `useContext`) to manage dynamic behavior and respond to user interactions, data changes, and API responses.

