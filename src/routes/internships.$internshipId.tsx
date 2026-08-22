import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { RejectionPanel } from "@/components/RejectionPanel";
import { MatchScore } from "@/components/MatchScore";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/lib/auth-context";
import { scoreInternship } from "@/lib/matching";
import { getPublicInternship } from "@/lib/public-internships.functions";
import {
  useApplications,
  useSaved,
  useSetApplicationStatus,
  useStudentProfile,
  useToggleSave,
} from "@/lib/queries";

export const Route = createFileRoute("/internships/$internshipId")({
  loader: async ({ params }) => {
    const internship = await getPublicInternship({ data: { id: params.internshipId } });
    if (!internship) throw notFound();
    return internship;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Internship not found — Nextern" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} at ${loaderData.company_name} — Nextern`;
    const description = `${loaderData.title} internship at ${loaderData.company_name} in ${loaderData.location}. ${loaderData.duration}, ${loaderData.work_mode}. Apply via the official listing.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: InternshipDetail,
});

function InternshipDetail() {
  const internship = Route.useLoaderData();
  const { user } = useAuth();
  const { data: profile } = useStudentProfile();
  const { data: saved = [] } = useSaved();
  const { data: applications = [] } = useApplications();
  const toggleSave = useToggleSave();
  const setStatus = useSetApplicationStatus();

  const isSaved = saved.some((s) => s.internship_id === internship.id);
  const application = applications.find((a) => a.internship_id === internship.id);
  const scored = profile ? scoreInternship(internship, profile) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/internships">
            <ArrowLeft className="size-4" /> Back to internships
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">{internship.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {internship.company_name} · {internship.domain}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {scored && <MatchScore score={scored.score} className="text-sm" />}
            {user && (
              <span
                className={
                  application && application.status !== "saved"
                    ? "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success"
                    : "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                }
              >
                {application && application.status !== "saved" ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <Circle className="size-3.5" />
                )}
                {application && application.status !== "saved"
                  ? STATUS_LABEL[application.status as AppStatus]
                  : "Not applied"}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {internship.location} · {internship.work_mode}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Banknote className="size-4" />
            {internship.stipend ? `₹${internship.stipend.toLocaleString("en-IN")}/mo` : "Stipend not stated"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {internship.duration}
          </span>
          <DeadlineBadge deadline={internship.deadline} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={internship.apply_url} target="_blank" rel="noopener noreferrer">
              Apply on {internship.source} <ExternalLink className="size-4" />
            </a>
          </Button>
          {user ? (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleSave.mutate({ internshipId: internship.id, saved: isSaved })}
              >
                {isSaved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                {isSaved ? "Saved" : "Save for later"}
              </Button>
              {(!application || application.status === "saved") && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setStatus.mutate({ internshipId: internship.id, status: "applied" })}
                >
                  <CheckCircle2 className="size-4" /> Mark as applied
                </Button>
              )}
              <Select
                value={application?.status ?? ""}
                onValueChange={(status) =>
                  setStatus.mutate({ internshipId: internship.id, status: status as AppStatus })
                }
              >
                <SelectTrigger className="h-10 w-48" aria-label="Track application">
                  <SelectValue placeholder="Track application" />
                </SelectTrigger>
                <SelectContent>
                  {APP_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">Sign in to save & track</Link>
            </Button>
          )}
        </div>

        {application?.status === "rejected" && (
          <div className="mt-8">
            <RejectionPanel internshipId={internship.id} />
          </div>
        )}

        {scored && (
          <Card className="mt-8 gap-3 p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="size-4 text-primary" /> Recommended because
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {scored.reasons.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </Card>
        )}

        <Card className="mt-6 gap-4 p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold">About this internship</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {internship.description}
          </p>

          <div>
            <h3 className="text-sm font-semibold">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {internship.skills.map((s) => (
                <Badge
                  key={s}
                  variant={scored?.matchedSkills.includes(s) ? "default" : "secondary"}
                  className={scored?.matchedSkills.includes(s) ? "bg-primary-soft text-accent-foreground" : ""}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="inline-flex items-center gap-1.5 text-sm font-semibold">
              <GraduationCap className="size-4" /> Eligibility
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{internship.eligibility}</p>
          </div>

          <p className="inline-flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            Listed from {internship.source}. Applications always happen on the company's official page — Next
            Intern never collects application fees.
          </p>
        </Card>
      </main>
    </div>
  );
}
