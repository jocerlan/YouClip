# 🚀 YouClip Backend - Download de Vídeos com yt-dlp

Backend Node.js para download de vídeos do YouTube usando yt-dlp com funcionalidade de clipes personalizados.

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Python** (para instalar yt-dlp)
- **yt-dlp** (ferramenta de download)

## 🛠️ Instalação

### 1. Instalar yt-dlp

#### Windows:
```bash
# Execute o arquivo de instalação
install-ytdlp.bat

# Ou manualmente:
pip install yt-dlp
```

#### Linux/Mac:
```bash
# Execute o script de instalação
chmod +x install-ytdlp.sh
./install-ytdlp.sh

# Ou manualmente:
pip install yt-dlp
```

### 2. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 3. Executar o Backend

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor será iniciado na porta **5000**.

## 🔧 Configuração

### Variáveis de Ambiente (opcional)

Crie um arquivo `.env` na pasta `backend`:

```env
PORT=5000
DOWNLOADS_DIR=./downloads
MAX_FILE_AGE=86400000
```

## 📡 API Endpoints

### POST `/api/download`
Download de vídeo com clipe personalizado.

**Request:**
```json
{
  "videoId": "dQw4w9WgXcQ",
  "startTime": 10,
  "endTime": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Download concluído com sucesso",
  "downloadUrl": "/downloads/dQw4w9WgXcQ_10_30.mp4",
  "filename": "dQw4w9WgXcQ_10_30.mp4"
}
```

### GET `/api/status`
Verificar status do servidor e yt-dlp.

**Response:**
```json
{
  "status": "Backend funcionando",
  "ytdlp": "Disponível",
  "downloadsDir": "/path/to/downloads"
}
```

### GET `/api/downloads`
Listar downloads disponíveis.

**Response:**
```json
{
  "downloads": [
    {
      "filename": "video.mp4",
      "url": "/downloads/video.mp4",
      "size": 1024000
    }
  ]
}
```

### DELETE `/api/cleanup`
Limpar downloads antigos (mais de 24 horas).

## 🎯 Funcionalidades

- ✅ **Download de Clipes**: Extrai apenas o segmento especificado
- ✅ **Qualidade Otimizada**: Máximo 720p para economia de espaço
- ✅ **Múltiplos Formatos**: Suporte automático a MP4, WebM, etc.
- ✅ **Gestão de Arquivos**: Limpeza automática de arquivos antigos
- ✅ **API RESTful**: Interface simples para integração
- ✅ **CORS Habilitado**: Compatível com frontend React

## 📁 Estrutura de Arquivos

```
backend/
├── server.js              # Servidor principal
├── package.json           # Dependências
├── install-ytdlp.bat      # Instalador Windows
├── install-ytdlp.sh       # Instalador Linux/Mac
├── downloads/             # Pasta de downloads (criada automaticamente)
└── README.md             # Este arquivo
```

## 🔍 Troubleshooting

### Erro: "yt-dlp não encontrado"
```bash
# Verificar instalação
yt-dlp --version

# Reinstalar se necessário
pip install --upgrade yt-dlp
```

### Erro: "Porta 5000 em uso"
```bash
# Alterar porta no arquivo .env
PORT=5001
```

### Erro: "Permissão negada"
```bash
# Linux/Mac: Dar permissões
chmod +x install-ytdlp.sh
sudo npm install
```

## 🚀 Integração com Frontend

O frontend React já está configurado para usar este backend. Certifique-se de que:

1. Backend rodando na porta 5000
2. yt-dlp instalado e funcionando
3. Frontend apontando para `http://localhost:5000`

## 📊 Monitoramento

O servidor registra logs detalhados:
- Downloads iniciados/concluídos
- Erros de yt-dlp
- Limpeza de arquivos
- Requisições da API

## 🔒 Segurança

- Downloads limitados a vídeos públicos do YouTube
- Limpeza automática de arquivos antigos
- Validação de entrada na API
- CORS configurado para desenvolvimento

## 📈 Performance

- Downloads paralelos suportados
- Cache de metadados do YouTube
- Compressão automática de vídeos
- Limpeza periódica de arquivos

---

**Desenvolvido para o YouClip** 🎬
