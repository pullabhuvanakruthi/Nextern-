import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-O6mcWyOU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-internships.functions-DoqtRRO2.js
var listPublicInternships = createServerFn({ method: "GET" }).handler(createSsrRpc("bb9a29aa8f83b6236ec85a32133133234e5380571504577e889e1f28c67944c5"));
var getPublicInternship = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(createSsrRpc("5d4b40d7330b21f981f5c398c0905a6f67ed3f675dba00e95e490fab1590f781"));
//#endregion
export { listPublicInternships as n, getPublicInternship as t };
