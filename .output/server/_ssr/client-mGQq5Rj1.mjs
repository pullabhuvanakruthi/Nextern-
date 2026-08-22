import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/client-mGQq5Rj1.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function sharedPreviewStorage() {
	if (typeof window === "undefined") return void 0;
	const parent = location.hostname.match(/^[^.]+\.([0-9a-f-]{36}\.lovableproject(?:-dev)?\.com)$/)?.[1];
	if (!parent) return localStorage;
	const attrs = `; Domain=${parent}; Path=/; SameSite=None; Secure; Partitioned`;
	const persist = `${attrs}; Max-Age=31536000`;
	const CHUNK = 3600, MAX_CHUNKS = 64;
	const raw = (n) => document.cookie.match(new RegExp("(?:^|; )" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"))?.[1];
	const readCookie = (k) => {
		let enc;
		if (raw(`${k}.0`) !== void 0) {
			enc = "";
			for (let i = 0; i < MAX_CHUNKS; i++) {
				const p = raw(`${k}.${i}`);
				if (p === void 0) break;
				enc += p;
			}
		} else enc = raw(k);
		if (enc === void 0) return null;
		try {
			return decodeURIComponent(enc);
		} catch {
			return null;
		}
	};
	const clearCookie = (k) => {
		document.cookie = `${k}=${attrs}; Max-Age=0`;
		for (let i = 0; i < MAX_CHUNKS && raw(`${k}.${i}`) !== void 0; i++) document.cookie = `${k}.${i}=${attrs}; Max-Age=0`;
	};
	return {
		getItem: (k) => {
			const c = readCookie(k);
			return c !== null ? c : localStorage.getItem(k);
		},
		setItem: (k, value) => {
			clearCookie(k);
			const enc = encodeURIComponent(value);
			if (enc.length <= CHUNK) document.cookie = `${k}=${enc}${persist}`;
			else for (let i = 0, o = 0; o < enc.length; i++, o += CHUNK) document.cookie = `${k}.${i}=${enc.slice(o, o + CHUNK)}${persist}`;
			if (readCookie(k) === value) localStorage.removeItem(k);
			else localStorage.setItem(k, value);
		},
		removeItem: (k) => {
			clearCookie(k);
			localStorage.removeItem(k);
		}
	};
}
function createSupabaseClient() {
	const SUPABASE_URL = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_MTH1EijluI9pyAUdr4cLtg_biVtiwlt",
		"VITE_SUPABASE_URL": "https://csvvattkvbayfxbarhjt.supabase.co"
	}["VITE_SUPABASE_URL"] || processModule.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_MTH1EijluI9pyAUdr4cLtg_biVtiwlt",
		"VITE_SUPABASE_URL": "https://csvvattkvbayfxbarhjt.supabase.co"
	}["VITE_SUPABASE_PUBLISHABLE_KEY"] || processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
		auth: {
			storage: sharedPreviewStorage(),
			persistSession: true,
			autoRefreshToken: true
		}
	});
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
