const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('downloads'));

// Criar diretório de downloads se não existir
const downloadsDir = path.join(__dirname, 'downloads');
fs.ensureDirSync(downloadsDir);

// Função para executar yt-dlp
function downloadVideo(videoId, resolution = 'best') {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(downloadsDir, `${videoId}.%(ext)s`);
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Comando yt-dlp com opções de formato
    let formatOption;
    
    switch(resolution) {
      case '360p':
        formatOption = 'best[height<=360]';
        break;
      case '480p':
        formatOption = 'best[height<=480]';
        break;
      case '720p':
        formatOption = 'best[height<=720]';
        break;
      case '1080p':
        formatOption = 'best[height<=1080]';
        break;
      default:
        formatOption = 'best'; // Melhor qualidade disponível
    }
    
    // Caminho completo para o executável yt-dlp
    const ytdlpPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Python', 'Python313', 'Scripts', 'yt-dlp.exe');
    
    const args = [
      url,
      '--output', outputPath,
      '--format', formatOption,
      '--no-playlist',
      '--quiet',
      '--progress'
    ];

    console.log('Executando yt-dlp com args:', args);

    const ytdlp = spawn(ytdlpPath, args);
    
    let stdout = '';
    let stderr = '';
    let progressData = '';

    ytdlp.stdout.on('data', (data) => {
      stdout += data.toString();
      const dataStr = data.toString();
      console.log('yt-dlp stdout:', dataStr);
      
      // Capturar informações de progresso
      if (dataStr.includes('[download]')) {
        progressData = dataStr;
      }
    });

    ytdlp.stderr.on('data', (data) => {
      stderr += data.toString();
      console.log('yt-dlp stderr:', data.toString());
    });

    ytdlp.on('close', (code) => {
      console.log(`yt-dlp process exited with code ${code}`);
      
      if (code === 0) {
        // Procurar pelo arquivo baixado
        const files = fs.readdirSync(downloadsDir);
        const downloadedFile = files.find(file => 
          file.startsWith(videoId)
        );
        
        if (downloadedFile) {
          resolve({
            success: true,
            filename: downloadedFile,
            path: path.join(downloadsDir, downloadedFile),
            url: `/downloads/${downloadedFile}`,
            progress: progressData
          });
        } else {
          reject(new Error('Arquivo não encontrado após download'));
        }
      } else {
        reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
      }
    });

    ytdlp.on('error', (error) => {
      console.error('Erro ao executar yt-dlp:', error);
      reject(error);
    });
  });
}

// Rota para download de vídeo
app.post('/api/download', async (req, res) => {
  try {
    const { videoId, resolution } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID é obrigatório' });
    }

    console.log(`Iniciando download do vídeo: ${videoId}, resolução: ${resolution || 'melhor disponível'}`);

    // Configurar resposta para streaming de progresso
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Iniciar o download
    try {
      const result = await downloadVideo(videoId, resolution);
      
      // Enviar resultado final com URL para download direto
      res.write(JSON.stringify({
        success: true,
        message: 'Download concluído com sucesso',
        downloadUrl: result.url,
        filename: result.filename,
        progress: '100%',
        complete: true
      }));
      res.end();
    } catch (error) {
      res.write(JSON.stringify({ 
        error: 'Erro no download do vídeo',
        details: error.message,
        complete: true
      }));
      res.end();
      console.error('Erro no download:', error);
    }
  } catch (error) {
    console.error('Erro na rota de download:', error);
    res.status(500).json({
      error: 'Erro interno no servidor',
      details: error.message
    });
  }
});

// Rota para download direto do arquivo
app.get('/downloads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(downloadsDir, filename);
  
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'video/mp4');
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: 'Arquivo não encontrado' });
  }
});

// Rota para verificar status do yt-dlp
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Backend funcionando',
    ytdlp: 'Disponível',
    downloadsDir: downloadsDir
  });
});

// Rota para listar downloads disponíveis
app.get('/api/downloads', (req, res) => {
  try {
    const files = fs.readdirSync(downloadsDir);
    const downloads = files.map(file => ({
      filename: file,
      url: `/downloads/${file}`,
      size: fs.statSync(path.join(downloadsDir, file)).size
    }));
    
    res.json({ downloads });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar downloads' });
  }
});

// Rota para limpar downloads antigos
app.delete('/api/cleanup', (req, res) => {
  try {
    const files = fs.readdirSync(downloadsDir);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas

    files.forEach(file => {
      const filePath = path.join(downloadsDir, file);
      const stats = fs.statSync(filePath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        fs.unlinkSync(filePath);
        console.log(`Arquivo removido: ${file}`);
      }
    });

    res.json({ message: 'Limpeza concluída' });
  } catch (error) {
    res.status(500).json({ error: 'Erro na limpeza' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Diretório de downloads: ${downloadsDir}`);
  console.log(`🌐 API disponível em: http://localhost:${PORT}/api`);
});
