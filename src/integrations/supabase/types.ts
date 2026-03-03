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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      availability_blocks: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string
          id: string
          reason: string | null
          start_date: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date: string
          id?: string
          reason?: string | null
          start_date: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string
          id?: string
          reason?: string | null
          start_date?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_blocks_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          customer_id: string
          daily_rate: number
          end_date: string
          hold_id: string | null
          id: string
          notes: string | null
          payfast_payment_id: string | null
          payfast_reference: string | null
          payfast_status: string | null
          start_date: string
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          daily_rate: number
          end_date: string
          hold_id?: string | null
          id?: string
          notes?: string | null
          payfast_payment_id?: string | null
          payfast_reference?: string | null
          payfast_status?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          daily_rate?: number
          end_date?: string
          hold_id?: string | null
          id?: string
          notes?: string | null
          payfast_payment_id?: string | null
          payfast_reference?: string | null
          payfast_status?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_hold_id_fkey"
            columns: ["hold_id"]
            isOneToOne: false
            referencedRelation: "holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          end_date: string | null
          enquiry_type: string
          id: string
          message: string
          name: string
          phone: string
          preferred_vehicle: string | null
          referral_source: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          email: string
          end_date?: string | null
          enquiry_type: string
          id?: string
          message: string
          name: string
          phone: string
          preferred_vehicle?: string | null
          referral_source: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          end_date?: string | null
          enquiry_type?: string
          id?: string
          message?: string
          name?: string
          phone?: string
          preferred_vehicle?: string | null
          referral_source?: string
          start_date?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      google_reviews: {
        Row: {
          author_name: string
          fetched_at: string
          id: string
          profile_photo_url: string | null
          rating: number
          text: string
          time: string
        }
        Insert: {
          author_name: string
          fetched_at?: string
          id: string
          profile_photo_url?: string | null
          rating: number
          text: string
          time: string
        }
        Update: {
          author_name?: string
          fetched_at?: string
          id?: string
          profile_photo_url?: string | null
          rating?: number
          text?: string
          time?: string
        }
        Relationships: []
      }
      holds: {
        Row: {
          created_at: string
          end_date: string
          expires_at: string
          id: string
          start_date: string
          status: Database["public"]["Enums"]["hold_status"]
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          expires_at: string
          id?: string
          start_date: string
          status?: Database["public"]["Enums"]["hold_status"]
          vehicle_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          expires_at?: string
          id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["hold_status"]
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "holds_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      page_content: {
        Row: {
          content_type: string
          display_order: number | null
          id: string
          label: string | null
          page: string
          section: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          content_type?: string
          display_order?: number | null
          id: string
          label?: string | null
          page: string
          section?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          content_type?: string
          display_order?: number | null
          id?: string
          label?: string | null
          page?: string
          section?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      specials: {
        Row: {
          category_tag: string
          created_at: string
          cta_link: string
          cta_text: string
          description: string | null
          discount_percent: number | null
          display_order: number | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_tag: string
          created_at?: string
          cta_link: string
          cta_text: string
          description?: string | null
          discount_percent?: number | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_tag?: string
          created_at?: string
          cta_link?: string
          cta_text?: string
          description?: string | null
          discount_percent?: number | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          role: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          acceleration: string | null
          category: string
          chauffeur_rate: number | null
          cover_image_url: string | null
          created_at: string
          daily_rate: number
          description: string | null
          doors: number | null
          drive_type: string | null
          engine: string | null
          excess_mileage_rate: number | null
          featured: boolean | null
          features: string[] | null
          fuel_type: string | null
          gallery_urls: string[] | null
          has_aircon: boolean | null
          hero_video_url: string | null
          id: string
          image: string
          insurance_excess: number | null
          is_active: boolean | null
          is_hot: boolean | null
          limited_availability: boolean | null
          luggage_capacity: string | null
          mileage_limit: string | null
          minimum_rental_days: number | null
          multi_day_discount_percent: number | null
          multi_day_rate: number | null
          multi_day_threshold: number | null
          name: string
          original_multi_day_rate: number | null
          power_kw: number | null
          seats: number | null
          security_deposit: number | null
          self_drive_rate: number | null
          slug: string | null
          top_speed: string | null
          transmission: string | null
          updated_at: string
          video_urls: string[] | null
          why_we_chose: string | null
        }
        Insert: {
          acceleration?: string | null
          category: string
          chauffeur_rate?: number | null
          cover_image_url?: string | null
          created_at?: string
          daily_rate: number
          description?: string | null
          doors?: number | null
          drive_type?: string | null
          engine?: string | null
          excess_mileage_rate?: number | null
          featured?: boolean | null
          features?: string[] | null
          fuel_type?: string | null
          gallery_urls?: string[] | null
          has_aircon?: boolean | null
          hero_video_url?: string | null
          id: string
          image: string
          insurance_excess?: number | null
          is_active?: boolean | null
          is_hot?: boolean | null
          limited_availability?: boolean | null
          luggage_capacity?: string | null
          mileage_limit?: string | null
          minimum_rental_days?: number | null
          multi_day_discount_percent?: number | null
          multi_day_rate?: number | null
          multi_day_threshold?: number | null
          name: string
          original_multi_day_rate?: number | null
          power_kw?: number | null
          seats?: number | null
          security_deposit?: number | null
          self_drive_rate?: number | null
          slug?: string | null
          top_speed?: string | null
          transmission?: string | null
          updated_at?: string
          video_urls?: string[] | null
          why_we_chose?: string | null
        }
        Update: {
          acceleration?: string | null
          category?: string
          chauffeur_rate?: number | null
          cover_image_url?: string | null
          created_at?: string
          daily_rate?: number
          description?: string | null
          doors?: number | null
          drive_type?: string | null
          engine?: string | null
          excess_mileage_rate?: number | null
          featured?: boolean | null
          features?: string[] | null
          fuel_type?: string | null
          gallery_urls?: string[] | null
          has_aircon?: boolean | null
          hero_video_url?: string | null
          id?: string
          image?: string
          insurance_excess?: number | null
          is_active?: boolean | null
          is_hot?: boolean | null
          limited_availability?: boolean | null
          luggage_capacity?: string | null
          mileage_limit?: string | null
          minimum_rental_days?: number | null
          multi_day_discount_percent?: number | null
          multi_day_rate?: number | null
          multi_day_threshold?: number | null
          name?: string
          original_multi_day_rate?: number | null
          power_kw?: number | null
          seats?: number | null
          security_deposit?: number | null
          self_drive_rate?: number | null
          slug?: string | null
          top_speed?: string | null
          transmission?: string | null
          updated_at?: string
          video_urls?: string[] | null
          why_we_chose?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status:
        | "pending_payment"
        | "confirmed"
        | "cancelled"
        | "expired"
        | "completed"
      hold_status: "active" | "converted" | "expired" | "released"
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
      app_role: ["admin", "user"],
      booking_status: [
        "pending_payment",
        "confirmed",
        "cancelled",
        "expired",
        "completed",
      ],
      hold_status: ["active", "converted", "expired", "released"],
    },
  },
} as const
