import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileCheck2, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { MatchScore } from "@/components/MatchScore";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCandidates, useMyInternships } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/recruiter/$internshipId")({
  head: () => ({
    meta: [
      { title: "Matched candidates — Nextern" },
      {
        name: "description",
        content: "Students ranked by how well their skills and interests fit this internship opening.",
      },
      { property: "og:title", content: "Matched candidates — Nextern" },
      { property: "og:description", content: "AI-ranked candidate suitability for your opening." },
    ],
  }),
  component: CandidatesPage,
});

function CandidatesPage() {
  const { internshipId } = Route.useParams();
  const { data: postings = [] } = useMyInternships();
  const { data: candidates = [], isLoading } = useCandidates(internshipId);
  const posting = postings.find((p) => p.id === internshipId);

  const ranked = useMemo(() => {
    const required = (posting?.skills ?? []).map((s) => s.toLowerCase());
    return candidates
      .map((c) => {
        const matched = (c.skills ?? []).filter((s) => required.includes(s.toLowerCase()));
        const domainFit = (c.interests ?? []).some(
          (i) => i.toLowerCase() === (posting?.domain ?? "").toLowerCase(),
        );
        const score = Math.min(
          99,
          Math.round(
            25 +
              (required.length ? (matched.length / required.length) * 50 : 0) +
              (domainFit ? 15 : 0) +
              (c.has_resume ? 5 : 0) +
              (c.application_status ? 5 : 0),
          ),
        );
        return { ...c, matched, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [candidates, posting]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/recruiter">
            <ArrowLeft className="size-4" /> Back to postings
          </Link>
        </Button>

        <h1 className="text-3xl font-semibold">{posting?.title ?? "Matched candidates"}</h1>
        <p className="mt-2 text-muted-foreground">
          {ranked.length} students ranked by suitability. Contact details stay private until a student applies.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : ranked.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No student profiles match this opening yet.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {ranked.map((c) => (
              <Card key={c.user_id} className="gap-3 p-5 shadow-[var(--shadow-card)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{c.display_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {[c.degree, c.specialization, c.college].filter(Boolean).join(" · ") ||
                        "Profile in progress"}
                      {c.graduation_year ? ` · Class of ${c.graduation_year}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.application_status && <Badge variant="secondary">{c.application_status}</Badge>}
                    <MatchScore score={c.score} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(c.skills ?? []).slice(0, 10).map((s) => (
                    <Badge
                      key={s}
                      variant={c.matched.includes(s) ? "default" : "secondary"}
                      className={c.matched.includes(s) ? "bg-primary-soft text-accent-foreground" : ""}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                {c.has_resume && (
                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileCheck2 className="size-3.5 text-primary" /> Resume on file
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
