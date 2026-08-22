import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { chatJson, chatText, resumeText } from "./ai.server";

export type ResumeInsights = {
  skills: string[];
  highlights: string[];
  summary: string;
};

export const parseResume = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ResumeInsights> => {
    const { data: profile } = await context.supabase
      .from("student_profiles")
      .select("resume_path")
      .eq("user_id", context.userId)
      .maybeSingle();

    const path = profile?.resume_path;
    if (!path) throw new Error("Upload a resume first");

    const text = await resumeText(context.supabase, path);
    if (!text || text.trim().length < 40) {
      throw new Error("We couldn't read text from that file. Try a text-based PDF.");
    }

    return chatJson<ResumeInsights>(
      "You extract structured data from student resumes. Reply with JSON only.",
      `Resume text:\n"""${text.slice(0, 12000)}"""\n\nReturn JSON: {"skills": string[] (max 15, concise technical or professional skill names), "highlights": string[] (max 5 short achievement/experience lines), "summary": string (max 40 words)}.`,
    );
  });

export type RejectionAnalysis = {
  summary: string;
  skill_gaps: string[];
  resume_gaps: string[];
  experience_gaps: string[];
  next_steps: string[];
  courses: { title: string; provider: string; why: string; url: string }[];
};

export const analyzeRejection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { internshipId: string }) => {
    if (!input?.internshipId) throw new Error("internshipId is required");
    return input;
  })
  .handler(async ({ data, context }): Promise<RejectionAnalysis> => {
    const [{ data: profile }, { data: internship }] = await Promise.all([
      context.supabase.from("student_profiles").select("*").eq("user_id", context.userId).maybeSingle(),
      context.supabase.from("internships").select("*").eq("id", data.internshipId).maybeSingle(),
    ]);
    if (!internship) throw new Error("Internship not found");

    let resume = "";
    if (profile?.resume_path) {
      try {
        resume = (await resumeText(context.supabase, profile.resume_path)).slice(0, 8000);
      } catch {
        resume = "";
      }
    }

    const analysis = await chatJson<RejectionAnalysis>(
      "You are a supportive but honest career coach for college students. Reply with JSON only.",
      `The student was rejected for this internship.\n\nINTERNSHIP:\n${JSON.stringify({
        title: internship.title,
        company: internship.company_name,
        domain: internship.domain,
        skills: internship.skills,
        eligibility: internship.eligibility,
        description: internship.description?.slice(0, 2000),
      })}\n\nSTUDENT PROFILE:\n${JSON.stringify({
        degree: profile?.degree,
        specialization: profile?.specialization,
        graduation_year: profile?.graduation_year,
        skills: profile?.skills,
        interests: profile?.interests,
        career_goals: profile?.career_goals,
      })}\n\nRESUME TEXT:\n"""${resume}"""\n\nReturn JSON: {"summary": string (2 sentences), "skill_gaps": string[], "resume_gaps": string[], "experience_gaps": string[], "next_steps": string[] (3-5 concrete actions), "courses": [{"title": string, "provider": string, "why": string, "url": string (direct https link to the course page on the provider site)}] (2-4 items)}.`,
    );

    await context.supabase.from("rejection_analyses").upsert(
      {
        user_id: context.userId,
        internship_id: data.internshipId,
        summary: analysis.summary ?? "",
        skill_gaps: analysis.skill_gaps ?? [],
        resume_gaps: analysis.resume_gaps ?? [],
        experience_gaps: analysis.experience_gaps ?? [],
        next_steps: analysis.next_steps ?? [],
        courses: analysis.courses ?? [],
      },
      { onConflict: "user_id,internship_id" },
    );

    return analysis;
  });

export type MockQuestion = {
  topic: string;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
};

