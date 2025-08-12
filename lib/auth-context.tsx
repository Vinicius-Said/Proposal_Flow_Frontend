'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { logtoConfig } from './logto'
import LogtoClient from '@logto/next/edge'

// Tipos para o contexto de autenticacao
interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

// Contexto de autenticacao
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider do contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false) // Comecar como false para evitar flash

  // Verificar se o usuario esta autenticado apenas no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
                const checkAuth = () => {
            try {
              const hasSession = document.cookie.includes('logto-session')
              setIsAuthenticated(hasSession)
              
              if (hasSession) {
                setUser({ name: 'Usuario Logto', email: 'usuario@logto.com' })
              }
            } catch (error) {
              console.error('Erro ao verificar autenticacao:', error)
              setIsAuthenticated(false)
            }
          }

      checkAuth()
    }
  }, [])

  // Funcao de login
  const signIn = async () => {
    try {
      // Redirecionar para o Logto
      if (typeof window !== 'undefined') {
        // Usar valores hardcoded para desenvolvimento
        const endpoint = 'https://vgwgxt.logto.app'
        const appId = 'qfzfcp4bgsibf78zqaci7'
        const baseUrl = 'http://localhost:3000'
        
        const signInUrl = `${endpoint}/oidc/auth?` +
          `client_id=${appId}&` +
          `redirect_uri=${encodeURIComponent(baseUrl + '/api/logto/callback')}&` +
          `scope=openid profile email&` +
          `response_type=code&` +
          `state=${Math.random().toString(36).substring(7)}`
        
        console.log('Redirecionando para:', signInUrl)
        window.location.href = signInUrl
      }
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  // Funcao de logout
  const signOut = async () => {
    try {
      // Limpar cookies locais
      if (typeof window !== 'undefined') {
        document.cookie = 'logto-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        setIsAuthenticated(false)
        setUser(null)
        
        // Redirecionar para home
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
