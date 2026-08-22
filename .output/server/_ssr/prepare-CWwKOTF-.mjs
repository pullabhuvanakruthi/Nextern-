import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as useTestAttempts, S as useStudentProfile, c as useGenerateTest, l as useGradeTest } from "./queries-DoJqRnYK.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { B as BookOpen, T as ExternalLink, l as Sparkles, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-BM637P_-.mjs";
import { t as courseUrl } from "./course-link-tjJu6VN-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prepare-CWwKOTF-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIFFICULTIES = [
	"easy",
	"medium",
	"hard"
];
function PreparePage() {
	const { data: profile } = useStudentProfile();
	const generate = useGenerateTest();
	const grade = useGradeTest();
	const { data: attempts = [] } = useTestAttempts();
	const [topic, setTopic] = (0, import_react.useState)("");
	const [difficulty, setDifficulty] = (0, import_react.useState)("medium");
	const [test, setTest] = (0, import_react.useState)(null);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [result, setResult] = (0, import_react.useState)(null);
	const topics = Array.from(/* @__PURE__ */ new Set([
		...profile?.skills ?? [],
		...profile?.preferred_domains ?? [],
		...profile?.interests ?? []
	])).slice(0, 20);
	const start = () => {
		const chosen = topic || topics[0];
		if (!chosen) {
			toast.error("Add skills to your profile first");
			return;
		}
		setResult(null);
		generate.mutate({
			topic: chosen,
			difficulty
		}, {
			onSuccess: (t) => {
				setTest(t);
				setAnswers(new Array(t.questions.length).fill(-1));
			},
			onError: (e) => toast.error(e.message)
		});
	};
	const submit = () => {
		if (!test) return;
		grade.mutate({
			testId: test.id,
			answers
		}, {
			onSuccess: (r) => setResult(r),
			onError: (e) => toast.error(e.message)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: "Practice & upskill"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "AI-generated mock tests built from your skills, with a performance report and course picks."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-lg",
				children: "Generate a mock test"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Pick a topic from your profile and a difficulty level." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: topic || topics[0] || "",
						onValueChange: setTopic,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a topic" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t,
							children: t
						}, t)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: difficulty,
						onValueChange: setDifficulty,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d,
							children: d
						}, d)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: start,
						disabled: generate.isPending,
						children: [generate.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Generate test"]
					})
				]
			})] }),
			test && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-lg",
				children: [topic || topics[0], " test"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [test.questions.length, " questions · no time limit"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-6",
				children: [test.questions.map((q, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							qi + 1,
							". ",
							q.question
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: q.options.map((o, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAnswers((a) => a.map((v, i) => i === qi ? oi : v)),
							className: cn("rounded-lg border px-3 py-2 text-left text-sm transition-colors", answers[qi] === oi ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"),
							children: o
						}, oi))
					})]
				}, qi)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: submit,
					disabled: grade.isPending,
					className: "w-full",
					children: [grade.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Submit for AI review"]
				})]
			})] }),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-lg",
				children: [
					"You scored ",
					result.score,
					"/",
					result.total
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: result.report.summary })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: result.score / Math.max(result.total, 1) * 100 }),
					result.report.strengths?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-semibold",
						children: "Strengths"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: result.report.strengths.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: s
						}, s))
					})] }),
					result.report.weak_areas?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-semibold",
						children: "Weak areas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: result.report.weak_areas.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: w.topic
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: w.advice
							})]
						}, w.topic))
					})] }),
					result.report.courses?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " Recommended courses"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: result.report.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border p-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: courseUrl(c),
									target: "_blank",
									rel: "noopener noreferrer",
									className: "font-medium text-primary underline-offset-4 hover:underline",
									children: [c.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-1 inline size-3" })]
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: ["· ", c.provider]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: c.why
								})
							]
						}, c.title))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setTest(null);
							setResult(null);
						},
						children: "Take another test"
					})
				]
			})] }),
			attempts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-lg",
				children: "Past attempts"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2",
				children: attempts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: a.topic
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							a.score,
							"/",
							a.total,
							" · ",
							new Date(a.created_at).toLocaleDateString()
						]
					})]
				}, a.id))
			})] })
		]
	});
}
//#endregion
export { PreparePage as component };
