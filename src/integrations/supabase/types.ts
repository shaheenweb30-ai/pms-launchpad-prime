export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          expires_at: string | null
          file_size: number
          file_url: string
          id: string
          is_public: boolean | null
          lease_id: string | null
          maintenance_request_id: string | null
          mime_type: string
          name: string
          property_id: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          file_size: number
          file_url: string
          id?: string
          is_public?: boolean | null
          lease_id?: string | null
          maintenance_request_id?: string | null
          mime_type: string
          name: string
          property_id?: string | null
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          file_size?: number
          file_url?: string
          id?: string
          is_public?: boolean | null
          lease_id?: string | null
          maintenance_request_id?: string | null
          mime_type?: string
          name?: string
          property_id?: string | null
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_maintenance_request_id_fkey"
            columns: ["maintenance_request_id"]
            isOneToOne: false
            referencedRelation: "maintenance_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leases: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_active: boolean | null
          monthly_rent: number
          property_id: string | null
          security_deposit: number
          start_date: string
          status: Database["public"]["Enums"]["lease_status"] | null
          tenant_id: string | null
          terms: string | null
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          monthly_rent: number
          property_id?: string | null
          security_deposit: number
          start_date: string
          status?: Database["public"]["Enums"]["lease_status"] | null
          tenant_id?: string | null
          terms?: string | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          monthly_rent?: number
          property_id?: string | null
          security_deposit?: number
          start_date?: string
          status?: Database["public"]["Enums"]["lease_status"] | null
          tenant_id?: string | null
          terms?: string | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leases_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leases_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leases_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          actual_cost: number | null
          assigned_vendor_id: string | null
          category: Database["public"]["Enums"]["maintenance_category"]
          completed_date: string | null
          created_at: string | null
          description: string
          estimated_cost: number | null
          id: string
          images: string[] | null
          priority: Database["public"]["Enums"]["maintenance_priority"] | null
          property_id: string | null
          scheduled_date: string | null
          status: Database["public"]["Enums"]["maintenance_status"] | null
          tenant_feedback: string | null
          tenant_id: string | null
          tenant_rating: number | null
          title: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_vendor_id?: string | null
          category: Database["public"]["Enums"]["maintenance_category"]
          completed_date?: string | null
          created_at?: string | null
          description: string
          estimated_cost?: number | null
          id?: string
          images?: string[] | null
          priority?: Database["public"]["Enums"]["maintenance_priority"] | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          tenant_feedback?: string | null
          tenant_id?: string | null
          tenant_rating?: number | null
          title: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_vendor_id?: string | null
          category?: Database["public"]["Enums"]["maintenance_category"]
          completed_date?: string | null
          created_at?: string | null
          description?: string
          estimated_cost?: number | null
          id?: string
          images?: string[] | null
          priority?: Database["public"]["Enums"]["maintenance_priority"] | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          tenant_feedback?: string | null
          tenant_id?: string | null
          tenant_rating?: number | null
          title?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_assigned_vendor_id_fkey"
            columns: ["assigned_vendor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          lease_id: string | null
          paid_date: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: Database["public"]["Enums"]["payment_status"] | null
          tenant_id: string | null
          transaction_id: string | null
          type: Database["public"]["Enums"]["payment_type"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          lease_id?: string | null
          paid_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          tenant_id?: string | null
          transaction_id?: string | null
          type: Database["public"]["Enums"]["payment_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          lease_id?: string | null
          paid_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          tenant_id?: string | null
          transaction_id?: string | null
          type?: Database["public"]["Enums"]["payment_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          amenities: string[] | null
          available_units: number | null
          city: string
          country: string
          created_at: string | null
          description: string | null
          id: string
          images: string[] | null
          is_active: boolean | null
          monthly_rent: number
          name: string
          owner_id: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          security_deposit: number
          state: string
          total_units: number
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          available_units?: number | null
          city: string
          country: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          monthly_rent: number
          name: string
          owner_id?: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          security_deposit: number
          state: string
          total_units: number
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          available_units?: number | null
          city?: string
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          monthly_rent?: number
          name?: string
          owner_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          security_deposit?: number
          state?: string
          total_units?: number
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          bathrooms: number
          bedrooms: number
          created_at: string | null
          floor: number | null
          id: string
          is_available: boolean | null
          is_occupied: boolean | null
          monthly_rent: number
          property_id: string | null
          security_deposit: number
          square_footage: number | null
          unit_number: string
          updated_at: string | null
        }
        Insert: {
          bathrooms: number
          bedrooms: number
          created_at?: string | null
          floor?: number | null
          id?: string
          is_available?: boolean | null
          is_occupied?: boolean | null
          monthly_rent: number
          property_id?: string | null
          security_deposit: number
          square_footage?: number | null
          unit_number: string
          updated_at?: string | null
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          created_at?: string | null
          floor?: number | null
          id?: string
          is_available?: boolean | null
          is_occupied?: boolean | null
          monthly_rent?: number
          property_id?: string | null
          security_deposit?: number
          square_footage?: number | null
          unit_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          email_verified: boolean | null
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type:
        | "lease_agreement"
        | "id_document"
        | "proof_of_income"
        | "bank_statement"
        | "insurance"
        | "maintenance_invoice"
        | "payment_receipt"
        | "other"
      lease_status: "pending" | "active" | "expired" | "terminated" | "renewed"
      maintenance_category:
        | "plumbing"
        | "electrical"
        | "hvac"
        | "appliance"
        | "structural"
        | "landscaping"
        | "cleaning"
        | "other"
      maintenance_priority: "low" | "medium" | "high" | "urgent"
      maintenance_status:
        | "pending"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
      payment_method:
        | "credit_card"
        | "debit_card"
        | "bank_transfer"
        | "cash"
        | "check"
        | "online_payment"
      payment_status: "pending" | "paid" | "overdue" | "cancelled" | "refunded"
      payment_type:
        | "rent"
        | "security_deposit"
        | "late_fee"
        | "maintenance_fee"
        | "utility_bill"
        | "other"
      property_type:
        | "apartment"
        | "house"
        | "condo"
        | "townhouse"
        | "commercial"
        | "land"
      user_role: "admin" | "homeowner" | "tenant" | "vendor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "lease_agreement",
        "id_document",
        "proof_of_income",
        "bank_statement",
        "insurance",
        "maintenance_invoice",
        "payment_receipt",
        "other",
      ],
      lease_status: ["pending", "active", "expired", "terminated", "renewed"],
      maintenance_category: [
        "plumbing",
        "electrical",
        "hvac",
        "appliance",
        "structural",
        "landscaping",
        "cleaning",
        "other",
      ],
      maintenance_priority: ["low", "medium", "high", "urgent"],
      maintenance_status: [
        "pending",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
      ],
      payment_method: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "cash",
        "check",
        "online_payment",
      ],
      payment_status: ["pending", "paid", "overdue", "cancelled", "refunded"],
      payment_type: [
        "rent",
        "security_deposit",
        "late_fee",
        "maintenance_fee",
        "utility_bill",
        "other",
      ],
      property_type: [
        "apartment",
        "house",
        "condo",
        "townhouse",
        "commercial",
        "land",
      ],
      user_role: ["admin", "homeowner", "tenant", "vendor"],
    },
  },
} as const
