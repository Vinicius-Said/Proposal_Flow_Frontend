'use client'

import { Sidebar } from '@/components/sidebar'
import { User, LogOut, Bell } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Conteudo principal */}
      <div className="lg:ml-64">
        {/* Header fixo */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Lado esquerdo - titulo da pagina */}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Bem-vindo ao sistema de automacao
              </p>
            </div>

            {/* Lado direito - acoes do usuario */}
            <div className="flex items-center space-x-4">
              {/* Notificacoes */}
              <button
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Notificacoes"
              >
                <Bell className="h-5 w-5" />
              </button>

              {/* Menu do usuario */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name || 'Usuario'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email}
                  </div>
                </div>
                
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-600" />
                </div>

                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Sair da conta"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Area de conteudo */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
