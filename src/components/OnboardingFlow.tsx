import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChoiceChips } from "@/components/ChoiceChips";
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
  CURRENT_YEARS,
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
import { useStudentProfile, useUpdateStudentProfile } from "@/lib/queries";
import type { StudentProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = ["Education", "Skills & resume", "Interests", "Preferences"];

export function OnboardingFlow() {
  const { data: saved, isLoading } = useStudentProfile();
  const update = useUpdateStudentProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (saved && !draft) setDraft(saved);
  }, [saved, draft]);

  if (isLoading || !draft) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const set = (patch: Partial<StudentProfile>) => setDraft((d) => ({ ...d!, ...patch }));

  const next = async () => {
    if (step === 0 && (!draft.full_name.trim() || !draft.degree)) {
      toast.error("Add your name and degree to continue");
      return;
    }
    if (step === 1 && draft.skills.length < 1) {
      toast.error("Add at least one skill");
      return;
    }
    const last = step === STEPS.length - 1;
    await update.mutateAsync({ ...draft, onboarding_complete: last || draft.onboarding_complete });
    if (last) {
      toast.success("Profile saved — here are your matches");
      navigate({ to: "/dashboard" });
      return;
    }
    toast.success("Saved");
    setStep((s) => s + 1);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((step + 1) / STEPS.length) * 100)}%
          </span>
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} />
        <div className="mt-3 flex flex-wrap gap-3">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "text-xs font-medium transition-colors",
                i <= step ? "text-primary" : "text-muted-foreground",
              )}
            >
              {i < step && <Check className="mr-1 inline size-3" />}
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="space-y-6 p-6 sm:p-8">
          {step === 0 && (
            <>
              <Field label="Full name">
                <Input
                  value={draft.full_name}
                  onChange={(e) => set({ full_name: e.target.value })}
                  placeholder="Ananya Sharma"
                />
              </Field>
              <Field label="Degree">
                <Select value={draft.degree} onValueChange={(v) => set({ degree: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your degree" />
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
              {draft.degree === "Other" && (
                <Field label="Tell us your degree">
                  <Input
                    value={draft.degree_other}
                    onChange={(e) => set({ degree_other: e.target.value })}
                    placeholder="e.g. B.Des"
                  />
                </Field>
              )}
              <Field label="Study level">
                <ChoiceChips
                  options={STUDY_LEVELS}
                  allowOther
                  otherPlaceholder="Other study level"
                  value={draft.study_level}
                  onChange={((study_level: string) => set({ study_level })) as never}
                />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Current year">
                  <Select value={draft.current_year} onValueChange={(v) => set({ current_year: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENT_YEARS.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
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
            </>
          )}

          {step === 1 && (
            <>
              <Field
                label="Your skills"
                hint="Pick from the suggestions, or type your own (Other) and press Enter. One skill is enough."
              >
                <TagInput
                  value={draft.skills}
                  onChange={(skills) => set({ skills })}
                  suggestions={SKILL_OPTIONS}
                  allowOther
                  otherPlaceholder="Other skill"
                  placeholder="e.g. Python"
                />
              </Field>
              <ResumeUpload profile={saved!} />
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Areas you're interested in" hint="We rank internships in these areas higher.">
                <ChoiceChips
                  options={INTEREST_OPTIONS}
                  value={draft.interests}
                  multiple
                  allowOther
                  otherPlaceholder="Other interest"

                  onChange={((interests: string[]) => set({ interests })) as never}
                />
              </Field>
              <Field label="Career goal" hint="One line is enough — it shapes your recommendations.">
                <Textarea
                  value={draft.career_goals}
                  onChange={(e) => set({ career_goals: e.target.value })}
                  placeholder="Become an ML engineer at a product company"
                  rows={3}
                />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
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
              <Field label="Preferred locations" hint="Pick a suggestion or type any other location and press Enter.">
                <TagInput
                  value={draft.preferred_locations}
                  onChange={(preferred_locations) => set({ preferred_locations })}
                  suggestions={LOCATIONS}
                  allowOther
                  otherPlaceholder="Other location"
                  placeholder="e.g. Bengaluru, IN"
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
            </>
          )}

          <div className="flex items-center justify-between border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button onClick={next} disabled={update.isPending}>
              {update.isPending && <Loader2 className="size-4 animate-spin" />}
              {step === STEPS.length - 1 ? "See my matches" : "Save & continue"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}
