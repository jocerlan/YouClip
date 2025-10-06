import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Youtube, Link, Clock, Play } from 'lucide-react';
import { formatTime, parseTimeToSeconds } from '../lib/utils';

interface InputCardProps {
  url: string;
  setUrl: (url: string) => void;
  startTime: number;
  setStartTime: (time: number) => void;
  endTime: number;
  setEndTime: (time: number) => void;
  onProcess: () => void;
  videoId: string | null;
}

export function InputCard({
  url,
  setUrl,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onProcess,
  videoId
}: InputCardProps) {
  const [startTimeInput, setStartTimeInput] = React.useState(formatTime(startTime));
  const [endTimeInput, setEndTimeInput] = React.useState(formatTime(endTime));

  React.useEffect(() => {
    setStartTimeInput(formatTime(startTime));
  }, [startTime]);

  React.useEffect(() => {
    setEndTimeInput(formatTime(endTime));
  }, [endTime]);

  const handleStartTimeChange = (value: string) => {
    setStartTimeInput(value);
    const seconds = parseTimeToSeconds(value);
    if (!isNaN(seconds)) {
      setStartTime(seconds);
    }
  };

  const handleEndTimeChange = (value: string) => {
    setEndTimeInput(value);
    const seconds = parseTimeToSeconds(value);
    if (!isNaN(seconds)) {
      setEndTime(seconds);
    }
  };

  const isValidUrl = videoId !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Youtube className="h-8 w-8 text-blue-400 mr-2" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              YouClip
            </CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Cole a URL do YouTube e defina os tempos de início e fim para criar seus clipes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200 flex items-center">
              <Link className="h-4 w-4 mr-2" />
              URL do YouTube
            </label>
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400"
            />
            {isValidUrl && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-400 flex items-center"
              >
                ✓ URL válida detectada
              </motion.p>
            )}
          </div>

          {/* Time Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Tempo de Início
              </label>
              <Input
                type="text"
                placeholder="00:00"
                value={startTimeInput}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400"
              />
              <p className="text-xs text-slate-400">
                Formato: MM:SS ou segundos
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Tempo de Fim
              </label>
              <Input
                type="text"
                placeholder="00:30"
                value={endTimeInput}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400"
              />
              <p className="text-xs text-slate-400">
                Formato: MM:SS ou segundos
              </p>
            </div>
          </div>

          {/* Process Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onProcess}
              disabled={!isValidUrl}
              className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-5 w-5 mr-2" />
              Processar Vídeo
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
