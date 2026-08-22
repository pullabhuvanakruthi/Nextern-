import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as Clock, U as Banknote, _ as MapPin, p as Search } from "../_libs/lucide-react.mjs";
import { t as DeadlineBadge } from "./DeadlineBadge-DqATqPlp.mjs";
import { t as Navbar } from "./Navbar-CAX5iZjz.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { a as DOMAINS } from "./options-Br7fzcJ6.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as Route } from "./internships.index-BqOFBmV8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internships.index-JLZ6N2Kh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ALL = "all";
function BrowsePage() {
	const internships = Route.useLoaderData();
	const [q, setQ] = (0, import_react.useState)("");
	const [domain, setDomain] = (0, import_react.useState)(ALL);
	const results = (0, import_react.useMemo)(() => internships.filter((i) => {
		if (domain !== ALL && i.domain !== domain) return false;
		if (!q.trim()) return true;
		return `${i.title} ${i.company_name} ${i.location} ${i.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase());
	}), [
		internships,
		q,
		domain
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold",
					children: "Browse internships"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [internships.length, " verified openings. Sign in to see how each one matches your profile."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search role, company or skill",
							className: "pl-9"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: domain,
						onValueChange: setDomain,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-56",
							"aria-label": "Domain",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: ALL,
							children: "All domains"
						}), DOMAINS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d,
							children: d
						}, d))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 lg:grid-cols-2",
					children: results.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-0 shadow-[var(--shadow-card)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/internships/$internshipId",
							params: { internshipId: i.id },
							className: "block p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold leading-tight",
									children: i.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										i.company_name,
										" · ",
										i.domain
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: i.skills.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
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
												i.location,
												" · ",
												i.work_mode
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4" }), i.stipend ? `₹${i.stipend.toLocaleString("en-IN")}/mo` : "Not stated"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
												" ",
												i.duration
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: i.deadline })
									]
								})
							]
						})
					}, i.id))
				}),
				results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-center text-muted-foreground",
					children: "No internships match that search."
				})
			]
		})]
	});
}
//#endregion
export { BrowsePage as component };