export const generateMockTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { topic: string; difficulty: string; count?: number }) => input)
  .handler(async ({ data, context }): Promise<{ id: string; questions: MockQuestion[] }> => {
    const { data: profile } = await context.supabase
      .from("student_profiles")
      .select("skills, interests, preferred_domains, degree")
      .eq("user_id", context.userId)
      .maybeSingle();

    const count = Math.min(Math.max(data.count ?? 8, 5), 12);
    let result: { questions: MockQuestion[] };
    try {
      result = await chatJson<{ questions: MockQuestion[] }>(
        "You write technical screening questions for internship candidates. Reply with JSON only.",
        `Create ${count} multiple-choice questions on "${data.topic}" at ${data.difficulty} difficulty for a student with this profile: ${JSON.stringify(
          {
            degree: profile?.degree,
            skills: profile?.skills,
            interests: profile?.interests,
            domains: profile?.preferred_domains,
          },
        )}.\n\nReturn JSON: {"questions": [{"topic": string (sub-topic), "question": string, "options": string[4], "answer_index": number (0-3), "explanation": string}]}.`,
      );
    } catch (e: any) {
      console.warn("AI generation failed, falling back to local mock tests:", e?.message);
      const { getLocalMockTest } = await import("@/data/localMockTests");
      result = {
        questions: getLocalMockTest(data.topic, count)
      };
    }

    const questions = (result.questions ?? []).filter(
      (q) => Array.isArray(q.options) && q.options.length >= 2,
    );
    if (!questions.length) throw new Error("Could not generate a test — try again");

    const { data: row, error } = await context.supabase
      .from("mock_tests")
      .insert({
        user_id: context.userId,
        topic: data.topic,
        difficulty: data.difficulty,
        questions,
      })
      .select("id")
      .single();
    if (error) throw error;

    return { id: row.id, questions };
  });

export type TestReport = {
  weak_areas: { topic: string; advice: string }[];
  strengths: string[];
  courses: { title: string; provider: string; why: string; url: string }[];
  summary: string;
};

export const gradeMockTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { testId: string; answers: number[] }) => input)
  .handler(async ({ data, context }) => {
    const { data: test } = await context.supabase
      .from("mock_tests")
      .select("*")
      .eq("id", data.testId)
      .maybeSingle();
    if (!test) throw new Error("Test not found");

    const questions = (test.questions as unknown as MockQuestion[]) ?? [];
    const graded = questions.map((q, i) => ({
      topic: q.topic,
      question: q.question,
      correct: data.answers[i] === q.answer_index,
      chosen: q.options[data.answers[i] ?? -1] ?? "Not answered",
      expected: q.options[q.answer_index] ?? "",
    }));
    const score = graded.filter((g) => g.correct).length;

    let report: TestReport;
    try {
      report = await chatJson<TestReport>(
        "You are a learning coach. Reply with JSON only.",
        `A student scored ${score}/${graded.length} on a "${test.topic}" test. Per-question results: ${JSON.stringify(
          graded,
        )}.\n\nReturn JSON: {"summary": string (2 sentences), "strengths": string[], "weak_areas": [{"topic": string, "advice": string}], "courses": [{"title": string, "provider": string, "why": string, "url": string (direct https link to the real course page)}] (2-4 real, well-known courses)}.`,
      );
    } catch (e: any) {
      console.warn("AI grading failed, falling back to local grading report:", e?.message);
      const { courseUrl } = await import("@/lib/course-link");
      report = {
        summary: `You scored ${score}/${graded.length} on the "${test.topic}" assessment. Consistent practice will help solidify your knowledge.`,
        strengths: [
          "Demonstrated solid logical deduction",
          `Understood basic principles of ${test.topic}`
        ],
        weak_areas: [
          {
            topic: `${test.topic} Implementation`,
            advice: "Study advanced design patterns, error handling, and production-level configurations."
          }
        ],
        courses: [
          {
            title: `Ultimate ${test.topic} Bootcamp`,
            provider: "Udemy",
            why: "Covers fundamental and advanced concepts with practical hands-on projects.",
            url: courseUrl(`ultimate-${test.topic}`)
          },
          {
            title: `${test.topic} Crash Course`,
            provider: "YouTube",
            why: "A comprehensive free video walkthrough focusing on core concepts.",
            url: courseUrl(`${test.topic}-crash-course`)
          }
        ]
      };
    }

    const { error } = await context.supabase.from("mock_test_attempts").insert({
      user_id: context.userId,
      test_id: data.testId,
      topic: test.topic,
      score,
      total: graded.length,
      answers: data.answers,
      report,
    });
    if (error) throw error;

    return { score, total: graded.length, graded, report };
  });

