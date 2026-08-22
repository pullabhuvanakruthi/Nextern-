import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TagInput-CtBW2CUY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChoiceChips({ options, value, onChange, multiple = false, allowOther = false, otherPlaceholder = "Type your own" }) {
	const selected = Array.isArray(value) ? value : value ? [value] : [];
	const [otherOpen, setOtherOpen] = (0, import_react.useState)(false);
	const [otherDraft, setOtherDraft] = (0, import_react.useState)("");
	const custom = selected.filter((s) => !options.includes(s));
	const toggle = (option) => {
		if (multiple) onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option]);
		else onChange(selected[0] === option ? "" : option);
	};
	const addOther = () => {
		const t = otherDraft.trim();
		if (!t) return;
		if (multiple) {
			if (!selected.some((s) => s.toLowerCase() === t.toLowerCase())) onChange([...selected, t]);
		} else onChange(t);
		setOtherDraft("");
		setOtherOpen(false);
	};
	const chip = (option, active) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => toggle(option),
		className: cn("rounded-full border px-4 py-2 text-sm font-medium transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"),
		children: option
	}, option);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				options.map((option) => chip(option, selected.includes(option))),
				custom.map((option) => chip(option, true)),
				allowOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOtherOpen((o) => !o),
					className: cn("rounded-full border px-4 py-2 text-sm font-medium transition-colors", otherOpen ? "border-primary bg-primary-soft" : "border-dashed border-border bg-card hover:bg-muted"),
					children: "+ Other"
				})
			]
		}), allowOther && otherOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: otherDraft,
				onChange: (e) => setOtherDraft(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						addOther();
					}
				},
				placeholder: otherPlaceholder,
				className: "max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: addOther,
				children: "Add"
			})]
		})]
	});
}
function TagInput({ value, onChange, suggestions = [], placeholder = "Type and press Enter", allowOther = false, otherPlaceholder = "Type your own" }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const [otherOpen, setOtherOpen] = (0, import_react.useState)(false);
	const [otherDraft, setOtherDraft] = (0, import_react.useState)("");
	const add = (tag) => {
		const t = tag.trim();
		if (!t) return;
		if (value.some((v) => v.toLowerCase() === t.toLowerCase())) return;
		onChange([...value, t]);
		setDraft("");
	};
	const filtered = (0, import_react.useMemo)(() => {
		const q = draft.trim().toLowerCase();
		return suggestions.filter((s) => !value.some((v) => v.toLowerCase() === s.toLowerCase())).filter((s) => q ? s.toLowerCase().includes(q) : true).slice(0, 10);
	}, [
		draft,
		suggestions,
		value
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 rounded-lg border border-input bg-card p-2",
				children: [value.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gap-1 bg-primary-soft py-1 text-accent-foreground",
					children: [tag, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Remove ${tag}`,
						onClick: () => onChange(value.filter((v) => v !== tag)),
						className: "rounded-full transition-opacity hover:opacity-70",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})]
				}, tag)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === ",") {
							e.preventDefault();
							add(draft);
						} else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
					},
					placeholder,
					className: "h-8 min-w-40 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
				})]
			}),
			(filtered.length > 0 || allowOther) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [filtered.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-7 rounded-full text-xs font-medium",
					onClick: () => add(s),
					children: ["+ ", s]
				}, s)), allowOther && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: otherOpen ? "secondary" : "outline",
					size: "sm",
					className: "h-7 rounded-full border-dashed text-xs font-medium",
					onClick: () => setOtherOpen((o) => !o),
					children: "+ Other"
				})]
			}),
			allowOther && otherOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: otherDraft,
					onChange: (e) => setOtherDraft(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							add(otherDraft);
							setOtherDraft("");
							setOtherOpen(false);
						}
					},
					placeholder: otherPlaceholder,
					className: "max-w-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						add(otherDraft);
						setOtherDraft("");
						setOtherOpen(false);
					},
					children: "Add"
				})]
			})
		]
	});
}
//#endregion
export { TagInput as n, ChoiceChips as t };
