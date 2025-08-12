import { MetricCard } from '@/components/metric-card'
import { DataTable } from '@/components/data-table'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock,
  BarChart3
} from 'lucide-react'

// Dados mock para as metricas
const metricsData = [
  {
    title: 'Leads do dia',
    value: '24',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'vs. ontem'
  },
  {
    title: 'Propostas enviadas',
    value: '156',
    change: '+8%',
    changeType: 'positive' as const,
    icon: FileText,
    description: 'este mes'
  },
  {
    title: 'Taxa de sucesso',
    value: '87%',
    change: '+3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: 'vs. mes anterior'
  },
  {
    title: 'Tempo medio',
    value: '2.4h',
    change: '-15%',
    changeType: 'positive' as const,
    icon: Clock,
    description: 'processamento'
  }
]

// Dados mock para a tabela
const tableData = [
  {
    id: '001',
    nome: 'Joao Silva',
    cpf: '12345678901',
    status: 'Ativo',
    criadoEm: '2024-01-15T10:30:00Z'
  },
  {
    id: '002',
    nome: 'Maria Santos',
    cpf: '98765432100',
    status: 'Pendente',
    criadoEm: '2024-01-15T09:15:00Z'
  },
  {
    id: '003',
    nome: 'Pedro Oliveira',
    cpf: '45678912300',
    status: 'Ativo',
    criadoEm: '2024-01-15T08:45:00Z'
  },
  {
    id: '004',
    nome: 'Ana Costa',
    cpf: '78912345600',
    status: 'Inativo',
    criadoEm: '2024-01-14T16:20:00Z'
  },
  {
    id: '005',
    nome: 'Carlos Ferreira',
    cpf: '32165498700',
    status: 'Ativo',
    criadoEm: '2024-01-14T14:10:00Z'
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header da pagina */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visao Geral</h1>
        <p className="text-gray-600">
          Acompanhe as metricas e performance do seu sistema
        </p>
      </div>

      {/* Grid de metricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>

      {/* Grafico placeholder */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Mensal</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BarChart3 className="h-4 w-4" />
            <span>Grafico em desenvolvimento</span>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Grafico de performance sera exibido aqui</p>
            <p className="text-sm text-gray-400">Integracao com biblioteca de graficos</p>
          </div>
        </div>
      </div>

      {/* Tabela de leads */}
      <DataTable data={tableData} />
    </div>
  )
}
