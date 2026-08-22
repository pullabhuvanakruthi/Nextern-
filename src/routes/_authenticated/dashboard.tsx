import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { InternshipCard } from "@/components/InternshipCard";
import { MotivationBanner } from "@/components/MotivationBanner";
import { Navbar } from "@/components/Navbar";
import { SkillTrendDetector } from "@/components/SkillTrendDetector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOMAINS, LOCATIONS, WORK_MODES, type AppStatus } from "@/data/options";
import { profileCompleteness, rankInternships } from "@/lib/matching";
import {
  useApplications,
  useFeedback,
  useInternships,
  useSaved,
  useSetApplicationStatus,
  useSetFeedback,
  useStudentProfile,
  useToggleSave,
} from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your internship matches — Nextern" },
      {
        name: "description",
        content:
          "A ranked feed of internships scored against your skills, interests, location, duration and stipend preferences.",
      },
      { property: "og:title", content: "Your internship matches — Nextern" },
      {
        property: "og:description",
        content: "Filter, save and give feedback on internships ranked for your profile.",
      },
    ],
  }),
  component: Dashboard,
});

const ALL = "all";

function Dashboard() {
  const { data: profile, isLoading: profileLoading } = useStudentProfile();
  const { data: internships = [], isLoading } = useInternships();
  const { data: feedback = {} } = useFeedback();
  const { data: saved = [] } = useSaved();
  const { data: applications = [] } = useApplications();
  const toggleSave = useToggleSave();
  const setFeedback = useSetFeedback();
  const setStatus = useSetApplicationStatus();

  const [domain, setDomain] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [workMode, setWorkMode] = useState(ALL);
  const [stipend, setStipend] = useState(ALL);
  const [sort, setSort] = useState("match");

  const savedIds = saved.map((s) => s.internship_id);

  const results = useMemo(() => {
    if (!profile) return [];
    const savedDomains = internships.filter((i) => savedIds.includes(i.id)).map((i) => i.domain);
    const appliedDomains = internships
      .filter((i) => applications.some((a) => a.internship_id === i.id))
      .map((i) => i.domain);

    let list = rankInternships(internships, profile, { feedback, savedDomains, appliedDomains });
    list = list.filter(({ internship: i }) => {
      if (domain !== ALL && i.domain !== domain) return false;
      if (location !== ALL && i.location !== location) return false;
      if (workMode !== ALL && i.work_mode !== workMode) return false;
      if (stipend !== ALL && (i.stipend ?? 0) < Number(stipend)) return false;
      return true;
    });
    if (sort === "stipend")
      list = [...list].sort((a, b) => (b.internship.stipend ?? 0) - (a.internship.stipend ?? 0));
    if (sort === "deadline")
      list = [...list].sort((a, b) =>
        (a.internship.deadline ?? "9999").localeCompare(b.internship.deadline ?? "9999"),
      );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internships, profile, feedback, applications, saved, domain, location, workMode, stipend, sort]);

  const completeness = profile ? profileCompleteness(profile) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">
              {profile?.full_name ? `Matches for ${profile.full_name.split(" ")[0]}` : "Your matches"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {results.length} internships ranked against your profile.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/profile">Edit profile</Link>
          </Button>
        </div>

        {!profileLoading && completeness < 100 && (
          <Card className="mt-6 flex flex-row flex-wrap items-center justify-between gap-4 p-5 shadow-[var(--shadow-card)]">
            <div>
              <p className="font-medium">Your profile is {completeness}% complete</p>
              <p className="text-sm text-muted-foreground">
                Richer profiles — especially skills and a resume — get noticeably sharper matches.
              </p>
            </div>
            <Button asChild>
              <Link to="/onboarding">Finish profile</Link>
            </Button>
          </Card>
        )}

        <Card className="mt-6 gap-0 p-4 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="size-4" /> Filter & sort
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect value={sort} onChange={setSort} label="Sort by">
              <SelectItem value="match">Match score</SelectItem>
              <SelectItem value="stipend">Stipend (high to low)</SelectItem>
              <SelectItem value="deadline">Deadline (soonest)</SelectItem>
            </FilterSelect>
            <FilterSelect value={domain} onChange={setDomain} label="Domain">
              <SelectItem value={ALL}>All domains</SelectItem>
              {DOMAINS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </FilterSelect>
            <FilterSelect value={location} onChange={setLocation} label="Location">
              <SelectItem value={ALL}>All locations</SelectItem>
              {LOCATIONS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </FilterSelect>
            <FilterSelect value={workMode} onChange={setWorkMode} label="Work mode">
              <SelectItem value={ALL}>Any mode</SelectItem>
              {WORK_MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </FilterSelect>
            <FilterSelect value={stipend} onChange={setStipend} label="Min stipend">
              <SelectItem value={ALL}>Any stipend</SelectItem>
              {[20000, 40000, 60000].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  ₹{s.toLocaleString("en-IN")}+
                </SelectItem>
              ))}
            </FilterSelect>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <MotivationBanner profile={profile} />
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {results.map((item) => (
                <InternshipCard
                key={item.internship.id}
                item={item}
                saved={savedIds.includes(item.internship.id)}
                onToggleSave={() =>
                  toggleSave.mutate({
                    internshipId: item.internship.id,
                    saved: savedIds.includes(item.internship.id),
                  })
                }
                status={applications.find((a) => a.internship_id === item.internship.id)?.status as AppStatus | undefined}
                onMarkApplied={() =>
                  setStatus.mutate({ internshipId: item.internship.id, status: "applied" })
                }
                feedback={feedback[item.internship.id]}
                onFeedback={(value) => setFeedback.mutate({ internshipId: item.internship.id, value })}
              />
            ))}
          </div>
          </>
        )}

        {!isLoading && results.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No internships match these filters. Try widening them.
          </p>
        )}

        <SkillTrendDetector />
      </main>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  label,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label} className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
