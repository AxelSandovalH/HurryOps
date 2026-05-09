import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { randomUUID } from 'crypto'

// URL del dashboard — a donde el usuario llega después de aceptar la invitación
const DASHBOARD_URL =
  'https://logistica-shipments-demo-git-main-axesan917-9449s-projects.vercel.app/auth/callback'

// Genera un código corto para la agencia a partir del nombre de la empresa
function toAgencyCode(company: string): string {
  const base = company
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6)
  const suffix = Date.now().toString(36).toUpperCase().slice(-3)
  return `${base}-${suffix}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, email, phone } = body as {
      name?: string
      company?: string
      email?: string
      phone?: string
    }

    // Validación básica
    if (!name?.trim() || !company?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Nombre, empresa y email son requeridos.' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const agencyId = randomUUID()
    const userId = randomUUID()
    const agencyCode = toAgencyCode(company)

    // ─── 1. Verificar si el email ya existe ────────────────────────────────────
    const { data: existingUser } = await supabaseAdmin
      .from('User')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya tiene acceso al sistema.' },
        { status: 409 }
      )
    }

    // ─── 2. Crear Agency ───────────────────────────────────────────────────────
    const { error: agencyError } = await supabaseAdmin.from('Agency').insert({
      id: agencyId,
      name: company.trim(),
      code: agencyCode,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      active: true,
      createdAt: now,
      updatedAt: now,
    })

    if (agencyError) {
      console.error('[register] Agency insert error:', agencyError)
      return NextResponse.json(
        { error: 'Error al registrar la agencia. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    // ─── 3. Crear User en la base de datos ────────────────────────────────────
    // supabaseId se llenará automáticamente cuando el usuario acepte la invitación
    // y pase por /auth/callback en el dashboard
    const { error: userError } = await supabaseAdmin.from('User').insert({
      id: userId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'AGENCY',
      active: true,
      agencyId,
      createdAt: now,
      updatedAt: now,
    })

    if (userError) {
      // Rollback agencia si el usuario falló
      await supabaseAdmin.from('Agency').delete().eq('id', agencyId)
      console.error('[register] User insert error:', userError)
      return NextResponse.json(
        { error: 'Error al crear el usuario. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    // ─── 4. Enviar invitación por email vía Supabase Auth ─────────────────────
    // Esto crea el usuario en Supabase Auth y manda email con link de acceso
    const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      email.trim().toLowerCase(),
      {
        data: { name: name.trim(), company: company.trim() },
        redirectTo: DASHBOARD_URL,
      }
    )

    if (inviteError) {
      // El usuario ya está en la DB — solo loguear, no fallar
      console.error('[register] Invite email error:', inviteError.message)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[register] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Error inesperado. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
