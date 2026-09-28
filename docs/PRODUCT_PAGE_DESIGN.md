# GadgetX — página de produto em destaque

## Direção

A página do iPhone 18 Pro da iStore serviu de referência para a hierarquia de compra: cabeçalho com pesquisa e categorias, navegação por famílias, galeria grande, opções de modelo/cor/capacidade e barra de compra persistente. A identidade continua GadgetX: bordô, saudação inicial, cortinas de navegação e movimentos de passagem do rato. A secção de vídeo controlado pelo scroll foi removida a pedido da GadgetX.

## Regras para continuar

- Conservar o hero de duas colunas no desktop e galeria acima das opções no telemóvel. Não reinstalar o vídeo da câmara controlado pelo scroll sem uma nova decisão.
- Usar somente fotografias autorizadas para uso comercial. As fotos por cor e os seus nomes estão definidos em `public/js/data.js` (`STORE.colors`). Não substituir uma cor por fotografia de outra variante.
- A galeria principal tem três vistas: modelo na cor escolhida, detalhe da câmara e acabamentos. Se adicionar fotos, atualizar galeria e miniaturas em conjunto em `public/index.html` e `public/js/storefront.js`.
- Modelo, cor e capacidade escolhidos no hero devem aparecer na mesma linha do carrinho e na revisão do checkout. Manter a validação de variantes em `public/js/app.js`.
- Preservar `prefers-reduced-motion`, foco por teclado, botões com `aria-pressed`, menu em cortina e reprodução editorial discreta nas Novidades.
- Preços, stock, portes e pagamentos permanecem desativados até existirem dados reais e integração aprovada. Não apresentar o preço da iStore como preço GadgetX, nem prometer financiamento, trade-in ou cobertura de entrega ainda não contratados.
- Rever em 1440 px, 768 px e 390 px: evitar deslocamento horizontal, texto sobre imagens, modelos cortados na navegação e controles sobrepostos.

## Fontes e código

- Referência de estrutura: `https://www.istore.co.za/shop-iphone-18-pro` (consultada em 28-09-2026).
- Média do iPhone 18: materiais Apple fornecidos à GadgetX; licença e condições documentadas em `docs/IPHONE18_MEDIA_E_MOTION.md`.
- `public/index.html`: estrutura; `public/css/style.css`: visual e movimento; `public/js/storefront.js`: galeria, pesquisa e barra de compra; `public/js/data.js`: variantes; `public/js/app.js`: carrinho/checkout; `public/js/news-videos.js`: vídeos das Novidades.
