import { useMemo } from "react";
import { Sparkles, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { StudentProfile } from "@/lib/types";

interface Achiever {
  name: string;
  age: number;
  domain: string;
  achievement: string;
  background: string;
  message: string;
  image: string; // Photo URL
  linkedin: string; // LinkedIn Profile URL
}

const ACHIEVERS: Achiever[] = [
  {
    name: "Trishneet Arora",
    age: 19,
    domain: "Cybersecurity",
    achievement: "found TAC Security and secure enterprise networks globally from cyber threats",
    background: "network security and threat analysis",
    message: "He started learning coding and network security as a hobby in school, spending late nights practicing on simulated routers and virtual labs. Your focus on networks, ethical hacking, and defense is a powerful foundation that can open doors to corporate security operations. Focus on building hands-on labs, tracking active threat models, and practicing system architecture safety.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    linkedin: "https://www.linkedin.com/in/trishneetarora"
  },
  {
    name: "Ritesh Agarwal",
    age: 19,
    domain: "Software Developer",
    achievement: "become the first Indian Thiel Fellow and launch OYO Rooms powered by custom software tools",
    background: "software architecture and systems development",
    message: "He began coding in his teens and traveled across India to study hotels, coding the initial platform from scratch in cybercafes. Software development is the ultimate leverage to scale ideas. Your current projects are the exact building blocks of functional application backends, API schemas, and data pipelines. Commit to shipping code daily, testing edge cases, and building tools that solve real problems.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    linkedin: "https://www.linkedin.com/in/riteshagarwaloyo"
  },
  {
    name: "Shravan and Sanjay Kumaran",
    age: 12,
    domain: "Web Developer",
    achievement: "co-found GoDimensions and publish multiple top-ranking mobile apps on the App Store",
    background: "frontend engineering and mobile application design",
    message: "They started experimenting with simple code syntax at a very young age and built over a dozen utility and gaming applications by collaborating in their home bedroom. Your coding practice is the key to creating interactive, responsive products. Building clean React modules, structuring state flows, and mastering component reuse are highly valuable frontend patterns. Iterate on layouts, learn package optimization, and launch clean user interfaces.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    linkedin: "https://www.linkedin.com/in/shravankumaran"
  },
  {
    name: "Divya Gandotra Tandon",
    age: 18,
    domain: "UI/UX Designer",
    achievement: "found Scoop Beats, building layout designs and content systems read by millions",
    background: "digital design and user-centric interfaces",
    message: "She started creating simple UI wireframes, writing blogs, and learning typography rules while studying in college, eventually scaling her media design to a major brand. Design defines how users interact with technology. Your design skills and formatting preferences are central to creating product experiences that click. Pay attention to user accessibility, colors, system layouts, and interactive micro-animations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    linkedin: "https://www.linkedin.com/in/divyatandon"
  },
  {
    name: "Suumit Shah",
    age: 23,
    domain: "Data Analyst",
    achievement: "found Dukaan, using data workflows to bring over 6 million small Indian retailers online",
    background: "data mining and analytical dashboarding",
    message: "He spent years mastering database queries, tracking retail store metrics, and designing automated data transformation scripts. Interpreting user data patterns is what turns concepts into engines. Your practice in database querying, statistics, and tables aggregation is what drives modern business intelligence. Learn data modeling, study query optimization, and practice building interactive charts.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    linkedin: "https://www.linkedin.com/in/suumitshah"
  }
];

export function MotivationBanner({ profile }: { profile: StudentProfile | null | undefined }) {
  const match = useMemo(() => {
    if (!profile) return null;

    const domains = (profile.preferred_domains || []).map((d) => d.toLowerCase());
    const skills = (profile.skills || []).map((s) => s.toLowerCase());
    const interests = (profile.interests || []).map((i) => i.toLowerCase());

    const allTokens = [...domains, ...skills, ...interests].join(" ");

    // Match based on domain keywords
    let achiever = ACHIEVERS[1]; // Default: Ritesh Agarwal
    if (allTokens.includes("cyber") || allTokens.includes("security") || allTokens.includes("network")) {
      achiever = ACHIEVERS[0]; // Trishneet
    } else if (allTokens.includes("design") || allTokens.includes("ui") || allTokens.includes("ux") || allTokens.includes("figma")) {
      achiever = ACHIEVERS[3]; // Divya
    } else if (allTokens.includes("data") || allTokens.includes("analyst") || allTokens.includes("sql") || allTokens.includes("statistic")) {
      achiever = ACHIEVERS[4]; // Suumit
    } else if (allTokens.includes("web") || allTokens.includes("mobile") || allTokens.includes("app") || allTokens.includes("frontend")) {
      achiever = ACHIEVERS[2]; // Shravan & Sanjay
    }

    // Estimate user age based on year of study
    let userAge = 20;
    const yearStr = (profile.current_year || "").toLowerCase();
    if (yearStr.includes("1") || yearStr.includes("first")) {
      userAge = 18;
    } else if (yearStr.includes("2") || yearStr.includes("second")) {
      userAge = 19;
    } else if (yearStr.includes("3") || yearStr.includes("third")) {
      userAge = 20;
    } else if (yearStr.includes("4") || yearStr.includes("fourth") || yearStr.includes("final")) {
      userAge = 21;
    }

    // Format top 2 matching skills for prompt
    const displaySkills = (profile.skills || []).slice(0, 2).join(" and ");

    return {
      achiever,
      userAge,
      displaySkills: displaySkills || "your current tech interests"
    };
  }, [profile]);

  if (!match) return null;

  const { achiever, userAge, displaySkills } = match;

  return (
    <Card className="mt-6 border-l-4 border-l-primary bg-primary/5 p-6 shadow-[var(--shadow-card)] relative overflow-hidden group">
      {/* Background Micro-animation glow */}
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 rounded-full bg-primary/10 blur-xl group-hover:scale-150 transition-all duration-700" />
      
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        {/* Achiever Profile Photo */}
        <img 
          src={achiever.image} 
          alt={achiever.name} 
          className="size-20 rounded-full object-cover border-3 border-primary/20 shrink-0 shadow-md"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          {/* Motivational Heading */}
          <h4 className="text-sm font-bold text-primary flex items-center justify-center sm:justify-start gap-1">
            <Sparkles className="size-4 animate-pulse fill-primary/20" />
            You Can Be Next!
          </h4>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            “You’re not far behind!” — At age {achiever.age}, <span className="font-semibold text-primary">{achiever.name}</span> used skills similar to yours to {achiever.achievement}. 
            Your current skills in <span className="font-semibold">{displaySkills}</span> can be a strong starting point too. {achiever.message} Keep learning, applying, and building.
          </p>
          <div className="mt-2.5 flex justify-center sm:justify-start">
            <a 
              href={achiever.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-full px-3.5 py-1.5 transition-colors"
            >
              <Linkedin className="size-3" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
