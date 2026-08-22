import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-BpE9Czok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchScore-CSkniks3.js
var import_jsx_runtime = require_jsx_runtime();
function MatchScore({ score, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums", score >= 80 ? "bg-primary text-primary-foreground" : score >= 60 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground", className),
		children: [
			"Match ",
			score,
			"%"
		]
	});
}
//#endregion
export { MatchScore as t };
