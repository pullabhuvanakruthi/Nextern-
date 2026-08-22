import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChoiceChips({
  options,
  value,
  onChange,
  multiple = false,
  allowOther = false,
  otherPlaceholder = "Type your own",
}: {
  options: readonly string[];
  value: string[] | string;
  onChange: (next: never) => void;
  multiple?: boolean;
  allowOther?: boolean;
  otherPlaceholder?: string;
}) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherDraft, setOtherDraft] = useState("");
  const custom = selected.filter((s) => !options.includes(s));

  const toggle = (option: string) => {
    if (multiple) {
      const next = selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option];
      (onChange as (v: string[]) => void)(next);
    } else {
      (onChange as (v: string) => void)(selected[0] === option ? "" : option);
    }
  };

  const addOther = () => {
    const t = otherDraft.trim();
    if (!t) return;
    if (multiple) {
      if (!selected.some((s) => s.toLowerCase() === t.toLowerCase())) {
        (onChange as (v: string[]) => void)([...selected, t]);
      }
    } else {
      (onChange as (v: string) => void)(t);
    }
    setOtherDraft("");
    setOtherOpen(false);
  };

  const chip = (option: string, active: boolean) => (
    <button
      key={option}
      type="button"
      onClick={() => toggle(option)}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:bg-muted",
      )}
    >
      {option}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => chip(option, selected.includes(option)))}
        {custom.map((option) => chip(option, true))}
        {allowOther && (
          <button
            type="button"
            onClick={() => setOtherOpen((o) => !o)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              otherOpen
                ? "border-primary bg-primary-soft"
                : "border-dashed border-border bg-card hover:bg-muted",
            )}
          >
            + Other
          </button>
        )}
      </div>

      {allowOther && otherOpen && (
        <div className="flex gap-2">
          <Input
            value={otherDraft}
            onChange={(e) => setOtherDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addOther();
              }
            }}
            placeholder={otherPlaceholder}
            className="max-w-xs"
          />
          <Button type="button" variant="outline" onClick={addOther}>
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
