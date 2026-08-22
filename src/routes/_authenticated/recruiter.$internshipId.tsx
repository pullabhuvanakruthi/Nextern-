import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileCheck2, Loader2, Mail, Download, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { MatchScore } from "@/components/MatchScore";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_STATUSES, STATUS_LABEL, type AppStatus } from "@/data/options";
import { useCandidates, useMyInternships, useUpdateApplicationByRecruiter, type Candidate } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [messageText, setMessageText] = useState("");
  const [statusVal, setStatusVal] = useState<string>("applied");
  const [downloading, setDownloading] = useState(false);

  const updateApp = useUpdateApplicationByRecruiter(internshipId);

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
              <Card 
                key={c.user_id} 
                className="gap-3 p-5 shadow-[var(--shadow-card)] cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  setSelectedCandidate(c);
                  setStatusVal(c.application_status || "applied");
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold hover:text-primary transition-colors">{c.display_name}</p>
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

      {/* Candidate Details Modal */}
      <Dialog 
        open={!!selectedCandidate} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCandidate(null);
            setMessageText("");
          }
        }}
      >
        {selectedCandidate && (
          <DialogContent className="max-w-2xl bg-surface border border-border shadow-[var(--shadow-card)] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl font-bold">{selectedCandidate.display_name}</DialogTitle>
                <Badge variant="secondary" className="bg-primary-soft text-accent-foreground font-semibold">
                  Match {selectedCandidate.score}%
                </Badge>
              </div>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {[selectedCandidate.degree, selectedCandidate.specialization, selectedCandidate.college].filter(Boolean).join(" · ")}
                {selectedCandidate.graduation_year ? ` · Class of ${selectedCandidate.graduation_year}` : ""}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 my-4">
              {/* Contact Info (Conditionally visible when applied) */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Contact Information</h3>
                {selectedCandidate.email ? (
                  <div className="flex items-center gap-2 text-sm mt-1 bg-primary/5 p-3 rounded-lg border border-primary/10">
                    <Mail className="size-4 text-primary shrink-0" />
                    <span className="font-semibold">{selectedCandidate.email}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic bg-muted p-2.5 rounded-lg border border-border">
                    🔒 Contact details stay private until the student applies.
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Skills</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(selectedCandidate.skills ?? []).map((s) => (
                    <Badge
                      key={s}
                      variant={selectedCandidate.matched.includes(s) ? "default" : "secondary"}
                      className={selectedCandidate.matched.includes(s) ? "bg-primary-soft text-accent-foreground" : ""}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Interests</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(selectedCandidate.interests ?? []).map((i) => (
                    <Badge key={i} variant="outline" className="border-border">
                      {i}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Resume */}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Resume</h3>
                {selectedCandidate.has_resume ? (
                  selectedCandidate.resume_path ? (
                    <div className="mt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 border-primary/20 hover:border-primary/50 text-primary bg-primary/5"
                        disabled={downloading}
                        onClick={async () => {
                          setDownloading(true);
                          try {
                            const { data, error } = await supabase.storage.from("resumes").createSignedUrl(selectedCandidate.resume_path!, 60);
                            if (error || !data) {
                              toast.error("Could not open resume");
                              return;
                            }
                            window.open(data.signedUrl, "_blank", "noopener");
                          } finally {
                            setDownloading(false);
                          }
                        }}
                      >
                        {downloading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
                        View/Download Resume
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic bg-muted p-2.5 rounded-lg border border-border mt-1">
                      📄 Resume is on file (will be accessible once the student applies to this posting).
                    </p>
                  )
                ) : (
                  <p className="text-xs text-muted-foreground italic mt-1">No resume uploaded by this student.</p>
                )}
              </div>

              {/* Actions Section for Applicants */}
              {selectedCandidate.application_status && (
                <div className="border-t border-border pt-4 space-y-4 mt-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1">
                    <Sparkles className="size-4 text-primary fill-primary/10" />
                    Application Management & Notifications
                  </h3>
                  
                  {/* Status Dropdown */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="status-select" className="text-xs font-semibold text-muted-foreground uppercase">Application Stage</Label>
                      <Select
                        value={statusVal}
                        onValueChange={setStatusVal}
                      >
                        <SelectTrigger id="status-select" className="bg-surface border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border">
                          {APP_STATUSES.filter(s => s !== "saved").map((s) => (
                            <SelectItem key={s} value={s} className="hover:bg-primary/5 cursor-pointer">
                              {STATUS_LABEL[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notification Message Textarea */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase">Send Message to Candidate</Label>
                    <Textarea
                      id="message"
                      placeholder="Write an interview invite, status update, or internship feedback message..."
                      className="min-h-[100px] bg-surface border-border focus:border-primary"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                  </div>

                  {/* Save/Update Button */}
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCandidate(null);
                        setMessageText("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="gap-1.5"
                      disabled={updateApp.isPending}
                      onClick={() => {
                        updateApp.mutate({
                          candidateId: selectedCandidate.user_id,
                          status: statusVal as AppStatus,
                          notes: messageText || null
                        }, {
                          onSuccess: () => {
                            toast.success("Application stage updated & email notification dispatched!");
                            setSelectedCandidate(null);
                            setMessageText("");
                          },
                          onError: (e) => {
                            toast.error(e instanceof Error ? e.message : "Failed to update application");
                          }
                        });
                      }}
                    >
                      {updateApp.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                      Update & Send Notification
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
