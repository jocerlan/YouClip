import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Image, Download, Eye } from 'lucide-react';
import { buildThumbnailUrl } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

interface ThumbnailSelectorProps {
  videoId: string;
}

type ThumbnailQuality = 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault';

const qualityLabels: Record<ThumbnailQuality, string> = {
  maxresdefault: 'Máxima Resolução',
  sddefault: 'Alta Definição',
  hqdefault: 'Alta Qualidade',
  mqdefault: 'Qualidade Média'
};

const qualityDescriptions: Record<ThumbnailQuality, string> = {
  maxresdefault: '1280x720px',
  sddefault: '640x480px',
  hqdefault: '480x360px',
  mqdefault: '320x180px'
};

export function ThumbnailSelector({ videoId }: ThumbnailSelectorProps) {
  const { toast } = useToast();
  const [selectedQuality, setSelectedQuality] = React.useState<ThumbnailQuality>('maxresdefault');
  const [isLoading, setIsLoading] = React.useState(false);

  const downloadThumbnail = async (quality: ThumbnailQuality) => {
    setIsLoading(true);
    try {
      const thumbnailUrl = buildThumbnailUrl(videoId, quality);
      
      // Criar um link temporário para download
      const link = document.createElement('a');
      link.href = thumbnailUrl;
      link.download = `thumbnail-${videoId}-${quality}.jpg`;
      link.target = '_blank';
      
      // Adicionar ao DOM, clicar e remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Iniciado",
        description: `Thumbnail ${qualityLabels[quality]} baixada com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro no Download",
        description: "Não foi possível baixar a thumbnail",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const previewThumbnail = (quality: ThumbnailQuality) => {
    const thumbnailUrl = buildThumbnailUrl(videoId, quality);
    window.open(thumbnailUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Image className="h-5 w-5 mr-2 text-blue-400" />
            Thumbnails Disponíveis
          </CardTitle>
          <CardDescription className="text-slate-300">
            Selecione e baixe thumbnails em diferentes qualidades
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(qualityLabels) as ThumbnailQuality[]).map((quality) => (
              <motion.div
                key={quality}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedQuality === quality 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="aspect-video relative">
                  <img
                    src={buildThumbnailUrl(videoId, quality)}
                    alt={`Thumbnail ${qualityLabels[quality]}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para qualidade menor se a imagem não carregar
                      const target = e.target as HTMLImageElement;
                      if (quality === 'maxresdefault') {
                        target.src = buildThumbnailUrl(videoId, 'sddefault');
                      } else if (quality === 'sddefault') {
                        target.src = buildThumbnailUrl(videoId, 'hqdefault');
                      }
                    }}
                  />
                  
                  {/* Overlay com informações */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="font-semibold">{qualityLabels[quality]}</p>
                      <p className="text-sm text-slate-300">{qualityDescriptions[quality]}</p>
                    </div>
                  </div>
                  
                  {/* Badge de qualidade */}
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    {qualityDescriptions[quality]}
                  </div>
                </div>
                
                {/* Botões de ação */}
                <div className="p-3 bg-slate-800">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedQuality(quality)}
                      variant={selectedQuality === quality ? "default" : "outline"}
                      size="sm"
                      className={`flex-1 ${
                        selectedQuality === quality 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-slate-600 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      Selecionar
                    </Button>
                    
                    <Button
                      onClick={() => previewThumbnail(quality)}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-200 hover:bg-slate-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      onClick={() => downloadThumbnail(quality)}
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                      className="border-slate-600 text-slate-200 hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Botão de download da thumbnail selecionada */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button
              onClick={() => downloadThumbnail(selectedQuality)}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
            >
              <Download className="h-5 w-5 mr-2" />
              {isLoading ? 'Baixando...' : `Baixar ${qualityLabels[selectedQuality]}`}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
