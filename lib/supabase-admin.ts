import { createClient } from '@supabase/supabase-js'

// Cliente con service_role — solo se usa en server-side (API routes)
// Nunca exponer este cliente al browser
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
