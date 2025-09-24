import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Verificar se é um PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Apenas arquivos PDF são aceitos' }, { status: 400 })
    }

    // Converter File para Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Salvar arquivo temporário
    const tempDir = path.join(process.cwd(), 'temp')
    const tempFilePath = path.join(tempDir, `temp_${Date.now()}.pdf`)
    
    // Criar diretório temp se não existir
    const fs = require('fs')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    fs.writeFileSync(tempFilePath, buffer)

    // Executar script Python de OCR
    const pythonScriptPath = path.join(process.cwd(), '..', 'ocr', 'ocr.py')
    
    return new Promise((resolve) => {
      console.log('Iniciando processamento OCR...')
      console.log('Arquivo temporário:', tempFilePath)
      console.log('Script Python:', pythonScriptPath)
      
      const pythonProcess = spawn('python', [pythonScriptPath, tempFilePath], {
        cwd: path.join(process.cwd(), '..', 'ocr'),
        stdio: ['pipe', 'pipe', 'pipe']
      })

      let output = ''
      let errorOutput = ''

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString()
        console.log('Python stdout:', data.toString())
      })

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString()
        console.error('Python stderr:', data.toString())
      })

      pythonProcess.on('close', (code) => {
        console.log('Python process closed with code:', code)
        console.log('Output:', output)
        console.log('Error output:', errorOutput)
        
        // Limpar arquivo temporário
        try {
          fs.unlinkSync(tempFilePath)
        } catch (err) {
          console.error('Erro ao deletar arquivo temporário:', err)
        }

        if (code !== 0) {
          console.error('Erro no Python:', errorOutput)
          resolve(NextResponse.json({ 
            error: 'Erro ao processar OCR', 
            details: errorOutput,
            code: code
          }, { status: 500 }))
          return
        }

        try {
          // Parse do resultado JSON do Python
          const result = JSON.parse(output.trim())
          
          if (result.error) {
            resolve(NextResponse.json({ 
              error: result.error 
            }, { status: 400 }))
          } else {
            resolve(NextResponse.json({ 
              success: true,
              cpf: result.CPF,
              message: 'CPF extraído com sucesso'
            }))
          }
        } catch (parseError) {
          console.error('Erro ao fazer parse do resultado:', parseError)
          resolve(NextResponse.json({ 
            error: 'Erro ao processar resultado do OCR',
            rawOutput: output,
            parseError: parseError.message
          }, { status: 500 }))
        }
      })

      pythonProcess.on('error', (error) => {
        console.error('Erro ao executar Python:', error)
        resolve(NextResponse.json({ 
          error: 'Erro ao executar script Python',
          details: error.message
        }, { status: 500 }))
      })
    })

  } catch (error) {
    console.error('Erro na API OCR:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor' 
    }, { status: 500 })
  }
}