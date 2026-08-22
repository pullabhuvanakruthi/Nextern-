import { r as __toESM } from "../_runtime.mjs";
import { M as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as AuthProvider } from "./auth-context-DxBoya-C.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$11 } from "./auth-ACA6Q9yj.mjs";
import { t as Route$12 } from "./internships._internshipId-DHMEx-gu.mjs";
import { t as Route$13 } from "./internships.index-BqOFBmV8.mjs";
import { t as Route$14 } from "./recruiter._internshipId-BV9WWs9_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DEwmGm74.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CWrh9oKQ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Nextern — Your Skills. Your Opportunity. Your Next Internship." },
			{
				name: "description",
				content: "Nextern matches students with real, verified internships using their skills, interests and goals — with match scores and clear reasons."
			},
			{
				property: "og:title",
				content: "Nextern"
			},
			{
				property: "og:description",
				content: "AI-powered internship discovery, recommendations and application tracking for students."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })] })
	});
}
var $$splitComponentImporter$9 = () => import("./routes-BdbEuNVA.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Nextern — Your Skills. Your Opportunity. Your Next Internship." },
		{
			name: "description",
			content: "Nextern is an AI-powered internship platform for students: profile-based recommendations with match scores, saved lists, an application tracker and deadline reminders."
		},
		{
			property: "og:title",
			content: "Nextern — AI-powered internship recommendations"
		},
		{
			property: "og:description",
			content: "Build a profile once, get ranked internships from verified sources, and track every application in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./route-D8uYuTig.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Students land in the guided profile builder before any match-driven screen. */
var $$splitComponentImporter$7 = () => import("./applications-DshQ_Lja.mjs");
var Route$7 = createFileRoute("/_authenticated/applications")({
	head: () => ({ meta: [
		{ title: "Application tracker — Nextern" },
		{
			name: "description",
			content: "Track every internship application from applied to interview to selected or rejected, in one pipeline."
		},
		{
			property: "og:title",
			content: "Application tracker — Nextern"
		},
		{
			property: "og:description",
			content: "See your whole internship pipeline at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-CgxuczGO.mjs");
var Route$6 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Your internship matches — Nextern" },
		{
			name: "description",
			content: "A ranked feed of internships scored against your skills, interests, location, duration and stipend preferences."
		},
		{
			property: "og:title",
			content: "Your internship matches — Nextern"
		},
		{
			property: "og:description",
			content: "Filter, save and give feedback on internships ranked for your profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./onboarding-AT6E-yvT.mjs");
var Route$5 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Build your profile — Nextern" },
		{
			name: "description",
			content: "Tell Nextern about your education, skills, interests and preferences to unlock ranked internship matches."
		},
		{
			property: "og:title",
			content: "Build your profile — Nextern"
		},
		{
			property: "og:description",
			content: "A four-step profile builder that powers your ranked internship matches."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./prepare-CWwKOTF-.mjs");
var Route$4 = createFileRoute("/_authenticated/prepare")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [
		{ title: "AI Mock Tests & Courses | Nextern" },
		{
			name: "description",
			content: "Take AI-generated mock tests based on your skills, see where you're weak, and get course recommendations to close the gap."
		},
		{
			property: "og:title",
			content: "AI Mock Tests & Courses | Nextern"
		},
		{
			property: "og:description",
			content: "Practice skill-based mock tests and get personalised course recommendations."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] })
});
var $$splitComponentImporter$3 = () => import("./profile-RVpbNFju.mjs");
var Route$3 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Your profile — Nextern" },
		{
			name: "description",
			content: "Manage the education, skills, interests, resume and preferences that power your Nextern recommendations."
		},
		{
			property: "og:title",
			content: "Your profile — Nextern"
		},
		{
			property: "og:description",
			content: "Keep your profile sharp to keep your matches sharp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./saved-Cksqs4Hl.mjs");
var Route$2 = createFileRoute("/_authenticated/saved")({
	head: () => ({ meta: [
		{ title: "Saved internships — Nextern" },
		{
			name: "description",
			content: "Your shortlisted internships with deadline reminders at 7, 3 and 1 days before closing."
		},
		{
			property: "og:title",
			content: "Saved internships — Nextern"
		},
		{
			property: "og:description",
			content: "Shortlist internships and never miss a deadline."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./recruiter.index-BXfPdBks.mjs");
var Route$1 = createFileRoute("/_authenticated/recruiter/")({
	head: () => ({ meta: [
		{ title: "Recruiter portal — Nextern" },
		{
			name: "description",
			content: "Post internships, manage your openings and review AI-matched student candidates."
		},
		{
			property: "og:title",
			content: "Recruiter portal — Nextern"
		},
		{
			property: "og:description",
			content: "Hire interns with AI-ranked candidate suitability."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./recruiter.new-DygifknT.mjs");
var Route = createFileRoute("/_authenticated/recruiter/new")({
	head: () => ({ meta: [
		{ title: "Post an internship — Nextern" },
		{
			name: "description",
			content: "Publish an internship opening on Nextern and reach students matched to your role."
		},
		{
			property: "og:title",
			content: "Post an internship — Nextern"
		},
		{
			property: "og:description",
			content: "Publish an opening and get AI-matched candidates."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRoute = Route$8.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$10
});
var AuthenticatedApplicationsRoute = Route$7.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$5.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPrepareRoute = Route$4.update({
	id: "/prepare",
	path: "/prepare",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$3.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSavedRoute = Route$2.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => AuthenticatedRouteRoute
});
var InternshipsIndexRoute = Route$13.update({
	id: "/internships/",
	path: "/internships/",
	getParentRoute: () => Route$10
});
var InternshipsInternshipIdRoute = Route$12.update({
	id: "/internships/$internshipId",
	path: "/internships/$internshipId",
	getParentRoute: () => Route$10
});
var AuthenticatedRecruiterIndexRoute = Route$1.update({
	id: "/recruiter/",
	path: "/recruiter/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedApplicationsRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedPrepareRoute,
	AuthenticatedProfileRoute,
	AuthenticatedSavedRoute,
	AuthenticatedRecruiterInternshipIdRoute: Route$14.update({
		id: "/recruiter/$internshipId",
		path: "/recruiter/$internshipId",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedRecruiterNewRoute: Route.update({
		id: "/recruiter/new",
		path: "/recruiter/new",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedRecruiterIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	InternshipsInternshipIdRoute,
	InternshipsIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
