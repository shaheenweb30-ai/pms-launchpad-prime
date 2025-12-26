# How to Run the Properties Migration

## 🎯 Quick Start - Choose Your Method

### Method 1: Supabase Dashboard (Recommended - Easiest)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `sovmobytkxcmseetlynt`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste Migration SQL**
   - Open the file: `supabase/migrations/20250127000000_create_properties_table.sql`
   - Copy all the SQL content
   - Paste it into the SQL Editor

4. **Run the Migration**
   - Click "Run" button (or press Cmd+Enter)
   - Wait for success message

5. **Verify**
   - Go to "Table Editor" → Check if `properties` table exists
   - Verify columns are present

---

### Method 2: Supabase CLI (If Linked to Remote)

If your project is linked to Supabase:

```bash
# Make sure you're in the project directory
cd /Users/shaheeneiedalkadri/Documents/pms-launchpad-prime

# Link to your project (if not already linked)
supabase link --project-ref sovmobytkxcmseetlynt

# Push migrations to remote database
supabase db push
```

**Note**: This requires authentication. You'll need to login first:
```bash
supabase login
```

---

### Method 3: Supabase CLI (Local Development)

If you're running Supabase locally:

```bash
# Start Supabase locally (if not running)
supabase start

# Apply migrations
supabase migration up

# Or apply specific migration
supabase migration up --target 20250127000000
```

---

## 📋 Migration File Location

The migration file is located at:
```
supabase/migrations/20250127000000_create_properties_table.sql
```

## ✅ What the Migration Does

1. **Adds missing columns** to properties table (if they don't exist):
   - `year_built`
   - `property_value`
   - `monthly_expenses`

2. **Creates indexes** for better query performance:
   - Index on `owner_id`
   - Index on `city`
   - Index on `property_type`
   - Index on `is_active`
   - Composite index on `owner_id` and `is_active`

3. **Sets up RLS policies** (if not already present):
   - Property owners can manage their own properties
   - Tenants can view properties they're associated with

4. **Creates helper function**:
   - `get_owner_properties()` - Get all properties for an owner

5. **Creates trigger**:
   - Auto-updates `updated_at` timestamp on property updates

## 🔍 Verify Migration Success

After running the migration, verify it worked:

### In Supabase Dashboard:
1. Go to **Table Editor**
2. Find `properties` table
3. Check that these columns exist:
   - `year_built` (integer)
   - `property_value` (decimal)
   - `monthly_expenses` (decimal)

### Or run this SQL query:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'properties' 
ORDER BY ordinal_position;
```

## ⚠️ Troubleshooting

### Error: "relation 'properties' does not exist"
- The properties table might not exist yet
- Check if you need to run an earlier migration first
- The migration will create the table if it doesn't exist

### Error: "column already exists"
- This is safe to ignore - the migration checks before adding columns
- Your database is already up to date

### Error: "permission denied"
- Make sure you're using the correct database credentials
- Check that you have admin access to the project

## 🚀 After Migration

Once the migration is successful:

1. **Test the queries**:
   ```typescript
   import { savePropertyToDatabase } from '@/utils/propertyQueries';
   ```

2. **Update Properties.tsx** to use database instead of localStorage

3. **Create Storage Bucket** (for images):
   - Go to Storage in Supabase Dashboard
   - Create bucket: `property-images`
   - Set to Public or configure RLS

## 📞 Need Help?

If you encounter issues:
1. Check the error message in Supabase Dashboard
2. Verify your project is active
3. Check that you have the correct permissions

