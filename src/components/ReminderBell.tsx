import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDismissReminder, useReminderDismissals } from "@/lib/ai-queries";
import { useInternships, useReminderPrefs, useSaved } from "@/lib/queries";

function daysLeft(deadline: string) {
  const ms = new Date(deadline).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

export function ReminderBell() {
  const { data: saved = [] } = useSaved();
  const { data: internships = [] } = useInternships();
  const { data: days = [7, 3, 1] } = useReminderPrefs();
  const { data: dismissed = [] } = useReminderDismissals();
  const dismiss = useDismissReminder();

  const reminders = useMemo(() => {
    const savedIds = new Set(saved.map((s) => s.internship_id));
    return internships
      .filter((i) => savedIds.has(i.id) && i.deadline)
      .map((i) => {
        const left = daysLeft(i.deadline!);
        const threshold = [...days].sort((a, b) => a - b).find((d) => left <= d && left >= 0);
        return threshold === undefined ? null : { internship: i, left, threshold };
      })
      .filter((r): r is { internship: (typeof internships)[number]; left: number; threshold: number } => !!r)
      .filter((r) => !dismissed.includes(`${r.internship.id}:${r.threshold}`))
      .sort((a, b) => a.left - b.left);
  }, [saved, internships, days, dismissed]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Deadline reminders">
          <Bell className="size-5" />
          {reminders.length > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
              {reminders.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Deadline reminders</p>
          <p className="text-xs text-muted-foreground">Saved internships closing soon</p>
        </div>
        {reminders.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            Nothing due yet. Save internships to get {days.join(", ")}-day reminders.
          </p>
        ) : (
          <ul className="max-h-80 divide-y divide-border overflow-auto">
            {reminders.map(({ internship, left, threshold }) => (
              <li key={internship.id} className="px-4 py-3">
                <Link
                  to="/internships/$internshipId"
                  params={{ internshipId: internship.id }}
                  className="text-sm font-medium hover:underline"
                >
                  {internship.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {internship.company_name} ·{" "}
                  {left === 0 ? "closes today" : `${left} day${left === 1 ? "" : "s"} left`}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={internship.apply_url} target="_blank" rel="noopener noreferrer">
                      Apply
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismiss.mutate({ internshipId: internship.id, threshold })}
                  >
                    Dismiss
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
