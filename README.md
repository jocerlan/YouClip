# YouClip 🎬

Um aplicativo React moderno e responsivo para criar clipes do YouTube com thumbnails em alta qualidade.

## ✨ Funcionalidades

- **Extração Automática de ID**: Suporta URLs do YouTube em qualquer formato (normal, shorts, embed)
- **Clipes Personalizados**: Define tempo de início e fim em segundos ou formato MM:SS
- **Links Gerados**: Cria automaticamente links de visualização e embed
- **Thumbnails HD**: Baixa thumbnails em múltiplas qualidades (maxresdefault, sddefault, hqdefault, mqdefault)
- **Player Preview**: Visualiza o clipe diretamente no navegador
- **Download de Vídeo**: Opções para download com ferramentas externas
- **Design Moderno**: Interface escura inspirada na paleta Nextall (azul, laranja, branco)
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🚀 Tecnologias Utilizadas

- **React 18** com Hooks (useState, useMemo)
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes UI
- **Framer Motion** para animações
- **Lucide React** para ícones
- **Radix UI** para componentes acessíveis

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/youclip.git
cd youclip
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Como Usar

1. **Cole a URL**: Insira qualquer URL do YouTube (normal, shorts ou apenas o ID)
2. **Defina os Tempos**: Configure o tempo de início e fim do clipe
3. **Processe**: Clique em "Processar Vídeo" para gerar os resultados
4. **Explore as Abas**:
   - **Preview**: Visualize o clipe e copie os links gerados
   - **Thumbnails**: Baixe thumbnails em diferentes qualidades
   - **Download**: Opções para download do vídeo completo

## 🔧 Funções Auxiliares

O projeto inclui funções utilitárias para manipulação de URLs do YouTube:

- `extractYouTubeId(url)`: Extrai ID de qualquer formato de URL
- `buildEmbedUrl(id, start, end)`: Constrói URL de embed com parâmetros
- `buildWatchUrl(id, start)`: Constrói URL de visualização com tempo
- `buildThumbnailUrl(id, quality)`: Constrói URL de thumbnail por qualidade
- `formatTime(seconds)`: Converte segundos para formato MM:SS
- `parseTimeToSeconds(timeString)`: Converte MM:SS para segundos

## 🎨 Paleta de Cores

Inspirada na Nextall:
- **Azul**: `#3B82F6` (Primary)
- **Laranja**: `#F97316` (Accent)
- **Branco**: `#FFFFFF` (Text)
- **Slate**: `#0F172A` (Background)

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) pelos componentes UI
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS
- [Framer Motion](https://www.framer.com/motion/) pelas animações
- [Lucide](https://lucide.dev/) pelos ícones
- [Radix UI](https://www.radix-ui.com/) pelos primitivos acessíveis

---

Feito com ❤️ usando React e TypeScript
