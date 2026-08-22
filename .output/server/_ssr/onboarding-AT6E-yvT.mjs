import { r as __toESM } from "../_runtime.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useStudentProfile, T as useUpdateStudentProfile } from "./queries-DoJqRnYK.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { G as ArrowRight, K as ArrowLeft, N as Check, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-CAX5iZjz.mjs";
import { n as CardContent, t as Card } from "./card-BM637P_-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { a as DOMAINS, c as INTEREST_OPTIONS, f as STUDY_LEVELS, i as DEGREES, l as LOCATIONS, n as COMPANY_TYPES, o as DURATIONS, p as WORK_MODES, r as CURRENT_YEARS, s as GRADUATION_YEARS, u as SKILL_OPTIONS } from "./options-Br7fzcJ6.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { n as TagInput, t as ChoiceChips } from "./TagInput-CtBW2CUY.mjs";
import { n as Slider, t as ResumeUpload } from "./slider-D2oFZvzd.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-AT6E-yvT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Education",
	"Skills & resume",
	"Interests",
	"Preferences"
];
function OnboardingFlow() {
	const { data: saved, isLoading } = useStudentProfile();
	const update = useUpdateStudentProfile();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (saved && !draft) setDraft(saved);
	}, [saved, draft]);
	if (isLoading || !draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	const set = (patch) => setDraft((d) => ({
		...d,
		...patch
	}));
	const next = async () => {
		if (step === 0 && (!draft.full_name.trim() || !draft.degree)) {
			toast.error("Add your name and degree to continue");
			return;
		}
		if (step === 1 && draft.skills.length < 1) {
			toast.error("Add at least one skill");
			return;
		}
		const last = step === STEPS.length - 1;
		await update.mutateAsync({
			...draft,
			onboarding_complete: last || draft.onboarding_complete
		});
		if (last) {
			toast.success("Profile saved — here are your matches");
			navigate({ to: "/dashboard" });
			return;
		}
		toast.success("Saved");
		setStep((s) => s + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [
							"Step ",
							step + 1,
							" of ",
							STEPS.length,
							" · ",
							STEPS[step]
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [Math.round((step + 1) / STEPS.length * 100), "%"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: (step + 1) / STEPS.length * 100 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-3",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setStep(i),
						className: cn("text-xs font-medium transition-colors", i <= step ? "text-primary" : "text-muted-foreground"),
						children: [i < step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3" }), s]
					}, s))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-[var(--shadow-card)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-6 p-6 sm:p-8",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.full_name,
								onChange: (e) => set({ full_name: e.target.value }),
								placeholder: "Ananya Sharma"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Degree",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: draft.degree,
								onValueChange: (v) => set({ degree: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select your degree" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEGREES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: d,
									children: d
								}, d)) })]
							})
						}),
						draft.degree === "Other" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tell us your degree",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.degree_other,
								onChange: (e) => set({ degree_other: e.target.value }),
								placeholder: "e.g. B.Des"
							})
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Current year",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: draft.current_year,
									onValueChange: (v) => set({ current_year: v }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select year" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CURRENT_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: y,
										children: y
									}, y)) })]
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
						})
					] }),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Your skills",
						hint: "Pick from the suggestions, or type your own (Other) and press Enter. One skill is enough.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
							value: draft.skills,
							onChange: (skills) => set({ skills }),
							suggestions: SKILL_OPTIONS,
							allowOther: true,
							otherPlaceholder: "Other skill",
							placeholder: "e.g. Python"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeUpload, { profile: saved })] }),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Areas you're interested in",
						hint: "We rank internships in these areas higher.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceChips, {
							options: INTEREST_OPTIONS,
							value: draft.interests,
							multiple: true,
							allowOther: true,
							otherPlaceholder: "Other interest",
							onChange: ((interests) => set({ interests }))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Career goal",
						hint: "One line is enough — it shapes your recommendations.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: draft.career_goals,
							onChange: (e) => set({ career_goals: e.target.value }),
							placeholder: "Become an ML engineer at a product company",
							rows: 3
						})
					})] }),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
							hint: "Pick a suggestion or type any other location and press Enter.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagInput, {
								value: draft.preferred_locations,
								onChange: (preferred_locations) => set({ preferred_locations }),
								suggestions: LOCATIONS,
								allowOther: true,
								otherPlaceholder: "Other location",
								placeholder: "e.g. Bengaluru, IN"
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
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => setStep((s) => Math.max(0, s - 1)),
							disabled: step === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: next,
							disabled: update.isPending,
							children: [
								update.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }),
								step === STEPS.length - 1 ? "See my matches" : "Save & continue",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						})]
					})
				]
			})
		})]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm font-medium",
				children: label
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: hint
			}),
			children
		]
	});
}
function OnboardingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-10 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Build your profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "The more you share, the sharper your match scores get."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingFlow, {})]
		})]
	});
}
//#endregion
export { OnboardingPage as component };
