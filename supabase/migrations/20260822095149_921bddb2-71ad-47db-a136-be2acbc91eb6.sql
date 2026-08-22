-- ROLES
CREATE TYPE public.app_role AS ENUM ('student','recruiter','admin');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile write" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "claim own role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND role <> 'admin');

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- STUDENT PROFILE
CREATE TABLE public.student_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  degree text NOT NULL DEFAULT '',
  degree_other text NOT NULL DEFAULT '',
  college text NOT NULL DEFAULT '',
  current_year text NOT NULL DEFAULT '',
  graduation_year text NOT NULL DEFAULT '',
  specialization text NOT NULL DEFAULT '',
  skills text[] NOT NULL DEFAULT '{}',
  interests text[] NOT NULL DEFAULT '{}',
  preferred_domains text[] NOT NULL DEFAULT '{}',
  preferred_locations text[] NOT NULL DEFAULT '{}',
  work_mode text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  company_type text NOT NULL DEFAULT '',
  min_stipend integer NOT NULL DEFAULT 0,
  career_goals text NOT NULL DEFAULT '',
  resume_path text,
  resume_name text,
  resume_uploaded_at timestamptz,
  onboarding_complete boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_profiles TO authenticated;
GRANT ALL ON public.student_profiles TO service_role;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own student profile" ON public.student_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER student_profiles_updated BEFORE UPDATE ON public.student_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- COMPANIES
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  website text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT SELECT ON public.companies TO anon;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "companies public read" ON public.companies FOR SELECT USING (true);
CREATE POLICY "owner manages company" ON public.companies FOR ALL TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE TRIGGER companies_updated BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- INTERNSHIPS
CREATE TABLE public.internships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  posted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  domain text NOT NULL DEFAULT '',
  skills text[] NOT NULL DEFAULT '{}',
  eligibility text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  work_mode text NOT NULL DEFAULT 'Onsite',
  duration text NOT NULL DEFAULT '',
  stipend integer,
  deadline date,
  source text NOT NULL DEFAULT 'Next Intern',
  apply_url text NOT NULL,
  is_curated boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.internships TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.internships TO authenticated;
GRANT ALL ON public.internships TO service_role;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published internships are public" ON public.internships FOR SELECT USING (is_published = true);
CREATE POLICY "recruiter reads own internships" ON public.internships FOR SELECT TO authenticated USING (auth.uid() = posted_by);
CREATE POLICY "recruiter creates internships" ON public.internships FOR INSERT TO authenticated WITH CHECK (auth.uid() = posted_by AND public.has_role(auth.uid(),'recruiter'));
CREATE POLICY "recruiter updates own internships" ON public.internships FOR UPDATE TO authenticated USING (auth.uid() = posted_by) WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "recruiter deletes own internships" ON public.internships FOR DELETE TO authenticated USING (auth.uid() = posted_by);
CREATE TRIGGER internships_updated BEFORE UPDATE ON public.internships FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SAVED
CREATE TABLE public.saved_internships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  internship_id uuid NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, internship_id)
);
GRANT SELECT, INSERT, DELETE ON public.saved_internships TO authenticated;
GRANT ALL ON public.saved_internships TO service_role;
ALTER TABLE public.saved_internships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own saves" ON public.saved_internships FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- FEEDBACK
CREATE TABLE public.internship_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  internship_id uuid NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  value text NOT NULL CHECK (value IN ('up','down')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, internship_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.internship_feedback TO authenticated;
GRANT ALL ON public.internship_feedback TO service_role;
ALTER TABLE public.internship_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own feedback" ON public.internship_feedback FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- APPLICATIONS
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  internship_id uuid NOT NULL REFERENCES public.internships(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'applied' CHECK (status IN ('saved','applied','interview','selected','rejected')),
  notes text NOT NULL DEFAULT '',
  applied_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, internship_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own applications" ON public.applications FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "recruiter reads applications to own postings" ON public.applications FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.internships i WHERE i.id = internship_id AND i.posted_by = auth.uid()));
CREATE TRIGGER applications_updated BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- REMINDER PREFS
CREATE TABLE public.reminder_prefs (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  days integer[] NOT NULL DEFAULT '{7,3,1}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.reminder_prefs TO authenticated;
GRANT ALL ON public.reminder_prefs TO service_role;
ALTER TABLE public.reminder_prefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own reminder prefs" ON public.reminder_prefs FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);