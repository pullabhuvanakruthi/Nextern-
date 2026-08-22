import { FileText, Loader2, Sparkles, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useParseResume } from "@/lib/ai-queries";
import { useUpdateStudentProfile } from "@/lib/queries";
import type { StudentProfile } from "@/lib/types";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = [".pdf", ".doc", ".docx"];

export function ResumeUpload({ profile }: { profile: StudentProfile }) {
  const { user } = useAuth();
  const update = useUpdateStudentProfile();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const parse = useParseResume();

  const extract = () => {
    parse.mutate(undefined, {
      onSuccess: async (insights) => {
        const merged = Array.from(
          new Set([...(profile.skills ?? []), ...(insights.skills ?? [])].map((s) => s.trim()).filter(Boolean)),
        );
        await update.mutateAsync({ skills: merged });
        toast.success(`Added ${merged.length - (profile.skills?.length ?? 0)} skills from your resume`);
      },
      onError: (e) => toast.error(e instanceof Error ? e.message : "Could not read your resume"),
    });
  };

  const handleFile = async (file: File) => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED.includes(ext)) {
      toast.error("Upload a PDF, DOC or DOCX file");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Resume must be under 5 MB");
      return;
    }
    setBusy(true);
    try {
      const path = `${user!.id}/resume${ext}`;
      const { error } = await supabase.storage.from("resumes").upload(path, file, { upsert: true });
      if (error) throw error;
      await update.mutateAsync({
        resume_path: path,
        resume_name: file.name,
        resume_uploaded_at: new Date().toISOString(),
      });
      toast.success("Resume uploaded — it now feeds your match scores");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = async () => {
    if (!profile.resume_path) return;
    setBusy(true);
    try {
      await supabase.storage.from("resumes").remove([profile.resume_path]);
      await update.mutateAsync({ resume_path: null, resume_name: null, resume_uploaded_at: null });
      toast.success("Resume removed");
    } finally {
      setBusy(false);
    }
  };

  const download = async () => {
    if (!profile.resume_path) return;
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(profile.resume_path, 60);
    if (error || !data) {
      toast.error("Could not open resume");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  };

  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-5">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      {profile.resume_path ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{profile.resume_name ?? "Resume"}</p>
              <p className="text-xs text-muted-foreground">
                Uploaded{" "}
                {profile.resume_uploaded_at
                  ? new Date(profile.resume_uploaded_at).toLocaleDateString()
                  : "recently"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={download}>
              View
            </Button>
            <Button variant="outline" size="sm" onClick={extract} disabled={parse.isPending}>
              {parse.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              Extract skills
            </Button>
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={busy}>
              Replace
            </Button>
            <Button variant="ghost" size="icon" aria-label="Remove resume" onClick={remove} disabled={busy}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Upload your resume (optional)</p>
            <p className="text-sm text-muted-foreground">
              PDF, DOC or DOCX up to 5 MB. Stored privately and only visible to you.
            </p>
          </div>
          <Button onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload resume
          </Button>
        </div>
      )}
    </div>
  );
}
