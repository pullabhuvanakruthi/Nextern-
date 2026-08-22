import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Clock, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOMAINS } from "@/data/options";
import { listPublicInternships } from "@/lib/public-internships.functions";
import type { Internship } from "@/lib/types";

export const Route = createFileRoute("/internships/")({
  loader: () => listPublicInternships(),
  head: () => ({
    meta: [
      { title: "Browse internships — Nextern" },
      {
        name: "description",
        content:
          "Browse verified internship openings across AI/ML, software, data, design and more — each with the original apply link.",
      },
      { property: "og:title", content: "Browse internships — Nextern" },
      {
        property: "og:description",
        content: "Verified internship listings from official career pages and recruiters.",
      },
    ],
  }),
  component: BrowsePage,
});

const ALL = "all";

function BrowsePage() {
  const internships = Route.useLoaderData() as Internship[];
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState(ALL);

  const results = useMemo(
    () =>
      internships.filter((i) => {
        if (domain !== ALL && i.domain !== domain) return false;
        if (!q.trim()) return true;
        const hay = `${i.title} ${i.company_name} ${i.location} ${i.skills.join(" ")}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      }),
    [internships, q, domain],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Browse internships</h1>
        <p className="mt-2 text-muted-foreground">
          {internships.length} verified openings. Sign in to see how each one matches your profile.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search role, company or skill"
              className="pl-9"
            />
          </div>
          <Select value={domain} onValueChange={setDomain}>
            <SelectTrigger className="sm:w-56" aria-label="Domain">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All domains</SelectItem>
              {DOMAINS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {results.map((i) => (
            <Card key={i.id} className="p-0 shadow-[var(--shadow-card)]">
              <Link
                to="/internships/$internshipId"
                params={{ internshipId: i.id }}
                className="block p-5 sm:p-6"
              >
                <h2 className="text-lg font-semibold leading-tight">{i.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {i.company_name} · {i.domain}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {i.skills.slice(0, 5).map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" /> {i.location} · {i.work_mode}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Banknote className="size-4" />
                    {i.stipend ? `₹${i.stipend.toLocaleString("en-IN")}/mo` : "Not stated"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" /> {i.duration}
                  </span>
                  <DeadlineBadge deadline={i.deadline} />
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {results.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No internships match that search.</p>
        )}
      </main>
    </div>
  );
}
