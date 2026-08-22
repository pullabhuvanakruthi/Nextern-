import { Link } from "@tanstack/react-router";
import { Banknote, Bookmark, BookmarkCheck, CheckCircle2, Circle, Clock, FileSearch, MapPin, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { STATUS_LABEL, type AppStatus } from "@/data/options";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { MatchScore } from "@/components/MatchScore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ScoredInternship } from "@/lib/matching";
import { cn } from "@/lib/utils";

export function InternshipCard({
  item,
  saved,
  onToggleSave,
  feedback,
  onFeedback,
  showScore = true,
  status,
  onMarkApplied,
}: {
  item: ScoredInternship;
  saved?: boolean;
  onToggleSave?: () => void;
  feedback?: "up" | "down" | undefined;
  onFeedback?: (value: "up" | "down" | null) => void;
  showScore?: boolean;
  status?: AppStatus | undefined;
  onMarkApplied?: () => void;
}) {
  const { internship } = item;

  return (
    <Card className="group gap-0 overflow-hidden p-0 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/internships/$internshipId"
        params={{ internshipId: internship.id }}
        className="block p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-tight sm:text-lg">{internship.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {internship.company_name} · {internship.domain}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            {showScore && <MatchScore score={item.score} />}
            {onMarkApplied && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                  status && status !== "saved"
                    ? "bg-success/15 text-success"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                {status && status !== "saved" ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <Circle className="size-3.5" />
                )}
                {status && status !== "saved" ? STATUS_LABEL[status] : "Not applied"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {internship.skills.slice(0, 6).map((s) => (
            <Badge
              key={s}
              variant={item.matchedSkills.includes(s) ? "default" : "secondary"}
              className={cn(
                "font-medium",
                item.matchedSkills.includes(s) && "bg-primary-soft text-accent-foreground",
              )}
            >
              {s}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {internship.location} · {internship.work_mode}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Banknote className="size-4" />
            {internship.stipend ? `₹${internship.stipend.toLocaleString("en-IN")}/mo` : "Unpaid / not stated"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {internship.duration}
          </span>
          <DeadlineBadge deadline={internship.deadline} />
        </div>

        {showScore && (
          <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-primary-soft px-3 py-2 text-sm text-accent-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0" />
            {item.reason}
          </p>
        )}
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface px-5 py-3 sm:px-6">
        {onToggleSave ? (
          <Button variant={saved ? "secondary" : "ghost"} size="sm" onClick={onToggleSave}>
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            {saved ? "Saved" : "Save for later"}
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">Source: {internship.source}</span>
        )}

        {onMarkApplied && status !== "rejected" && (!status || status === "saved") && (
          <Button variant="outline" size="sm" onClick={onMarkApplied}>
            <CheckCircle2 className="size-4" /> Mark as applied
          </Button>
        )}

        {status === "rejected" && (
          <Button variant="outline" size="sm" asChild>
            <Link to="/applications">
              <FileSearch className="size-4" /> View rejection summary
            </Link>
          </Button>
        )}

        {onFeedback && (
          <div className="flex gap-1">
            <Button
              variant={feedback === "up" ? "default" : "ghost"}
              size="icon"
              aria-label="Good match"
              onClick={() => onFeedback(feedback === "up" ? null : "up")}
            >
              <ThumbsUp className="size-4" />
            </Button>
            <Button
              variant={feedback === "down" ? "default" : "ghost"}
              size="icon"
              aria-label="Not interested"
              onClick={() => onFeedback(feedback === "down" ? null : "down")}
            >
              <ThumbsDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
