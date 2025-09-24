import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      cpf,
      estado,
      cidade,
      tipoPlano,
      coparticipacao,
      porteEmpresa,
      documentos
    } = body

    // Validar dados obrigatórios
    if (!cpf || !estado || !cidade || !tipoPlano || !coparticipacao || !porteEmpresa) {
      return NextResponse.json({ 
        error: 'Dados obrigatórios não preenchidos' 
      }, { status: 400 })
    }

    console.log('Iniciando automação com dados:', body)

    // Executar script de automação
    const automationScriptPath = path.join(process.cwd(), '..', 'tests', 'automation_api.py')
    
    return new Promise((resolve) => {
      const pythonProcess = spawn('python', [automationScriptPath], {
        cwd: path.join(process.cwd(), '..', 'tests'),
        stdio: ['pipe', 'pipe', 'pipe']
      })

      let output = ''
      let errorOutput = ''

      // Enviar dados para o script Python
      const dataToSend = JSON.stringify({
        cpf,
        estado,
        cidade,
        tipoPlano,
        coparticipacao,
        porteEmpresa,
        documentos
      })

      pythonProcess.stdin.write(dataToSend + '\n')
      pythonProcess.stdin.end()

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString()
        console.log('Automation stdout:', data.toString())
      })

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString()
        console.error('Automation stderr:', data.toString())
      })

      pythonProcess.on('close', (code) => {
        console.log('Automation process closed with code:', code)
        console.log('Output:', output)
        console.log('Error output:', errorOutput)
        
        if (code !== 0) {
          resolve(NextResponse.json({ 
            error: 'Erro ao executar automação', 
            details: errorOutput,
            code: code
          }, { status: 500 }))
          return
        }

        try {
          // Tentar parse do resultado JSON se houver
          let result = { success: true, message: 'Automação executada com sucesso' }
          if (output.trim()) {
            try {
              result = JSON.parse(output.trim())
            } catch (e) {
              result.message = output.trim() || 'Automação executada com sucesso'
            }
          }
          
          resolve(NextResponse.json(result))
        } catch (parseError) {
          resolve(NextResponse.json({ 
            success: true,
            message: 'Automação executada com sucesso',
            rawOutput: output
          }))
        }
      })

      pythonProcess.on('error', (error) => {
        console.error('Erro ao executar automação:', error)
        resolve(NextResponse.json({ 
          error: 'Erro ao executar script de automação',
          details: error.message
        }, { status: 500 }))
      })
    })

  } catch (error) {
    console.error('Erro na API automation:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message
    }, { status: 500 })
  }
}
