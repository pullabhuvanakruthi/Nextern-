import { createFileRoute, Navigate, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AssistantWidget } from "@/components/AssistantWidget";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useStudentProfile } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthedShell,
});

/** Students land in the guided profile builder before any match-driven screen. */
function AuthedShell() {
  const { pathname } = useLocation();
  const { role, loading } = useAuth();
  const { data: profile, isLoading } = useStudentProfile();

  const isRecruiter = role === "recruiter";
  const exempt = pathname.startsWith("/onboarding");

  if (!isRecruiter && (loading || isLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isRecruiter && !exempt && profile && !profile.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <>
      <Outlet />
      {!isRecruiter && !exempt && <AssistantWidget />}
    </>
  );
}
