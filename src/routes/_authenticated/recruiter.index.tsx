import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Loader2, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DeadlineBadge } from "@/components/DeadlineBadge";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useMyCompany, useMyInternships } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/recruiter/")({
  head: () => ({
    meta: [
      { title: "Recruiter portal — Nextern" },
      {
        name: "description",
        content: "Post internships, manage your openings and review AI-matched student candidates.",
      },
      { property: "og:title", content: "Recruiter portal — Nextern" },
      { property: "og:description", content: "Hire interns with AI-ranked candidate suitability." },
    ],
  }),
  component: RecruiterHome,
});

function RecruiterHome() {
  const { user } = useAuth();
  const { data: company, isLoading, refetch } = useMyCompany();
  const { data: postings = [] } = useMyInternships();
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [about, setAbout] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (company) {
      setName(company.name ?? "");
      setWebsite(company.website ?? "");
      setIndustry(company.industry ?? "");
      setAbout(company.about ?? "");
    }
  }, [company]);

  const saveCompany = async () => {
    if (!name.trim()) {
      toast.error("Add your company name");
      return;
    }
    setBusy(true);
    try {
      const payload = { owner_id: user!.id, name, website, industry, about };
      const { error } = company
        ? await supabase.from("companies").update(payload).eq("id", company.id)
        : await supabase.from("companies").insert(payload);
      if (error) throw error;
      toast.success("Company profile saved");
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Recruiter portal</h1>
            <p className="mt-2 text-muted-foreground">
              Post openings and see students ranked by how well they fit.
            </p>
          </div>
          <Button asChild>
            <Link to="/recruiter/new">
              <Plus className="size-4" /> Post internship
            </Link>
          </Button>
        </div>

        <Card className="mt-6 shadow-[var(--shadow-card)]">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2 font-semibold">
              <Building2 className="size-4 text-primary" /> Company profile
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Company name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Labs" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://acme.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="SaaS" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea rows={3} value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveCompany} disabled={busy || isLoading}>
                {busy && <Loader2 className="size-4 animate-spin" />} Save company
              </Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-10 text-xl font-semibold">Your postings</h2>
        {postings.length === 0 ? (
          <p className="mt-3 text-muted-foreground">No openings yet. Post your first internship.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {postings.map((p) => (
              <Card
                key={p.id}
                className="flex flex-row flex-wrap items-center justify-between gap-4 p-5 shadow-[var(--shadow-card)]"
              >
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.domain} · {p.location} · {p.work_mode}
                  </p>
                  <div className="mt-2">
                    <DeadlineBadge deadline={p.deadline} />
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/recruiter/$internshipId" params={{ internshipId: p.id }}>
                    <Users className="size-4" /> Matched candidates
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