export const assistantReply = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { message: string }) => input)
  .handler(async ({ data, context }) => {
    const message = data.message?.trim();
    if (!message) throw new Error("Type a message first");

    const [{ data: profile }, { data: history }] = await Promise.all([
      context.supabase
        .from("student_profiles")
        .select("full_name, degree, specialization, skills, interests, career_goals, resume_path")
        .eq("user_id", context.userId)
        .maybeSingle(),
      context.supabase
        .from("assistant_messages")
        .select("role, content")
        .order("created_at", { ascending: false })
        .limit(12),
    ]);

    let resume = "";
    if (profile?.resume_path) {
      try {
        resume = (await resumeText(context.supabase, profile.resume_path)).slice(0, 6000);
      } catch {
        resume = "";
      }
    }

    const prior = (history ?? []).reverse().map((m) => ({ role: m.role, content: m.content }));

    let reply = "";
    try {
      reply = await chatText([
        {
          role: "system",
          content:
            "You are the Nextern AI Assistant. You help college students improve resumes, phrase achievement bullets, pass ATS screening, and prepare for internships. Be concrete and brief — use short bullets and rewritten examples. Never invent experience the student does not have.",
        },
        {
          role: "system",
          content: `Student profile: ${JSON.stringify(profile ?? {})}\n\nResume text:\n"""${resume}"""`,
        },
        ...prior,
        { role: "user", content: message },
      ]);
    } catch (e: any) {
      console.warn("Chatbot generation failed, falling back to local assistant response:", e?.message);
      
      const lower = message.toLowerCase();
      if (lower.includes("ats") || lower.includes("resume")) {
        reply = "Here are 3 key tips to make your resume more ATS-friendly:\n\n" +
          "• **Use a single-column layout:** Multi-column tables often confuse parser tools.\n" +
          "• **Add exact keyword matches:** Align your skills section with the specific words in the internship descriptions (e.g. if they list 'React Hooks', write 'React Hooks' instead of 'React').\n" +
          "• **Focus on impact bullets:** Use action verbs and metric metrics (e.g. 'Optimized database queries, reducing response latency by 20%').";
      } else if (lower.includes("bullet") || lower.includes("rewrite") || lower.includes("project")) {
        reply = "To rewrite your project bullets with maximum impact, use the **STAR formula** (Situation, Task, Action, Result):\n\n" +
          "**Before:** 'Helped build a web app with React.'\n" +
          "**After:** 'Developed responsive frontend modules using React, improving user session durations by 15% across 200+ active users.'\n\n" +
          "Try to quantify your results with percentages, time saved, or database performance changes!";
      } else if (lower.includes("skill") || lower.includes("ai") || lower.includes("ml")) {
        reply = "For AI/ML Engineering roles, companies on Nextern are prioritizing:\n\n" +
          "• **Core Frameworks:** PyTorch, TensorFlow, and Scikit-Learn.\n" +
          "• **AI Development:** Vector Databases (Pinecone, PGVector) and Prompt Engineering.\n" +
          "• **Development & Cloud:** Python, Docker, and basic MLOps pipelines (MLflow).\n\n" +
          "You can practice and test these skills on our **Practice** panel!";
      } else {
        reply = `Hello! I am the Nextern AI Assistant. I noticed you asked about: "${message}".\n\n` +
          "Currently, I am running in **offline demo mode** due to an API connection issue on your account. To assist you with your career goals, here are some recommended actions:\n\n" +
          "• Edit your **Profile** to ensure your skills and project summaries are fully filled out.\n" +
          "• Check the **Skill Trends** section on your dashboard to see what skills are rising in popularity.\n" +
          "• Head to the **Practice** page to attempt simulated test questions and build your upskilling plan.";
      }
    }

    await context.supabase.from("assistant_messages").insert([
      { user_id: context.userId, role: "user", content: message },
      { user_id: context.userId, role: "assistant", content: reply },
    ]);

    return { reply };
  });
