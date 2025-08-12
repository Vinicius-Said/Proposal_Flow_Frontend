'use client'

import { User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function SiteHeader() {
  const { isAuthenticated, user, signIn, signOut, loading } = useAuth()

  const handleSignIn = async () => {
    await signIn()
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SA</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">
            Sistema Automacao
          </span>
        </div>

        {/* Botoes de acao */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Usuario Demo</span>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Sair da conta"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSignIn}
                className="inline-flex items-center space-x-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
                aria-label="Fazer login"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Criar conta"
              >
                <UserPlus className="h-4 w-4" />
                <span>Cadastro</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
