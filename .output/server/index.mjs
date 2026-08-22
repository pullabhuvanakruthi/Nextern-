globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-22T12:14:49.146Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-22T12:14:49.162Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/applications-Ctr1RA6R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-GDBPD4xcB2YWDU7LSFYniIcFpU8\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 4387,
		"path": "../public/assets/applications-Ctr1RA6R.js"
	},
	"/assets/ai-queries-CLfwR_rq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5101-sI3JaLAAvQfAM9Breps0atGtgoY\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 20737,
		"path": "../public/assets/ai-queries-CLfwR_rq.js"
	},
	"/assets/arrow-left-cdkcI1Tw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-AaKUmQmcxkL+2CQZchZYV7YmK7Y\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 155,
		"path": "../public/assets/arrow-left-cdkcI1Tw.js"
	},
	"/assets/arrow-right-aB-K4HGy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-wbSTwYTboMhNoJ3gX6EUsIM6Dio\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 155,
		"path": "../public/assets/arrow-right-aB-K4HGy.js"
	},
	"/assets/auth-BcspX8y2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a94-OUXo3uWlALXL8ZHAUGpmd830qq0\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 10900,
		"path": "../public/assets/auth-BcspX8y2.js"
	},
	"/assets/badge-e5FL-1Tp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b-jYfCx5bYvJBDzJxSr1sHaln20vc\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 779,
		"path": "../public/assets/badge-e5FL-1Tp.js"
	},
	"/assets/bell-ring-D89TuuZF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183-flbvD/fsdkPH7ywEuea95kElFlw\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 387,
		"path": "../public/assets/bell-ring-D89TuuZF.js"
	},
	"/assets/bookmark-B9M7p0RI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-Qc/vAA4hJDxT6NLMwbGe/xRiFXI\"",
		"mtime": "2026-08-22T23:20:37.291Z",
		"size": 220,
		"path": "../public/assets/bookmark-B9M7p0RI.js"
	},
	"/assets/building-2-DUGpA1Sz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-dmCnU+r5LbWlJDf31AGYlJOtcm0\"",
		"mtime": "2026-08-22T23:20:37.291Z",
		"size": 373,
		"path": "../public/assets/building-2-DUGpA1Sz.js"
	},
	"/assets/circle-Dvl4CD5l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-krPogqpq6t3w0V1g/0TYnYU8ytE\"",
		"mtime": "2026-08-22T23:20:37.292Z",
		"size": 460,
		"path": "../public/assets/circle-Dvl4CD5l.js"
	},
	"/assets/card-bVC86ili.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230f-Zov+E5qzhKrmWx4GbhB2ZpWyy28\"",
		"mtime": "2026-08-22T23:20:37.292Z",
		"size": 8975,
		"path": "../public/assets/card-bVC86ili.js"
	},
	"/assets/course-link-DKqMY9gI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-s0GpqgqKqh5mZQIrn5kyZLd40fI\"",
		"mtime": "2026-08-22T23:20:37.292Z",
		"size": 631,
		"path": "../public/assets/course-link-DKqMY9gI.js"
	},
	"/assets/button-BhE8IkOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"815d-p4v/iwtc5UM5BU0L7SBESHRDkP8\"",
		"mtime": "2026-08-22T23:20:37.291Z",
		"size": 33117,
		"path": "../public/assets/button-BhE8IkOV.js"
	},
	"/assets/Combination-Dyke5-Xl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc82-BXteTk4MY0SaqDxeo7YzcGQykSs\"",
		"mtime": "2026-08-22T23:20:37.248Z",
		"size": 48258,
		"path": "../public/assets/Combination-Dyke5-Xl.js"
	},
	"/assets/DeadlineBadge-Bx38M5LD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf-g2GrrBAc1pwY2RogzK6hDinEtzM\"",
		"mtime": "2026-08-22T23:20:37.277Z",
		"size": 959,
		"path": "../public/assets/DeadlineBadge-Bx38M5LD.js"
	},
	"/assets/dialog-r_TBGaJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a2-Xc4TSsLJWm/+HXBcB0bplrgPYb8\"",
		"mtime": "2026-08-22T23:20:37.294Z",
		"size": 1954,
		"path": "../public/assets/dialog-r_TBGaJf.js"
	},
	"/assets/auth-context-DaGEjgAt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37148-+zlA9/0HUeLB3vJEaNpj7FjUM98\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 225608,
		"path": "../public/assets/auth-context-DaGEjgAt.js"
	},
	"/assets/dashboard-Dxz8jhGM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9683-67f7FF2xPItG/a+NtI7T/447WCo\"",
		"mtime": "2026-08-22T23:20:37.294Z",
		"size": 38531,
		"path": "../public/assets/dashboard-Dxz8jhGM.js"
	},
	"/assets/file-text-B4fWoNRF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177-8EUSTpFhi+dPQf2KSW4VVcfajZk\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 375,
		"path": "../public/assets/file-text-B4fWoNRF.js"
	},
	"/assets/input-BGHbW73l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f-pe7MsUq432hOmIcJ7oRuKmin3WA\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 623,
		"path": "../public/assets/input-BGHbW73l.js"
	},
	"/assets/dist-6tftcFmT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca0-gw9cclLerRDmjHawZkgskDYBCn4\"",
		"mtime": "2026-08-22T23:20:37.294Z",
		"size": 7328,
		"path": "../public/assets/dist-6tftcFmT.js"
	},
	"/assets/InternshipCard-CBIaCs--.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12aa-eSpbN6nb+4TaLmqJypwT5M4yFRc\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 4778,
		"path": "../public/assets/InternshipCard-CBIaCs--.js"
	},
	"/assets/index-Dy_jEwVE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a483-LK2xHqFeqObl5NrZd+Gb2St+QK4\"",
		"mtime": "2026-08-22T23:20:37.248Z",
		"size": 304259,
		"path": "../public/assets/index-Dy_jEwVE.js"
	},
	"/assets/internships.index-BYVINuc8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d01-U5Pxg89y8apYmDQCvtZGdqk68NY\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 3329,
		"path": "../public/assets/internships.index-BYVINuc8.js"
	},
	"/assets/internships._internshipId-BK4J9TA2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181e-8wlZb5f2mthmSjmUTJb9GXu5HkE\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 6174,
		"path": "../public/assets/internships._internshipId-BK4J9TA2.js"
	},
	"/assets/label-BYFATIzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2af-2C3+W62MIV6DIjyidZ3MARYm61k\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 687,
		"path": "../public/assets/label-BYFATIzr.js"
	},
	"/assets/link-DmcA3GrP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ff-sMoD83bmFZ+splVM4dXJ350Sut4\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 4351,
		"path": "../public/assets/link-DmcA3GrP.js"
	},
	"/assets/loader-circle-BePVTVXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-ET4zKqIiDX/JsnsXf1onUdgTMH8\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 134,
		"path": "../public/assets/loader-circle-BePVTVXr.js"
	},
	"/assets/map-pin-C5J4ss9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-/a8Ar9/95y0P3F27dUf5nB7rU64\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 547,
		"path": "../public/assets/map-pin-C5J4ss9P.js"
	},
	"/assets/matching-Dv32jGpy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95f-Su6xyIuVKcRF6GMV0ND34+aLotI\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 2399,
		"path": "../public/assets/matching-Dv32jGpy.js"
	},
	"/assets/Logo-DfUAgT-N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2be-ykoWHVCf5Dk/n2tRhQeTLQN1dGU\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 702,
		"path": "../public/assets/Logo-DfUAgT-N.js"
	},
	"/assets/Navbar-DEAcu7YH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5181-oOqjzaoGgEuho34Tj+/uhp2AQGE\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 20865,
		"path": "../public/assets/Navbar-DEAcu7YH.js"
	},
	"/assets/mutation-C1lbI3iD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd70-s3kpwFKBUckaV2AoPd6Mw1JEuRo\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 56688,
		"path": "../public/assets/mutation-C1lbI3iD.js"
	},
	"/assets/options-CYOKQGNA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ce-TN8OXkj2R8w4iHFRz/35ObUNtnY\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 1486,
		"path": "../public/assets/options-CYOKQGNA.js"
	},
	"/assets/MatchScore-C1DQTR40.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-Wu9jVmGniujxai7Zv66Djm3T2TE\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 428,
		"path": "../public/assets/MatchScore-C1DQTR40.js"
	},
	"/assets/onboarding-Cgedm0Nf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bea-Ge4yCCL+x1Psb9Eo4ifMwAOprCk\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 7146,
		"path": "../public/assets/onboarding-Cgedm0Nf.js"
	},
	"/assets/prepare-DJzNUhte.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1681-8etDE/0kMEc8jhBr1wrETy+CaZE\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 5761,
		"path": "../public/assets/prepare-DJzNUhte.js"
	},
	"/assets/profile-BgBYJpg3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1430-xwXdVIWYsFKvupS1yb4O1q2Nosg\"",
		"mtime": "2026-08-22T23:20:37.297Z",
		"size": 5168,
		"path": "../public/assets/profile-BgBYJpg3.js"
	},
	"/assets/recruiter.new-BF0g6emH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c8-B9EHKap3TCmPEPaublBdOIky+mU\"",
		"mtime": "2026-08-22T23:20:37.306Z",
		"size": 5576,
		"path": "../public/assets/recruiter.new-BF0g6emH.js"
	},
	"/assets/recruiter.index-1D2G2meL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e6-ALjtUsGGm/yATlapjPi+4LH88M0\"",
		"mtime": "2026-08-22T23:20:37.306Z",
		"size": 4326,
		"path": "../public/assets/recruiter.index-1D2G2meL.js"
	},
	"/assets/progress-DTsCp0Po.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d2-FbJGTIVPxFT5dNaSufkt/63X77Y\"",
		"mtime": "2026-08-22T23:20:37.306Z",
		"size": 2258,
		"path": "../public/assets/progress-DTsCp0Po.js"
	},
	"/assets/recruiter._internshipId-Cm31jZZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"244e-KEa3arfJ5gp3gCAfqDBeCk39uAI\"",
		"mtime": "2026-08-22T23:20:37.306Z",
		"size": 9294,
		"path": "../public/assets/recruiter._internshipId-Cm31jZZb.js"
	},
	"/assets/route-CSn7t535.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4e-w7jL5UjTC+R8VxOtMSJFy7qiNhI\"",
		"mtime": "2026-08-22T23:20:37.306Z",
		"size": 3918,
		"path": "../public/assets/route-CSn7t535.js"
	},
	"/assets/routes-DuRzaEJ4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a30-X85pO55RDRVnC+sCB6bdhRIFCRc\"",
		"mtime": "2026-08-22T23:20:37.309Z",
		"size": 6704,
		"path": "../public/assets/routes-DuRzaEJ4.js"
	},
	"/assets/saved-R9lz91JM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b85-8+Y7FNVQDNmUWD9i64FYFnB93/4\"",
		"mtime": "2026-08-22T23:20:37.310Z",
		"size": 2949,
		"path": "../public/assets/saved-R9lz91JM.js"
	},
	"/assets/select-BDAhZQum.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57cb-Dpc0JYaODw8gB0tCFTp7rFGmun4\"",
		"mtime": "2026-08-22T23:20:37.310Z",
		"size": 22475,
		"path": "../public/assets/select-BDAhZQum.js"
	},
	"/assets/RejectionPanel-C0x3rdoY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9bf-JYnl5aBXbXeV1yIA6bkXYnrd36U\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 2495,
		"path": "../public/assets/RejectionPanel-C0x3rdoY.js"
	},
	"/assets/send-BKibjm4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-eslHxwbU1SWTXg10UN4GtlNULyA\"",
		"mtime": "2026-08-22T23:20:37.310Z",
		"size": 280,
		"path": "../public/assets/send-BKibjm4r.js"
	},
	"/assets/shield-check-SAsBEJR5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-n+2N+qWyVeOp28ugoJmkS9Tg+vs\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 310,
		"path": "../public/assets/shield-check-SAsBEJR5.js"
	},
	"/assets/styles-DJL5u7e2.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17711-FVaQien6mEsFeaBM//0Cyy9qzEM\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 96017,
		"path": "../public/assets/styles-DJL5u7e2.css"
	},
	"/assets/slider-DfrX_sYl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36b5-aT5LJFaOUrEC1rqG3zXXywvk8iI\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 14005,
		"path": "../public/assets/slider-DfrX_sYl.js"
	},
	"/assets/textarea-BswXXGBn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209-EcQotTUJVuquTQDhKZw47EwyOZE\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 521,
		"path": "../public/assets/textarea-BswXXGBn.js"
	},
	"/assets/TagInput-BUgrcz01.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df9-usjU9CNLgarIajSeHtMPNIlw3us\"",
		"mtime": "2026-08-22T23:20:37.279Z",
		"size": 3577,
		"path": "../public/assets/TagInput-BUgrcz01.js"
	},
	"/assets/x-dI7IsqOe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-/7rc2VQhrXDonm49fcFeFqAyLG4\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 144,
		"path": "../public/assets/x-dI7IsqOe.js"
	},
	"/assets/useNavigate-BVuLypQI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b5f-3Rrs1BvhrKHL4Pt4uWVY4Xw9V50\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 19295,
		"path": "../public/assets/useNavigate-BVuLypQI.js"
	},
	"/assets/useMatch-CWv7nBiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-YTdXvKBw5LTpX2UslsiOIUm4niQ\"",
		"mtime": "2026-08-22T23:20:37.313Z",
		"size": 650,
		"path": "../public/assets/useMatch-CWv7nBiN.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0ogaqA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0ogaqA
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
