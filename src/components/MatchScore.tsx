import { cn } from "@/lib/utils";

export function MatchScore({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 80
      ? "bg-primary text-primary-foreground"
      : score >= 60
        ? "bg-accent text-accent-foreground"
        : "bg-muted text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
        tone,
        className,
      )}
    >
      Match {score}%
    </span>
  );
}
