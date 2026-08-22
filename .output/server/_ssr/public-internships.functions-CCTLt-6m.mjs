import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/public-internships.functions-CCTLt-6m.js
function publicClient() {
	const key = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	const url = processModule.env["SUPABASE_URL"];
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	});
}
var listPublicInternships_createServerFn_handler = createServerRpc({
	id: "bb9a29aa8f83b6236ec85a32133133234e5380571504577e889e1f28c67944c5",
	name: "listPublicInternships",
	filename: "src/lib/public-internships.functions.ts"
}, (opts) => listPublicInternships.__executeServer(opts));
var listPublicInternships = createServerFn({ method: "GET" }).handler(listPublicInternships_createServerFn_handler, async () => {
	const { data, error } = await publicClient().from("internships").select("*").eq("is_published", true).order("created_at", { ascending: false });
	if (error) return [];
	return data ?? [];
});
var getPublicInternship_createServerFn_handler = createServerRpc({
	id: "5d4b40d7330b21f981f5c398c0905a6f67ed3f675dba00e95e490fab1590f781",
	name: "getPublicInternship",
	filename: "src/lib/public-internships.functions.ts"
}, (opts) => getPublicInternship.__executeServer(opts));
var getPublicInternship = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(getPublicInternship_createServerFn_handler, async ({ data: input }) => {
	const { data, error } = await publicClient().from("internships").select("*").eq("is_published", true).eq("id", input.id).maybeSingle();
	if (error) return null;
	return data ?? null;
});
//#endregion
export { getPublicInternship_createServerFn_handler, listPublicInternships_createServerFn_handler };
