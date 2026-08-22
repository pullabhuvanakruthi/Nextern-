import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import {
  analyzeRejection,
  assistantReply,
  generateMockTest,
  gradeMockTest,
  parseResume,
  type MockQuestion,
  type RejectionAnalysis,
  type ResumeInsights,
  type TestReport,
} from "@/lib/ai.functions";

export function useParseResume() {
  const fn = useServerFn(parseResume);
  return useMutation<ResumeInsights>({ mutationFn: () => fn() });
}

export function useRejectionAnalyses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["rejection-analyses", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("rejection_analyses").select("*");
      if (error) throw error;
      const map: Record<string, RejectionAnalysis> = {};
      for (const row of data ?? []) {
        map[row.internship_id] = {
          summary: row.summary,
          skill_gaps: row.skill_gaps ?? [],
          resume_gaps: row.resume_gaps ?? [],
          experience_gaps: row.experience_gaps ?? [],
          next_steps: row.next_steps ?? [],
          courses: (row.courses as RejectionAnalysis["courses"]) ?? [],
        };
      }
      return map;
    },
  });
}

export function useAnalyzeRejection() {
  const fn = useServerFn(analyzeRejection);
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (internshipId: string) => fn({ data: { internshipId } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rejection-analyses", user?.id] }),
  });
}

export function useGenerateTest() {
  const fn = useServerFn(generateMockTest);
  return useMutation<{ id: string; questions: MockQuestion[] }, Error, { topic: string; difficulty: string }>({
    mutationFn: (input) => fn({ data: input }),
  });
}

export function useGradeTest() {
  const fn = useServerFn(gradeMockTest);
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation<
    { score: number; total: number; report: TestReport },
    Error,
    { testId: string; answers: number[] }
  >({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["test-attempts", user?.id] }),
  });
}

export function useTestAttempts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["test-attempts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mock_test_attempts")
        .select("id, topic, score, total, report, created_at")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAssistantMessages() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["assistant-messages", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assistant_messages")
        .select("id, role, content, created_at")
        .order("created_at", { ascending: true })
        .limit(60);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAssistantSend() {
  const fn = useServerFn(assistantReply);
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation<{ reply: string }, Error, string>({
    mutationFn: (message) => fn({ data: { message } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assistant-messages", user?.id] }),
  });
}

export function useReminderDismissals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["reminder-dismissals", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reminder_dismissals")
        .select("internship_id, threshold");
      if (error) throw error;
      return (data ?? []).map((d) => `${d.internship_id}:${d.threshold}`);
    },
  });
}

export function useDismissReminder() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ internshipId, threshold }: { internshipId: string; threshold: number }) => {
      const { error } = await supabase.from("reminder_dismissals").upsert(
        { user_id: user!.id, internship_id: internshipId, threshold },
        { onConflict: "user_id,internship_id,threshold" },
      );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reminder-dismissals", user?.id] }),
  });
}
