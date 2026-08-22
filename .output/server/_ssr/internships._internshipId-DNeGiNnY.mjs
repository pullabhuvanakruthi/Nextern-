import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { S as useStudentProfile, n as useApplications, v as useSaved, w as useToggleSave, y as useSetApplicationStatus } from "./queries-DoJqRnYK.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { i as scoreInternship } from "./matching-Ba8zFjsF.mjs";
import { D as Circle, E as Clock, K as ArrowLeft, R as Bookmark, T as ExternalLink, U as Banknote, _ as MapPin, d as ShieldCheck, k as CircleCheck, l as Sparkles, x as GraduationCap, z as BookmarkCheck } from "../_libs/lucide-react.mjs";
import { t as DeadlineBadge } from "./DeadlineBadge-DqATqPlp.mjs";
import { t as Navbar } from "./Navbar-CAX5iZjz.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { t as RejectionPanel } from "./RejectionPanel-C_LwZwwZ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { d as STATUS_LABEL, t as APP_STATUSES } from "./options-Br7fzcJ6.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as MatchScore } from "./MatchScore-CSkniks3.mjs";
import { t as Route } from "./internships._internshipId-DHMEx-gu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internships._internshipId-DNeGiNnY.js
var import_jsx_runtime = require_jsx_runtime();
function InternshipDetail() {
	const internship = Route.useLoaderData();
	const { user } = useAuth();
	const { data: profile } = useStudentProfile();
	const { data: saved = [] } = useSaved();
	const { data: applications = [] } = useApplications();
	const toggleSave = useToggleSave();
	const setStatus = useSetApplicationStatus();
	const isSaved = saved.some((s) => s.internship_id === internship.id);
	const application = applications.find((a) => a.internship_id === internship.id);
	const scored = profile ? scoreInternship(internship, profile) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-4xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/internships",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to internships"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold leading-tight",
						children: internship.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							internship.company_name,
							" · ",
							internship.domain
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [scored && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScore, {
							score: scored.score,
							className: "text-sm"
						}), user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: application && application.status !== "saved" ? "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success" : "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground",
							children: [application && application.status !== "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3.5" }), application && application.status !== "saved" ? STATUS_LABEL[application.status] : "Not applied"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
								" ",
								internship.location,
								" · ",
								internship.work_mode
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4" }), internship.stipend ? `₹${internship.stipend.toLocaleString("en-IN")}/mo` : "Stipend not stated"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
								" ",
								internship.duration
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: internship.deadline })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: internship.apply_url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [
								"Apply on ",
								internship.source,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
							]
						})
					}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "lg",
							onClick: () => toggleSave.mutate({
								internshipId: internship.id,
								saved: isSaved
							}),
							children: [isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), isSaved ? "Saved" : "Save for later"]
						}),
						(!application || application.status === "saved") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "lg",
							onClick: () => setStatus.mutate({
								internshipId: internship.id,
								status: "applied"
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Mark as applied"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: application?.status ?? "",
							onValueChange: (status) => setStatus.mutate({
								internshipId: internship.id,
								status
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-10 w-48",
								"aria-label": "Track application",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Track application" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: APP_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: STATUS_LABEL[s]
							}, s)) })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Sign in to save & track"
						})
					})]
				}),
				application?.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectionPanel, { internshipId: internship.id })
				}),
				scored && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-8 gap-3 p-6 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), " Recommended because"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5 text-sm text-muted-foreground",
						children: scored.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", r] }, r))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-6 gap-4 p-6 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "About this internship"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
							children: internship.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Skills"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: internship.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: scored?.matchedSkills.includes(s) ? "default" : "secondary",
								className: scored?.matchedSkills.includes(s) ? "bg-primary-soft text-accent-foreground" : "",
								children: s
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "inline-flex items-center gap-1.5 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), " Eligibility"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: internship.eligibility
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-primary" }),
								"Listed from ",
								internship.source,
								". Applications always happen on the company's official page — Next Intern never collects application fees."
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { InternshipDetail as component };
