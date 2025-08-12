import { NextRequest, NextResponse } from 'next/server'
import LogtoClient from '@logto/next/edge'
import { logtoConfig } from '@/lib/logto'

const logtoClient = new LogtoClient(logtoConfig)

export async function GET(request: NextRequest) {
  try {
    // Obter contexto do Logto
    const context = await logtoClient.getLogtoContext(request)
    
    if (!context.isAuthenticated) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    // Retornar informações do usuário
    return NextResponse.json({
      isAuthenticated: true,
      user: context.userInfo,
      accessToken: context.accessToken
    })
  } catch (error) {
    console.error('Erro ao obter usuário:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
