'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  FileText, 
  Shield, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

// Configuracao dos itens de navegacao
const navigationItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Propostas', href: '/dashboard/propostas', icon: FileText },
  { name: 'Auditoria', href: '/dashboard/auditoria', icon: Shield },
  { name: 'Configuracoes', href: '/dashboard/configuracoes', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Botao mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border shadow-lg"
        aria-label="Abrir menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header da sidebar */}
          <div className="flex items-center space-x-2 p-6 border-b border-gray-200">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">
              Dashboard
            </span>
          </div>

          {/* Navegacao */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer da sidebar */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Sistema Automacao v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
