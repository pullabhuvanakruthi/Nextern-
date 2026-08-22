import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { m as useMyInternships, p as useMyCompany } from "./ai-queries-D3oXUHn6.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { H as Building2, b as LoaderCircle, m as Plus, n as Users } from "../_libs/lucide-react.mjs";
import { t as DeadlineBadge } from "./DeadlineBadge-DqATqPlp.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { n as CardContent, t as Card } from "./card-BM637P_-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter.index-fEaZPCsW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecruiterHome() {
	const { user } = useAuth();
	const { data: company, isLoading, refetch } = useMyCompany();
	const { data: postings = [] } = useMyInternships();
	const [name, setName] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("");
	const [about, setAbout] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (company) {
			setName(company.name ?? "");
			setWebsite(company.website ?? "");
			setIndustry(company.industry ?? "");
			setAbout(company.about ?? "");
		}
	}, [company]);
	const saveCompany = async () => {
		if (!name.trim()) {
			toast.error("Add your company name");
			return;
		}
		setBusy(true);
		try {
			const payload = {
				owner_id: user.id,
				name,
				website,
				industry,
				about
			};
			const { error } = company ? await supabase.from("companies").update(payload).eq("id", company.id) : await supabase.from("companies").insert(payload);
			if (error) throw error;
			toast.success("Company profile saved");
			await refetch();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-4 py-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold",
						children: "Recruiter portal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Post openings and see students ranked by how well they fit."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/recruiter/new",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Post internship"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mt-6 shadow-[var(--shadow-card)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-primary" }), " Company profile"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Company name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: name,
											onChange: (e) => setName(e.target.value),
											placeholder: "Acme Labs"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: website,
											onChange: (e) => setWebsite(e.target.value),
											placeholder: "https://acme.com"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Industry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: industry,
											onChange: (e) => setIndustry(e.target.value),
											placeholder: "SaaS"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "About" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									value: about,
									onChange: (e) => setAbout(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: saveCompany,
									disabled: busy || isLoading,
									children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Save company"]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 text-xl font-semibold",
					children: "Your postings"
				}),
				postings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "No openings yet. Post your first internship."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: postings.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-row flex-wrap items-center justify-between gap-4 p-5 shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									p.domain,
									" · ",
									p.location,
									" · ",
									p.work_mode
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineBadge, { deadline: p.deadline })
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/recruiter/$internshipId",
								params: { internshipId: p.id },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), " Matched candidates"]
							})
						})]
					}, p.id))
				})
			]
		})]
	});
}
//#endregion
export { RecruiterHome as component };
