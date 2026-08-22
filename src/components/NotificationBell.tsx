import { useNavigate } from "@tanstack/react-router";
import { Bell, Trash2, Mail, Briefcase, Sparkles, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotifications, useMarkNotificationRead, useClearNotifications } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { data: notifications = [] } = useNotifications();
  const markRead = useMarkNotificationRead();
  const clearAll = useClearNotifications();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (n: any) => {
    if (!n.read) {
      markRead.mutate(n.id);
    }
    if (n.link) {
      navigate({ to: n.link });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-surface border border-border shadow-[var(--shadow-card)] z-50">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground font-normal">Updates on your applications & matches</p>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-destructive"
              onClick={() => clearAll.mutate()}
              title="Clear all"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            <Inbox className="size-8 text-muted-foreground/45 mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">No new notifications here.</p>
          </div>
        ) : (
          <ul className="max-h-80 divide-y divide-border overflow-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={cn(
                  "px-4 py-3 cursor-pointer transition-colors flex gap-3 items-start",
                  n.read ? "hover:bg-muted/40" : "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <div className={cn(
                  "rounded-full p-1.5 shrink-0 mt-0.5",
                  n.type === "application_received" ? "bg-chart-4/15 text-chart-4" :
                  n.type === "application_update" ? "bg-primary/15 text-primary" : "bg-success/15 text-success"
                )}>
                  {n.type === "application_received" ? <Mail className="size-3.5" /> :
                   n.type === "application_update" ? <Sparkles className="size-3.5" /> : <Briefcase className="size-3.5" />}
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className={cn("text-xs font-semibold text-foreground truncate", !n.read && "text-primary")}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-normal break-words font-normal">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/75 pt-0.5 font-normal">
                    {new Date(n.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                {!n.read && (
                  <span className="size-2 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
