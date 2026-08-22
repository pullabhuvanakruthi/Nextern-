import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as useRejectionAnalyses, t as useAnalyzeRejection } from "./queries-DoJqRnYK.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { B as BookOpen, T as ExternalLink, l as Sparkles, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { t as courseUrl } from "./course-link-tjJu6VN-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RejectionPanel-C_LwZwwZ.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ title, items }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-1 list-disc space-y-1 pl-5 text-sm",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
	})] });
}
function RejectionPanel({ internshipId }) {
	const { data: analyses } = useRejectionAnalyses();
	const analyze = useAnalyzeRejection();
	const analysis = analyses?.[internshipId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "gap-3 border-dashed p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "What could have gone better?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "AI reviews your profile and resume against this role."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: analysis ? "outline" : "default",
				disabled: analyze.isPending,
				onClick: () => analyze.mutate(internshipId, { onError: (e) => toast.error(e instanceof Error ? e.message : "Analysis failed") }),
				children: [analyze.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), analysis ? "Re-analyse" : "Analyse rejection"]
			})]
		}), analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: analysis.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Skill gaps",
					items: analysis.skill_gaps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Resume gaps",
					items: analysis.resume_gaps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Experience gaps",
					items: analysis.experience_gaps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Next steps",
					items: analysis.next_steps
				}),
				analysis.courses?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }), " Courses to close the gap"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 space-y-1 text-sm",
					children: analysis.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: courseUrl(c),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "font-medium text-primary underline-offset-4 hover:underline",
							children: [c.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 inline size-3" })]
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"· ",
								c.provider,
								" — ",
								c.why
							]
						})
					] }, c.title))
				})] })
			]
		})]
	});
}
//#endregion
export { RejectionPanel as t };
