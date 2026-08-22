export type CourseRec = { title: string; provider: string; why: string; url?: string | null };

/** Direct link to a recommended course; falls back to a provider-scoped web search. */
export function courseUrl(course: CourseRec): string {
  const url = (course.url ?? "").trim();
  if (/^https?:\/\//i.test(url)) return url;
  const q = encodeURIComponent(`${course.title} ${course.provider} course`);
  return `https://www.google.com/search?q=${q}`;
}
