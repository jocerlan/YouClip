import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VideoPreview } from './VideoPreview';
import { ThumbnailSelector } from './ThumbnailSelector';
import { Play, Image, Download } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface TabsContentProps {
  videoId: string;
  startTime: number;
  endTime: number;
  title?: string;
}

export function TabsContentComponent({ videoId, startTime, endTime, title }: TabsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Tabs defaultValue="preview">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="thumbnails"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white"
          >
            <Image className="h-4 w-4 mr-2" />
            Thumbnails
          </TabsTrigger>
          <TabsTrigger 
            value="download"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-6">
          <VideoPreview 
            videoId={videoId} 
            startTime={startTime} 
            endTime={endTime} 
            title={title}
          />
        </TabsContent>
        
        <TabsContent value="thumbnails" className="mt-6">
          <ThumbnailSelector videoId={videoId} />
        </TabsContent>
        
        <TabsContent value="download" className="mt-6">
          <VideoDownloader 
            videoId={videoId} 
            startTime={startTime} 
            endTime={endTime}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Componente para download de vídeo
function VideoDownloader({ videoId, startTime, endTime }: { videoId: string; startTime: number; endTime: number }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState<string>('');
  const [selectedResolution, setSelectedResolution] = React.useState<string>('best');
  
  const downloadVideo = async () => {
    setIsLoading(true);
    setProgress('0%');
    
    try {
      const response = await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          resolution: selectedResolution
        })
      });
      
      // Configurar leitor para processar o stream de dados
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Não foi possível iniciar o download');
      
      let receivedData = '';
      
      // Processar o stream de dados
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // Converter o chunk para texto
        const chunk = new TextDecoder().decode(value);
        receivedData += chunk;
        
        // Tentar processar cada linha JSON
        try {
          // Pode haver múltiplos objetos JSON no stream
          const lines = receivedData.split('\n').filter(line => line.trim());
          
          // Processar a última linha (mais recente)
          if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const data = JSON.parse(lastLine);
            
            // Atualizar progresso se disponível
            if (data.progress) {
              setProgress(data.progress);
            }
            
            // Se o download foi concluído
            if (data.complete && data.success) {
              toast({
                title: "Download Concluído!",
                description: `Vídeo baixado: ${data.filename}`,
              });
              
              // Abrir o link de download direto
              window.open(`http://localhost:5000${data.downloadUrl}`, '_blank');
              break;
            }
            
            // Se houve erro
            if (data.error) {
              throw new Error(data.details || data.error);
            }
          }
        } catch (e) {
          // Ignorar erros de parsing JSON (pode ser chunk parcial)
          console.log('Processando dados parciais...');
        }
      }
    } catch (error) {
      console.error('Erro no download:', error);
      toast({
        title: "Erro no Download",
        description: error.message || "Não foi possível baixar o vídeo. Verifique se o backend está rodando.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-orange-400" />
          Download de Vídeo com yt-dlp
        </h3>
        
        <div className="space-y-4">
          <p className="text-slate-300">
            Baixe o vídeo usando yt-dlp com a qualidade selecionada.
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
            <h4 className="font-semibold text-white mb-2">Informações do Download</h4>
            <div className="text-sm text-slate-300 space-y-1">
              <p><strong>ID do Vídeo:</strong> {videoId}</p>
              <p><strong>Resolução:</strong> {selectedResolution === 'best' ? 'Melhor disponível' : selectedResolution}</p>
            </div>
          </div>
          
          {/* Seleção de resolução */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
            <h4 className="font-semibold text-white mb-2">Selecione a Resolução</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {['360p', '480p', '720p', '1080p', 'best'].map((res) => (
                <button
                  key={res}
                  onClick={() => setSelectedResolution(res)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    selectedResolution === res 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {res === 'best' ? 'Melhor' : res}
                </button>
              ))}
            </div>
          </div>
          
          {/* Barra de progresso */}
          {isLoading && (
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
              <h4 className="font-semibold text-white mb-2">Progresso do Download</h4>
              <div className="w-full bg-slate-700 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: progress || '0%' }}
                ></div>
              </div>
              <p className="text-center text-sm text-slate-300">{progress || 'Iniciando...'}</p>
            </div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={downloadVideo}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2 inline" />
              {isLoading ? 'Baixando...' : 'Baixar Vídeo'}
            </button>
          </motion.div>
          
          <div className="text-xs text-slate-400">
            <p>💡 <strong>Requisitos:</strong> Backend rodando na porta 5000 com yt-dlp instalado</p>
            <p>📁 <strong>Localização:</strong> O arquivo será baixado diretamente para seu dispositivo</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
