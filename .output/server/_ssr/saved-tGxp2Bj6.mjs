import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as useToggleSave, S as useSetApplicationStatus, T as useStudentProfile, d as useInternships, n as useApplications, w as useSetReminderPrefs, x as useSaved, y as useReminderPrefs } from "./ai-queries-D3oXUHn6.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { i as scoreInternship, t as daysUntil } from "./matching-Ba8zFjsF.mjs";
import { Y as BellRing, b as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { t as InternshipCard } from "./InternshipCard-1qzylkJO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-tGxp2Bj6.js
var import_jsx_runtime = require_jsx_runtime();
var REMINDER_DAYS = [
	7,
	3,
	1
];
function SavedPage() {
	const { data: profile } = useStudentProfile();
	const { data: internships = [], isLoading } = useInternships();
	const { data: saved = [] } = useSaved();
	const { data: reminderDays = [
		7,
		3,
		1
	] } = useReminderPrefs();
	const setReminders = useSetReminderPrefs();
	const toggleSave = useToggleSave();
	const { data: applications = [] } = useApplications();
	const setStatus = useSetApplicationStatus();
	const savedIds = saved.map((s) => s.internship_id);
	const items = internships.filter((i) => savedIds.includes(i.id));
	const dueSoon = items.filter((i) => {
		const d = daysUntil(i.deadline);
		return d !== null && d >= 0 && reminderDays.some((r) => d <= r);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Saved internships"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [items.length, " shortlisted. We nudge you before each deadline."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-6 gap-3 p-5 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "size-4 text-primary" }), " Deadline reminders"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: REMINDER_DAYS.map((d) => {
								const active = reminderDays.includes(d);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setReminders.mutate(active ? reminderDays.filter((x) => x !== d) : [...reminderDays, d].sort((a, b) => b - a)),
									className: cn("rounded-full border px-4 py-1.5 text-sm font-medium transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"),
									children: [
										d,
										" day",
										d > 1 ? "s" : "",
										" before"
									]
								}, d);
							})
						}),
						dueSoon.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1.5 text-sm",
							children: dueSoon.map((i) => {
								const d = daysUntil(i.deadline);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg bg-accent px-3 py-2 text-accent-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.title }),
										" at ",
										i.company_name,
										" closes",
										" ",
										d === 0 ? "today" : `in ${d} day${d > 1 ? "s" : ""}`,
										"."
									]
								}, i.id);
							})
						})
					]
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
				}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Nothing saved yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Find matches"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 lg:grid-cols-2",
					children: items.map((internship) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternshipCard, {
						item: profile ? scoreInternship(internship, profile) : {
							internship,
							score: 0,
							matchedSkills: [],
							matchedInterests: [],
							reason: "",
							reasons: []
						},
						saved: true,
						onToggleSave: () => toggleSave.mutate({
							internshipId: internship.id,
							saved: true
						}),
						status: applications.find((a) => a.internship_id === internship.id)?.status,
						onMarkApplied: () => setStatus.mutate({
							internshipId: internship.id,
							status: "applied"
						})
					}, internship.id))
				})
			]
		})]
	});
}
//#endregion
export { SavedPage as component };
