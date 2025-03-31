export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content_tags: {
        Row: {
          content_id: string
          created_at: string
          id: number
          tag_id: string
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id?: number
          tag_id: string
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: number
          tag_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "contents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      contents: {
        Row: {
          content_url: string
          created_at: string
          id: string
          note: string
          src_url: string
          thumbnail_url: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          content_url: string
          created_at?: string
          id?: string
          note: string
          src_url: string
          thumbnail_url: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          content_url?: string
          created_at?: string
          id?: string
          note?: string
          src_url?: string
          thumbnail_url?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          user_id: string
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          user_id: string
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          is_favorite: boolean
          note: string
          tag_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_favorite?: boolean
          note?: string
          tag_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_favorite?: boolean
          note?: string
          tag_name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_contents_by_tag_id: {
        Args: {
          target_tag_id: string
        }
        Returns: {
          content_id: string
          title: string
          thumbnail_url: string
          tag_id: string
          tag_name: string
          is_favorite: boolean
        }[]
      }
      insert_content_with_tags: {
        Args: {
          p_user_id: string
          p_title: string
          p_type: string
          p_src_url: string
          p_thumbnail_url: string
          p_content_url: string
          p_note: string
          p_tags: string[]
        }
        Returns: string
      }
      update_content_and_tags: {
        Args: {
          p_content_id: string
          p_user_id: string
          p_title: string
          p_type: string
          p_src_url: string
          p_thumbnail_url: string
          p_content_url: string
          p_note: string
          p_tags: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
