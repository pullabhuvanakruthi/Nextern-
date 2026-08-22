import { r as __toESM } from "../_runtime.mjs";
import { k as isRedirect, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BpbeoxIM.mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Ca4fZu3h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-DoJqRnYK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var parseResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("b4549bad405a54a085b9a8066c3d19eeceb6d03566868c42d2f300117cb6b6f6"));
var analyzeRejection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!input?.internshipId) throw new Error("internshipId is required");
	return input;
}).handler(createSsrRpc("a5a2f0333b657a09a3525da60206ef9daac94dc75c11e2f5782440e03ed058e9"));
var generateMockTest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("8dab7fc46d18699af7ffb27f96dac640c7b9c4f0854f14932df030333644a697"));
var gradeMockTest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("b440529cc37d98b79b23e495fc796f346de7cbccefdc5a8dc5b06efbb79ca2c7"));
var assistantReply = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("200f55dfcb57b8caf53ed14787aca79c0a605c5835f9f24a4682f10a779737db"));
function useParseResume() {
	const fn = useServerFn(parseResume);
	return useMutation({ mutationFn: () => fn() });
}
function useRejectionAnalyses() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["rejection-analyses", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("rejection_analyses").select("*");
			if (error) throw error;
			const map = {};
			for (const row of data ?? []) map[row.internship_id] = {
				summary: row.summary,
				skill_gaps: row.skill_gaps ?? [],
				resume_gaps: row.resume_gaps ?? [],
				experience_gaps: row.experience_gaps ?? [],
				next_steps: row.next_steps ?? [],
				courses: row.courses ?? []
			};
			return map;
		}
	});
}
function useAnalyzeRejection() {
	const fn = useServerFn(analyzeRejection);
	const qc = useQueryClient();
	const { user } = useAuth();
	return useMutation({
		mutationFn: (internshipId) => fn({ data: { internshipId } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["rejection-analyses", user?.id] })
	});
}
function useGenerateTest() {
	const fn = useServerFn(generateMockTest);
	return useMutation({ mutationFn: (input) => fn({ data: input }) });
}
function useGradeTest() {
	const fn = useServerFn(gradeMockTest);
	const qc = useQueryClient();
	const { user } = useAuth();
	return useMutation({
		mutationFn: (input) => fn({ data: input }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["test-attempts", user?.id] })
	});
}
function useTestAttempts() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["test-attempts", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("mock_test_attempts").select("id, topic, score, total, report, created_at").order("created_at", { ascending: false }).limit(20);
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useAssistantMessages() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["assistant-messages", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("assistant_messages").select("id, role, content, created_at").order("created_at", { ascending: true }).limit(60);
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useAssistantSend() {
	const fn = useServerFn(assistantReply);
	const qc = useQueryClient();
	const { user } = useAuth();
	return useMutation({
		mutationFn: (message) => fn({ data: { message } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["assistant-messages", user?.id] })
	});
}
function useReminderDismissals() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["reminder-dismissals", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("reminder_dismissals").select("internship_id, threshold");
			if (error) throw error;
			return (data ?? []).map((d) => `${d.internship_id}:${d.threshold}`);
		}
	});
}
function useDismissReminder() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ internshipId, threshold }) => {
			const { error } = await supabase.from("reminder_dismissals").upsert({
				user_id: user.id,
				internship_id: internshipId,
				threshold
			}, { onConflict: "user_id,internship_id,threshold" });
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["reminder-dismissals", user?.id] })
	});
}
var emptyStudentProfile = (userId = "") => ({
	user_id: userId,
	full_name: "",
	degree: "",
	degree_other: "",
	study_level: "",
	college: "",
	current_year: "",
	graduation_year: "",
	specialization: "",
	skills: [],
	interests: [],
	preferred_domains: [],
	preferred_locations: [],
	work_mode: "",
	duration: "",
	company_type: "",
	min_stipend: 0,
	career_goals: "",
	resume_path: null,
	resume_name: null,
	resume_uploaded_at: null,
	onboarding_complete: false
});
function useInternships() {
	return useQuery({
		queryKey: ["internships"],
		queryFn: async () => {
			const { data, error } = await supabase.from("internships").select("*").eq("is_published", true).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useStudentProfile() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["student-profile", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("student_profiles").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			if (data) return data;
			const seed = {
				...emptyStudentProfile(user.id),
				full_name: user.user_metadata?.["full_name"] ?? ""
			};
			const { data: created, error: insertError } = await supabase.from("student_profiles").insert(seed).select("*").single();
			if (insertError) throw insertError;
			return created;
		}
	});
}
function useUpdateStudentProfile() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (patch) => {
			const { data, error } = await supabase.from("student_profiles").update(patch).eq("user_id", user.id).select("*").single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			qc.setQueryData(["student-profile", user?.id], data);
		}
	});
}
function useSaved() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["saved", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("saved_internships").select("id, internship_id, created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useToggleSave() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ internshipId, saved }) => {
			if (saved) {
				const { error } = await supabase.from("saved_internships").delete().eq("user_id", user.id).eq("internship_id", internshipId);
				if (error) throw error;
				return false;
			}
			const { error } = await supabase.from("saved_internships").insert({
				user_id: user.id,
				internship_id: internshipId
			});
			if (error) throw error;
			return true;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["saved", user?.id] })
	});
}
function useFeedback() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["feedback", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("internship_feedback").select("internship_id, value");
			if (error) throw error;
			const map = {};
			for (const row of data ?? []) map[row.internship_id] = row.value;
			return map;
		}
	});
}
function useSetFeedback() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ internshipId, value }) => {
			if (value === null) {
				const { error } = await supabase.from("internship_feedback").delete().eq("user_id", user.id).eq("internship_id", internshipId);
				if (error) throw error;
				return;
			}
			const { error } = await supabase.from("internship_feedback").upsert({
				user_id: user.id,
				internship_id: internshipId,
				value
			}, { onConflict: "user_id,internship_id" });
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["feedback", user?.id] })
	});
}
function useApplications() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["applications", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("applications").select("*").order("updated_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useSetApplicationStatus() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ internshipId, status }) => {
			const { error } = await supabase.from("applications").upsert({
				user_id: user.id,
				internship_id: internshipId,
				status
			}, { onConflict: "user_id,internship_id" });
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["applications", user?.id] })
	});
}
function useRemoveApplication() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (internshipId) => {
			const { error } = await supabase.from("applications").delete().eq("user_id", user.id).eq("internship_id", internshipId);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["applications", user?.id] })
	});
}
function useReminderPrefs() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["reminder-prefs", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("reminder_prefs").select("days").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data?.days ?? [
				7,
				3,
				1
			];
		}
	});
}
function useSetReminderPrefs() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (days) => {
			const { error } = await supabase.from("reminder_prefs").upsert({
				user_id: user.id,
				days
			}, { onConflict: "user_id" });
			if (error) throw error;
			return days;
		},
		onSuccess: (days) => qc.setQueryData(["reminder-prefs", user?.id], days)
	});
}
function useMyCompany() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["company", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("companies").select("*").eq("owner_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function useMyInternships() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["my-internships", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("internships").select("*").eq("posted_by", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useCandidates(internshipId) {
	return useQuery({
		queryKey: ["candidates", internshipId],
		queryFn: async () => {
			const { data, error } = await supabase.rpc("candidates_for_internship", {
				_internship_id: internshipId,
				_only_applicants: false
			});
			if (error) throw error;
			return data ?? [];
		}
	});
}
//#endregion
export { useTestAttempts as C, useStudentProfile as S, useUpdateStudentProfile as T, useRemoveApplication as _, useCandidates as a, useSetFeedback as b, useGenerateTest as c, useMyCompany as d, useMyInternships as f, useReminderPrefs as g, useReminderDismissals as h, useAssistantSend as i, useGradeTest as l, useRejectionAnalyses as m, useApplications as n, useDismissReminder as o, useParseResume as p, useAssistantMessages as r, useFeedback as s, useAnalyzeRejection as t, useInternships as u, useSaved as v, useToggleSave as w, useSetReminderPrefs as x, useSetApplicationStatus as y };
