import type { SupabaseClient } from "@supabase/supabase-js";

const MODEL = "openai/gpt-5.6-sol";
const ENDPOINT = "https://ai.gateway.lovable.dev/v1/chat/completions";

type Msg = { role: string; content: string };

function gatewayError(status: number, body: string): Error {
  if (status === 429) return new Error("The AI assistant is busy right now — try again in a moment.");
  if (status === 402) return new Error("AI credits are exhausted for this workspace.");
  if (status === 403) return new Error("AI access is blocked for this workspace.");
  return new Error(`AI request failed (${status}): ${body.slice(0, 200)}`);
}

export async function chatText(messages: Msg[]): Promise<string> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const openaiKey = process.env["OPENAI_API_KEY"];
  const geminiKey = process.env["GEMINI_API_KEY"];

  if (!lovableKey && !openaiKey && !geminiKey) {
    throw new Error(
      "LOVABLE_API_KEY is not configured. Please add LOVABLE_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to your .env file to enable AI features."
    );
  }

  let endpoint = ENDPOINT;
  let model = MODEL;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // NATIVE GEMINI API CALL (Bypasses buggy OpenAI compatibility layer for new AQ.Ab keys)
  if (geminiKey && !lovableKey) {
    const systemMsg = messages.find(m => m.role === "system");
    const otherMsgs = messages.filter(m => m.role !== "system");

    const contents = otherMsgs.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const body: any = { contents };

    if (systemMsg) {
      body.systemInstruction = {
        parts: [{ text: systemMsg.content }]
      };
    }

    // Force json output if we detect a json prompt requirement
    const isJson = messages.some(m => m.content.toLowerCase().includes("json"));
    if (isJson) {
      body.generationConfig = {
        responseMimeType: "application/json"
      };
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Gemini API failed (${res.status}): ${errorBody.slice(0, 200)}`);
    }

    const json = await res.json() as any;
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!text.trim()) throw new Error("The assistant returned an empty response — try rephrasing.");
    return text;
  }

  // OPENAI & LOVABLE CALLS

  if (lovableKey) {
    headers["Authorization"] = `Bearer ${lovableKey}`;
    headers["Lovable-API-Key"] = lovableKey;
    headers["X-Lovable-AIG-SDK"] = "fetch";
  } else if (openaiKey) {
    endpoint = "https://api.openai.com/v1/chat/completions";
    model = "gpt-4o-mini";
    headers["Authorization"] = `Bearer ${openaiKey}`;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    if (lovableKey) {
      throw gatewayError(res.status, errorBody);
    }
    throw new Error(`AI request failed (${res.status}): ${errorBody.slice(0, 200)}`);
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const text = json.choices?.[0]?.message?.content ?? "";
  if (!text.trim()) throw new Error("The assistant returned an empty response — try rephrasing.");
  return text;
}

export async function chatJson<T>(system: string, user: string): Promise<T> {
  const text = await chatText([
    { role: "system", content: `${system} Always answer with valid JSON and nothing else.` },
    { role: "user", content: user },
  ]);

  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const slice = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;

  try {
    return JSON.parse(slice) as T;
  } catch {
    throw new Error("The AI response could not be read — please try again.");
  }
}

export async function resumeText(
  supabase: SupabaseClient<never>,
  path: string,
): Promise<string> {
  const { data, error } = await supabase.storage.from("resumes").download(path);
  if (error || !data) throw new Error("Could not read your resume file");

  const buffer = new Uint8Array(await data.arrayBuffer());

  if (path.toLowerCase().endsWith(".pdf")) {
    const { extractText, getDocumentProxy } = await import("unpdf");
    const pdf = await getDocumentProxy(buffer);
    const { text } = await extractText(pdf, { mergePages: true });
    return Array.isArray(text) ? (text as string[]).join("\n") : String(text);
  }

  // DOC/DOCX: pull readable ASCII runs out of the container as a best effort.
  const raw = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\x20-\x7E\n]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
