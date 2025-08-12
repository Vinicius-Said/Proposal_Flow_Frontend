/**
 * Configuracao centralizada do Logto
 * Centraliza todas as configuracoes de autenticacao em um unico local
 */

export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || process.env.NEXT_PUBLIC_LOGTO_ENDPOINT || '',
  appId: process.env.LOGTO_APP_ID || process.env.NEXT_PUBLIC_LOGTO_APP_ID || '',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || '',
  cookieSecure: process.env.NODE_ENV === 'production',
  cookieSecret: process.env.COOKIE_SECRET || 'logto-secret-key-change-in-production',
}

// Validacao das variaveis de ambiente apenas no servidor
if (typeof window === 'undefined') {
  if (!logtoConfig.endpoint || !logtoConfig.appId || !logtoConfig.baseUrl) {
    throw new Error('Variaveis de ambiente do Logto nao configuradas corretamente')
  }
}
