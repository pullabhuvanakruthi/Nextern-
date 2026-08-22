import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-WxHpCbwH.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "inline-flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-brand grid size-8 place-items-center rounded-lg text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-card)]",
			children: "N"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "gradient-text text-base font-extrabold tracking-tight",
				children: "Nextern"
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 text-[11px] font-medium text-muted-foreground",
				children: "Your Skills. Your Opportunity."
			})]
		})]
	});
}
//#endregion
export { Logo as t };
