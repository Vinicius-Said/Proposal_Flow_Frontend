'use client'

import { SiteHeader } from '@/components/site-header'
import { 
  FileText, 
  Zap, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react'

// Componente para botao de acao
function ActionButton({ 
  children, 
  onClick, 
  variant = 'primary' 
}: { 
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}) {
  const baseClasses = "inline-flex items-center space-x-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
  const variantClasses = variant === 'primary' 
    ? "bg-primary-500 text-white hover:bg-primary-600" 
    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
             aria-label={variant === 'primary' ? 'Fazer login' : 'Criar conta'}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}

// Componente para feature
function Feature({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6">
      <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

// Componente para estatistica
function Stat({ 
  icon: Icon, 
  value, 
  label 
}: { 
  icon: any
  value: string
  label: string
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const handleSignIn = async () => {
    // Redirecionar para o Logto para autenticacao
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
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sistema de automacao de vendas para corretoras
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              OCR de documentos e automacoes na GNDI para acelerar propostas
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <ActionButton onClick={handleSignIn} variant="primary">
                 <span>Fazer login</span>
               </ActionButton>
               <ActionButton onClick={handleSignIn} variant="secondary">
                 <span>Criar conta</span>
               </ActionButton>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recursos principais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Automatize seus processos de venda com nossa plataforma completa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={FileText}
              title="OCR de Documentos"
              description="Extraia informacoes automaticamente de documentos com tecnologia OCR avancada"
            />
            <Feature
              icon={Zap}
              title="Automacao GNDI"
              description="Integracao direta com sistemas GNDI para acelerar propostas"
            />
            <Feature
              icon={Shield}
              title="Auditoria e Logs"
              description="Rastreamento completo de todas as acoes e mudancas no sistema"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Stat
              icon={Users}
              value="500+"
              label="Corretoras ativas"
            />
            <Stat
              icon={FileText}
              value="10k+"
              label="Documentos processados"
            />
            <Stat
              icon={TrendingUp}
              value="95%"
              label="Taxa de sucesso"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para comecar?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Junte-se a centenas de corretoras que ja automatizaram seus processos
          </p>
                     <ActionButton onClick={handleSignIn} variant="primary">
             <span>Fazer login</span>
           </ActionButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="font-semibold text-lg">Sistema Automacao</span>
          </div>
          <p className="text-gray-400">
            © 2024 Sistema de Automacao de Vendas. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
