import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ExternalLink, Copy, Download } from 'lucide-react';
import { buildEmbedUrl, buildWatchUrl, formatTime } from '../lib/utils';
import { useToast } from '../hooks/use-toast';

interface VideoPreviewProps {
  videoId: string;
  startTime: number;
  endTime: number;
  title?: string;
}

export function VideoPreview({ videoId, startTime, endTime, title }: VideoPreviewProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const embedUrl = buildEmbedUrl(videoId, startTime, endTime);
  const watchUrl = buildWatchUrl(videoId, startTime);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado!",
        description: `${type} copiado para a área de transferência`,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar para a área de transferência",
        variant: "destructive",
      });
    }
  };

  const downloadVideo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          startTime,
          endTime
        })
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Download Concluído!",
          description: `Vídeo baixado: ${result.filename}`,
        });
        
        // Abrir o link de download
        window.open(`http://localhost:5000${result.downloadUrl}`, '_blank');
      } else {
        throw new Error(result.error || 'Erro no download');
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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Video Player */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <ExternalLink className="h-5 w-5 mr-2 text-blue-400" />
            Preview do Clipe
          </CardTitle>
          <CardDescription className="text-slate-300">
            {formatTime(startTime)} - {formatTime(endTime)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generated Links */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Links Gerados</CardTitle>
          <CardDescription className="text-slate-300">
            Use estes links para compartilhar ou acessar seu clipe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Watch Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Link de Visualização</label>
            <div className="flex gap-2">
              <Input
                value={watchUrl}
                readOnly
                className="bg-slate-800 border-slate-600 text-white flex-1"
              />
              <Button
                onClick={() => copyToClipboard(watchUrl, 'Link de visualização')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => window.open(watchUrl, '_blank')}
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Embed Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Link de Embed</label>
            <div className="flex gap-2">
              <Input
                value={embedUrl}
                readOnly
                className="bg-slate-800 border-slate-600 text-white flex-1"
              />
              <Button
                onClick={() => copyToClipboard(embedUrl, 'Link de embed')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => window.open(embedUrl, '_blank')}
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Download Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={downloadVideo}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5 mr-2" />
              {isLoading ? 'Baixando...' : 'Baixar Vídeo'}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
