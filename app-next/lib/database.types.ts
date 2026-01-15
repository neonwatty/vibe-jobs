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
      api_tokens: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_four: string
          last_used_at: string | null
          name: string
          scopes: string[]
          token_hash: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_four: string
          last_used_at?: string | null
          name?: string
          scopes?: string[]
          token_hash: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_four?: string
          last_used_at?: string | null
          name?: string
          scopes?: string[]
          token_hash?: string
          user_id?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          cover_message: string | null
          created_at: string
          employer_notes: string | null
          id: string
          job_id: string
          profile_id: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
        }
        Insert: {
          cover_message?: string | null
          created_at?: string
          employer_notes?: string | null
          id?: string
          job_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Update: {
          cover_message?: string | null
          created_at?: string
          employer_notes?: string | null
          id?: string
          job_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          ai_culture: string | null
          ai_tools_used: string[]
          company_size: string | null
          created_at: string
          description: string | null
          domain_verified: boolean
          email_domain: string
          headquarters: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          remote_policy: string | null
          updated_at: string
          user_id: string
          verified_at: string | null
          website: string | null
        }
        Insert: {
          ai_culture?: string | null
          ai_tools_used?: string[]
          company_size?: string | null
          created_at?: string
          description?: string | null
          domain_verified?: boolean
          email_domain: string
          headquarters?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          remote_policy?: string | null
          updated_at?: string
          user_id: string
          verified_at?: string | null
          website?: string | null
        }
        Update: {
          ai_culture?: string | null
          ai_tools_used?: string[]
          company_size?: string | null
          created_at?: string
          description?: string | null
          domain_verified?: boolean
          email_domain?: string
          headquarters?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          remote_policy?: string | null
          updated_at?: string
          user_id?: string
          verified_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          ai_proficiency: Database["public"]["Enums"]["ai_proficiency"]
          ai_tools_required: string[]
          benefits: string[]
          company_id: string
          created_at: string
          description: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          experience_level: Database["public"]["Enums"]["experience_level"]
          how_youll_be_tested: string
          id: string
          is_active: boolean
          job_description_file_url: string | null
          location_details: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          nice_to_have: string[]
          published_at: string | null
          raw_json: Json | null
          requirements: string[]
          role_category: Database["public"]["Enums"]["role_category"]
          salary_currency: string
          salary_max: number
          salary_min: number
          source_url: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_proficiency?: Database["public"]["Enums"]["ai_proficiency"]
          ai_tools_required?: string[]
          benefits?: string[]
          company_id: string
          created_at?: string
          description: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          experience_level: Database["public"]["Enums"]["experience_level"]
          how_youll_be_tested: string
          id?: string
          is_active?: boolean
          job_description_file_url?: string | null
          location_details?: string | null
          location_type: Database["public"]["Enums"]["location_type"]
          nice_to_have?: string[]
          published_at?: string | null
          raw_json?: Json | null
          requirements?: string[]
          role_category: Database["public"]["Enums"]["role_category"]
          salary_currency?: string
          salary_max: number
          salary_min: number
          source_url?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_proficiency?: Database["public"]["Enums"]["ai_proficiency"]
          ai_tools_required?: string[]
          benefits?: string[]
          company_id?: string
          created_at?: string
          description?: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          experience_level?: Database["public"]["Enums"]["experience_level"]
          how_youll_be_tested?: string
          id?: string
          is_active?: boolean
          job_description_file_url?: string | null
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["location_type"]
          nice_to_have?: string[]
          published_at?: string | null
          raw_json?: Json | null
          requirements?: string[]
          role_category?: Database["public"]["Enums"]["role_category"]
          salary_currency?: string
          salary_max?: number
          salary_min?: number
          source_url?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_tools: string[]
          availability: Database["public"]["Enums"]["availability_status"]
          created_at: string
          education: Json
          email: string
          experience: Json
          first_name: string
          headline: string | null
          id: string
          last_name: string
          linkedin_url: string | null
          location: string | null
          portfolio_urls: string[]
          profile_complete: boolean
          raw_json: Json | null
          resume_file_url: string | null
          role_type: Database["public"]["Enums"]["role_category"]
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_tools?: string[]
          availability?: Database["public"]["Enums"]["availability_status"]
          created_at?: string
          education?: Json
          email: string
          experience?: Json
          first_name: string
          headline?: string | null
          id?: string
          last_name: string
          linkedin_url?: string | null
          location?: string | null
          portfolio_urls?: string[]
          profile_complete?: boolean
          raw_json?: Json | null
          resume_file_url?: string | null
          role_type?: Database["public"]["Enums"]["role_category"]
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_tools?: string[]
          availability?: Database["public"]["Enums"]["availability_status"]
          created_at?: string
          education?: Json
          email?: string
          experience?: Json
          first_name?: string
          headline?: string | null
          id?: string
          last_name?: string
          linkedin_url?: string | null
          location?: string | null
          portfolio_urls?: string[]
          profile_complete?: boolean
          raw_json?: Json | null
          resume_file_url?: string | null
          role_type?: Database["public"]["Enums"]["role_category"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_jobs: {
        Row: {
          created_at: string
          id: string
          job_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id: string
          profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_jobs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
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
      ai_culture: "encouraged" | "expected" | "required"
      ai_proficiency: "familiar" | "proficient" | "expert"
      ai_proficiency_level: "familiar" | "proficient" | "expert"
      application_status:
        | "pending"
        | "reviewing"
        | "interviewing"
        | "offered"
        | "rejected"
        | "withdrawn"
      availability_status: "actively_looking" | "open" | "not_looking"
      employment_type: "full_time" | "part_time" | "contract"
      experience_level: "entry" | "mid" | "senior" | "lead"
      job_status: "draft" | "active" | "paused" | "closed"
      location_type: "remote" | "hybrid" | "onsite"
      role_category:
        | "engineer"
        | "product"
        | "marketer"
        | "sales"
        | "ops"
        | "other"
      user_role: "employee" | "employer"
      user_type: "employee" | "employer"
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
      ai_culture: ["encouraged", "expected", "required"],
      ai_proficiency: ["familiar", "proficient", "expert"],
      ai_proficiency_level: ["familiar", "proficient", "expert"],
      application_status: [
        "pending",
        "reviewing",
        "interviewing",
        "offered",
        "rejected",
        "withdrawn",
      ],
      availability_status: ["actively_looking", "open", "not_looking"],
      employment_type: ["full_time", "part_time", "contract"],
      experience_level: ["entry", "mid", "senior", "lead"],
      job_status: ["draft", "active", "paused", "closed"],
      location_type: ["remote", "hybrid", "onsite"],
      role_category: [
        "engineer",
        "product",
        "marketer",
        "sales",
        "ops",
        "other",
      ],
      user_role: ["employee", "employer"],
      user_type: ["employee", "employer"],
    },
  },
} as const
