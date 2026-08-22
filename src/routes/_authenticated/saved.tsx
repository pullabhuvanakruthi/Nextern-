import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Loader2 } from "lucide-react";
import { InternshipCard } from "@/components/InternshipCard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { daysUntil, scoreInternship } from "@/lib/matching";
import type { AppStatus } from "@/data/options";
import {
  useApplications,
  useInternships,
  useReminderPrefs,
  useSaved,
  useSetApplicationStatus,
  useSetReminderPrefs,
  useStudentProfile,
  useToggleSave,
} from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/saved")({
  head: () => ({
    meta: [
      { title: "Saved internships — Nextern" },
      {
        name: "description",
        content: "Your shortlisted internships with deadline reminders at 7, 3 and 1 days before closing.",
      },
      { property: "og:title", content: "Saved internships — Nextern" },
      { property: "og:description", content: "Shortlist internships and never miss a deadline." },
    ],
  }),
  component: SavedPage,
});

const REMINDER_DAYS = [7, 3, 1];

function SavedPage() {
  const { data: profile } = useStudentProfile();
  const { data: internships = [], isLoading } = useInternships();
  const { data: saved = [] } = useSaved();
  const { data: reminderDays = [7, 3, 1] } = useReminderPrefs();
  const setReminders = useSetReminderPrefs();
  const toggleSave = useToggleSave();
  const { data: applications = [] } = useApplications();
  const setStatus = useSetApplicationStatus();

  const savedIds = saved.map((s) => s.internship_id);
  const items = internships.filter((i) => savedIds.includes(i.id));

  const dueSoon = items.filter((i) => {
    const d = daysUntil(i.deadline);
    return d !== null && d >= 0 && reminderDays.some((r) => d <= r);
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Saved internships</h1>
        <p className="mt-2 text-muted-foreground">
          {items.length} shortlisted. We nudge you before each deadline.
        </p>

        <Card className="mt-6 gap-3 p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 font-medium">
            <BellRing className="size-4 text-primary" /> Deadline reminders
          </div>
          <div className="flex flex-wrap gap-2">
            {REMINDER_DAYS.map((d) => {
              const active = reminderDays.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() =>
                    setReminders.mutate(
                      active ? reminderDays.filter((x) => x !== d) : [...reminderDays, d].sort((a, b) => b - a),
                    )
                  }
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:bg-muted",
                  )}
                >
                  {d} day{d > 1 ? "s" : ""} before
                </button>
              );
            })}
          </div>
          {dueSoon.length > 0 && (
            <ul className="mt-2 space-y-1.5 text-sm">
              {dueSoon.map((i) => {
                const d = daysUntil(i.deadline)!;
                return (
                  <li key={i.id} className="rounded-lg bg-accent px-3 py-2 text-accent-foreground">
                    <strong>{i.title}</strong> at {i.company_name} closes{" "}
                    {d === 0 ? "today" : `in ${d} day${d > 1 ? "s" : ""}`}.
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">Nothing saved yet.</p>
            <Button className="mt-4" asChild>
              <Link to="/dashboard">Find matches</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {items.map((internship) => (
              <InternshipCard
                key={internship.id}
                item={profile ? scoreInternship(internship, profile) : { internship, score: 0, matchedSkills: [], matchedInterests: [], reason: "", reasons: [] }}
                saved
                onToggleSave={() => toggleSave.mutate({ internshipId: internship.id, saved: true })}
                status={applications.find((a) => a.internship_id === internship.id)?.status as AppStatus | undefined}
                onMarkApplied={() => setStatus.mutate({ internshipId: internship.id, status: "applied" })}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
