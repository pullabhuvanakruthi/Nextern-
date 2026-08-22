import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BellRing,
  Bookmark,
  Building2,
  FileText,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nextern — Your Skills. Your Opportunity. Your Next Internship." },
      {
        name: "description",
        content:
          "Nextern is an AI-powered internship platform for students: profile-based recommendations with match scores, saved lists, an application tracker and deadline reminders.",
      },
      { property: "og:title", content: "Nextern — AI-powered internship recommendations" },
      {
        property: "og:description",
        content:
          "Build a profile once, get ranked internships from verified sources, and track every application in one place.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Sparkles,
    tint: "bg-primary/15 text-primary",
    title: "Recommendations that explain themselves",
    body: "Every internship gets a match score plus a plain-English 'recommended because' so you know why it surfaced.",
  },
  {
    icon: ShieldCheck,
    tint: "bg-brand-violet/15 text-brand-violet",
    title: "Only legitimate opportunities",
    body: "Listings are curated from official career pages and recruiter postings, and always link to the original apply page.",
  },
  {
    icon: FileText,
    tint: "bg-brand-pink/15 text-brand-pink",
    title: "Resume-aware profile",
    body: "Upload your resume privately and keep your skills, interests and goals in one profile that powers your feed.",
  },
  {
    icon: Bookmark,
    tint: "bg-brand-amber/20 text-brand-amber",
    title: "Save for later",
    body: "Shortlist internships as you browse and come back to a clean saved list instead of a pile of browser tabs.",
  },
  {
    icon: LineChart,
    tint: "bg-brand-lime/18 text-brand-lime",
    title: "Application tracker",
    body: "Move each application through Applied → Interview → Selected or Rejected and see your pipeline at a glance.",
  },
  {
    icon: BellRing,
    tint: "bg-primary/15 text-primary",
    title: "Deadline reminders",
    body: "In-app alerts at 7, 3 and 1 days before a saved internship closes, so nothing slips past you.",
  },
];

const steps = [
  { n: "01", title: "Build your profile", body: "Education, skills, interests and preferences — four short steps." },
  { n: "02", title: "Get ranked matches", body: "We score every internship against your profile and behaviour." },
  { n: "03", title: "Apply and track", body: "Apply on the official page, then track the outcome here." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="surface-grid absolute inset-0 opacity-30" aria-hidden />
          <div className="hero-glow absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Badge className="gradient-brand border-0 text-primary-foreground">AI-powered internship matching</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Your Skills. Your Opportunity.{" "}
              <span className="gradient-text">Your Next Internship.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Nextern reads your profile — education, skills, interests, resume and goals — and ranks real
              internships from verified sources, with a clear reason behind every recommendation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Start matching <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/internships">Browse internships</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free for students · Recruiters can post openings too
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight">Built for the whole internship journey</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Discovery is only the first step. Nextern follows you from profile to offer.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className={`grid size-10 place-items-center rounded-xl ${f.tint}`}>
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n}>
                  <span className="gradient-text text-2xl font-extrabold">{s.n}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Card className="relative flex flex-col items-start justify-between gap-6 overflow-hidden p-8 shadow-[var(--shadow-lift)] sm:flex-row sm:items-center">
            <div className="hero-glow absolute inset-0" aria-hidden />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 gradient-brand" aria-hidden />
            <div className="relative">
              <Building2 className="size-5 text-primary" />
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Hiring interns?</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Post an opening, and see AI-matched candidates ranked by how well their skills fit your role —
                no résumé pile to dig through.
              </p>
            </div>
            <Button size="lg" className="relative" asChild>
              <Link to="/auth" search={{ role: "recruiter" }}>
                Open recruiter portal <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:px-6">
          <p>© {new Date().getFullYear()} Nextern</p>
          <p>Your Skills. Your Opportunity. Your Next Internship.</p>
        </div>
      </footer>
    </div>
  );
}
