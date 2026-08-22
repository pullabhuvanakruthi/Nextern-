import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { emptyStudentProfile, type Application, type Internship, type StudentProfile } from "@/lib/types";

export function useInternships() {
  return useQuery({
    queryKey: ["internships"],
    queryFn: async (): Promise<Internship[]> => {
      const { data, error } = await supabase
        .from("internships")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Internship[];
    },
  });
}

export function useStudentProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["student-profile", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<StudentProfile> => {
      const { data, error } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      if (data) return data as StudentProfile;
      const seed = {
        ...emptyStudentProfile(user!.id),
        full_name: (user!.user_metadata?.["full_name"] as string | undefined) ?? "",
      };
      const { data: created, error: insertError } = await supabase
        .from("student_profiles")
        .insert(seed)
        .select("*")
        .single();
      if (insertError) throw insertError;
      return created as StudentProfile;
    },
  });
}

export function useUpdateStudentProfile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<StudentProfile>) => {
      const { data, error } = await supabase
        .from("student_profiles")
        .update(patch)
        .eq("user_id", user!.id)
        .select("*")
        .single();
      if (error) throw error;
      return data as StudentProfile;
    },
    onSuccess: (data) => {
      qc.setQueryData(["student-profile", user?.id], data);
    },
  });
}

export function useSaved() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["saved", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_internships")
        .select("id, internship_id, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useToggleSave() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ internshipId, saved }: { internshipId: string; saved: boolean }) => {
      if (saved) {
        const { error } = await supabase
          .from("saved_internships")
          .delete()
          .eq("user_id", user!.id)
          .eq("internship_id", internshipId);
        if (error) throw error;
        return false;
      }
      const { error } = await supabase
        .from("saved_internships")
        .insert({ user_id: user!.id, internship_id: internshipId });
      if (error) throw error;
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved", user?.id] }),
  });
}

export function useFeedback() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["feedback", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("internship_feedback").select("internship_id, value");
      if (error) throw error;
      const map: Record<string, "up" | "down"> = {};
      for (const row of data ?? []) map[row.internship_id] = row.value as "up" | "down";
      return map;
    },
  });
}

export function useSetFeedback() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ internshipId, value }: { internshipId: string; value: "up" | "down" | null }) => {
      if (value === null) {
        const { error } = await supabase
          .from("internship_feedback")
          .delete()
          .eq("user_id", user!.id)
          .eq("internship_id", internshipId);
        if (error) throw error;
        return;
      }
      const { error } = await supabase
        .from("internship_feedback")
        .upsert({ user_id: user!.id, internship_id: internshipId, value }, { onConflict: "user_id,internship_id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feedback", user?.id] }),
  });
}

export function useApplications() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["applications", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Application[]> => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Application[];
    },
  });
}

export function useSetApplicationStatus() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      internshipId,
      status,
    }: {
      internshipId: string;
      status: Application["status"];
    }) => {
      const { error } = await supabase
        .from("applications")
        .upsert(
          { user_id: user!.id, internship_id: internshipId, status },
          { onConflict: "user_id,internship_id" },
        );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications", user?.id] }),
  });
}

export function useRemoveApplication() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (internshipId: string) => {
      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("user_id", user!.id)
        .eq("internship_id", internshipId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications", user?.id] }),
  });
}

export function useReminderPrefs() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["reminder-prefs", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<number[]> => {
      const { data, error } = await supabase
        .from("reminder_prefs")
        .select("days")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data?.days ?? [7, 3, 1];
    },
  });
}

export function useSetReminderPrefs() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (days: number[]) => {
      const { error } = await supabase
        .from("reminder_prefs")
        .upsert({ user_id: user!.id, days }, { onConflict: "user_id" });
      if (error) throw error;
      return days;
    },
    onSuccess: (days) => qc.setQueryData(["reminder-prefs", user?.id], days),
  });
}

/* ---------- Recruiter ---------- */

export function useMyCompany() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["company", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useMyInternships() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-internships", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Internship[]> => {
      const { data, error } = await supabase
        .from("internships")
        .select("*")
        .eq("posted_by", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Internship[];
    },
  });
}

export type Candidate = {
  user_id: string;
  display_name: string;
  college: string;
  degree: string;
  specialization: string;
  graduation_year: string;
  skills: string[];
  interests: string[];
  has_resume: boolean;
  application_status: string | null;
};

export function useCandidates(internshipId: string) {
  return useQuery({
    queryKey: ["candidates", internshipId],
    queryFn: async (): Promise<Candidate[]> => {
      const { data, error } = await supabase.rpc("candidates_for_internship", {
        _internship_id: internshipId,
        _only_applicants: false,
      });
      if (error) throw error;
      return (data ?? []) as Candidate[];
    },
  });
}
