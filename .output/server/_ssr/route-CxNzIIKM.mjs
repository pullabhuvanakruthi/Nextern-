import { r as __toESM } from "../_runtime.mjs";
import { _ as Navigate, f as Outlet, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { T as useStudentProfile, i as useAssistantSend, r as useAssistantMessages } from "./ai-queries-D3oXUHn6.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { W as Bot, b as LoaderCircle, f as Send, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CxNzIIKM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROMPTS = [
	"Make my resume more ATS-friendly",
	"Rewrite my project bullets with impact",
	"What skills should I add for AI/ML roles?"
];
function AssistantWidget() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [input, setInput] = (0, import_react.useState)("");
	const { data: messages = [] } = useAssistantMessages();
	const send = useAssistantSend();
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		messages.length,
		send.isPending,
		open
	]);
	const submit = (text) => {
		const value = text.trim();
		if (!value || send.isPending) return;
		setInput("");
		send.mutate(value, { onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong") });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		onClick: () => setOpen(true),
		className: "fixed bottom-5 right-5 z-50 h-12 gap-2 rounded-full px-5 shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" }), " AI Assistant"]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-5 right-5 z-50 flex h-[32rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "Nextern AI Assistant"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Resume & ATS coaching"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setOpen(false),
					"aria-label": "Close assistant",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto px-4 py-4",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Ask me to tighten your resume, fix ATS issues, or prep for an interview."
						}), PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => submit(p),
							className: "block w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted",
							children: p
						}, p))]
					}),
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm", m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"),
						children: m.content
					}, m.id)),
					send.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-fit rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground",
						children: "Thinking…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-2 border-t border-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							submit(input);
						}
					},
					placeholder: "Ask about your resume…",
					rows: 1,
					className: "max-h-28 min-h-10 resize-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					onClick: () => submit(input),
					disabled: send.isPending,
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
				})]
			})
		]
	})] });
}
/** Students land in the guided profile builder before any match-driven screen. */
function AuthedShell() {
	const { pathname } = useLocation();
	const { role, loading } = useAuth();
	const { data: profile, isLoading } = useStudentProfile();
	const isRecruiter = role === "recruiter";
	const exempt = pathname.startsWith("/onboarding");
	if (!isRecruiter && (loading || isLoading)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
	});
	if (!isRecruiter && !exempt && profile && !profile.onboarding_complete) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/onboarding",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), !isRecruiter && !exempt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantWidget, {})] });
}
//#endregion
export { AuthedShell as component };
