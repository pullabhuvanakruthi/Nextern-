CREATE OR REPLACE FUNCTION public.candidates_for_internship(_internship_id uuid, _only_applicants boolean DEFAULT false)
RETURNS TABLE (
  user_id uuid,
  display_name text,
  college text,
  degree text,
  specialization text,
  graduation_year text,
  skills text[],
  interests text[],
  has_resume boolean,
  application_status text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    sp.user_id,
    CASE WHEN COALESCE(sp.full_name,'') = '' THEN 'Student' ELSE sp.full_name END AS display_name,
    sp.college,
    sp.degree,
    sp.specialization,
    sp.graduation_year,
    sp.skills,
    sp.interests,
    sp.resume_path IS NOT NULL AS has_resume,
    a.status AS application_status
  FROM public.student_profiles sp
  LEFT JOIN public.applications a
    ON a.user_id = sp.user_id AND a.internship_id = _internship_id
  WHERE EXISTS (
      SELECT 1 FROM public.internships i
      WHERE i.id = _internship_id AND i.posted_by = auth.uid()
    )
    AND sp.onboarding_complete = true
    AND (_only_applicants = false OR a.id IS NOT NULL)
$$;

REVOKE EXECUTE ON FUNCTION public.candidates_for_internship(uuid, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.candidates_for_internship(uuid, boolean) TO authenticated, service_role;