import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import path from 'path'

export async function GET() {
  try {
    const pythonScriptPath = path.join(process.cwd(), '..', 'ocr', 'ocr.py')
    const testPdfPath = path.join(process.cwd(), '..', 'ocr', 'CNH-e.pdf.pdf')
    
    console.log('Script Python:', pythonScriptPath)
    console.log('PDF de teste:', testPdfPath)
    
    return new Promise((resolve) => {
      const pythonProcess = spawn('python', [pythonScriptPath, testPdfPath], {
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
        
        if (code !== 0) {
          resolve(NextResponse.json({ 
            error: 'Erro ao processar OCR', 
            details: errorOutput,
            code: code
          }, { status: 500 }))
          return
        }

        try {
          const result = JSON.parse(output.trim())
          resolve(NextResponse.json({ 
            success: true,
            result: result,
            rawOutput: output
          }))
        } catch (parseError) {
          resolve(NextResponse.json({ 
            error: 'Erro ao fazer parse do resultado',
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
    console.error('Erro na API test-ocr:', error)
    return NextResponse.json({ 
      error: 'Erro interno do servidor',
      details: error.message
    }, { status: 500 })
  }
}

