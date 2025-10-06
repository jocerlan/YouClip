#!/bin/bash

# Script para instalar yt-dlp no Windows
echo "🔧 Instalando yt-dlp..."

# Verificar se Python está instalado
if ! command -v python &> /dev/null; then
    echo "❌ Python não encontrado. Instale Python primeiro:"
    echo "   https://www.python.org/downloads/"
    exit 1
fi

# Instalar yt-dlp via pip
echo "📦 Instalando yt-dlp via pip..."
pip install yt-dlp

# Verificar instalação
if command -v yt-dlp &> /dev/null; then
    echo "✅ yt-dlp instalado com sucesso!"
    yt-dlp --version
else
    echo "❌ Erro na instalação do yt-dlp"
    exit 1
fi

echo "🎉 Instalação concluída!"
echo "💡 Para testar, execute: yt-dlp --help"
