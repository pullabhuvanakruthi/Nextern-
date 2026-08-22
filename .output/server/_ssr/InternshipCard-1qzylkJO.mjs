import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { C as FileSearch, D as Circle, E as Clock, R as Bookmark, U as Banknote, _ as MapPin, c as ThumbsDown, k as CircleCheck, l as Sparkles, s as ThumbsUp, z as BookmarkCheck } from "../_libs/lucide-react.mjs";
import { t as DeadlineBadge } from "./DeadlineBadge-DqATqPlp.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { d as STATUS_LABEL } from "./options-Br7fzcJ6.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as MatchScore } from "./MatchScore-CSkniks3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InternshipCard-1qzylkJO.js
var import_jsx_runtime = require_jsx_runtime();
function InternshipCard({ item, saved, onToggleSave, feedback, onFeedback, showScore = true, status, onMarkApplied }) {
	const { internship } = item;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group gap-0 overflow-hidden p-0 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/internships/$internshipId",
			params: { internshipId: internship.id },
			className: "block p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold leading-tight sm:text-lg",
							children: internship.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								internship.company_name,
								" · ",
								internship.domain
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-col items-end gap-2",
						children: [showScore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScore, { score: item.score }), onMarkApplied && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", status && status !== "saved" ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"),
							children: [status && status !== "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-3.5" }), status && status !== "saved" ? STATUS_LABEL[status] : "Not applied"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: internship.skills.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: item.matchedSkills.includes(s) ? "default" : "secondary",
						className: cn("font-medium", item.matchedSkills.includes(s) && "bg-primary-soft text-accent-foreground"),
						children: s
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground",
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4" }), internship.stipend ? `₹${internship.stipend.toLocaleString("en-IN")}/mo` : "Unpaid / not stated"]
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
				showScore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 inline-flex items-start gap-2 rounded-lg bg-primary-soft px-3 py-2 text-sm text-accent-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 size-4 shrink-0" }), item.reason]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 border-t border-border bg-surface px-5 py-3 sm:px-6",
			children: [
				onToggleSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: saved ? "secondary" : "ghost",
					size: "sm",
					onClick: onToggleSave,
					children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), saved ? "Saved" : "Save for later"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: ["Source: ", internship.source]
				}),
				onMarkApplied && status !== "rejected" && (!status || status === "saved") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: onMarkApplied,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Mark as applied"]
				}),
				status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/applications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "size-4" }), " View rejection summary"]
					})
				}),
				onFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: feedback === "up" ? "default" : "ghost",
						size: "icon",
						"aria-label": "Good match",
						onClick: () => onFeedback(feedback === "up" ? null : "up"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: feedback === "down" ? "default" : "ghost",
						size: "icon",
						"aria-label": "Not interested",
						onClick: () => onFeedback(feedback === "down" ? null : "down"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-4" })
					})]
				})
			]
		})]
	});
}
//#endregion
export { InternshipCard as t };
