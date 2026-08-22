import { Bot, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAssistantMessages, useAssistantSend } from "@/lib/ai-queries";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "Make my resume more ATS-friendly",
  "Rewrite my project bullets with impact",
  "What skills should I add for AI/ML roles?",
];

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { data: messages = [] } = useAssistantMessages();
  const send = useAssistantSend();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, send.isPending, open]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || send.isPending) return;
    setInput("");
    send.mutate(value, {
      onError: (e) => toast.error(e instanceof Error ? e.message : "Something went wrong"),
    });
  };

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 h-12 gap-2 rounded-full px-5 shadow-lg"
        >
          <Bot className="size-5" /> AI Assistant
        </Button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[32rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Nextern AI Assistant</p>
              <p className="text-xs text-muted-foreground">Resume & ATS coaching</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="size-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Ask me to tighten your resume, fix ATS issues, or prep for an interview.
                </p>
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => submit(p)}
                    className="block w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm",
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.content}
              </div>
            ))}
            {send.isPending && (
              <div className="w-fit rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-end gap-2 border-t border-border p-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              placeholder="Ask about your resume…"
              rows={1}
              className="max-h-28 min-h-10 resize-none"
            />
            <Button size="icon" onClick={() => submit(input)} disabled={send.isPending} aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
