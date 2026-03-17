-- Tabla para guardar el estado de verificación KYC (Metamap)
-- La Edge Function guarda aquí el resultado al consultar Metamap
-- El frontend lee desde aquí para mostrar el status

CREATE TABLE IF NOT EXISTS public.kyc_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id text NOT NULL UNIQUE,
  verification_id text NOT NULL,
  identity_id text,
  status text NOT NULL DEFAULT 'pending_review',
  error_message text,
  error_code text,
  error_type text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kyc_verifications_application_id
  ON public.kyc_verifications (application_id);

-- RLS: permitir lectura pública por application_id (es un ID opaco)
-- La escritura solo desde Edge Function (service_role)
ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON public.kyc_verifications FOR SELECT
  USING (true);

-- INSERT/UPDATE/DELETE: solo la Edge Function (service_role) puede escribir
