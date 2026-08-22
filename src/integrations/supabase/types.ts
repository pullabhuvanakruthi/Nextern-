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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string
          id: string
          internship_id: string
          notes: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          id?: string
          internship_id: string
          notes?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          id?: string
          internship_id?: string
          notes?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          about: string
          created_at: string
          id: string
          industry: string
          name: string
          owner_id: string
          updated_at: string
          website: string
        }
        Insert: {
          about?: string
          created_at?: string
          id?: string
          industry?: string
          name: string
          owner_id: string
          updated_at?: string
          website?: string
        }
        Update: {
          about?: string
          created_at?: string
          id?: string
          industry?: string
          name?: string
          owner_id?: string
          updated_at?: string
          website?: string
        }
        Relationships: []
      }
      internship_feedback: {
        Row: {
          created_at: string
          id: string
          internship_id: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          internship_id: string
          user_id: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          internship_id?: string
          user_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "internship_feedback_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      internships: {
        Row: {
          apply_url: string
          company_id: string | null
          company_name: string
          created_at: string
          deadline: string | null
          description: string
          domain: string
          duration: string
          eligibility: string
          id: string
          is_curated: boolean
          is_published: boolean
          location: string
          posted_by: string | null
          skills: string[]
          slug: string | null
          source: string
          stipend: number | null
          title: string
          updated_at: string
          work_mode: string
        }
        Insert: {
          apply_url: string
          company_id?: string | null
          company_name: string
          created_at?: string
          deadline?: string | null
          description?: string
          domain?: string
          duration?: string
          eligibility?: string
          id?: string
          is_curated?: boolean
          is_published?: boolean
          location?: string
          posted_by?: string | null
          skills?: string[]
          slug?: string | null
          source?: string
          stipend?: number | null
          title: string
          updated_at?: string
          work_mode?: string
        }
        Update: {
          apply_url?: string
          company_id?: string | null
          company_name?: string
          created_at?: string
          deadline?: string | null
          description?: string
          domain?: string
          duration?: string
          eligibility?: string
          id?: string
          is_curated?: boolean
          is_published?: boolean
          location?: string
          posted_by?: string | null
          skills?: string[]
          slug?: string | null
          source?: string
          stipend?: number | null
          title?: string
          updated_at?: string
          work_mode?: string
        }
        Relationships: [
          {
            foreignKeyName: "internships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_test_attempts: {
        Row: {
          answers: Json
          created_at: string
          id: string
          report: Json
          score: number
          test_id: string
          topic: string
          total: number
          user_id: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          report?: Json
          score?: number
          test_id: string
          topic?: string
          total?: number
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          report?: Json
          score?: number
          test_id?: string
          topic?: string
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_tests: {
        Row: {
          created_at: string
          difficulty: string
          id: string
          questions: Json
          topic: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json
          topic?: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string
          full_name?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rejection_analyses: {
        Row: {
          courses: Json
          created_at: string
          experience_gaps: string[]
          id: string
          internship_id: string
          next_steps: string[]
          resume_gaps: string[]
          skill_gaps: string[]
          summary: string
          user_id: string
        }
        Insert: {
          courses?: Json
          created_at?: string
          experience_gaps?: string[]
          id?: string
          internship_id: string
          next_steps?: string[]
          resume_gaps?: string[]
          skill_gaps?: string[]
          summary?: string
          user_id: string
        }
        Update: {
          courses?: Json
          created_at?: string
          experience_gaps?: string[]
          id?: string
          internship_id?: string
          next_steps?: string[]
          resume_gaps?: string[]
          skill_gaps?: string[]
          summary?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rejection_analyses_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      reminder_dismissals: {
        Row: {
          created_at: string
          id: string
          internship_id: string
          threshold: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          internship_id: string
          threshold: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          internship_id?: string
          threshold?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminder_dismissals_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      reminder_prefs: {
        Row: {
          days: number[]
          updated_at: string
          user_id: string
        }
        Insert: {
          days?: number[]
          updated_at?: string
          user_id: string
        }
        Update: {
          days?: number[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_internships: {
        Row: {
          created_at: string
          id: string
          internship_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          internship_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          internship_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_internships_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          career_goals: string
          college: string
          company_type: string
          created_at: string
          current_year: string
          degree: string
          degree_other: string
          duration: string
          full_name: string
          graduation_year: string
          interests: string[]
          min_stipend: number
          onboarding_complete: boolean
          preferred_domains: string[]
          preferred_locations: string[]
          resume_name: string | null
          resume_path: string | null
          resume_uploaded_at: string | null
          skills: string[]
          specialization: string
          study_level: string
          updated_at: string
          user_id: string
          work_mode: string
        }
        Insert: {
          career_goals?: string
          college?: string
          company_type?: string
          created_at?: string
          current_year?: string
          degree?: string
          degree_other?: string
          duration?: string
          full_name?: string
          graduation_year?: string
          interests?: string[]
          min_stipend?: number
          onboarding_complete?: boolean
          preferred_domains?: string[]
          preferred_locations?: string[]
          resume_name?: string | null
          resume_path?: string | null
          resume_uploaded_at?: string | null
          skills?: string[]
          specialization?: string
          study_level?: string
          updated_at?: string
          user_id: string
          work_mode?: string
        }
        Update: {
          career_goals?: string
          college?: string
          company_type?: string
          created_at?: string
          current_year?: string
          degree?: string
          degree_other?: string
          duration?: string
          full_name?: string
          graduation_year?: string
          interests?: string[]
          min_stipend?: number
          onboarding_complete?: boolean
          preferred_domains?: string[]
          preferred_locations?: string[]
          resume_name?: string | null
          resume_path?: string | null
          resume_uploaded_at?: string | null
          skills?: string[]
          specialization?: string
          study_level?: string
          updated_at?: string
          user_id?: string
          work_mode?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      candidates_for_internship: {
        Args: { _internship_id: string; _only_applicants?: boolean }
        Returns: {
          application_status: string
          college: string
          degree: string
          display_name: string
          graduation_year: string
          has_resume: boolean
          interests: string[]
          skills: string[]
          specialization: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "recruiter" | "admin"
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
      app_role: ["student", "recruiter", "admin"],
    },
  },
} as const
