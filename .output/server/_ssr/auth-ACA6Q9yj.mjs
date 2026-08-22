import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-ACA6Q9yj.js
var $$splitComponentImporter = () => import("./auth-8JabcH1B.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (search) => search["role"] === "recruiter" ? { role: "recruiter" } : {},
	head: () => ({ meta: [
		{ title: "Sign in or create your account — Nextern" },
		{
			name: "description",
			content: "Create a free Nextern account to get ranked internship recommendations, or sign in as a recruiter to post openings."
		},
		{
			property: "og:title",
			content: "Sign in — Nextern"
		},
		{
			property: "og:description",
			content: "Students and recruiters sign in to Nextern here."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
