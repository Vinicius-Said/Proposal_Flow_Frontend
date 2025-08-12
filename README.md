# Sistema de Automacao de Vendas

Sistema completo de automacao de vendas para corretoras com OCR de documentos e integracao GNDI, desenvolvido com Next.js 14, Tailwind CSS e autenticacao Logto.

## 🚀 Caracteristicas

- **Autenticacao Segura**: Integracao completa com Logto para gerenciamento de usuarios
- **Dashboard Responsivo**: Interface inspirada no TailAdmin com metricas e tabelas
- **Mobile-First**: Design responsivo otimizado para dispositivos moveis
- **UI Moderna**: Componentes reutilizaveis com Tailwind CSS e shadcn/ui
- **TypeScript**: Tipagem completa para melhor desenvolvimento
- **Pronto para Deploy**: Configurado para Vercel

## 📋 Pre-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Logto (gratuita)

## 🛠️ Instalacao

1. **Clone o repositorio**
```bash
git clone <seu-repositorio>
cd sistema-automacao-vendas
```

2. **Instale as dependencias**
```bash
npm install
```

3. **Configure as variaveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configuracoes:
```env
LOGTO_ENDPOINT=https://vgwgxt.logto.app
LOGTO_APP_ID=qfzfcp4bgsibf78zqaci7
NEXT_PUBLIC_APP_URL=http://localhost:3000
COOKIE_SECRET=logto-secret-key-change-in-production

# Variáveis públicas para o cliente (opcional)
NEXT_PUBLIC_LOGTO_ENDPOINT=https://vgwgxt.logto.app
NEXT_PUBLIC_LOGTO_APP_ID=qfzfcp4bgsibf78zqaci7
```

4. **Execute o projeto**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o projeto.

## 🔐 Configuracao do Logto

### 1. Criar Aplicacao no Logto

1. Acesse [Logto Console](https://cloud.logto.io)
2. Crie uma nova aplicacao Web
3. Configure as seguintes URLs:

**Redirect URIs:**
- `http://localhost:3000/api/logto/callback`

**Post Logout Redirect URIs:**
- `http://localhost:3000`

### 2. Configurar Scopes

Adicione os seguintes scopes:
- `openid`
- `profile` 
- `email`

### 3. Configurar CORS

Adicione `http://localhost:3000` nas origens permitidas.

### 4. Obter Credenciais

Copie o **Endpoint** e **App ID** para o arquivo `.env.local`.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx              # Layout raiz com provider Logto
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Estilos globais
│   └── dashboard/
│       ├── layout.tsx          # Layout do dashboard
│       └── page.tsx            # Pagina principal do dashboard
├── components/
│   ├── site-header.tsx         # Header do site
│   ├── sidebar.tsx             # Sidebar do dashboard
│   ├── metric-card.tsx         # Card de metrica
│   └── data-table.tsx          # Tabela de dados
├── lib/
│   └── logto.ts                # Configuracao centralizada do Logto
├── middleware.ts               # Protecao de rotas
└── public/
    └── logo.svg                # Logo do sistema
```

## 🎨 Design System

### Cores
- **Primaria**: `#0070BA` (azul)
- **Cinza**: Escala completa do Tailwind
- **Estados**: Verde (sucesso), Amarelo (pendente), Vermelho (erro)

### Tipografia
- **Fonte**: Montserrat (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- **Cards**: `rounded-2xl` com sombra leve
- **Botoes**: Bordas arredondadas com hover states
- **Tabelas**: Responsivas com scroll horizontal em mobile

## 🔒 Seguranca

### Middleware de Protecao
O arquivo `middleware.ts` protege automaticamente todas as rotas `/dashboard/*`, exigindo autenticacao.

### Variaveis de Ambiente
- `LOGTO_ENDPOINT`: Endpoint do Logto
- `LOGTO_APP_ID`: ID da aplicacao no Logto
- `NEXT_PUBLIC_APP_URL`: URL da aplicacao

## 📱 Responsividade

O projeto e totalmente responsivo com:
- **Mobile-First**: Design otimizado para dispositivos moveis
- **Sidebar**: Colapsa em mobile com menu hamburguer
- **Tabelas**: Scroll horizontal em telas pequenas
- **Grid**: Adapta-se automaticamente ao tamanho da tela

## 🚀 Deploy na Vercel

1. **Conecte seu repositorio** na Vercel
2. **Configure as variaveis de ambiente**:
   - `LOGTO_ENDPOINT`
   - `LOGTO_APP_ID`
   - `NEXT_PUBLIC_APP_URL` (sua URL de producao)

3. **Atualize as URLs no Logto**:
   - Redirect URI: `https://seu-dominio.vercel.app/api/logto/callback`
   - Post Logout: `https://seu-dominio.vercel.app`

4. **Deploy automatico** sera feito a cada push

## 🛠️ Scripts Disponiveis

```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de producao
npm run start        # Servidor de producao
npm run lint         # Verificacao de codigo
```

## 📊 Funcionalidades

### Landing Page
- Header com botoes de login/cadastro
- Hero section com CTA (botao "Fazer login")
- Secao de features
- Estatisticas da empresa
- CTA final (botao "Fazer login")
- Footer

### Dashboard
- **Metricas**: 4 cards com dados em tempo real
- **Tabela**: Lista de leads com paginacao
- **Grafico**: Placeholder para graficos futuros
- **Navegacao**: Sidebar com menu completo

### Autenticacao
- Login/Cadastro via Logto
- Protecao de rotas
- Logout automatico
- Informacoes do usuario

## 🔧 Personalizacao

### Adicionar Novas Paginas
1. Crie arquivo em `app/dashboard/nova-pagina/page.tsx`
2. Adicione item na navegacao em `components/sidebar.tsx`

### Modificar Estilos
- Edite `tailwind.config.js` para cores e fontes
- Modifique `app/globals.css` para estilos globais

### Integrar APIs
- Crie funcoes em `lib/` para chamadas de API
- Use React Query ou SWR para cache

## 🤝 Contribuicao

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudancas
4. Push para a branch
5. Abra um Pull Request

## 📄 Licenca

Este projeto esta sob a licenca MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, entre em contato:
- Email: suporte@exemplo.com
- Documentacao: [docs.exemplo.com](https://docs.exemplo.com)

---

Desenvolvido com ❤️ usando Next.js, Tailwind CSS e Logto
