// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// Função temporária para cn até as dependências serem instaladas
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

// Função para extrair ID do YouTube de qualquer formato de URL
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Se já é um ID (11 caracteres alfanuméricos), retorna diretamente
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

// Função para construir URL de embed com parâmetros start e end
export function buildEmbedUrl(id: string, start?: number, end?: number): string {
  const params = new URLSearchParams();
  params.set('autoplay', '1');
  params.set('rel', '0');
  
  if (start !== undefined) {
    params.set('start', start.toString());
  }
  
  if (end !== undefined) {
    params.set('end', end.toString());
  }
  
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

// Função para construir URL de watch com parâmetro t
export function buildWatchUrl(id: string, start?: number): string {
  const params = new URLSearchParams();
  params.set('v', id);
  
  if (start !== undefined) {
    params.set('t', start.toString());
  }
  
  return `https://www.youtube.com/watch?${params.toString()}`;
}

// Função para construir URL de thumbnail com qualidade específica
export function buildThumbnailUrl(id: string, quality: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' = 'maxresdefault'): string {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

// Função para formatar tempo em segundos para formato MM:SS
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para converter tempo MM:SS para segundos
export function parseTimeToSeconds(timeString: string): number {
  const parts = timeString.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }
  return parseInt(timeString, 10) || 0;
}
