import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Internship } from "@/lib/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPublicInternships = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("internships")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) return [] as Internship[];
  return (data ?? []) as unknown as Internship[];
});

export const getPublicInternship = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data: input }) => {
    const { data, error } = await publicClient()
      .from("internships")
      .select("*")
      .eq("is_published", true)
      .eq("id", input.id)
      .maybeSingle();
    if (error) return null;
    return (data ?? null) as unknown as Internship | null;
  });
