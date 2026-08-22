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
	"/assets/applications-B1zeWgeP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef2-hcjLKYPi7xA+FGdykbMsgWXtu2Q\"",
		"mtime": "2026-08-22T21:41:17.679Z",
		"size": 3826,
		"path": "../public/assets/applications-B1zeWgeP.js"
	},
	"/assets/arrow-right-aB-K4HGy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-wbSTwYTboMhNoJ3gX6EUsIM6Dio\"",
		"mtime": "2026-08-22T21:41:17.680Z",
		"size": 155,
		"path": "../public/assets/arrow-right-aB-K4HGy.js"
	},
	"/assets/arrow-left-cdkcI1Tw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-AaKUmQmcxkL+2CQZchZYV7YmK7Y\"",
		"mtime": "2026-08-22T21:41:17.680Z",
		"size": 155,
		"path": "../public/assets/arrow-left-cdkcI1Tw.js"
	},
	"/assets/badge-e5FL-1Tp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b-jYfCx5bYvJBDzJxSr1sHaln20vc\"",
		"mtime": "2026-08-22T21:41:17.682Z",
		"size": 779,
		"path": "../public/assets/badge-e5FL-1Tp.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-22T12:14:49.162Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/bell-ring-D89TuuZF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183-flbvD/fsdkPH7ywEuea95kElFlw\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 387,
		"path": "../public/assets/bell-ring-D89TuuZF.js"
	},
	"/assets/bookmark-B9M7p0RI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-Qc/vAA4hJDxT6NLMwbGe/xRiFXI\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 220,
		"path": "../public/assets/bookmark-B9M7p0RI.js"
	},
	"/assets/auth-Dxef9HJx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a94-DGNVi73v1FSsmi7h88rqhTzzy4c\"",
		"mtime": "2026-08-22T21:41:17.681Z",
		"size": 10900,
		"path": "../public/assets/auth-Dxef9HJx.js"
	},
	"/assets/building-2-DUGpA1Sz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-dmCnU+r5LbWlJDf31AGYlJOtcm0\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 373,
		"path": "../public/assets/building-2-DUGpA1Sz.js"
	},
	"/assets/card-bVC86ili.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230f-Zov+E5qzhKrmWx4GbhB2ZpWyy28\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 8975,
		"path": "../public/assets/card-bVC86ili.js"
	},
	"/assets/course-link-DKqMY9gI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-s0GpqgqKqh5mZQIrn5kyZLd40fI\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 631,
		"path": "../public/assets/course-link-DKqMY9gI.js"
	},
	"/assets/Combination-D-O96H3n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bac4-/NZ9f5Fk1ku3d9L8QxDaX2EqKv0\"",
		"mtime": "2026-08-22T21:41:17.664Z",
		"size": 47812,
		"path": "../public/assets/Combination-D-O96H3n.js"
	},
	"/assets/circle-Dvl4CD5l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc-krPogqpq6t3w0V1g/0TYnYU8ytE\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 460,
		"path": "../public/assets/circle-Dvl4CD5l.js"
	},
	"/assets/button-BhE8IkOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"815d-p4v/iwtc5UM5BU0L7SBESHRDkP8\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 33117,
		"path": "../public/assets/button-BhE8IkOV.js"
	},
	"/assets/auth-context-DaGEjgAt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37148-+zlA9/0HUeLB3vJEaNpj7FjUM98\"",
		"mtime": "2026-08-22T21:41:17.682Z",
		"size": 225608,
		"path": "../public/assets/auth-context-DaGEjgAt.js"
	},
	"/assets/DeadlineBadge-Bx38M5LD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bf-g2GrrBAc1pwY2RogzK6hDinEtzM\"",
		"mtime": "2026-08-22T21:41:17.674Z",
		"size": 959,
		"path": "../public/assets/DeadlineBadge-Bx38M5LD.js"
	},
	"/assets/dashboard-BF6Db2im.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63fc-Xz3rZfhh7NgZfbXay9A6zviuU7Y\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 25596,
		"path": "../public/assets/dashboard-BF6Db2im.js"
	},
	"/assets/input-BGHbW73l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f-pe7MsUq432hOmIcJ7oRuKmin3WA\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 623,
		"path": "../public/assets/input-BGHbW73l.js"
	},
	"/assets/dist-6tftcFmT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca0-gw9cclLerRDmjHawZkgskDYBCn4\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 7328,
		"path": "../public/assets/dist-6tftcFmT.js"
	},
	"/assets/file-text-B4fWoNRF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177-8EUSTpFhi+dPQf2KSW4VVcfajZk\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 375,
		"path": "../public/assets/file-text-B4fWoNRF.js"
	},
	"/assets/InternshipCard-lCCk3Agz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ac-Xn6Vj/SmFlGyxqDUacMwEPN8OK4\"",
		"mtime": "2026-08-22T21:41:17.675Z",
		"size": 4780,
		"path": "../public/assets/InternshipCard-lCCk3Agz.js"
	},
	"/assets/internships.index-Co1pnSN7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d01-JWpGZusF28imUhKlG3MLmFBBg3k\"",
		"mtime": "2026-08-22T21:41:17.691Z",
		"size": 3329,
		"path": "../public/assets/internships.index-Co1pnSN7.js"
	},
	"/assets/internships._internshipId-CDxsk0RF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1818-A140oQZuXCcpm64Zyl1sNt9D/Dc\"",
		"mtime": "2026-08-22T21:41:17.683Z",
		"size": 6168,
		"path": "../public/assets/internships._internshipId-CDxsk0RF.js"
	},
	"/assets/index-C6fBnfTT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a48b-4spvaWIuJ4xIlALPgYF7pYqVLDs\"",
		"mtime": "2026-08-22T21:41:17.664Z",
		"size": 304267,
		"path": "../public/assets/index-C6fBnfTT.js"
	},
	"/assets/label-BYFATIzr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2af-2C3+W62MIV6DIjyidZ3MARYm61k\"",
		"mtime": "2026-08-22T21:41:17.692Z",
		"size": 687,
		"path": "../public/assets/label-BYFATIzr.js"
	},
	"/assets/link-DmcA3GrP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ff-sMoD83bmFZ+splVM4dXJ350Sut4\"",
		"mtime": "2026-08-22T21:41:17.692Z",
		"size": 4351,
		"path": "../public/assets/link-DmcA3GrP.js"
	},
	"/assets/Logo-DfUAgT-N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2be-ykoWHVCf5Dk/n2tRhQeTLQN1dGU\"",
		"mtime": "2026-08-22T21:41:17.676Z",
		"size": 702,
		"path": "../public/assets/Logo-DfUAgT-N.js"
	},
	"/assets/loader-circle-BePVTVXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-ET4zKqIiDX/JsnsXf1onUdgTMH8\"",
		"mtime": "2026-08-22T21:41:17.693Z",
		"size": 134,
		"path": "../public/assets/loader-circle-BePVTVXr.js"
	},
	"/assets/map-pin-C5J4ss9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-/a8Ar9/95y0P3F27dUf5nB7rU64\"",
		"mtime": "2026-08-22T21:41:17.693Z",
		"size": 547,
		"path": "../public/assets/map-pin-C5J4ss9P.js"
	},
	"/assets/MatchScore-C1DQTR40.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-Wu9jVmGniujxai7Zv66Djm3T2TE\"",
		"mtime": "2026-08-22T21:41:17.676Z",
		"size": 428,
		"path": "../public/assets/MatchScore-C1DQTR40.js"
	},
	"/assets/matching-Dv32jGpy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95f-Su6xyIuVKcRF6GMV0ND34+aLotI\"",
		"mtime": "2026-08-22T21:41:17.694Z",
		"size": 2399,
		"path": "../public/assets/matching-Dv32jGpy.js"
	},
	"/assets/Navbar-CEh7zusT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"427b-KY7wTYnef4/rbzpFidb3X2uFO/A\"",
		"mtime": "2026-08-22T21:41:17.677Z",
		"size": 17019,
		"path": "../public/assets/Navbar-CEh7zusT.js"
	},
	"/assets/mutation-C1lbI3iD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd70-s3kpwFKBUckaV2AoPd6Mw1JEuRo\"",
		"mtime": "2026-08-22T21:41:17.695Z",
		"size": 56688,
		"path": "../public/assets/mutation-C1lbI3iD.js"
	},
	"/assets/onboarding-CC_hhdxn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1be7-r9D5KTKWMR8MdRl001LS+jvFWcA\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 7143,
		"path": "../public/assets/onboarding-CC_hhdxn.js"
	},
	"/assets/options-CYOKQGNA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ce-TN8OXkj2R8w4iHFRz/35ObUNtnY\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 1486,
		"path": "../public/assets/options-CYOKQGNA.js"
	},
	"/assets/prepare-Pk1_Gc0L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162a-VhYxSAr2IXzTshdsVaY38OALdWo\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 5674,
		"path": "../public/assets/prepare-Pk1_Gc0L.js"
	},
	"/assets/profile-Dacn9UnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142d-FcnpWqOT2p2bCEyi1dAUtTm8zfs\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 5165,
		"path": "../public/assets/profile-Dacn9UnW.js"
	},
	"/assets/progress-DTsCp0Po.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d2-FbJGTIVPxFT5dNaSufkt/63X77Y\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 2258,
		"path": "../public/assets/progress-DTsCp0Po.js"
	},
	"/assets/recruiter.index-BRLGsc8_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e3-1ns1TeA1NKxPfkujerKJeHulhb0\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 4323,
		"path": "../public/assets/recruiter.index-BRLGsc8_.js"
	},
	"/assets/recruiter._internshipId-DgL035Jt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2e-42gnsc6YgAB3c0UN7vuHqu/s+LI\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 3374,
		"path": "../public/assets/recruiter._internshipId-DgL035Jt.js"
	},
	"/assets/queries-aye7d2LU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48f4-+xW3c0haFiOV3UklnK+Y36d/1fQ\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 18676,
		"path": "../public/assets/queries-aye7d2LU.js"
	},
	"/assets/recruiter.new-pXjx6iKh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12dc-fOhDPQmae6zVZu6X/OlCXJRdai8\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 4828,
		"path": "../public/assets/recruiter.new-pXjx6iKh.js"
	},
	"/assets/RejectionPanel-CjHn3uW8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b9-GGg+Z0ydMQY2H75IPLfdpmk4IBw\"",
		"mtime": "2026-08-22T21:41:17.678Z",
		"size": 2489,
		"path": "../public/assets/RejectionPanel-CjHn3uW8.js"
	},
	"/assets/routes-ChzZiuWJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2d-TxAYUd3M3t3tuOJZm4zZ4Pjl4So\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 6701,
		"path": "../public/assets/routes-ChzZiuWJ.js"
	},
	"/assets/saved-BXG1GSKL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7d-lZYksM9qjmn1btY54sMN1zjdC1M\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 2941,
		"path": "../public/assets/saved-BXG1GSKL.js"
	},
	"/assets/route-CWw2S-io.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1005-YSw10CYyiJCXj3oZR0RGVaugTlg\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 4101,
		"path": "../public/assets/route-CWw2S-io.js"
	},
	"/assets/select-DXJL319H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57c3-OGGSu5tCobh/I4vJE8dVbjdrQwM\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 22467,
		"path": "../public/assets/select-DXJL319H.js"
	},
	"/assets/slider-Co9_rCTD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36d7-YU5GlUFt6yWO4vp5QOJzPTmexEs\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 14039,
		"path": "../public/assets/slider-Co9_rCTD.js"
	},
	"/assets/shield-check-SAsBEJR5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-n+2N+qWyVeOp28ugoJmkS9Tg+vs\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 310,
		"path": "../public/assets/shield-check-SAsBEJR5.js"
	},
	"/assets/styles-CWrh9oKQ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1611e-zXGQsdrTOLP9ywwazVidzjgE0MA\"",
		"mtime": "2026-08-22T21:41:17.708Z",
		"size": 90398,
		"path": "../public/assets/styles-CWrh9oKQ.css"
	},
	"/assets/TagInput-BUgrcz01.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df9-usjU9CNLgarIajSeHtMPNIlw3us\"",
		"mtime": "2026-08-22T21:41:17.678Z",
		"size": 3577,
		"path": "../public/assets/TagInput-BUgrcz01.js"
	},
	"/assets/useMatch-CWv7nBiN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-YTdXvKBw5LTpX2UslsiOIUm4niQ\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 650,
		"path": "../public/assets/useMatch-CWv7nBiN.js"
	},
	"/assets/sparkles-BAyyIgO1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-o+sZqrAC7L7oxVS9e3bfLhUxuwI\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 484,
		"path": "../public/assets/sparkles-BAyyIgO1.js"
	},
	"/assets/textarea-BswXXGBn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209-EcQotTUJVuquTQDhKZw47EwyOZE\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 521,
		"path": "../public/assets/textarea-BswXXGBn.js"
	},
	"/assets/trash-2-Cu9RbF47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-QI24RLx3PwBpPOfy//QS4yeYgvw\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 318,
		"path": "../public/assets/trash-2-Cu9RbF47.js"
	},
	"/assets/useNavigate-BVuLypQI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b5f-3Rrs1BvhrKHL4Pt4uWVY4Xw9V50\"",
		"mtime": "2026-08-22T21:41:17.696Z",
		"size": 19295,
		"path": "../public/assets/useNavigate-BVuLypQI.js"
	},
	"/assets/x-dI7IsqOe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-/7rc2VQhrXDonm49fcFeFqAyLG4\"",
		"mtime": "2026-08-22T21:41:17.708Z",
		"size": 144,
		"path": "../public/assets/x-dI7IsqOe.js"
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
