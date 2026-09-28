# iPhone 18 Pro — media e movimento

## Página atual

Depois da saudação Hello e da cortina, a página abre na galeria do iPhone 18 Pro e nas opções de modelo, cor e capacidade. A secção que prendia o vídeo da câmara ao scroll foi removida em 28-09-2026 a pedido da GadgetX. O scroll agora percorre naturalmente o produto, o catálogo, as Novidades e a informação de entrega. A estrutura de compra está documentada em [PRODUCT_PAGE_DESIGN.md](PRODUCT_PAGE_DESIGN.md).

O menu em cortina, as transições entre páginas, a reação dos cartões ao rato e a saudação permanecem. `prefers-reduced-motion` desativa as animações longas. As cores e fotografias de cada variante estão em `STORE.colors` (`public/js/data.js`). A seleção da cor altera a primeira fotografia da galeria e acompanha o carrinho.

## Novidades

Os três vídeos editoriais (controlos da câmara, Dynamic Island e arrefecimento) são silenciosos e repetem-se quando entram no ecrã. `public/js/news-videos.js` atribui o `src` apenas quando o vídeo fica visível, pausa ao sair e conserva o poster para quem prefere movimento reduzido. Estes vídeos não são controlados pelo scroll.

## Ficheiros

- `public/index.html`: produto, catálogo, Novidades e entrega.
- `public/css/style.css`: apresentação, responsividade e movimento.
- `public/js/storefront.js`: galeria, variantes, pesquisa e barra de compra.
- `public/js/news-videos.js`: vídeos editoriais das Novidades.
- `public/assets/iphone18/`: fotografias, posters e vídeos.

## Origem e licença

Materiais fornecidos: `Media-of-Apple-iPhone-18-Pro-260909.zip` e `Apple-iPhone-18-Pro-camera-close-up-260909.mp4`. Referência editorial: https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/

O aviso do ZIP encontra-se em `referencias/APPLE_MEDIA_LEGAL_NOTICE.rtf`. O proprietário afirmou ter permissão para o uso destes media na loja; conservar os comprovativos e os termos específicos dessa permissão junto dos documentos da empresa. A autorização de revenda, por si só, não substitui a autorização de uso e adaptação do material.

## Revisão

Verificar em desktop e telemóvel: Hello e cortina, menu, imagem por cor, catálogo, vídeos editoriais, carrinho e checkout de demonstração. Testar também com movimento reduzido. Os pagamentos permanecem desativados até preço, stock, países atendidos e processador serem confirmados.
