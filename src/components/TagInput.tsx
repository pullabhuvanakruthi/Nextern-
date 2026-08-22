import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "Type and press Enter",
  allowOther = false,
  otherPlaceholder = "Type your own",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  allowOther?: boolean;
  otherPlaceholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherDraft, setOtherDraft] = useState("");


  const add = (tag: string) => {
    const t = tag.trim();
    if (!t) return;
    if (value.some((v) => v.toLowerCase() === t.toLowerCase())) return;
    onChange([...value, t]);
    setDraft("");
  };

  const filtered = useMemo(() => {
    const q = draft.trim().toLowerCase();
    return suggestions
      .filter((s) => !value.some((v) => v.toLowerCase() === s.toLowerCase()))
      .filter((s) => (q ? s.toLowerCase().includes(q) : true))
      .slice(0, 10);
  }, [draft, suggestions, value]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-lg border border-input bg-card p-2">
        {value.map((tag) => (
          <Badge key={tag} className="gap-1 bg-primary-soft py-1 text-accent-foreground">
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(value.filter((v) => v !== tag))}
              className="rounded-full transition-opacity hover:opacity-70"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          placeholder={placeholder}
          className="h-8 min-w-40 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
        />
      </div>

      {(filtered.length > 0 || allowOther) && (
        <div className="flex flex-wrap gap-2">
          {filtered.map((s) => (
            <Button
              key={s}
              type="button"
              variant="outline"
              size="sm"
              className="h-7 rounded-full text-xs font-medium"
              onClick={() => add(s)}
            >
              + {s}
            </Button>
          ))}
          {allowOther && (
            <Button
              type="button"
              variant={otherOpen ? "secondary" : "outline"}
              size="sm"
              className="h-7 rounded-full border-dashed text-xs font-medium"
              onClick={() => setOtherOpen((o) => !o)}
            >
              + Other
            </Button>
          )}
        </div>
      )}

      {allowOther && otherOpen && (
        <div className="flex gap-2">
          <Input
            value={otherDraft}
            onChange={(e) => setOtherDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add(otherDraft);
                setOtherDraft("");
                setOtherOpen(false);
              }
            }}
            placeholder={otherPlaceholder}
            className="max-w-xs"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              add(otherDraft);
              setOtherDraft("");
              setOtherOpen(false);
            }}
          >
            Add
          </Button>
        </div>
      )}

    </div>
  );
}
