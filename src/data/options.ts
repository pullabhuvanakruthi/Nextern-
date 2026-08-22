export const STUDY_LEVELS = ["Undergraduate", "Postgraduate"] as const;

export const DEGREES = [
  "B.Tech / B.E.",
  "B.Sc.",
  "BCA",
  "MCA",
  "M.Tech / M.E.",
  "MBA",
  "M.Sc.",
  "B.Com",
  "M.Com",
  "BA",
  "MA",
  "Diploma",
  "PhD",
  "Other",
] as const;

export const CURRENT_YEARS = ["1st year", "2nd year", "3rd year", "4th year", "5th year", "Graduated"];

export const GRADUATION_YEARS = ["2026", "2027", "2028", "2029", "2030", "2031"];

export const SKILL_OPTIONS = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "HTML/CSS",
  "SQL",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
  "IoT",
  "Robotics",
  "UI/UX",
  "Digital Marketing",
  "Communication",
  "Leadership",
  "Git",
  "Linux",
  "Statistics",
  "Excel",
  "Power BI",
  "Pandas",
  "PyTorch",
  "Go",
  "Kubernetes",
  "Networking",
  "Figma",
];

export const INTEREST_OPTIONS = [
  "AI/ML",
  "Software Development",
  "Data Science",
  "Web Development",
  "App Development",
  "Cybersecurity",
  "Cloud",
  "IoT",
  "Robotics",
  "Finance",
  "Marketing",
  "HR",
  "Business",
  "Design",
  "Research",
];

export const DOMAINS = [
  "AI/ML",
  "Software Development",
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Cloud",
  "Product Design",
  "Marketing",
  "Finance",
  "Business",
  "Research",
];

export const LOCATIONS = [
  "Bengaluru, IN",
  "Hyderabad, IN",
  "Pune, IN",
  "Chennai, IN",
  "Mumbai, IN",
  "Delhi NCR, IN",
  "Gurugram, IN",
  "Noida, IN",
  "Remote",
];

export const WORK_MODES = ["Remote", "Hybrid", "Onsite"] as const;

export const DURATIONS = ["1-2 months", "3 months", "6 months", "6+ months", "Flexible"];

export const COMPANY_TYPES = ["Startup", "Product company", "Service company", "MNC", "Research lab", "Non-profit", "No preference"];

export const APP_STATUSES = ["saved", "applied", "interview", "selected", "rejected"] as const;
export type AppStatus = (typeof APP_STATUSES)[number];

export const STATUS_LABEL: Record<AppStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  selected: "Selected",
  rejected: "Rejected",
};
