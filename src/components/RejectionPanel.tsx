import { BookOpen, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAnalyzeRejection, useRejectionAnalyses } from "@/lib/ai-queries";
import { courseUrl } from "@/lib/course-link";

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function RejectionPanel({ internshipId }: { internshipId: string }) {
  const { data: analyses } = useRejectionAnalyses();
  const analyze = useAnalyzeRejection();
  const analysis = analyses?.[internshipId];

  return (
    <Card className="gap-3 border-dashed p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">What could have gone better?</p>
          <p className="text-xs text-muted-foreground">
            AI reviews your profile and resume against this role.
          </p>
        </div>
        <Button
          size="sm"
          variant={analysis ? "outline" : "default"}
          disabled={analyze.isPending}
          onClick={() =>
            analyze.mutate(internshipId, {
              onError: (e) => toast.error(e instanceof Error ? e.message : "Analysis failed"),
            })
          }
        >
          {analyze.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {analysis ? "Re-analyse" : "Analyse rejection"}
        </Button>
      </div>

      {analysis && (
        <div className="space-y-3">
          <p className="text-sm">{analysis.summary}</p>
          <Section title="Skill gaps" items={analysis.skill_gaps} />
          <Section title="Resume gaps" items={analysis.resume_gaps} />
          <Section title="Experience gaps" items={analysis.experience_gaps} />
          <Section title="Next steps" items={analysis.next_steps} />
          {analysis.courses?.length > 0 && (
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="size-3.5" /> Courses to close the gap
              </p>
              <ul className="mt-1 space-y-1 text-sm">
                {analysis.courses.map((c) => (
                  <li key={c.title}>
                    <a
                      href={courseUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {c.title}
                      <ExternalLink className="ml-1 inline size-3" />
                    </a>{" "}
                    <span className="text-muted-foreground">· {c.provider} — {c.why}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
