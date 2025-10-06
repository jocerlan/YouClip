import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ToastProvider } from './hooks/use-toast';
import { InputCard } from './components/InputCard';
import { TabsContentComponent } from './components/TabsContent';
import { extractYouTubeId } from './lib/utils';
import { Github, Star } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30);
  const [isProcessed, setIsProcessed] = useState(false);

  const videoId = useMemo(() => {
    return extractYouTubeId(url);
  }, [url]);

  const handleProcess = () => {
    if (videoId) {
      setIsProcessed(true);
    }
  };

  const handleReset = () => {
    setUrl('');
    setStartTime(0);
    setEndTime(30);
    setIsProcessed(false);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  YouClip
                </h1>
                <p className="text-slate-400 text-sm">Crie clipes do YouTube facilmente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all duration-200"
              >
                <Star className="h-4 w-4" />
                <span>Star</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Input Section */}
          <InputCard
            url={url}
            setUrl={setUrl}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            onProcess={handleProcess}
            videoId={videoId}
          />

          {/* Results Section */}
          {isProcessed && videoId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Resultados</h2>
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Novo Clipe
                </motion.button>
              </div>
              
              <TabsContentComponent
                videoId={videoId}
                startTime={startTime}
                endTime={endTime}
              />
            </motion.div>
          )}

          {/* Features Section */}
          {!isProcessed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Clipes Rápidos</h3>
                <p className="text-slate-400">
                  Crie clipes do YouTube definindo apenas o tempo de início e fim
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Thumbnails HD</h3>
                <p className="text-slate-400">
                  Baixe thumbnails em múltiplas qualidades e resoluções
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Links Prontos</h3>
                <p className="text-slate-400">
                  Gere links de visualização e embed automaticamente
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-16"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400">
            <p>Feito com ❤️ usando React, Tailwind CSS e shadcn/ui</p>
            <p className="text-sm mt-2">
              Paleta inspirada na Nextall - Azul, Laranja e Branco
            </p>
          </div>
        </div>
      </motion.footer>
      </div>
    </ToastProvider>
  );
}

export default App;
