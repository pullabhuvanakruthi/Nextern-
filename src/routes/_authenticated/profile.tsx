import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChoiceChips } from "@/components/ChoiceChips";
import { Navbar } from "@/components/Navbar";
import { ResumeUpload } from "@/components/ResumeUpload";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  COMPANY_TYPES,
  DEGREES,
  DOMAINS,
  DURATIONS,
  GRADUATION_YEARS,
  INTEREST_OPTIONS,
  LOCATIONS,
  SKILL_OPTIONS,
  STUDY_LEVELS,
  WORK_MODES,
} from "@/data/options";
import { useAuth } from "@/lib/auth-context";
import { profileCompleteness } from "@/lib/matching";
import { useStudentProfile, useUpdateStudentProfile } from "@/lib/queries";
import type { StudentProfile } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Nextern" },
      {
        name: "description",
        content:
          "Manage the education, skills, interests, resume and preferences that power your Nextern recommendations.",
      },
      { property: "og:title", content: "Your profile — Nextern" },
      { property: "og:description", content: "Keep your profile sharp to keep your matches sharp." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const { data: saved, isLoading } = useStudentProfile();
  const update = useUpdateStudentProfile();
  const [draft, setDraft] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (saved) setDraft((d) => d ?? saved);
  }, [saved]);

  if (isLoading || !draft || !saved) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-32">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const set = (patch: Partial<StudentProfile>) => setDraft((d) => ({ ...d!, ...patch }));
  const completeness = profileCompleteness(draft);

  const save = async () => {
    await update.mutateAsync(draft);
    toast.success("Profile updated — your matches have been re-ranked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Your profile</h1>
            <p className="mt-2 text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/onboarding">Guided setup</Link>
          </Button>
        </div>

        <Card className="mt-6 gap-3 p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Profile completeness</span>
            <span className="tabular-nums text-muted-foreground">{completeness}%</span>
          </div>
          <Progress value={completeness} />
        </Card>

        <Card className="mt-6 shadow-[var(--shadow-card)]">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <ResumeUpload profile={saved} />

            <Field label="Full name">
              <Input value={draft.full_name} onChange={(e) => set({ full_name: e.target.value })} />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Degree">
                <Select value={draft.degree} onValueChange={(v) => set({ degree: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEGREES.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Graduation year">
                <Select value={draft.graduation_year} onValueChange={(v) => set({ graduation_year: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADUATION_YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Study level">
              <ChoiceChips
                options={STUDY_LEVELS}
                allowOther
                otherPlaceholder="Other study level"
                value={draft.study_level}
                onChange={((study_level: string) => set({ study_level })) as never}
              />
            </Field>

            <Field label="Skills">
              <TagInput
                value={draft.skills}
                onChange={(skills) => set({ skills })}
                suggestions={SKILL_OPTIONS}
                allowOther
                otherPlaceholder="Other skill"
                placeholder="Add a skill"
              />
            </Field>

            <Field label="Interests">
              <ChoiceChips
                options={INTEREST_OPTIONS}
                value={draft.interests}
                multiple
                allowOther
                otherPlaceholder="Other interest"

                onChange={((interests: string[]) => set({ interests })) as never}
              />
            </Field>

            <Field label="Preferred domains">
              <ChoiceChips
                options={DOMAINS}
                value={draft.preferred_domains}
                multiple
                allowOther
                otherPlaceholder="Other domain"

                onChange={((preferred_domains: string[]) => set({ preferred_domains })) as never}
              />
            </Field>

            <Field label="Preferred locations">
              <TagInput
                value={draft.preferred_locations}
                onChange={(preferred_locations) => set({ preferred_locations })}
                suggestions={LOCATIONS}
                allowOther
                otherPlaceholder="Other location"
                placeholder="Add a location"
              />
            </Field>

            <Field label="Work mode">
              <ChoiceChips
                options={WORK_MODES}
                value={draft.work_mode}
                onChange={((work_mode: string) => set({ work_mode })) as never}
              />
            </Field>

            <Field label="Duration">
              <ChoiceChips
                options={DURATIONS}
                value={draft.duration}
                onChange={((duration: string) => set({ duration })) as never}
              />
            </Field>

            <Field label="Company type">
              <ChoiceChips
                options={COMPANY_TYPES}
                value={draft.company_type}
                onChange={((company_type: string) => set({ company_type })) as never}
              />
            </Field>

            <Field label={`Minimum monthly stipend — ₹${draft.min_stipend.toLocaleString("en-IN")}`}>
              <Slider
                value={[draft.min_stipend]}
                min={0}
                max={100000}
                step={5000}
                onValueChange={([v]) => set({ min_stipend: v ?? 0 })}
              />
            </Field>

            <Field label="Career goals">
              <Textarea
                rows={3}
                value={draft.career_goals}
                onChange={(e) => set({ career_goals: e.target.value })}
              />
            </Field>

            <div className="flex justify-end border-t border-border pt-6">
              <Button onClick={save} disabled={update.isPending}>
                {update.isPending && <Loader2 className="size-4 animate-spin" />} Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
