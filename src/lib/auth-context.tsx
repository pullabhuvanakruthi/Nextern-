import { useQueryClient } from "@tanstack/react-query";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Role = "student" | "recruiter" | "admin";

type Ctx = {
  user: User | null;
  session: Session | null;
  role: Role | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;

    const loadRole = async (user: User | undefined) => {
      if (!user) {
        setRole(null);
        return;
      }
      try {
        const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).limit(1);
        if (error) throw error;
        const existing = data?.[0]?.role as Role | undefined;
        if (existing) {
          if (active) setRole(existing);
          return;
        }
        const desired: Role = user.user_metadata?.["role"] === "recruiter" ? "recruiter" : "student";
        const { error: insertError } = await supabase.from("user_roles").insert({ user_id: user.id, role: desired });
        if (insertError) throw insertError;
        if (active) setRole(desired);
      } catch (err) {
        console.error("Failed to load user role:", err);
        // Fallback to avoid hanging loading state
        if (active) setRole("student");
      }
    };

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      try {
        await loadRole(data.session?.user);
      } catch (err) {
        console.error("Error loading session role:", err);
      } finally {
        if (active) setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(next);
      void loadRole(next?.user);
      if (event === "SIGNED_OUT") queryClient.clear();
      else queryClient.invalidateQueries();
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const value = useMemo<Ctx>(
    () => ({
      user: session?.user ?? null,
      session,
      role,
      loading,
      signOut: async () => {
        await supabase.auth.signOut();
        setSession(null);
        setRole(null);
        queryClient.clear();
      },
    }),
    [session, role, loading, queryClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
