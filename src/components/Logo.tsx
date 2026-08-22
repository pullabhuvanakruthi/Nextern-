import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <span className="gradient-brand grid size-8 place-items-center rounded-lg text-sm font-extrabold text-primary-foreground shadow-[var(--shadow-card)]">
        N
      </span>
      <span className="flex flex-col leading-none">
        <span className="gradient-text text-base font-extrabold tracking-tight">Nextern</span>

        {!compact && (
          <span className="mt-0.5 text-[11px] font-medium text-muted-foreground">
            Your Skills. Your Opportunity.
          </span>
        )}
      </span>
    </Link>
  );
}
