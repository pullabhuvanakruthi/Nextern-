export type Internship = {
  id: string;
  slug: string | null;
  company_name: string;
  title: string;
  description: string;
  domain: string;
  skills: string[];
  eligibility: string;
  location: string;
  work_mode: string;
  duration: string;
  stipend: number | null;
  deadline: string | null;
  source: string;
  apply_url: string;
  is_curated: boolean;
  created_at: string;
  posted_by?: string | null;
};

export type StudentProfile = {
  user_id: string;
  full_name: string;
  degree: string;
  degree_other: string;
  study_level: string;
  college: string;
  current_year: string;
  graduation_year: string;
  specialization: string;
  skills: string[];
  interests: string[];
  preferred_domains: string[];
  preferred_locations: string[];
  work_mode: string;
  duration: string;
  company_type: string;
  min_stipend: number;
  career_goals: string;
  resume_path: string | null;
  resume_name: string | null;
  resume_uploaded_at: string | null;
  onboarding_complete: boolean;
};

export const emptyStudentProfile = (userId = ""): StudentProfile => ({
  user_id: userId,
  full_name: "",
  degree: "",
  degree_other: "",
  study_level: "",
  college: "",
  current_year: "",
  graduation_year: "",
  specialization: "",
  skills: [],
  interests: [],
  preferred_domains: [],
  preferred_locations: [],
  work_mode: "",
  duration: "",
  company_type: "",
  min_stipend: 0,
  career_goals: "",
  resume_path: null,
  resume_name: null,
  resume_uploaded_at: null,
  onboarding_complete: false,
});

export type Application = {
  id: string;
  user_id: string;
  internship_id: string;
  status: "saved" | "applied" | "interview" | "selected" | "rejected";
  notes: string;
  applied_at: string;
  updated_at: string;
};

export type SavedInternship = {
  id: string;
  internship_id: string;
  created_at: string;
};
