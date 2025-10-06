# Instruções de Instalação - YouClip

## Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## Passos para Instalação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Instalar Dependências Adicionais (se necessário)
Se houver problemas com dependências, instale manualmente:

```bash
npm install framer-motion lucide-react
npm install --save-dev @types/react @types/react-dom typescript
```

### 3. Executar o Projeto
```bash
npm start
```

O aplicativo será aberto em [http://localhost:3000](http://localhost:3000)

## Funcionalidades Implementadas

✅ **Extração de ID do YouTube**: Suporta URLs normais, shorts e IDs diretos
✅ **Definição de Tempos**: Tempo de início e fim em segundos ou MM:SS
✅ **Links Gerados**: Watch e embed URLs com parâmetros corretos
✅ **Thumbnails Múltiplas**: 4 qualidades diferentes (maxresdefault, sddefault, hqdefault, mqdefault)
✅ **Download de Thumbnails**: Baixa imagens selecionadas
✅ **Player Preview**: Visualização embedada do clipe
✅ **Download de Vídeo**: Opções e instruções para download
✅ **Design Responsivo**: Funciona em desktop e mobile
✅ **Animações**: Framer Motion para transições suaves
✅ **Feedback**: Toast notifications para ações do usuário
✅ **Paleta Nextall**: Azul, laranja e branco com tema escuro

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, Input, Card, etc.)
│   ├── InputCard.tsx # Card principal para entrada de dados
│   ├── VideoPreview.tsx # Preview do vídeo e links gerados
│   ├── ThumbnailSelector.tsx # Seletor de thumbnails
│   └── TabsContent.tsx # Organizador de abas
├── lib/
│   └── utils.ts      # Funções auxiliares
├── hooks/
│   └── use-toast.ts  # Hook para notificações
├── App.tsx           # Componente principal
└── index.tsx         # Ponto de entrada
```

## Como Usar

1. **Cole uma URL do YouTube** no campo de entrada
2. **Defina os tempos** de início e fim do clipe
3. **Clique em "Processar Vídeo"**
4. **Explore as abas**:
   - Preview: Veja o clipe e copie os links
   - Thumbnails: Baixe imagens em diferentes qualidades
   - Download: Opções para baixar o vídeo completo

## Tecnologias Utilizadas

- React 18 com TypeScript
- Tailwind CSS para estilização
- Framer Motion para animações
- Lucide React para ícones
- Componentes customizados inspirados no shadcn/ui

## Suporte

O aplicativo funciona com:
- URLs normais: `https://www.youtube.com/watch?v=VIDEO_ID`
- URLs curtas: `https://youtu.be/VIDEO_ID`
- URLs de shorts: `https://www.youtube.com/shorts/VIDEO_ID`
- IDs diretos: `VIDEO_ID`

## Notas Importantes

- O download direto de vídeos do YouTube requer ferramentas externas
- As thumbnails são baixadas diretamente dos servidores do YouTube
- O aplicativo é totalmente client-side (não requer backend)
