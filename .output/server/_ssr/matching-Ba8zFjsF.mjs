//#region node_modules/.nitro/vite/services/ssr/assets/matching-Ba8zFjsF.js
var norm = (s) => s.trim().toLowerCase();
var overlap = (a, b) => {
	const setB = new Set(b.map(norm));
	return a.filter((x) => setB.has(norm(x)));
};
/**
* Weighted profile-and-behaviour ranking. Kept as a pure function so a future
* embedding-based ranker can replace the internals without touching the UI.
*/
function scoreInternship(internship, profile, signals = {}) {
	const { feedback = {}, savedDomains = [], appliedDomains = [] } = signals;
	const matchedSkills = overlap(internship.skills, profile.skills);
	const skillRatio = internship.skills.length ? matchedSkills.length / internship.skills.length : 0;
	const skillDepth = Math.min(matchedSkills.length / 3, 1);
	const domainInterest = profile.interests.some((i) => norm(i) === norm(internship.domain)) || profile.preferred_domains.some((d) => norm(d) === norm(internship.domain));
	const matchedInterests = overlap([internship.domain, ...internship.skills], [...profile.interests, ...profile.preferred_domains]);
	const specialisationHit = !!profile.specialization && (norm(internship.domain).includes(norm(profile.specialization)) || norm(profile.specialization).includes(norm(internship.domain)));
	const locationMatch = profile.preferred_locations.length === 0 || profile.preferred_locations.some((l) => norm(internship.location).includes(norm(l)) || norm(l).includes(norm(internship.location)));
	const workModeMatch = !profile.work_mode || profile.work_mode === internship.work_mode;
	const durationMatch = !profile.duration || profile.duration === "Flexible" || norm(internship.duration).includes(norm(profile.duration).split(" ")[0] ?? "");
	const stipendMatch = !profile.min_stipend || internship.stipend == null || internship.stipend >= profile.min_stipend;
	const behaviourBoost = (savedDomains.filter((d) => norm(d) === norm(internship.domain)).length > 0 ? 6 : 0) + (appliedDomains.filter((d) => norm(d) === norm(internship.domain)).length > 0 ? 4 : 0);
	const resumeBoost = profile.resume_path ? 3 : 0;
	let score = 22 + skillRatio * 32 + skillDepth * 10 + (domainInterest ? 14 : 0) + (specialisationHit ? 5 : 0) + (locationMatch ? 5 : 0) + (workModeMatch ? 5 : 0) + (durationMatch ? 3 : 0) + (stipendMatch ? 3 : 0) + behaviourBoost + resumeBoost;
	const fb = feedback[internship.id];
	if (fb === "up") score += 8;
	if (fb === "down") score -= 40;
	score = Math.max(5, Math.min(99, Math.round(score)));
	const reasons = [];
	if (matchedSkills.length) reasons.push(`You have ${matchedSkills.slice(0, 3).join(", ")}${matchedSkills.length > 3 ? " and more" : ""} from the required skills`);
	if (domainInterest) reasons.push(`You've shown interest in ${internship.domain}`);
	if (specialisationHit) reasons.push(`Close to your ${profile.specialization} specialisation`);
	if (profile.work_mode && workModeMatch) reasons.push(`${internship.work_mode} work, which you prefer`);
	if (profile.preferred_locations.length && locationMatch) reasons.push(`Based in ${internship.location}`);
	if (profile.duration && durationMatch) reasons.push(`Duration fits your ${profile.duration} preference`);
	if (behaviourBoost) reasons.push(`Similar to internships you've saved or applied to`);
	if (!reasons.length) reasons.push("A good starting point while you build out your profile");
	const reason = matchedSkills.length || domainInterest ? `Recommended because ${reasons.slice(0, 2).map((r) => r.charAt(0).toLowerCase() + r.slice(1)).join(", and ")}.` : reasons[0];
	return {
		internship,
		score,
		matchedSkills,
		matchedInterests,
		reason,
		reasons
	};
}
function rankInternships(list, profile, signals = {}) {
	return list.map((i) => scoreInternship(i, profile, signals)).sort((a, b) => b.score - a.score);
}
function profileCompleteness(profile) {
	const checks = [
		!!profile.full_name,
		!!profile.degree,
		!!profile.study_level,
		!!profile.graduation_year,
		profile.skills.length >= 1,
		profile.interests.length >= 1,
		profile.preferred_domains.length >= 1,
		!!profile.work_mode,
		!!profile.duration,
		!!profile.career_goals,
		!!profile.resume_path
	];
	return Math.round(checks.filter(Boolean).length / checks.length * 100);
}
function daysUntil(deadline) {
	if (!deadline) return null;
	const end = (/* @__PURE__ */ new Date(`${deadline}T23:59:59`)).getTime();
	return Math.ceil((end - Date.now()) / 864e5);
}
//#endregion
export { scoreInternship as i, profileCompleteness as n, rankInternships as r, daysUntil as t };
