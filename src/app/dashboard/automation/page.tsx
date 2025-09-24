"use client"

import React, { useState, useRef } from "react"
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Download,
  MapPin,
  Users,
  Shield,
  Building,
  Trash2,
  Eye
} from "lucide-react"

export default function AutomationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ cpf?: string; error?: string } | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [selectedCoparticipation, setSelectedCoparticipation] = useState("")
  const [selectedCompanySize, setSelectedCompanySize] = useState("")
  const [selectedDocumentType, setSelectedDocumentType] = useState("")
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string
    name: string
    type: string
    file: File
  }>>([])
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const states = [
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" }
  ]

  const spCities = [
    "SAO PAULO", "ALUMINIO", "AMERICANA", "AMPARO", "ARACARIGUAMA", "ARACOIABA DA SERRA",
    "ARTUR NOGUEIRA", "ARUJA", "BARUERI", "BERTIOGA", "CABREUVA", "CAIEIRAS", "CAJAMAR",
    "CAMPINAS", "CAPELA DO ALTO", "CARAPICUIBA", "COSMOPOLIS", "COTIA", "CUBATAO", "DIADEMA",
    "ELIAS FAUSTO", "EMBU DAS ARTES", "EMBU-GUACU", "FERRAZ DE VASCONCELOS", "FRANCO DA ROCHA",
    "GUARAREMA", "GUARUJA", "GUARULHOS", "HOLAMBRA", "HORTOLANDIA", "IBIUNA", "INDAIATUBA",
    "IPERO", "ITAPECERICA DA SERRA", "ITAPEVI", "ITAQUAQUECETUBA", "ITATIBA", "ITU", "ITUPEVA",
    "JAGUARIUNA", "JANDIRA", "JUNDIAI", "LOUVEIRA", "MAIRIPORA", "MAUA", "MOGI DAS CRUZES",
    "MONGAGUA", "MONTE MOR", "NOVA ODESSA", "OSASCO", "PAULINIA", "PEDREIRA", "PIEDADE", "POA",
    "PORTO FELIZ", "PRAIA GRANDE", "RIBEIRAO PIRES", "RIO GRANDE DA SERRA", "SALTO", "SALTO DE PIRAPORA",
    "SANTA BARBARA DOESTE", "SANTA ISABEL", "SANTO ANDRE", "SANTO ANTONIO DE POSSE", "SANTOS",
    "SAO BERNARDO DO CAMPO", "SAO CAETANO DO SUL", "SAO ROQUE", "SAO VICENTE", "SARAPUI", "SOROCABA",
    "SUMARE", "SUZANO", "TABOAO DA SERRA", "VALINHOS", "VARZEA PAULISTA", "VINHEDO", "VOTORANTIM"
  ]

  const rjCities = [
    "RIO DE JANEIRO", "BELFORD ROXO", "DUQUE DE CAXIAS", "ITABORAI", "MAGE", "MARICA",
    "MESQUITA", "NILOPOLIS", "NITEROI", "NOVA IGUACU", "QUEIMADOS", "SAO GONCALO", "SAO JOAO DE MERITI"
  ]

  const documentTypes = [
    { value: "6", label: "Contrato social ou MEI ou requerimento empresário*" },
    { value: "8", label: "E-social, Carteira trabalho, Ficha de registro Ou Contrato Prestador Serviço*" },
    { value: "9", label: "RG/CNH do responsável*" },
    { value: "16", label: "Deliberação CNPJ com restrição" },
    { value: "99", label: "Outros" }
  ]

  const getCitiesForState = (state: string) => {
    switch (state) {
      case "SP": return spCities
      case "RJ": return rjCities
      default: return []
    }
  }

  const handleFileChange = async (selectedFile: File) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setResult(null)
      setPdfPreview(null)
      
      // Criar prévia do PDF
      const reader = new FileReader()
      reader.onload = (e) => {
        setPdfPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
      
      // Processar OCR automaticamente
      await processOCR(selectedFile)
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

  const processOCR = async (fileToProcess?: File) => {
    const fileToUse = fileToProcess || file
    if (!fileToUse) return

    setIsProcessing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', fileToUse)

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

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedDocumentType) {
      const newDoc = {
        id: Date.now().toString(),
        name: e.target.files[0].name,
        type: documentTypes.find(dt => dt.value === selectedDocumentType)?.label || '',
        file: e.target.files[0]
      }
      setUploadedDocuments([...uploadedDocuments, newDoc])
      setSelectedDocumentType("")
    }
  }

  const removeDocument = (id: string) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Evitar problemas de hidratação
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const processRegistration = async () => {
    // Validar campos obrigatórios
    if (!result?.cpf) {
      alert('Por favor, faça upload de um PDF para extrair o CPF')
      return
    }

    if (!selectedState || !selectedCity || !selectedPlan || !selectedCoparticipation || !selectedCompanySize) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (uploadedDocuments.length === 0) {
      alert('Por favor, faça upload de pelo menos um documento')
      return
    }

    try {
      const data = {
        cpf: result.cpf,
        estado: selectedState,
        cidade: selectedCity,
        tipoPlano: selectedPlan,
        coparticipacao: selectedCoparticipation,
        porteEmpresa: selectedCompanySize,
        documentos: uploadedDocuments.map(doc => ({
          nome: doc.name,
          tipo: doc.type,
          arquivo: doc.file.name
        }))
      }

      console.log('Enviando dados para automação:', data)

      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const automationResult = await response.json()

      if (response.ok) {
        alert('Cadastro processado com sucesso! A automação foi executada.')
        console.log('Resultado da automação:', automationResult)
      } else {
        alert(`Erro ao processar cadastro: ${automationResult.error}`)
        console.error('Erro na automação:', automationResult)
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
      alert('Erro ao processar cadastro. Tente novamente.')
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Automação de Cadastro</h1>
        <p className="text-muted-foreground">
          Processe documentos e configure planos de saúde automaticamente
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* OCR Section */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <FileText className="h-5 w-5 text-primary mr-2" />
              Extração de CPF via OCR
            </h3>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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
              
              <div className="space-y-3">
                <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file ? file.name : 'Arraste um PDF aqui ou clique para selecionar'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Apenas arquivos PDF são aceitos
                  </p>
                </div>
                
                {file && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Arquivo selecionado</span>
                  </div>
                )}
              </div>
            </div>

            {isProcessing && (
              <div className="mt-4 p-4 rounded-lg border border-border bg-muted/50">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-foreground">Processando documento...</span>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-4 p-4 rounded-lg border border-border">
                {result.cpf ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">CPF extraído com sucesso!</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono font-bold text-foreground bg-muted px-2 py-1 rounded">
                        {result.cpf}
                      </code>
                      <button
                        onClick={() => copyToClipboard(result.cpf!)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        title="Copiar CPF"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{result.error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Prévia do PDF */}
            {pdfPreview && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Eye className="h-4 w-4 text-primary mr-2" />
                  Prévia do Documento
                </h4>
                <div className="border border-border rounded-lg p-4 bg-muted/20">
                  <div className="text-center">
                    <iframe
                      src={pdfPreview}
                      className="w-full h-96 border border-border rounded"
                      title="Prévia do PDF"
                      suppressHydrationWarning
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Confira se este é o documento desejado
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Configuração do Plano
            </h3>
            
            <div className="space-y-4">
              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Estado
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value)
                    setSelectedCity("")
                  }}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="" disabled>----- SELECIONE UM ESTADO -----</option>
                  {states.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cidade
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed"
                >
                  <option value="" disabled>----- SELECIONE UMA CIDADE -----</option>
                  {getCitiesForState(selectedState).map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Plano */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Plano
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="" disabled>----- SELECIONE -----</option>
                  <option value="ambulatorial">Ambulatorial</option>
                  <option value="amb+hosp">Ambulatorial + Hospitalar com Obstetrícia</option>
                </select>
              </div>

              {/* Coparticipação */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Coparticipação
                </label>
                <select
                  value={selectedCoparticipation}
                  onChange={(e) => setSelectedCoparticipation(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="" disabled>----- SELECIONE -----</option>
                  <option value="com">Com coparticipação</option>
                  <option value="sem">Sem coparticipação (Exceto terapias)</option>
                </select>
              </div>

              {/* Porte da Empresa */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Porte da Empresa
                </label>
                <select
                  value={selectedCompanySize}
                  onChange={(e) => setSelectedCompanySize(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="" disabled>----- SELECIONE -----</option>
                  <option value="2-29">2 a 29 vidas</option>
                  <option value="30-99">30 a 99 vidas</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Building className="h-5 w-5 text-primary mr-2" />
          Upload de Documentos
        </h3>
        
        <div className="mb-4 text-sm text-muted-foreground">
          <p className="mb-2">
            Os documentos têm que estar em um dos seguintes formatos: JPEG (*.jpg, *.jpeg), GIF (*.gif), PNG (*.png), PDF (*.pdf).
          </p>
          <p>
            O tamanho máximo por arquivo é 5 Mbytes para imagens e 20 Mbytes para pdf. Os arquivos que estão com * são obrigatórios para envio.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tipo de documento
            </label>
            <select
              value={selectedDocumentType}
              onChange={(e) => setSelectedDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="" disabled>----- SELECIONE -----</option>
              {documentTypes.map(doc => (
                <option key={doc.value} value={doc.value}>
                  {doc.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Arquivo
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.gif,.png"
                onChange={handleDocumentUpload}
                disabled={!selectedDocumentType}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Uploaded Documents Table */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-foreground mb-3">Documentos Enviados</h4>
          {uploadedDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum documento enviado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Nome arquivo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Tipo documento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedDocuments.map((doc) => (
                    <tr key={doc.id} className="border-t border-border">
                      <td className="px-4 py-3 text-sm text-foreground">{doc.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{doc.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => removeDocument(doc.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Remover documento"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button 
          onClick={() => {
            setFile(null)
            setResult(null)
            setPdfPreview(null)
            setSelectedState("")
            setSelectedCity("")
            setSelectedPlan("")
            setSelectedCoparticipation("")
            setSelectedCompanySize("")
            setSelectedDocumentType("")
            setUploadedDocuments([])
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
          }}
          className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors"
        >
          Limpar Formulário
        </button>
        <button 
          onClick={processRegistration}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Processar Cadastro
        </button>
      </div>
    </div>
  )
}
