import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-mGQq5Rj1.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { O as useUpdateApplicationByRecruiter, a as useCandidates, m as useMyInternships } from "./ai-queries-D3oXUHn6.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { $ as ArrowLeft, D as FileCheckCorner, b as LoaderCircle, f as Send, k as Download, l as Sparkles, v as Mail } from "../_libs/lucide-react.mjs";
import { t as Navbar } from "./Navbar-gsSgjcN9.mjs";
import { t as Card } from "./card-BM637P_-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
import { d as STATUS_LABEL, t as APP_STATUSES } from "./options-Br7fzcJ6.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { t as MatchScore } from "./MatchScore-CSkniks3.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-JlEMlidX.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { t as Route } from "./recruiter._internshipId-bF8GDhxS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter2._internshipId-GJdq2xuS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CandidatesPage() {
	const { internshipId } = Route.useParams();
	const { data: postings = [] } = useMyInternships();
	const { data: candidates = [], isLoading } = useCandidates(internshipId);
	const posting = postings.find((p) => p.id === internshipId);
	const [selectedCandidate, setSelectedCandidate] = (0, import_react.useState)(null);
	const [messageText, setMessageText] = (0, import_react.useState)("");
	const [statusVal, setStatusVal] = (0, import_react.useState)("applied");
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const updateApp = useUpdateApplicationByRecruiter(internshipId);
	const ranked = (0, import_react.useMemo)(() => {
		const required = (posting?.skills ?? []).map((s) => s.toLowerCase());
		return candidates.map((c) => {
			const matched = (c.skills ?? []).filter((s) => required.includes(s.toLowerCase()));
			const domainFit = (c.interests ?? []).some((i) => i.toLowerCase() === (posting?.domain ?? "").toLowerCase());
			const score = Math.min(99, Math.round(25 + (required.length ? matched.length / required.length * 50 : 0) + (domainFit ? 15 : 0) + (c.has_resume ? 5 : 0) + (c.application_status ? 5 : 0)));
			return {
				...c,
				matched,
				score
			};
		}).sort((a, b) => b.score - a.score);
	}, [candidates, posting]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-4xl px-4 py-10 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						className: "mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/recruiter",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to postings"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold",
						children: posting?.title ?? "Matched candidates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [ranked.length, " students ranked by suitability. Contact details stay private until a student applies."]
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-muted-foreground" })
					}) : ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-16 text-center text-muted-foreground",
						children: "No student profiles match this opening yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: ranked.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "gap-3 p-5 shadow-[var(--shadow-card)] cursor-pointer hover:border-primary/50 transition-colors",
							onClick: () => {
								setSelectedCandidate(c);
								setStatusVal(c.application_status || "applied");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold hover:text-primary transition-colors",
										children: c.display_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [[
											c.degree,
											c.specialization,
											c.college
										].filter(Boolean).join(" · ") || "Profile in progress", c.graduation_year ? ` · Class of ${c.graduation_year}` : ""]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [c.application_status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: c.application_status
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScore, { score: c.score })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: (c.skills ?? []).slice(0, 10).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: c.matched.includes(s) ? "default" : "secondary",
										className: c.matched.includes(s) ? "bg-primary-soft text-accent-foreground" : "",
										children: s
									}, s))
								}),
								c.has_resume && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-3.5 text-primary" }), " Resume on file"]
								})
							]
						}, c.user_id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedCandidate,
				onOpenChange: (open) => {
					if (!open) {
						setSelectedCandidate(null);
						setMessageText("");
					}
				},
				children: selectedCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl bg-surface border border-border shadow-[var(--shadow-card)] max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-xl font-bold",
							children: selectedCandidate.display_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "bg-primary-soft text-accent-foreground font-semibold",
							children: [
								"Match ",
								selectedCandidate.score,
								"%"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-sm text-muted-foreground mt-1",
						children: [[
							selectedCandidate.degree,
							selectedCandidate.specialization,
							selectedCandidate.college
						].filter(Boolean).join(" · "), selectedCandidate.graduation_year ? ` · Class of ${selectedCandidate.graduation_year}` : ""]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5 my-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground uppercase tracking-wider",
									children: "Contact Information"
								}), selectedCandidate.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm mt-1 bg-primary/5 p-3 rounded-lg border border-primary/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: selectedCandidate.email
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic bg-muted p-2.5 rounded-lg border border-border",
									children: "🔒 Contact details stay private until the student applies."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground uppercase tracking-wider",
									children: "Skills"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 mt-1",
									children: (selectedCandidate.skills ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: selectedCandidate.matched.includes(s) ? "default" : "secondary",
										className: selectedCandidate.matched.includes(s) ? "bg-primary-soft text-accent-foreground" : "",
										children: s
									}, s))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground uppercase tracking-wider",
									children: "Interests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 mt-1",
									children: (selectedCandidate.interests ?? []).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "border-border",
										children: i
									}, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground uppercase tracking-wider",
									children: "Resume"
								}), selectedCandidate.has_resume ? selectedCandidate.resume_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "gap-2 border-primary/20 hover:border-primary/50 text-primary bg-primary/5",
										disabled: downloading,
										onClick: async () => {
											setDownloading(true);
											try {
												const { data, error } = await supabase.storage.from("resumes").createSignedUrl(selectedCandidate.resume_path, 60);
												if (error || !data) {
													toast.error("Could not open resume");
													return;
												}
												window.open(data.signedUrl, "_blank", "noopener");
											} finally {
												setDownloading(false);
											}
										},
										children: [downloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "View/Download Resume"]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic bg-muted p-2.5 rounded-lg border border-border mt-1",
									children: "📄 Resume is on file (will be accessible once the student applies to this posting)."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic mt-1",
									children: "No resume uploaded by this student."
								})]
							}),
							selectedCandidate.application_status && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border pt-4 space-y-4 mt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-bold text-foreground flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary fill-primary/10" }), "Application Management & Notifications"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "status-select",
												className: "text-xs font-semibold text-muted-foreground uppercase",
												children: "Application Stage"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: statusVal,
												onValueChange: setStatusVal,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													id: "status-select",
													className: "bg-surface border-border",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
													className: "bg-surface border-border",
													children: APP_STATUSES.filter((s) => s !== "saved").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: s,
														className: "hover:bg-primary/5 cursor-pointer",
														children: STATUS_LABEL[s]
													}, s))
												})]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "message",
											className: "text-xs font-semibold text-muted-foreground uppercase",
											children: "Send Message to Candidate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "message",
											placeholder: "Write an interview invite, status update, or internship feedback message...",
											className: "min-h-[100px] bg-surface border-border focus:border-primary",
											value: messageText,
											onChange: (e) => setMessageText(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: () => {
												setSelectedCandidate(null);
												setMessageText("");
											},
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "gap-1.5",
											disabled: updateApp.isPending,
											onClick: () => {
												updateApp.mutate({
													candidateId: selectedCandidate.user_id,
													status: statusVal,
													notes: messageText || null
												}, {
													onSuccess: () => {
														toast.success("Application stage updated & email notification dispatched!");
														setSelectedCandidate(null);
														setMessageText("");
													},
													onError: (e) => {
														toast.error(e instanceof Error ? e.message : "Failed to update application");
													}
												});
											},
											children: [updateApp.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), "Update & Send Notification"]
										})]
									})
								]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { CandidatesPage as component };
