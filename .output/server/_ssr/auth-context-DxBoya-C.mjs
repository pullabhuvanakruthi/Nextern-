import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-DxBoya-C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadRole = async (user) => {
			if (!user) {
				setRole(null);
				return;
			}
			try {
				const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id).limit(1);
				if (error) throw error;
				const existing = data?.[0]?.role;
				if (existing) {
					if (active) setRole(existing);
					return;
				}
				const desired = user.user_metadata?.["role"] === "recruiter" ? "recruiter" : "student";
				const { error: insertError } = await supabase.from("user_roles").insert({
					user_id: user.id,
					role: desired
				});
				if (insertError) throw insertError;
				if (active) setRole(desired);
			} catch (err) {
				console.error("Failed to load user role:", err);
				if (active) setRole("student");
			}
		};
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			try {
				await loadRole(data.session?.user);
			} catch (err) {
				console.error("Error loading session role:", err);
			} finally {
				if (active) setLoading(false);
			}
		});
		const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			setSession(next);
			loadRole(next?.user);
			if (event === "SIGNED_OUT") queryClient.clear();
			else queryClient.invalidateQueries();
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, [queryClient]);
	const value = (0, import_react.useMemo)(() => ({
		user: session?.user ?? null,
		session,
		role,
		loading,
		signOut: async () => {
			await supabase.auth.signOut();
			setSession(null);
			setRole(null);
			queryClient.clear();
		}
	}), [
		session,
		role,
		loading,
		queryClient
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
