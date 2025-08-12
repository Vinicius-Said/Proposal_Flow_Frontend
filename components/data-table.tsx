interface DataTableProps {
  data: Array<{
    id: string
    nome: string
    cpf: string
    status: string
    criadoEm: string
  }>
}

// Funcao para mascarar CPF
function maskCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

// Funcao para formatar data
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

// Funcao para obter cor do status
function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'ativo':
      return 'bg-green-100 text-green-800'
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800'
    case 'inativo':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header da tabela */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Leads Recentes</h3>
        <p className="text-sm text-gray-600">Lista dos leads mais recentes do sistema</p>
      </div>

      {/* Tabela responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criado em
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {maskCPF(item.cpf)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.criadoEm)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer da tabela */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Mostrando {data.length} de {data.length} registros</span>
          <span>Pagina 1 de 1</span>
        </div>
      </div>
    </div>
  )
}
