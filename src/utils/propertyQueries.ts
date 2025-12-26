import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PropertyData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country?: string;
  property_type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial' | 'land' | 'Other';
  total_units: number;
  available_units?: number;
  monthly_rent: number;
  security_deposit?: number;
  description?: string;
  amenities?: string[];
  images?: string[];
  year_built?: number;
  property_value?: number;
  monthly_expenses?: number;
  is_active?: boolean;
}

/**
 * Save a new property to the database
 * @param propertyData - Property data to save
 * @param ownerId - Owner's user ID (from auth context)
 * @returns Created property or error
 */
export const savePropertyToDatabase = async (
  propertyData: PropertyData,
  ownerId: string
) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...propertyData,
        owner_id: ownerId,
        available_units: propertyData.available_units ?? propertyData.total_units,
        is_active: propertyData.is_active ?? true,
        country: propertyData.country ?? 'US',
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving property:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Exception saving property:', error);
    return { data: null, error };
  }
};

/**
 * Update an existing property in the database
 * @param propertyId - Property ID to update
 * @param propertyData - Updated property data
 * @param ownerId - Owner's user ID (for authorization)
 * @returns Updated property or error
 */
export const updatePropertyInDatabase = async (
  propertyId: string,
  propertyData: Partial<PropertyData>,
  ownerId: string
) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update({
        ...propertyData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', propertyId)
      .eq('owner_id', ownerId) // Ensure owner can only update their own properties
      .select()
      .single();

    if (error) {
      console.error('Error updating property:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Exception updating property:', error);
    return { data: null, error };
  }
};

/**
 * Delete a property from the database
 * @param propertyId - Property ID to delete
 * @param ownerId - Owner's user ID (for authorization)
 * @returns Success status or error
 */
export const deletePropertyFromDatabase = async (
  propertyId: string,
  ownerId: string
) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId)
      .eq('owner_id', ownerId); // Ensure owner can only delete their own properties

    if (error) {
      console.error('Error deleting property:', error);
      throw error;
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Exception deleting property:', error);
    return { success: false, error };
  }
};

/**
 * Get all properties for a specific owner
 * @param ownerId - Owner's user ID
 * @returns Array of properties or error
 */
export const getOwnerProperties = async (ownerId: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return { data: data || [], error: null };
  } catch (error: any) {
    console.error('Exception fetching properties:', error);
    return { data: [], error };
  }
};

/**
 * Get a single property by ID
 * @param propertyId - Property ID
 * @param ownerId - Owner's user ID (for authorization)
 * @returns Property or error
 */
export const getPropertyById = async (propertyId: string, ownerId: string) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .eq('owner_id', ownerId)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Exception fetching property:', error);
    return { data: null, error };
  }
};

/**
 * Upload property images to Supabase Storage
 * @param files - Array of image files
 * @param propertyId - Property ID
 * @param ownerId - Owner's user ID
 * @returns Array of image URLs or error
 */
export const uploadPropertyImages = async (
  files: File[],
  propertyId: string,
  ownerId: string
) => {
  try {
    const imageUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `properties/${ownerId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        imageUrls.push(urlData.publicUrl);
      }
    }

    return { data: imageUrls, error: null };
  } catch (error: any) {
    console.error('Exception uploading images:', error);
    return { data: [], error };
  }
};

