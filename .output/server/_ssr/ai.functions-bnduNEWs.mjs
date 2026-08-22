import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BpbeoxIM.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-bnduNEWs.js
var MODEL = "openai/gpt-5.6-sol";
var ENDPOINT = "https://ai.gateway.lovable.dev/v1/chat/completions";
function gatewayError(status, body) {
	if (status === 429) return /* @__PURE__ */ new Error("The AI assistant is busy right now — try again in a moment.");
	if (status === 402) return /* @__PURE__ */ new Error("AI credits are exhausted for this workspace.");
	if (status === 403) return /* @__PURE__ */ new Error("AI access is blocked for this workspace.");
	return /* @__PURE__ */ new Error(`AI request failed (${status}): ${body.slice(0, 200)}`);
}
async function chatText(messages) {
	const lovableKey = processModule.env["LOVABLE_API_KEY"];
	const openaiKey = processModule.env["OPENAI_API_KEY"];
	const geminiKey = processModule.env["GEMINI_API_KEY"];
	if (!lovableKey && !openaiKey && !geminiKey) throw new Error("LOVABLE_API_KEY is not configured. Please add LOVABLE_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to your .env file to enable AI features.");
	let endpoint = ENDPOINT;
	let model = MODEL;
	const headers = { "Content-Type": "application/json" };
	if (geminiKey && !lovableKey) {
		const systemMsg = messages.find((m) => m.role === "system");
		const body = { contents: messages.filter((m) => m.role !== "system").map((m) => ({
			role: m.role === "assistant" ? "model" : "user",
			parts: [{ text: m.content }]
		})) };
		if (systemMsg) body.systemInstruction = { parts: [{ text: systemMsg.content }] };
		if (messages.some((m) => m.content.toLowerCase().includes("json"))) body.generationConfig = { responseMimeType: "application/json" };
		const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (!res.ok) {
			const errorBody = await res.text();
			throw new Error(`Gemini API failed (${res.status}): ${errorBody.slice(0, 200)}`);
		}
		const text = (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? "";
		if (!text.trim()) throw new Error("The assistant returned an empty response — try rephrasing.");
		return text;
	}
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
		body: JSON.stringify({
			model,
			messages
		})
	});
	if (!res.ok) {
		const errorBody = await res.text();
		if (lovableKey) throw gatewayError(res.status, errorBody);
		throw new Error(`AI request failed (${res.status}): ${errorBody.slice(0, 200)}`);
	}
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	if (!text.trim()) throw new Error("The assistant returned an empty response — try rephrasing.");
	return text;
}
async function chatJson(system, user) {
	const cleaned = (await chatText([{
		role: "system",
		content: `${system} Always answer with valid JSON and nothing else.`
	}, {
		role: "user",
		content: user
	}])).replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
	const start = cleaned.indexOf("{");
	const end = cleaned.lastIndexOf("}");
	const slice = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;
	try {
		return JSON.parse(slice);
	} catch {
		throw new Error("The AI response could not be read — please try again.");
	}
}
async function resumeText(supabase, path) {
	const { data, error } = await supabase.storage.from("resumes").download(path);
	if (error || !data) throw new Error("Could not read your resume file");
	const buffer = new Uint8Array(await data.arrayBuffer());
	if (path.toLowerCase().endsWith(".pdf")) {
		const { extractText, getDocumentProxy } = await import("../_libs/unpdf.mjs").then((n) => n.t);
		const { text } = await extractText(await getDocumentProxy(buffer), { mergePages: true });
		return Array.isArray(text) ? text.join("\n") : String(text);
	}
	return new TextDecoder("utf-8", { fatal: false }).decode(buffer).replace(/<[^>]+>/g, " ").replace(/[^\x20-\x7E\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
}
var parseResume_createServerFn_handler = createServerRpc({
	id: "b4549bad405a54a085b9a8066c3d19eeceb6d03566868c42d2f300117cb6b6f6",
	name: "parseResume",
	filename: "src/lib/ai.functions.ts"
}, (opts) => parseResume.__executeServer(opts));
var parseResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(parseResume_createServerFn_handler, async ({ context }) => {
	const { data: profile } = await context.supabase.from("student_profiles").select("resume_path").eq("user_id", context.userId).maybeSingle();
	const path = profile?.resume_path;
	if (!path) throw new Error("Upload a resume first");
	const text = await resumeText(context.supabase, path);
	if (!text || text.trim().length < 40) throw new Error("We couldn't read text from that file. Try a text-based PDF.");
	return chatJson("You extract structured data from student resumes. Reply with JSON only.", `Resume text:\n"""${text.slice(0, 12e3)}"""\n\nReturn JSON: {"skills": string[] (max 15, concise technical or professional skill names), "highlights": string[] (max 5 short achievement/experience lines), "summary": string (max 40 words)}.`);
});
var analyzeRejection_createServerFn_handler = createServerRpc({
	id: "a5a2f0333b657a09a3525da60206ef9daac94dc75c11e2f5782440e03ed058e9",
	name: "analyzeRejection",
	filename: "src/lib/ai.functions.ts"
}, (opts) => analyzeRejection.__executeServer(opts));
var analyzeRejection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!input?.internshipId) throw new Error("internshipId is required");
	return input;
}).handler(analyzeRejection_createServerFn_handler, async ({ data, context }) => {
	const [{ data: profile }, { data: internship }] = await Promise.all([context.supabase.from("student_profiles").select("*").eq("user_id", context.userId).maybeSingle(), context.supabase.from("internships").select("*").eq("id", data.internshipId).maybeSingle()]);
	if (!internship) throw new Error("Internship not found");
	let resume = "";
	if (profile?.resume_path) try {
		resume = (await resumeText(context.supabase, profile.resume_path)).slice(0, 8e3);
	} catch {
		resume = "";
	}
	const analysis = await chatJson("You are a supportive but honest career coach for college students. Reply with JSON only.", `The student was rejected for this internship.\n\nINTERNSHIP:\n${JSON.stringify({
		title: internship.title,
		company: internship.company_name,
		domain: internship.domain,
		skills: internship.skills,
		eligibility: internship.eligibility,
		description: internship.description?.slice(0, 2e3)
	})}\n\nSTUDENT PROFILE:\n${JSON.stringify({
		degree: profile?.degree,
		specialization: profile?.specialization,
		graduation_year: profile?.graduation_year,
		skills: profile?.skills,
		interests: profile?.interests,
		career_goals: profile?.career_goals
	})}\n\nRESUME TEXT:\n"""${resume}"""\n\nReturn JSON: {"summary": string (2 sentences), "skill_gaps": string[], "resume_gaps": string[], "experience_gaps": string[], "next_steps": string[] (3-5 concrete actions), "courses": [{"title": string, "provider": string, "why": string, "url": string (direct https link to the course page on the provider site)}] (2-4 items)}.`);
	await context.supabase.from("rejection_analyses").upsert({
		user_id: context.userId,
		internship_id: data.internshipId,
		summary: analysis.summary ?? "",
		skill_gaps: analysis.skill_gaps ?? [],
		resume_gaps: analysis.resume_gaps ?? [],
		experience_gaps: analysis.experience_gaps ?? [],
		next_steps: analysis.next_steps ?? [],
		courses: analysis.courses ?? []
	}, { onConflict: "user_id,internship_id" });
	return analysis;
});
var generateMockTest_createServerFn_handler = createServerRpc({
	id: "8dab7fc46d18699af7ffb27f96dac640c7b9c4f0854f14932df030333644a697",
	name: "generateMockTest",
	filename: "src/lib/ai.functions.ts"
}, (opts) => generateMockTest.__executeServer(opts));
var generateMockTest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(generateMockTest_createServerFn_handler, async ({ data, context }) => {
	const { data: profile } = await context.supabase.from("student_profiles").select("skills, interests, preferred_domains, degree").eq("user_id", context.userId).maybeSingle();
	const count = Math.min(Math.max(data.count ?? 8, 5), 12);
	let result;
	try {
		result = await chatJson("You write technical screening questions for internship candidates. Reply with JSON only.", `Create ${count} multiple-choice questions on "${data.topic}" at ${data.difficulty} difficulty for a student with this profile: ${JSON.stringify({
			degree: profile?.degree,
			skills: profile?.skills,
			interests: profile?.interests,
			domains: profile?.preferred_domains
		})}.\n\nReturn JSON: {"questions": [{"topic": string (sub-topic), "question": string, "options": string[4], "answer_index": number (0-3), "explanation": string}]}.`);
	} catch (e) {
		console.warn("AI generation failed, falling back to local mock tests:", e?.message);
		const { getLocalMockTest } = await import("./localMockTests-CB3m7_PH.mjs");
		result = { questions: getLocalMockTest(data.topic, count) };
	}
	const questions = (result.questions ?? []).filter((q) => Array.isArray(q.options) && q.options.length >= 2);
	if (!questions.length) throw new Error("Could not generate a test — try again");
	const { data: row, error } = await context.supabase.from("mock_tests").insert({
		user_id: context.userId,
		topic: data.topic,
		difficulty: data.difficulty,
		questions
	}).select("id").single();
	if (error) throw error;
	return {
		id: row.id,
		questions
	};
});
var gradeMockTest_createServerFn_handler = createServerRpc({
	id: "b440529cc37d98b79b23e495fc796f346de7cbccefdc5a8dc5b06efbb79ca2c7",
	name: "gradeMockTest",
	filename: "src/lib/ai.functions.ts"
}, (opts) => gradeMockTest.__executeServer(opts));
var gradeMockTest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(gradeMockTest_createServerFn_handler, async ({ data, context }) => {
	const { data: test } = await context.supabase.from("mock_tests").select("*").eq("id", data.testId).maybeSingle();
	if (!test) throw new Error("Test not found");
	const graded = (test.questions ?? []).map((q, i) => ({
		topic: q.topic,
		question: q.question,
		correct: data.answers[i] === q.answer_index,
		chosen: q.options[data.answers[i] ?? -1] ?? "Not answered",
		expected: q.options[q.answer_index] ?? ""
	}));
	const score = graded.filter((g) => g.correct).length;
	let report;
	try {
		report = await chatJson("You are a learning coach. Reply with JSON only.", `A student scored ${score}/${graded.length} on a "${test.topic}" test. Per-question results: ${JSON.stringify(graded)}.\n\nReturn JSON: {"summary": string (2 sentences), "strengths": string[], "weak_areas": [{"topic": string, "advice": string}], "courses": [{"title": string, "provider": string, "why": string, "url": string (direct https link to the real course page)}] (2-4 real, well-known courses)}.`);
	} catch (e) {
		console.warn("AI grading failed, falling back to local grading report:", e?.message);
		const { courseUrl } = await import("./course-link-tjJu6VN-.mjs").then((n) => n.n).then((n) => n.n);
		report = {
			summary: `You scored ${score}/${graded.length} on the "${test.topic}" assessment. Consistent practice will help solidify your knowledge.`,
			strengths: ["Demonstrated solid logical deduction", `Understood basic principles of ${test.topic}`],
			weak_areas: [{
				topic: `${test.topic} Implementation`,
				advice: "Study advanced design patterns, error handling, and production-level configurations."
			}],
			courses: [{
				title: `Ultimate ${test.topic} Bootcamp`,
				provider: "Udemy",
				why: "Covers fundamental and advanced concepts with practical hands-on projects.",
				url: courseUrl(`ultimate-${test.topic}`)
			}, {
				title: `${test.topic} Crash Course`,
				provider: "YouTube",
				why: "A comprehensive free video walkthrough focusing on core concepts.",
				url: courseUrl(`${test.topic}-crash-course`)
			}]
		};
	}
	const { error } = await context.supabase.from("mock_test_attempts").insert({
		user_id: context.userId,
		test_id: data.testId,
		topic: test.topic,
		score,
		total: graded.length,
		answers: data.answers,
		report
	});
	if (error) throw error;
	return {
		score,
		total: graded.length,
		graded,
		report
	};
});
var assistantReply_createServerFn_handler = createServerRpc({
	id: "200f55dfcb57b8caf53ed14787aca79c0a605c5835f9f24a4682f10a779737db",
	name: "assistantReply",
	filename: "src/lib/ai.functions.ts"
}, (opts) => assistantReply.__executeServer(opts));
var assistantReply = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(assistantReply_createServerFn_handler, async ({ data, context }) => {
	const message = data.message?.trim();
	if (!message) throw new Error("Type a message first");
	const [{ data: profile }, { data: history }] = await Promise.all([context.supabase.from("student_profiles").select("full_name, degree, specialization, skills, interests, career_goals, resume_path").eq("user_id", context.userId).maybeSingle(), context.supabase.from("assistant_messages").select("role, content").order("created_at", { ascending: false }).limit(12)]);
	let resume = "";
	if (profile?.resume_path) try {
		resume = (await resumeText(context.supabase, profile.resume_path)).slice(0, 6e3);
	} catch {
		resume = "";
	}
	const prior = (history ?? []).reverse().map((m) => ({
		role: m.role,
		content: m.content
	}));
	let reply = "";
	try {
		reply = await chatText([
			{
				role: "system",
				content: "You are the Nextern AI Assistant. You help college students improve resumes, phrase achievement bullets, pass ATS screening, and prepare for internships. Be concrete and brief — use short bullets and rewritten examples. Never invent experience the student does not have."
			},
			{
				role: "system",
				content: `Student profile: ${JSON.stringify(profile ?? {})}\n\nResume text:\n"""${resume}"""`
			},
			...prior,
			{
				role: "user",
				content: message
			}
		]);
	} catch (e) {
		console.warn("Chatbot generation failed, falling back to local assistant response:", e?.message);
		const lower = message.toLowerCase();
		if (lower.includes("enhance") || lower.includes("improve") || lower.includes("critique") || lower.includes("review") || lower.includes("check")) if (!resume) reply = "I don't see a resume uploaded to your profile yet! 📂\n\nPlease go to your **Profile** page, upload your resume PDF, and then ask me to 'enhance my resume'. I will analyze the text and suggest specific keywords and formatting changes to help you pass ATS screenings.";
		else {
			const missingInResume = (profile?.skills || []).filter((s) => !resume.toLowerCase().includes(s.toLowerCase().trim()));
			const hasMetrics = resume.includes("%") || /\b\d{2,}\b/.test(resume);
			reply = "I have reviewed your uploaded resume. Here are a few personalized suggestions to enhance it and pass ATS screenings:\n\n";
			if (missingInResume.length > 0) reply += `• **Add Missing Skills:** You listed **${missingInResume.slice(0, 3).join(", ")}** in your profile, but they are not mentioned in your resume. Insert these keywords in your experience or skills section so scanners don't filter you out.\n`;
			else reply += "• **Skills Alignment:** Great job! Your core profile skills are well-represented in your resume text.\n";
			if (!hasMetrics) reply += "• **Quantify Your Impact:** I noticed a lack of percentages or metrics in your descriptions. Enhance your bullets by adding results (e.g. 'reduced page load time by 15%' or 'improved query efficiency by 25%').\n";
			else reply += "• **Metric-Driven Bullets:** Good job including numbers to show the outcomes of your projects.\n";
			reply += "• **Formatting Check:** Keep your resume in a single-column layout, use standard fonts (Arial/Calibri), and avoid placing text inside graphic shapes or tables which confuse ATS parsers.\n\nYou can replace your resume with these enhancements on your **Profile** page at any time!";
		}
		else if (lower.startsWith("hi") || lower.startsWith("hello") || lower.startsWith("hey") || lower.includes("greetings")) reply = "Hello! I am your Nextern AI Assistant. 👋\n\nI am here to help you get internship-ready. How can I assist you today? Feel free to ask me:\n\n• *'Make my resume more ATS-friendly'*\n• *'Rewrite my project bullets with impact'*\n• *'How should I prepare for coding interviews?'*\n• *'What skills should I add for AI/ML or Web Dev roles?'*";
		else if (lower.includes("ats") || lower.includes("resume") || lower.includes("cv")) reply = "Here are 3 key tips to make your resume more ATS-friendly:\n\n• **Use a single-column layout:** Multi-column tables or complex grids often confuse parser tools.\n• **Add exact keyword matches:** Align your skills section with the specific words in the internship descriptions (e.g. if they list 'React Hooks', write 'React Hooks' instead of 'React').\n• **Focus on impact bullets:** Use action verbs and metric metrics (e.g. 'Optimized database queries, reducing response latency by 20%').";
		else if (lower.includes("bullet") || lower.includes("rewrite") || lower.includes("project")) reply = "To rewrite your project bullets with maximum impact, use the **STAR formula** (Situation, Task, Action, Result):\n\n**Before:** 'Helped build a web app with React.'\n**After:** 'Developed responsive frontend modules using React, improving user session durations by 15% across 200+ active users.'\n\nTry to quantify your results with percentages, time saved, or database performance changes!";
		else if (lower.includes("interview") || lower.includes("prep") || lower.includes("prepare") || lower.includes("question")) reply = "Here is a quick checklist to prepare for your upcoming technical interviews:\n\n• **Master Core DSA:** Practice standard problems in Arrays, Strings, Hashing, and Trees on our **Practice** page.\n• **Study Your Profile Projects:** Be ready to explain your architecture decisions, database choices, and how you solved challenging technical bugs.\n• **Prepare Your Introduction:** Write a brief 1-minute pitch introducing your background, skills, and why you are excited about the internship role.\n• **Use Mock Tests:** Generate a simulator test on your target topic using the **Practice** tab to build speed and accuracy.";
		else if (lower.includes("skill") || lower.includes("ai") || lower.includes("ml") || lower.includes("dev")) reply = "For top engineering and analyst roles, companies on Nextern are prioritizing:\n\n• **AI/ML:** PyTorch, Vector Databases (Pinecone/PGVector), and Prompt Engineering.\n• **Web Development:** TypeScript, Next.js / Remix, and PostgreSQL database logic.\n• **DevOps:** Docker containers, CI/CD pipelines, and AWS deployment basics.\n\nYou can check out the **Skill Trends** selector on your dashboard for the full breakdown!";
		else reply = `Hello! I am the Nextern AI Assistant. I noticed you asked about: "${message}".\n\nCurrently, I am running in **offline demo mode** due to an API connection issue on your account. To assist you with your career goals, here are some recommended actions:

• Edit your **Profile** to ensure your skills and project summaries are fully filled out.
• Check the **Skill Trends** section on your dashboard to see what skills are rising in popularity.
• Head to the **Practice** page to attempt simulated test questions and build your upskilling plan.`;
	}
	await context.supabase.from("assistant_messages").insert([{
		user_id: context.userId,
		role: "user",
		content: message
	}, {
		user_id: context.userId,
		role: "assistant",
		content: reply
	}]);
	return { reply };
});
//#endregion
export { analyzeRejection_createServerFn_handler, assistantReply_createServerFn_handler, generateMockTest_createServerFn_handler, gradeMockTest_createServerFn_handler, parseResume_createServerFn_handler };
