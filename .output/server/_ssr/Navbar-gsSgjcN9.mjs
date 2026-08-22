import { r as __toESM } from "../_runtime.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-context-DxBoya-C.mjs";
import { d as useInternships, f as useMarkNotificationRead, h as useNotifications, o as useClearNotifications, s as useDismissReminder, v as useReminderDismissals, x as useSaved, y as useReminderPrefs } from "./ai-queries-D3oXUHn6.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { C as Inbox, J as Bell, U as Briefcase, g as Menu, l as Sparkles, o as Trash2, t as X, v as Mail, y as LogOut } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Logo-WxHpCbwH.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-gsSgjcN9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
function NotificationBell() {
	const { data: notifications = [] } = useNotifications();
	const markRead = useMarkNotificationRead();
	const clearAll = useClearNotifications();
	const navigate = useNavigate();
	const unreadCount = notifications.filter((n) => !n.read).length;
	const handleNotificationClick = (n) => {
		if (!n.read) markRead.mutate(n.id);
		if (n.link) navigate({ to: n.link });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative",
			"aria-label": "Notifications",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground animate-pulse",
				children: unreadCount
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-80 p-0 bg-surface border border-border shadow-[var(--shadow-card)] z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground font-normal",
				children: "Updates on your applications & matches"
			})] }), notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "size-7 text-muted-foreground hover:text-destructive",
				onClick: () => clearAll.mutate(),
				title: "Clear all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
			})]
		}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center px-4 py-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-8 text-muted-foreground/45 mb-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "All caught up!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground/60 mt-0.5",
					children: "No new notifications here."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-h-80 divide-y divide-border overflow-auto",
			children: notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				onClick: () => handleNotificationClick(n),
				className: cn("px-4 py-3 cursor-pointer transition-colors flex gap-3 items-start", n.read ? "hover:bg-muted/40" : "bg-primary/5 hover:bg-primary/10"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("rounded-full p-1.5 shrink-0 mt-0.5", n.type === "application_received" ? "bg-chart-4/15 text-chart-4" : n.type === "application_update" ? "bg-primary/15 text-primary" : "bg-success/15 text-success"),
						children: n.type === "application_received" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }) : n.type === "application_update" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5 flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-xs font-semibold text-foreground truncate", !n.read && "text-primary"),
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-normal break-words font-normal",
								children: n.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground/75 pt-0.5 font-normal",
								children: new Date(n.created_at).toLocaleDateString(void 0, {
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit"
								})
							})
						]
					}),
					!n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary shrink-0 mt-2" })
				]
			}, n.id))
		})]
	})] });
}
function daysLeft(deadline) {
	const ms = new Date(deadline).getTime() - Date.now();
	return Math.ceil(ms / 864e5);
}
function ReminderBell() {
	const { data: saved = [] } = useSaved();
	const { data: internships = [] } = useInternships();
	const { data: days = [
		7,
		3,
		1
	] } = useReminderPrefs();
	const { data: dismissed = [] } = useReminderDismissals();
	const dismiss = useDismissReminder();
	const reminders = (0, import_react.useMemo)(() => {
		const savedIds = new Set(saved.map((s) => s.internship_id));
		return internships.filter((i) => savedIds.has(i.id) && i.deadline).map((i) => {
			const left = daysLeft(i.deadline);
			const threshold = [...days].sort((a, b) => a - b).find((d) => left <= d && left >= 0);
			return threshold === void 0 ? null : {
				internship: i,
				left,
				threshold
			};
		}).filter((r) => !!r).filter((r) => !dismissed.includes(`${r.internship.id}:${r.threshold}`)).sort((a, b) => a.left - b.left);
	}, [
		saved,
		internships,
		days,
		dismissed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative",
			"aria-label": "Deadline reminders",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), reminders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground",
				children: reminders.length
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-80 p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "Deadline reminders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Saved internships closing soon"
			})]
		}), reminders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "px-4 py-6 text-center text-sm text-muted-foreground",
			children: [
				"Nothing due yet. Save internships to get ",
				days.join(", "),
				"-day reminders."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "max-h-80 divide-y divide-border overflow-auto",
			children: reminders.map(({ internship, left, threshold }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/internships/$internshipId",
						params: { internshipId: internship.id },
						className: "text-sm font-medium hover:underline",
						children: internship.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							internship.company_name,
							" ·",
							" ",
							left === 0 ? "closes today" : `${left} day${left === 1 ? "" : "s"} left`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: internship.apply_url,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Apply"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => dismiss.mutate({
								internshipId: internship.id,
								threshold
							}),
							children: "Dismiss"
						})]
					})
				]
			}, internship.id))
		})]
	})] });
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var studentLinks = [
	{
		to: "/dashboard",
		label: "Matches"
	},
	{
		to: "/internships",
		label: "Browse"
	},
	{
		to: "/saved",
		label: "Saved"
	},
	{
		to: "/applications",
		label: "Tracker"
	},
	{
		to: "/prepare",
		label: "Practice"
	},
	{
		to: "/profile",
		label: "Profile"
	}
];
var recruiterLinks = [{
	to: "/recruiter",
	label: "Postings"
}, {
	to: "/recruiter/new",
	label: "Post internship"
}];
function Navbar() {
	const { user, role, signOut } = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const links = !user ? [] : role === "recruiter" ? recruiterLinks : studentLinks;
	const handleSignOut = async () => {
		await signOut();
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						activeProps: { className: cn("bg-primary-soft text-accent-foreground") },
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 md:flex",
					children: [
						user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}),
						user && role !== "recruiter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReminderBell, {}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: handleSignOut,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/internships",
								children: "Browse internships"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: "Get started"
							})
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open,
					onOpenChange: setOpen,
					children: [
						user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:hidden flex items-center gap-1.5 mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}), role !== "recruiter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReminderBell, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							className: "md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "right",
							className: "w-72 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "sr-only",
								children: "Menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-col gap-1",
								children: [(links.length ? links : [{
									to: "/internships",
									label: "Browse internships"
								}]).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: l.to,
									onClick: () => setOpen(false),
									className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted",
									children: l.label
								}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 border-t border-border pt-4",
									children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "w-full",
										onClick: handleSignOut,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										asChild: true,
										onClick: () => setOpen(false),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/auth",
											children: "Get started"
										})
									})
								})]
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Navbar as t };
