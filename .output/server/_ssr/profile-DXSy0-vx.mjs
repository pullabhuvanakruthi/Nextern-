import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { T as useStudentProfile, k as useUpdateStudentProfile } from "./ai-queries-D3oXUHn6.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as profileCompleteness } from "./matching-Ba8zFjsF.mjs";
import { b as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { n as CardContent, t as Card } from "./card-BM637P_-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { a as DOMAINS, c as INTEREST_OPTIONS, f as STUDY_LEVELS, i as DEGREES, l as LOCATIONS, n as COMPANY_TYPES, o as DURATIONS, p as WORK_MODES, s as GRADUATION_YEARS, u as SKILL_OPTIONS } from "./options-Br7fzcJ6.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { n as TagInput, t as ChoiceChips } from "./TagInput-CtBW2CUY.mjs";
import { n as Slider, t as ResumeUpload } from "./slider-DeFiYGs6.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DXSy0-vx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user } = useAuth();
	const { data: saved, isLoading } = useStudentProfile();
	const update = useUpdateStudentProfile();
	const [draft, setDraft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (saved) setDraft((d) => d ?? saved);
	}, [saved]);
	if (isLoading || !draft || !saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
		})]
	});
	const set = (patch) => setDraft((d) => ({
		...d,
		...patch
	}));
	const completeness = profileCompleteness(draft);
	const save = async () => {
		await update.mutateAsync(draft);
		toast.success("Profile updated — your matches have been re-ranked");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold",
						children: "Your profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: user?.email
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/onboarding",
							children: "Guided setup"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-6 gap-3 p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Profile completeness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted-foreground",
							children: [completeness, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: completeness })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-6 shadow-[var(--shadow-card)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-6 p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeUpload, { profile: saved }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.full_name,
									onChange: (e) => set({ full_name: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Degree",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: draft.degree,
										onValueChange: (v) => set({ degree: v }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select degree" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEGREES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: d,
											children: d
										}, d)) })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Graduation year",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: draft.graduation_year,
										onValueChange: (v) => set({ graduation_year: v }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select year" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: GRADUATION_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: y,
											children: y
										}, y)) })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Study level",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: STUDY_LEVELS,
									allowOther: true,
									otherPlaceholder: "Other study level",
									value: draft.study_level,
									onChange: ((study_level) => set({ study_level }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Skills",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
									value: draft.skills,
									onChange: (skills) => set({ skills }),
									suggestions: SKILL_OPTIONS,
									allowOther: true,
									otherPlaceholder: "Other skill",
									placeholder: "Add a skill"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Interests",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: INTEREST_OPTIONS,
									value: draft.interests,
									multiple: true,
									allowOther: true,
									otherPlaceholder: "Other interest",
									onChange: ((interests) => set({ interests }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preferred domains",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: DOMAINS,
									value: draft.preferred_domains,
									multiple: true,
									allowOther: true,
									otherPlaceholder: "Other domain",
									onChange: ((preferred_domains) => set({ preferred_domains }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preferred locations",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
									value: draft.preferred_locations,
									onChange: (preferred_locations) => set({ preferred_locations }),
									suggestions: LOCATIONS,
									allowOther: true,
									otherPlaceholder: "Other location",
									placeholder: "Add a location"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Work mode",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: WORK_MODES,
									value: draft.work_mode,
									onChange: ((work_mode) => set({ work_mode }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Duration",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: DURATIONS,
									value: draft.duration,
									onChange: ((duration) => set({ duration }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Company type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
									options: COMPANY_TYPES,
									value: draft.company_type,
									onChange: ((company_type) => set({ company_type }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `Minimum monthly stipend — ₹${draft.min_stipend.toLocaleString("en-IN")}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [draft.min_stipend],
									min: 0,
									max: 1e5,
									step: 5e3,
									onValueChange: ([v]) => set({ min_stipend: v ?? 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Career goals",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									value: draft.career_goals,
									onChange: (e) => set({ career_goals: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end border-t border-border pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: save,
									disabled: update.isPending,
									children: [update.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Save changes"]
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
export { ProfilePage as component };
