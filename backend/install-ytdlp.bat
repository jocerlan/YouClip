@echo off
echo 🔧 Instalando yt-dlp...

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado. Instale Python primeiro:
    echo    https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Instalar yt-dlp via pip
echo 📦 Instalando yt-dlp via pip...
pip install yt-dlp

REM Verificar instalação
yt-dlp --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Erro na instalação do yt-dlp
    pause
    exit /b 1
) else (
    echo ✅ yt-dlp instalado com sucesso!
    yt-dlp --version
)

echo 🎉 Instalação concluída!
echo 💡 Para testar, execute: yt-dlp --help
pause
