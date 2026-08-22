import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as useSetApplicationStatus, b as useRemoveApplication, d as useInternships, n as useApplications } from "./ai-queries-D3oXUHn6.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { O as ExternalLink, b as LoaderCircle, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as DeadlineBadge } from "./DeadlineBadge-DqATqPlp.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { t as RejectionPanel } from "./RejectionPanel-DnMqq49j.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { d as STATUS_LABEL, t as APP_STATUSES } from "./options-Br7fzcJ6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications-Cj3E7Dzz.js
var import_jsx_runtime = require_jsx_runtime();
var TONE = {
	saved: "bg-secondary text-secondary-foreground",
	applied: "bg-primary-soft text-accent-foreground",
	interview: "bg-chart-4/20 text-foreground",
	selected: "bg-success/15 text-success",
	rejected: "bg-destructive/10 text-destructive"
};
function Tracker() {
	const { data: applications = [], isLoading } = useApplications();
	const { data: internships = [] } = useInternships();
	const setStatus = useSetApplicationStatus();
	const remove = useRemoveApplication();
	const byId = new Map(internships.map((i) => [i.id, i]));
	const counts = APP_STATUSES.map((s) => ({
		status: s,
		count: applications.filter((a) => a.status === s).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Application tracker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [applications.length, " applications tracked. Update the stage as you hear back."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5",
					children: counts.map(({ status, count }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "gap-1 p-4 shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-bold tabular-nums",
							children: count
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: STATUS_LABEL[status]
						})]
					}, status))
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
				}) : applications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No applications yet. Mark one as applied from an internship page."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Find matches"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-3",
					children: applications.map((a) => {
						const internship = byId.get(a.internship_id);
						if (!internship) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex flex-row flex-wrap items-center justify-between gap-4 p-5 shadow-[var(--shadow-card)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/internships/$internshipId",
											params: { internshipId: internship.id },
											className: "font-semibold hover:underline",
											children: internship.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												internship.company_name,
												" · ",
												internship.location
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2.5 py-1 text-xs font-medium", TONE[a.status]),
												children: STATUS_LABEL[a.status]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: internship.deadline })]
										}),
										a.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 p-3 bg-primary/5 border border-primary/10 rounded-lg text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-semibold text-primary mb-1 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "relative flex h-2 w-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })]
												}), "Message from Recruiter:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground leading-relaxed",
												children: a.notes
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: a.status,
											onValueChange: (status) => setStatus.mutate({
												internshipId: a.internship_id,
												status
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "w-40",
												"aria-label": "Application stage",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: APP_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: s,
												children: STATUS_LABEL[s]
											}, s)) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "icon",
											"aria-label": "Open apply page",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: internship.apply_url,
												target: "_blank",
												rel: "noopener noreferrer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Remove from tracker",
											onClick: () => remove.mutate(a.internship_id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								})]
							}), a.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectionPanel, { internshipId: a.internship_id })]
						}, a.id);
					})
				})
			]
		})]
	});
}
//#endregion
export { Tracker as component };
