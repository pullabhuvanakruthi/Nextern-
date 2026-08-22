import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-BpE9Czok.mjs";
import { t as daysUntil } from "./matching-Ba8zFjsF.mjs";
import { F as CalendarClock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DeadlineBadge-DqATqPlp.js
var import_jsx_runtime = require_jsx_runtime();
function DeadlineBadge({ deadline, className }) {
	const days = daysUntil(deadline);
	if (days === null) return null;
	const label = days < 0 ? "Closed" : days === 0 ? "Closes today" : days === 1 ? "1 day left" : `${days} days left`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", days < 0 ? "bg-muted text-muted-foreground" : days <= 3 ? "bg-destructive/10 text-destructive" : days <= 7 ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }),
			" ",
			label
		]
	});
}
//#endregion
export { DeadlineBadge as t };
