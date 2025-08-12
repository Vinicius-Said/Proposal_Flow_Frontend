import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Obter o codigo de autorizacao da URL
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    console.log('Callback recebido:', { code: !!code, state: !!state })

    if (!code) {
      console.log('Erro: Codigo de autorizacao nao encontrado')
      return NextResponse.redirect(new URL('/?error=no_code', request.url))
    }

    // Por enquanto, vamos simular uma autenticacao bem-sucedida
    // e redirecionar diretamente para o dashboard
    console.log('Autenticacao bem-sucedida, redirecionando para dashboard')
    
    // Criar uma resposta de redirecionamento
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    
    // Adicionar um cookie de sessao simples para indicar que o usuario esta autenticado
    response.cookies.set('logto-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 dias
    })
    
    return response
  } catch (error) {
    console.error('Erro no callback do Logto:', error)
    return NextResponse.redirect(new URL('/?error=callback_error', request.url))
  }
}
