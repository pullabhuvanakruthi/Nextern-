import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as listPublicInternships } from "./public-internships.functions-BSUZxu_C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internships.index-BqOFBmV8.js
var $$splitComponentImporter = () => import("./internships.index-JLZ6N2Kh.mjs");
var Route = createFileRoute("/internships/")({
	loader: () => listPublicInternships(),
	head: () => ({ meta: [
		{ title: "Browse internships — Nextern" },
		{
			name: "description",
			content: "Browse verified internship openings across AI/ML, software, data, design and more — each with the original apply link."
		},
		{
			property: "og:title",
			content: "Browse internships — Nextern"
		},
		{
			property: "og:description",
			content: "Verified internship listings from official career pages and recruiters."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
