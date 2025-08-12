/**
 * Middleware para protecao de rotas
 * Protege todas as rotas /dashboard/* exigindo autenticacao
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Verificar se o usuario esta autenticado pelo cookie
    const hasSession = request.cookies.has('logto-session')
    
    if (!hasSession) {
      // Redirecionar para login se nao autenticado
      const loginUrl = 'https://vgwgxt.logto.app/oidc/auth?' +
        'client_id=qfzfcp4bgsibf78zqaci7&' +
        'redirect_uri=' + encodeURIComponent('http://localhost:3000/api/logto/callback') + '&' +
        'scope=openid profile email&' +
        'response_type=code&' +
        'state=' + Math.random().toString(36).substring(7)

      return NextResponse.redirect(loginUrl)
    }

    // Usuario autenticado, continuar
    return NextResponse.next()
  } catch (error) {
    console.error('Erro no middleware:', error)
    // Em caso de erro, redirecionar para home
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
}
