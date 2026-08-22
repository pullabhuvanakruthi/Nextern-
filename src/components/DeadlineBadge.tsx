import { CalendarClock } from "lucide-react";
import { daysUntil } from "@/lib/matching";
import { cn } from "@/lib/utils";

export function DeadlineBadge({ deadline, className }: { deadline: string | null; className?: string }) {
  const days = daysUntil(deadline);
  if (days === null) return null;

  const label =
    days < 0 ? "Closed" : days === 0 ? "Closes today" : days === 1 ? "1 day left" : `${days} days left`;
  const tone =
    days < 0
      ? "bg-muted text-muted-foreground"
      : days <= 3
        ? "bg-destructive/10 text-destructive"
        : days <= 7
          ? "bg-accent text-accent-foreground"
          : "bg-secondary text-secondary-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone,
        className,
      )}
    >
      <CalendarClock className="size-3.5" /> {label}
    </span>
  );
}
