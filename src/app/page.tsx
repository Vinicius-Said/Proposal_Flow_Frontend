// Tudo que você precisa está neste arquivo único.

// 1. Importações de bibliotecas e ícones
import { 
  BarChart3, 
  FileText, 
  Users, 
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

// 2. Definição dos Tipos (aqui mesmo, sem arquivo separado)
type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

type Stat = {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
};

type Activity = {
  id: number;
  type: "success" | "info" | "warning";
  message: string;
  time: string;
  icon: LucideIcon;
};

// 3. O Componente Principal
export default function DashboardPage() {
  // Dados estáticos definidos aqui dentro
  const stats: Stat[] = [
    {
      name: "Total de Vendas",
      value: "R$ 2.4M",
      change: "+12%",
      changeType: "positive",
      icon: TrendingUp,
    },
    {
      name: "Novos Clientes",
      value: "1,234",
      change: "+8%",
      changeType: "positive",
      icon: Users,
    },
    {
      name: "Documentos Processados",
      value: "5,678",
      change: "+23%",
      changeType: "positive",
      icon: FileText,
    },
    {
      name: "Taxa de Conversão",
      value: "3.2%",
      change: "-2%",
      changeType: "negative",
      icon: BarChart3,
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: 1,
      type: "success",
      message: "Novo cliente cadastrado com sucesso",
      time: "2 minutos atrás",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "info",
      message: "Documento processado via OCR",
      time: "15 minutos atrás",
      icon: FileText,
    },
    {
      id: 3,
      type: "warning",
      message: "Plano próximo do vencimento",
      time: "1 hora atrás",
      icon: AlertCircle,
    },
    {
      id: 4,
      type: "success",
      message: "Pagamento processado",
      time: "2 horas atrás",
      icon: CheckCircle,
    },
  ];
  
  // Objetos para simplificar a lógica de classes CSS no JSX
  const changeColorClasses = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
  };
  
  const activityTypeStyles = {
    success: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  };

  // 4. O JSX completo, com toda a estrutura da página
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao sistema de gestão de planos de saúde
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Última atualização: agora</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${changeColorClasses[stat.changeType]}`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  vs mês anterior
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Vendas por Mês
              </h3>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-sm text-muted-foreground">2024</span>
              </div>
            </div>
            <div className="flex h-64 items-center justify-center rounded-lg bg-muted/20">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Gráfico será implementado aqui</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da Direita (Atividades e Ações) */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Atividades Recentes
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`rounded-full p-1 ${activityTypeStyles[activity.type]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              <button className="flex w-full items-center space-x-2 rounded-md p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Processar Documento</span>
              </button>
              <button className="flex w-full items-center space-x-2 rounded-md p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Adicionar Cliente</span>
              </button>
              <button className="flex w-full items-center space-x-2 rounded-md p-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">Configurar Plano</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}