import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  enterPrototype as authEnterPrototype,
  getSessionUser,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  type AuthUser,
} from '@/services/auth.service'
import type { LoginInput, RegisterInput } from '@/lib/validations'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (input: LoginInput) => Promise<void>
  signUp: (input: RegisterInput) => Promise<void>
  signOut: () => Promise<void>
  enterPrototype: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const sessionUser = await getSessionUser()
      setUser(sessionUser)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const signIn = useCallback(async (input: LoginInput) => {
    const sessionUser = await authSignIn(input)
    setUser(sessionUser)
  }, [])

  const signUp = useCallback(async (input: RegisterInput) => {
    const sessionUser = await authSignUp(input)
    setUser(sessionUser)
  }, [])

  const signOut = useCallback(async () => {
    await authSignOut()
    setUser(null)
  }, [])

  const enterPrototype = useCallback(async () => {
    const sessionUser = await authEnterPrototype()
    setUser(sessionUser)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      signIn,
      signUp,
      signOut,
      enterPrototype,
      refresh,
    }),
    [user, isLoading, signIn, signUp, signOut, enterPrototype, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return ctx
}
