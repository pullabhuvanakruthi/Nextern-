import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateTest, useGradeTest, useTestAttempts } from "@/lib/ai-queries";
import type { MockQuestion, TestReport } from "@/lib/ai.functions";
import { courseUrl } from "@/lib/course-link";
import { useStudentProfile } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/prepare")({
  component: PreparePage,
  head: () => ({
    meta: [
      { title: "AI Mock Tests & Courses | Nextern" },
      {
        name: "description",
        content:
          "Take AI-generated mock tests based on your skills, see where you're weak, and get course recommendations to close the gap.",
      },
      { property: "og:title", content: "AI Mock Tests & Courses | Nextern" },
      {
        property: "og:description",
        content: "Practice skill-based mock tests and get personalised course recommendations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const DIFFICULTIES = ["easy", "medium", "hard"];

function PreparePage() {
  const { data: profile } = useStudentProfile();
  const generate = useGenerateTest();
  const grade = useGradeTest();
  const { data: attempts = [] } = useTestAttempts();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [test, setTest] = useState<{ id: string; questions: MockQuestion[] } | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ score: number; total: number; report: TestReport } | null>(null);

  const topics = Array.from(
    new Set([...(profile?.skills ?? []), ...(profile?.preferred_domains ?? []), ...(profile?.interests ?? [])]),
  ).slice(0, 20);

  const start = () => {
    const chosen = topic || topics[0];
    if (!chosen) {
      toast.error("Add skills to your profile first");
      return;
    }
    setResult(null);
    generate.mutate(
      { topic: chosen, difficulty },
      {
        onSuccess: (t) => {
          setTest(t);
          setAnswers(new Array(t.questions.length).fill(-1));
        },
        onError: (e) => toast.error(e.message),
      },
    );
  };

  const submit = () => {
    if (!test) return;
    grade.mutate(
      { testId: test.id, answers },
      { onSuccess: (r) => setResult(r), onError: (e) => toast.error(e.message) },
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Practice & upskill</h1>
        <p className="mt-2 text-muted-foreground">
          AI-generated mock tests built from your skills, with a performance report and course picks.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generate a mock test</CardTitle>
          <CardDescription>Pick a topic from your profile and a difficulty level.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Select value={topic || topics[0] || ""} onValueChange={setTopic}>
            <SelectTrigger className="sm:w-64">
              <SelectValue placeholder="Choose a topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={start} disabled={generate.isPending}>
            {generate.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Generate test
          </Button>
        </CardContent>
      </Card>

      {test && !result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{topic || topics[0]} test</CardTitle>
            <CardDescription>{test.questions.length} questions · no time limit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {test.questions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-medium">
                  {qi + 1}. {q.question}
                </p>
                <div className="grid gap-2">
                  {q.options.map((o, oi) => (
                    <button
                      key={oi}
                      onClick={() =>
                        setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                      }
                      className={cn(
                        "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                        answers[qi] === oi
                          ? "border-primary bg-primary-soft"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <Button onClick={submit} disabled={grade.isPending} className="w-full">
              {grade.isPending && <Loader2 className="size-4 animate-spin" />}
              Submit for AI review
            </Button>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              You scored {result.score}/{result.total}
            </CardTitle>
            <CardDescription>{result.report.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Progress value={(result.score / Math.max(result.total, 1)) * 100} />

            {result.report.strengths?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {result.report.strengths.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {result.report.weak_areas?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">Weak areas</p>
                <ul className="space-y-2">
                  {result.report.weak_areas.map((w) => (
                    <li key={w.topic} className="rounded-lg border border-border p-3 text-sm">
                      <span className="font-medium">{w.topic}</span>
                      <p className="text-muted-foreground">{w.advice}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.report.courses?.length > 0 && (
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="size-4" /> Recommended courses
                </p>
                <ul className="space-y-2">
                  {result.report.courses.map((c) => (
                    <li key={c.title} className="rounded-lg border border-border p-3 text-sm">
                      <a
                        href={courseUrl(c)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {c.title}
                        <ExternalLink className="ml-1 inline size-3" />
                      </a>{" "}
                      <span className="text-muted-foreground">· {c.provider}</span>
                      <p className="text-muted-foreground">{c.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => {
                setTest(null);
                setResult(null);
              }}
            >
              Take another test
            </Button>
          </CardContent>
        </Card>
      )}

      {attempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Past attempts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {attempts.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="font-medium">{a.topic}</span>
                <span className="text-muted-foreground">
                  {a.score}/{a.total} · {new Date(a.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
