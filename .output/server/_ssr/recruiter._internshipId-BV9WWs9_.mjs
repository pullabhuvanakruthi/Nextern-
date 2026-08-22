import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter._internshipId-BV9WWs9_.js
var $$splitComponentImporter = () => import("./recruiter._internshipId-DS1P4jP2.mjs");
var Route = createFileRoute("/_authenticated/recruiter/$internshipId")({
	head: () => ({ meta: [
		{ title: "Matched candidates — Nextern" },
		{
			name: "description",
			content: "Students ranked by how well their skills and interests fit this internship opening."
		},
		{
			property: "og:title",
			content: "Matched candidates — Nextern"
		},
		{
			property: "og:description",
			content: "AI-ranked candidate suitability for your opening."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
