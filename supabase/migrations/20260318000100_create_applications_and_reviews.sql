-- Base de datos del onboarding / portal de credenciales
-- Fase 1: solicitudes y auditoria de revision
-- Fase 2: preparacion para invitar credenciales reales tras aprobacion

CREATE TABLE IF NOT EXISTS public.applications (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft',
    'submitted',
    'contract_pending',
    'pending_review',
    'needs_changes',
    'approved',
    'rejected',
    'active'
  )),
  applicant_email text,
  applicant_phone text,
  business_trade_name text,
  business_legal_name text,
  onboarding_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  review_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  credentials_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  current_step integer DEFAULT 0,
  kyc_verification jsonb,
  submitted_at timestamptz,
  approved_at timestamptz,
  rejected_at timestamptz,
  last_reviewed_at timestamptz,
  auth_user_id uuid,
  credential_status text NOT NULL DEFAULT 'not_invited' CHECK (credential_status IN (
    'not_invited',
    'pending_invitation',
    'invited',
    'active',
    'disabled'
  )),
  invited_at timestamptz,
  source text NOT NULL DEFAULT 'web',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_applications_status
  ON public.applications (status);

CREATE INDEX IF NOT EXISTS idx_applications_updated_at
  ON public.applications (updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_applicant_email
  ON public.applications (applicant_email);

CREATE TABLE IF NOT EXISTS public.application_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id text NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN (
    'submitted',
    'contract_pending',
    'pending_review',
    'needs_changes',
    'approved',
    'rejected',
    'invite_pending',
    'invite_sent'
  )),
  actor text,
  notes text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_application_reviews_application_id
  ON public.application_reviews (application_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  role text NOT NULL DEFAULT 'agent' CHECK (role IN ('superadmin', 'agent', 'employee')),
  display_name text,
  application_id text REFERENCES public.applications(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agent_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id text NOT NULL UNIQUE REFERENCES public.applications(id) ON DELETE CASCADE,
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  display_name text,
  status text NOT NULL DEFAULT 'pending_invitation' CHECK (status IN (
    'pending_invitation',
    'invited',
    'active',
    'disabled'
  )),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_accounts ENABLE ROW LEVEL SECURITY;

-- PROTOTIPO:
-- mientras el flujo sigue siendo mayormente frontend y sin auth administrativa real,
-- se habilita acceso amplio a solicitudes y revisiones para poder operar el onboarding.
-- En una fase posterior esto debe endurecerse con auth + policies por rol.
CREATE POLICY "Allow public read applications"
  ON public.applications FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update applications"
  ON public.applications FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read application reviews"
  ON public.application_reviews FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert application reviews"
  ON public.application_reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update application reviews"
  ON public.application_reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);
