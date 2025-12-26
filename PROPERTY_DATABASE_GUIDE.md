# Property Database Integration Guide

This guide shows you how to save properties to the database instead of localStorage.

## 📋 Database Schema

The `properties` table includes:
- Basic info: name, address, city, state, zip_code, country
- Property details: type, total_units, available_units
- Financial: monthly_rent, security_deposit, property_value, monthly_expenses
- Additional: description, amenities, images, year_built
- Metadata: owner_id, is_active, created_at, updated_at

## 🚀 Setup Steps

### 1. Run the Migration

Apply the database migration to create the properties table:

```bash
# Using Supabase CLI
supabase migration up

# Or manually run the SQL file:
# supabase/migrations/20250127000000_create_properties_table.sql
```

### 2. Create Storage Bucket (for images)

In Supabase Dashboard:
1. Go to Storage
2. Create a new bucket called `property-images`
3. Set it to Public (or configure RLS policies)

### 3. Use the Query Functions

Import and use the functions from `src/utils/propertyQueries.ts`:

```typescript
import { 
  savePropertyToDatabase, 
  updatePropertyInDatabase,
  deletePropertyFromDatabase,
  getOwnerProperties 
} from '@/utils/propertyQueries';
import { useAuth } from '@/contexts/AuthContext';

// In your component
const { user } = useAuth();

// Save a new property
const handleSaveProperty = async (propertyData) => {
  if (!user) {
    toast.error('Please sign in to save properties');
    return;
  }

  const { data, error } = await savePropertyToDatabase(propertyData, user.id);
  
  if (error) {
    toast.error('Failed to save property: ' + error.message);
  } else {
    toast.success('Property saved successfully!');
  }
};
```

## 📝 Example Usage

### Save a New Property

```typescript
const propertyData = {
  name: "Downtown Apartment",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zip_code: "10001",
  country: "US",
  property_type: "apartment",
  total_units: 5,
  available_units: 2,
  monthly_rent: 2500.00,
  security_deposit: 2500.00,
  description: "Beautiful downtown apartment",
  amenities: ["Parking", "Gym", "Pool"],
  year_built: 2020,
  property_value: 500000,
  monthly_expenses: 500
};

const { data, error } = await savePropertyToDatabase(propertyData, user.id);
```

### Update a Property

```typescript
const updates = {
  monthly_rent: 2700.00,
  available_units: 1,
  description: "Updated description"
};

const { data, error } = await updatePropertyInDatabase(
  propertyId, 
  updates, 
  user.id
);
```

### Get All Owner's Properties

```typescript
const { data: properties, error } = await getOwnerProperties(user.id);

if (!error && properties) {
  setProperties(properties);
}
```

### Delete a Property

```typescript
const { success, error } = await deletePropertyFromDatabase(
  propertyId, 
  user.id
);

if (success) {
  toast.success('Property deleted');
}
```

## 🔐 Security Features

- **RLS Policies**: Only property owners can manage their own properties
- **Authorization**: All queries check `owner_id` matches authenticated user
- **Tenant Access**: Tenants can view properties they're associated with via leases

## 🔄 Migration from localStorage

To migrate existing localStorage properties to database:

1. Load properties from localStorage
2. For each property, call `savePropertyToDatabase()`
3. Clear localStorage after successful migration

```typescript
const migratePropertiesToDatabase = async () => {
  const localProperties = JSON.parse(localStorage.getItem('pms-properties') || '[]');
  
  for (const property of localProperties) {
    // Transform localStorage format to database format
    const propertyData = {
      name: property.name,
      address: property.address.split(', ')[0],
      city: property.city,
      state: property.state || '',
      zip_code: property.zipCode || '',
      property_type: property.type || 'Other',
      total_units: property.units || 1,
      monthly_rent: property.monthlyRent || 0,
      // ... map other fields
    };
    
    await savePropertyToDatabase(propertyData, user.id);
  }
  
  // Clear localStorage after migration
  localStorage.removeItem('pms-properties');
};
```

## 📊 Available Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `savePropertyToDatabase` | Create new property | `propertyData`, `ownerId` |
| `updatePropertyInDatabase` | Update existing property | `propertyId`, `propertyData`, `ownerId` |
| `deletePropertyFromDatabase` | Delete property | `propertyId`, `ownerId` |
| `getOwnerProperties` | Get all owner's properties | `ownerId` |
| `getPropertyById` | Get single property | `propertyId`, `ownerId` |
| `uploadPropertyImages` | Upload images to storage | `files`, `propertyId`, `ownerId` |

## 🎯 Next Steps

1. ✅ Run the migration
2. ✅ Create storage bucket for images
3. ✅ Update Properties.tsx to use database queries
4. ✅ Test property creation/update/delete
5. ✅ Migrate existing localStorage data

## ⚠️ Important Notes

- Always check `user` exists before calling database functions
- Handle errors gracefully with user-friendly messages
- Images need to be uploaded to Supabase Storage first
- RLS policies ensure users can only access their own properties

