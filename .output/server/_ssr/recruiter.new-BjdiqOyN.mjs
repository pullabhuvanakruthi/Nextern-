import { r as __toESM } from "../_runtime.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { p as useMyCompany } from "./ai-queries-D3oXUHn6.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { b as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { n as CardContent, t as Card } from "./card-BM637P_-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { a as DOMAINS, o as DURATIONS, p as WORK_MODES, u as SKILL_OPTIONS } from "./options-Br7fzcJ6.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { n as TagInput, t as ChoiceChips } from "./TagInput-CtBW2CUY.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter.new-BjdiqOyN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPosting() {
	const { user } = useAuth();
	const { data: company } = useMyCompany();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		company_name: "",
		domain: "",
		description: "",
		eligibility: "",
		location: "",
		work_mode: "Remote",
		duration: "3 months",
		stipend: "",
		deadline: "",
		apply_url: "",
		skills: []
	});
	const set = (patch) => setForm((f) => ({
		...f,
		...patch
	}));
	const submit = async () => {
		const companyName = form.company_name || company?.name || "";
		if (!form.title || !companyName || !form.domain || !form.apply_url) {
			toast.error("Title, company, domain and apply link are required");
			return;
		}
		if (!/^https?:\/\//i.test(form.apply_url)) {
			toast.error("Apply link must be a full https:// URL");
			return;
		}
		setBusy(true);
		try {
			const { data: newInternship, error: insertError } = await supabase.from("internships").insert({
				posted_by: user.id,
				company_id: company?.id ?? null,
				company_name: companyName,
				title: form.title,
				description: form.description,
				domain: form.domain,
				skills: form.skills,
				eligibility: form.eligibility,
				location: form.location || "Remote",
				work_mode: form.work_mode,
				duration: form.duration,
				stipend: form.stipend ? Number(form.stipend) : null,
				deadline: form.deadline || null,
				source: "Nextern",
				apply_url: form.apply_url,
				is_curated: false,
				is_published: true
			}).select().single();
			if (insertError) throw insertError;
			try {
				const { data: students } = await supabase.from("student_profiles").select("user_id, preferred_domains").eq("onboarding_complete", true);
				if (students && students.length > 0) {
					const matches = students.filter((s) => (s.preferred_domains || []).some((d) => d.toLowerCase() === form.domain.toLowerCase()));
					const targetStudents = matches.length > 0 ? matches : students;
					const notificationsPayload = targetStudents.map((student) => ({
						user_id: student.user_id,
						title: "New Internship Match",
						message: `A new ${form.domain} internship "${form.title}" at "${companyName}" matches your profile!`,
						type: "new_internship",
						link: "/dashboard"
					}));
					if (notificationsPayload.length > 0) await supabase.from("notifications").insert(notificationsPayload);
					console.log(`[Email Dispatch Simulation] Sent new internship email alerts to ${targetStudents.length} students matching domain ${form.domain}.`);
				}
			} catch (notifyErr) {
				console.warn("Failed to dispatch new internship notifications:", notifyErr);
			}
			toast.success("Internship published & matching students notified!");
			navigate({ to: "/recruiter" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not publish");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Post an internship"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Students see this alongside curated listings, ranked against their profile."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-6 shadow-[var(--shadow-card)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Role title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.title,
										onChange: (e) => set({ title: e.target.value }),
										placeholder: "ML Intern"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Company name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.company_name || company?.name || "",
										onChange: (e) => set({ company_name: e.target.value }),
										placeholder: "Acme Labs"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Domain",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.domain,
									onValueChange: (domain) => set({ domain }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select domain" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: d,
										children: d
									}, d)) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 5,
									value: form.description,
									onChange: (e) => set({ description: e.target.value }),
									placeholder: "What the intern will work on, team, mentorship…"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Required skills",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
									value: form.skills,
									onChange: (skills) => set({ skills }),
									suggestions: SKILL_OPTIONS,
									placeholder: "Add a skill"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Eligibility",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.eligibility,
									onChange: (e) => set({ eligibility: e.target.value }),
									placeholder: "Pre-final year B.Tech students"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Location",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.location,
										onChange: (e) => set({ location: e.target.value }),
										placeholder: "Bengaluru, IN"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Monthly stipend (₹)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										value: form.stipend,
										onChange: (e) => set({ stipend: e.target.value }),
										placeholder: "30000"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Work mode",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: WORK_MODES,
									value: form.work_mode,
									onChange: ((work_mode) => set({ work_mode }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Duration",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: DURATIONS,
									value: form.duration,
									onChange: ((duration) => set({ duration }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Application deadline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: form.deadline,
										onChange: (e) => set({ deadline: e.target.value })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Apply link (official page)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.apply_url,
										onChange: (e) => set({ apply_url: e.target.value }),
										placeholder: "https://careers.acme.com/intern"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end border-t border-border pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: submit,
									disabled: busy,
									children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Publish internship"]
								})
							})
						]
					})
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-sm font-medium",
			children: label
		}), children]
	});
}
//#endregion
export { NewPosting as component };
