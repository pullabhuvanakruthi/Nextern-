import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useCandidates, f as useMyInternships } from "./queries-DoJqRnYK.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { K as ArrowLeft, w as FileCheckCorner, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-CAX5iZjz.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as MatchScore } from "./MatchScore-CSkniks3.mjs";
import { t as Route } from "./recruiter._internshipId-BV9WWs9_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter._internshipId-DS1P4jP2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CandidatesPage() {
	const { internshipId } = Route.useParams();
	const { data: postings = [] } = useMyInternships();
	const { data: candidates = [], isLoading } = useCandidates(internshipId);
	const posting = postings.find((p) => p.id === internshipId);
	const ranked = (0, import_react.useMemo)(() => {
		const required = (posting?.skills ?? []).map((s) => s.toLowerCase());
		return candidates.map((c) => {
			const matched = (c.skills ?? []).filter((s) => required.includes(s.toLowerCase()));
			const domainFit = (c.interests ?? []).some((i) => i.toLowerCase() === (posting?.domain ?? "").toLowerCase());
			const score = Math.min(99, Math.round(25 + (required.length ? matched.length / required.length * 50 : 0) + (domainFit ? 15 : 0) + (c.has_resume ? 5 : 0) + (c.application_status ? 5 : 0)));
			return {
				...c,
				matched,
				score
			};
		}).sort((a, b) => b.score - a.score);
	}, [candidates, posting]);
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
						to: "/recruiter",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to postings"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: posting?.title ?? "Matched candidates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [ranked.length, " students ranked by suitability. Contact details stay private until a student applies."]
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
				}) : ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-center text-muted-foreground",
					children: "No student profiles match this opening yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-3",
					children: ranked.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "gap-3 p-5 shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: c.display_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [[
										c.degree,
										c.specialization,
										c.college
									].filter(Boolean).join(" · ") || "Profile in progress", c.graduation_year ? ` · Class of ${c.graduation_year}` : ""]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [c.application_status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: c.application_status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScore, { score: c.score })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: (c.skills ?? []).slice(0, 10).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: c.matched.includes(s) ? "default" : "secondary",
									className: c.matched.includes(s) ? "bg-primary-soft text-accent-foreground" : "",
									children: s
								}, s))
							}),
							c.has_resume && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-3.5 text-primary" }), " Resume on file"]
							})
						]
					}, c.user_id))
				})
			]
		})]
	});
}
//#endregion
export { CandidatesPage as component };
