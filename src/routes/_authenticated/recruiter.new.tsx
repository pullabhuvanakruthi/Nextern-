import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChoiceChips } from "@/components/ChoiceChips";
import { Navbar } from "@/components/Navbar";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DOMAINS, DURATIONS, SKILL_OPTIONS, WORK_MODES } from "@/data/options";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useMyCompany } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/recruiter/new")({
  head: () => ({
    meta: [
      { title: "Post an internship — Nextern" },
      {
        name: "description",
        content: "Publish an internship opening on Nextern and reach students matched to your role.",
      },
      { property: "og:title", content: "Post an internship — Nextern" },
      { property: "og:description", content: "Publish an opening and get AI-matched candidates." },
    ],
  }),
  component: NewPosting,
});

function NewPosting() {
  const { user } = useAuth();
  const { data: company } = useMyCompany();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company_name: "",
    domain: "",
    description: "",
    eligibility: "",
    location: "",
    work_mode: "Remote",
    duration: "3 months",
    stipend: "",
    deadline: "",
    apply_url: "",
    skills: [] as string[],
  });

  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const submit = async () => {
    const companyName = form.company_name || company?.name || "";
    if (!form.title || !companyName || !form.domain || !form.apply_url) {
      toast.error("Title, company, domain and apply link are required");
      return;
    }
    if (!/^https?:\/\//i.test(form.apply_url)) {
      toast.error("Apply link must be a full https:// URL");
      return;
    }
    setBusy(true);
    try {
      const { data: newInternship, error: insertError } = await supabase
        .from("internships")
        .insert({
          posted_by: user!.id,
          company_id: company?.id ?? null,
          company_name: companyName,
          title: form.title,
          description: form.description,
          domain: form.domain,
          skills: form.skills,
          eligibility: form.eligibility,
          location: form.location || "Remote",
          work_mode: form.work_mode,
          duration: form.duration,
          stipend: form.stipend ? Number(form.stipend) : null,
          deadline: form.deadline || null,
          source: "Nextern",
          apply_url: form.apply_url,
          is_curated: false,
          is_published: true,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Notify matching students
      try {
        const { data: students } = await supabase
          .from("student_profiles")
          .select("user_id, preferred_domains")
          .eq("onboarding_complete", true);

        if (students && students.length > 0) {
          const matches = students.filter(s => 
            (s.preferred_domains || []).some(d => d.toLowerCase() === form.domain.toLowerCase())
          );
          const targetStudents = matches.length > 0 ? matches : students;

          const notificationsPayload = targetStudents.map(student => ({
            user_id: student.user_id,
            title: "New Internship Match",
            message: `A new ${form.domain} internship "${form.title}" at "${companyName}" matches your profile!`,
            type: "new_internship",
            link: "/dashboard"
          }));

          if (notificationsPayload.length > 0) {
            await supabase.from("notifications").insert(notificationsPayload);
          }
          console.log(`[Email Dispatch Simulation] Sent new internship email alerts to ${targetStudents.length} students matching domain ${form.domain}.`);
        }
      } catch (notifyErr) {
        console.warn("Failed to dispatch new internship notifications:", notifyErr);
      }

      toast.success("Internship published & matching students notified!");
      navigate({ to: "/recruiter" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not publish");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Post an internship</h1>
        <p className="mt-2 text-muted-foreground">
          Students see this alongside curated listings, ranked against their profile.
        </p>

        <Card className="mt-6 shadow-[var(--shadow-card)]">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Role title">
                <Input value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="ML Intern" />
              </Field>
              <Field label="Company name">
                <Input
                  value={form.company_name || company?.name || ""}
                  onChange={(e) => set({ company_name: e.target.value })}
                  placeholder="Acme Labs"
                />
              </Field>
            </div>

            <Field label="Domain">
              <Select value={form.domain} onValueChange={(domain) => set({ domain })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {DOMAINS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Description">
              <Textarea
                rows={5}
                value={form.description}
                onChange={(e) => set({ description: e.target.value })}
                placeholder="What the intern will work on, team, mentorship…"
              />
            </Field>

            <Field label="Required skills">
              <TagInput
                value={form.skills}
                onChange={(skills) => set({ skills })}
                suggestions={SKILL_OPTIONS}
                placeholder="Add a skill"
              />
            </Field>

            <Field label="Eligibility">
              <Input
                value={form.eligibility}
                onChange={(e) => set({ eligibility: e.target.value })}
                placeholder="Pre-final year B.Tech students"
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Location">
                <Input
                  value={form.location}
                  onChange={(e) => set({ location: e.target.value })}
                  placeholder="Bengaluru, IN"
                />
              </Field>
              <Field label="Monthly stipend (₹)">
                <Input
                  type="number"
                  min={0}
                  value={form.stipend}
                  onChange={(e) => set({ stipend: e.target.value })}
                  placeholder="30000"
                />
              </Field>
            </div>

            <Field label="Work mode">
              <ChoiceChips
                options={WORK_MODES}
                value={form.work_mode}
                onChange={((work_mode: string) => set({ work_mode })) as never}
              />
            </Field>

            <Field label="Duration">
              <ChoiceChips
                options={DURATIONS}
                value={form.duration}
                onChange={((duration: string) => set({ duration })) as never}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Application deadline">
                <Input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => set({ deadline: e.target.value })}
                />
              </Field>
              <Field label="Apply link (official page)">
                <Input
                  value={form.apply_url}
                  onChange={(e) => set({ apply_url: e.target.value })}
                  placeholder="https://careers.acme.com/intern"
                />
              </Field>
            </div>

            <div className="flex justify-end border-t border-border pt-6">
              <Button onClick={submit} disabled={busy}>
                {busy && <Loader2 className="size-4 animate-spin" />} Publish internship
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
