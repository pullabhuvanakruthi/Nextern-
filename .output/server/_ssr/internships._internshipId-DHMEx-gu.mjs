import { F as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getPublicInternship } from "./public-internships.functions-BSUZxu_C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/internships._internshipId-DHMEx-gu.js
var $$splitComponentImporter = () => import("./internships._internshipId-DNeGiNnY.mjs");
var Route = createFileRoute("/internships/$internshipId")({
	loader: async ({ params }) => {
		const internship = await getPublicInternship({ data: { id: params.internshipId } });
		if (!internship) throw notFound();
		return internship;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Internship not found — Nextern" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `${loaderData.title} at ${loaderData.company_name} — Nextern`;
		const description = `${loaderData.title} internship at ${loaderData.company_name} in ${loaderData.location}. ${loaderData.duration}, ${loaderData.work_mode}. Apply via the official listing.`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
