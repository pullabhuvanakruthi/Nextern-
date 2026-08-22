import { n as __exportAll$1 } from "../_runtime.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/course-link-tjJu6VN-.js
var course_link_tjJu6VN__exports = /* @__PURE__ */ __exportAll$1({
	n: () => course_link_exports,
	t: () => courseUrl
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var course_link_exports = /* @__PURE__ */ __exportAll({ courseUrl: () => courseUrl });
/** Direct link to a recommended course; falls back to a provider-scoped web search. */
function courseUrl(course) {
	const url = (course.url ?? "").trim();
	if (/^https?:\/\//i.test(url)) return url;
	return `https://www.google.com/search?q=${encodeURIComponent(`${course.title} ${course.provider} course`)}`;
}
//#endregion
export { course_link_tjJu6VN__exports as n, courseUrl as t };
