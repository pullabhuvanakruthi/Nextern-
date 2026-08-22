import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { OnboardingFlow } from "@/components/OnboardingFlow";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Build your profile — Nextern" },
      {
        name: "description",
        content:
          "Tell Nextern about your education, skills, interests and preferences to unlock ranked internship matches.",
      },
      { property: "og:title", content: "Build your profile — Nextern" },
      {
        property: "og:description",
        content: "A four-step profile builder that powers your ranked internship matches.",
      },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold">Build your profile</h1>
          <p className="mt-2 text-muted-foreground">
            The more you share, the sharper your match scores get.
          </p>
        </div>
        <OnboardingFlow />
      </main>
    </div>
  );
}
