import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { Navbar } from "@/components/Navbar";
import { RejectionPanel } from "@/components/RejectionPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_STATUSES, STATUS_LABEL, type AppStatus } from "@/data/options";
import { useApplications, useInternships, useRemoveApplication, useSetApplicationStatus } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/applications")({
  head: () => ({
    meta: [
      { title: "Application tracker — Nextern" },
      {
        name: "description",
        content:
          "Track every internship application from applied to interview to selected or rejected, in one pipeline.",
      },
      { property: "og:title", content: "Application tracker — Nextern" },
      { property: "og:description", content: "See your whole internship pipeline at a glance." },
    ],
  }),
  component: Tracker,
});

const TONE: Record<AppStatus, string> = {
  saved: "bg-secondary text-secondary-foreground",
  applied: "bg-primary-soft text-accent-foreground",
  interview: "bg-chart-4/20 text-foreground",
  selected: "bg-success/15 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

function Tracker() {
  const { data: applications = [], isLoading } = useApplications();
  const { data: internships = [] } = useInternships();
  const setStatus = useSetApplicationStatus();
  const remove = useRemoveApplication();

  const byId = new Map(internships.map((i) => [i.id, i]));
  const counts = APP_STATUSES.map((s) => ({
    status: s,
    count: applications.filter((a) => a.status === s).length,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Application tracker</h1>
        <p className="mt-2 text-muted-foreground">
          {applications.length} applications tracked. Update the stage as you hear back.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {counts.map(({ status, count }) => (
            <Card key={status} className="gap-1 p-4 shadow-[var(--shadow-card)]">
              <span className="text-2xl font-bold tabular-nums">{count}</span>
              <span className="text-sm text-muted-foreground">{STATUS_LABEL[status]}</span>
            </Card>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              No applications yet. Mark one as applied from an internship page.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/dashboard">Find matches</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {applications.map((a) => {
              const internship = byId.get(a.internship_id);
              if (!internship) return null;
              return (
                <div key={a.id} className="space-y-2">
                <Card
                  className="flex flex-row flex-wrap items-center justify-between gap-4 p-5 shadow-[var(--shadow-card)]"
                >
                  <div className="min-w-0">
                    <Link
                      to="/internships/$internshipId"
                      params={{ internshipId: internship.id }}
                      className="font-semibold hover:underline"
                    >
                      {internship.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {internship.company_name} · {internship.location}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          TONE[a.status as AppStatus],
                        )}
                      >
                        {STATUS_LABEL[a.status as AppStatus]}
                      </span>
                      <DeadlineBadge deadline={internship.deadline} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={a.status}
                      onValueChange={(status) =>
                        setStatus.mutate({ internshipId: a.internship_id, status: status as AppStatus })
                      }
                    >
                      <SelectTrigger className="w-40" aria-label="Application stage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {APP_STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" aria-label="Open apply page" asChild>
                      <a href={internship.apply_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove from tracker"
                      onClick={() => remove.mutate(a.internship_id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </Card>
                {a.status === "rejected" && <RejectionPanel internshipId={a.internship_id} />}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
