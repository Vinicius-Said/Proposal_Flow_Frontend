"use client"

import { useState, useRef } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Copy, Download } from "lucide-react"

export default function OCRPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ cpf?: string; error?: string } | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setResult(null)
    } else {
      alert('Por favor, selecione um arquivo PDF válido')
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const processOCR = async () => {
    if (!file) return

    setIsProcessing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ cpf: data.cpf })
      } else {
        setResult({ error: data.error })
      }
    } catch (error) {
      setResult({ error: 'Erro ao processar arquivo. Tente novamente.' })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aqui você pode adicionar uma notificação de sucesso
  }

  const downloadResult = () => {
    if (result?.cpf) {
      const blob = new Blob([`CPF extraído: ${result.cpf}\nData: ${new Date().toLocaleString()}`], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cpf_extraido.txt'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">OCR - Extração de CPF</h1>
        <p className="text-muted-foreground">
          Faça upload de um documento PDF para extrair o CPF automaticamente
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Area */}
        <div className="space-y-4">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              
              <div>
                <p className="text-lg font-medium text-foreground">
                  {file ? file.name : 'Arraste um PDF aqui ou clique para selecionar'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Apenas arquivos PDF são aceitos
                </p>
              </div>
              
              {file && (
                <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Arquivo selecionado com sucesso</span>
                </div>
              )}
            </div>
          </div>

          {file && (
            <button
              onClick={processOCR}
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  <span>Extrair CPF</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Resultado da Extração</h3>
          
          {!result && !isProcessing && (
            <div className="border border-border rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Faça upload de um PDF para ver o resultado aqui
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="border border-border rounded-lg p-8 text-center">
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-foreground font-medium">Processando documento...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Isso pode levar alguns segundos
              </p>
            </div>
          )}

          {result && (
            <div className="border border-border rounded-lg p-6">
              {result.cpf ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">CPF extraído com sucesso!</span>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <label className="text-sm font-medium text-muted-foreground block mb-2">
                      CPF Encontrado:
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="text-lg font-mono font-bold text-foreground bg-background px-3 py-2 rounded border">
                        {result.cpf}
                      </code>
                      <button
                        onClick={() => copyToClipboard(result.cpf!)}
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                        title="Copiar CPF"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={downloadResult}
                      className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Baixar Resultado</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setFile(null)
                        setResult(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                      className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                    >
                      Processar Outro
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Erro na extração</span>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      {result.error}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setResult(null)
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Como usar:</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">1</span>
            <span>Faça upload de um documento PDF (CNH, RG, etc.)</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">2</span>
            <span>Clique em "Extrair CPF" para processar o documento</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">3</span>
            <span>O CPF será extraído automaticamente e exibido na tela</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

