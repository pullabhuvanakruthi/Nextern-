import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { T as useUpdateStudentProfile, p as useParseResume } from "./queries-DoJqRnYK.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { S as FileText, l as Sparkles, o as Trash2, r as Upload, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/slider-D2oFZvzd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_BYTES = 5242880;
var ALLOWED = [
	".pdf",
	".doc",
	".docx"
];
function ResumeUpload({ profile }) {
	const { user } = useAuth();
	const update = useUpdateStudentProfile();
	const inputRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const parse = useParseResume();
	const extract = () => {
		parse.mutate(void 0, {
			onSuccess: async (insights) => {
				const merged = Array.from(new Set([...profile.skills ?? [], ...insights.skills ?? []].map((s) => s.trim()).filter(Boolean)));
				await update.mutateAsync({ skills: merged });
				toast.success(`Added ${merged.length - (profile.skills?.length ?? 0)} skills from your resume`);
			},
			onError: (e) => toast.error(e instanceof Error ? e.message : "Could not read your resume")
		});
	};
	const handleFile = async (file) => {
		const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
		if (!ALLOWED.includes(ext)) {
			toast.error("Upload a PDF, DOC or DOCX file");
			return;
		}
		if (file.size > MAX_BYTES) {
			toast.error("Resume must be under 5 MB");
			return;
		}
		setBusy(true);
		try {
			const path = `${user.id}/resume${ext}`;
			const { error } = await supabase.storage.from("resumes").upload(path, file, { upsert: true });
			if (error) throw error;
			await update.mutateAsync({
				resume_path: path,
				resume_name: file.name,
				resume_uploaded_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast.success("Resume uploaded — it now feeds your match scores");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed");
		} finally {
			setBusy(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	};
	const remove = async () => {
		if (!profile.resume_path) return;
		setBusy(true);
		try {
			await supabase.storage.from("resumes").remove([profile.resume_path]);
			await update.mutateAsync({
				resume_path: null,
				resume_name: null,
				resume_uploaded_at: null
			});
			toast.success("Resume removed");
		} finally {
			setBusy(false);
		}
	};
	const download = async () => {
		if (!profile.resume_path) return;
		const { data, error } = await supabase.storage.from("resumes").createSignedUrl(profile.resume_path, 60);
		if (error || !data) {
			toast.error("Could not open resume");
			return;
		}
		window.open(data.signedUrl, "_blank", "noopener");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: ".pdf,.doc,.docx",
			className: "hidden",
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) handleFile(file);
			}
		}), profile.resume_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: profile.resume_name ?? "Resume"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Uploaded",
						" ",
						profile.resume_uploaded_at ? new Date(profile.resume_uploaded_at).toLocaleDateString() : "recently"
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: download,
						children: "View"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: extract,
						disabled: parse.isPending,
						children: [parse.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Extract skills"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => inputRef.current?.click(),
						disabled: busy,
						children: "Replace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Remove resume",
						onClick: remove,
						disabled: busy,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Upload your resume (optional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "PDF, DOC or DOCX up to 5 MB. Stored privately and only visible to you."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => inputRef.current?.click(),
				disabled: busy,
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Upload resume"]
			})]
		})]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
//#endregion
export { Slider as n, ResumeUpload as t };
