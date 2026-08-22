import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  BookOpen, 
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp as TrendUpIcon,
  Info
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentProfile, useInternships } from "@/lib/queries";
import { scoreInternship } from "@/lib/matching";
import { SKILL_TRENDS, CAREER_ROLES, SKILL_CATEGORIES } from "@/data/skillTrends";

export function SkillTrendDetector() {
  const { data: profile } = useStudentProfile();
  const { data: internships = [] } = useInternships();

  // Deduce target role based on profile data
  const defaultRole = useMemo(() => {
    if (!profile) return "Software Developer";
    const text = `${profile.career_goals || ""} ${profile.specialization || ""}`.toLowerCase();
    if (text.includes("ai") || text.includes("machine learning") || text.includes("ml")) return "AI/ML Engineer";
    if (text.includes("data") || text.includes("analyst")) return "Data Analyst";
    if (text.includes("security") || text.includes("cyber")) return "Cybersecurity";
    if (text.includes("web") || text.includes("frontend") || text.includes("backend")) return "Web Developer";
    if (text.includes("design") || text.includes("ui") || text.includes("ux")) return "UI/UX Designer";
    if (text.includes("cloud") || text.includes("aws") || text.includes("devops")) return "Cloud Engineer";
    return "Software Developer";
  }, [profile]);

  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
    }
  }, [defaultRole]);

  const trends = useMemo(() => {
    return SKILL_TRENDS[selectedRole] || [];
  }, [selectedRole]);

  const filteredTrends = useMemo(() => {
    if (selectedCategory === "All Categories") return trends;
    return trends.filter((t) => t.category === selectedCategory);
  }, [trends, selectedCategory]);

  // Skill match status calculator
  const getMatchStatus = (skillName: string) => {
    if (!profile || !profile.skills) return "missing";
    const mySkillsLower = profile.skills.map((s) => s.toLowerCase().trim());
    const targetLower = skillName.toLowerCase().trim();

    if (mySkillsLower.includes(targetLower)) {
      return "have";
    }
    if (mySkillsLower.some((s) => s.includes(targetLower) || targetLower.includes(s))) {
      return "partial";
    }
    return "missing";
  };

  // Dynamic Match Impact calculator using Nextern recommendation engine score
  const getMatchImpact = (skillName: string) => {
    if (!profile) return { current: 0, potential: 0, diff: 0 };
    const THRESHOLD = 35; // Relevant match threshold
    
    const currentMatches = internships.filter((i) => scoreInternship(i, profile).score >= THRESHOLD).length;
    
    const potentialProfile = {
      ...profile,
      skills: [...(profile.skills || []), skillName]
    };
    const potentialMatches = internships.filter((i) => scoreInternship(i, potentialProfile).score >= THRESHOLD).length;
    
    let diff = potentialMatches - currentMatches;
    let potential = potentialMatches;
    
    // Fallback in case score increments don't cross threshold but direct keywords match
    const directlyRequires = internships.filter((i) => 
      i.skills.some((s) => s.toLowerCase().trim() === skillName.toLowerCase().trim())
    ).length;
    
    if (diff === 0 && directlyRequires > 0) {
      diff = directlyRequires;
      potential = currentMatches + directlyRequires;
    }
    
    return {
      current: currentMatches,
      potential,
      diff
    };
  };

  // Personalized dynamic summary based on target role and skills
  const personalizedSummary = useMemo(() => {
    if (!profile) return "";
    const mySkillsLower = (profile.skills || []).map((s) => s.toLowerCase().trim());
    const matched = trends.filter((t) => mySkillsLower.includes(t.name.toLowerCase().trim())).map((t) => t.name);
    const gaps = trends.filter((t) => !mySkillsLower.includes(t.name.toLowerCase().trim())).map((t) => t.name);
    
    let text = `${selectedRole} roles are increasingly emphasizing ${trends.slice(0, 4).map((t) => t.name).join(", ")}. `;
    if (matched.length > 0) {
      text += `You already have strong matches like ${matched.slice(0, 3).join(", ")}. `;
    }
    if (gaps.length > 0) {
      text += `Your highest-priority skill gap is ${gaps[0]}${gaps.length > 1 ? ` (followed by ${gaps.slice(1, 3).join(", ")})` : ""}.`;
    } else {
      text += `Amazing job! You have acquired all core trending skills for this role.`;
    }
    return text;
  }, [profile, selectedRole, trends]);

  // Recommended skills prioritized list (missing/partial match)
  const prioritizedRecommendations = useMemo(() => {
    if (!profile) return [];
    
    const candidates = trends
      .map((t) => ({
        ...t,
        status: getMatchStatus(t.name),
        impact: getMatchImpact(t.name)
      }))
      .filter((c) => c.status !== "have");

    return candidates.slice(0, 3).map((c, index) => {
      const priorities: ("High" | "Medium" | "Low")[] = ["High", "Medium", "Low"];
      return {
        ...c,
        priority: priorities[index] || "Low"
      };
    });
  }, [profile, trends, internships]);

  // Mini sparkline components for different trends
  const Sparkline = ({ trend }: { trend: "Rising" | "Stable" | "Declining" }) => {
    if (trend === "Rising") {
      return (
        <svg className="h-6 w-14 text-emerald-500 animate-pulse" viewBox="0 0 40 15" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 13 Q10 8 18 10 T38 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (trend === "Declining") {
      return (
        <svg className="h-6 w-14 text-rose-500" viewBox="0 0 40 15" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 2 Q10 7 18 5 T38 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-14 text-amber-500" viewBox="0 0 40 15" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 7.5 L12 8 L22 7 L38 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <Card className="mt-8 shadow-[var(--shadow-card)]">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="size-5 text-primary" />
            Skill Trends
          </CardTitle>
          <CardDescription className="text-sm">
            Discover the skills becoming more important in your target career.
          </CardDescription>
        </div>
        <div className="w-[180px] sm:w-[220px]">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select target role" />
            </SelectTrigger>
            <SelectContent>
              {CAREER_ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Dynamic Summary Card */}
        {profile && (
          <div className="rounded-xl border border-border bg-card p-4.5 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-sm mb-1.5 text-foreground">
              <Award className="size-4.5 text-primary" />
              Your Skill Trend Summary
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {personalizedSummary}
            </p>
          </div>
        )}

        {/* Category filtering tabs */}
        <div className="-mx-2 flex overflow-x-auto px-2 pb-2 scrollbar-none gap-1">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold transition-all border ${
                selectedCategory === cat
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill trend cards grid */}
        {filteredTrends.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No trending skills found in this category.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredTrends.map((skill) => {
              const isRising = skill.trend === "Rising";
              const isDeclining = skill.trend === "Declining";
              const status = getMatchStatus(skill.name);
              
              return (
                <div 
                  key={skill.name} 
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border p-4.5 transition-all hover:shadow-md hover:border-muted-foreground/30 bg-surface/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </h4>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {isRising && (
                          <Badge variant="outline" className="h-5 px-1.5 gap-1 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                            <TrendingUp className="size-3" /> Rising
                          </Badge>
                        )}
                        {isDeclining && (
                          <Badge variant="outline" className="h-5 px-1.5 gap-1 border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                            <TrendingDown className="size-3" /> Declining
                          </Badge>
                        )}
                        {!isRising && !isDeclining && (
                          <Badge variant="outline" className="h-5 px-1.5 gap-1 border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                            <Minus className="size-3" /> Stable
                          </Badge>
                        )}
                        <span className="text-[11px] font-semibold text-foreground/80">
                          {skill.growth} demand
                        </span>
                      </div>
                    </div>
                    <Sparkline trend={skill.trend} />
                  </div>

                  {/* Personalization Status Tag */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium">
                    {status === "have" && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="size-3.5" />
                        ✓ You already have this skill
                      </span>
                    )}
                    {status === "partial" && (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                        <HelpCircle className="size-3.5" />
                        ◐ Partially matched
                      </span>
                    )}
                    {status === "missing" && (
                      <span className="flex items-center gap-1 text-rose-500 dark:text-rose-400 font-semibold">
                        <AlertCircle className="size-3.5" />
                        ⚠ Missing from your profile
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {skill.explanation}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                      <span>POPULARITY LEVEL</span>
                      <span className={isRising ? "text-emerald-500" : "text-amber-500"}>
                        {skill.popularity.toUpperCase()} DEMAND
                      </span>
                    </div>
                    <Progress 
                      value={skill.percentage} 
                      className={`h-1.5 ${
                        isRising 
                          ? "[&>div]:bg-emerald-500" 
                          : isDeclining 
                            ? "[&>div]:bg-rose-500" 
                            : "[&>div]:bg-amber-500"
                      }`} 
                    />
                  </div>

                  {/* Learn Skill Action inside card if missing */}
                  {status !== "have" && (
                    <div className="mt-4 border-t border-border/50 pt-3 flex justify-end">
                      <Button size="sm" variant="ghost" className="h-7 text-xs font-semibold px-2 py-0 text-primary hover:text-primary/80" asChild>
                        <Link to="/prepare">
                          Learn Skill <ArrowRight className="ml-1 size-3" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Recommended for You section */}
        {profile && (
          <div className="border-t border-border pt-6 mt-8">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Award className="size-5 text-primary" />
              Recommended for You
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">
              Based on your current skills, target role, and internship goals.
            </p>

            {prioritizedRecommendations.length === 0 ? (
              <div className="rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 p-4.5 text-center text-sm font-semibold text-emerald-600">
                ✓ Fantastic! Your profile is fully matched with all trending skills for this role.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                {prioritizedRecommendations.map((rec) => {
                  const priorityColors = {
                    High: "border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400",
                    Medium: "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400",
                    Low: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400"
                  };
                  
                  return (
                    <div key={rec.name} className="flex flex-col justify-between rounded-xl border border-border p-4 bg-surface/30">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm text-foreground">{rec.name}</h4>
                          <Badge variant="outline" className={`h-4.5 px-1 text-[9px] font-bold ${priorityColors[rec.priority]}`}>
                            {rec.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-[11px] text-muted-foreground mt-2 leading-normal">
                          {rec.status === "partial" 
                            ? `Partially matches your profile, but deepening this skill supports your ${selectedRole} path.`
                            : `Requested for ${selectedRole} roles but currently missing from your profile.`
                          }
                        </p>
                      </div>

                      {/* Impact on Matches block */}
                      <div className="mt-4 pt-3 border-t border-border/50">
                        <div className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                          <TrendUpIcon className="size-3.5 text-primary" />
                          MATCH IMPACT
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs font-semibold">
                          <span className="text-muted-foreground">Opportunities:</span>
                          <span className="text-foreground">{rec.impact.current} ➜ {rec.impact.potential}</span>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          +{rec.impact.diff} potential opportunities
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="mt-4 w-full h-8 text-xs font-semibold gap-1" asChild>
                        <Link to="/prepare">
                          View Learning Plan <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Trend transparency footer */}
        <div className="border-t border-border/50 pt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Info className="size-3.5 shrink-0" />
          <span>Trend period: Monthly (Demostrative prototype data based on current Nextern platform parameters)</span>
        </div>
      </CardContent>
    </Card>
  );
}
