import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { LoginInput, RegisterInput } from '@/lib/validations'
import type { Profile, UserRole } from '@/types'
import { sleep } from '@/lib/utils'

const DEMO_STORAGE_KEY = 'cargalink-demo-user'

/** Conta fixa do protótipo — pronta para apresentar sem banco. */
export const DEMO_ACCOUNT = {
  email: 'demo@cargalink.app',
  password: 'demo1234',
  fullName: 'Marina Oliveira',
  role: 'company' as UserRole,
}

export interface AuthUser {
  id: string
  email: string
  profile: Profile
}

function buildDemoProfile(email: string, fullName: string, role: UserRole): Profile {
  const now = new Date().toISOString()
  return {
    id: 'demo-profile',
    user_id: 'demo-user',
    full_name: fullName,
    email,
    phone: '(11) 98888-0000',
    avatar_url: null,
    role,
    bio: 'Operações logísticas · Protótipo CargaLink',
    city: 'São Paulo',
    state: 'SP',
    is_verified: true,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  }
}

/** Entra direto no protótipo (sem formulário). Ideal para apresentação. */
export async function enterPrototype(): Promise<AuthUser> {
  await sleep(400)
  const user: AuthUser = {
    id: 'demo-user',
    email: DEMO_ACCOUNT.email,
    profile: buildDemoProfile(DEMO_ACCOUNT.email, DEMO_ACCOUNT.fullName, DEMO_ACCOUNT.role),
  }
  writeDemoUser(user)
  return user
}

function readDemoUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

function writeDemoUser(user: AuthUser | null): void {
  if (!user) {
    localStorage.removeItem(DEMO_STORAGE_KEY)
    return
  }
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user))
}

export async function getSessionUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured) {
    return readDemoUser()
  }

  const { data } = await supabase.auth.getSession()
  if (!data.session?.user) return null

  const user = data.session.user
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  const profile = profileData as Profile | null

  if (!profile) {
    return {
      id: user.id,
      email: user.email ?? '',
      profile: buildDemoProfile(
        user.email ?? '',
        (user.user_metadata?.full_name as string) || 'Usuário',
        (user.user_metadata?.role as UserRole) || 'company',
      ),
    }
  }

  return {
    id: user.id,
    email: user.email ?? profile.email,
    profile,
  }
}

export async function signIn(input: LoginInput): Promise<AuthUser> {
  if (!isSupabaseConfigured) {
    await sleep(500)
    const user: AuthUser = {
      id: 'demo-user',
      email: input.email,
      profile: buildDemoProfile(input.email, 'Usuário Demo', 'company'),
    }
    writeDemoUser(user)
    return user
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) throw error
  if (!data.user) throw new Error('Falha ao autenticar')

  const sessionUser = await getSessionUser()
  if (!sessionUser) throw new Error('Sessão inválida')
  return sessionUser
}

export async function signUp(input: RegisterInput): Promise<AuthUser> {
  if (!isSupabaseConfigured) {
    await sleep(600)
    const user: AuthUser = {
      id: crypto.randomUUID(),
      email: input.email,
      profile: buildDemoProfile(input.email, input.fullName, input.role),
    }
    writeDemoUser(user)
    return user
  }

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        phone: input.phone,
        role: input.role,
      },
    },
  })

  if (error) throw error
  if (!data.user) throw new Error('Falha ao cadastrar')

  return {
    id: data.user.id,
    email: input.email,
    profile: buildDemoProfile(input.email, input.fullName, input.role),
  }
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured) {
    writeDemoUser(null)
    return
  }
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string): Promise<void> {
  if (!isSupabaseConfigured) {
    await sleep(500)
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  })
  if (error) throw error
}
